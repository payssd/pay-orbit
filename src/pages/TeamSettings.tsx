import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Crown, Shield, User, Loader2, Mail, UserPlus, Clock } from 'lucide-react';

export default function TeamSettings() {
  const { currentOrganization, profile } = useAuth();

  if (!currentOrganization || !profile) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-4 w-4 text-amber-500" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-primary" />;
      default:
        return <User className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      owner: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      admin: 'bg-primary/10 text-primary',
      member: 'bg-muted text-muted-foreground',
    };
    return (
      <Badge className={`border-0 ${styles[role] || styles.member}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const upcomingFeatures = [
    { icon: Mail, text: 'Send email invitations to team members' },
    { icon: Shield, text: 'Assign roles: Owner, Admin, or Member' },
    { icon: Users, text: 'Manage team access and permissions' },
  ];

  return (
    <div className="space-y-6 page-transition">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Team Members</h1>
        <p className="text-muted-foreground">Manage your team and their access levels.</p>
      </div>

      <Card className="border shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Team
            </CardTitle>
            <CardDescription>People with access to {currentOrganization.name}</CardDescription>
          </div>
          <Button disabled className="gap-2">
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Current user */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {profile.full_name?.charAt(0) || profile.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{profile.full_name || 'You'}</p>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getRoleIcon('owner')}
                {getRoleBadge('owner')}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coming Soon Card */}
      <Card className="border shadow-card bg-muted/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Team invitations coming soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You'll be able to invite team members and manage their roles to collaborate on payroll and invoicing.
              </p>
            </div>
            
            {/* Upcoming features list */}
            <div className="pt-4 space-y-3 max-w-sm mx-auto">
              {upcomingFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Badge variant="secondary" className="gap-1.5">
                <Clock className="h-3 w-3" />
                Coming Q1 2025
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
