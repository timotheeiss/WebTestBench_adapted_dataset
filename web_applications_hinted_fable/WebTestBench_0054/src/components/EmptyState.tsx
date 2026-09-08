import { FileText } from 'lucide-react';

interface EmptyStateProps extends React.ComponentProps<'div'> {
  title: string;
  description: string;
}

export function EmptyState({ title, description, ...props }: EmptyStateProps) {
  return (
    <div className="empty-state" {...props}>
      <FileText size={48} className="mb-4 opacity-40" />
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm text-center">{description}</p>
    </div>
  );
}
