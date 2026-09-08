import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { motion } from 'framer-motion';
import { Competency, LEVEL_LABELS, CATEGORY_COLORS } from '@/data/competencyModels';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface CompetencyNodeData {
  competency: Competency;
  onLevelChange: (id: string, level: number) => void;
  onWeightChange: (id: string, weight: number) => void;
  onToggleEnabled: (id: string) => void;
  isSelected: boolean;
  isCritical: boolean;
  isGap: boolean;
}

const CompetencyNode = memo(({ data }: NodeProps<CompetencyNodeData>) => {
  const { competency, onLevelChange, onWeightChange, onToggleEnabled, isSelected, isCritical, isGap } = data;

  const getCategoryStyle = () => {
    const color = CATEGORY_COLORS[competency.category];
    return { borderColor: color, backgroundColor: competency.enabled ? undefined : 'hsl(var(--muted))' };
  };

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-level-novice',
      'bg-level-beginner',
      'bg-level-intermediate',
      'bg-level-advanced',
      'bg-level-expert',
    ];
    return colors[level - 1] || colors[0];
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        'competency-node bg-card p-4 min-w-[220px]',
        !competency.enabled && 'opacity-50',
        isSelected && 'ring-2 ring-primary ring-offset-2',
        isCritical && 'border-node-critical',
        isGap && 'border-node-warning'
      )}
      style={getCategoryStyle()}
    >
      <Handle type="target" position={Position.Top} className="!bg-primary" />
      
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h4
              data-semtag-id={`model.graph.item.${competency.id}`}
              data-semtag-role="observable"
              data-semtag-state="competency.name"
              className="font-semibold text-sm text-foreground leading-tight"
            >
              {competency.name}
            </h4>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{competency.description}</p>
          </div>
          <Switch
            checked={competency.enabled}
            onCheckedChange={() => onToggleEnabled(competency.id)}
            data-semtag-id={`model.graph.item.${competency.id}.enabled`}
            data-semtag-role="toggle"
            data-semtag-action="toggle-competency"
            data-semtag-state="competency.enabled"
            className="scale-75"
          />
        </div>

        <div className="flex items-center gap-2">
          <Badge 
            variant="secondary" 
            className="text-xs capitalize"
            style={{ backgroundColor: `${CATEGORY_COLORS[competency.category]}20`, color: CATEGORY_COLORS[competency.category] }}
          >
            {competency.category}
          </Badge>
          {isCritical && (
            <Badge variant="destructive" className="text-xs">Critical</Badge>
          )}
          {isGap && (
            <Badge className="text-xs bg-warning text-warning-foreground">Gap</Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Level</span>
            <span
              data-semtag-id={`model.graph.item.${competency.id}.level-value`}
              data-semtag-role="observable"
              data-semtag-state="competency.level"
              className="font-medium"
            >
              {LEVEL_LABELS[competency.level - 1]}
            </span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => onLevelChange(competency.id, level)}
                data-semtag-id={`model.graph.item.${competency.id}.set-level-${level}`}
                data-semtag-role="action"
                data-semtag-action="set-competency-level"
                data-semtag-state="competency.level"
                className={cn(
                  'flex-1 h-2 rounded-full transition-all',
                  level <= competency.level ? getLevelColor(competency.level) : 'bg-muted'
                )}
              />
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Weight</span>
            <span
              data-semtag-id={`model.graph.item.${competency.id}.weight-value`}
              data-semtag-role="observable"
              data-semtag-state="competency.weight"
              className="font-medium"
            >
              {Math.round(competency.weight * 100)}%
            </span>
          </div>
          <Slider
            value={[competency.weight * 100]}
            onValueChange={([value]) => onWeightChange(competency.id, value / 100)}
            data-semtag-id={`model.graph.item.${competency.id}.weight`}
            data-semtag-role="slider"
            data-semtag-state="competency.weight"
            max={100}
            min={10}
            step={5}
            className="w-full"
          />
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    </motion.div>
  );
});

CompetencyNode.displayName = 'CompetencyNode';

export default CompetencyNode;
