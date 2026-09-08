import { ModuleType, moduleInfo } from '@/data/documents';
import { cn } from '@/lib/utils';

interface ModuleBadgeProps {
  module: ModuleType;
  className?: string;
}

export function ModuleBadge({ module, className }: ModuleBadgeProps) {
  const info = moduleInfo[module];
  
  return (
    <span className={cn('module-badge', `module-${module}`, className)}>
      {info.name}
    </span>
  );
}
