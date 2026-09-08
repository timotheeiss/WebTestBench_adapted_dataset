import { Category, Condition } from '@/types';
import { categories, conditions } from '@/data/mockData';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { X, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface FilterSidebarProps {
  selectedCategories: Category[];
  selectedConditions: Condition[];
  priceRange: [number, number];
  maxDistance: number;
  upcycledOnly: boolean;
  onCategoryChange: (categories: Category[]) => void;
  onConditionChange: (conditions: Condition[]) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onMaxDistanceChange: (distance: number) => void;
  onUpcycledOnlyChange: (upcycled: boolean) => void;
  onClearFilters: () => void;
  /** data-semtag id prefix for the desktop sidebar copy of the filter controls */
  semtagPrefix?: string;
  /** data-semtag id prefix for the mobile sheet copy of the filter controls */
  semtagMobilePrefix?: string;
}

/** Builds data-semtag attributes only when a prefix is provided. */
const semtag = (
  prefix: string | undefined,
  suffix: string,
  attrs: Record<string, string>,
): Record<string, string> =>
  prefix ? { 'data-semtag-id': `${prefix}.${suffix}`, ...attrs } : {};

export function FilterSidebar({
  selectedCategories,
  selectedConditions,
  priceRange,
  maxDistance,
  upcycledOnly,
  onCategoryChange,
  onConditionChange,
  onPriceRangeChange,
  onMaxDistanceChange,
  onUpcycledOnlyChange,
  onClearFilters,
  semtagPrefix,
  semtagMobilePrefix
}: FilterSidebarProps) {
  const hasActiveFilters = selectedCategories.length > 0 ||
    selectedConditions.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 500 ||
    maxDistance < 50 ||
    upcycledOnly;

  const FilterContent = ({ prefix }: { prefix?: string }) => (
    <div className="space-y-6">
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          {...semtag(prefix, 'clear', {
            'data-semtag-role': 'action',
            'data-semtag-action': 'clear-filters',
          })}
          className="w-full justify-start text-muted-foreground"
        >
          <X className="h-4 w-4 mr-2" />
          Clear all filters
        </Button>
      )}

      {/* Upcycled Only */}
      <div className="space-y-3">
        <h3 className="font-display font-semibold text-foreground">Special</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="upcycled"
            checked={upcycledOnly}
            onCheckedChange={(checked) => onUpcycledOnlyChange(checked as boolean)}
            {...semtag(prefix, 'upcycled', {
              'data-semtag-role': 'toggle',
              'data-semtag-state': 'filters.upcycled',
            })}
          />
          <Label htmlFor="upcycled" className="text-sm cursor-pointer">
            Upcycled items only
          </Label>
        </div>
      </div>

      {/* Categories */}
      <div
        {...semtag(prefix, 'categories', { 'data-semtag-role': 'collection' })}
        className="space-y-3"
      >
        <h3 className="font-display font-semibold text-foreground">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.value} className="flex items-center space-x-2">
              <Checkbox
                id={category.value}
                checked={selectedCategories.includes(category.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onCategoryChange([...selectedCategories, category.value]);
                  } else {
                    onCategoryChange(selectedCategories.filter(c => c !== category.value));
                  }
                }}
                {...semtag(prefix, `categories.item.${category.value}`, {
                  'data-semtag-role': 'toggle',
                  'data-semtag-state': 'filters.categories',
                })}
              />
              <Label htmlFor={category.value} className="text-sm cursor-pointer">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div
        {...semtag(prefix, 'conditions', { 'data-semtag-role': 'collection' })}
        className="space-y-3"
      >
        <h3 className="font-display font-semibold text-foreground">Condition</h3>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <div key={condition.value} className="flex items-center space-x-2">
              <Checkbox
                id={condition.value}
                checked={selectedConditions.includes(condition.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onConditionChange([...selectedConditions, condition.value]);
                  } else {
                    onConditionChange(selectedConditions.filter(c => c !== condition.value));
                  }
                }}
                {...semtag(prefix, `conditions.item.${condition.value}`, {
                  'data-semtag-role': 'toggle',
                  'data-semtag-state': 'filters.conditions',
                })}
              />
              <Label htmlFor={condition.value} className="text-sm cursor-pointer">
                {condition.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-foreground">Price Range</h3>
          <span
            {...semtag(prefix, 'price.value', {
              'data-semtag-role': 'observable',
              'data-semtag-state': 'filters.price',
            })}
            className="text-sm text-muted-foreground"
          >
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={(value) => onPriceRangeChange(value as [number, number])}
          min={0}
          max={500}
          step={10}
          {...semtag(prefix, 'price', {
            'data-semtag-role': 'slider',
            'data-semtag-state': 'filters.price',
          })}
          className="mt-2"
        />
      </div>

      {/* Distance */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-foreground">Max Distance</h3>
          <span
            {...semtag(prefix, 'distance.value', {
              'data-semtag-role': 'observable',
              'data-semtag-state': 'filters.distance',
            })}
            className="text-sm text-muted-foreground"
          >
            {maxDistance === 50 ? 'Any' : `${maxDistance} miles`}
          </span>
        </div>
        <Slider
          value={[maxDistance]}
          onValueChange={(value) => onMaxDistanceChange(value[0])}
          min={1}
          max={50}
          step={1}
          {...semtag(prefix, 'distance', {
            'data-semtag-role': 'slider',
            'data-semtag-state': 'filters.distance',
          })}
          className="mt-2"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div
          {...(semtagPrefix
            ? { 'data-semtag-id': semtagPrefix, 'data-semtag-role': 'region' }
            : {})}
          className="sticky top-24 rounded-xl border border-border bg-card p-5"
        >
          <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </h2>
          <FilterContent prefix={semtagPrefix} />
        </div>
      </aside>

      {/* Mobile Filter Sheet */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="outline"
            size="sm"
            {...(semtagMobilePrefix
              ? {
                  'data-semtag-id': `${semtagMobilePrefix}.open`,
                  'data-semtag-role': 'action',
                  'data-semtag-action': 'open-filters',
                }
              : {})}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                !
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </SheetTitle>
          </SheetHeader>
          <div
            {...(semtagMobilePrefix
              ? { 'data-semtag-id': semtagMobilePrefix, 'data-semtag-role': 'region' }
              : {})}
            className="mt-6"
          >
            <FilterContent prefix={semtagMobilePrefix} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
