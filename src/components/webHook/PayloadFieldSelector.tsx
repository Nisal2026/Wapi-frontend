"use client";

import { Button } from "@/src/elements/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/src/elements/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/elements/ui/popover";
import { cn } from "@/src/lib/utils";
import { PayloadFieldSelectorProps } from "@/src/types/webhook";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const PayloadFieldSelector = ({ fields, value, onChange, placeholder = "Select payload field...", className }: PayloadFieldSelectorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={cn("w-full justify-between font-normal", className)}>
          {value ? <span className="truncate font-medium text-[13px]">{value}</span> : <span className="text-muted-foreground">{placeholder}</span>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0" align="start">
        <Command>
          <CommandInput placeholder="Search field..." className="h-9" />
          <CommandList className="custom-scrollbar">
            <CommandEmpty>No field found.</CommandEmpty>
            <CommandGroup>
              {fields.map((field) => (
                <CommandItem
                  key={field}
                  value={field}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="font-medium text-[12px]"
                >
                  <Check className={cn("mr-2 h-4 w-4 text-emerald-500", value === field ? "opacity-100" : "opacity-0")} />
                  {field}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PayloadFieldSelector;
