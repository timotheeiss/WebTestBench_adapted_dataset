import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { Restaurant } from '@/data/restaurants';
import { cn } from '@/lib/utils';

interface RestaurantCardProps {
  restaurant: Restaurant;
  className?: string;
}

export function RestaurantCard({ restaurant, className }: RestaurantCardProps) {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      data-semtag-id={`restaurants.grid.item.${restaurant.id}`}
      data-semtag-role="navigation"
      data-semtag-target="restaurant.detail"
      className={cn(
        'group block overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1',
        className
      )}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">
              {restaurant.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {restaurant.cuisine} · {restaurant.priceRange}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-accent px-2.5 py-1">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span
              data-semtag-id={`restaurants.grid.item.${restaurant.id}.rating`}
              data-semtag-role="observable"
              data-semtag-state="restaurant.rating"
              className="text-sm font-medium"
            >
              {restaurant.rating}
            </span>
          </div>
        </div>
        
        <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{restaurant.neighborhood}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {restaurant.features.slice(0, 2).map(feature => (
            <span
              key={feature}
              className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
