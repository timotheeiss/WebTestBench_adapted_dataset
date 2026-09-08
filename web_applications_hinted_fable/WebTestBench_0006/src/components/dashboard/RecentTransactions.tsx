import { useBookkeeping } from '@/context/BookkeepingContext';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export function RecentTransactions() {
  const { transactions, getCategoryById } = useBookkeeping();
  
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="stat-card animate-slide-up">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <div
        className="space-y-3"
        data-semtag-id="dashboard.recent"
        data-semtag-role="collection"
      >
        {recentTransactions.map((transaction) => {
          const category = getCategoryById(transaction.categoryId);
          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full',
                  transaction.type === 'income' ? 'bg-income-light' : 'bg-expense-light'
                )}>
                  {transaction.type === 'income' ? (
                    <ArrowDownLeft className="h-5 w-5 text-income" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-expense" />
                  )}
                </div>
                <div>
                  <p
                    className="font-medium text-sm"
                    data-semtag-id={`dashboard.recent.item.${transaction.id}`}
                    data-semtag-role="observable"
                    data-semtag-state="transaction.description"
                  >{transaction.description}</p>
                  <p
                    className="text-xs text-muted-foreground"
                    data-semtag-id={`dashboard.recent.item.${transaction.id}.meta`}
                    data-semtag-role="observable"
                    data-semtag-state="transaction.category,transaction.date"
                  >
                    {category?.name} • {format(new Date(transaction.date), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  'font-semibold font-mono',
                  transaction.type === 'income' ? 'amount-positive' : 'amount-negative'
                )}
                data-semtag-id={`dashboard.recent.item.${transaction.id}.amount`}
                data-semtag-role="observable"
                data-semtag-state="transaction.amount"
              >
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
