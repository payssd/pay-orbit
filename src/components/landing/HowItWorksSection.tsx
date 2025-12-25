import { UserPlus, Link2, BarChart3 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Subscribe to the platform',
    description: 'Choose a plan and activate your account in minutes. No lengthy onboarding or paperwork required.',
    color: 'primary'
  },
  {
    number: '02',
    icon: Link2,
    title: 'Connect your payment gateways',
    description: 'Use Paystack, Flutterwave, Pesapal, M-Pesa, or bank transfers. Your existing accounts work seamlessly.',
    color: 'accent'
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'Run payroll & collect payments',
    description: 'Pay employees, send invoices, and track payments — all from one beautiful dashboard.',
    color: 'success'
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Get started in 3 simple steps
          </h2>
          <p className="text-lg text-muted-foreground">
            From signup to your first payroll run in under 10 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
              )}
              
              <div className="relative bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                  {step.number}
                </div>
                
                <div className={`w-16 h-16 rounded-2xl bg-${step.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <step.icon className={`w-8 h-8 text-${step.color}`} />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
