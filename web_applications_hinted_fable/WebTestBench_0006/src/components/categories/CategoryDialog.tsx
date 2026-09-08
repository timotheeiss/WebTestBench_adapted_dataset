import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBookkeeping } from '@/context/BookkeepingContext';
import { Category } from '@/data/mockData';

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
}

const colorOptions = [
  { value: '#22c55e', label: 'Green' },
  { value: '#10b981', label: 'Emerald' },
  { value: '#14b8a6', label: 'Teal' },
  { value: '#06b6d4', label: 'Cyan' },
  { value: '#3b82f6', label: 'Blue' },
  { value: '#8b5cf6', label: 'Violet' },
  { value: '#a855f7', label: 'Purple' },
  { value: '#f59e0b', label: 'Amber' },
  { value: '#f97316', label: 'Orange' },
  { value: '#ef4444', label: 'Red' },
  { value: '#dc2626', label: 'Rose' },
  { value: '#e11d48', label: 'Pink' },
];

export function CategoryDialog({ open, onOpenChange, category }: CategoryDialogProps) {
  const { addCategory, updateCategory } = useBookkeeping();
  const isEditing = !!category;

  const [formData, setFormData] = useState({
    name: '',
    type: 'expense' as 'income' | 'expense',
    color: '#22c55e',
    icon: 'Folder',
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        type: category.type,
        color: category.color,
        icon: category.icon,
      });
    } else {
      setFormData({
        name: '',
        type: 'expense',
        color: '#22c55e',
        icon: 'Folder',
      });
    }
  }, [category, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && category) {
      updateCategory(category.id, formData);
    } else {
      addCategory(formData);
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[400px] bg-card"
        data-semtag-id="category.form"
        data-semtag-role="region"
      >
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Category' : 'Add Category'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Category name"
              required
              data-semtag-id="category.form.name"
              data-semtag-role="input"
              data-semtag-state="category.name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: 'income' | 'expense') => 
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger
                data-semtag-id="category.form.type"
                data-semtag-role="select"
                data-semtag-state="category.type"
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
            <Label>Color</Label>
            <div
              className="grid grid-cols-6 gap-2"
              data-semtag-id="category.form.colors"
              data-semtag-role="collection"
            >
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  data-semtag-id={`category.form.colors.item.${color.label.toLowerCase()}`}
                  data-semtag-role="option"
                  data-semtag-action="pick-color"
                  data-semtag-state={formData.color === color.value ? 'selected' : undefined}
                  className={`h-8 w-full rounded-md transition-all ${
                    formData.color === color.value 
                      ? 'ring-2 ring-ring ring-offset-2' 
                      : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.label}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-semtag-id="category.form.cancel"
              data-semtag-role="action"
              data-semtag-action="cancel-category-form"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-semtag-id="category.form.submit"
              data-semtag-role="action"
              data-semtag-action="save-category"
            >
              {isEditing ? 'Update' : 'Add'} Category
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
