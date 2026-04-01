"use client";

import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { CampaignFormValues } from "@/src/types/components";
import { FormikProps } from "formik";
import { Layout, MessageSquare, Sparkles } from "lucide-react";

const StepBasicInfo = ({ formik }: { formik: FormikProps<CampaignFormValues> }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4">
        <div className="p-2.5 sm:p-3.5 bg-primary/10 rounded-lg">
          <Sparkles className="text-primary w-6 h-6" />
        </div>
        <div>
          <h2 className="sm:text-xl text-lg font-black text-primary tracking-tight">Campaign Details</h2>
          <p className="text-slate-500 font-medium text-sm">Start by giving your campaign a recognizable name.</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="group space-y-3">
          <Label htmlFor="name" className="text-xs font-black uppercase text-slate-500 dark:text-gray-400 ml-1 flex items-center gap-2 group-focus-within:text-primary transition-colors">
            <Layout size={14} /> Campaign Name <span className="text-primary">*</span>
          </Label>
          <Input id="name" name="name" placeholder="E.g. Summer Sale 2024 - Newsletter" value={formik.values.name} onChange={formik.handleChange} className="h-11 bg-(--input-color) dark:bg-(--page-body-bg) focus:bg-(--input-color) dark:focus:bg-(--page-body-bg) transition-all rounded-lg border-slate-200 dark:border-(--card-border-color) p-3 font-medium text-lg placeholder:text-gray-400 shadow-sm focus:ring-4 focus:ring-primary/10" />
        </div>

        <div className="group space-y-3">
          <Label htmlFor="description" className="text-xs font-black uppercase text-slate-500 dark:text-gray-400 ml-1 flex items-center gap-2 group-focus-within:text-primary transition-colors">
            <MessageSquare size={14} /> Internal Description
          </Label>
          <div className="relative">
            <textarea id="description" name="description" placeholder="What is the goal of this campaign?" value={formik.values.description} onChange={formik.handleChange} className="w-full min-h-35 custom-scrollbar bg-(--input-color) dark:bg-(--page-body-bg) focus:bg-(--input-color) dark:focus:bg-(--page-body-bg) transition-all rounded-lg border border-slate-200 dark:border-(--card-border-color) p-5 font-medium resize-none focus:outline-none focus:ring-4 focus:ring-primary/10 shadow-sm placeholder:text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepBasicInfo;
