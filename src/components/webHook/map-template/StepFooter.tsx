"use client";

import { Button } from "@/src/elements/ui/button";
import { StepFooterProps } from "@/src/types/webhook";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const StepFooter = ({ step, handleBack, handleNext, handleSave, isMapping, canNext, canSave }: StepFooterProps) => {
  return (
    <div className="bottom-0 left-0 rounded-lg relative right-0 z-50 flex-wrap [@media(max-width:352px)]:justify-center gap-2 sm:gap-0 bg-white/80 dark:bg-(--card-color)/80 backdrop-blur-xl border-t border-slate-200/60 dark:border-white/5 py-4 px-6 md:px-12 flex items-center justify-between shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-4">
        {step > 1 && (
          <Button variant="ghost" onClick={handleBack} className="rounded-lg px-6 h-12 font-black text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all flex items-center gap-2">
            <ArrowLeft size={18} /> Back
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4">
        {step === 1 ? (
          <Button onClick={handleNext} disabled={!canNext} className="bg-primary hover:bg-emerald-700 text-white rounded-lg px-10 h-14 font-black transition-all hover:translate-x-1 group flex items-center gap-2">
            Next Mapping <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        ) : (
          <Button onClick={handleSave} disabled={isMapping || !canSave} className="bg-primary hover:bg-emerald-700 text-white rounded-lg px-12 h-11 font-black transition-all hover:scale-[1.02] flex items-center gap-3">
            {isMapping && <Loader2 className="animate-spin h-5 w-5" />}
            <CheckCircle2 size={20} /> Finish & Deploy
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepFooter;
