import { Shield, Lock, Eye, FileCheck } from 'lucide-react';

const securityFeatures = [
  {
    icon: Lock,
    title: 'Encrypted data',
    description: 'All data is encrypted in transit and at rest using industry-standard protocols.'
  },
  {
    icon: Eye,
    title: 'Role-based access',
    description: 'Control who sees what with granular permission settings for your team.'
  },
  {
    icon: FileCheck,
    title: 'Full audit logs',
    description: 'Track every action with comprehensive audit trails for compliance.'
  },
];

export function SecuritySection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
              Security & Transparency
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Your money stays with you
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We take security seriously. Your data is protected, and your funds never pass through us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border/50 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-success" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Important notice */}
          <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-8 border border-border/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Important: We Never Hold Your Funds
                </h4>
                <p className="text-muted-foreground">
                  We do not process or hold funds. All payments are handled directly by your connected payment providers. 
                  Your money goes straight to your accounts — we simply help you manage the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
