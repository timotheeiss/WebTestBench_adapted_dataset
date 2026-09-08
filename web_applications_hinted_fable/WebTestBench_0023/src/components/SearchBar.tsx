import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "placeholder" | "className"> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search for items...", className, ...props }: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-11 bg-muted/50 border-border/50 focus:bg-background transition-colors"
        {...props}
      />
    </div>
  );
}
