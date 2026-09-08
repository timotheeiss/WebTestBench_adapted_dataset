import { SortOption } from '@/types/task';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown, ListFilter, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskFiltersProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  showCompleted: boolean;
  onShowCompletedChange: (show: boolean) => void;
  activeCount: number;
  completedCount: number;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'priority', label: 'Priority' },
  { value: 'deadline', label: 'Deadline' },
  { value: 'created', label: 'Date Created' },
];

export function TaskFilters({
  sortBy,
  onSortChange,
  showCompleted,
  onShowCompletedChange,
  activeCount,
  completedCount,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <Button
          variant={!showCompleted ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onShowCompletedChange(false)}
          className={cn(
            'gap-2 transition-all',
            !showCompleted && 'shadow-sm'
          )}
          data-semtag-id="filters.show-active"
          data-semtag-role="toggle"
          data-semtag-action="show-active-tasks"
          data-semtag-state={!showCompleted ? 'selected' : 'unselected'}
          data-semtag-controls="tasks.list"
        >
          <Circle className="w-4 h-4" />
          Active
          <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-background">
            {activeCount}
          </span>
        </Button>
        <Button
          variant={showCompleted ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onShowCompletedChange(true)}
          className={cn(
            'gap-2 transition-all',
            showCompleted && 'shadow-sm'
          )}
          data-semtag-id="filters.show-completed"
          data-semtag-role="toggle"
          data-semtag-action="show-completed-tasks"
          data-semtag-state={showCompleted ? 'selected' : 'unselected'}
          data-semtag-controls="tasks.list"
        >
          <CheckCircle2 className="w-4 h-4" />
          Completed
          <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-background">
            {completedCount}
          </span>
        </Button>
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground flex items-center gap-1.5">
          <ArrowUpDown className="w-4 h-4" />
          Sort by
        </span>
        <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger
            className="w-[140px] h-9"
            data-semtag-id="filters.sort"
            data-semtag-role="select"
            data-semtag-action="sort-tasks"
            data-semtag-state="tasks.sort"
            data-semtag-controls="tasks.list"
            data-semtag-options={sortOptions.map((o) => `${o.value}|${o.label}`).join(';')}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                data-semtag-id={`filters.sort.option.${option.value}`}
                data-semtag-role="option"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
