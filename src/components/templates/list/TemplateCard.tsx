"use client";

import { Badge } from "@/src/elements/ui/badge";
import { Button } from "@/src/elements/ui/button";
import { Template } from "@/src/types/components";
import { Edit3, Trash2, Eye } from "lucide-react";
import Can from "@/src/components/shared/Can";

export const TemplateCard = ({ template, onPreview, onEdit, onDelete, getStatusBadge }: { template: Template; onSelect: (template: Template) => void; onPreview: (template: Template) => void; onEdit: (id: string) => void; onDelete: (id: string) => void; getStatusBadge: (status: string) => React.ReactNode }) => {
  return (
    <div className="group relative bg-white dark:border-none dark:bg-(--card-color) rounded-lg border border-slate-100 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col" onClick={() => onPreview(template)}>
      <div className="p-5 flex items-center justify-between gap-3 border-b border-slate-50 dark:border-(--card-border-color)">
        <h3 className="font-bold text-slate-800 dark:text-white text-sm truncate uppercase tracking-tight flex-1">{template.template_name}</h3>
        {getStatusBadge(template.status)}
      </div>

      <div className="p-5 flex-1 bg-slate-50/30 dark:bg-(--card-color)">
        <p className="text-sm text-slate-500 dark:text-gray-500 line-clamp-3 leading-relaxed font-regular">{template.message_body || <span className="italic opacity-50">No text content</span>}</p>
      </div>

      <div className="p-4 px-5 bg-white dark:bg-(--card-color) border-t border-slate-50 dark:border-(--card-border-color) flex items-center justify-between gap-2">
        <Badge variant="secondary" className="text-[10px] px-2.5 py-0.5 bg-blue-50 text-blue-500 dark:border-blue-500  dark:bg-transparent border-blue-100/50 rounded-lg">
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
        <Can permission="update.template">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-lg border-slate-200 bg-white shadow-lg hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50 hover:scale-110 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(template._id);
            }}
            title="Edit Template"
          >
            <Edit3 size={18} />
          </Button>
        </Can>
        <Can permission="delete.template">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-lg border-slate-200 bg-white shadow-lg hover:border-rose-500 hover:text-rose-500 hover:bg-rose-50 hover:scale-110 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(template._id);
            }}
            title="Delete Template"
          >
            <Trash2 size={18} />
          </Button>
        </Can>
      </div>
    </div>
  );
};
