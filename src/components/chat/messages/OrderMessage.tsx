import { OrderMessageProps } from "@/src/types/components/chat";
import { ShoppingCart } from "lucide-react";
import React from "react";
import BaseMessage from "./BaseMessage";

const OrderMessage: React.FC<OrderMessageProps> = ({ message, isWindowExpired }) => {
  return (
    <BaseMessage message={message} isWindowExpired={isWindowExpired}>
      <div className="flex flex-col gap-2 min-w-50">
        <div className="flex items-center gap-3 p-1">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <ShoppingCart size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Order Received</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">View details in your dashboard</p>
          </div>
        </div>

        <div className="mt-1 pt-2 border-t border-slate-100 dark:border-(--card-border-color)">
          <button className="w-full py-1.5 text-[12px] font-bold text-primary hover:bg-primary/5 rounded-md transition-colors">View Order</button>
        </div>
      </div>
    </BaseMessage>
  );
};

export default OrderMessage;
