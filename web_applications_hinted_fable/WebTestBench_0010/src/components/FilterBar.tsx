import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  onSearch: (query: string) => void;
  onCuisineChange: (cuisine: string) => void;
  onPriceChange: (price: string) => void;
  cuisines: string[];
}

export function FilterBar({ onSearch, onCuisineChange, onPriceChange, cuisines }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleCuisineChange = (value: string) => {
    setSelectedCuisine(value);
    onCuisineChange(value);
  };

  const handlePriceChange = (value: string) => {
    setSelectedPrice(value);
    onPriceChange(value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCuisine('all');
    setSelectedPrice('all');
    onSearch('');
    onCuisineChange('all');
    onPriceChange('all');
  };

  const hasActiveFilters = searchQuery || selectedCuisine !== 'all' || selectedPrice !== 'all';

  const cuisineSlug = (cuisine: string) => cuisine.toLowerCase().replace(/\s+/g, '-');

  const priceOptions = [
    { value: 'all', key: 'all', label: 'All Prices' },
    { value: '$', key: 'budget', label: '$ - Budget' },
    { value: '$$', key: 'moderate', label: '$$ - Moderate' },
    { value: '$$$', key: 'upscale', label: '$$$ - Upscale' },
    { value: '$$$$', key: 'fine-dining', label: '$$$$ - Fine Dining' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            className="pl-10"
            data-semtag-id="search.query"
            data-semtag-role="input"
            data-semtag-state="search.query"
            data-semtag-controls="restaurants.grid"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(showFilters && 'bg-accent')}
          data-semtag-id="filters.toggle"
          data-semtag-role="toggle"
          data-semtag-action="toggle-filter-panel"
          data-semtag-state={showFilters ? 'open' : 'closed'}
          data-semtag-controls="filters.panel"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            size="icon"
            data-semtag-id="filters.clear"
            data-semtag-role="action"
            data-semtag-action="clear-filters"
            data-semtag-controls="restaurants.grid"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showFilters && (
        <div
          data-semtag-id="filters.panel"
          data-semtag-role="region"
          className="flex flex-wrap gap-3 animate-fade-in"
        >
          <Select value={selectedCuisine} onValueChange={handleCuisineChange}>
            <SelectTrigger
              className="w-[180px]"
              data-semtag-id="filters.cuisine"
              data-semtag-role="select"
              data-semtag-state="filters.cuisine"
              data-semtag-controls="restaurants.grid"
              data-semtag-options={['all|All Cuisines', ...cuisines.map(c => `${c}|${c}`)].join(';')}
            >
              <SelectValue placeholder="Cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="all"
                data-semtag-id="filters.cuisine.option.all"
                data-semtag-role="option"
              >
                All Cuisines
              </SelectItem>
              {cuisines.map(cuisine => (
                <SelectItem
                  key={cuisine}
                  value={cuisine}
                  data-semtag-id={`filters.cuisine.option.${cuisineSlug(cuisine)}`}
                  data-semtag-role="option"
                >
                  {cuisine}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPrice} onValueChange={handlePriceChange}>
            <SelectTrigger
              className="w-[180px]"
              data-semtag-id="filters.price"
              data-semtag-role="select"
              data-semtag-state="filters.price"
              data-semtag-controls="restaurants.grid"
              data-semtag-options={priceOptions.map(o => `${o.value}|${o.label}`).join(';')}
            >
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceOptions.map(option => (
                <SelectItem
                  key={option.key}
                  value={option.value}
                  data-semtag-id={`filters.price.option.${option.key}`}
                  data-semtag-role="option"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
