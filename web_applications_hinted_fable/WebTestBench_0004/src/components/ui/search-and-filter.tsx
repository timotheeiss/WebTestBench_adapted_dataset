import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterOption {
  value: string;
  label: string;
}

interface SearchAndFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterGroups: {
    label: string;
    options: FilterOption[];
    selectedValue: string | null;
    onSelect: (value: string | null) => void;
  }[];
  /** Id namespace for semantic hints, e.g. "venues.filters". */
  semtagPrefix?: string;
  /** data-semtag-id of the region these filters drive, e.g. "venues.grid". */
  semtagControls?: string;
}

export function SearchAndFilter({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filterGroups,
  semtagPrefix,
  semtagControls,
}: SearchAndFilterProps) {
  const hasActiveFilters = filterGroups.some(g => g.selectedValue !== null);
  const groupKey = (label: string) => label.toLowerCase().replace(/\s+/g, "-");
  const semtag = (id: string | undefined, attrs: Record<string, string | undefined>) => {
    if (!semtagPrefix || !id) return {};
    const out: Record<string, string> = { "data-semtag-id": `${semtagPrefix}.${id}` };
    for (const [k, v] of Object.entries(attrs)) if (v !== undefined) out[k] = v;
    return out;
  };

  const clearAllFilters = () => {
    filterGroups.forEach(g => g.onSelect(null));
    onSearchChange("");
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-10 bg-card"
          {...semtag("search", {
            "data-semtag-role": "input",
            "data-semtag-state": semtagPrefix ? `${semtagPrefix}.search` : undefined,
            "data-semtag-controls": semtagControls,
          })}
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => onSearchChange("")}
            {...semtag("search.clear", {
              "data-semtag-role": "action",
              "data-semtag-action": "clear-search",
            })}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Groups */}
      <div className="space-y-3">
        {filterGroups.map((group) => (
          <div key={group.label} className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">{group.label}</span>
            <div
              className="flex flex-wrap gap-2"
              {...semtag(groupKey(group.label), { "data-semtag-role": "collection" })}
            >
              {group.options.map((option) => (
                <Badge
                  key={option.value}
                  variant={group.selectedValue === option.value ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all hover:scale-105",
                    group.selectedValue === option.value && "ring-2 ring-primary/20"
                  )}
                  onClick={() =>
                    group.onSelect(group.selectedValue === option.value ? null : option.value)
                  }
                  {...semtag(`${groupKey(group.label)}.item.${option.value}`, {
                    "data-semtag-role": "toggle",
                    "data-semtag-state": group.selectedValue === option.value ? "selected" : "not-selected",
                    "data-semtag-controls": semtagControls,
                  })}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Clear Filters */}
      {(hasActiveFilters || searchValue) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-muted-foreground"
          {...semtag("clear", {
            "data-semtag-role": "action",
            "data-semtag-action": "clear-all-filters",
            "data-semtag-controls": semtagControls,
          })}
        >
          <X className="h-4 w-4 mr-1" />
          Clear all filters
        </Button>
      )}
    </div>
  );
}
