import { TextMessageProps } from "@/src/types/components/chat";
import React from "react";
import BaseMessage from "./BaseMessage";

const TextMessage: React.FC<TextMessageProps> = ({ message, isWindowExpired }) => {
  return (
    <BaseMessage message={message} isWindowExpired={isWindowExpired}>
      <p className="whitespace-break-spaces break-all leading-relaxed text-[14px]">{message.content}</p>
    </BaseMessage>
  );
};

export default TextMessage;
