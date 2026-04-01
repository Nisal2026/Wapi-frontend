"use client";

import ComingSoonTemplate from "@/src/components/product/ComingSoonTemplate";
import { Instagram } from "lucide-react";

const MultiChannelPage = () => {
  return (
    <ComingSoonTemplate
      featureName="Social Commerce"
      title="Sell more by connecting Instagram and Facebook to your WhatsApp"
      description="Manage all your social media sales and customer queries in one simple dashboard. Engage with customers on Instagram and Messenger without leaving Wapi."
      icon={<Instagram className="w-12 h-12" />}
    />
  );
};

export default MultiChannelPage;
