import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { TransactionDialog } from '@/components/transactions/TransactionDialog';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { Button } from '@/components/ui/button';
import { useBookkeeping } from '@/context/BookkeepingContext';
import { Transaction } from '@/data/mockData';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Plus, Pencil, Trash2, Receipt, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Transactions = () => {
  const { transactions, getCategoryById, deleteTransaction } = useBookkeeping();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    categoryId: 'all',
    dateFrom: '',
    dateTo: '',
  });

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          if (!t.description.toLowerCase().includes(searchLower) &&
              !t.reference?.toLowerCase().includes(searchLower)) {
            return false;
          }
        }
        if (filters.type !== 'all' && t.type !== filters.type) return false;
        if (filters.categoryId !== 'all' && t.categoryId !== filters.categoryId) return false;
        if (filters.dateFrom && t.date < filters.dateFrom) return false;
        if (filters.dateTo && t.date > filters.dateTo) return false;
        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filters]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTransactionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete);
    }
    setDeleteDialogOpen(false);
    setTransactionToDelete(null);
  };

  const handleAddNew = () => {
    setEditingTransaction(null);
    setDialogOpen(true);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground mt-1">
              Manage your income and expenses
            </p>
          </div>
          <Button
            onClick={handleAddNew}
            data-semtag-id="transactions.add"
            data-semtag-role="action"
            data-semtag-action="add-transaction"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>

        {/* Filters */}
        <TransactionFilters filters={filters} onFiltersChange={setFilters} />

        {/* Transactions Table */}
        <div
          className="bg-card rounded-xl border border-border overflow-hidden"
          data-semtag-id="transactions.table"
          data-semtag-role="collection"
        >
          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center">
              <Receipt className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3
                className="text-lg font-medium"
                data-semtag-id="transactions.table.empty"
                data-semtag-role="observable"
                data-semtag-state="transactions.empty-message"
              >No transactions found</h3>
              <p className="text-muted-foreground mt-1">
                {transactions.length === 0 
                  ? 'Add your first transaction to get started'
                  : 'Try adjusting your filters'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="table-header text-left px-6 py-4">Date</th>
                    <th className="table-header text-left px-6 py-4">Description</th>
                    <th className="table-header text-left px-6 py-4">Category</th>
                    <th className="table-header text-left px-6 py-4">Reference</th>
                    <th className="table-header text-right px-6 py-4">Amount</th>
                    <th className="table-header text-center px-6 py-4">Tax</th>
                    <th className="table-header text-right px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => {
                    const category = getCategoryById(transaction.categoryId);
                    return (
                      <tr 
                        key={transaction.id} 
                        className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span
                            className="text-sm"
                            data-semtag-id={`transactions.table.item.${transaction.id}.date`}
                            data-semtag-role="observable"
                            data-semtag-state="transaction.date"
                          >
                            {format(new Date(transaction.date), 'MMM d, yyyy')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              'flex h-8 w-8 items-center justify-center rounded-full',
                              transaction.type === 'income' ? 'bg-income-light' : 'bg-expense-light'
                            )}>
                              {transaction.type === 'income' ? (
                                <ArrowDownLeft className="h-4 w-4 text-income" />
                              ) : (
                                <ArrowUpRight className="h-4 w-4 text-expense" />
                              )}
                            </div>
                            <span
                              className="font-medium"
                              data-semtag-id={`transactions.table.item.${transaction.id}`}
                              data-semtag-role="observable"
                              data-semtag-state="transaction.description"
                            >{transaction.description}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${category?.color}20`,
                              color: category?.color
                            }}
                            data-semtag-id={`transactions.table.item.${transaction.id}.category`}
                            data-semtag-role="observable"
                            data-semtag-state="transaction.category"
                          >
                            {category?.name}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-muted-foreground font-mono">
                            {transaction.reference || '—'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={cn(
                              'font-semibold font-mono',
                              transaction.type === 'income' ? 'amount-positive' : 'amount-negative'
                            )}
                            data-semtag-id={`transactions.table.item.${transaction.id}.amount`}
                            data-semtag-role="observable"
                            data-semtag-state="transaction.amount"
                          >
                            {transaction.type === 'income' ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {transaction.isTaxRelated && (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                              ✓
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(transaction)}
                              data-semtag-id={`transactions.table.item.${transaction.id}.edit`}
                              data-semtag-role="action"
                              data-semtag-action="edit-transaction"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(transaction.id)}
                              data-semtag-id={`transactions.table.item.${transaction.id}.delete`}
                              data-semtag-role="action"
                              data-semtag-action="delete-transaction"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary */}
        {filteredTransactions.length > 0 && (
          <div className="flex justify-end">
            <div className="bg-card rounded-xl border border-border p-4 inline-flex gap-8">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p
                  className="text-lg font-semibold amount-positive font-mono"
                  data-semtag-id="transactions.summary.income"
                  data-semtag-role="observable"
                  data-semtag-state="transactions.total-income"
                >
                  +{formatCurrency(
                    filteredTransactions
                      .filter(t => t.type === 'income')
                      .reduce((sum, t) => sum + t.amount, 0)
                  )}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p
                  className="text-lg font-semibold amount-negative font-mono"
                  data-semtag-id="transactions.summary.expenses"
                  data-semtag-role="observable"
                  data-semtag-state="transactions.total-expenses"
                >
                  -{formatCurrency(
                    filteredTransactions
                      .filter(t => t.type === 'expense')
                      .reduce((sum, t) => sum + t.amount, 0)
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <TransactionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        transaction={editingTransaction}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent
          className="bg-card"
          data-semtag-id="transactions.delete-dialog"
          data-semtag-role="region"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this transaction? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-semtag-id="transactions.delete-dialog.cancel"
              data-semtag-role="action"
              data-semtag-action="cancel-delete"
            >Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground"
              data-semtag-id="transactions.delete-dialog.confirm"
              data-semtag-role="action"
              data-semtag-action="confirm-delete-transaction"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default Transactions;
