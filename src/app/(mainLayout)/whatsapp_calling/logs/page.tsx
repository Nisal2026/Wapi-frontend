import CallLogList from "@/src/components/whatsapp-calling/CallLogList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Call Logs",
  description: "Review recording history and AI transcriptions for your WhatsApp voice calls.",
};

export default function LogsPage() {
  return <CallLogList />;
}
