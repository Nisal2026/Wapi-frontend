import Images from "@/src/shared/Image";
import { ImageMessageProps } from "@/src/types/components/chat";
import { Maximize2 } from "lucide-react";
import React from "react";
import BaseMessage from "./BaseMessage";

const ImageMessage: React.FC<ImageMessageProps> = ({ message, onImageClick, isWindowExpired }) => {
  return (
    <BaseMessage message={message} isWindowExpired={isWindowExpired}>
      <div className="flex flex-col gap-2">
        {message.fileUrl && (
          <div className="relative rounded-lg overflow-hidden max-h-62.5 max-w-62.5 border border-black/5 dark:border-white/5 cursor-pointer group" onClick={() => onImageClick?.(message.fileUrl!)}>
            <Images src={message.fileUrl} alt="Media" width={300} height={300} className="w-full transition-transform duration-500 group-hover:scale-110" unoptimized />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 size={24} className="text-white scale-75 group-hover:scale-100 transition-transform duration-300" />
            </div>
          </div>
        )}
        {message.content && <p className="whitespace-pre-wrap wrap-break-word leading-relaxed text-[13.5px]">{message.content}</p>}
      </div>
    </BaseMessage>
  );
};

export default ImageMessage;
