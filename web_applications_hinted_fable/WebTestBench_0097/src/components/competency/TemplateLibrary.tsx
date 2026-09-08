import { motion } from 'framer-motion';
import { Copy, Check, FileText, Plus } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { competencyModels, CompetencyModel } from '@/data/competencyModels';

interface TemplateLibraryProps {
  currentModelId: string;
  onApplyTemplate: (model: CompetencyModel) => void;
  onSaveAsTemplate: () => void;
}

const TemplateLibrary = ({ currentModelId, onApplyTemplate, onSaveAsTemplate }: TemplateLibraryProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const templates = competencyModels.filter((m) => m.isTemplate);

  const handleApply = (model: CompetencyModel) => {
    onApplyTemplate(model);
    setCopiedId(model.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 font-display">
              <FileText className="w-5 h-5 text-primary" />
              Template Library
            </CardTitle>
            <CardDescription className="mt-1">
              Quick-start with pre-built competency models
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onSaveAsTemplate}
            data-semtag-id="templates.save-current"
            data-semtag-role="action"
            data-semtag-action="save-as-template"
          >
            <Plus className="w-4 h-4 mr-1" />
            Save Current
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3" data-semtag-id="templates.list" data-semtag-role="collection">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  className={`p-4 rounded-lg border transition-all ${
                    template.id === currentModelId
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4
                          data-semtag-id={`templates.list.item.${template.id}`}
                          data-semtag-role="observable"
                          data-semtag-state="template.jobTitle"
                          className="font-semibold text-sm truncate"
                        >
                          {template.jobTitle}
                        </h4>
                        {template.id === currentModelId && (
                          <Badge
                            variant="secondary"
                            data-semtag-id={`templates.list.item.${template.id}.current`}
                            data-semtag-role="observable"
                            data-semtag-state="template.current"
                            className="text-xs"
                          >
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{template.department}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {template.competencies.length} competencies
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {template.edges.length} connections
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={copiedId === template.id ? 'default' : 'ghost'}
                      onClick={() => handleApply(template)}
                      disabled={template.id === currentModelId}
                      data-semtag-id={`templates.list.item.${template.id}.apply`}
                      data-semtag-role="action"
                      data-semtag-action="apply-template"
                      className="shrink-0"
                    >
                      {copiedId === template.id ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Applied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          Apply
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {template.keywords.slice(0, 4).map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="text-xs capitalize">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TemplateLibrary;
