/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/elements/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/src/elements/ui/sheet";
import { useGetWabaPhoneNumbersQuery } from "@/src/redux/api/whatsappApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { selectChat } from "@/src/redux/reducers/messenger/chatSlice";
import { QuickChatSheetProps } from "@/src/types/components/chat";
import { maskSensitiveData } from "@/src/utils/masking";
import { Phone } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import ChatArea from "./ChatArea";
import ChatProfile from "./ChatProfile";

const QuickChatSheet: React.FC<QuickChatSheetProps> = ({ isOpen, onClose, contact, initialPhoneNumberId }) => {
  const dispatch = useAppDispatch();
  const { selectedWorkspace } = useAppSelector((state) => state.workspace);
  const { is_demo_mode } = useAppSelector((state) => state.setting);
  const selectedWabaId = selectedWorkspace?.waba_id;
  const [selectedPhoneNumberId, setSelectedPhoneNumberId] = useState<string | undefined>(initialPhoneNumberId);

  const { data: phoneNumbersData, isLoading: isLoadingPhones } = useGetWabaPhoneNumbersQuery(selectedWabaId || "", { skip: !selectedWabaId });
  const phoneNumbers = useMemo(() => (phoneNumbersData as any)?.data || [], [phoneNumbersData]);

  useEffect(() => {
    if (phoneNumbers.length > 0 && !selectedPhoneNumberId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedPhoneNumberId(String(phoneNumbers[0].id));
    }
  }, [phoneNumbers, selectedPhoneNumberId]);

  useEffect(() => {
    if (isOpen && contact) {
      dispatch(
        selectChat({
          contact: {
            id: contact._id,
            name: contact.name,
            number: contact.phone_number,
            avatar: (contact as any).avatar || null,
            labels: (contact as any).labels || [],
          },
          lastMessage: {
            id: "",
            content: "",
            messageType: "text",
            createdAt: new Date().toISOString(),
            unreadCount: "0",
          },
        })
      );
    }
  }, [isOpen, contact, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(selectChat(null));
    };
  }, [dispatch]);

  if (!contact) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="sm:max-w-7xl w-full h-full p-0 flex flex-col gap-0 border-none shadow-2xl overflow-hidden">
        <SheetHeader className="p-4 border-b dark:border-(--card-border-color) bg-white dark:bg-(--card-color) flex flex-row items-center justify-between shrink-0">
          <div className="flex flex-row items-center gap-6 flex-wrap">
            <SheetTitle className="text-lg font-bold flex items-center gap-2">
              <span>Chat: {contact.name}</span>
            </SheetTitle>

            {isLoadingPhones ? (
              <div className="h-9 w-50 bg-slate-50 dark:bg-(--page-body-bg) animate-pulse rounded-lg" />
            ) : (
              phoneNumbers.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="h-8 w-px bg-slate-200 dark:bg-(--card-border-color) hidden sm:block" />
                  <Select value={selectedPhoneNumberId} onValueChange={setSelectedPhoneNumberId}>
                    <SelectTrigger className="w-50 h-9 bg-slate-50 dark:bg-(--page-body-bg) border-none shadow-none focus:ring-0">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-gray-400">
                        <Phone size={14} className="text-primary" />
                        <SelectValue placeholder="Select WABA" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {phoneNumbers.map((phone: any) => (
                        <SelectItem key={phone.id} value={String(phone.id)} className="text-xs">
                          {maskSensitiveData(phone.display_phone_number || phone.phone_number, "phone", is_demo_mode)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )
            )}
          </div>
        </SheetHeader>

        <div className="flex-1 min-h-0 flex flex-row overflow-hidden ">
          <div className="flex-1 flex flex-col min-w-0 ">
            <ChatArea contactId={contact._id} phoneNumberId={selectedPhoneNumberId} contactName={contact.name} contactNumber={contact.phone_number} contactAvatar={(contact as any).avatar} isModal={true} />
          </div>

          <div className="w-95 hidden lg:block overflow-y-auto custom-scrollbar  bg-white dark:bg-(--card-color)">
            <ChatProfile />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QuickChatSheet;
