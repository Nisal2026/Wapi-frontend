"use client";

import { Button } from "@/src/elements/ui/button";
import { BaseEdge, EdgeLabelRenderer, getBezierPath, useReactFlow, type EdgeProps } from "@xyflow/react";
import { Trash2 } from "lucide-react";

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ ...style, strokeWidth: 2, stroke: '#64748b' }} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <Button
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-100 bg-white shadow-sm transition-all hover:bg-red-50 hover:text-red-600 text-red-400 dark:bg-(--card-color) dark:border-(--card-border-color) dark:hover:bg-(--table-hover)"
            onClick={onEdgeClick}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
