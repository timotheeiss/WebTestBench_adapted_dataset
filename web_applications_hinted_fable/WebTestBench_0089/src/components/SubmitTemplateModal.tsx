import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { categoryLabels, scenarioLabels, TemplateCategory, TemplateScenario, TemplateField, Template } from '@/data/templates';
import { Plus, X, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface SubmitTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (template: Omit<Template, 'id' | 'popularity' | 'createdAt' | 'updatedAt'>) => void;
}

interface NewField {
  label: string;
  placeholder: string;
  required: boolean;
  type: 'text' | 'textarea' | 'email' | 'date';
}

export function SubmitTemplateModal({ isOpen, onClose, onSubmit }: SubmitTemplateModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<TemplateCategory>('other');
  const [scenario, setScenario] = useState<TemplateScenario>('business');
  const [content, setContent] = useState('');
  const [isMarkdown, setIsMarkdown] = useState(true);
  const [fields, setFields] = useState<NewField[]>([]);
  const [newField, setNewField] = useState<NewField>({ label: '', placeholder: '', required: false, type: 'text' });
  
  const { toast } = useToast();

  const addField = () => {
    if (!newField.label.trim()) {
      toast({
        title: "Field label required",
        description: "Please enter a label for the field.",
        variant: "destructive",
      });
      return;
    }
    setFields([...fields, { ...newField }]);
    setNewField({ label: '', placeholder: '', required: false, type: 'text' });
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !author.trim() || !content.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (fields.length === 0) {
      toast({
        title: "No fields defined",
        description: "Please add at least one template field.",
        variant: "destructive",
      });
      return;
    }

    const templateFields: TemplateField[] = fields.map((f, i) => ({
      id: f.label.toLowerCase().replace(/\s+/g, '_'),
      label: f.label,
      placeholder: f.placeholder,
      required: f.required,
      type: f.type,
    }));

    onSubmit({
      title,
      description,
      author,
      category,
      scenario,
      content,
      fields: templateFields,
      isMarkdown,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setAuthor('');
    setCategory('other');
    setScenario('business');
    setContent('');
    setIsMarkdown(true);
    setFields([]);
    
    toast({
      title: "Template submitted!",
      description: "Your template has been added to the library.",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        data-semtag-id="submit.dialog"
        data-semtag-role="region"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Submit a Template</DialogTitle>
          <DialogDescription>
            Share your template with the community. Use {"{{fieldName}}"} syntax for dynamic fields.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Template Title <span className="text-destructive">*</span></Label>
              <Input
                id="title"
                placeholder="e.g., Weekly Status Report"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                data-semtag-id="submit.title"
                data-semtag-role="input"
                data-semtag-state="submit.title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author Name <span className="text-destructive">*</span></Label>
              <Input
                id="author"
                placeholder="Your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                data-semtag-id="submit.author"
                data-semtag-role="input"
                data-semtag-state="submit.author"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
            <Textarea
              id="description"
              placeholder="Briefly describe what this template is for..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-semtag-id="submit.description"
              data-semtag-role="input"
              data-semtag-state="submit.description"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as TemplateCategory)}>
                <SelectTrigger
                  data-semtag-id="submit.category"
                  data-semtag-role="select"
                  data-semtag-action="choose-category"
                  data-semtag-state="submit.category"
                  data-semtag-options={Object.entries(categoryLabels).map(([key, label]) => `${key}|${label}`).join(';')}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <SelectItem
                      key={key}
                      value={key}
                      data-semtag-id={`submit.category.option.${key}`}
                      data-semtag-role="option"
                    >{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Scenario</Label>
              <Select value={scenario} onValueChange={(v) => setScenario(v as TemplateScenario)}>
                <SelectTrigger
                  data-semtag-id="submit.scenario"
                  data-semtag-role="select"
                  data-semtag-action="choose-scenario"
                  data-semtag-state="submit.scenario"
                  data-semtag-options={Object.entries(scenarioLabels).map(([key, label]) => `${key}|${label}`).join(';')}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(scenarioLabels).map(([key, label]) => (
                    <SelectItem
                      key={key}
                      value={key}
                      data-semtag-id={`submit.scenario.option.${key}`}
                      data-semtag-role="option"
                    >{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Template Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content">Template Content <span className="text-destructive">*</span></Label>
              <div className="flex items-center gap-2">
                <Label htmlFor="markdown-toggle" className="text-sm text-muted-foreground">Markdown</Label>
                <Switch
                  id="markdown-toggle"
                  checked={isMarkdown}
                  onCheckedChange={setIsMarkdown}
                  data-semtag-id="submit.markdown"
                  data-semtag-role="toggle"
                  data-semtag-state="submit.isMarkdown"
                />
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 mb-2">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p>Use {"{{fieldName}}"} syntax for dynamic fields. Example: {"{{name}}"}, {"{{email}}"}</p>
              </div>
            </div>
            <Textarea
              id="content"
              placeholder={`# {{title}}\n\nHello {{name}},\n\nYour content here...`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
              data-semtag-id="submit.content"
              data-semtag-role="input"
              data-semtag-state="submit.content"
            />
          </div>

          <Separator />

          {/* Template Fields */}
          <div
            className="space-y-4"
            data-semtag-id="submit.fields"
            data-semtag-role="collection"
          >
            <Label>Define Template Fields</Label>

            <AnimatePresence>
              {fields.map((field, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 bg-secondary/50 p-3 rounded-lg"
                >
                  <div className="flex-1">
                    <p
                      className="font-medium text-sm"
                      data-semtag-id={`submit.fields.item.${field.label.toLowerCase().replace(/\s+/g, '_')}`}
                      data-semtag-role="observable"
                      data-semtag-state="submit.field.label"
                    >{field.label}</p>
                    <p className="text-xs text-muted-foreground">{field.type} • {field.required ? 'Required' : 'Optional'}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {`{{${field.label.toLowerCase().replace(/\s+/g, '_')}}}`}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeField(index)}
                    data-semtag-id={`submit.fields.item.${field.label.toLowerCase().replace(/\s+/g, '_')}.remove`}
                    data-semtag-role="action"
                    data-semtag-action="remove-field"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="bg-muted/30 border border-dashed border-border rounded-lg p-4 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  placeholder="Field label (e.g., Name)"
                  value={newField.label}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                  data-semtag-id="submit.new-field.label"
                  data-semtag-role="input"
                  data-semtag-state="submit.newField.label"
                />
                <Input
                  placeholder="Placeholder text"
                  value={newField.placeholder}
                  onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                  data-semtag-id="submit.new-field.placeholder"
                  data-semtag-role="input"
                  data-semtag-state="submit.newField.placeholder"
                />
              </div>
              <div className="flex items-center gap-4">
                <Select 
                  value={newField.type} 
                  onValueChange={(v) => setNewField({ ...newField, type: v as 'text' | 'textarea' | 'email' | 'date' })}
                >
                  <SelectTrigger
                    className="w-32"
                    data-semtag-id="submit.new-field.type"
                    data-semtag-role="select"
                    data-semtag-action="choose-field-type"
                    data-semtag-state="submit.newField.type"
                    data-semtag-options="text|Text;textarea|Textarea;email|Email;date|Date"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text" data-semtag-id="submit.new-field.type.option.text" data-semtag-role="option">Text</SelectItem>
                    <SelectItem value="textarea" data-semtag-id="submit.new-field.type.option.textarea" data-semtag-role="option">Textarea</SelectItem>
                    <SelectItem value="email" data-semtag-id="submit.new-field.type.option.email" data-semtag-role="option">Email</SelectItem>
                    <SelectItem value="date" data-semtag-id="submit.new-field.type.option.date" data-semtag-role="option">Date</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Switch
                    id="required-toggle"
                    checked={newField.required}
                    onCheckedChange={(checked) => setNewField({ ...newField, required: checked })}
                    data-semtag-id="submit.new-field.required"
                    data-semtag-role="toggle"
                    data-semtag-state="submit.newField.required"
                  />
                  <Label htmlFor="required-toggle" className="text-sm">Required</Label>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={addField}
                  className="ml-auto gap-1"
                  data-semtag-id="submit.new-field.add"
                  data-semtag-role="action"
                  data-semtag-action="add-field"
                >
                  <Plus className="w-4 h-4" />
                  Add Field
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            data-semtag-id="submit.cancel"
            data-semtag-role="action"
            data-semtag-action="cancel-submit"
          >Cancel</Button>
          <Button
            onClick={handleSubmit}
            className="gradient-warm border-0"
            data-semtag-id="submit.confirm"
            data-semtag-role="action"
            data-semtag-action="submit-template"
          >Submit Template</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
