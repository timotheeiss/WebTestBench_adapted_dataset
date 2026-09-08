import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Field, Entry } from '@/types/database';
import { format } from 'date-fns';

interface EntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fields: Field[];
  entry?: Entry | null;
  onSave: (values: Record<string, string | number | boolean | null>) => void;
}

export function EntryDialog({ open, onOpenChange, fields, entry, onSave }: EntryDialogProps) {
  const [values, setValues] = useState<Record<string, string | number | boolean | null>>({});

  useEffect(() => {
    if (open) {
      if (entry) {
        setValues({ ...entry.values });
      } else {
        const initialValues: Record<string, string | number | boolean | null> = {};
        fields.forEach(field => {
          if (field.type === 'checkbox') {
            initialValues[field.id] = false;
          } else if (field.type === 'number') {
            initialValues[field.id] = 0;
          } else if (field.type === 'date') {
            initialValues[field.id] = format(new Date(), 'yyyy-MM-dd');
          } else {
            initialValues[field.id] = '';
          }
        });
        setValues(initialValues);
      }
    }
  }, [open, entry, fields]);

  const handleSave = () => {
    onSave(values);
    onOpenChange(false);
  };

  const updateValue = (fieldId: string, value: string | number | boolean | null) => {
    setValues(prev => ({ ...prev, [fieldId]: value }));
  };

  const renderInput = (field: Field) => {
    const value = values[field.id];

    switch (field.type) {
      case 'checkbox':
        return (
          <div className="flex items-center gap-2">
            <Checkbox
              id={field.id}
              checked={Boolean(value)}
              onCheckedChange={(checked) => updateValue(field.id, checked === true)}
              data-semtag-id={`entry.dialog.fields.item.${field.id}`}
              data-semtag-role="toggle"
              data-semtag-state={`entry.${field.id}`}
            />
            <Label htmlFor={field.id} className="text-sm cursor-pointer">
              {value ? 'Yes' : 'No'}
            </Label>
          </div>
        );

      case 'number':
        return (
          <Input
            type="number"
            value={value as number ?? ''}
            onChange={(e) => updateValue(field.id, e.target.value ? Number(e.target.value) : null)}
            className="bg-background"
            data-semtag-id={`entry.dialog.fields.item.${field.id}`}
            data-semtag-role="input"
            data-semtag-state={`entry.${field.id}`}
          />
        );

      case 'date':
        return (
          <Input
            type="date"
            value={value as string ?? ''}
            onChange={(e) => updateValue(field.id, e.target.value)}
            className="bg-background"
            data-semtag-id={`entry.dialog.fields.item.${field.id}`}
            data-semtag-role="input"
            data-semtag-state={`entry.${field.id}`}
          />
        );

      default:
        return (
          <Input
            type="text"
            value={value as string ?? ''}
            onChange={(e) => updateValue(field.id, e.target.value)}
            placeholder={`Enter ${field.name.toLowerCase()}`}
            className="bg-background"
            data-semtag-id={`entry.dialog.fields.item.${field.id}`}
            data-semtag-role="input"
            data-semtag-state={`entry.${field.id}`}
          />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        data-semtag-id="entry.dialog"
        data-semtag-role="region"
      >
        <DialogHeader>
          <DialogTitle>{entry ? 'Edit Entry' : 'Add New Entry'}</DialogTitle>
        </DialogHeader>

        <div
          className="space-y-4 mt-4"
          data-semtag-id="entry.dialog.fields"
          data-semtag-role="collection"
        >
          {fields.map(field => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id} className="text-sm font-medium">
                {field.name}
              </Label>
              {renderInput(field)}
            </div>
          ))}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-semtag-id="entry.dialog.cancel"
              data-semtag-role="action"
              data-semtag-action="cancel-entry"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              data-semtag-id="entry.dialog.save"
              data-semtag-role="action"
              data-semtag-action="save-entry"
            >
              {entry ? 'Save Changes' : 'Add Entry'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
