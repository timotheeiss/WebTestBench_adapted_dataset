import { Experience } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export function ExperienceForm({ experiences, onChange }: ExperienceFormProps) {
  const generateId = () => Math.random().toString(36).substring(2, 15);

  const addExperience = () => {
    const newExperience: Experience = {
      id: generateId(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...experiences, newExperience]);
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onChange(experiences.map(exp => 
      exp.id === id ? { ...exp, ...updates } : exp
    ));
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter(exp => exp.id !== id));
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= experiences.length) return;
    
    const newExperiences = [...experiences];
    [newExperiences[index], newExperiences[newIndex]] = [newExperiences[newIndex], newExperiences[index]];
    onChange(newExperiences);
  };

  return (
    <div className="space-y-6" data-semtag-id="editor.experience.list" data-semtag-role="collection">
      {experiences.map((exp, index) => (
        <div
          key={exp.id}
          className="p-4 rounded-lg border border-border bg-card/50 space-y-4"
          data-semtag-id={`editor.experience.item.${exp.id}`}
          data-semtag-role="region"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Position {index + 1}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveExperience(index, 'up')}
                disabled={index === 0}
                className="h-8 w-8"
                data-semtag-id={`editor.experience.item.${exp.id}.move-up`}
                data-semtag-role="action"
                data-semtag-action="move-experience-up"
              >
                ↑
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveExperience(index, 'down')}
                disabled={index === experiences.length - 1}
                className="h-8 w-8"
                data-semtag-id={`editor.experience.item.${exp.id}.move-down`}
                data-semtag-role="action"
                data-semtag-action="move-experience-down"
              >
                ↓
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeExperience(exp.id)}
                className="h-8 w-8 text-destructive hover:text-destructive"
                data-semtag-id={`editor.experience.item.${exp.id}.remove`}
                data-semtag-role="action"
                data-semtag-action="remove-experience"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company</Label>
              <Input
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                placeholder="Company Name"
                data-semtag-id={`editor.experience.item.${exp.id}.company`}
                data-semtag-role="input"
                data-semtag-state="experience.company"
              />
            </div>
            <div className="space-y-2">
              <Label>Position</Label>
              <Input
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                placeholder="Job Title"
                data-semtag-id={`editor.experience.item.${exp.id}.position`}
                data-semtag-role="input"
                data-semtag-state="experience.position"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                data-semtag-id={`editor.experience.item.${exp.id}.start-date`}
                data-semtag-role="input"
                data-semtag-state="experience.start-date"
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                disabled={exp.current}
                data-semtag-id={`editor.experience.item.${exp.id}.end-date`}
                data-semtag-role="input"
                data-semtag-state="experience.end-date"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`current-${exp.id}`}
              data-semtag-id={`editor.experience.item.${exp.id}.current`}
              data-semtag-role="toggle"
              data-semtag-state="experience.current"
              checked={exp.current}
              onCheckedChange={(checked) => 
                updateExperience(exp.id, { current: checked as boolean, endDate: checked ? '' : exp.endDate })
              }
            />
            <label
              htmlFor={`current-${exp.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I currently work here
            </label>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={exp.description}
              data-semtag-id={`editor.experience.item.${exp.id}.description`}
              data-semtag-role="input"
              data-semtag-state="experience.description"
              onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
              placeholder="Describe your responsibilities and achievements..."
              rows={4}
            />
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        onClick={addExperience}
        className="w-full"
        data-semtag-id="editor.experience.add"
        data-semtag-role="action"
        data-semtag-action="add-experience"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
}
