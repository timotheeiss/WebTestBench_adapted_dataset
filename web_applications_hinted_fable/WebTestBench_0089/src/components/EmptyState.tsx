import { FileText, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  type: 'no-results' | 'no-favorites';
  onClearFilters?: () => void;
  onBrowseAll?: () => void;
}

export function EmptyState({ type, onClearFilters, onBrowseAll }: EmptyStateProps) {
  const content = {
    'no-results': {
      icon: Search,
      title: 'No templates found',
      description: 'Try adjusting your search or filter criteria',
      action: 'Clear Filters',
      onAction: onClearFilters,
    },
    'no-favorites': {
      icon: Heart,
      title: 'No favorites yet',
      description: 'Browse templates and click the heart icon to save your favorites',
      action: 'Browse Templates',
      onAction: onBrowseAll,
    },
  };

  const { icon: Icon, title, description, action, onAction } = content[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
      data-semtag-id="templates.empty"
      data-semtag-role="region"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3
        className="font-display text-xl font-semibold text-foreground mb-2"
        data-semtag-id="templates.empty.title"
        data-semtag-role="observable"
        data-semtag-state="templates.emptyReason"
      >{title}</h3>
      <p className="text-muted-foreground text-center max-w-sm mb-6">{description}</p>
      {onAction && (
        <Button
          variant="outline"
          onClick={onAction}
          data-semtag-id={type === 'no-results' ? 'templates.empty.clear-filters' : 'templates.empty.browse-all'}
          data-semtag-role="action"
          data-semtag-action={type === 'no-results' ? 'clear-filters' : 'browse-all-templates'}
        >
          {action}
        </Button>
      )}
    </motion.div>
  );
}
