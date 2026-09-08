import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ProductFilters as ProductFiltersType } from '@/context/ProductContext';
import { categories, allTags, Category } from '@/data/products';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  filters: ProductFiltersType;
  onFiltersChange: (filters: ProductFiltersType) => void;
  maxPrice: number;
  /** data-semtag-id of the region these filters drive (e.g. the product grid) */
  semtagControls?: string;
}

const categoryOptions: { value: string; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
];

const sortOptions: { value: string; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const ratingOptions: { value: string; label: string }[] = [
  { value: 'any', label: 'Any rating' },
  { value: '4', label: '4+ stars' },
  { value: '4.5', label: '4.5+ stars' },
];

const toOptionsAttr = (opts: { value: string; label: string }[]) =>
  opts.map((o) => `${o.value}|${o.label}`).join(';');

export const ProductFilters = ({ filters, onFiltersChange, maxPrice, semtagControls }: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.searchQuery || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice || 0,
    filters.maxPrice || maxPrice,
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localSearch !== filters.searchQuery) {
        onFiltersChange({ ...filters, searchQuery: localSearch });
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [localSearch]);

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const applyPriceFilter = () => {
    onFiltersChange({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const toggleTag = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    onFiltersChange({ ...filters, tags: newTags });
  };

  const clearFilters = () => {
    setLocalSearch('');
    setPriceRange([0, maxPrice]);
    onFiltersChange({
      category: 'all',
      sortBy: 'newest',
    });
  };

  const hasActiveFilters =
    filters.searchQuery ||
    (filters.category && filters.category !== 'all') ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minRating ||
    (filters.tags && filters.tags.length > 0);

  return (
    <div className="space-y-4">
      {/* Main filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-9"
            data-semtag-id="filters.search"
            data-semtag-role="input"
            data-semtag-state="search.query"
            {...(semtagControls && { 'data-semtag-controls': semtagControls })}
          />
        </div>

        {/* Category */}
        <Select
          value={filters.category || 'all'}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, category: value as Category | 'all' })
          }
        >
          <SelectTrigger
            className="w-full sm:w-40"
            data-semtag-id="filters.category"
            data-semtag-role="select"
            data-semtag-state="filters.category"
            data-semtag-options={toOptionsAttr(categoryOptions)}
            {...(semtagControls && { 'data-semtag-controls': semtagControls })}
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                data-semtag-id={`filters.category.option.${opt.value}`}
                data-semtag-role="option"
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={filters.sortBy || 'newest'}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              sortBy: value as ProductFiltersType['sortBy'],
            })
          }
        >
          <SelectTrigger
            className="w-full sm:w-40"
            data-semtag-id="filters.sort"
            data-semtag-role="select"
            data-semtag-state="filters.sort"
            data-semtag-options={toOptionsAttr(sortOptions)}
            {...(semtagControls && { 'data-semtag-controls': semtagControls })}
          >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                data-semtag-id={`filters.sort.option.${opt.value}`}
                data-semtag-role="option"
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Toggle advanced filters */}
        <Button
          variant={isOpen ? 'secondary' : 'outline'}
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2"
          data-semtag-id="filters.advanced.toggle"
          data-semtag-role="toggle"
          data-semtag-action="toggle-advanced-filters"
          data-semtag-state={isOpen ? 'open' : 'closed'}
          data-semtag-controls="filters.advanced"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Advanced filters */}
      {isOpen && (
        <div
          className="bg-card border border-border rounded-lg p-4 space-y-4 animate-fade-in"
          data-semtag-id="filters.advanced"
          data-semtag-role="region"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Range */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Price Range</Label>
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                onValueCommit={applyPriceFilter}
                min={0}
                max={maxPrice}
                step={10}
                className="w-full"
                data-semtag-id="filters.price"
                data-semtag-role="slider"
                data-semtag-state="filters.price-min,filters.price-max"
                {...(semtagControls && { 'data-semtag-controls': semtagControls })}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span
                  data-semtag-id="filters.price.min"
                  data-semtag-role="observable"
                  data-semtag-state="filters.price-min"
                >
                  ${priceRange[0]}
                </span>
                <span
                  data-semtag-id="filters.price.max"
                  data-semtag-role="observable"
                  data-semtag-state="filters.price-max"
                >
                  ${priceRange[1]}
                </span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Minimum Rating</Label>
              <Select
                value={filters.minRating?.toString() || 'any'}
                onValueChange={(value) =>
                  onFiltersChange({
                    ...filters,
                    minRating: value === 'any' ? undefined : Number(value),
                  })
                }
              >
                <SelectTrigger
                  data-semtag-id="filters.min-rating"
                  data-semtag-role="select"
                  data-semtag-state="filters.min-rating"
                  data-semtag-options={toOptionsAttr(ratingOptions)}
                  {...(semtagControls && { 'data-semtag-controls': semtagControls })}
                >
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent>
                  {ratingOptions.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      data-semtag-id={`filters.min-rating.option.${opt.value}`}
                      data-semtag-role="option"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tags</Label>
            <div
              className="flex flex-wrap gap-2"
              data-semtag-id="filters.tags"
              data-semtag-role="collection"
            >
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={filters.tags?.includes(tag) ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer transition-colors',
                    filters.tags?.includes(tag) ? '' : 'hover:bg-muted'
                  )}
                  onClick={() => toggleTag(tag)}
                  data-semtag-id={`filters.tags.item.${tag}`}
                  data-semtag-role="toggle"
                  data-semtag-action="toggle-tag-filter"
                  data-semtag-state={filters.tags?.includes(tag) ? 'selected' : 'unselected'}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Clear */}
          {hasActiveFilters && (
            <div className="pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground"
                data-semtag-id="filters.clear"
                data-semtag-role="action"
                data-semtag-action="clear-filters"
              >
                <X className="h-4 w-4 mr-1" />
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
