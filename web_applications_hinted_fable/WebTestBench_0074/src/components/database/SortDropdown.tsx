import { ArrowUpDown, ArrowUp, ArrowDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Field, SortConfig } from '@/types/database';

interface SortDropdownProps {
  fields: Field[];
  sortConfig: SortConfig;
  onSortChange: (config: SortConfig) => void;
}

export function SortDropdown({ fields, sortConfig, onSortChange }: SortDropdownProps) {
  const activeField = sortConfig.fieldId ? fields.find(f => f.id === sortConfig.fieldId) : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          data-semtag-id="toolbar.sort"
          data-semtag-role="select"
          data-semtag-action="sort-entries"
          data-semtag-state="entries.sort"
          data-semtag-controls="entries.view"
          data-semtag-options={fields.map(f => `${f.id}|${f.name}`).join(';')}
        >
          {sortConfig.fieldId ? (
            <>
              {sortConfig.direction === 'asc' ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">{activeField?.name}</span>
            </>
          ) : (
            <>
              <ArrowUpDown className="h-4 w-4" />
              <span className="hidden sm:inline">Sort</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {fields.map(field => (
          <DropdownMenuItem
            key={field.id}
            onClick={() => {
              if (sortConfig.fieldId === field.id) {
                onSortChange({
                  fieldId: field.id,
                  direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
                });
              } else {
                onSortChange({ fieldId: field.id, direction: 'asc' });
              }
            }}
            className="gap-2"
            data-semtag-id={`toolbar.sort.option.${field.id}`}
            data-semtag-role="option"
          >
            {sortConfig.fieldId === field.id && (
              sortConfig.direction === 'asc' ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )
            )}
            {sortConfig.fieldId !== field.id && <span className="w-4" />}
            {field.name}
          </DropdownMenuItem>
        ))}
        {sortConfig.fieldId && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onSortChange({ fieldId: null, direction: 'asc' })}
              className="gap-2 text-muted-foreground"
              data-semtag-id="toolbar.sort.option.clear"
              data-semtag-role="option"
            >
              <X className="h-4 w-4" />
              Clear sort
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
