/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { AlertCircle, X, Zap } from "lucide-react";
import { useState } from "react";

export function CallToActionNode({ data, id }: any) {
  const { deleteElements, setNodes } = useReactFlow();
  const [touched, setTouched] = useState(false);

  const errors: string[] = [];
  if (touched || data.forceValidation) {
    if (!data.valueText || !data.valueText.trim()) errors.push("Value text is required");
    if (!data.buttonLink || !data.buttonLink.trim()) errors.push("Valid button link is required");
  }

  const updateNodeData = (field: string, value: any) => {
    if (!touched) setTouched(true);
    setNodes((nds) => nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, [field]: value } } : node)));
  };

  return (
    <div className={`relative w-80 rounded-lg border bg-white dark:bg-(--card-color) dark:shadow-(--dark-sidebar) dark:border-(--card-border-color) p-4 shadow-lg transition-all ${errors.length > 0 ? "border-red-200 shadow-red-50" : "border-gray-200"}`}>
      <Handle type="target" position={Position.Left} className="w-3! h-3! bg-emerald-500! border-2! border-white! dark:border-(--card-border-color)! shadow-sm" />

      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100 text-emerald-600">
          <Zap size={18} />
        </div>
        <div className="text-[15px] font-semibold">Call To Action</div>
        <Button onClick={() => deleteElements({ nodes: [{ id }] })} size="icon" variant="ghost" className="ml-auto h-6 w-6 rounded-full text-gray-400 hover:text-red-500">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {errors.length > 0 && (
        <div className="mb-4 rounded-lg border border-red-100 bg-red-50 p-3 dark:bg-(--dark-sidebar) dark:border-(--card-border-color)">
          <div className="flex items-start gap-2 text-red-800">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-bold mb-1">Please fix the following issues:</div>
              <ul className="text-[11px] list-disc list-inside space-y-0.5 opacity-90">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-400">Header (Optional)</Label>
          <Input value={data.header || ""} onFocus={() => setTouched(true)} onChange={(e) => updateNodeData("header", e.target.value)} placeholder="Enter header text (optional)" className="h-9 text-sm bg-(--input-color)" maxLength={60} />
          <div className="mt-1 text-right text-[10px] text-gray-400">{data.header?.length || 0}/60</div>
        </div>

        <div>
          <Label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-400">Value Text *</Label>
          <Input value={data.valueText || ""} onFocus={() => setTouched(true)} onChange={(e) => updateNodeData("valueText", e.target.value)} placeholder="Enter value text" className={`h-9 text-sm bg-(--input-color) ${(touched || data.forceValidation) && !data.valueText ? "border-gray-200 dark:border-(--card-border-color)" : ""}`} maxLength={1000} />
          {(touched || data.forceValidation) && !data.valueText && <p className="mt-1 text-[10px] text-red-500">Value text is required</p>}
          <div className="mt-1 text-right text-[10px] text-gray-400">{data.valueText?.length || 0}/1000</div>
        </div>

        <div>
          <Label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-400">Button Text *</Label>
          <Input value={data.buttonText || ""} onFocus={() => setTouched(true)} onChange={(e) => updateNodeData("buttonText", e.target.value)} placeholder="Click Here" className="h-9 text-sm bg-(--input-color)" maxLength={20} />
          <div className="mt-1 text-right text-[10px] text-gray-400">{data.buttonText?.length || 0}/20</div>
        </div>

        <div>
          <Label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-400">Button Link *</Label>
          <Input value={data.buttonLink || ""} onFocus={() => setTouched(true)} onChange={(e) => updateNodeData("buttonLink", e.target.value)} placeholder="Enter URL (https://example.com)" className={`h-9 text-sm bg-(--input-color) ${(touched || data.forceValidation) && !data.buttonLink ? "border-gray-200 dark:border-(--card-border-color)" : ""}`} />
          {(touched || data.forceValidation) && !data.buttonLink && <p className="mt-1 text-[10px] text-red-500">Please enter a valid URL</p>}
        </div>

        <div className="pt-2 border-t border-gray-100 dark:border-(--card-border-color)">
          <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight dark:text-gray-400">Preview:</Label>
          <div className="mt-2 p-3 bg-gray-50 rounded-lg text-center border border-gray-100 dark:bg-(--dark-sidebar) dark:border-(--card-border-color)">
            <div className="text-xs text-gray-600 mb-2 truncate dark:text-gray-400">{data.valueText || "Your value text will appear here"}</div>
            <Button size="sm" className="w-full bg-yellow-500 hover:bg-yellow-600 h-8 text-xs font-bold text-white shadow-sm">
              {data.buttonText || "Click Here"}
            </Button>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3! h-3! bg-emerald-500! border-2! border-white! dark:border-(--card-border-color)! shadow-sm" />
    </div>
  );
}
