import { useState, useMemo } from 'react';
import { Template, categoryLabels, scenarioLabels } from '@/data/templates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Copy, Check, AlertCircle, Heart, User, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useToast } from '@/hooks/use-toast';

interface TemplatePreviewProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

// Validation: no special characters that could break formatting
const SPECIAL_CHARS_REGEX = /[<>{}[\]\\|`]/;

function validateInput(value: string): string | null {
  if (SPECIAL_CHARS_REGEX.test(value)) {
    return 'Special characters like < > { } [ ] \\ | ` are not allowed';
  }
  return null;
}

export function TemplatePreview({ template, isOpen, onClose, isFavorite, onToggleFavorite }: TemplatePreviewProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    
    const error = validateInput(value);
    if (error) {
      setErrors(prev => ({ ...prev, [fieldId]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const requiredFieldsMissing = useMemo(() => {
    if (!template) return [];
    return template.fields
      .filter(f => f.required && (!formData[f.id] || formData[f.id].trim() === ''))
      .map(f => f.label);
  }, [template, formData]);

  const hasValidationErrors = Object.keys(errors).length > 0;
  const canGenerate = requiredFieldsMissing.length === 0 && !hasValidationErrors;

  const generatedContent = useMemo(() => {
    if (!template || !canGenerate) return '';
    
    let content = template.content;
    template.fields.forEach(field => {
      const value = formData[field.id] || '';
      content = content.replace(new RegExp(`\\{\\{${field.id}\\}\\}`, 'g'), value);
    });
    return content;
  }, [template, formData, canGenerate]);

  const handleCopy = async () => {
    if (!generatedContent) return;
    
    await navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "The generated content has been copied.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setFormData({});
    setErrors({});
    onClose();
  };

  if (!template) return null;

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent
        className="w-full sm:max-w-2xl lg:max-w-4xl overflow-y-auto p-0"
        data-semtag-id="preview.panel"
        data-semtag-role="region"
      >
        <div className="sticky top-0 bg-card border-b border-border z-10 p-6">
          <SheetHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary">{categoryLabels[template.category]}</Badge>
                  <Badge variant="outline">{scenarioLabels[template.scenario]}</Badge>
                </div>
                <SheetTitle
                  className="font-display text-2xl"
                  data-semtag-id="preview.title"
                  data-semtag-role="observable"
                  data-semtag-state="template.title"
                >{template.title}</SheetTitle>
                <p className="text-muted-foreground mt-2">{template.description}</p>
                
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{template.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{template.popularity.toLocaleString()} uses</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleFavorite}
                  className={isFavorite ? 'text-primary' : ''}
                  data-semtag-id="preview.favorite"
                  data-semtag-role="toggle"
                  data-semtag-action="toggle-favorite"
                  data-semtag-state={isFavorite ? 'on' : 'off'}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  data-semtag-id="preview.close"
                  data-semtag-role="action"
                  data-semtag-action="close-preview"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </SheetHeader>
        </div>

        <div className="p-6">
          <Tabs defaultValue="fill" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="fill"
                data-semtag-id="preview.tab.fill"
                data-semtag-role="navigation"
                data-semtag-target="preview.fill-form"
              >Fill Template</TabsTrigger>
              <TabsTrigger
                value="preview"
                disabled={!canGenerate}
                data-semtag-id="preview.tab.result"
                data-semtag-role="navigation"
                data-semtag-target="preview.result"
              >Preview Result</TabsTrigger>
            </TabsList>

            <TabsContent value="fill" className="space-y-4">
              <AnimatePresence>
                {requiredFieldsMissing.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-warning/10 border border-warning/30 rounded-lg p-4"
                    data-semtag-id="preview.missing-fields"
                    data-semtag-role="observable"
                    data-semtag-state="preview.missingFields"
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Required fields missing</p>
                        <p className="text-sm text-muted-foreground">
                          Please fill in: {requiredFieldsMissing.join(', ')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className="grid gap-4"
                data-semtag-id="preview.fields"
                data-semtag-role="collection"
              >
                {template.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id} className="flex items-center gap-2">
                      {field.label}
                      {field.required && <span className="text-destructive">*</span>}
                    </Label>
                    {field.type === 'textarea' ? (
                      <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className={`min-h-[100px] ${errors[field.id] ? 'border-destructive' : ''}`}
                        data-semtag-id={`preview.fields.item.${field.id}`}
                        data-semtag-role="input"
                        data-semtag-state={`preview.field.${field.id}`}
                      />
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className={errors[field.id] ? 'border-destructive' : ''}
                        data-semtag-id={`preview.fields.item.${field.id}`}
                        data-semtag-role="input"
                        data-semtag-state={`preview.field.${field.id}`}
                      />
                    )}
                    {errors[field.id] && (
                      <p
                        className="text-sm text-destructive flex items-center gap-1"
                        data-semtag-id={`preview.fields.item.${field.id}.error`}
                        data-semtag-role="observable"
                        data-semtag-state={`preview.field.${field.id}.error`}
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors[field.id]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <div className="flex justify-end">
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="gap-2"
                  disabled={!generatedContent}
                  data-semtag-id="preview.copy"
                  data-semtag-role="action"
                  data-semtag-action="copy-result"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </Button>
              </div>

              <Separator />

              <div
                className="bg-muted/50 rounded-lg p-6 min-h-[300px]"
                data-semtag-id="preview.result"
                data-semtag-role="observable"
                data-semtag-state="preview.generatedContent"
              >
                {template.isMarkdown ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown>{generatedContent}</ReactMarkdown>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap text-sm font-body">{generatedContent}</pre>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
