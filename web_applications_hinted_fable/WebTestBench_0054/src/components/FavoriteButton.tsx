import { Star } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps extends React.ComponentProps<'button'> {
  docId: string;
  className?: string;
}

export function FavoriteButton({ docId, className, ...props }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useAppStore();
  const isActive = isFavorite(docId);
  const hasSemtagId = (props as Record<string, unknown>)['data-semtag-id'] !== undefined;

  return (
    <button
      {...props}
      {...(hasSemtagId ? { 'data-semtag-state': isActive ? 'on' : 'off' } : {})}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(docId);
      }}
      className={cn(
        'p-1.5 rounded-md transition-all duration-200 hover:bg-secondary',
        className
      )}
      aria-label={isActive ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star
        size={18}
        className={cn(
          'favorite-star transition-all duration-200',
          isActive && 'active'
        )}
      />
    </button>
  );
}
