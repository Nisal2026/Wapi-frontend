"use client";

import AgentTaskDetail from "@/src/components/agent-task/AgentTaskDetail";
import AgentTaskListSidebar from "@/src/components/agent-task/AgentTaskListSidebar";
import { ClipboardList } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";

const AgentTaskPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const agentId = params.id as string;
  const taskId = searchParams.get("taskId");

  return (
    <div className="flex h-[calc(100vh-100px)]  overflow-hidden [@media(max-width:720px)]:flex-col [@media(max-width:720px)]:h-[unset] [@media(max-width:720px)]:gap-2.5 bg-white dark:bg-(--card-color) border border-slate-100 dark:border-(--card-border-color) rounded-lg mt-4 mx-4 animate-in fade-in zoom-in-95 duration-500">
      <aside className="w-96 [@media(max-width:720px)]:w-full [@media(max-width:720px)]:h-150 border-r border-slate-100 dark:border-(--card-border-color) h-full overflow-hidden flex flex-col bg-white/50 backdrop-blur-md">
        <AgentTaskListSidebar agentId={agentId} />
      </aside>

      <main className="flex-1 h-full overflow-hidden flex flex-col bg-slate-50/10">
        {taskId ? (
          <AgentTaskDetail taskId={taskId} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-white/50 dark:bg-(--card-color) animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-25 h-25 rounded-[2rem] bg-slate-50 dark:bg-(--dark-sidebar) flex items-center justify-center text-slate-200 shadow-inner mb-6 transition-transform hover:scale-105 duration-500">
              <ClipboardList className="h-12 w-12 text-slate-300" />
            </div>
            <h3 className="text-xl font-medium text-slate-400 text-center">
              Select a task <br />
              <span className="text-sm font-regular tracking-normal normal-case">to view instructions and collaborate</span>
            </h3>
          </div>
        )}
      </main>
    </div>
  );
};

export default AgentTaskPage;
