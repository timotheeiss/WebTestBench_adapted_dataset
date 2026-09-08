import { useMemo } from 'react';
import { GripVertical, Pencil, Trash2, Check, X, Calendar, Hash, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Field, Entry, SortConfig } from '@/types/database';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

interface CardViewProps {
  fields: Field[];
  entries: Entry[];
  entryOrder: string[];
  sortConfig: SortConfig;
  onReorder: (newOrder: string[]) => void;
  onEdit: (entry: Entry) => void;
  onDelete: (entryId: string) => void;
}

interface SortableCardProps {
  entry: Entry;
  fields: Field[];
  onEdit: (entry: Entry) => void;
  onDelete: (entryId: string) => void;
  isDraggingDisabled: boolean;
}

function SortableCard({ entry, fields, onEdit, onDelete, isDraggingDisabled }: SortableCardProps) {
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
          <Badge variant="default" className="bg-success text-success-foreground gap-1">
            <Check className="h-3 w-3" />
            Yes
          </Badge>
        ) : (
          <Badge variant="secondary" className="gap-1">
            <X className="h-3 w-3" />
            No
          </Badge>
        );
      case 'date':
        try {
          return (
            <span className="flex items-center gap-1.5 text-sm">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              {format(parseISO(value as string), 'MMM d, yyyy')}
            </span>
          );
        } catch {
          return value;
        }
      case 'number':
        return (
          <span className="flex items-center gap-1.5 text-sm font-mono">
            <Hash className="h-3.5 w-3.5 text-muted-foreground" />
            {value}
          </span>
        );
      default:
        return <span className="text-sm">{value}</span>;
    }
  };

  // Get the first text field as title
  const titleField = fields.find(f => f.type === 'text');
  const title = titleField ? entry.values[titleField.id] : null;
  const otherFields = titleField ? fields.filter(f => f.id !== titleField.id) : fields;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          'group relative shadow-card hover:shadow-card-hover transition-shadow duration-200',
          isDragging && 'opacity-50'
        )}
      >
        <CardContent className="p-4">
          {/* Drag handle and actions */}
          <div className="flex items-center justify-between mb-3">
            {!isDraggingDisabled && (
              <button
                {...attributes}
                {...listeners}
                className="drag-handle opacity-0 group-hover:opacity-100 transition-opacity p-1 -ml-1 rounded hover:bg-muted"
                data-semtag-id={`entries.cards.item.${entry.id}.drag`}
                data-semtag-role="action"
                data-semtag-action="reorder-entry"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
            {isDraggingDisabled && <div />}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(entry)}
                className="h-7 w-7 p-0"
                data-semtag-id={`entries.cards.item.${entry.id}.edit`}
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
                data-semtag-id={`entries.cards.item.${entry.id}.delete`}
                data-semtag-role="action"
                data-semtag-action="delete-entry"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Title */}
          {title && (
            <h3
              className="font-medium text-foreground mb-3 line-clamp-2"
              data-semtag-id={`entries.cards.item.${entry.id}`}
              data-semtag-role="observable"
              data-semtag-state={`entry.${titleField.id}`}
            >
              {String(title)}
            </h3>
          )}

          {/* Other fields */}
          <div className="space-y-2.5">
            {otherFields.map(field => (
              <div key={field.id} className="flex items-start justify-between gap-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wide flex-shrink-0">
                  {field.name}
                </span>
                <div
                  className="text-right"
                  data-semtag-id={`entries.cards.item.${entry.id}.${field.id}`}
                  data-semtag-role="observable"
                  data-semtag-state={`entry.${field.id}`}
                >
                  {formatValue(field, entry.values[field.id])}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function CardView({
  fields,
  entries,
  entryOrder,
  sortConfig,
  onReorder,
  onEdit,
  onDelete,
}: CardViewProps) {
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
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sortedEntryIds} strategy={rectSortingStrategy}>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          data-semtag-id="entries.cards"
          data-semtag-role="collection"
        >
          <AnimatePresence mode="popLayout">
            {entries.map(entry => (
              <SortableCard
                key={entry.id}
                entry={entry}
                fields={fields}
                onEdit={onEdit}
                onDelete={onDelete}
                isDraggingDisabled={isDraggingDisabled}
              />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
      {entries.length === 0 && (
        <div
          className="p-8 text-center text-muted-foreground rounded-lg border border-dashed"
          data-semtag-id="entries.cards.empty"
          data-semtag-role="observable"
        >
          No entries found. Add one to get started.
        </div>
      )}
    </DndContext>
  );
}
