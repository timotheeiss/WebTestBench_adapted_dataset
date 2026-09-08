import { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import { documents, getDocumentById, ModuleType, moduleInfo } from '@/data/documents';
import { useAppStore } from '@/store/appStore';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  module: ModuleType;
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
}

const MODULE_COLORS: Record<ModuleType, string> = {
  api: 'hsl(187, 85%, 53%)',
  auth: 'hsl(271, 81%, 56%)',
  data: 'hsl(142, 71%, 45%)',
  ui: 'hsl(38, 92%, 50%)',
  core: 'hsl(346, 77%, 50%)'
};

export function KnowledgeGraph() {
  const { graphState, setGraphZoom, setGraphPan, setSelectedDocumentId, expandSection, showToast, selectedDocumentId } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Generate node positions in a circular layout grouped by module
  const { nodes, edges } = useMemo(() => {
    const moduleGroups = new Map<ModuleType, typeof documents>();
    documents.forEach(doc => {
      const group = moduleGroups.get(doc.module) || [];
      group.push(doc);
      moduleGroups.set(doc.module, group);
    });

    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const moduleRadius = Math.min(dimensions.width, dimensions.height) * 0.35;
    const nodeRadius = 60;

    const nodes: Node[] = [];
    const moduleTypes = Array.from(moduleGroups.keys());
    
    moduleTypes.forEach((module, moduleIndex) => {
      const moduleAngle = (moduleIndex / moduleTypes.length) * 2 * Math.PI - Math.PI / 2;
      const moduleCenterX = centerX + Math.cos(moduleAngle) * moduleRadius;
      const moduleCenterY = centerY + Math.sin(moduleAngle) * moduleRadius;

      const docs = moduleGroups.get(module) || [];
      docs.forEach((doc, docIndex) => {
        const docAngle = (docIndex / docs.length) * 2 * Math.PI;
        const docRadius = Math.min(nodeRadius * docs.length * 0.4, 80);
        
        nodes.push({
          id: doc.id,
          label: doc.title,
          module: doc.module,
          x: moduleCenterX + Math.cos(docAngle) * docRadius,
          y: moduleCenterY + Math.sin(docAngle) * docRadius
        });
      });
    });

    const edges: Edge[] = [];
    documents.forEach(doc => {
      doc.relatedDocs.forEach(relatedId => {
        // Avoid duplicate edges
        if (!edges.some(e => 
          (e.from === doc.id && e.to === relatedId) || 
          (e.from === relatedId && e.to === doc.id)
        )) {
          edges.push({ from: doc.id, to: relatedId });
        }
      });
    });

    return { nodes, edges };
  }, [dimensions]);

  const handleNodeClick = useCallback((nodeId: string) => {
    const doc = getDocumentById(nodeId);
    if (!doc) {
      showToast('Document not found', 'error');
      return;
    }
    setSelectedDocumentId(nodeId);
    if (doc.sections.length > 0) {
      expandSection(nodeId, doc.sections[0].id);
    }
  }, [setSelectedDocumentId, expandSection, showToast]);

  const handleZoomIn = () => setGraphZoom(Math.min(graphState.zoom + 0.2, 3));
  const handleZoomOut = () => setGraphZoom(Math.max(graphState.zoom - 0.2, 0.3));
  const handleReset = () => {
    setGraphZoom(1);
    setGraphPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current?.querySelector('svg')) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX - graphState.pan.x, y: e.clientY - graphState.pan.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setGraphPan({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setGraphZoom(Math.max(0.3, Math.min(3, graphState.zoom + delta)));
  };

  return (
    <div ref={containerRef} className="h-full relative overflow-hidden bg-background">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          data-semtag-id="graph.zoom-in"
          data-semtag-role="action"
          data-semtag-action="zoom-in"
          data-semtag-state="graph.zoom"
          onClick={handleZoomIn}
          className="p-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
          title="Zoom In"
        >
          <ZoomIn size={18} className="text-foreground" />
        </button>
        <button
          data-semtag-id="graph.zoom-out"
          data-semtag-role="action"
          data-semtag-action="zoom-out"
          data-semtag-state="graph.zoom"
          onClick={handleZoomOut}
          className="p-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
          title="Zoom Out"
        >
          <ZoomOut size={18} className="text-foreground" />
        </button>
        <button
          data-semtag-id="graph.reset"
          data-semtag-role="action"
          data-semtag-action="reset-view"
          data-semtag-state="graph.zoom"
          onClick={handleReset}
          className="p-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
          title="Reset View"
        >
          <RotateCcw size={18} className="text-foreground" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
        <div className="text-xs text-muted-foreground mb-2 font-medium">Modules</div>
        <div className="space-y-1.5">
          {Object.entries(moduleInfo).map(([key, info]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: MODULE_COLORS[key as ModuleType] }}
              />
              <span className="text-xs text-foreground">{info.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 right-4 z-10 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-1.5">
        <span
          data-semtag-id="graph.zoom"
          data-semtag-role="observable"
          data-semtag-state="graph.zoom"
          className="text-xs text-muted-foreground"
        >
          {Math.round(graphState.zoom * 100)}%
        </span>
      </div>

      {/* Graph SVG */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <g
          data-semtag-id="graph.nodes"
          data-semtag-role="collection"
          transform={`translate(${graphState.pan.x}, ${graphState.pan.y}) scale(${graphState.zoom})`}
        >
          {/* Edges */}
          {edges.map((edge, i) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            return (
              <line
                key={`edge-${i}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="hsl(222, 30%, 25%)"
                strokeWidth={1.5}
                strokeOpacity={0.5}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isSelected = selectedDocumentId === node.id;
            const color = MODULE_COLORS[node.module];
            
            return (
              <g
                key={node.id}
                data-semtag-id={`graph.nodes.item.${node.id}`}
                data-semtag-role="navigation"
                data-semtag-target="document.detail"
                data-semtag-state={isSelected ? 'selected' : undefined}
                className="graph-node"
                onClick={() => handleNodeClick(node.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Glow effect for selected node */}
                {isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={28}
                    fill={color}
                    opacity={0.3}
                    className="animate-pulse-glow"
                  />
                )}
                
                {/* Node circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={20}
                  fill="hsl(222, 47%, 12%)"
                  stroke={color}
                  strokeWidth={isSelected ? 3 : 2}
                />
                
                {/* Module indicator */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={8}
                  fill={color}
                />

                {/* Label */}
                <foreignObject
                  x={node.x - 50}
                  y={node.y + 25}
                  width={100}
                  height={40}
                >
                  <div className="text-center">
                    <span className="text-[10px] text-foreground font-medium leading-tight block px-1 truncate">
                      {node.label.length > 20 ? node.label.slice(0, 20) + '...' : node.label}
                    </span>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
