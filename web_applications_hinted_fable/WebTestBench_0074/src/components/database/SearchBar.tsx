import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search entries..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10 bg-card border-border"
        data-semtag-id="search.query"
        data-semtag-role="input"
        data-semtag-state="search.query"
        data-semtag-controls="entries.view"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
          onClick={() => onChange('')}
          data-semtag-id="search.clear"
          data-semtag-role="action"
          data-semtag-action="clear-search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
