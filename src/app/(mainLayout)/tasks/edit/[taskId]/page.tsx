"use client";

import AgentTaskCreateForm from "@/src/components/agent-task/AgentTaskCreateForm";
import { useParams, useSearchParams } from "next/navigation";

const AgentTaskEditPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const taskId = params.taskId as string;
  const agentId = searchParams.get("agentId") || "";

  return <AgentTaskCreateForm agentId={agentId} taskId={taskId} />;
};

export default AgentTaskEditPage;
