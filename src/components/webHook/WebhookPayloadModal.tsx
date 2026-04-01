"use client";

import { Button } from "@/src/elements/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/elements/ui/dialog";
import { useGetWebhookQuery } from "@/src/redux/api/webhookApi";
import { WebhookPayloadModalProps } from "@/src/types/webhook";
import { CheckCircle2, Info, Loader2, RefreshCw, Zap } from "lucide-react";

const WebhookPayloadModal = ({ isOpen, onClose, webhook }: WebhookPayloadModalProps) => {
  const webhookId = (typeof webhook?._id === "string" ? webhook._id : webhook?._id?.$oid) || webhook?.id;

  const { data, isLoading, isFetching, refetch } = useGetWebhookQuery(webhookId as string, {
    skip: !isOpen || !webhookId,
  });

  const payload = data?.webhook.first_payload;
  const jsonString = payload ? JSON.stringify(payload, null, 2) : "// No payload received yet";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl! max-w-[calc(100%-2rem)] max-h-[90vh] gap-0 flex flex-col p-0! overflow-hidden rounded-lg border-none shadow-2xl">
        <DialogHeader className="p-6 pb-4 border-b bg-white dark:bg-(--card-color)">
          <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-0">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Zap className="text-primary h-5 w-5" />
              Webhook Payload: <span className="text-primary">{webhook?.webhook_name}</span>
            </DialogTitle>
            <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading || isFetching} className="h-8 gap-2 border-emerald-100 text-primary hover:bg-emerald-50 dark:border-emerald-500/20 dark:hover:bg-emerald-500/10">
              <RefreshCw className={`h-4 w-4 ${isLoading || isFetching ? "animate-spin" : ""}`} />
              Sync Payload
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden p-6 grid grid-cols-1 md:grid-cols-5 gap-6 bg-slate-50/50 dark:bg-(--card-color) overflow-y-auto custom-scrollbar">
          <div className="md:col-span-3 flex flex-col space-y-3 h-full overflow-hidden">
            <div className="flex items-center justify-between px-1">
              <span className="text-sm font-bold text-slate-700 dark:text-gray-300">Live Payload Output</span>
              {isFetching && <span className="text-[10px] text-emerald-500 animate-pulse font-medium">Updating...</span>}
            </div>

            <div className="flex-1 bg-slate-950 rounded-lg p-5 font-mono text-sm text-primary overflow-auto border border-slate-800 shadow-inner relative group custom-scrollbar">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-lg">
                  <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
                </div>
              ) : (
                <pre>{jsonString}</pre>
              )}
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="bg-white dark:bg-(--page-body-bg) border border-gray-100 dark:border-none p-5 rounded-lg shadow-sm space-y-4">
              <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-sm">
                <Info className="h-4 w-4 text-blue-500" />
                How it works
              </h4>
              <ul className="text-[12px] text-slate-600 dark:text-gray-400 space-y-3">
                <li className="flex gap-2 leading-relaxed">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                  This shows the first sample payload received by this webhook endpoint after it was created.
                </li>
                <li className="flex gap-2 leading-relaxed">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                  Click <strong>{"Sync Payload"}</strong> to manually refresh the data if you just triggered a test.
                </li>
                <li className="flex gap-2 text-red-500 font-medium leading-relaxed">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />
                  {"Don't see data? Trigger your external system (Shopify/Stripe etc) to send a test event to this URL."}
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50/50 dark:bg-(--page-body-bg) border border-emerald-100 dark:border-none p-5 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <CheckCircle2 className="h-4 w-4" />
                Best Practices
              </div>
              <p className="text-[11px] text-primary leading-relaxed">Use a separate webhook for each event type to ensure clean data mapping and prevent delivery issues.</p>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 bg-white dark:bg-(--card-color) border-t flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} className="rounded-lg px-4.5 py-5 dark:bg-(--page-body-bg) font-bold">
            Close Preview
          </Button>
          <Button onClick={onClose} className="bg-primary text-white rounded-lg px-4.5 py-5 font-bold">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WebhookPayloadModal;
