"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import { ToggleProps } from "@/src/types/defaultAction";

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, description }) => (
  <div className="flex items-center justify-between gap-4">
    {(label || description) && (
      <div>
        {label && <p className="text-sm font-semibold text-slate-700 dark:text-white">{label}</p>}
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
    )}
    <button type="button" onClick={() => onChange(!checked)} className={cn("relative w-11 h-6 rounded-full transition-all duration-300 shrink-0", checked ? "bg-primary" : "bg-slate-200 dark:bg-slate-700")}>
      <span className={cn("absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300", checked && "translate-x-5")} />
    </button>
  </div>
);

export default Toggle;
