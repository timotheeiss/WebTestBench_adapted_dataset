import { useState } from 'react';
import { Task, Priority } from '@/types/task';
import { format, isToday, isTomorrow, isPast, isValid } from 'date-fns';
import { Check, Trash2, Edit2, Calendar, Flag, AlertTriangle, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TaskItemProps {
  task: Task;
  allTasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  hasBlockedDependents?: boolean;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: { label: 'High', className: 'bg-priority-high/10 text-priority-high border-priority-high/20' },
  medium: { label: 'Medium', className: 'bg-priority-medium/10 text-priority-medium border-priority-medium/20' },
  low: { label: 'Low', className: 'bg-priority-low/10 text-priority-low border-priority-low/20' },
};

const formatDeadline = (date: Date | undefined): string | null => {
  if (!date || !isValid(date)) return null;
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return format(date, 'MMM d');
};

export function TaskItem({ task, allTasks, onToggleComplete, onDelete, onEdit, hasBlockedDependents }: TaskItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const deadline = formatDeadline(task.deadline);
  const isOverdue = task.deadline && isPast(task.deadline) && !task.completed;

  // Check if this task is blocked by incomplete prerequisites
  const incompletePrerequisites = (task.prerequisites || [])
    .map((prereqId) => allTasks.find((t) => t.id === prereqId))
    .filter((prereq): prereq is Task => prereq !== undefined && !prereq.completed);

  const isBlocked = incompletePrerequisites.length > 0;

  // Get dependency chain for tooltip
  const getDependencyChain = (taskId: string, visited: Set<string> = new Set()): Task[] => {
    if (visited.has(taskId)) return [];
    visited.add(taskId);
    
    const currentTask = allTasks.find((t) => t.id === taskId);
    if (!currentTask) return [];

    const chain: Task[] = [currentTask];
    (currentTask.prerequisites || []).forEach((prereqId) => {
      chain.push(...getDependencyChain(prereqId, visited));
    });
    return chain;
  };

  return (
    <div
      className={cn(
        'group relative flex items-start gap-4 p-4 rounded-lg border transition-all duration-200',
        task.completed
          ? 'bg-muted/50 border-border/50'
          : isBlocked
          ? 'bg-muted/30 border-dashed border-warning/40'
          : 'bg-card border-border hover:border-primary/30 hover:shadow-md',
        'animate-fade-in'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-task-id={task.id}
    >
      {/* Dependency indicator line */}
      {hasBlockedDependents && !task.completed && (
        <div className="absolute -bottom-3 left-1/2 w-0.5 h-3 bg-dashed-line" />
      )}

      {/* Checkbox */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => !isBlocked && onToggleComplete(task.id)}
              disabled={isBlocked}
              data-semtag-id={`tasks.list.item.${task.id}.complete`}
              data-semtag-role="toggle"
              data-semtag-action="toggle-complete"
              data-semtag-state={task.completed ? 'completed' : isBlocked ? 'blocked' : 'active'}
              className={cn(
                'flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
                task.completed
                  ? 'bg-primary border-primary'
                  : isBlocked
                  ? 'border-muted-foreground/20 bg-muted cursor-not-allowed opacity-50'
                  : 'border-muted-foreground/40 hover:border-primary hover:bg-primary/5'
              )}
            >
              {task.completed && (
                <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
              )}
            </button>
          </TooltipTrigger>
          {isBlocked && (
            <TooltipContent side="top" className="max-w-xs">
              <p className="font-medium mb-1">Cannot complete - blocked by prerequisites</p>
              <ul className="text-xs space-y-0.5">
                {incompletePrerequisites.map((prereq) => (
                  <li key={prereq.id}>• {prereq.title}</li>
                ))}
              </ul>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <h3
            className={cn(
              'font-medium leading-snug transition-colors duration-200',
              task.completed && 'line-through text-muted-foreground',
              isBlocked && !task.completed && 'text-muted-foreground'
            )}
            data-semtag-id={`tasks.list.item.${task.id}`}
            data-semtag-role="observable"
            data-semtag-state="task.title"
          >
            {task.title}
          </h3>
          <Badge
            variant="outline"
            className={cn(
              'text-xs font-medium border',
              priorityConfig[task.priority].className
            )}
            data-semtag-id={`tasks.list.item.${task.id}.priority`}
            data-semtag-role="observable"
            data-semtag-state="task.priority"
          >
            <Flag className="w-3 h-3 mr-1" />
            {priorityConfig[task.priority].label}
          </Badge>
        </div>

        {task.description && (
          <p
            className={cn(
              'mt-1.5 text-sm leading-relaxed',
              task.completed ? 'text-muted-foreground/60' : 'text-muted-foreground'
            )}
          >
            {task.description}
          </p>
        )}

        {deadline && (
          <div
            className={cn(
              'mt-2 flex items-center gap-1.5 text-xs font-medium',
              isOverdue ? 'text-destructive' : 'text-muted-foreground'
            )}
            data-semtag-id={`tasks.list.item.${task.id}.deadline`}
            data-semtag-role="observable"
            data-semtag-state="task.deadline"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{isOverdue ? `Overdue: ${deadline}` : deadline}</span>
          </div>
        )}

        {/* Blocked warning */}
        {isBlocked && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-warning/10 border border-warning/30 text-warning text-xs font-medium cursor-help"
                    data-semtag-id={`tasks.list.item.${task.id}.blocked-warning`}
                    data-semtag-role="observable"
                    data-semtag-state="task.prerequisites"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>
                      {incompletePrerequisites.length === 1
                        ? `Prerequisite "${incompletePrerequisites[0].title}" incomplete`
                        : `${incompletePrerequisites.length} prerequisites incomplete`}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-sm">
                  <div className="space-y-2">
                    <p className="font-medium">Dependency Chain</p>
                    <div className="space-y-1 text-xs">
                      {getDependencyChain(task.id).slice(1).map((depTask, idx) => (
                        <div
                          key={depTask.id}
                          className={cn(
                            'flex items-center gap-2 p-1.5 rounded',
                            depTask.completed ? 'bg-primary/10' : 'bg-warning/10'
                          )}
                          style={{ marginLeft: `${idx * 8}px` }}
                        >
                          <Link2 className="w-3 h-3 flex-shrink-0" />
                          <span className={cn(depTask.completed && 'line-through')}>
                            {depTask.title}
                          </span>
                          {depTask.completed ? (
                            <Check className="w-3 h-3 text-primary ml-auto" />
                          ) : (
                            <span className="text-warning ml-auto">pending</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* Show prerequisites link indicator */}
        {task.prerequisites && task.prerequisites.length > 0 && !isBlocked && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground cursor-help"
                  data-semtag-id={`tasks.list.item.${task.id}.prerequisites-done`}
                  data-semtag-role="observable"
                  data-semtag-state="task.prerequisites"
                >
                  <Link2 className="w-3 h-3" />
                  <span>{task.prerequisites.length} prerequisite{task.prerequisites.length > 1 ? 's' : ''} completed</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <ul className="text-xs space-y-0.5">
                  {task.prerequisites.map((prereqId) => {
                    const prereq = allTasks.find((t) => t.id === prereqId);
                    return prereq ? (
                      <li key={prereqId} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-primary" />
                        {prereq.title}
                      </li>
                    ) : null;
                  })}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Actions */}
      <div
        className={cn(
          'flex items-center gap-1 transition-opacity duration-200',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-8 w-8',
                    isBlocked
                      ? 'text-muted-foreground/40 cursor-not-allowed'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  onClick={() => !isBlocked && onEdit(task)}
                  disabled={isBlocked}
                  data-semtag-id={`tasks.list.item.${task.id}.edit`}
                  data-semtag-role="action"
                  data-semtag-action="edit-task"
                  data-semtag-controls="task.form"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              </span>
            </TooltipTrigger>
            {isBlocked && (
              <TooltipContent>
                <p>Complete prerequisites first</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(task.id)}
          data-semtag-id={`tasks.list.item.${task.id}.delete`}
          data-semtag-role="action"
          data-semtag-action="delete-task"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
