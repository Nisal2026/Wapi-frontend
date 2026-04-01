/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/src/elements/ui/input";
import { useReactFlow } from "@xyflow/react";
import { Clock } from "lucide-react";
import { useState } from "react";
import { BaseNode } from "./BaseNode";
import { NodeField } from "./NodeField";

export function DelayNode({ data, id }: any) {
  const { setNodes } = useReactFlow();
  const [touched, setTouched] = useState(false);

  const updateNodeData = (field: string, value: any) => {
    if (!touched) setTouched(true);
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, [field]: value } }
          : node,
      ),
    );
  };

  const delayMs = data.delay_ms || 1000;

  return (
    <BaseNode
      id={id}
      title="Wait / Delay"
      icon={<Clock size={18} />}
      iconBgColor="bg-amber-100"
      iconColor="text-amber-600"
      borderColor="border-amber-200"
      handleColor="bg-amber-500!"
    >
      <NodeField label="Delay Duration (milliseconds)">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={delayMs}
            onFocus={() => setTouched(true)}
            onChange={(e) => updateNodeData("delay_ms", parseInt(e.target.value) || 0)}
            className="h-9 text-sm bg-(--input-color)"
            min={0}
            step={1000}
          />
          <span className="text-xs text-gray-500 font-medium">ms</span>
        </div>
        <div className="mt-1 text-[10px] text-gray-400">
          {(delayMs / 1000).toFixed(1)} seconds
        </div>
      </NodeField>
    </BaseNode>
  );
}
