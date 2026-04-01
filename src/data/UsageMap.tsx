import { Bot, Code2, FileDigit, GitBranch, Headphones, MessageSquare, MessagesSquare, Reply, Send, Sparkles, Tags, Target, UserPlus, Users, Webhook } from "lucide-react";

export const USAGE_MAPPING = {
  contacts_used: { label: "Contacts", icon: Users, featureKey: "contacts" },
  template_bots_used: { label: "Template Bots", icon: Bot, featureKey: "template_bots" },
  message_bots_used: { label: "Message Bots", icon: MessageSquare, featureKey: "message_bots" },
  campaigns_used: { label: "Campaigns", icon: Target, featureKey: "campaigns" },
  ai_prompts_used: { label: "AI Prompts", icon: Sparkles, featureKey: "ai_prompts" },
  canned_replies_used: { label: "Canned Replies", icon: Reply, featureKey: "canned_replies" },
  staff_used: { label: "Staff members", icon: UserPlus, featureKey: "staff" },
  conversations_used: { label: "Conversations", icon: MessagesSquare, featureKey: "conversations" },
  bot_flow_used: { label: "Bot Flows", icon: GitBranch, featureKey: "bot_flow" },
  broadcast_messages_used: { label: "Broadcasts", icon: Send, featureKey: "broadcast_messages" },
  tags_used: { label: "Tags", icon: Tags, featureKey: "tags" },
  custom_fields_used: { label: "Custom Fields", icon: FileDigit, featureKey: "custom_fields" },
  rest_api_used: { label: "REST API", icon: Code2, featureKey: "rest_api" },
  whatsapp_webhook_used: { label: "Webhooks", icon: Webhook, featureKey: "whatsapp_webhook" },
  priority_support_used: { label: "Priority Support", icon: Headphones, featureKey: "priority_support" },
};
