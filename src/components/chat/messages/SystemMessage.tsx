import { SystemMessageProps } from "@/src/types/components/chat";
import React from "react";

const SystemMessage: React.FC<SystemMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-center w-full my-1">
      <div className="px-4 text-[12px] font-medium text-slate-600 dark:text-gray-400 max-w-[80%] text-center">{message.content}</div>
    </div>
  );
};

export default SystemMessage;
