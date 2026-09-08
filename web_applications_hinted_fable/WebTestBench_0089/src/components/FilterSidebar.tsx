import { TemplateCategory, TemplateScenario, categoryLabels, scenarioLabels } from '@/data/templates';
import { SortOption } from '@/hooks/useTemplates';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { Filter, SortAsc, Tag, Briefcase } from 'lucide-react';

interface FilterSidebarProps {
  selectedCategory: TemplateCategory | 'all';
  selectedScenario: TemplateScenario | 'all';
  sortBy: SortOption;
  onCategoryChange: (category: TemplateCategory | 'all') => void;
  onScenarioChange: (scenario: TemplateScenario | 'all') => void;
  onSortChange: (sort: SortOption) => void;
  totalCount: number;
  filteredCount: number;
}

export function FilterSidebar({
  selectedCategory,
  selectedScenario,
  sortBy,
  onCategoryChange,
  onScenarioChange,
  onSortChange,
  totalCount,
  filteredCount,
}: FilterSidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full lg:w-64 shrink-0"
    >
      <div
        className="bg-card border border-border rounded-xl p-5 shadow-card sticky top-24"
        data-semtag-id="filters.panel"
        data-semtag-role="region"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold text-foreground">Filters</h3>
        </div>

        <p
          className="text-sm text-muted-foreground mb-5"
          data-semtag-id="filters.result-count"
          data-semtag-role="observable"
          data-semtag-state="filters.resultCount"
        >
          Showing <span className="text-foreground font-medium">{filteredCount}</span> of {totalCount} templates
        </p>

        <Separator className="my-4" />

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Category</Label>
            </div>
            <Select value={selectedCategory} onValueChange={(v) => onCategoryChange(v as TemplateCategory | 'all')}>
              <SelectTrigger
                className="w-full bg-background"
                data-semtag-id="filters.category"
                data-semtag-role="select"
                data-semtag-action="filter-by-category"
                data-semtag-state="filters.category"
                data-semtag-controls="templates.grid"
                data-semtag-options={['all|All Categories', ...Object.entries(categoryLabels).map(([key, label]) => `${key}|${label}`)].join(';')}
              >
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="all"
                  data-semtag-id="filters.category.option.all"
                  data-semtag-role="option"
                >All Categories</SelectItem>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    data-semtag-id={`filters.category.option.${key}`}
                    data-semtag-role="option"
                  >{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Scenario</Label>
            </div>
            <Select value={selectedScenario} onValueChange={(v) => onScenarioChange(v as TemplateScenario | 'all')}>
              <SelectTrigger
                className="w-full bg-background"
                data-semtag-id="filters.scenario"
                data-semtag-role="select"
                data-semtag-action="filter-by-scenario"
                data-semtag-state="filters.scenario"
                data-semtag-controls="templates.grid"
                data-semtag-options={['all|All Scenarios', ...Object.entries(scenarioLabels).map(([key, label]) => `${key}|${label}`)].join(';')}
              >
                <SelectValue placeholder="All Scenarios" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="all"
                  data-semtag-id="filters.scenario.option.all"
                  data-semtag-role="option"
                >All Scenarios</SelectItem>
                {Object.entries(scenarioLabels).map(([key, label]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    data-semtag-id={`filters.scenario.option.${key}`}
                    data-semtag-role="option"
                  >{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <SortAsc className="w-4 h-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Sort By</Label>
            </div>
            <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
              <SelectTrigger
                className="w-full bg-background"
                data-semtag-id="filters.sort"
                data-semtag-role="select"
                data-semtag-action="sort-templates"
                data-semtag-state="filters.sort"
                data-semtag-controls="templates.grid"
                data-semtag-options="popularity|Most Popular;newest|Recently Updated;oldest|Oldest First;alphabetical|Alphabetical"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity" data-semtag-id="filters.sort.option.popularity" data-semtag-role="option">Most Popular</SelectItem>
                <SelectItem value="newest" data-semtag-id="filters.sort.option.newest" data-semtag-role="option">Recently Updated</SelectItem>
                <SelectItem value="oldest" data-semtag-id="filters.sort.option.oldest" data-semtag-role="option">Oldest First</SelectItem>
                <SelectItem value="alphabetical" data-semtag-id="filters.sort.option.alphabetical" data-semtag-role="option">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
