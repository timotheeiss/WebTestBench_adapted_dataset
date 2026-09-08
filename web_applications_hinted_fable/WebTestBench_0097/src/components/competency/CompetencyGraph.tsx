import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CompetencyModel, Competency } from '@/data/competencyModels';
import CompetencyNode from './CompetencyNode';

interface CompetencyGraphProps {
  model: CompetencyModel;
  onCompetencyUpdate: (competencies: Competency[]) => void;
  criticalPath: string[];
  gapCompetencies: string[];
}

const nodeTypes = {
  competency: CompetencyNode,
};

const CompetencyGraph = ({
  model,
  onCompetencyUpdate,
  criticalPath,
  gapCompetencies,
}: CompetencyGraphProps) => {
  const handleLevelChange = useCallback((id: string, level: number) => {
    const updated = model.competencies.map((c) =>
      c.id === id ? { ...c, level } : c
    );
    onCompetencyUpdate(updated);
  }, [model.competencies, onCompetencyUpdate]);

  const handleWeightChange = useCallback((id: string, weight: number) => {
    const updated = model.competencies.map((c) =>
      c.id === id ? { ...c, weight } : c
    );
    onCompetencyUpdate(updated);
  }, [model.competencies, onCompetencyUpdate]);

  const handleToggleEnabled = useCallback((id: string) => {
    const updated = model.competencies.map((c) =>
      c.id === id ? { ...c, enabled: !c.enabled } : c
    );
    onCompetencyUpdate(updated);
  }, [model.competencies, onCompetencyUpdate]);

  const initialNodes: Node[] = useMemo(() => {
    const categoryGroups: Record<string, Competency[]> = {};
    model.competencies.forEach((c) => {
      if (!categoryGroups[c.category]) categoryGroups[c.category] = [];
      categoryGroups[c.category].push(c);
    });

    const nodes: Node[] = [];
    const categories = Object.keys(categoryGroups);
    const categorySpacing = 300;
    const nodeSpacing = 200;

    categories.forEach((category, catIndex) => {
      const comps = categoryGroups[category];
      comps.forEach((comp, compIndex) => {
        nodes.push({
          id: comp.id,
          type: 'competency',
          position: {
            x: catIndex * categorySpacing,
            y: compIndex * nodeSpacing,
          },
          data: {
            competency: comp,
            onLevelChange: handleLevelChange,
            onWeightChange: handleWeightChange,
            onToggleEnabled: handleToggleEnabled,
            isSelected: false,
            isCritical: criticalPath.includes(comp.id),
            isGap: gapCompetencies.includes(comp.id),
          },
        });
      });
    });

    return nodes;
  }, [model.competencies, criticalPath, gapCompetencies, handleLevelChange, handleWeightChange, handleToggleEnabled]);

  const initialEdges: Edge[] = useMemo(() => {
    return model.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      animated: edge.type === 'reinforcement',
      style: {
        stroke: criticalPath.includes(edge.source) && criticalPath.includes(edge.target)
          ? 'hsl(0, 72%, 51%)'
          : edge.type === 'dependency'
          ? 'hsl(199, 89%, 48%)'
          : 'hsl(173, 58%, 39%)',
        strokeWidth: Math.max(1, edge.weight * 3),
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: criticalPath.includes(edge.source) && criticalPath.includes(edge.target)
          ? 'hsl(0, 72%, 51%)'
          : edge.type === 'dependency'
          ? 'hsl(199, 89%, 48%)'
          : 'hsl(173, 58%, 39%)',
      },
      label: `${Math.round(edge.weight * 100)}%`,
      labelStyle: { fontSize: 10, fill: 'hsl(var(--muted-foreground))' },
    }));
  }, [model.edges, criticalPath]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div
      data-semtag-id="model.graph"
      data-semtag-role="collection"
      className="w-full h-[600px] bg-secondary/30 rounded-xl border border-border overflow-hidden"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background color="hsl(var(--border))" gap={20} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            const data = node.data as { isCritical: boolean; isGap: boolean };
            if (data.isCritical) return 'hsl(0, 72%, 51%)';
            if (data.isGap) return 'hsl(38, 92%, 50%)';
            return 'hsl(199, 89%, 48%)';
          }}
          maskColor="hsl(var(--background) / 0.8)"
        />
      </ReactFlow>
    </div>
  );
};

export default CompetencyGraph;
