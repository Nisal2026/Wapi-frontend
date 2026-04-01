"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/src/elements/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/elements/ui/select";
import { cn } from "@/src/lib/utils";

interface PaginationProps {
  totalCount: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  className?: string;
  isLoading?: boolean;
  total?: number;
}

export function Pagination({ totalCount, page, limit, onPageChange, onLimitChange, className, isLoading, total }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const startEntry = totalCount > 0 ? (page - 1) * limit + 1 : 0;
  const endEntry = Math.min(page * limit, totalCount);
  const totalLength = total && total > 30 ? total : 0;

  const limitOptions = [10, 20, 25, 30, ...(totalLength > 0 ? [totalLength] : [])];

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page > totalPages - 4) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-slate-50/50 dark:bg-(--card-color) border-t border-slate-200/60 dark:border-(--card-border-color)", className)}>
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-200 whitespace-nowrap">Rows per page</span>
          <Select value={limit.toString()} onValueChange={(value) => onLimitChange(Number(value))} disabled={isLoading}>
            <SelectTrigger size="sm" className="w-18 h-8 rounded-lg bg-white dark:bg-(--page-body-bg) border-slate-200 dark:border-none shadow-xs focus:ring-emerald-500/10">
              <SelectValue placeholder={limit.toString()} />
            </SelectTrigger>
            <SelectContent align="start" className="min-w-20 rounded-lg shadow-xl dark:bg-(--card-color)">
              {limitOptions.map((option) => (
                <SelectItem key={option} value={option.toString()} className="rounded-lg cursor-pointer focus:bg-emerald-50 focus:text-emerald-700 dark:bg-(--card-color) dark:hover:bg-(--table-hover)">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="h-4 w-px bg-slate-200 dark:bg-(--card-color) hidden sm:block" />
        <div className="text-sm font-medium text-slate-500 dark:text-gray-300">
          Showing <span className="text-slate-900 dark:text-white">{startEntry}</span> to <span className="text-slate-900 dark:text-white">{endEntry}</span> of <span className="text-slate-900 dark:text-white">{totalCount}</span> results
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onPageChange(page - 1)} disabled={page <= 1 || isLoading} className="h-9 w-9 p-0 shadow-sm rounded-lg bg-gray-50 dark:bg-(--dark-body) dark:border-none border-transparent hover:bg-gray-100 dark:hover:bg-(--table-hover) text-slate-500 hover:text-slate-700 dark:text-gray-500 disabled:opacity-50">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1.5">
          {getPageNumbers().map((p, index) =>
            p === "..." ? (
              <div key={index} className="w-9 h-9 flex items-center justify-center text-slate-400">
                ...
              </div>
            ) : (
              <Button key={index} variant={page === p ? "outline" : "ghost"} size="sm" onClick={() => onPageChange(Number(p))} disabled={isLoading} className={cn("h-9 w-9 p-0 rounded-lg text-sm font-medium transition-all", page === p ? "bg-green-50 dark:bg-(--page-body-bg) dark:border-none text-primary border-primary dark:border-(--card-border-color) hover:bg-green-100 dark:hover:bg-(--table-hover) disabled:opacity-100" : "bg-gray-50 dark:bg-(--page-body-bg) text-slate-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-(--table-hover) hover:text-slate-900")}>
                {p}
              </Button>
            )
          )}
        </div>

        <Button variant="outline" size="sm" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages || isLoading} className="h-9 w-9 p-0 shadow-sm rounded-lg bg-gray-50 dark:bg-(--dark-body) dark:border-none border-transparent hover:bg-gray-100 dark:hover:bg-(--table-hover) text-slate-500 hover:text-slate-700  dark:text-gray-500 disabled:opacity-50">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
