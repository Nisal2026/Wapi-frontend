"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import { ToggleSwitchProps } from "@/src/types/defaultAction";

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, disabled = false }) => (
  <button type="button" disabled={disabled} onClick={() => onChange(!checked)} className={cn("relative w-11 h-6 rounded-full transition-all duration-300 shrink-0", checked ? "bg-primary" : "bg-slate-200 dark:bg-slate-700", disabled && "opacity-50 cursor-not-allowed")}>
    <span className={cn("absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300", checked && "translate-x-5")} />
  </button>
);

export default ToggleSwitch;
