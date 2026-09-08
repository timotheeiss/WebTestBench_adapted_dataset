import { Link } from 'react-router-dom';
import { MapPin, Recycle, Heart } from 'lucide-react';
import { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { conditions } from '@/data/mockData';

interface ProductCardProps {
  product: Product;
  className?: string;
  /** Collection prefix used to build data-semtag ids, e.g. "browse.products" */
  semtagCollection?: string;
}

export function ProductCard({ product, className, semtagCollection }: ProductCardProps) {
  const conditionLabel = conditions.find(c => c.value === product.condition)?.label || product.condition;
  const itemId = semtagCollection ? `${semtagCollection}.item.${product.id}` : undefined;

  return (
    <Link
      to={`/product/${product.id}`}
      {...(itemId
        ? {
            'data-semtag-id': itemId,
            'data-semtag-role': 'navigation',
            'data-semtag-target': 'product.detail',
          }
        : {})}
      className={cn(
        "group block rounded-xl overflow-hidden bg-card border border-border/50 hover-lift",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isUpcycled && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary/90 text-primary-foreground gap-1 backdrop-blur-sm">
              <Recycle className="h-3 w-3" />
              Upcycled
            </Badge>
          </div>
        )}
        <button 
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
          onClick={(e) => {
            e.preventDefault();
            // TODO: Add to favorites
          }}
        >
          <Heart className="h-4 w-4 text-muted-foreground hover:text-secondary transition-colors" />
        </button>
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm">
            <span className="font-display text-lg font-semibold text-muted-foreground">Sold</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <span
            {...(itemId
              ? {
                  'data-semtag-id': `${itemId}.price`,
                  'data-semtag-role': 'observable',
                  'data-semtag-state': 'product.price',
                }
              : {})}
            className="font-display text-lg font-semibold text-primary shrink-0"
          >
            ${product.price}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {product.location}
          </span>
          <Badge variant="secondary" className="text-xs">
            {conditionLabel}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
