import { Template, categoryLabels, scenarioLabels } from '@/data/templates';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, User, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface TemplateCardProps {
  template: Template;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelect: () => void;
  index: number;
}

export function TemplateCard({ template, isFavorite, onToggleFavorite, onSelect, index }: TemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="group h-full bg-card border-border shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden">
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs font-medium">
                {categoryLabels[template.category]}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {scenarioLabels[template.scenario]}
              </Badge>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              data-semtag-id={`templates.grid.item.${template.id}.favorite`}
              data-semtag-role="toggle"
              data-semtag-action="toggle-favorite"
              data-semtag-state={isFavorite ? 'on' : 'off'}
              className={`p-2 rounded-full transition-all duration-200 ${
                isFavorite 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          <h3
            className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors"
            data-semtag-id={`templates.grid.item.${template.id}`}
            data-semtag-role="observable"
            data-semtag-state="template.title"
          >
            {template.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
            {template.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              <span>{template.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span
                data-semtag-id={`templates.grid.item.${template.id}.popularity`}
                data-semtag-role="observable"
                data-semtag-state="template.popularity"
              >{template.popularity.toLocaleString()} uses</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span
              data-semtag-id={`templates.grid.item.${template.id}.updated`}
              data-semtag-role="observable"
              data-semtag-state="template.updatedAt"
            >Updated {template.updatedAt}</span>
          </div>

          <Button
            onClick={onSelect}
            className="w-full mt-auto group/btn gap-2"
            variant="outline"
            data-semtag-id={`templates.grid.item.${template.id}.use`}
            data-semtag-role="action"
            data-semtag-action="open-template-preview"
          >
            Use Template
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
