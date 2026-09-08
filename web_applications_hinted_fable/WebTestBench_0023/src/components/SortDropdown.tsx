import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'distance';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'distance', label: 'Distance' },
];

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
      <SelectTrigger
        className="w-[180px] bg-card"
        data-semtag-id="browse.sort"
        data-semtag-role="select"
        data-semtag-action="sort-products"
        data-semtag-state="sort.by"
        data-semtag-controls="browse.products"
        data-semtag-options={sortOptions.map((o) => `${o.value}|${o.label}`).join(';')}
      >
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((o) => (
          <SelectItem
            key={o.value}
            value={o.value}
            data-semtag-id={`browse.sort.option.${o.value}`}
            data-semtag-role="option"
          >
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
