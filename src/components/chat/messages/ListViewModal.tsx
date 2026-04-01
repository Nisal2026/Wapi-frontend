"use client";

import { Button } from "@/src/elements/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/elements/ui/dialog";
import { ListViewModalProps } from "@/src/types/components/chat";
import { ChevronRight, List, X } from "lucide-react";
import React from "react";

const ListViewModal: React.FC<ListViewModalProps> = ({ isOpen, onClose, data }) => {
  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0! overflow-hidden border-none shadow-2xl bg-white dark:bg-slate-900">
        <div className="h-1 w-full bg-primary" />

        <DialogHeader className="px-6 pb-4 border-b border-slate-50 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <List size={22} />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">{data.header || "List Options"}</DialogTitle>
                <span className="text-xs text-slate-500 dark:text-slate-400">Select an option from the list below</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <X size={18} />
            </Button>
          </div>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
          {data.body && (
            <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/20 border-b border-slate-50 dark:border-slate-800">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{data.body}</p>
            </div>
          )}

          <div className="py-2">
            <div className="px-6 py-2">
              <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{data.sectionTitle || "Options"}</h4>
            </div>

            <div className="space-y-1">
              {data.items.map((item, index) => (
                <div key={item.id || index} className="px-6 py-3.5 flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-default group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{item.title}</p>
                    {item.description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-normal">{item.description}</p>}
                  </div>
                  <div className="mt-1 text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors">
                    <ChevronRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {data.footer && (
          <div className="px-6 py-4 border-t border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50">
            <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 font-medium">{data.footer}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ListViewModal;
