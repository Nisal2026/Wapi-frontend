import { WhatsAppTimerProps } from "@/src/types/components/chat";
import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

const WhatsAppTimer: React.FC<WhatsAppTimerProps> = ({ lastInboundTime, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const lastInbound = new Date(lastInboundTime);
      const expiry = new Date(lastInbound.getTime() + 24 * 60 * 60 * 1000);
      const diff = expiry.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        setIsExpired(true);
        onExpire?.();
        return;
      }

      setIsExpired(false);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [lastInboundTime, onExpire]);

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium uppercase tracking-widest transition-all duration-500 ${isExpired ? "bg-red-50 text-red-600 dark:bg-rose-500/10 border border-red-400 dark:border-rose-900/20" : "bg-emerald-50 dark:bg-(--page-body-bg) text-primary border border-emerald-400 dark:border-(--card-border-color)"}`}>
      <Clock size={13} className={isExpired ? "" : "animate-pulse"} />
      <span className="text-[11px]">{timeLeft}</span>
    </div>
  );
};

export default WhatsAppTimer;
