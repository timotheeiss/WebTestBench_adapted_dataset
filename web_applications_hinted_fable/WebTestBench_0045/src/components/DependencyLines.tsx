import { useEffect, useState, useRef, useCallback } from 'react';
import { Task } from '@/types/task';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Check, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DependencyLinesProps {
  tasks: Task[];
  allTasks: Task[];
  containerRef: React.RefObject<HTMLDivElement>;
}

interface LineData {
  id: string;
  fromId: string;
  toId: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  fromTask: Task;
  toTask: Task;
}

export function DependencyLines({ tasks, allTasks, containerRef }: DependencyLinesProps) {
  const [lines, setLines] = useState<LineData[]>([]);
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const calculateLines = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const newLines: LineData[] = [];

    tasks.forEach((task) => {
      if (!task.prerequisites || task.prerequisites.length === 0) return;

      const toElement = container.querySelector(`[data-task-id="${task.id}"]`);
      if (!toElement) return;

      const toRect = toElement.getBoundingClientRect();

      task.prerequisites.forEach((prereqId) => {
        const prereqTask = allTasks.find((t) => t.id === prereqId);
        if (!prereqTask) return;

        const fromElement = container.querySelector(`[data-task-id="${prereqId}"]`);
        if (!fromElement) return;

        const fromRect = fromElement.getBoundingClientRect();

        // Calculate positions relative to container
        const x1 = fromRect.left - containerRect.left + fromRect.width / 2;
        const y1 = fromRect.bottom - containerRect.top;
        const x2 = toRect.left - containerRect.left + toRect.width / 2;
        const y2 = toRect.top - containerRect.top;

        newLines.push({
          id: `${prereqId}-${task.id}`,
          fromId: prereqId,
          toId: task.id,
          x1,
          y1,
          x2,
          y2,
          fromTask: prereqTask,
          toTask: task,
        });
      });
    });

    setLines(newLines);
  }, [tasks, allTasks, containerRef]);

  useEffect(() => {
    calculateLines();

    const resizeObserver = new ResizeObserver(() => {
      calculateLines();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', calculateLines);
    window.addEventListener('scroll', calculateLines, true);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateLines);
      window.removeEventListener('scroll', calculateLines, true);
    };
  }, [calculateLines, containerRef]);

  if (lines.length === 0) return null;

  const getDependencyChain = (taskId: string, visited: Set<string> = new Set()): Task[] => {
    if (visited.has(taskId)) return [];
    visited.add(taskId);
    
    const task = allTasks.find((t) => t.id === taskId);
    if (!task) return [];

    const chain: Task[] = [task];
    (task.prerequisites || []).forEach((prereqId) => {
      chain.push(...getDependencyChain(prereqId, visited));
    });
    return chain;
  };

  return (
    <TooltipProvider>
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" className="fill-muted-foreground/40" />
          </marker>
          <marker
            id="arrowhead-active"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" className="fill-primary" />
          </marker>
        </defs>
        {lines.map((line) => {
          const isHovered = hoveredLine === line.id;
          const isBlocked = !line.fromTask.completed;
          
          // Calculate control points for curved line
          const midY = (line.y1 + line.y2) / 2;
          const path = `M ${line.x1} ${line.y1} C ${line.x1} ${midY}, ${line.x2} ${midY}, ${line.x2} ${line.y2}`;

          return (
            <Tooltip key={line.id}>
              <TooltipTrigger asChild>
                <g
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setHoveredLine(line.id)}
                  onMouseLeave={() => setHoveredLine(null)}
                >
                  {/* Invisible wider path for easier hovering */}
                  <path
                    d={path}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="16"
                  />
                  {/* Visible dashed line */}
                  <path
                    d={path}
                    fill="none"
                    className={cn(
                      'transition-all duration-200',
                      isHovered
                        ? 'stroke-primary'
                        : isBlocked
                        ? 'stroke-warning/50'
                        : 'stroke-muted-foreground/30'
                    )}
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    strokeDasharray={isBlocked ? '6,4' : '4,4'}
                    markerEnd={isHovered ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
                  />
                </g>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <div className="space-y-2">
                  <p className="font-medium flex items-center gap-1.5">
                    <Link2 className="w-4 h-4" />
                    Dependency Chain
                  </p>
                  <div className="space-y-1.5 text-xs">
                    {getDependencyChain(line.toId).map((depTask, idx) => (
                      <div
                        key={depTask.id}
                        className={cn(
                          'flex items-center gap-2 p-1.5 rounded',
                          depTask.completed ? 'bg-primary/10' : 'bg-warning/10'
                        )}
                        style={{ marginLeft: `${idx * 8}px` }}
                      >
                        <span className={cn(
                          'flex-1',
                          depTask.completed && 'line-through text-muted-foreground'
                        )}>
                          {depTask.title}
                        </span>
                        {depTask.completed ? (
                          <Check className="w-3 h-3 text-primary" />
                        ) : (
                          <span className="text-warning text-[10px]">pending</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </svg>
    </TooltipProvider>
  );
}
