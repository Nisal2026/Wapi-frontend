/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatMessage, SendMessagePayload } from "@/src/types/components/chat";

export const createOptimisticMessage = (payload: SendMessagePayload | FormData, reply_message: any = null): ChatMessage => {
  let messageType: string = "text";
  let content: string | null = null;
  let fileUrl: string | null = null;
  let contact_id: string = "";
  let interactiveData: any = null;

  if (payload instanceof FormData) {
    messageType = (payload.get("messageType") as string) || (payload.get("type") as string) || "text";
    content = (payload.get("message") as string) || null;
    contact_id = (payload.get("contact_id") as string) || "";

    const file = payload.get("file_url") || payload.get("file");
    if (file && typeof file !== "string") {
      fileUrl = URL.createObjectURL(file as Blob);
    }
  } else {
    messageType = payload.messageType || payload.type || "text";
    content = payload.message || null;
    contact_id = payload.contact_id;
    fileUrl = payload.mediaUrls?.[0] || null;

    if (messageType === "location" && payload.location) {
      content = JSON.stringify({
        latitude: payload.location.latitude,
        longitude: payload.location.longitude,
        address: payload.location.address || "Location",
        name: payload.location.name || "Location",
      });
    } else if (messageType === "interactive") {
      interactiveData = {
        interactiveType: payload.interactiveType as "button" | "list",
        buttons: payload.buttonParams,
        list: payload.listParams,
      };
    } else if (messageType === "reaction") {
      content = (payload as any).reactionEmoji || null;
    }
  }

  return {
    id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    content,
    interactiveData,
    messageType: messageType as any,
    fileUrl,
    template: null,
    createdAt: new Date().toISOString(),
    can_chat: true,
    delivered_at: null,
    delivery_status: "pending",
    is_delivered: false,
    is_seen: false,
    seen_at: null,
    wa_status: null,
    direction: "outbound",
    reply_message,
    sender: {
      id: "current-user",
      name: "You",
      avatar: null,
    },
    recipient: {
      id: contact_id,
      name: "Contact",
      avatar: null,
    },
  };
};

export const getTodayDateInfo = () => {
  const today = new Date();
  const dateLabel = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateKey = today.toISOString().split("T")[0];

  return { dateLabel, dateKey, today };
};
