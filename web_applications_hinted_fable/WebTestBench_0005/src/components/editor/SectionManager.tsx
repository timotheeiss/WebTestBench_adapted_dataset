import { ResumeSection } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { GripVertical, ChevronUp, ChevronDown } from 'lucide-react';

interface SectionManagerProps {
  sections: ResumeSection[];
  onChange: (sections: ResumeSection[]) => void;
}

export function SectionManager({ sections, onChange }: SectionManagerProps) {
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const currentIndex = sortedSections.findIndex(s => s.id === id);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= sortedSections.length) return;

    const newSections = sections.map(section => {
      if (section.id === sortedSections[currentIndex].id) {
        return { ...section, order: newIndex };
      }
      if (section.id === sortedSections[newIndex].id) {
        return { ...section, order: currentIndex };
      }
      return section;
    });

    onChange(newSections);
  };

  const toggleVisibility = (id: string) => {
    onChange(sections.map(section =>
      section.id === id ? { ...section, visible: !section.visible } : section
    ));
  };

  const updateTitle = (id: string, title: string) => {
    onChange(sections.map(section =>
      section.id === id ? { ...section, title } : section
    ));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Customize the order and visibility of resume sections. You can also rename section headings.
      </p>
      
      <div className="space-y-2" data-semtag-id="editor.sections.list" data-semtag-role="collection">
        {sortedSections.map((section, index) => (
          <div
            key={section.id}
            className={`flex items-center gap-3 p-3 rounded-lg border border-border bg-card/50 transition-opacity ${
              !section.visible ? 'opacity-50' : ''
            }`}
            data-semtag-id={`editor.sections.item.${section.id}`}
            data-semtag-role="region"
          >
            <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            
            <div className="flex-1 min-w-0">
              <Input
                value={section.title}
                onChange={(e) => updateTitle(section.id, e.target.value)}
                className="h-8 text-sm"
                data-semtag-id={`editor.sections.item.${section.id}.title`}
                data-semtag-role="input"
                data-semtag-state={`section.${section.id}.title`}
              />
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => moveSection(section.id, 'up')}
                  disabled={index === 0}
                  className="h-7 w-7"
                  data-semtag-id={`editor.sections.item.${section.id}.move-up`}
                  data-semtag-role="action"
                  data-semtag-action="move-section-up"
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => moveSection(section.id, 'down')}
                  disabled={index === sortedSections.length - 1}
                  className="h-7 w-7"
                  data-semtag-id={`editor.sections.item.${section.id}.move-down`}
                  data-semtag-role="action"
                  data-semtag-action="move-section-down"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>

              <Switch
                checked={section.visible}
                onCheckedChange={() => toggleVisibility(section.id)}
                data-semtag-id={`editor.sections.item.${section.id}.visible`}
                data-semtag-role="toggle"
                data-semtag-state={`section.${section.id}.visible`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
