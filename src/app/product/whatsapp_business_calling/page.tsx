"use client";

import ComingSoonTemplate from "@/src/components/product/ComingSoonTemplate";
import { PhoneCall } from "lucide-react";

const VoiceCallingPage = () => {
  return (
    <ComingSoonTemplate
      featureName="Voice Channel"
      title="Make and receive official WhatsApp voice calls directly in Wapi"
      description="No more switching to personal phones for calls. Resolve complex customer issues faster with clear, official voice calling integrated directly into your team's workflow."
      icon={<PhoneCall className="w-12 h-12" />}
    />
  );
};

export default VoiceCallingPage;
