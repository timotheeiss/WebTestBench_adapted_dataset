import { useState, useMemo, useRef } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useBookkeeping } from '@/context/BookkeepingContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, startOfYear, endOfYear, isWithinInterval } from 'date-fns';
import { Printer, Download, Calculator, TrendingUp, TrendingDown, FileText } from 'lucide-react';

const TaxSummary = () => {
  const { transactions, categories } = useBookkeeping();
  const printRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const yearOptions = Array.from({ length: 5 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString(),
  }));

  const yearStart = startOfYear(new Date(parseInt(selectedYear), 0));
  const yearEnd = endOfYear(new Date(parseInt(selectedYear), 0));

  const taxTransactions = useMemo(() => {
    return transactions.filter(t =>
      t.isTaxRelated &&
      isWithinInterval(new Date(t.date), { start: yearStart, end: yearEnd })
    );
  }, [transactions, yearStart, yearEnd]);

  const summary = useMemo(() => {
    const incomeByCategory: Record<string, number> = {};
    const expensesByCategory: Record<string, number> = {};
    let totalIncome = 0;
    let totalExpenses = 0;

    taxTransactions.forEach(t => {
      if (t.type === 'income') {
        totalIncome += t.amount;
        incomeByCategory[t.categoryId] = (incomeByCategory[t.categoryId] || 0) + t.amount;
      } else {
        totalExpenses += t.amount;
        expensesByCategory[t.categoryId] = (expensesByCategory[t.categoryId] || 0) + t.amount;
      }
    });

    return {
      totalIncome,
      totalExpenses,
      netIncome: totalIncome - totalExpenses,
      incomeByCategory: Object.entries(incomeByCategory)
        .map(([categoryId, amount]) => ({
          category: categories.find(c => c.id === categoryId),
          amount,
        }))
        .sort((a, b) => b.amount - a.amount),
      expensesByCategory: Object.entries(expensesByCategory)
        .map(([categoryId, amount]) => ({
          category: categories.find(c => c.id === categoryId),
          amount,
        }))
        .sort((a, b) => b.amount - a.amount),
    };
  }, [taxTransactions, categories]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between no-print">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tax Summary</h1>
            <p className="text-muted-foreground mt-1">
              Review tax-related transactions and generate reports
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger
                className="w-[140px]"
                data-semtag-id="tax.year"
                data-semtag-role="select"
                data-semtag-state="tax.year"
                data-semtag-options={yearOptions.map((o) => `${o.value}|${o.label}`).join(';')}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {yearOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handlePrint}
              data-semtag-id="tax.print"
              data-semtag-role="action"
              data-semtag-action="print-report"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Report
            </Button>
          </div>
        </div>

        {/* Print-Friendly Content */}
        <div ref={printRef} className="print-friendly">
          {/* Print Header (hidden on screen) */}
          <div className="hidden print:block mb-8">
            <h1 className="text-2xl font-bold">Tax Summary Report</h1>
            <p className="text-muted-foreground">Fiscal Year {selectedYear}</p>
            <p className="text-sm text-muted-foreground">Generated on {format(new Date(), 'MMMM d, yyyy')}</p>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="stat-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-income-light flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-income" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Total Taxable Income</span>
              </div>
              <p
                className="text-3xl font-bold text-income font-mono"
                data-semtag-id="tax.summary.income"
                data-semtag-role="observable"
                data-semtag-state="tax.income"
              >
                {formatCurrency(summary.totalIncome)}
              </p>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-expense-light flex items-center justify-center">
                  <TrendingDown className="h-5 w-5 text-expense" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Total Deductible Expenses</span>
              </div>
              <p
                className="text-3xl font-bold text-expense font-mono"
                data-semtag-id="tax.summary.expenses"
                data-semtag-role="observable"
                data-semtag-state="tax.expenses"
              >
                {formatCurrency(summary.totalExpenses)}
              </p>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-3 mb-2">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  summary.netIncome >= 0 ? 'bg-income-light' : 'bg-expense-light'
                }`}>
                  <Calculator className={`h-5 w-5 ${summary.netIncome >= 0 ? 'text-income' : 'text-expense'}`} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Net Taxable Income</span>
              </div>
              <p
                className={`text-3xl font-bold font-mono ${
                  summary.netIncome >= 0 ? 'text-income' : 'text-expense'
                }`}
                data-semtag-id="tax.summary.net"
                data-semtag-role="observable"
                data-semtag-state="tax.net-income"
              >
                {formatCurrency(summary.netIncome)}
              </p>
            </div>
          </div>

          {/* Income Breakdown */}
          <div className="stat-card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-income" />
              <h3 className="text-lg font-semibold">Taxable Income by Category</h3>
            </div>
            {summary.incomeByCategory.length > 0 ? (
              <div
                className="overflow-x-auto"
                data-semtag-id="tax.income-table"
                data-semtag-role="collection"
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="table-header text-left py-3">Category</th>
                      <th className="table-header text-right py-3">Amount</th>
                      <th className="table-header text-right py-3">% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.incomeByCategory.map(({ category, amount }) => (
                      <tr key={category?.id} className="border-b border-border last:border-0">
                        <td
                          className="py-3 font-medium"
                          data-semtag-id={category ? `tax.income-table.item.${category.id}` : undefined}
                          data-semtag-role={category ? 'observable' : undefined}
                          data-semtag-state={category ? 'category.name' : undefined}
                        >{category?.name || 'Unknown'}</td>
                        <td
                          className="py-3 text-right font-mono text-income"
                          data-semtag-id={category ? `tax.income-table.item.${category.id}.amount` : undefined}
                          data-semtag-role={category ? 'observable' : undefined}
                          data-semtag-state={category ? 'category.taxable-income' : undefined}
                        >
                          {formatCurrency(amount)}
                        </td>
                        <td className="py-3 text-right text-muted-foreground">
                          {((amount / summary.totalIncome) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-muted/50 font-semibold">
                      <td className="py-3">Total</td>
                      <td className="py-3 text-right font-mono text-income">
                        {formatCurrency(summary.totalIncome)}
                      </td>
                      <td className="py-3 text-right">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No taxable income recorded for {selectedYear}
              </p>
            )}
          </div>

          {/* Expense Breakdown */}
          <div className="stat-card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-expense" />
              <h3 className="text-lg font-semibold">Deductible Expenses by Category</h3>
            </div>
            {summary.expensesByCategory.length > 0 ? (
              <div
                className="overflow-x-auto"
                data-semtag-id="tax.expense-table"
                data-semtag-role="collection"
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="table-header text-left py-3">Category</th>
                      <th className="table-header text-right py-3">Amount</th>
                      <th className="table-header text-right py-3">% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.expensesByCategory.map(({ category, amount }) => (
                      <tr key={category?.id} className="border-b border-border last:border-0">
                        <td
                          className="py-3 font-medium"
                          data-semtag-id={category ? `tax.expense-table.item.${category.id}` : undefined}
                          data-semtag-role={category ? 'observable' : undefined}
                          data-semtag-state={category ? 'category.name' : undefined}
                        >{category?.name || 'Unknown'}</td>
                        <td
                          className="py-3 text-right font-mono text-expense"
                          data-semtag-id={category ? `tax.expense-table.item.${category.id}.amount` : undefined}
                          data-semtag-role={category ? 'observable' : undefined}
                          data-semtag-state={category ? 'category.deductible-expenses' : undefined}
                        >
                          {formatCurrency(amount)}
                        </td>
                        <td className="py-3 text-right text-muted-foreground">
                          {((amount / summary.totalExpenses) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-muted/50 font-semibold">
                      <td className="py-3">Total</td>
                      <td className="py-3 text-right font-mono text-expense">
                        {formatCurrency(summary.totalExpenses)}
                      </td>
                      <td className="py-3 text-right">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No deductible expenses recorded for {selectedYear}
              </p>
            )}
          </div>

          {/* Transaction List */}
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">All Tax-Related Transactions</h3>
              <span
                className="text-sm text-muted-foreground"
                data-semtag-id="tax.transactions.count"
                data-semtag-role="observable"
                data-semtag-state="tax.transaction-count"
              >
                {taxTransactions.length} transactions
              </span>
            </div>
            {taxTransactions.length > 0 ? (
              <div
                className="overflow-x-auto"
                data-semtag-id="tax.transactions"
                data-semtag-role="collection"
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="table-header text-left py-3">Date</th>
                      <th className="table-header text-left py-3">Description</th>
                      <th className="table-header text-left py-3">Category</th>
                      <th className="table-header text-left py-3">Reference</th>
                      <th className="table-header text-right py-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxTransactions
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((transaction) => {
                        const category = categories.find(c => c.id === transaction.categoryId);
                        return (
                          <tr key={transaction.id} className="border-b border-border last:border-0">
                            <td
                              className="py-3 text-sm"
                              data-semtag-id={`tax.transactions.item.${transaction.id}.date`}
                              data-semtag-role="observable"
                              data-semtag-state="transaction.date"
                            >
                              {format(new Date(transaction.date), 'MMM d, yyyy')}
                            </td>
                            <td
                              className="py-3 font-medium"
                              data-semtag-id={`tax.transactions.item.${transaction.id}`}
                              data-semtag-role="observable"
                              data-semtag-state="transaction.description"
                            >{transaction.description}</td>
                            <td className="py-3 text-sm text-muted-foreground">
                              {category?.name}
                            </td>
                            <td className="py-3 text-sm font-mono text-muted-foreground">
                              {transaction.reference || '—'}
                            </td>
                            <td
                              className={`py-3 text-right font-mono font-semibold ${
                                transaction.type === 'income' ? 'text-income' : 'text-expense'
                              }`}
                              data-semtag-id={`tax.transactions.item.${transaction.id}.amount`}
                              data-semtag-role="observable"
                              data-semtag-state="transaction.amount"
                            >
                              {transaction.type === 'income' ? '+' : '-'}
                              {formatCurrency(transaction.amount)}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No tax-related transactions for {selectedYear}
              </p>
            )}
          </div>

          {/* Print Footer */}
          <div className="hidden print:block mt-8 pt-4 border-t border-border text-sm text-muted-foreground">
            <p>This report is for informational purposes only. Please consult a tax professional for advice.</p>
            <p>Generated by LedgerFlow Bookkeeping</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TaxSummary;
