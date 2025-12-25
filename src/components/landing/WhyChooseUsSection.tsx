import { Check, Shield, Building2, Wallet, DollarSign, Lock } from 'lucide-react';

const reasons = [
  { icon: Wallet, text: 'No money custody' },
  { icon: Lock, text: 'No payment lock-in' },
  { icon: Building2, text: 'Built for East Africa' },
  { icon: DollarSign, text: 'SME-friendly pricing' },
  { icon: Shield, text: 'Secure and compliant by design' },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Why PayFlow
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Designed for real African businesses
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We understand the unique challenges of running a business in East Africa. That's why we built PayFlow differently.
              </p>

              <ul className="space-y-4">
                {reasons.map((reason, index) => (
                  <li key={index} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
                      <Check className="w-5 h-5 text-success" />
                    </div>
                    <span className="text-lg text-foreground font-medium">
                      {reason.text}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-xl font-semibold text-foreground">
                This is payroll and invoicing done the right way.
              </p>
            </div>

            {/* Right visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50" />
              <div className="relative bg-card rounded-2xl border border-border/50 p-8 shadow-xl">
                {/* Stats showcase */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-muted/50 rounded-xl">
                    <p className="text-4xl font-bold text-primary mb-2">500+</p>
                    <p className="text-sm text-muted-foreground">Businesses Trust Us</p>
                  </div>
                  <div className="text-center p-6 bg-muted/50 rounded-xl">
                    <p className="text-4xl font-bold text-accent mb-2">$2M+</p>
                    <p className="text-sm text-muted-foreground">Payroll Processed</p>
                  </div>
                  <div className="text-center p-6 bg-muted/50 rounded-xl">
                    <p className="text-4xl font-bold text-success mb-2">10K+</p>
                    <p className="text-sm text-muted-foreground">Invoices Sent</p>
                  </div>
                  <div className="text-center p-6 bg-muted/50 rounded-xl">
                    <p className="text-4xl font-bold text-warning mb-2">99.9%</p>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
