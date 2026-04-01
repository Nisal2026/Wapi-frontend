"use client";

import { Badge } from "@/src/elements/ui/badge";
import { Button } from "@/src/elements/ui/button";
import { AdminTemplateCardProps } from "@/src/types/components/template";
import { CheckCircle2, Eye } from "lucide-react";

export const AdminTemplateCard = ({ template, onPreview, onUse, isUsing }: AdminTemplateCardProps) => {
  const category = template.category?.toUpperCase();

  const categoryColor = category === "MARKETING" ? "bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-500/10 dark:border-violet-500/30" : category === "UTILITY" ? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:border-blue-500/30" : category === "AUTHENTICATION" ? "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/30" : "bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-500/10 dark:border-slate-500/30";

  return (
    <div className="group relative bg-white dark:bg-(--card-color) rounded-lg border border-slate-100 dark:border-(--card-border-color) shadow-sm hover:shadow-xl dark:translate-y-0 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col" onClick={() => onPreview(template)}>
      <div className="p-5 flex items-center justify-between gap-3 border-b border-slate-50 dark:border-(--card-border-color)">
        <h3 className="font-bold text-slate-800 dark:text-white text-sm truncate uppercase tracking-tight flex-1">{template.template_name}</h3>
        <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 hover:bg-emerald-50 px-2 py-0.5 text-[10px] font-bold shrink-0">ADMIN</Badge>
      </div>

      <div className="p-5 flex-1 bg-slate-50/30 dark:bg-(--card-color)">
        <p className="text-sm text-slate-500 dark:text-gray-500 line-clamp-3 leading-relaxed wrap-break-word">{template.message_body || <span className="italic opacity-50">No text content</span>}</p>
      </div>

      <div className="p-4 px-5 bg-white dark:bg-(--card-color) border-t border-slate-50 dark:border-(--card-border-color) flex items-center justify-between gap-2">
        <Badge variant="secondary" className={`text-[10px] px-2.5 py-0.5 rounded-lg border ${categoryColor}`}>
          {template.category}
        </Badge>
        <span className="text-[10px] font-bold text-slate-500 dark:text-gray-500 uppercase tracking-wide">{template.language}</span>
      </div>

      <div className="absolute inset-0 bg-white/60 dark:bg-(--table-hover) backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-lg border-slate-200 bg-white shadow-lg hover:border-sky-500 hover:text-sky-500 hover:bg-sky-50 hover:scale-110 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onPreview(template);
          }}
          title="Preview Template"
        >
          <Eye size={18} />
        </Button>

        <Button
          variant="outline"
          className="h-10 px-4 rounded-lg border-slate-200 bg-white shadow-lg hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 hover:scale-105 transition-all text-sm font-semibold gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onUse(template._id);
          }}
          disabled={isUsing}
          title="Use Template"
        >
          <CheckCircle2 size={16} />
          Use Template
        </Button>
      </div>
    </div>
  );
};
