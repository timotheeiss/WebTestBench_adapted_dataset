import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useBookkeeping } from '@/context/BookkeepingContext';
import { Transaction } from '@/data/mockData';
import { format } from 'date-fns';

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: Transaction | null;
}

export function TransactionDialog({ open, onOpenChange, transaction }: TransactionDialogProps) {
  const { categories, addTransaction, updateTransaction } = useBookkeeping();
  const isEditing = !!transaction;

  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    categoryId: '',
    isTaxRelated: false,
    reference: '',
    notes: '',
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        date: transaction.date,
        description: transaction.description,
        amount: transaction.amount.toString(),
        type: transaction.type,
        categoryId: transaction.categoryId,
        isTaxRelated: transaction.isTaxRelated,
        reference: transaction.reference || '',
        notes: transaction.notes || '',
      });
    } else {
      setFormData({
        date: format(new Date(), 'yyyy-MM-dd'),
        description: '',
        amount: '',
        type: 'expense',
        categoryId: '',
        isTaxRelated: false,
        reference: '',
        notes: '',
      });
    }
  }, [transaction, open]);

  const filteredCategories = categories.filter(c => c.type === formData.type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transactionData = {
      date: formData.date,
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type,
      categoryId: formData.categoryId,
      isTaxRelated: formData.isTaxRelated,
      reference: formData.reference || undefined,
      notes: formData.notes || undefined,
    };

    if (isEditing && transaction) {
      updateTransaction(transaction.id, transactionData);
    } else {
      addTransaction(transactionData);
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px] bg-card"
        data-semtag-id="transaction.form"
        data-semtag-role="region"
      >
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: 'income' | 'expense') => 
                  setFormData({ ...formData, type: value, categoryId: '' })
                }
              >
                <SelectTrigger
                  data-semtag-id="transaction.form.type"
                  data-semtag-role="select"
                  data-semtag-state="transaction.type"
                  data-semtag-options="income|Income;expense|Expense"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                data-semtag-id="transaction.form.date"
                data-semtag-role="input"
                data-semtag-state="transaction.date"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
              required
              data-semtag-id="transaction.form.description"
              data-semtag-role="input"
              data-semtag-state="transaction.description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                required
                data-semtag-id="transaction.form.amount"
                data-semtag-role="input"
                data-semtag-state="transaction.amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
              >
                <SelectTrigger
                  data-semtag-id="transaction.form.category"
                  data-semtag-role="select"
                  data-semtag-state="transaction.category"
                  data-semtag-options={filteredCategories.map((c) => `${c.id}|${c.name}`).join(';')}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {filteredCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Reference (Optional)</Label>
            <Input
              id="reference"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              placeholder="Invoice #, Receipt #, etc."
              data-semtag-id="transaction.form.reference"
              data-semtag-role="input"
              data-semtag-state="transaction.reference"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes..."
              rows={2}
              data-semtag-id="transaction.form.notes"
              data-semtag-role="input"
              data-semtag-state="transaction.notes"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="tax-related">Tax Related</Label>
              <p className="text-xs text-muted-foreground">
                Include in tax summary reports
              </p>
            </div>
            <Switch
              id="tax-related"
              checked={formData.isTaxRelated}
              onCheckedChange={(checked) => setFormData({ ...formData, isTaxRelated: checked })}
              data-semtag-id="transaction.form.tax-related"
              data-semtag-role="toggle"
              data-semtag-state="transaction.tax-related"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-semtag-id="transaction.form.cancel"
              data-semtag-role="action"
              data-semtag-action="cancel-transaction-form"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={formData.type === 'income' ? 'income' : 'expense'}
              data-semtag-id="transaction.form.submit"
              data-semtag-role="action"
              data-semtag-action="save-transaction"
            >
              {isEditing ? 'Update' : 'Add'} {formData.type === 'income' ? 'Income' : 'Expense'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
