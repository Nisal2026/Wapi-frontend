"use client";

import { Label } from "@/src/elements/ui/label";
import { ColorRowProps } from "@/src/types/widget";

export const ColorRow = ({ label, value, onChange, fallback }: ColorRowProps) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider">{label}</Label>
    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-(--page-body-bg) rounded-lg border border-slate-200 dark:border-none hover:border-primary/40 transition-colors group">
      <div className="relative shrink-0">
        <input type="color" value={value || fallback} onChange={(e) => onChange(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent p-0.5 appearance-none" style={{ padding: "2px" }} />
        <div className="w-8 h-8 rounded-lg border-2 border-white dark:border-slate-800 shadow-md pointer-events-none absolute inset-0" style={{ backgroundColor: value || fallback }} />
      </div>
      <input type="text" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={fallback} className="flex-1 bg-transparent text-sm font-mono font-semibold text-slate-700 dark:text-slate-200 outline-none uppercase placeholder:text-slate-400 placeholder:font-normal placeholder:normal-case" />
    </div>
  </div>
);
