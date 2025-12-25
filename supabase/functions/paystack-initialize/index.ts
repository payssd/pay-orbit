import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InitializeRequest {
  organizationId: string;
  planCode: string;
  email: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY');
    if (!paystackSecretKey) {
      console.error('PAYSTACK_SECRET_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Payment service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    console.log('Auth header present:', !!authHeader);
    
    if (!authHeader) {
      console.error('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    console.log('Creating Supabase client with URL:', supabaseUrl);
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log('Auth result - user:', user?.id, 'error:', userError?.message);
    
    if (userError || !user) {
      console.error('Auth validation failed:', userError?.message || 'No user returned');
      return new Response(
        JSON.stringify({ error: 'Invalid or expired session. Please log in again.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: InitializeRequest = await req.json();
    const { organizationId, planCode, email } = body;

    if (!organizationId || !planCode || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: organizationId, planCode, email' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify user is owner/admin of the organization
    const { data: membership, error: memberError } = await supabase
      .from('organization_members')
      .select('role')
      .eq('organization_id', organizationId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (memberError || !membership) {
      console.error('Membership error:', memberError);
      return new Response(
        JSON.stringify({ error: 'Organization not found or access denied' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (membership.role !== 'owner' && membership.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Only owners and admins can manage subscriptions' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get or create Paystack customer
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .select('paystack_customer_id, name')
      .eq('id', organizationId)
      .single();

    if (orgError) {
      console.error('Org fetch error:', orgError);
      return new Response(
        JSON.stringify({ error: 'Organization not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let customerCode = org.paystack_customer_id;

    // Create customer if doesn't exist
    if (!customerCode) {
      console.log('Creating Paystack customer for:', email);
      const customerResponse = await fetch('https://api.paystack.co/customer', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${paystackSecretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          first_name: org.name,
          metadata: {
            organization_id: organizationId,
          },
        }),
      });

      const customerData = await customerResponse.json();
      console.log('Customer creation response:', customerData);

      if (!customerData.status) {
        return new Response(
          JSON.stringify({ error: customerData.message || 'Failed to create customer' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      customerCode = customerData.data.customer_code;

      // Save customer ID to organization
      await supabase
        .from('organizations')
        .update({ paystack_customer_id: customerCode })
        .eq('id', organizationId);
    }

    // Initialize subscription transaction
    const callbackUrl = `${req.headers.get('origin')}/subscription/callback`;
    console.log('Initializing subscription with plan:', planCode, 'callback:', callbackUrl);

    const subscriptionResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        plan: planCode,
        callback_url: callbackUrl,
        metadata: {
          organization_id: organizationId,
          plan_code: planCode,
          custom_fields: [
            {
              display_name: 'Organization',
              variable_name: 'organization',
              value: org.name,
            },
          ],
        },
      }),
    });

    const subscriptionData = await subscriptionResponse.json();
    console.log('Subscription init response:', subscriptionData);

    if (!subscriptionData.status) {
      return new Response(
        JSON.stringify({ error: subscriptionData.message || 'Failed to initialize subscription' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        authorization_url: subscriptionData.data.authorization_url,
        reference: subscriptionData.data.reference,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Paystack initialize error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
