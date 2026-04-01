"use client";

import { Button } from "@/src/elements/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/elements/ui/dialog";
import { MessageSquareOff, PlusCircle, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface WabaRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

const WabaRequiredModal: React.FC<WabaRequiredModalProps> = ({ 
  isOpen, 
  onClose,
  title = "WABA Connection Required",
  description = "You haven't connected any WhatsApp Business Accounts yet. Connect your account to start chatting with your customers in real-time."
}) => {
  const router = useRouter();

  const handleConnect = () => {
    router.push("/connect_waba");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md! border-none shadow-2xl overflow-hidden p-0! bg-white dark:bg-(--card-color) rounded-xl">
        <div className="bg-slate-50 dark:bg-(--card-color) px-6 py-4 border-b border-slate-100 dark:border-(--card-border-color)">
          <DialogHeader>
            <DialogTitle className="text-2xl text-left font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                <ShieldAlert size={24} />
              </div>
              {title}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-8 flex flex-col items-center text-center space-y-6">
          <div className="w-24 h-24 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center relative shadow-inner">
             <div className="absolute inset-0 bg-amber-500/5 rounded-full animate-ping" />
             <MessageSquareOff size={48} className="text-amber-500 relative z-10" />
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Requirement</h4>
            <p className="text-sm text-slate-500 dark:text-gray-400 max-w-[320px] leading-relaxed font-medium">
              {description}
            </p>
          </div>

          <div className="w-full pt-4 space-y-3">
            <Button 
              className="w-full h-12 bg-primary text-white font-black text-[15px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group" 
              onClick={handleConnect}
            >
              <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              Connect WABA Account
            </Button>
            
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
              Set up in less than 2 minutes
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WabaRequiredModal;
