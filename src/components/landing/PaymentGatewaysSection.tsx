export function PaymentGatewaysSection() {
  const gateways = [
    { name: 'Paystack', description: 'Cards & bank transfers' },
    { name: 'Flutterwave', description: 'Pan-African payments' },
    { name: 'Pesapal', description: 'Multi-channel payments' },
    { name: 'M-Pesa', description: 'Mobile money' },
    { name: 'Bank Transfer', description: 'Direct bank deposits' },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
            Payment Partners
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Use the payment providers you already trust
          </h2>
          <p className="text-lg text-muted-foreground">
            We integrate with leading African payment providers. No new accounts. No forced switches.
          </p>
        </div>

        {/* Gateway logos/cards */}
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {gateways.map((gateway, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl px-8 py-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-w-[180px] text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <span className="text-xl font-bold text-primary">
                  {gateway.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">{gateway.name}</h3>
              <p className="text-sm text-muted-foreground">{gateway.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-10 max-w-xl mx-auto">
          Your customers pay through your existing accounts. We never touch your money — it goes directly to you.
        </p>
      </div>
    </section>
  );
}
