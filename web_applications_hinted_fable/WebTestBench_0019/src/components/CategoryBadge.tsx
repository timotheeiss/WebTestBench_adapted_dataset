import { Link } from "react-router-dom";
import { Category } from "@/types/forum";
import { MessageCircle, Cpu, Palette, Heart, Gamepad2, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  MessageCircle,
  Cpu,
  Palette,
  Heart,
  Gamepad2,
  Newspaper,
};

interface CategoryBadgeProps {
  category: Category;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  asLink?: boolean;
}

export function CategoryBadge({
  category,
  size = "md",
  showCount = false,
  asLink = true,
}: CategoryBadgeProps) {
  const Icon = iconMap[category.icon] || MessageCircle;

  const colorClasses: Record<Category["color"], string> = {
    general: "bg-category-general/10 text-category-general border-category-general/20",
    tech: "bg-category-tech/10 text-category-tech border-category-tech/20",
    creative: "bg-category-creative/10 text-category-creative border-category-creative/20",
    lifestyle: "bg-category-lifestyle/10 text-category-lifestyle border-category-lifestyle/20",
    gaming: "bg-category-gaming/10 text-category-gaming border-category-gaming/20",
    news: "bg-category-news/10 text-category-news border-category-news/20",
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-2.5 py-1 gap-1.5",
    lg: "text-base px-3 py-1.5 gap-2",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const content = (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium transition-all",
        colorClasses[category.color],
        sizeClasses[size],
        asLink && "hover:opacity-80"
      )}
    >
      <Icon className={iconSizes[size]} />
      <span>{category.name}</span>
      {showCount && (
        <span className="ml-1 opacity-70">({category.threadCount})</span>
      )}
    </span>
  );

  if (asLink) {
    return <Link to={`/category/${category.id}`}>{content}</Link>;
  }

  return content;
}
