"use client";

import React from "react";
import { useParams } from "next/navigation";
import AgentTaskCreateForm from "@/src/components/agent-task/AgentTaskCreateForm";

const AgentTaskCreatePage = () => {
  const params = useParams();
  const agentId = params.id as string;

  return <AgentTaskCreateForm agentId={agentId} />;
};

export default AgentTaskCreatePage;
