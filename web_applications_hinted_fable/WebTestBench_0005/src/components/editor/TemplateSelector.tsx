import { TemplateStyle } from '@/types/resume';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  selected: TemplateStyle;
  onSelect: (template: TemplateStyle) => void;
}

const templates: { id: TemplateStyle; name: string; description: string }[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean design with accent colors and clear hierarchy',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional layout perfect for corporate roles',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant with focus on content',
  },
];

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Choose a template style for your resume. You can change this anytime.
      </p>
      
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        data-semtag-id="editor.template.list"
        data-semtag-role="collection"
      >
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            data-semtag-id={`editor.template.item.${template.id}`}
            data-semtag-role="option"
            data-semtag-action="select-template"
            data-semtag-state={selected === template.id ? 'selected' : undefined}
            className={cn(
              "relative p-4 rounded-xl border-2 text-left transition-all duration-200",
              selected === template.id
                ? "border-accent bg-accent/5"
                : "border-border hover:border-muted-foreground/30 bg-card/50"
            )}
          >
            {/* Template Preview */}
            <div className={cn(
              "aspect-[3/4] rounded-lg mb-3 overflow-hidden",
              template.id === 'modern' && "bg-gradient-to-br from-primary/10 to-accent/10",
              template.id === 'classic' && "bg-gradient-to-br from-primary/10 to-primary/5",
              template.id === 'minimal' && "bg-muted"
            )}>
              <div className="p-2 h-full flex flex-col">
                {/* Header skeleton */}
                <div className={cn(
                  "rounded h-6 mb-2",
                  template.id === 'modern' && "bg-primary/20",
                  template.id === 'classic' && "bg-primary/10",
                  template.id === 'minimal' && "bg-foreground/10"
                )} />
                {/* Content skeleton */}
                <div className="flex-1 space-y-1">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i}
                      className={cn(
                        "rounded h-2",
                        template.id === 'modern' && "bg-muted-foreground/10",
                        template.id === 'classic' && "bg-muted-foreground/10",
                        template.id === 'minimal' && "bg-foreground/5"
                      )}
                      style={{ width: `${60 + Math.random() * 40}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-foreground">{template.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{template.description}</p>

            {/* Selected indicator */}
            {selected === template.id && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                <svg className="w-3 h-3 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
