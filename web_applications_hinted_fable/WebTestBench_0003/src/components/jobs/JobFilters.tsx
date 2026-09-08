import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { industries, locations, employmentTypes } from '@/data/initialData';
import { semtagSlug } from '@/lib/semtag';
import { FilterState } from '@/types';

interface JobFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function JobFilters({ filters, onFilterChange }: JobFiltersProps) {
  const hasActiveFilters =
    filters.industry || filters.location || filters.employmentType || filters.search;

  const clearFilters = () => {
    onFilterChange({
      industry: '',
      location: '',
      employmentType: '',
      search: '',
    });
  };

  return (
    <div className="space-y-4" data-semtag-id="jobs.filters" data-semtag-role="region">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search jobs, companies, or skills..."
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="pl-10 h-11"
          data-semtag-id="jobs.filters.search"
          data-semtag-role="input"
          data-semtag-state="filters.search"
          data-semtag-controls="jobs.list"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Select
          value={filters.industry}
          onValueChange={(value) => onFilterChange({ ...filters, industry: value })}
        >
          <SelectTrigger
            className="w-[160px] bg-card"
            data-semtag-id="jobs.filters.industry"
            data-semtag-role="select"
            data-semtag-state="filters.industry"
            data-semtag-controls="jobs.list"
            data-semtag-options={['all|All Industries', ...industries.map((i) => `${i}|${i}`)].join(';')}
          >
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            <SelectItem
              value="all"
              data-semtag-id="jobs.filters.industry.option.all"
              data-semtag-role="option"
            >All Industries</SelectItem>
            {industries.map((industry) => (
              <SelectItem
                key={industry}
                value={industry}
                data-semtag-id={`jobs.filters.industry.option.${semtagSlug(industry)}`}
                data-semtag-role="option"
              >
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.location}
          onValueChange={(value) => onFilterChange({ ...filters, location: value })}
        >
          <SelectTrigger
            className="w-[180px] bg-card"
            data-semtag-id="jobs.filters.location"
            data-semtag-role="select"
            data-semtag-state="filters.location"
            data-semtag-controls="jobs.list"
            data-semtag-options={['all|All Locations', ...locations.map((l) => `${l}|${l}`)].join(';')}
          >
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            <SelectItem
              value="all"
              data-semtag-id="jobs.filters.location.option.all"
              data-semtag-role="option"
            >All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem
                key={location}
                value={location}
                data-semtag-id={`jobs.filters.location.option.${semtagSlug(location)}`}
                data-semtag-role="option"
              >
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.employmentType}
          onValueChange={(value) => onFilterChange({ ...filters, employmentType: value })}
        >
          <SelectTrigger
            className="w-[160px] bg-card"
            data-semtag-id="jobs.filters.type"
            data-semtag-role="select"
            data-semtag-state="filters.employment-type"
            data-semtag-controls="jobs.list"
            data-semtag-options={['all|All Types', ...employmentTypes.map((t) => `${t.value}|${t.label}`)].join(';')}
          >
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            <SelectItem
              value="all"
              data-semtag-id="jobs.filters.type.option.all"
              data-semtag-role="option"
            >All Types</SelectItem>
            {employmentTypes.map((type) => (
              <SelectItem
                key={type.value}
                value={type.value}
                data-semtag-id={`jobs.filters.type.option.${type.value}`}
                data-semtag-role="option"
              >
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-1.5"
            data-semtag-id="jobs.filters.clear"
            data-semtag-role="action"
            data-semtag-action="clear-filters"
            data-semtag-controls="jobs.list"
          >
            <X className="h-4 w-4" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
