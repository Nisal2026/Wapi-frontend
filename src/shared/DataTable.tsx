/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/elements/ui/table";
import { Checkbox } from "@/src/elements/ui/checkbox";
import { cn } from "@/src/lib/utils";
import { DataTableProps } from "../types/shared";
import { ChevronDown, ChevronUp, ChevronsUpDown, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Pagination } from "./Pagination";
import { useAppSelector } from "../redux/hooks";

export function DataTable<T>({
  data,
  columns,
  isLoading = false,
  emptyMessage = "No data found.",
  onRowClick,
  className,
  totalCount,
  page,
  limit,
  onPageChange,
  onLimitChange,
  isFetching,
  enableSelection = false,
  selectedIds = [],
  onSelectionChange,
  getRowId,
  onSortChange,
}: DataTableProps<T>) {
  const { is_demo_mode } = useAppSelector((state) => state.setting);
  const [activeSortKey, setActiveSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (!onSortChange) return;
    const newOrder = activeSortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setActiveSortKey(key);
    setSortOrder(newOrder);
    onSortChange(key, newOrder);
  };

  const handleCopy = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  };

  const currentPageIds = data.map((item) => (getRowId ? getRowId(item) : (item as any)._id)).filter((id): id is string => !!id);
  const isAllSelected = data.length > 0 && currentPageIds.length > 0 && currentPageIds.every((id) => selectedIds.includes(id));
  const isSomeSelected = currentPageIds.some((id) => selectedIds.includes(id)) && !isAllSelected;

  const handleSelectAll = (checked: boolean) => {
    if (onSelectionChange) {
      if (checked) {
        const uniqueIds = Array.from(new Set([...selectedIds, ...currentPageIds]));
        onSelectionChange(uniqueIds);
      } else {
        const newSelectedIds = selectedIds.filter((id) => !currentPageIds.includes(id));
        onSelectionChange(newSelectedIds);
      }
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange([...selectedIds, id]);
      } else {
        onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
      }
    }
  };

  const getSortIcon = (column: (typeof columns)[0]) => {
    if (!column.sortable) return null;
    const key = column.sortKey || column.header;
    if (activeSortKey !== key) return <ChevronsUpDown size={14} className="text-slate-400 shrink-0" />;
    return sortOrder === "asc" ? <ChevronUp size={14} className="text-primary shrink-0" /> : <ChevronDown size={14} className="text-primary shrink-0" />;
  };

  return (
    <div className={cn("bg-white dark:bg-(--card-color) rounded-lg border border-slate-200/60 dark:border-(--card-border-color) shadow-sm overflow-hidden", className)}>
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-(--card-color) border-b border-slate-200/60 dark:border-(--card-border-color)">
          <TableRow className="hover:bg-transparent border-none">
            {enableSelection && (
              <TableHead className="w-12.5 px-6 py-4">
                <div className="flex items-center">
                  <Checkbox checked={isAllSelected ? true : isSomeSelected ? "indeterminate" : false} onCheckedChange={(checked) => handleSelectAll(checked === true)} />
                </div>
              </TableHead>
            )}
            {columns.map((column, index) => {
              const key = column.sortKey || column.header;
              const isActive = activeSortKey === key;
              return (
                <TableHead
                  key={index}
                  className={cn(
                    "px-6 py-4 text-gray-600 dark:text-gray-500/90 transition-colors select-none",
                    column.className,
                    column.sortable && "cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  )}
                  onClick={() => column.sortable && handleSort(key)}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={cn(isActive && "text-primary font-semibold")}>{column.header}</span>
                    {getSortIcon(column)}
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-slate-100 dark:divide-slate-800/50">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length + (enableSelection ? 1 : 0)} className="h-48 text-center">
                <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-full">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                  <span className="text-sm font-medium animate-pulse">Fetching records...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (enableSelection ? 1 : 0)} className="h-48 text-center text-slate-400">
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-base font-medium text-slate-500">{emptyMessage}</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data?.map((item, rowIndex) => {
              const rowId = getRowId ? getRowId(item) : (item as any)._id || (item as any).id || rowIndex.toString();
              if (!rowId) return null;
              const isSelected = selectedIds.includes(rowId);

              return (
                <TableRow key={rowIndex} onClick={() => onRowClick?.(item)} className={cn("hover:bg-slate-50/50 dark:hover:bg-(--table-hover) dark:bg-(--card-color) transition-all group/row", onRowClick && "cursor-pointer", isSelected && "bg-(--input-color) dark:bg-emerald-500/5")}>
                  {enableSelection && (
                    <TableCell className="px-6 py-5">
                      <div className="flex items-center">
                        <Checkbox checked={isSelected} onCheckedChange={(checked) => handleSelectRow(rowId, checked === true)} onClick={(e) => e.stopPropagation()} />
                      </div>
                    </TableCell>
                  )}
                  {columns.map((column, colIndex) => {
                    const cellContent = column.cell ? column.cell(item) : column.accessorKey ? (item[column.accessorKey] as React.ReactNode) : null;
                    const copyValue = column.copyField ? String(item[column.copyField]) : column.accessorKey ? String(item[column.accessorKey]) : typeof cellContent === "string" ? cellContent : "";

                    return (
                      <TableCell key={colIndex} className={cn("px-6 py-5 align-middle", column.className)}>
                        <div className="flex items-center gap-2.5">
                          <div className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover/row:text-slate-900 dark:group-hover/row:text-white transition-colors ">{cellContent}</div>
                          {column.copyable && copyValue && (
                            <button
                              onClick={(e) => !is_demo_mode && handleCopy(e, copyValue)}
                              disabled={is_demo_mode}
                              className={cn(
                                "p-2 hover:bg-emerald-50 dark:hover:bg-(--table-hover) rounded-lg transition-all text-slate-400 hover:text-primary opacity-0 group-hover/row:opacity-100 shrink-0",
                                is_demo_mode && "cursor-not-allowed opacity-50 group-hover/row:opacity-50"
                              )}
                              title={is_demo_mode ? "Copying restricted in demo mode" : "Copy to clipboard"}
                            >
                              <Copy size={15} />
                            </button>
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      {totalCount !== undefined && page !== undefined && limit !== undefined && onPageChange && onLimitChange && <Pagination totalCount={totalCount} page={page} limit={limit} onPageChange={onPageChange} onLimitChange={onLimitChange} isLoading={isLoading || isFetching} total={totalCount} />}
    </div>
  );
}
