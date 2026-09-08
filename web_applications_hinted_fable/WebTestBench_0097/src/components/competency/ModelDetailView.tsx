import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import CompetencyGraph from '@/components/competency/CompetencyGraph';
import MetricsPanel from '@/components/competency/MetricsPanel';
import SimulationPanel from '@/components/competency/SimulationPanel';
import TemplateLibrary from '@/components/competency/TemplateLibrary';
import { CompetencyModel, Competency } from '@/data/competencyModels';

interface ModelDetailViewProps {
  model: CompetencyModel;
  onBack: () => void;
}

const ModelDetailView = ({ model: initialModel, onBack }: ModelDetailViewProps) => {
  const [model, setModel] = useState<CompetencyModel>(initialModel);
  const [originalModel] = useState<CompetencyModel>(initialModel);
  const { toast } = useToast();

  const handleCompetencyUpdate = useCallback((competencies: Competency[]) => {
    setModel((prev) => ({ ...prev, competencies }));
  }, []);

  // Calculate critical path (simplified: highest weight competencies with dependencies)
  const criticalPath = useMemo(() => {
    const enabledComps = model.competencies.filter((c) => c.enabled);
    const sorted = [...enabledComps].sort((a, b) => b.weight - a.weight);
    const criticalIds = new Set<string>();

    // Add top weighted competencies
    sorted.slice(0, 3).forEach((c) => {
      criticalIds.add(c.id);
      // Add their dependencies
      model.edges
        .filter((e) => e.target === c.id && e.type === 'dependency')
        .forEach((e) => criticalIds.add(e.source));
    });

    return Array.from(criticalIds);
  }, [model.competencies, model.edges]);

  // Calculate gap competencies (level below 3 with high weight)
  const gapCompetencies = useMemo(() => {
    return model.competencies
      .filter((c) => c.enabled && c.level < 3 && c.weight > 0.6)
      .map((c) => c.id);
  }, [model.competencies]);

  // Calculate coverage score
  const coverage = useMemo(() => {
    const enabledComps = model.competencies.filter((c) => c.enabled);
    if (enabledComps.length === 0) return 0;

    const totalPossible = enabledComps.length * 5; // Max level is 5
    const totalActual = enabledComps.reduce((acc, c) => acc + c.level * c.weight, 0);
    const maxPossibleWeighted = enabledComps.reduce((acc, c) => acc + 5 * c.weight, 0);

    return (totalActual / maxPossibleWeighted) * 100;
  }, [model.competencies]);

  const handleSimulate = useCallback(
    (adjustments: Record<string, { levelDelta: number; weightDelta: number }>) => {
      const updatedCompetencies = model.competencies.map((comp) => {
        const adjustment = adjustments[comp.id];
        if (!adjustment) return comp;

        return {
          ...comp,
          level: Math.max(1, Math.min(5, comp.level + adjustment.levelDelta)),
          weight: Math.max(0.1, Math.min(1, comp.weight + adjustment.weightDelta)),
        };
      });

      setModel((prev) => ({ ...prev, competencies: updatedCompetencies }));
      toast({
        title: 'Simulation Applied',
        description: 'Competency levels and weights have been adjusted based on the scenario.',
      });
    },
    [model.competencies, toast]
  );

  const handleReset = useCallback(() => {
    setModel(originalModel);
    toast({
      title: 'Model Reset',
      description: 'All changes have been reverted to the original state.',
    });
  }, [originalModel, toast]);

  const handleApplyTemplate = useCallback(
    (template: CompetencyModel) => {
      setModel(template);
      toast({
        title: 'Template Applied',
        description: `Applied "${template.jobTitle}" template successfully.`,
      });
    },
    [toast]
  );

  const handleSaveAsTemplate = useCallback(() => {
    toast({
      title: 'Template Saved',
      description: 'Current model configuration has been saved as a template.',
    });
  }, [toast]);

  const handleSave = useCallback(() => {
    toast({
      title: 'Model Saved',
      description: 'Your changes have been saved successfully.',
    });
  }, [toast]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            data-semtag-id="model.back"
            data-semtag-role="navigation"
            data-semtag-target="models.page"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1
              data-semtag-id="model.title"
              data-semtag-role="observable"
              data-semtag-state="model.jobTitle"
              className="text-2xl font-bold font-display"
            >
              {model.jobTitle}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="secondary"
                data-semtag-id="model.department"
                data-semtag-role="observable"
                data-semtag-state="model.department"
              >
                {model.department}
              </Badge>
              <span
                data-semtag-id="model.competency-count"
                data-semtag-role="observable"
                data-semtag-state="model.competencyCount"
                className="text-sm text-muted-foreground"
              >
                {model.competencies.length} competencies
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            data-semtag-id="model.export"
            data-semtag-role="action"
            data-semtag-action="export-model"
          >
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            data-semtag-id="model.share"
            data-semtag-role="action"
            data-semtag-action="share-model"
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            data-semtag-id="model.save"
            data-semtag-role="action"
            data-semtag-action="save-model"
          >
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      <Separator />

      {/* Metrics */}
      <MetricsPanel
        competencies={model.competencies}
        criticalPath={criticalPath}
        gapCompetencies={gapCompetencies}
        coverage={coverage}
      />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Graph */}
        <div className="lg:col-span-2">
          <CompetencyGraph
            model={model}
            onCompetencyUpdate={handleCompetencyUpdate}
            criticalPath={criticalPath}
            gapCompetencies={gapCompetencies}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <SimulationPanel
            competencies={model.competencies}
            onSimulate={handleSimulate}
            onReset={handleReset}
          />
          <TemplateLibrary
            currentModelId={model.id}
            onApplyTemplate={handleApplyTemplate}
            onSaveAsTemplate={handleSaveAsTemplate}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ModelDetailView;
