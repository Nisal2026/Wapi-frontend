"use client";

import { useEffect } from "react";
import { socket } from "@/src/services/socket-setup";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export const useContactImportSocket = (refetch: () => void) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    const handleStarted = (data: { jobId: string; userId: string; totalRecords: number; originalFilename: string }) => {
      if (data.userId !== userId) return;

      toast.loading(`Importing contacts: ${data.originalFilename}...`, {
        id: `import-${data.jobId}`,
      });
    };

    const handleProgress = (data: { jobId: string; userId: string; processedCount: number; totalRecords: number; percent: number }) => {
      if (data.userId !== userId) return;

      toast.loading(`Importing: ${data.percent}% (${data.processedCount}/${data.totalRecords})`, {
        id: `import-${data.jobId}`,
      });
    };

    const handleCompleted = (data: { jobId: string; userId: string; processedCount: number; errorCount: number }) => {
      if (data.userId !== userId) return;

      toast.success(`Import completed: ${data.processedCount} processed, ${data.errorCount} failed.`, {
        id: `import-${data.jobId}`,
        duration: 5000,
      });

      refetch();
    };

    const handleFailed = (data: { jobId: string; userId: string; message: string; error?: string }) => {
      if (data.userId !== userId) return;

      toast.error(`Import failed: ${data.message || data.error || "Unknown error"}`, {
        id: `import-${data.jobId}`,
        duration: 5000,
      });
    };

    socket.on("contact-import:started", handleStarted);
    socket.on("contact-import:progress", handleProgress);
    socket.on("contact-import:completed", handleCompleted);
    socket.on("contact-import:failed", handleFailed);

    return () => {
      socket.off("contact-import:started", handleStarted);
      socket.off("contact-import:progress", handleProgress);
      socket.off("contact-import:completed", handleCompleted);
      socket.off("contact-import:failed", handleFailed);
    };
  }, [userId, refetch]);
};
