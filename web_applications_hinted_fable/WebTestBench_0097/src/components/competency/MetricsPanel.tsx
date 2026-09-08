import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, TrendingUp, AlertCircle, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Competency, LEVEL_LABELS } from '@/data/competencyModels';

interface MetricsPanelProps {
  competencies: Competency[];
  criticalPath: string[];
  gapCompetencies: string[];
  coverage: number;
}

const MetricsPanel = ({
  competencies,
  criticalPath,
  gapCompetencies,
  coverage,
}: MetricsPanelProps) => {
  const enabledCompetencies = competencies.filter((c) => c.enabled);
  const avgLevel = enabledCompetencies.length > 0
    ? enabledCompetencies.reduce((acc, c) => acc + c.level, 0) / enabledCompetencies.length
    : 0;
  const avgWeight = enabledCompetencies.length > 0
    ? enabledCompetencies.reduce((acc, c) => acc + c.weight, 0) / enabledCompetencies.length
    : 0;

  const riskScore = gapCompetencies.length * 20;
  const isHighRisk = riskScore > 40;

  return (
    <div className="space-y-4" data-semtag-id="model.metrics" data-semtag-role="region">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="metric-card">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Coverage
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="flex items-end gap-2">
                <span
                  data-semtag-id="metrics.coverage"
                  data-semtag-role="observable"
                  data-semtag-state="metrics.coverage"
                  className="text-2xl font-bold font-display"
                >
                  {Math.round(coverage)}%
                </span>
                <span className="text-xs text-muted-foreground mb-1">of model</span>
              </div>
              <Progress value={coverage} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="metric-card">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-success" />
                Avg Level
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="flex items-end gap-2">
                <span
                  data-semtag-id="metrics.avg-level"
                  data-semtag-role="observable"
                  data-semtag-state="metrics.avgLevel"
                  className="text-2xl font-bold font-display"
                >
                  {avgLevel.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground mb-1">{LEVEL_LABELS[Math.round(avgLevel) - 1] || 'N/A'}</span>
              </div>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`flex-1 h-2 rounded-full ${
                      level <= Math.round(avgLevel) ? 'bg-success' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="metric-card">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-warning" />
                Critical Path
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="flex items-end gap-2">
                <span
                  data-semtag-id="metrics.critical-path.count"
                  data-semtag-role="observable"
                  data-semtag-state="metrics.criticalPathCount"
                  className="text-2xl font-bold font-display"
                >
                  {criticalPath.length}
                </span>
                <span className="text-xs text-muted-foreground mb-1">competencies</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {criticalPath.slice(0, 3).map((id) => {
                  const comp = competencies.find((c) => c.id === id);
                  return comp ? (
                    <Badge key={id} variant="secondary" className="text-xs truncate max-w-[80px]">
                      {comp.name}
                    </Badge>
                  ) : null;
                })}
                {criticalPath.length > 3 && (
                  <Badge variant="outline" className="text-xs">+{criticalPath.length - 3}</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className={`metric-card ${isHighRisk ? 'border-destructive/50' : ''}`}>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertCircle className={`w-4 h-4 ${isHighRisk ? 'text-destructive' : 'text-muted-foreground'}`} />
                Risk Gaps
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="flex items-end gap-2">
                <span
                  data-semtag-id="metrics.gaps.count"
                  data-semtag-role="observable"
                  data-semtag-state="metrics.gapCount"
                  className={`text-2xl font-bold font-display ${isHighRisk ? 'text-destructive' : ''}`}
                >
                  {gapCompetencies.length}
                </span>
                <span className="text-xs text-muted-foreground mb-1">identified</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {gapCompetencies.slice(0, 3).map((id) => {
                  const comp = competencies.find((c) => c.id === id);
                  return comp ? (
                    <Badge key={id} variant="destructive" className="text-xs truncate max-w-[80px]">
                      {comp.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {gapCompetencies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Alert
            variant={isHighRisk ? 'destructive' : 'default'}
            data-semtag-id="metrics.gap-alert"
            data-semtag-role="observable"
            data-semtag-state="metrics.gapAlert"
            className="border-warning/50 bg-warning/5"
          >
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertTitle className="text-warning">Competency Gap Alert</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              {gapCompetencies.length} competenc{gapCompetencies.length > 1 ? 'ies' : 'y'} below recommended level:{' '}
              {gapCompetencies.map((id) => competencies.find((c) => c.id === id)?.name).join(', ')}.
              Consider increasing training focus or adjusting expectations.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {coverage >= 80 && gapCompetencies.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Alert
            data-semtag-id="metrics.healthy-alert"
            data-semtag-role="observable"
            data-semtag-state="metrics.healthAlert"
            className="border-success/50 bg-success/5"
          >
            <CheckCircle className="h-4 w-4 text-success" />
            <AlertTitle className="text-success">Model Healthy</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              All competencies are at or above recommended levels with {Math.round(coverage)}% coverage.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </div>
  );
};

export default MetricsPanel;
