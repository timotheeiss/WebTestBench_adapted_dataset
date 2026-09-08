import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CategoryDialog } from '@/components/categories/CategoryDialog';
import { Button } from '@/components/ui/button';
import { useBookkeeping } from '@/context/BookkeepingContext';
import { Category } from '@/data/mockData';
import { Plus, Pencil, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
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

const Categories = () => {
  const { categories, transactions, deleteCategory } = useBookkeeping();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const incomeCategories = categories.filter(c => c.type === 'income');
  const expenseCategories = categories.filter(c => c.type === 'expense');

  const getCategoryTotal = (categoryId: string) => {
    return transactions
      .filter(t => t.categoryId === categoryId)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getCategoryCount = (categoryId: string) => {
    return transactions.filter(t => t.categoryId === categoryId).length;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete);
    }
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setDialogOpen(true);
  };

  const CategoryCard = ({ category, collectionId }: { category: Category; collectionId: string }) => (
    <div className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${category.color}20` }}
          >
            {category.type === 'income' ? (
              <TrendingUp className="h-5 w-5" style={{ color: category.color }} />
            ) : (
              <TrendingDown className="h-5 w-5" style={{ color: category.color }} />
            )}
          </div>
          <div>
            <h3
              className="font-medium"
              data-semtag-id={`${collectionId}.item.${category.id}`}
              data-semtag-role="observable"
              data-semtag-state="category.name"
            >{category.name}</h3>
            <p
              className="text-sm text-muted-foreground"
              data-semtag-id={`${collectionId}.item.${category.id}.count`}
              data-semtag-role="observable"
              data-semtag-state="category.transaction-count"
            >
              {getCategoryCount(category.id)} transactions
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleEdit(category)}
            data-semtag-id={`${collectionId}.item.${category.id}.edit`}
            data-semtag-role="action"
            data-semtag-action="edit-category"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(category.id)}
            data-semtag-id={`${collectionId}.item.${category.id}.delete`}
            data-semtag-role="action"
            data-semtag-action="delete-category"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">Total</p>
        <p
          className="text-xl font-semibold font-mono"
          style={{ color: category.color }}
          data-semtag-id={`${collectionId}.item.${category.id}.total`}
          data-semtag-role="observable"
          data-semtag-state="category.total"
        >
          {formatCurrency(getCategoryTotal(category.id))}
        </p>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
            <p className="text-muted-foreground mt-1">
              Organize your transactions by category
            </p>
          </div>
          <Button
            onClick={handleAddNew}
            data-semtag-id="categories.add"
            data-semtag-role="action"
            data-semtag-action="add-category"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>

        {/* Income Categories */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-income-light flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-income" />
            </div>
            <h2 className="text-xl font-semibold">Income Categories</h2>
            <span className="text-sm text-muted-foreground">
              ({incomeCategories.length})
            </span>
          </div>
          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            data-semtag-id="categories.income"
            data-semtag-role="collection"
          >
            {incomeCategories.map((category) => (
              <CategoryCard key={category.id} category={category} collectionId="categories.income" />
            ))}
          </div>
        </div>

        {/* Expense Categories */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-expense-light flex items-center justify-center">
              <TrendingDown className="h-4 w-4 text-expense" />
            </div>
            <h2 className="text-xl font-semibold">Expense Categories</h2>
            <span className="text-sm text-muted-foreground">
              ({expenseCategories.length})
            </span>
          </div>
          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            data-semtag-id="categories.expense"
            data-semtag-role="collection"
          >
            {expenseCategories.map((category) => (
              <CategoryCard key={category.id} category={category} collectionId="categories.expense" />
            ))}
          </div>
        </div>
      </div>

      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={editingCategory}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent
          className="bg-card"
          data-semtag-id="categories.delete-dialog"
          data-semtag-role="region"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? Transactions using this category will not be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-semtag-id="categories.delete-dialog.cancel"
              data-semtag-role="action"
              data-semtag-action="cancel-delete"
            >Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground"
              data-semtag-id="categories.delete-dialog.confirm"
              data-semtag-role="action"
              data-semtag-action="confirm-delete-category"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default Categories;
