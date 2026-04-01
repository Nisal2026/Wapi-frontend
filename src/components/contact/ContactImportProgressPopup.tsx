"use client";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { dismissImport, maximizeImport, minimizeImport } from "@/src/redux/reducers/importProgressSlice";
import { AlertCircle, CheckCircle2, ChevronUp, Download, FileSpreadsheet, Loader2, UploadCloud, X, XCircle } from "lucide-react";
import { useCallback } from "react";

function downloadErrorsCSV(errors: string[], fileName: string) {
  const rows = ["Row,Error Message", ...errors.map((msg, i) => `${i + 1},"${msg.replace(/"/g, '""')}"`)];
  const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `import_errors_${fileName.replace(/\.[^.]+$/, "")}_${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const ProgressRing = ({ percent, size = 48 }: { percent: number; size?: number }) => {
  const r = (size - 6) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={4} className="stroke-primary/20" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={4} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="stroke-primary transition-[stroke-dashoffset] duration-500" />
    </svg>
  );
};

const ContactImportProgressPopup = () => {
  const dispatch = useAppDispatch();
  const { status, fileName, totalRecords, processedCount, errorCount, percent, errors, isMinimized, isDismissed } = useAppSelector((state) => state.importProgress);

  const isRunning = status === "started" || status === "progress";
  const isCompleted = status === "completed";
  const isFailed = status === "failed";
  const isVisible = status !== "idle" && !isDismissed;

  const handleClose = useCallback(() => {
    if (isRunning) {
      dispatch(minimizeImport());
    } else {
      dispatch(dismissImport());
    }
  }, [dispatch, isRunning]);

  const handleDownloadErrors = useCallback(() => {
    downloadErrorsCSV(errors, fileName);
  }, [errors, fileName]);

  if (!isVisible) return null;

  if (isMinimized) {
    return (
      <button onClick={() => dispatch(maximizeImport())} title="View import progress" className="fixed bottom-6 left-6 z-9999 flex items-center justify-center w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-200 ring-4 ring-primary/20 animate-in zoom-in-75">
        {isRunning ? (
          <div className="relative flex items-center justify-center w-full h-full">
            <ProgressRing percent={percent} size={56} />
            <UploadCloud size={18} className="absolute text-white animate-pulse" />
          </div>
        ) : isCompleted ? (
          <CheckCircle2 size={22} className="text-white" />
        ) : (
          <XCircle size={22} className="text-white" />
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-9999 w-88 max-w-[calc(100vw-3rem)] animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-white dark:bg-(--card-color) rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 border border-slate-100 dark:border-(--card-border-color) overflow-hidden">
        <div className={`px-5 py-4 flex items-center gap-3 ${isRunning ? "bg-primary/5 dark:bg-primary/10" : isCompleted ? "bg-emerald-50 dark:bg-emerald-950/30" : "bg-red-50 dark:bg-red-950/30"}`}>
          <div className={`shrink-0 p-2 rounded-xl ${isRunning ? "bg-primary/10 dark:bg-primary/20" : isCompleted ? "bg-emerald-100 dark:bg-emerald-900/40" : "bg-red-100 dark:bg-red-900/40"}`}>{isRunning ? <UploadCloud size={16} className="text-primary animate-pulse" /> : isCompleted ? <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" /> : <AlertCircle size={16} className="text-red-500" />}</div>

          <div className="flex-1 min-w-0">
            <p className={`text-xs font-bold truncate ${isRunning ? "text-primary" : isCompleted ? "text-emerald-700 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>{isRunning ? "Importing Contacts…" : isCompleted ? "Import Complete" : "Import Failed"}</p>
            <p className="text-[10px] text-slate-400 truncate mt-0.5 max-w-45" title={fileName}>
              {fileName || "contacts file"}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {isRunning && (
              <button onClick={() => dispatch(minimizeImport())} className="p-1.5 rounded-lg hover:bg-primary/10 text-primary/60 hover:text-primary transition-colors" title="Minimize">
                <ChevronUp size={14} />
              </button>
            )}
            <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" title={isRunning ? "Minimize" : "Dismiss"}>
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {isRunning && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Processing…</span>
                  <span className="font-bold text-primary">{percent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-primary to-primary/70 rounded-full transition-all duration-500 ease-out" style={{ width: `${percent}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Processed", value: processedCount, color: "text-primary" },
                  { label: "Failed", value: 0, color: "text-slate-400" },
                  { label: "Total", value: totalRecords, color: "text-slate-600 dark:text-slate-300" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center py-2 px-1 rounded-xl bg-slate-50 dark:bg-white/5">
                    <span className={`text-base font-bold ${s.color}`}>{s.value}</span>
                    <span className="text-[10px] text-slate-400 font-medium mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Loader2 size={12} className="animate-spin shrink-0" />
                <span>Running in background — you can continue browsing</span>
              </div>
            </>
          )}

          {isCompleted && (
            <>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Imported", value: processedCount, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
                  { label: "Failed", value: errorCount, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/30" },
                  { label: "Total", value: totalRecords, color: "text-slate-700 dark:text-slate-200", bg: "bg-slate-50 dark:bg-white/5" },
                ].map((s) => (
                  <div key={s.label} className={`flex flex-col items-center py-3 px-1 rounded-xl ${s.bg}`}>
                    <span className={`text-lg font-bold ${s.color}`}>{s.value}</span>
                    <span className="text-[10px] text-slate-400 font-medium mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>

              {errorCount === 0 && (
                <div className="flex items-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">All contacts imported successfully!</span>
                </div>
              )}

              {errorCount > 0 && (
                <div className="space-y-2">
                  <div className="flex items-start gap-2 py-2.5 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                    <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                      {errorCount} contact{errorCount > 1 ? "s" : ""} failed. Download the report to see details.
                    </span>
                  </div>
                  <button onClick={handleDownloadErrors} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 active:scale-[0.98] transition-all duration-150 shadow-sm shadow-primary/30">
                    <Download size={13} />
                    Download Error Report (.csv)
                  </button>
                </div>
              )}
            </>
          )}

          {isFailed && (
            <div className="flex items-start gap-3 py-3 px-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40">
              <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-red-700 dark:text-red-400">Import Failed</p>
                <p className="text-[11px] text-red-600/80 dark:text-red-400/80 mt-0.5">{errors[0] || "An unexpected error occurred."}</p>
              </div>
            </div>
          )}
        </div>

        <div className="px-5 pb-5">
          <div className="flex items-center gap-2 text-[10px] text-slate-300 dark:text-slate-600">
            <FileSpreadsheet size={10} />
            <span className="truncate">{fileName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactImportProgressPopup;
