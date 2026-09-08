import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";
import { CategoryBadge } from "@/components/CategoryBadge";
import { TrendingUp, Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeCategory?: string;
  activeFilter?: "trending" | "recent" | "hot";
  onFilterChange?: (filter: "trending" | "recent" | "hot") => void;
}

export function Sidebar({ activeCategory, activeFilter = "trending", onFilterChange }: SidebarProps) {
  const filters = [
    { id: "trending" as const, label: "Trending", icon: TrendingUp },
    { id: "recent" as const, label: "Recent", icon: Clock },
    { id: "hot" as const, label: "Most Active", icon: Flame },
  ];

  return (
    <aside className="space-y-6">
      {/* Filters */}
      <div className="rounded-xl border bg-card p-4 shadow-soft">
        <h3 className="font-heading font-semibold mb-3">Browse</h3>
        <nav
          className="space-y-1"
          data-semtag-id="browse.filters"
          data-semtag-role="region"
        >
          {filters.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onFilterChange?.(id)}
              data-semtag-id={`browse.filters.${id}`}
              data-semtag-role="action"
              data-semtag-action="sort-threads"
              data-semtag-state="threads.filter"
              data-semtag-controls="threads.list"
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                activeFilter === id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Categories */}
      <div className="rounded-xl border bg-card p-4 shadow-soft">
        <h3 className="font-heading font-semibold mb-3">Categories</h3>
        <nav
          className="space-y-2"
          data-semtag-id="nav.categories"
          data-semtag-role="collection"
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              data-semtag-id={`nav.categories.item.${category.id}`}
              data-semtag-role="navigation"
              data-semtag-target="category.page"
              className={cn(
                "block rounded-lg px-3 py-2 transition-colors",
                activeCategory === category.id
                  ? "bg-accent"
                  : "hover:bg-secondary"
              )}
            >
              <CategoryBadge category={category} showCount asLink={false} />
            </Link>
          ))}
        </nav>
      </div>

      {/* Stats */}
      <div className="rounded-xl border bg-card p-4 shadow-soft">
        <h3 className="font-heading font-semibold mb-3">Community Stats</h3>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="rounded-lg bg-secondary/50 p-3">
            <div
              className="text-2xl font-bold text-primary"
              data-semtag-id="stats.threads"
              data-semtag-role="observable"
              data-semtag-state="stats.threads"
            >1,045</div>
            <div className="text-xs text-muted-foreground">Threads</div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div
              className="text-2xl font-bold text-primary"
              data-semtag-id="stats.replies"
              data-semtag-role="observable"
              data-semtag-state="stats.replies"
            >4,823</div>
            <div className="text-xs text-muted-foreground">Replies</div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div
              className="text-2xl font-bold text-primary"
              data-semtag-id="stats.members"
              data-semtag-role="observable"
              data-semtag-state="stats.members"
            >892</div>
            <div className="text-xs text-muted-foreground">Members</div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div
              className="text-2xl font-bold text-primary"
              data-semtag-id="stats.online"
              data-semtag-role="observable"
              data-semtag-state="stats.online"
            >47</div>
            <div className="text-xs text-muted-foreground">Online</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
