import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useBookkeeping } from '@/context/BookkeepingContext';
import { Search, X } from 'lucide-react';

interface TransactionFiltersProps {
  filters: {
    search: string;
    type: string;
    categoryId: string;
    dateFrom: string;
    dateTo: string;
  };
  onFiltersChange: (filters: TransactionFiltersProps['filters']) => void;
}

export function TransactionFilters({ filters, onFiltersChange }: TransactionFiltersProps) {
  const { categories } = useBookkeeping();

  const handleClearFilters = () => {
    onFiltersChange({
      search: '',
      type: 'all',
      categoryId: 'all',
      dateFrom: '',
      dateTo: '',
    });
  };

  const hasActiveFilters = 
    filters.search || 
    filters.type !== 'all' || 
    filters.categoryId !== 'all' || 
    filters.dateFrom || 
    filters.dateTo;

  return (
    <div
      className="bg-card rounded-xl border border-border p-4 space-y-4"
      data-semtag-id="transactions.filters"
      data-semtag-role="region"
    >
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-9"
            data-semtag-id="transactions.filters.search"
            data-semtag-role="input"
            data-semtag-state="filters.search"
            data-semtag-controls="transactions.table"
          />
        </div>

        <Select
          value={filters.type}
          onValueChange={(value) => onFiltersChange({ ...filters, type: value })}
        >
          <SelectTrigger
            className="w-[140px]"
            data-semtag-id="transactions.filters.type"
            data-semtag-role="select"
            data-semtag-state="filters.type"
            data-semtag-controls="transactions.table"
            data-semtag-options="all|All Types;income|Income;expense|Expense"
          >
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.categoryId}
          onValueChange={(value) => onFiltersChange({ ...filters, categoryId: value })}
        >
          <SelectTrigger
            className="w-[180px]"
            data-semtag-id="transactions.filters.category"
            data-semtag-role="select"
            data-semtag-state="filters.category"
            data-semtag-controls="transactions.table"
            data-semtag-options={['all|All Categories', ...categories.map((c) => `${c.id}|${c.name}`)].join(';')}
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">From:</span>
          <Input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
            className="w-auto"
            data-semtag-id="transactions.filters.date-from"
            data-semtag-role="input"
            data-semtag-state="filters.date-from"
            data-semtag-controls="transactions.table"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">To:</span>
          <Input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
            className="w-auto"
            data-semtag-id="transactions.filters.date-to"
            data-semtag-role="input"
            data-semtag-state="filters.date-to"
            data-semtag-controls="transactions.table"
          />
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            data-semtag-id="transactions.filters.clear"
            data-semtag-role="action"
            data-semtag-action="clear-filters"
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
