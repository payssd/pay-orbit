import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Clock, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function TrialCountdown() {
  const { currentOrganization } = useAuth();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  const isTrialing = currentOrganization?.subscription_status === 'trialing';
  const trialEndDate = currentOrganization?.subscription_ends_at;

  useEffect(() => {
    if (!isTrialing || !trialEndDate) return;

    const calculateTimeLeft = () => {
      const endDate = new Date(trialEndDate);
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [isTrialing, trialEndDate]);

  // Redirect when trial expires
  useEffect(() => {
    if (isExpired) {
      navigate('/subscription');
    }
  }, [isExpired, navigate]);

  if (!isTrialing || !trialEndDate) return null;

  const isUrgent = timeLeft && timeLeft.days <= 3;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border transition-all duration-300',
        isUrgent
          ? 'bg-gradient-to-r from-destructive/10 via-destructive/5 to-destructive/10 border-destructive/30'
          : 'bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-primary/20'
      )}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-30">
        <div
          className={cn(
            'absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl animate-pulse',
            isUrgent ? 'bg-destructive/20' : 'bg-primary/20'
          )}
        />
        <div
          className={cn(
            'absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl animate-pulse',
            isUrgent ? 'bg-destructive/10' : 'bg-accent/20'
          )}
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="relative p-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Trial Badge */}
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'p-2 rounded-lg',
                isUrgent ? 'bg-destructive/20' : 'bg-primary/20'
              )}
            >
              {isUrgent ? (
                <Zap className="h-4 w-4 text-destructive animate-pulse" />
              ) : (
                <Sparkles className="h-4 w-4 text-primary" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold">
                {isUrgent ? 'Trial Ending Soon!' : 'Free Trial'}
              </p>
              <p className="text-xs text-muted-foreground">
                {isUrgent
                  ? 'Upgrade now to keep your data'
                  : 'Explore all premium features'}
              </p>
            </div>
          </div>

          {/* Countdown Display */}
          {timeLeft && (
            <div className="flex items-center gap-1.5">
              <TimeUnit value={timeLeft.days} label="days" isUrgent={isUrgent} />
              <span className={cn('text-lg font-bold', isUrgent ? 'text-destructive' : 'text-primary')}>:</span>
              <TimeUnit value={timeLeft.hours} label="hrs" isUrgent={isUrgent} />
              <span className={cn('text-lg font-bold', isUrgent ? 'text-destructive' : 'text-primary')}>:</span>
              <TimeUnit value={timeLeft.minutes} label="min" isUrgent={isUrgent} />
              <span className={cn('text-lg font-bold', isUrgent ? 'text-destructive' : 'text-primary')}>:</span>
              <TimeUnit value={timeLeft.seconds} label="sec" isUrgent={isUrgent} />
            </div>
          )}

          {/* CTA Button */}
          <Button
            onClick={() => navigate('/subscription')}
            size="sm"
            className={cn(
              'font-medium shadow-lg transition-all hover:scale-105',
              isUrgent
                ? 'bg-destructive hover:bg-destructive/90'
                : 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70'
            )}
          >
            <Zap className="h-4 w-4 mr-1" />
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
}

function TimeUnit({
  value,
  label,
  isUrgent,
}: {
  value: number;
  label: string;
  isUrgent?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center min-w-[48px] p-2 rounded-lg transition-colors',
        isUrgent ? 'bg-destructive/10' : 'bg-primary/10'
      )}
    >
      <span
        className={cn(
          'text-xl font-bold tabular-nums leading-none',
          isUrgent ? 'text-destructive' : 'text-primary'
        )}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
        {label}
      </span>
    </div>
  );
}
