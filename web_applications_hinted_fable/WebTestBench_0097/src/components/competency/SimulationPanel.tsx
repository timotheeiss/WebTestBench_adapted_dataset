import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Users, GraduationCap, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Competency, LEVEL_LABELS } from '@/data/competencyModels';

interface SimulationPanelProps {
  competencies: Competency[];
  onSimulate: (adjustments: Record<string, { levelDelta: number; weightDelta: number }>) => void;
  onReset: () => void;
}

type ScenarioType = 'recruitment' | 'training' | 'promotion';

interface ScenarioConfig {
  type: ScenarioType;
  name: string;
  icon: typeof Users;
  description: string;
  defaultAdjustments: {
    technical: { levelDelta: number; weightDelta: number };
    behavioral: { levelDelta: number; weightDelta: number };
    leadership: { levelDelta: number; weightDelta: number };
    domain: { levelDelta: number; weightDelta: number };
  };
}

const scenarios: ScenarioConfig[] = [
  {
    type: 'recruitment',
    name: 'Recruitment',
    icon: Users,
    description: 'Simulate candidate profiles and hiring decisions',
    defaultAdjustments: {
      technical: { levelDelta: -1, weightDelta: 0 },
      behavioral: { levelDelta: 0, weightDelta: 0.1 },
      leadership: { levelDelta: -2, weightDelta: -0.1 },
      domain: { levelDelta: -1, weightDelta: 0 },
    },
  },
  {
    type: 'training',
    name: 'Training',
    icon: GraduationCap,
    description: 'Model the impact of training programs',
    defaultAdjustments: {
      technical: { levelDelta: 1, weightDelta: 0 },
      behavioral: { levelDelta: 0, weightDelta: 0 },
      leadership: { levelDelta: 0, weightDelta: 0 },
      domain: { levelDelta: 1, weightDelta: 0 },
    },
  },
  {
    type: 'promotion',
    name: 'Promotion',
    icon: TrendingUp,
    description: 'Assess readiness for role advancement',
    defaultAdjustments: {
      technical: { levelDelta: 0, weightDelta: -0.05 },
      behavioral: { levelDelta: 0, weightDelta: 0.1 },
      leadership: { levelDelta: 0, weightDelta: 0.2 },
      domain: { levelDelta: 0, weightDelta: 0 },
    },
  },
];

