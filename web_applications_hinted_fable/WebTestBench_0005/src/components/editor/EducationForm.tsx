import { Education } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export function EducationForm({ education, onChange }: EducationFormProps) {
  const generateId = () => Math.random().toString(36).substring(2, 15);

  const addEducation = () => {
    const newEducation: Education = {
      id: generateId(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    };
    onChange([...education, newEducation]);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onChange(education.map(edu => 
      edu.id === id ? { ...edu, ...updates } : edu
    ));
  };

  const removeEducation = (id: string) => {
    onChange(education.filter(edu => edu.id !== id));
  };

  const moveEducation = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= education.length) return;
    
    const newEducation = [...education];
    [newEducation[index], newEducation[newIndex]] = [newEducation[newIndex], newEducation[index]];
    onChange(newEducation);
  };

  return (
    <div className="space-y-6" data-semtag-id="editor.education.list" data-semtag-role="collection">
      {education.map((edu, index) => (
        <div
          key={edu.id}
          className="p-4 rounded-lg border border-border bg-card/50 space-y-4"
          data-semtag-id={`editor.education.item.${edu.id}`}
          data-semtag-role="region"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Education {index + 1}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveEducation(index, 'up')}
                disabled={index === 0}
                className="h-8 w-8"
                data-semtag-id={`editor.education.item.${edu.id}.move-up`}
                data-semtag-role="action"
                data-semtag-action="move-education-up"
              >
                ↑
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveEducation(index, 'down')}
                disabled={index === education.length - 1}
                className="h-8 w-8"
                data-semtag-id={`editor.education.item.${edu.id}.move-down`}
                data-semtag-role="action"
                data-semtag-action="move-education-down"
              >
                ↓
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeEducation(edu.id)}
                className="h-8 w-8 text-destructive hover:text-destructive"
                data-semtag-id={`editor.education.item.${edu.id}.remove`}
                data-semtag-role="action"
                data-semtag-action="remove-education"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Institution</Label>
            <Input
              value={edu.institution}
              onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
              placeholder="University or School Name"
              data-semtag-id={`editor.education.item.${edu.id}.institution`}
              data-semtag-role="input"
              data-semtag-state="education.institution"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                placeholder="Bachelor of Science"
                data-semtag-id={`editor.education.item.${edu.id}.degree`}
                data-semtag-role="input"
                data-semtag-state="education.degree"
              />
            </div>
            <div className="space-y-2">
              <Label>Field of Study</Label>
              <Input
                value={edu.field}
                onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                placeholder="Computer Science"
                data-semtag-id={`editor.education.item.${edu.id}.field`}
                data-semtag-role="input"
                data-semtag-state="education.field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="month"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                data-semtag-id={`editor.education.item.${edu.id}.start-date`}
                data-semtag-role="input"
                data-semtag-state="education.start-date"
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="month"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                data-semtag-id={`editor.education.item.${edu.id}.end-date`}
                data-semtag-role="input"
                data-semtag-state="education.end-date"
              />
            </div>
            <div className="space-y-2">
              <Label>GPA (optional)</Label>
              <Input
                value={edu.gpa || ''}
                onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                placeholder="3.8"
                data-semtag-id={`editor.education.item.${edu.id}.gpa`}
                data-semtag-role="input"
                data-semtag-state="education.gpa"
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        onClick={addEducation}
        className="w-full"
        data-semtag-id="editor.education.add"
        data-semtag-role="action"
        data-semtag-action="add-education"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}
