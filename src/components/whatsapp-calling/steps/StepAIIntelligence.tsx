/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/src/elements/ui/badge";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Switch } from "@/src/elements/ui/switch";
import { Textarea } from "@/src/elements/ui/textarea";
import { cn } from "@/src/lib/utils";
import { useFormikContext } from "formik";
import { Bot, Globe } from "lucide-react";
import InfoModal from "../../common/InfoModal";

const StepAIIntelligence = () => {
  const { values, touched, errors, getFieldProps, setFieldValue } = useFormikContext<any>();

  return (
    <div className="mx-auto space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="space-y-2 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-semibold text-lg">
            <Bot size={22} />
            <span>AI Intelligence (Gemini)</span>
          </div>
          <InfoModal dataKey="ai_intelligence" iconSize={22} className="text-gray-400 hover:text-primary transition-colors" />
        </div>
        <p className="text-sm text-muted-foreground">{"Configure the brain of your assistant using Google's powerful Gemini models."}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Model Engine</Label>
          <div className="p-3 bg-slate-50 dark:bg-(--page-body-bg) rounded-lg border border-slate-100 dark:border-(--card-border-color) flex items-center justify-between">
            <span className="font-mono text-sm">{values.ai_config.model_id}</span>
            <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20 uppercase tracking-tighter">
              Fast Lighting
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">AI API Key</Label>
          <Input type="password" placeholder="••••••••••••••••" {...getFieldProps("ai_config.api_key")} className={cn("h-12 rounded-lg", (touched.ai_config as any)?.api_key && (errors.ai_config as any)?.api_key && "border-red-500")} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">System Instructions / Personality</Label>
          <Textarea placeholder="You are a helpful customer service representative for a luxury hotel..." {...getFieldProps("ai_config.prompt")} className="min-h-40 rounded-lg p-4 shadow-inner" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
              <Globe size={14} /> Knowledge Base URL
            </Label>
            <Input placeholder="https://docs.yourcompany.com" {...getFieldProps("ai_config.training_url")} className="rounded-lg h-12" />
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-(--page-body-bg) rounded-lg border border-slate-100 dark:border-(--card-border-color)">
            <div className="space-y-0.5">
              <span className="text-sm font-semibold">Natural Conciseness</span>
              <p className="text-[10px] text-slate-500 leading-tight">Optimizes AI for vocal naturalness.</p>
            </div>
            <Switch checked={values.ai_config.include_concise_instruction} onCheckedChange={(val) => setFieldValue("ai_config.include_concise_instruction", val)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepAIIntelligence;
