import CallAgentList from "@/src/components/whatsapp-calling/CallAgentList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Call Agents",
  description: "Manage your AI-powered voice assistants for WhatsApp calling.",
};

export default function AgentsPage() {
  return <CallAgentList />;
}
