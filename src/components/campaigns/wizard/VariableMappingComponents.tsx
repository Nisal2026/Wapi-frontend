"use client";

import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/elements/ui/select";
import { Layout, User } from "lucide-react";

export const VariableRow = ({ varKey, example, value, onChange, mappingOptions }: { varKey: string; example: string; value: string; onChange: (val: string) => void; mappingOptions: { label: string; value: string }[] }) => {
  const isFieldRef = value?.startsWith("{{");
  return (
    <div className="bg-slate-50/50 dark:bg-(--page-body-bg) p-5 rounded-lg border border-slate-100 dark:border-none space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
          <Layout size={12} /> Variable Placeholder: {"{{" + varKey + "}}"}
        </Label>
        <span className="text-[10px] font-medium text-slate-400 italic">Example: {example}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Map to field</span>
          <Select value={isFieldRef ? value : ""} onValueChange={onChange}>
            <SelectTrigger className="h-11 bg-white dark:bg-(--dark-body) rounded-lg dark:border-none font-medium text-slate-700">
              <SelectValue placeholder="Select contact field..." />
            </SelectTrigger>
            <SelectContent className="rounded-lg dark:bg-(--page-body-bg)  shadow-2xl border-slate-100 dark:border-(--card-border-color)">
              {mappingOptions.map((opt) => (
                <SelectItem key={opt.value} value={`{{${opt.value}}}`} className="rounded-lg py-2.5 dark:bg-(--page-body-bg) dark:hover:bg-(--table-hover)">
                  <div className="flex items-center gap-2">
                    <User size={13} className="text-slate-400" />
                    <span className="font-bold text-sm">{opt.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Or static value</span>
          <Input placeholder="Enter fixed text..." value={!isFieldRef ? value : ""} onChange={(e) => onChange(e.target.value)} className="h-10 bg-white dark:bg-(--dark-body) rounded-lg font-medium text-slate-700" />
        </div>
      </div>
    </div>
  );
};

/** Section heading */
export const SectionHeading = ({ icon, label, sub }: { icon: React.ReactNode; label: string; sub?: string }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="p-2.5 bg-primary/10 rounded-xl">{icon}</div>
    <div>
      <p className="text-sm font-black text-primary uppercase tracking-wide">{label}</p>
      {sub && <p className="text-[11px] text-slate-400 font-medium">{sub}</p>}
    </div>
  </div>
);

/** Card wrapper */
export const SectionCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={`bg-white dark:bg-(--dark-body) rounded-lg border border-slate-100 dark:border-none p-6 shadow-sm ${className}`}>{children}</div>;
