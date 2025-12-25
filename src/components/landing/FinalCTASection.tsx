import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FinalCTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                           linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Run payroll and payments with confidence
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Join growing East African businesses using one platform to manage payroll, invoices, and payments — without giving up control.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              asChild 
              size="lg" 
              className="h-14 px-8 text-lg font-semibold rounded-full bg-white text-primary hover:bg-white/90 shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <Link to="/auth">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="h-14 px-8 text-lg font-semibold rounded-full border-2 border-white/30 text-white bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <a href="mailto:sales@payflow.africa?subject=Demo Request">
                <Play className="mr-2 h-5 w-5" />
                Book a Demo
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
