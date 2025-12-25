import { 
  Calculator, 
  FileText, 
  CreditCard, 
  BarChart3,
  DollarSign,
  Users,
  Receipt,
  PieChart,
  Shield,
  Zap,
  Clock,
  CheckCircle
} from 'lucide-react';

const featureCategories = [
  {
    title: 'Payroll Made Simple',
    icon: Calculator,
    color: 'primary',
    features: [
      { icon: DollarSign, text: 'Salary calculations' },
      { icon: Users, text: 'Allowances & deductions' },
      { icon: FileText, text: 'PDF payslips' },
      { icon: BarChart3, text: 'Payroll reports' },
    ]
  },
  {
    title: 'Professional Invoicing',
    icon: Receipt,
    color: 'accent',
    features: [
      { icon: Zap, text: 'Create invoices in minutes' },
      { icon: FileText, text: 'Send via email or WhatsApp' },
      { icon: CheckCircle, text: 'Track paid & unpaid invoices' },
      { icon: Clock, text: 'Automated reminders' },
    ]
  },
  {
    title: 'Payment Orchestration',
    icon: CreditCard,
    color: 'success',
    features: [
      { icon: Shield, text: 'Bring your own gateways' },
      { icon: CheckCircle, text: 'No locked-in payment provider' },
      { icon: DollarSign, text: 'Payments go directly to you' },
      { icon: Zap, text: 'Real-time payment tracking' },
    ]
  },
  {
    title: 'Clear Reports & Insights',
    icon: PieChart,
    color: 'info',
    features: [
      { icon: BarChart3, text: 'Payroll summaries' },
      { icon: Clock, text: 'Invoice aging reports' },
      { icon: PieChart, text: 'Business cost visibility' },
      { icon: FileText, text: 'Export to PDF/Excel' },
    ]
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
            Core Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything you need to run your business
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed specifically for East African businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {featureCategories.map((category, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Header */}
              <div className={`p-6 bg-gradient-to-r from-${category.color}/10 to-transparent border-b border-border/50`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-${category.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <category.icon className={`w-6 h-6 text-${category.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>
              </div>
              
              {/* Features list */}
              <div className="p-6">
                <ul className="space-y-4">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-foreground">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
