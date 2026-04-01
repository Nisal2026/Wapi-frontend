import { MultiSelect } from "@/src/elements/ui/multi-select";
import { RecipientSelectionFieldData } from "@/src/types/campaign";

export const RecipientSelectionField = ({ label, placeholder, options, selectedValues, onChange }: RecipientSelectionFieldData) => {
  return (
    <div className="space-y-3 flex flex-col">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</span>
      <MultiSelect options={options} selected={selectedValues} onChange={onChange} placeholder={placeholder} className="bg-white dark:bg-(--page-body-bg) rounded-lg border border-slate-100 dark:border-none dark:hover:bg-(--page-body-bg) p-3" />
    </div>
  );
};
