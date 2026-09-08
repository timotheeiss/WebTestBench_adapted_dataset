import { useMemo } from 'react';
import { GripVertical, Pencil, Trash2, ArrowUp, ArrowDown, Check, X } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Field, Entry, SortConfig } from '@/types/database';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

interface TableViewProps {
  fields: Field[];
  entries: Entry[];
  entryOrder: string[];
  sortConfig: SortConfig;
  onSort: (fieldId: string) => void;
  onReorder: (newOrder: string[]) => void;
  onEdit: (entry: Entry) => void;
  onDelete: (entryId: string) => void;
}

interface SortableRowProps {
  entry: Entry;
  fields: Field[];
  onEdit: (entry: Entry) => void;
  onDelete: (entryId: string) => void;
  isDraggingDisabled: boolean;
}

function SortableRow({ entry, fields, onEdit, onDelete, isDraggingDisabled }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: entry.id, disabled: isDraggingDisabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formatValue = (field: Field, value: string | number | boolean | null) => {
    if (value === null || value === undefined) return <span className="text-muted-foreground">—</span>;

    switch (field.type) {
      case 'checkbox':
        return value ? (
          <Check className="h-4 w-4 text-success" />
        ) : (
          <X className="h-4 w-4 text-muted-foreground" />
        );
      case 'date':
        try {
          return format(parseISO(value as string), 'MMM d, yyyy');
        } catch {
          return value;
        }
      case 'number':
        return <span className="font-mono">{value}</span>;
      default:
        return value;
    }
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={cn(
        'group transition-colors',
        isDragging && 'opacity-50 bg-muted'
      )}
    >
      <TableCell className="w-10 p-2">
        {!isDraggingDisabled && (
          <button
            {...attributes}
            {...listeners}
            className="drag-handle opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted"
            data-semtag-id={`entries.table.item.${entry.id}.drag`}
            data-semtag-role="action"
            data-semtag-action="reorder-entry"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </TableCell>
      {fields.map((field, fieldIndex) => (
        <TableCell
          key={field.id}
          className="py-3"
          data-semtag-id={
            fieldIndex === 0
              ? `entries.table.item.${entry.id}`
              : `entries.table.item.${entry.id}.${field.id}`
          }
          data-semtag-role="observable"
          data-semtag-state={`entry.${field.id}`}
        >
          {formatValue(field, entry.values[field.id])}
        </TableCell>
      ))}
      <TableCell className="w-20 p-2">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(entry)}
            className="h-7 w-7 p-0"
            data-semtag-id={`entries.table.item.${entry.id}.edit`}
            data-semtag-role="action"
            data-semtag-action="edit-entry"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(entry.id)}
            className="h-7 w-7 p-0 hover:text-destructive"
            data-semtag-id={`entries.table.item.${entry.id}.delete`}
            data-semtag-role="action"
            data-semtag-action="delete-entry"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function TableView({
  fields,
  entries,
  entryOrder,
  sortConfig,
  onSort,
  onReorder,
  onEdit,
  onDelete,
}: TableViewProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const isDraggingDisabled = sortConfig.fieldId !== null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = entryOrder.indexOf(String(active.id));
      const newIndex = entryOrder.indexOf(String(over.id));
      onReorder(arrayMove(entryOrder, oldIndex, newIndex));
    }
  };

  const sortedEntryIds = useMemo(() => entries.map(e => e.id), [entries]);

  return (
    <div
      className="rounded-lg border bg-card shadow-card overflow-hidden"
      data-semtag-id="entries.table"
      data-semtag-role="collection"
    >
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-10" />
              {fields.map(field => (
                <TableHead key={field.id}>
                  <button
                    onClick={() => onSort(field.id)}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                    data-semtag-id={`entries.table.header.${field.id}`}
                    data-semtag-role="action"
                    data-semtag-action="sort-by-column"
                    data-semtag-state="entries.sort"
                  >
                    {field.name}
                    {sortConfig.fieldId === field.id && (
                      sortConfig.direction === 'asc' ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )
                    )}
                  </button>
                </TableHead>
              ))}
              <TableHead className="w-20" />
            </TableRow>
          </TableHeader>
          <TableBody>
            <SortableContext items={sortedEntryIds} strategy={verticalListSortingStrategy}>
              {entries.map(entry => (
                <SortableRow
                  key={entry.id}
                  entry={entry}
                  fields={fields}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isDraggingDisabled={isDraggingDisabled}
                />
              ))}
            </SortableContext>
          </TableBody>
        </Table>
      </DndContext>
      {entries.length === 0 && (
        <div
          className="p-8 text-center text-muted-foreground"
          data-semtag-id="entries.table.empty"
          data-semtag-role="observable"
        >
          No entries found. Add one to get started.
        </div>
      )}
    </div>
  );
}
