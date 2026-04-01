"use client";

import { useEffect } from "react";
import { socket } from "@/src/services/socket-setup";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/src/redux/hooks";
import {
  setImportStarted,
  setImportProgress,
  setImportCompleted,
  setImportFailed,
} from "@/src/redux/reducers/importProgressSlice";

export const useContactImportProgress = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userId) return;

    const handleStarted = (data: {
      jobId: string;
      userId: string;
      totalRecords: number;
      originalFilename: string;
    }) => {
      if (data.userId !== userId) return;
      dispatch(
        setImportStarted({
          jobId: data.jobId,
          fileName: data.originalFilename,
          totalRecords: data.totalRecords,
        })
      );
    };

    const handleProgress = (data: {
      jobId: string;
      userId: string;
      processedCount: number;
      totalRecords: number;
      percent: number;
    }) => {
      if (data.userId !== userId) return;
      dispatch(
        setImportProgress({
          processedCount: data.processedCount,
          totalRecords: data.totalRecords,
          percent: data.percent,
        })
      );
    };

    const handleCompleted = (data: {
      jobId: string;
      userId: string;
      processedCount: number;
      errorCount: number;
      errors?: string[];
      success?: boolean;
    }) => {
      if (data.userId !== userId) return;
      dispatch(
        setImportCompleted({
          processedCount: data.processedCount,
          errorCount: data.errorCount ?? 0,
          errors: data.errors ?? [],
        })
      );
    };

    const handleFailed = (data: {
      jobId: string;
      userId: string;
      message: string;
      error?: string;
    }) => {
      if (data.userId !== userId) return;
      dispatch(setImportFailed({ message: data.message || data.error || "Unknown error" }));
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
  }, [userId, dispatch]);
};
