import { useState, useMemo, useRef } from 'react';
import { Task, SortOption, Priority } from '@/types/task';
import { defaultTasks } from '@/data/defaultTasks';
import { TaskItem } from '@/components/TaskItem';
import { TaskForm } from '@/components/TaskForm';
import { TaskFilters } from '@/components/TaskFilters';
import { DependencyLines } from '@/components/DependencyLines';
import { Button } from '@/components/ui/button';
import { Plus, ClipboardList } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [sortBy, setSortBy] = useState<SortOption>('priority');
  const [showCompleted, setShowCompleted] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();
  const taskListRef = useRef<HTMLDivElement>(null);

  const { activeTasks, completedTasks } = useMemo(() => {
    const active = tasks.filter((t) => !t.completed);
    const completed = tasks.filter((t) => t.completed);
    return { activeTasks: active, completedTasks: completed };
  }, [tasks]);

  const sortedTasks = useMemo(() => {
    const tasksToSort = showCompleted ? completedTasks : activeTasks;

    return [...tasksToSort].sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'deadline':
          if (!a.deadline && !b.deadline) return 0;
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });
  }, [activeTasks, completedTasks, showCompleted, sortBy]);

  // Check which tasks have dependents that are blocked
  const tasksWithBlockedDependents = useMemo(() => {
    const set = new Set<string>();
    tasks.forEach((task) => {
      if (task.prerequisites) {
        task.prerequisites.forEach((prereqId) => {
          const prereq = tasks.find((t) => t.id === prereqId);
          if (prereq && !prereq.completed) {
            set.add(prereqId);
          }
        });
      }
    });
    return set;
  }, [tasks]);

  // Check if editing task is blocked
  const isEditingTaskBlocked = useMemo(() => {
    if (!editingTask) return false;
    const incompletePrereqs = (editingTask.prerequisites || []).filter((prereqId) => {
      const prereq = tasks.find((t) => t.id === prereqId);
      return prereq && !prereq.completed;
    });
    return incompletePrereqs.length > 0;
  }, [editingTask, tasks]);

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
    toast({
      title: 'Task created',
      description: `"${newTask.title}" has been added to your list.`,
    });
  };

  const handleEditTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (!editingTask) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTask.id
          ? { ...t, ...taskData }
          : t
      )
    );
    setEditingTask(null);
    toast({
      title: 'Task updated',
      description: `"${taskData.title}" has been updated.`,
    });
  };

  const handleToggleComplete = (id: string) => {
    // Check if task is blocked by incomplete prerequisites
    const task = tasks.find((t) => t.id === id);
    if (task && task.prerequisites) {
      const incompletePrereqs = task.prerequisites.filter((prereqId) => {
        const prereq = tasks.find((t) => t.id === prereqId);
        return prereq && !prereq.completed;
      });
      if (incompletePrereqs.length > 0) {
        toast({
          title: 'Cannot complete task',
          description: 'Complete all prerequisite tasks first.',
          variant: 'destructive',
        });
        return;
      }
    }

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleDelete = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    
    // Remove this task from any task's prerequisites
    setTasks((prev) => 
      prev
        .filter((t) => t.id !== id)
        .map((t) => ({
          ...t,
          prerequisites: t.prerequisites?.filter((prereqId) => prereqId !== id),
        }))
    );
    
    toast({
      title: 'Task deleted',
      description: task ? `"${task.title}" has been removed.` : 'Task removed.',
    });
  };

  const openEditForm = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <ClipboardList className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">My Tasks</h1>
              <p
                className="text-sm text-muted-foreground"
                data-semtag-id="tasks.summary"
                data-semtag-role="observable"
                data-semtag-state="tasks.counts"
              >
                {activeTasks.length} active, {completedTasks.length} completed
              </p>
            </div>
          </div>
          <Button
            onClick={() => setFormOpen(true)}
            className="gap-2 shadow-md"
            data-semtag-id="tasks.add"
            data-semtag-role="action"
            data-semtag-action="open-task-form"
            data-semtag-controls="task.form"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Filters */}
        <div className="mb-6">
          <TaskFilters
            sortBy={sortBy}
            onSortChange={setSortBy}
            showCompleted={showCompleted}
            onShowCompletedChange={setShowCompleted}
            activeCount={activeTasks.length}
            completedCount={completedTasks.length}
          />
        </div>

        {/* Task List with Dependency Lines */}
        <div
          ref={taskListRef}
          className="relative space-y-3"
          data-semtag-id="tasks.list"
          data-semtag-role="collection"
        >
          <DependencyLines
            tasks={sortedTasks}
            allTasks={tasks}
            containerRef={taskListRef}
          />
          
          {sortedTasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <ClipboardList className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3
                className="text-lg font-medium mb-1"
                data-semtag-id="tasks.empty"
                data-semtag-role="observable"
                data-semtag-state="tasks.empty"
              >
                {showCompleted ? 'No completed tasks' : 'All caught up!'}
              </h3>
              <p className="text-muted-foreground text-sm">
                {showCompleted
                  ? 'Complete some tasks to see them here.'
                  : 'Add a new task to get started.'}
              </p>
            </div>
          ) : (
            sortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                allTasks={tasks}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDelete}
                onEdit={openEditForm}
                hasBlockedDependents={tasksWithBlockedDependents.has(task.id)}
              />
            ))
          )}
        </div>
      </main>

      {/* Task Form Modal */}
      <TaskForm
        open={formOpen}
        onClose={closeForm}
        onSubmit={editingTask ? handleEditTask : handleAddTask}
        editingTask={editingTask}
        allTasks={tasks}
        isBlocked={isEditingTaskBlocked}
      />
    </div>
  );
};

export default Index;
