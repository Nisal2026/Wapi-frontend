"use client";

import { format, startOfMonth } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/src/elements/ui/button";
import { Calendar } from "@/src/elements/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/elements/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/elements/ui/select";
import { cn } from "@/src/lib/utils";
import { DashboardDateFilterData } from "@/src/types/dashboard";

export const presets = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "this_week" },
  { label: "This Month", value: "this_month" },
  { label: "This Year", value: "this_year" },
  { label: "Custom", value: "custom" },
];

export function DashboardDateFilter({ onFilterChange }: DashboardDateFilterData) {
  const [dateRange, setDateRange] = React.useState<string>("this_year");
  const [customRange, setCustomRange] = React.useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  const handlePresetChange = (value: string) => {
    setDateRange(value);
    if (value !== "custom") {
      onFilterChange({ dateRange: value });
    } else if (customRange?.from && customRange?.to) {
      onFilterChange({
        dateRange: value,
        startDate: format(customRange.from, "yyyy-MM-dd"),
        endDate: format(customRange.to, "yyyy-MM-dd"),
      });
    }
  };

  const handleCustomRangeChange = (range: DateRange | undefined) => {
    setCustomRange(range);
    if (range?.from && range?.to) {
      onFilterChange({
        dateRange: "custom",
        startDate: format(range.from, "yyyy-MM-dd"),
        endDate: format(range.to, "yyyy-MM-dd"),
      });
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Select value={dateRange} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-40 h-10 py-4.5 bg-white dark:bg-(--card-color) border-(--input-border-color) dark:border-(--card-border-color) rounded-sm font-medium text-sm shadow-sm hover:shadow-md transition-all hover:border-primary/50">
          <SelectValue placeholder="Select Range" />
        </SelectTrigger>
        <SelectContent className="dark:bg-(--card-color) border-(--input-border-color) dark:border-(--card-border-color) rounded-xl shadow-xl">
          {presets.map((preset) => (
            <SelectItem key={preset.value} value={preset.value} className="font-medium rounded-lg m-1">
              {preset.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {dateRange === "custom" && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("h-10 justify-start text-left font-bold border-(--input-border-color) dark:border-(--card-border-color) rounded-sm bg-white dark:bg-(--card-color) min-w-60 shadow-sm hover:shadow-md transition-all hover:border-primary/50", !customRange && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
              {customRange?.from ? (
                customRange.to ? (
                  <span className="text-slate-700 dark:text-slate-200">
                    {format(customRange.from, "LLL dd, y")} - {format(customRange.to, "LLL dd, y")}
                  </span>
                ) : (
                  <span className="text-slate-700 dark:text-slate-200">{format(customRange.from, "LLL dd, y")}</span>
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 dark:bg-(--card-color) border-(--input-border-color) dark:border-(--card-border-color) rounded-xl shadow-2xl" align="end">
            <Calendar initialFocus mode="range" defaultMonth={customRange?.from} selected={customRange} onSelect={handleCustomRangeChange} numberOfMonths={1} />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
