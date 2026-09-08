import { ReactNode, ComponentProps } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps extends ComponentProps<'p'> {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'income' | 'expense';
}

export function StatCard({ title, value, subtitle, icon, trend, variant = 'default', ...props }: StatCardProps) {
  return (
    <div className="stat-card animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="stat-label">{title}</p>
          <p
            className={cn(
              'stat-value',
              variant === 'income' && 'text-income',
              variant === 'expense' && 'text-expense'
            )}
            {...props}
          >
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              'inline-flex items-center text-sm font-medium',
              trend.isPositive ? 'text-income' : 'text-expense'
            )}>
              <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
              <span className="ml-1 text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl',
          variant === 'default' && 'bg-primary/10 text-primary',
          variant === 'income' && 'bg-income-light text-income',
          variant === 'expense' && 'bg-expense-light text-expense'
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
}
