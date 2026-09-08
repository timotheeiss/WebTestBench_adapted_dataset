import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useBookkeeping } from '@/context/BookkeepingContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, startOfMonth, endOfMonth, isWithinInterval, subMonths } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const Reports = () => {
  const { transactions, categories } = useBookkeeping();
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));

  const monthOptions = useMemo(() => {
    const options = [];
    for (let i = 0; i < 12; i++) {
      const date = subMonths(new Date(), i);
      options.push({
        value: format(date, 'yyyy-MM'),
        label: format(date, 'MMMM yyyy'),
      });
    }
    return options;
  }, []);

  const [year, month] = selectedMonth.split('-').map(Number);
  const selectedDate = new Date(year, month - 1);
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);

  const monthlyTransactions = useMemo(() => {
    return transactions.filter(t =>
      isWithinInterval(new Date(t.date), { start: monthStart, end: monthEnd })
    );
  }, [transactions, monthStart, monthEnd]);

  const totals = useMemo(() => {
    const income = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expenses, profit: income - expenses };
  }, [monthlyTransactions]);

  const expensesByCategory = useMemo(() => {
    const expenseTransactions = monthlyTransactions.filter(t => t.type === 'expense');
    const grouped = expenseTransactions.reduce((acc, t) => {
      acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped)
      .map(([categoryId, amount]) => {
        const category = categories.find(c => c.id === categoryId);
        return {
          name: category?.name || 'Unknown',
          amount,
          color: category?.color || '#94a3b8',
        };
      })
      .sort((a, b) => b.amount - a.amount);
  }, [monthlyTransactions, categories]);

  const incomeByCategory = useMemo(() => {
    const incomeTransactions = monthlyTransactions.filter(t => t.type === 'income');
    const grouped = incomeTransactions.reduce((acc, t) => {
      acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped)
      .map(([categoryId, amount]) => {
        const category = categories.find(c => c.id === categoryId);
        return {
          name: category?.name || 'Unknown',
          amount,
          color: category?.color || '#22c55e',
        };
      })
      .sort((a, b) => b.amount - a.amount);
  }, [monthlyTransactions, categories]);

  const dailyData = useMemo(() => {
    const days: Record<string, { income: number; expenses: number }> = {};
    
    monthlyTransactions.forEach(t => {
      const day = format(new Date(t.date), 'MMM d');
      if (!days[day]) {
        days[day] = { income: 0, expenses: 0 };
      }
      if (t.type === 'income') {
        days[day].income += t.amount;
      } else {
        days[day].expenses += t.amount;
      }
    });

    return Object.entries(days)
      .map(([day, data]) => ({ day, ...data }))
      .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
  }, [monthlyTransactions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground mt-1">
              Monthly financial analysis
            </p>
          </div>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger
              className="w-[200px]"
              data-semtag-id="reports.month"
              data-semtag-role="select"
              data-semtag-state="reports.month"
              data-semtag-options={monthOptions.map((o) => `${o.value}|${o.label}`).join(';')}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {monthOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-income-light flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-income" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Total Income</span>
            </div>
            <p
              className="text-3xl font-bold text-income font-mono"
              data-semtag-id="reports.summary.income"
              data-semtag-role="observable"
              data-semtag-state="report.income"
            >
              {formatCurrency(totals.income)}
            </p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-expense-light flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-expense" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Total Expenses</span>
            </div>
            <p
              className="text-3xl font-bold text-expense font-mono"
              data-semtag-id="reports.summary.expenses"
              data-semtag-role="observable"
              data-semtag-state="report.expenses"
            >
              {formatCurrency(totals.expenses)}
            </p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-2">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                totals.profit >= 0 ? 'bg-income-light' : 'bg-expense-light'
              }`}>
                <DollarSign className={`h-5 w-5 ${totals.profit >= 0 ? 'text-income' : 'text-expense'}`} />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Net Profit/Loss</span>
            </div>
            <p
              className={`text-3xl font-bold font-mono ${
                totals.profit >= 0 ? 'text-income' : 'text-expense'
              }`}
              data-semtag-id="reports.summary.profit"
              data-semtag-role="observable"
              data-semtag-state="report.profit"
            >
              {totals.profit >= 0 ? '+' : ''}{formatCurrency(totals.profit)}
            </p>
          </div>
        </div>

        {/* Daily Activity Chart */}
        <div className="stat-card">
          <h3 className="text-lg font-semibold mb-4">Daily Activity</h3>
          <div className="h-[300px]">
            {dailyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    stroke="hsl(var(--income))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--income))' }}
                    name="Income"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="hsl(var(--expense))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--expense))' }}
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No data for this period
              </div>
            )}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Income by Category */}
          <div className="stat-card">
            <h3 className="text-lg font-semibold mb-4">Income by Category</h3>
            {incomeByCategory.length > 0 ? (
              <div
                className="space-y-3"
                data-semtag-id="reports.income-by-category"
                data-semtag-role="collection"
              >
                {incomeByCategory.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span
                        className="font-medium"
                        data-semtag-id={`reports.income-by-category.item.${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        data-semtag-role="observable"
                        data-semtag-state="category.name"
                      >{item.name}</span>
                      <span
                        className="font-mono text-income"
                        data-semtag-id={`reports.income-by-category.item.${item.name.toLowerCase().replace(/\s+/g, '-')}.amount`}
                        data-semtag-role="observable"
                        data-semtag-state="category.income"
                      >{formatCurrency(item.amount)}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(item.amount / totals.income) * 100}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p
                className="text-muted-foreground text-center py-8"
                data-semtag-id="reports.income-by-category.empty"
                data-semtag-role="observable"
                data-semtag-state="report.income-empty-message"
              >No income this period</p>
            )}
          </div>

          {/* Expenses by Category */}
          <div className="stat-card">
            <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
            {expensesByCategory.length > 0 ? (
              <div
                className="space-y-3"
                data-semtag-id="reports.expenses-by-category"
                data-semtag-role="collection"
              >
                {expensesByCategory.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span
                        className="font-medium"
                        data-semtag-id={`reports.expenses-by-category.item.${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        data-semtag-role="observable"
                        data-semtag-state="category.name"
                      >{item.name}</span>
                      <span
                        className="font-mono text-expense"
                        data-semtag-id={`reports.expenses-by-category.item.${item.name.toLowerCase().replace(/\s+/g, '-')}.amount`}
                        data-semtag-role="observable"
                        data-semtag-state="category.expenses"
                      >{formatCurrency(item.amount)}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(item.amount / totals.expenses) * 100}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p
                className="text-muted-foreground text-center py-8"
                data-semtag-id="reports.expenses-by-category.empty"
                data-semtag-role="observable"
                data-semtag-state="report.expenses-empty-message"
              >No expenses this period</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
