import { Check, Calculator, FileText, CreditCard, TrendingUp } from 'lucide-react';

const solutions = [
  {
    icon: Calculator,
    title: 'Run accurate payroll every month',
    description: 'Automated calculations with Kenya tax compliance'
  },
  {
    icon: FileText,
    title: 'Generate payslips in seconds',
    description: 'Professional PDF payslips with one click'
  },
  {
    icon: CreditCard,
    title: 'Create professional invoices',
    description: 'Branded invoices that get you paid faster'
  },
  {
    icon: TrendingUp,
    title: 'Get paid faster using providers you trust',
    description: 'M-Pesa, Paystack, Flutterwave, and more'
  },
];

export function SolutionSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            The Solution
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            One platform. Total clarity.
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform helps you manage everything in one place — without holding your funds or forcing you into a single payment system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="group flex items-start gap-4 bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                <solution.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Check className="w-5 h-5 text-success" />
                  {solution.title}
                </h3>
                <p className="text-muted-foreground">
                  {solution.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
