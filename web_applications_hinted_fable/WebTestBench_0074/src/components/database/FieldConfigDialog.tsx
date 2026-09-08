import { useState } from 'react';
import { Plus, Trash2, Type, Hash, Calendar, CheckSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Field, FieldType } from '@/types/database';
import { cn } from '@/lib/utils';

interface FieldConfigDialogProps {
  fields: Field[];
  onAddField: (field: Omit<Field, 'id'>) => void;
  onUpdateField: (fieldId: string, updates: Partial<Omit<Field, 'id'>>) => void;
  onDeleteField: (fieldId: string) => void;
  trigger?: React.ReactNode;
}

const fieldTypeIcons: Record<FieldType, React.ReactNode> = {
  text: <Type className="h-4 w-4" />,
  number: <Hash className="h-4 w-4" />,
  date: <Calendar className="h-4 w-4" />,
  checkbox: <CheckSquare className="h-4 w-4" />,
};

const fieldTypeLabels: Record<FieldType, string> = {
  text: 'Text',
  number: 'Number',
  date: 'Date',
  checkbox: 'Checkbox',
};

const fieldTypeOptions = (Object.keys(fieldTypeLabels) as FieldType[])
  .map(type => `${type}|${fieldTypeLabels[type]}`)
  .join(';');

export function FieldConfigDialog({
  fields,
  onAddField,
  onUpdateField,
  onDeleteField,
  trigger,
}: FieldConfigDialogProps) {
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState<FieldType>('text');
  const [open, setOpen] = useState(false);

  const handleAddField = () => {
    if (newFieldName.trim()) {
      onAddField({ name: newFieldName.trim(), type: newFieldType });
      setNewFieldName('');
      setNewFieldType('text');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Configure Fields
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-lg"
        data-semtag-id="fields.dialog"
        data-semtag-role="region"
      >
        <DialogHeader>
          <DialogTitle>Configure Fields</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Existing fields */}
          <div
            className="space-y-2"
            data-semtag-id="fields.dialog.list"
            data-semtag-role="collection"
          >
            {fields.map(field => (
              <div
                key={field.id}
                className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 animate-fade-in"
              >
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-muted-foreground">{fieldTypeIcons[field.type]}</span>
                  <Input
                    value={field.name}
                    onChange={(e) => onUpdateField(field.id, { name: e.target.value })}
                    className="h-8 bg-background"
                    data-semtag-id={`fields.dialog.list.item.${field.id}`}
                    data-semtag-role="input"
                    data-semtag-state="field.name"
                  />
                </div>
                <Select
                  value={field.type}
                  onValueChange={(value: FieldType) => onUpdateField(field.id, { type: value })}
                >
                  <SelectTrigger
                    className="w-28 h-8"
                    data-semtag-id={`fields.dialog.list.item.${field.id}.type`}
                    data-semtag-role="select"
                    data-semtag-state="field.type"
                    data-semtag-options={fieldTypeOptions}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(fieldTypeLabels) as FieldType[]).map(type => (
                      <SelectItem
                        key={type}
                        value={type}
                        data-semtag-id={`fields.dialog.list.item.${field.id}.type.option.${type}`}
                        data-semtag-role="option"
                      >
                        <div className="flex items-center gap-2">
                          {fieldTypeIcons[type]}
                          {fieldTypeLabels[type]}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteField(field.id)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  data-semtag-id={`fields.dialog.list.item.${field.id}.delete`}
                  data-semtag-role="action"
                  data-semtag-action="delete-field"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Add new field */}
          <div className="flex items-center gap-2 p-3 rounded-lg border border-dashed border-border">
            <Input
              placeholder="New field name"
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
              className="h-8"
              onKeyDown={(e) => e.key === 'Enter' && handleAddField()}
              data-semtag-id="fields.dialog.new.name"
              data-semtag-role="input"
              data-semtag-state="newField.name"
            />
            <Select value={newFieldType} onValueChange={(v: FieldType) => setNewFieldType(v)}>
              <SelectTrigger
                className="w-28 h-8"
                data-semtag-id="fields.dialog.new.type"
                data-semtag-role="select"
                data-semtag-state="newField.type"
                data-semtag-options={fieldTypeOptions}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(fieldTypeLabels) as FieldType[]).map(type => (
                  <SelectItem
                    key={type}
                    value={type}
                    data-semtag-id={`fields.dialog.new.type.option.${type}`}
                    data-semtag-role="option"
                  >
                    <div className="flex items-center gap-2">
                      {fieldTypeIcons[type]}
                      {fieldTypeLabels[type]}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              onClick={handleAddField}
              className="h-8 gap-1"
              data-semtag-id="fields.dialog.new.add"
              data-semtag-role="action"
              data-semtag-action="add-field"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Note: Changing field types may affect how existing data is displayed. Configure fields before importing data.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
