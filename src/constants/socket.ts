export const SOCKET = {
  Type: {
    Removal: "removal",
  },
  Listeners: {
    Whatsapp_Message: "whatsapp:message",
    Whatsapp_Status: "whatsapp:status",
    Whatsapp_Connection_Update: "whatsapp:connection:update",
    New_Message: "new-message",
    User_Status_Update: "user-status-update",
    Message_Status_Updated: "message-status-updated",
  },
  Emitters: {
    Message_Delivered: "message-delivered",
    Message_Seen: "message-seen",
    Join_Room: "join-room",
    Set_Online: "set-online",
    Request_Status_Update: "request-status-update",
  },
};
