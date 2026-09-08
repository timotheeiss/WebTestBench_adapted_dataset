import { Skill } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export function SkillsForm({ skills, onChange }: SkillsFormProps) {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<Skill['level']>('intermediate');

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const addSkill = () => {
    if (!newSkillName.trim()) return;
    
    const newSkill: Skill = {
      id: generateId(),
      name: newSkillName.trim(),
      level: newSkillLevel,
    };
    onChange([...skills, newSkill]);
    setNewSkillName('');
    setNewSkillLevel('intermediate');
  };

  const removeSkill = (id: string) => {
    onChange(skills.filter(skill => skill.id !== id));
  };

  const updateSkillLevel = (id: string, level: Skill['level']) => {
    onChange(skills.map(skill => 
      skill.id === id ? { ...skill, level } : skill
    ));
  };

  const levelColors = {
    beginner: 'bg-muted text-muted-foreground',
    intermediate: 'bg-secondary text-secondary-foreground',
    advanced: 'bg-primary/20 text-primary',
    expert: 'bg-accent/20 text-accent',
  };

  return (
    <div className="space-y-6">
      {/* Add New Skill */}
      <div
        className="p-4 rounded-lg border border-dashed border-border bg-card/50 space-y-4"
        data-semtag-id="editor.skills.new"
        data-semtag-role="region"
      >
        <Label className="text-sm font-medium">Add New Skill</Label>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="e.g., React, Project Management"
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            data-semtag-id="editor.skills.new.name"
            data-semtag-role="input"
            data-semtag-state="skills.new.name"
          />
          <Select value={newSkillLevel} onValueChange={(value: Skill['level']) => setNewSkillLevel(value)}>
            <SelectTrigger
              className="w-full sm:w-40"
              data-semtag-id="editor.skills.new.level"
              data-semtag-role="select"
              data-semtag-state="skills.new.level"
              data-semtag-options="beginner|Beginner;intermediate|Intermediate;advanced|Advanced;expert|Expert"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner" data-semtag-id="editor.skills.new.level.option.beginner" data-semtag-role="option">Beginner</SelectItem>
              <SelectItem value="intermediate" data-semtag-id="editor.skills.new.level.option.intermediate" data-semtag-role="option">Intermediate</SelectItem>
              <SelectItem value="advanced" data-semtag-id="editor.skills.new.level.option.advanced" data-semtag-role="option">Advanced</SelectItem>
              <SelectItem value="expert" data-semtag-id="editor.skills.new.level.option.expert" data-semtag-role="option">Expert</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={addSkill}
            disabled={!newSkillName.trim()}
            data-semtag-id="editor.skills.add"
            data-semtag-role="action"
            data-semtag-action="add-skill"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Skills List */}
      {skills.length > 0 ? (
        <div className="space-y-3">
          <Label className="text-sm font-medium">Your Skills</Label>
          <div
            className="flex flex-wrap gap-2"
            data-semtag-id="editor.skills.list"
            data-semtag-role="collection"
          >
            {skills.map((skill) => (
              <div
                key={skill.id}
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg ${levelColors[skill.level]} transition-all`}
              >
                <span
                  className="font-medium text-sm"
                  data-semtag-id={`editor.skills.item.${skill.id}`}
                  data-semtag-role="observable"
                  data-semtag-state="skill.name"
                >{skill.name}</span>
                <Select
                  value={skill.level}
                  onValueChange={(value: Skill['level']) => updateSkillLevel(skill.id, value)}
                >
                  <SelectTrigger
                    className="h-6 w-24 text-xs border-none bg-transparent p-0 focus:ring-0"
                    data-semtag-id={`editor.skills.item.${skill.id}.level`}
                    data-semtag-role="select"
                    data-semtag-state="skill.level"
                    data-semtag-options="beginner|Beginner;intermediate|Intermediate;advanced|Advanced;expert|Expert"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner" data-semtag-id={`editor.skills.item.${skill.id}.level.option.beginner`} data-semtag-role="option">Beginner</SelectItem>
                    <SelectItem value="intermediate" data-semtag-id={`editor.skills.item.${skill.id}.level.option.intermediate`} data-semtag-role="option">Intermediate</SelectItem>
                    <SelectItem value="advanced" data-semtag-id={`editor.skills.item.${skill.id}.level.option.advanced`} data-semtag-role="option">Advanced</SelectItem>
                    <SelectItem value="expert" data-semtag-id={`editor.skills.item.${skill.id}.level.option.expert`} data-semtag-role="option">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                  data-semtag-id={`editor.skills.item.${skill.id}.remove`}
                  data-semtag-role="action"
                  data-semtag-action="remove-skill"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p
          className="text-center text-muted-foreground py-8"
          data-semtag-id="editor.skills.empty-message"
          data-semtag-role="observable"
          data-semtag-state="skills.empty"
        >
          No skills added yet. Add your first skill above!
        </p>
      )}
    </div>
  );
}
