import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { ExpenseChart } from '@/components/dashboard/ExpenseChart';
import { MonthlyChart } from '@/components/dashboard/MonthlyChart';
import { useBookkeeping } from '@/context/BookkeepingContext';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';
import { startOfMonth, endOfMonth, isWithinInterval, subMonths } from 'date-fns';

const Index = () => {
  const { transactions, accounts } = useBookkeeping();

  const currentMonth = new Date();
  const lastMonth = subMonths(currentMonth, 1);

  const getMonthlyTotals = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    
    const monthTransactions = transactions.filter(t =>
      isWithinInterval(new Date(t.date), { start, end })
    );

    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return { income, expenses, profit: income - expenses };
  };

  const currentTotals = getMonthlyTotals(currentMonth);
  const lastTotals = getMonthlyTotals(lastMonth);

  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return { value: 0, isPositive: true };
    const change = ((current - previous) / previous) * 100;
    return { value: Math.abs(Math.round(change)), isPositive: change >= 0 };
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your financial activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Balance"
            value={formatCurrency(totalBalance)}
            subtitle="Across all accounts"
            icon={<Wallet className="h-6 w-6" />}
            data-semtag-id="dashboard.stats.balance"
            data-semtag-role="observable"
            data-semtag-state="balance.total"
          />
          <StatCard
            title="Monthly Income"
            value={formatCurrency(currentTotals.income)}
            icon={<TrendingUp className="h-6 w-6" />}
            trend={calculateTrend(currentTotals.income, lastTotals.income)}
            variant="income"
            data-semtag-id="dashboard.stats.income"
            data-semtag-role="observable"
            data-semtag-state="month.income"
          />
          <StatCard
            title="Monthly Expenses"
            value={formatCurrency(currentTotals.expenses)}
            icon={<TrendingDown className="h-6 w-6" />}
            trend={{
              value: calculateTrend(currentTotals.expenses, lastTotals.expenses).value,
              isPositive: currentTotals.expenses < lastTotals.expenses
            }}
            variant="expense"
            data-semtag-id="dashboard.stats.expenses"
            data-semtag-role="observable"
            data-semtag-state="month.expenses"
          />
          <StatCard
            title="Net Profit/Loss"
            value={formatCurrency(currentTotals.profit)}
            subtitle="This month"
            icon={<DollarSign className="h-6 w-6" />}
            variant={currentTotals.profit >= 0 ? 'income' : 'expense'}
            data-semtag-id="dashboard.stats.profit"
            data-semtag-role="observable"
            data-semtag-state="month.profit"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <MonthlyChart />
          <ExpenseChart />
        </div>

        {/* Recent Transactions */}
        <RecentTransactions />
      </div>
    </MainLayout>
  );
};

export default Index;
