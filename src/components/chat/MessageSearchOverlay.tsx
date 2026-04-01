"use client";

import { Button } from "@/src/elements/ui/button";
import { useGetMessagesQuery } from "@/src/redux/api/chatApi";
import { MessageSearchOverlayProps } from "@/src/types/components/chat";
import useDebounce from "@/src/utils/hooks/useDebounce";
import { format } from "date-fns";
import { Loader2, Search, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const MessageSearchOverlay = ({ isOpen, onClose, contactId, phoneNumberId, onMessageSelect }: MessageSearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const id = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(id);
  }, [isOpen]);

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  const { data: searchResults, isLoading } = useGetMessagesQuery(
    {
      contact_id: contactId,
      whatsapp_phone_number_id: phoneNumberId,
      search: debouncedSearch,
      limit: 50,
    },
    { skip: !debouncedSearch || !isOpen }
  );

  const flatMessages = React.useMemo(() => {
    if (!searchResults?.messages) return [];
    return searchResults.messages.flatMap((dateGroup) =>
      dateGroup.messageGroups.flatMap((group) =>
        group.messages.map((msg) => ({
          ...msg,
          groupDate: dateGroup.dateKey,
        }))
      )
    );
  }, [searchResults]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-x-0 top-0 z-50 bg-white dark:bg-(--page-body-bg) rounded-t-lg border-b border-gray-200 dark:border-(--card-border-color) animate-in slide-in-from-top-2 duration-200">
      <div className="flex items-center h-14 px-4 gap-3">
        <Search className="w-5 h-5 text-slate-400" />
        <input ref={inputRef} type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search in conversation..." className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 h-full" onKeyDown={(e) => e.key === "Escape" && handleClose()} />
        <Button onClick={handleClose} className="p-1 bg-transparent hover:bg-slate-200  dark:bg-transparent dark:hover:bg-(--table-hover) rounded-lg transition-colors">
          <X className="w-5 h-5 text-slate-500 dark:text-gray-400" />
        </Button>
      </div>

      {/* Search Results Dropdown */}
      {debouncedSearch && (
        <div className="max-h-100 overflow-y-auto border-t border-gray-100 dark:border-(--card-border-color) bg-white dark:bg-(--dark-sidebar) shadow-xl custom-scrollbar">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
            </div>
          ) : flatMessages.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-gray-400 text-sm">No messages found matching &quot;{debouncedSearch}&quot;</div>
          ) : (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Found {flatMessages.length} matches</div>
              {flatMessages.map((msg) => {
                const messageDate = msg.createdAt ? new Date(msg.createdAt) : null;
                return (
                  <div
                    key={msg.id}
                    onClick={() => {
                      onMessageSelect(msg.id, msg.createdAt || "");
                      handleClose();
                    }}
                    className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-(--card-color) cursor-pointer border-b border-gray-50 dark:border-(--card-border-color) last:border-0 transition-colors"
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs font-medium text-primary">{messageDate ? format(messageDate, "dd MMM yyyy") : "—"}</span>

                      <span className="text-[10px] text-slate-400">{messageDate ? format(messageDate, "hh:mm a") : ""}</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">{msg.content}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageSearchOverlay;
