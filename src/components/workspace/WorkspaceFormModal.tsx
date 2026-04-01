"use client";

import { Button } from "@/src/elements/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/src/elements/ui/dialog";
import { useCreateWorkspaceMutation, useUpdateWorkspaceMutation } from "@/src/redux/api/workspaceApi";
import { WorkspaceFormModalProps } from "@/src/types/workspace";
import { Building2, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function WorkspaceFormModal({ isOpen, onClose, workspace }: WorkspaceFormModalProps) {
  const isEdit = !!workspace;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [createWorkspace, { isLoading: isCreating }] = useCreateWorkspaceMutation();
  const [updateWorkspace, { isLoading: isUpdating }] = useUpdateWorkspaceMutation();
  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(workspace?.name ?? "");
      setDescription(workspace?.description ?? "");
    }
  }, [isOpen, workspace]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (isEdit && workspace) {
        await updateWorkspace({ id: workspace._id, name: name.trim(), description: description.trim() || "" }).unwrap();
        toast.success("Workspace updated successfully!");
      } else {
        await createWorkspace({ name: name.trim(), description: description.trim() || "" }).unwrap();
        toast.success("Workspace created successfully!");
      }
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to ${isEdit ? "update" : "create"} workspace.`);
    }
  };

  const handleClose = () => {
    if (isLoading) return;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md! max-w-[calc(100%-2rem)]! dark:bg-(--card-color) dark:border-(--card-border-color)">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary/80 to-primary flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Building2 size={18} className="text-white" />
            </div>
            <div>
              <DialogTitle>{isEdit ? "Edit Workspace" : "Create Workspace"}</DialogTitle>
              <DialogDescription>{isEdit ? "Update your workspace details." : "Set up a new workspace for your team."}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="text-sm font-semibold text-slate-700 dark:text-gray-300 block mb-1.5">
              Workspace Name <span className="text-red-500">*</span>
            </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Marketing Team" disabled={isLoading} maxLength={80} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-(--page-body-bg) text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 text-sm focus:outline-none transition-all" />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 dark:text-gray-300 block mb-1.5">
              Description <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this workspace used for?" disabled={isLoading} rows={3} maxLength={300} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-none bg-slate-50 dark:bg-(--page-body-bg) text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 text-sm focus:outline-none transition-all resize-none" />
          </div>

          <div className="flex gap-3 pt-1">
            <Button type="button" variant="outline" className="flex-1" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary text-white" disabled={isLoading || !name.trim()}>
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" /> {isEdit ? "Saving..." : "Creating..."}
                </>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Create Workspace"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
