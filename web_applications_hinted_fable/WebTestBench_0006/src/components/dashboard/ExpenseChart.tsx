import { useBookkeeping } from '@/context/BookkeepingContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function ExpenseChart() {
  const { transactions, categories } = useBookkeeping();

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const chartData = Object.entries(expensesByCategory)
    .map(([categoryId, amount]) => {
      const category = categories.find(c => c.id === categoryId);
      return {
        name: category?.name || 'Unknown',
        value: amount,
        color: category?.color || '#94a3b8',
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="stat-card animate-slide-up">
      <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend
              formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
