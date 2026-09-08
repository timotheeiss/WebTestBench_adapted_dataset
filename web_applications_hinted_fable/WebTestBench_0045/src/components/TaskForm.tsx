import { useState, useEffect } from 'react';
import { Task, Priority } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar, Flag, X, Link2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  editingTask?: Task | null;
  allTasks?: Task[];
  isBlocked?: boolean;
}

const priorityOptions: { value: Priority; label: string; color: string }[] = [
  { value: 'high', label: 'High Priority', color: 'text-priority-high' },
  { value: 'medium', label: 'Medium Priority', color: 'text-priority-medium' },
  { value: 'low', label: 'Low Priority', color: 'text-priority-low' },
];

export function TaskForm({ open, onClose, onSubmit, editingTask, allTasks = [], isBlocked = false }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [prerequisites, setPrerequisites] = useState<string[]>([]);

  // Filter out the current task and tasks that depend on this task (to prevent circular deps)
  const availablePrerequisites = allTasks.filter((t) => {
    if (editingTask && t.id === editingTask.id) return false;
    // Prevent circular dependencies
    if (editingTask) {
      const wouldCreateCycle = (taskId: string, visited: Set<string> = new Set()): boolean => {
        if (visited.has(taskId)) return false;
        visited.add(taskId);
        const task = allTasks.find((t) => t.id === taskId);
        if (!task) return false;
        if (task.prerequisites?.includes(editingTask.id)) return true;
        return (task.prerequisites || []).some((prereqId) => wouldCreateCycle(prereqId, visited));
      };
      if (wouldCreateCycle(t.id)) return false;
    }
    return true;
  });

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setDeadline(editingTask.deadline ? format(editingTask.deadline, 'yyyy-MM-dd') : '');
      setPriority(editingTask.priority);
      setPrerequisites(editingTask.prerequisites || []);
    } else {
      setTitle('');
      setDescription('');
      setDeadline('');
      setPriority('medium');
      setPrerequisites([]);
    }
  }, [editingTask, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      deadline: deadline ? new Date(deadline) : undefined,
      priority,
      completed: editingTask?.completed || false,
      prerequisites: prerequisites.length > 0 ? prerequisites : undefined,
    });

    onClose();
  };

  const togglePrerequisite = (taskId: string) => {
    setPrerequisites((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[520px] gap-0 p-0 overflow-hidden max-h-[90vh]"
        data-semtag-id="task.form"
        data-semtag-role="region"
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-xl font-semibold">
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="h-11"
                autoFocus
                disabled={isBlocked}
                data-semtag-id="task.form.title"
                data-semtag-role="input"
                data-semtag-state="task.title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details (optional)"
                className="min-h-[100px] resize-none"
                data-semtag-id="task.form.description"
                data-semtag-role="input"
                data-semtag-state="task.description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-sm font-medium flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  Deadline
                </Label>
                <div className="relative">
                  <Input
                    id="deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="h-11"
                    disabled={isBlocked}
                    data-semtag-id="task.form.deadline"
                    data-semtag-role="input"
                    data-semtag-state="task.deadline"
                  />
                  {deadline && !isBlocked && (
                    <button
                      type="button"
                      onClick={() => setDeadline('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      data-semtag-id="task.form.deadline.clear"
                      data-semtag-role="action"
                      data-semtag-action="clear-deadline"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <Flag className="w-4 h-4 text-muted-foreground" />
                  Priority
                </Label>
                <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                  <SelectTrigger
                    className="h-11"
                    data-semtag-id="task.form.priority"
                    data-semtag-role="select"
                    data-semtag-action="set-priority"
                    data-semtag-state="task.priority"
                    data-semtag-options={priorityOptions.map((o) => `${o.value}|${o.label}`).join(';')}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        data-semtag-id={`task.form.priority.option.${option.value}`}
                        data-semtag-role="option"
                      >
                        <span className={cn('font-medium', option.color)}>
                          {option.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Prerequisites Section */}
            {availablePrerequisites.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <Link2 className="w-4 h-4 text-muted-foreground" />
                  Prerequisites
                </Label>
                <p className="text-xs text-muted-foreground">
                  Select tasks that must be completed before this one
                </p>
                <div
                  className="space-y-2 max-h-[150px] overflow-y-auto border border-border rounded-md p-3"
                  data-semtag-id="task.form.prerequisites"
                  data-semtag-role="collection"
                >
                  {availablePrerequisites.map((task) => (
                    <label
                      key={task.id}
                      className={cn(
                        'flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors',
                        prerequisites.includes(task.id)
                          ? 'bg-primary/10'
                          : 'hover:bg-muted/50'
                      )}
                    >
                      <Checkbox
                        checked={prerequisites.includes(task.id)}
                        onCheckedChange={() => togglePrerequisite(task.id)}
                        data-semtag-id={`task.form.prerequisites.item.${task.id}`}
                        data-semtag-role="toggle"
                        data-semtag-action="toggle-prerequisite"
                        data-semtag-state={prerequisites.includes(task.id) ? 'selected' : 'unselected'}
                      />
                      <div className="flex-1 min-w-0">
                        <span className={cn(
                          'text-sm font-medium truncate block',
                          task.completed && 'line-through text-muted-foreground'
                        )}>
                          {task.title}
                        </span>
                        {task.completed && (
                          <span className="text-xs text-primary">Completed</span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
                data-semtag-id="task.form.cancel"
                data-semtag-role="action"
                data-semtag-action="cancel-task-form"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!title.trim()}
                data-semtag-id="task.form.submit"
                data-semtag-role="action"
                data-semtag-action="save-task"
              >
                {editingTask ? 'Save Changes' : 'Create Task'}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
