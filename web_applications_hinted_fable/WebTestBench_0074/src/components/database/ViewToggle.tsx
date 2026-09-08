import { LayoutGrid, Table2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ViewMode } from '@/types/database';

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center rounded-lg bg-muted p-1 gap-1">
      <Button
        variant={currentView === 'table' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('table')}
        className="h-8 px-3 gap-2"
        data-semtag-id="toolbar.view.table"
        data-semtag-role="action"
        data-semtag-action="switch-to-table-view"
        data-semtag-controls="entries.view"
      >
        <Table2 className="h-4 w-4" />
        <span className="hidden sm:inline">Table</span>
      </Button>
      <Button
        variant={currentView === 'card' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('card')}
        className="h-8 px-3 gap-2"
        data-semtag-id="toolbar.view.cards"
        data-semtag-role="action"
        data-semtag-action="switch-to-card-view"
        data-semtag-controls="entries.view"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Cards</span>
      </Button>
    </div>
  );
}
