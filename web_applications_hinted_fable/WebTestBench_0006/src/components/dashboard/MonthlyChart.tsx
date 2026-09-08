import { useBookkeeping } from '@/context/BookkeepingContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export function MonthlyChart() {
  const { transactions } = useBookkeeping();

  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), 5 - i);
    return {
      month: format(date, 'MMM'),
      start: startOfMonth(date),
      end: endOfMonth(date),
    };
  });

  const chartData = last6Months.map(({ month, start, end }) => {
    const monthTransactions = transactions.filter(t =>
      isWithinInterval(new Date(t.date), { start, end })
    );

    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return { month, income, expenses };
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="stat-card animate-slide-up">
      <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar 
              dataKey="income" 
              fill="hsl(var(--income))" 
              radius={[4, 4, 0, 0]}
              name="Income"
            />
            <Bar 
              dataKey="expenses" 
              fill="hsl(var(--expense))" 
              radius={[4, 4, 0, 0]}
              name="Expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
