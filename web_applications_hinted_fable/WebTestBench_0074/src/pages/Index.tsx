import { useState } from 'react';
import { Plus, Settings2, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useDatabase } from '@/hooks/useDatabase';
import { SearchBar } from '@/components/database/SearchBar';
import { ViewToggle } from '@/components/database/ViewToggle';
import { FieldConfigDialog } from '@/components/database/FieldConfigDialog';
import { EntryDialog } from '@/components/database/EntryDialog';
import { SortDropdown } from '@/components/database/SortDropdown';
import { TableView } from '@/components/database/TableView';
import { CardView } from '@/components/database/CardView';
import { Entry } from '@/types/database';

const Index = () => {
  const {
    fields,
    entries,
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    tableSortConfig,
    cardSortConfig,
    tableEntryOrder,
    cardEntryOrder,
    addField,
    updateField,
    deleteField,
    addEntry,
    updateEntry,
    deleteEntry,
    setSortConfig,
    setEntryOrder,
  } = useDatabase();

  const [entryDialogOpen, setEntryDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

  const currentSortConfig = currentView === 'table' ? tableSortConfig : cardSortConfig;
  const currentEntryOrder = currentView === 'table' ? tableEntryOrder : cardEntryOrder;

  const handleSort = (fieldId: string) => {
    const currentConfig = currentView === 'table' ? tableSortConfig : cardSortConfig;
    if (currentConfig.fieldId === fieldId) {
      setSortConfig(currentView, {
        fieldId,
        direction: currentConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig(currentView, { fieldId, direction: 'asc' });
    }
  };

  const handleReorder = (newOrder: string[]) => {
    setEntryOrder(currentView, newOrder);
  };

  const handleEditEntry = (entry: Entry) => {
    setEditingEntry(entry);
    setEntryDialogOpen(true);
  };

  const handleSaveEntry = (values: Record<string, string | number | boolean | null>) => {
    if (editingEntry) {
      updateEntry(editingEntry.id, values);
    } else {
      addEntry(values);
    }
    setEditingEntry(null);
  };

  const handleAddNew = () => {
    setEditingEntry(null);
    setEntryDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">FlexBase</h1>
                <p className="text-xs text-muted-foreground">Flexible Database</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FieldConfigDialog
                fields={fields}
                onAddField={addField}
                onUpdateField={updateField}
                onDeleteField={deleteField}
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    data-semtag-id="toolbar.fields"
                    data-semtag-role="action"
                    data-semtag-action="open-field-config"
                  >
                    <Settings2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Fields</span>
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            
            <div className="flex items-center gap-2">
              <SortDropdown
                fields={fields}
                sortConfig={currentSortConfig}
                onSortChange={(config) => setSortConfig(currentView, config)}
              />
              <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
              <Button
                onClick={handleAddNew}
                size="sm"
                className="gap-2"
                data-semtag-id="toolbar.add-entry"
                data-semtag-role="action"
                data-semtag-action="add-entry"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Entry</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          data-semtag-id="entries.view"
          data-semtag-role="region"
        >
          {currentView === 'table' ? (
            <TableView
              fields={fields}
              entries={entries}
              entryOrder={tableEntryOrder}
              sortConfig={tableSortConfig}
              onSort={handleSort}
              onReorder={handleReorder}
              onEdit={handleEditEntry}
              onDelete={deleteEntry}
            />
          ) : (
            <CardView
              fields={fields}
              entries={entries}
              entryOrder={cardEntryOrder}
              sortConfig={cardSortConfig}
              onReorder={handleReorder}
              onEdit={handleEditEntry}
              onDelete={deleteEntry}
            />
          )}
        </motion.div>

        {/* Status bar */}
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span
            data-semtag-id="statusbar.count"
            data-semtag-role="observable"
            data-semtag-state="entries.count"
          >
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          {currentSortConfig.fieldId && (
            <span
              data-semtag-id="statusbar.sort"
              data-semtag-role="observable"
              data-semtag-state="entries.sort"
            >
              Sorted by {fields.find(f => f.id === currentSortConfig.fieldId)?.name} (
              {currentSortConfig.direction === 'asc' ? 'ascending' : 'descending'})
            </span>
          )}
          {!currentSortConfig.fieldId && (
            <span className="text-muted-foreground/60">
              Drag entries to reorder
            </span>
          )}
        </div>
      </main>

      {/* Entry Dialog */}
      <EntryDialog
        open={entryDialogOpen}
        onOpenChange={(open) => {
          setEntryDialogOpen(open);
          if (!open) setEditingEntry(null);
        }}
        fields={fields}
        entry={editingEntry}
        onSave={handleSaveEntry}
      />
    </div>
  );
};

export default Index;
