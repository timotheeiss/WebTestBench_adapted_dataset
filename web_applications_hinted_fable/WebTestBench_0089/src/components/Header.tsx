import { FileText, Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface HeaderProps {
  onSubmitTemplate: () => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
}

export function Header({ onSubmitTemplate, showFavoritesOnly, onToggleFavorites, favoritesCount }: HeaderProps) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-warm flex items-center justify-center shadow-soft">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold text-foreground">Template Library</h1>
            <p className="text-sm text-muted-foreground">Browse, create, and customize templates</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            size="sm"
            onClick={onToggleFavorites}
            className="gap-2"
            data-semtag-id="header.favorites"
            data-semtag-role="toggle"
            data-semtag-action="toggle-favorites-filter"
            data-semtag-state={showFavoritesOnly ? 'on' : 'off'}
            data-semtag-controls="templates.grid"
          >
            <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            Favorites
            {favoritesCount > 0 && (
              <span
                className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-primary-foreground/20"
                data-semtag-id="header.favorites.count"
                data-semtag-role="observable"
                data-semtag-state="favorites.count"
              >
                {favoritesCount}
              </span>
            )}
          </Button>
          <Button
            onClick={onSubmitTemplate}
            className="gap-2 gradient-warm border-0 shadow-soft hover:shadow-hover transition-shadow"
            data-semtag-id="header.submit-template"
            data-semtag-role="action"
            data-semtag-action="open-submit-template"
          >
            <Plus className="w-4 h-4" />
            Submit Template
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
