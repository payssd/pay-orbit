import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Clock,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { profile, currentOrganization } = useAuth();

  const stats = [
    {
      name: 'Total Employees',
      value: '0',
      change: '+0%',
      changeType: 'neutral' as 'neutral' | 'increase' | 'decrease',
      icon: Users,
      href: '/payroll/employees',
      color: 'text-info',
      bgColor: 'bg-info/10',
    },
    {
      name: 'Pending Invoices',
      value: '0',
      change: 'KES 0',
      changeType: 'neutral' as 'neutral' | 'increase' | 'decrease',
      icon: FileText,
      href: '/invoices',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      name: 'This Month Payroll',
      value: 'KES 0',
      change: '+0%',
      changeType: 'neutral' as 'neutral' | 'increase' | 'decrease',
      icon: Wallet,
      href: '/payroll/runs',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      name: 'Revenue (Paid)',
      value: 'KES 0',
      change: '+0%',
      changeType: 'neutral' as 'neutral' | 'increase' | 'decrease',
      icon: TrendingUp,
      href: '/reports/invoices',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  const quickActions = [
    { name: 'Add Employee', href: '/payroll/employees/new', icon: Users },
    { name: 'Create Invoice', href: '/invoices/new', icon: FileText },
    { name: 'Run Payroll', href: '/payroll/runs/new', icon: Wallet },
  ];

  const recentActivity: { title: string; description: string; time: string; status: 'success' | 'warning' | 'info' }[] = [];

  const getStatusIcon = (status: 'success' | 'warning' | 'info') => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'info':
        return <Clock className="h-4 w-4 text-info" />;
    }
  };

  return (
    <div className="space-y-8 page-transition">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with {currentOrganization?.name} today.
          </p>
        </div>
        <div className="flex gap-2">
          {quickActions.map((action) => (
            <Button key={action.name} variant="outline" asChild className="gap-2">
              <Link to={action.href}>
                <action.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{action.name}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} to={stat.href}>
            <Card className="stat-card hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {stat.changeType === 'increase' && (
                    <ArrowUpRight className="h-3 w-3 text-success" />
                  )}
                  {stat.changeType === 'decrease' && (
                    <ArrowDownRight className="h-3 w-3 text-destructive" />
                  )}
                  <span
                    className={`text-xs ${
                      stat.changeType === 'increase'
                        ? 'text-success'
                        : stat.changeType === 'decrease'
                        ? 'text-destructive'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your organization</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Clock className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-sm font-medium">No recent activity</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Start by adding employees or creating invoices
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Start Guide */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Complete these steps to set up your workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: 'Add your first employee', description: 'Set up employee profiles for payroll', href: '/payroll/employees/new', done: false },
                { title: 'Connect a payment gateway', description: 'Link your Paystack or Flutterwave account', href: '/settings/gateways', done: false },
                { title: 'Create your first invoice', description: 'Send professional invoices to customers', href: '/invoices/new', done: false },
                { title: 'Run your first payroll', description: 'Calculate and process employee salaries', href: '/payroll/runs/new', done: false },
              ].map((step, index) => (
                <Link
                  key={index}
                  to={step.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.done
                        ? 'bg-success text-success-foreground'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {step.done ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${step.done ? 'line-through text-muted-foreground' : ''}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
