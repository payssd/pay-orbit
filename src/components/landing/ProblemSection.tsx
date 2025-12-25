import { AlertTriangle, FileSpreadsheet, Clock, Shuffle, Lock } from 'lucide-react';

const problems = [
  {
    icon: AlertTriangle,
    title: 'Payroll errors and salary disputes',
    description: 'Manual calculations lead to mistakes that hurt employee trust'
  },
  {
    icon: FileSpreadsheet,
    title: 'Excel-based payroll calculations',
    description: 'Spreadsheets are error-prone and time-consuming'
  },
  {
    icon: Clock,
    title: 'Manual invoices and payment follow-ups',
    description: 'Chasing payments wastes valuable business hours'
  },
  {
    icon: Shuffle,
    title: 'Too many payment channels to manage',
    description: 'Juggling M-Pesa, bank transfers, and cards is exhausting'
  },
  {
    icon: Lock,
    title: 'Software that locks your money',
    description: 'Forced into one payment provider with hidden fees'
  },
];

export function ProblemSection() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-destructive/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
            The Problem
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Payroll and payments shouldn't be this hard.
          </h2>
          <p className="text-lg text-muted-foreground">
            Most growing businesses in East Africa struggle with these challenges every single day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-6 border border-border/50 hover:border-destructive/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-xl font-medium text-foreground mt-12">
          You shouldn't have to choose between <span className="text-primary">control</span> and <span className="text-accent">convenience</span>.
        </p>
      </div>
    </section>
  );
}