const SimulationPanel = ({ competencies, onSimulate, onReset }: SimulationPanelProps) => {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('recruitment');
  const [adjustments, setAdjustments] = useState<Record<string, { levelDelta: number; weightDelta: number }>>({});
  const [isSimulating, setIsSimulating] = useState(false);

  const handleScenarioChange = (scenario: ScenarioType) => {
    setActiveScenario(scenario);
    const config = scenarios.find((s) => s.type === scenario);
    if (config) {
      const newAdjustments: Record<string, { levelDelta: number; weightDelta: number }> = {};
      competencies.forEach((comp) => {
        newAdjustments[comp.id] = config.defaultAdjustments[comp.category];
      });
      setAdjustments(newAdjustments);
    }
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    onSimulate(adjustments);
    setTimeout(() => setIsSimulating(false), 1000);
  };

  const handleReset = () => {
    setAdjustments({});
    onReset();
  };

  const currentScenario = scenarios.find((s) => s.type === activeScenario);

  return (
    <Card className="glass-card" data-semtag-id="simulation.panel" data-semtag-role="region">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <Play className="w-5 h-5 text-primary" />
          Scenario Simulation
        </CardTitle>
        <CardDescription>
          Simulate different HR scenarios and see their impact on the competency model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeScenario} onValueChange={(v) => handleScenarioChange(v as ScenarioType)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {scenarios.map((scenario) => (
              <TabsTrigger
                key={scenario.type}
                value={scenario.type}
                data-semtag-id={`simulation.scenario.${scenario.type}`}
                data-semtag-role="navigation"
                data-semtag-target={`simulation.${scenario.type}`}
                data-semtag-state="simulation.scenario"
                className="gap-2"
              >
                <scenario.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{scenario.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {scenarios.map((scenario) => (
            <TabsContent key={scenario.type} value={scenario.type}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={scenario.type}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <scenario.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4
                          data-semtag-id="simulation.active-scenario"
                          data-semtag-role="observable"
                          data-semtag-state="simulation.scenario"
                          className="font-semibold"
                        >
                          {scenario.name} Simulation
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{scenario.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4" data-semtag-id="simulation.adjustments" data-semtag-role="collection">
                    <h5 className="font-medium text-sm">Category Adjustments</h5>
                    {(['technical', 'behavioral', 'leadership', 'domain'] as const).map((category) => {
                      const categoryComps = competencies.filter((c) => c.category === category);
                      const adjustment = adjustments[categoryComps[0]?.id] || { levelDelta: 0, weightDelta: 0 };

                      return (
                        <div key={category} className="space-y-2 p-3 rounded-lg bg-muted/30">
                          <div className="flex items-center justify-between">
                            <Label
                              data-semtag-id={`simulation.adjustments.item.${category}`}
                              data-semtag-role="observable"
                              data-semtag-state="simulation.category"
                              className="capitalize font-medium"
                            >
                              {category}
                            </Label>
                            <Badge variant="outline" className="text-xs">
                              {categoryComps.length} competencies
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Level Change</span>
                                <span
                                  data-semtag-id={`simulation.adjustments.item.${category}.level-value`}
                                  data-semtag-role="observable"
                                  data-semtag-state={`simulation.${category}.levelDelta`}
                                  className={adjustment.levelDelta > 0 ? 'text-success' : adjustment.levelDelta < 0 ? 'text-destructive' : ''}
                                >
                                  {adjustment.levelDelta > 0 ? '+' : ''}{adjustment.levelDelta}
                                </span>
                              </div>
                              <Slider
                                data-semtag-id={`simulation.adjustments.item.${category}.level`}
                                data-semtag-role="slider"
                                data-semtag-state={`simulation.${category}.levelDelta`}
                                value={[adjustment.levelDelta + 2]}
                                onValueChange={([value]) => {
                                  const delta = value - 2;
                                  const newAdjustments = { ...adjustments };
                                  categoryComps.forEach((comp) => {
                                    newAdjustments[comp.id] = {
                                      ...newAdjustments[comp.id],
                                      levelDelta: delta,
                                    };
                                  });
                                  setAdjustments(newAdjustments);
                                }}
                                max={4}
                                min={0}
                                step={1}
                              />
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Weight Change</span>
                                <span
                                  data-semtag-id={`simulation.adjustments.item.${category}.weight-value`}
                                  data-semtag-role="observable"
                                  data-semtag-state={`simulation.${category}.weightDelta`}
                                  className={adjustment.weightDelta > 0 ? 'text-success' : adjustment.weightDelta < 0 ? 'text-destructive' : ''}
                                >
                                  {adjustment.weightDelta > 0 ? '+' : ''}{Math.round(adjustment.weightDelta * 100)}%
                                </span>
                              </div>
                              <Slider
                                data-semtag-id={`simulation.adjustments.item.${category}.weight`}
                                data-semtag-role="slider"
                                data-semtag-state={`simulation.${category}.weightDelta`}
                                value={[(adjustment.weightDelta + 0.3) * 100]}
                                onValueChange={([value]) => {
                                  const delta = value / 100 - 0.3;
                                  const newAdjustments = { ...adjustments };
                                  categoryComps.forEach((comp) => {
                                    newAdjustments[comp.id] = {
                                      ...newAdjustments[comp.id],
                                      weightDelta: delta,
                                    };
                                  });
                                  setAdjustments(newAdjustments);
                                }}
                                max={60}
                                min={0}
                                step={5}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleRunSimulation}
                      data-semtag-id="simulation.run"
                      data-semtag-role="action"
                      data-semtag-action="run-simulation"
                      className="flex-1"
                      disabled={isSimulating}
                    >
                      {isSimulating ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Play className="w-4 h-4 mr-2" />
                        </motion.div>
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      Run Simulation
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      data-semtag-id="simulation.reset"
                      data-semtag-role="action"
                      data-semtag-action="reset-model"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SimulationPanel;
