import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Smartphone, Building2, Save } from 'lucide-react';

interface PaymentSettings {
  id?: string;
  organization_id: string;
  mpesa_enabled: boolean;
  mpesa_business_shortcode: string;
  mpesa_account_name: string;
  bank_enabled: boolean;
  bank_name: string;
  bank_account_name: string;
  bank_account_number: string;
  bank_branch: string;
  bank_swift_code: string;
}

export default function PaymentSettings() {
  const { currentOrganization } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<PaymentSettings>({
    organization_id: '',
    mpesa_enabled: false,
    mpesa_business_shortcode: '',
    mpesa_account_name: '',
    bank_enabled: false,
    bank_name: '',
    bank_account_name: '',
    bank_account_number: '',
    bank_branch: '',
    bank_swift_code: '',
  });

  useEffect(() => {
    if (currentOrganization) {
      fetchSettings();
    }
  }, [currentOrganization]);

  const fetchSettings = async () => {
    if (!currentOrganization) return;
    
    setIsLoading(true);
    const { data, error } = await supabase
      .from('payment_settings')
      .select('*')
      .eq('organization_id', currentOrganization.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching payment settings:', error);
    }

    if (data) {
      setSettings({
        ...data,
        mpesa_business_shortcode: data.mpesa_business_shortcode || '',
        mpesa_account_name: data.mpesa_account_name || '',
        bank_name: data.bank_name || '',
        bank_account_name: data.bank_account_name || '',
        bank_account_number: data.bank_account_number || '',
        bank_branch: data.bank_branch || '',
        bank_swift_code: data.bank_swift_code || '',
      });
    } else {
      setSettings(prev => ({
        ...prev,
        organization_id: currentOrganization.id,
      }));
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!currentOrganization) return;

    setIsSaving(true);
    
    const payload = {
      organization_id: currentOrganization.id,
      mpesa_enabled: settings.mpesa_enabled,
      mpesa_business_shortcode: settings.mpesa_business_shortcode || null,
      mpesa_account_name: settings.mpesa_account_name || null,
      bank_enabled: settings.bank_enabled,
      bank_name: settings.bank_name || null,
      bank_account_name: settings.bank_account_name || null,
      bank_account_number: settings.bank_account_number || null,
      bank_branch: settings.bank_branch || null,
      bank_swift_code: settings.bank_swift_code || null,
    };

    let error;
    if (settings.id) {
      const result = await supabase
        .from('payment_settings')
        .update(payload)
        .eq('id', settings.id);
      error = result.error;
    } else {
      const result = await supabase
        .from('payment_settings')
        .insert(payload)
        .select()
        .single();
      error = result.error;
      if (result.data) {
        setSettings(prev => ({ ...prev, id: result.data.id }));
      }
    }

    setIsSaving(false);

    if (error) {
      toast({
        title: 'Error saving settings',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Settings saved',
        description: 'Your payment settings have been updated.',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 page-transition">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Gateways</h1>
          <p className="text-muted-foreground">
            Configure how you receive payments from customers.
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

      {/* M-Pesa Settings */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-success" />
              </div>
              <div>
                <CardTitle>M-Pesa</CardTitle>
                <CardDescription>Accept mobile money payments</CardDescription>
              </div>
            </div>
            <Switch
              checked={settings.mpesa_enabled}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, mpesa_enabled: checked }))}
            />
          </div>
        </CardHeader>
        {settings.mpesa_enabled && (
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="mpesa-shortcode">Business Shortcode / Till Number</Label>
                <Input
                  id="mpesa-shortcode"
                  placeholder="e.g., 174379"
                  value={settings.mpesa_business_shortcode}
                  onChange={(e) => setSettings(prev => ({ ...prev, mpesa_business_shortcode: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mpesa-name">Account Name</Label>
                <Input
                  id="mpesa-name"
                  placeholder="e.g., Acme Corporation"
                  value={settings.mpesa_account_name}
                  onChange={(e) => setSettings(prev => ({ ...prev, mpesa_account_name: e.target.value }))}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              This information will be displayed on invoices so customers know where to send payments.
            </p>
          </CardContent>
        )}
      </Card>

      {/* Bank Transfer Settings */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-info" />
              </div>
              <div>
                <CardTitle>Bank Transfer</CardTitle>
                <CardDescription>Accept bank transfers and EFTs</CardDescription>
              </div>
            </div>
            <Switch
              checked={settings.bank_enabled}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, bank_enabled: checked }))}
            />
          </div>
        </CardHeader>
        {settings.bank_enabled && (
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Input
                  id="bank-name"
                  placeholder="e.g., Equity Bank"
                  value={settings.bank_name}
                  onChange={(e) => setSettings(prev => ({ ...prev, bank_name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-name">Account Name</Label>
                <Input
                  id="account-name"
                  placeholder="e.g., Acme Corporation Ltd"
                  value={settings.bank_account_name}
                  onChange={(e) => setSettings(prev => ({ ...prev, bank_account_name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-number">Account Number</Label>
                <Input
                  id="account-number"
                  placeholder="e.g., 0123456789"
                  value={settings.bank_account_number}
                  onChange={(e) => setSettings(prev => ({ ...prev, bank_account_number: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Input
                  id="branch"
                  placeholder="e.g., Westlands Branch"
                  value={settings.bank_branch}
                  onChange={(e) => setSettings(prev => ({ ...prev, bank_branch: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="swift">SWIFT Code (Optional)</Label>
                <Input
                  id="swift"
                  placeholder="e.g., EABOROBI"
                  value={settings.bank_swift_code}
                  onChange={(e) => setSettings(prev => ({ ...prev, bank_swift_code: e.target.value }))}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Bank details will appear on invoices for customers paying via bank transfer.
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
