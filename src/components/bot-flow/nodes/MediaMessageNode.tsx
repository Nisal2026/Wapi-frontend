/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/elements/ui/select";
import { useCreateAttachmentMutation } from "@/src/redux/api/mediaApi";
import { useReactFlow } from "@xyflow/react";
import { FileText, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { BaseNode } from "./BaseNode";
import { NodeField } from "./NodeField";

export function MediaMessageNode({ data, id }: any) {
  const { setNodes } = useReactFlow();
  const [createAttachment] = useCreateAttachmentMutation();
  const [touched, setTouched] = useState(false);

  const errors: string[] = [];
  if (touched || data.forceValidation) {
    if (!data.mediaUrl || !data.mediaUrl.trim()) errors.push("Media URL is required");
  }

  const updateNodeData = (field: string, value: any) => {
    if (!touched) setTouched(true);
    setNodes((nds) => nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, [field]: value } } : node)));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Provide instant local preview
    const localUrl = URL.createObjectURL(file);
    if (!touched) setTouched(true);
    updateNodeData("mediaUrl", localUrl);

    try {
      const formData = new FormData();
      formData.append("attachments", file);

      const result = await createAttachment(formData).unwrap();
      const serverUrl = result?.data?.[0]?.url || result?.[0]?.url;
      if (serverUrl) {
        updateNodeData("mediaUrl", serverUrl);
        toast.success("Media uploaded successfully");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload media to server, using local preview");
    }
  };

  return (
    <BaseNode id={id} title="Media Message" icon={<ImageIcon size={18} />} iconBgColor="bg-orange-100" iconColor="text-orange-600" borderColor="border-orange-200" handleColor="bg-orange-500!" errors={errors} showOutHandle={false}>
      <NodeField label="Media Type">
        <Select value={data.mediaType || "image"} onValueChange={(val) => updateNodeData("mediaType", val)} onOpenChange={() => setTouched(true)}>
          <SelectTrigger className="h-9 text-sm bg-(--input-color) focus:shadow-none dark:bg-(--page-body-bg)">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="dark:bg-(--page-body-bg)">
            <SelectItem className="dark:hover:bg-(--table-hover)" value="image">
              Image
            </SelectItem>
            <SelectItem className="dark:hover:bg-(--table-hover)" value="video">
              Video
            </SelectItem>
            <SelectItem className="dark:hover:bg-(--table-hover)" value="document">
              Document
            </SelectItem>
            <SelectItem className="dark:hover:bg-(--table-hover)" value="audio">
              Audio
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="mt-1 text-[10px] text-gray-400">Supported: jpeg, png, mp4, pdf, zip, json, rar, 7z</div>
      </NodeField>

      <NodeField label="Media URL" required error={(touched || data.forceValidation) && !data.mediaUrl ? "Media URL is required" : ""}>
        <Input value={data.mediaUrl || ""} onFocus={() => setTouched(true)} onChange={(e) => updateNodeData("mediaUrl", e.target.value)} placeholder="Enter media URL" className={`h-9 text-sm bg-(--input-color) ${(touched || data.forceValidation) && !data.mediaUrl ? "border-gray-200 dark:border-(--card-border-color)" : ""}`} />
      </NodeField>

      <NodeField label="Caption">
        <Input value={data.caption || ""} onFocus={() => setTouched(true)} onChange={(e) => updateNodeData("caption", e.target.value)} placeholder="Enter caption text (optional)" className="h-9 text-sm bg-(--input-color)" />
        <div className="mt-1 text-right text-[10px] text-gray-400">{data.caption?.length || 0}/1024</div>
      </NodeField>

      <div className="pt-2 border-t border-gray-100 dark:border-(--card-border-color) space-y-2">
        <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Realistic Preview</Label>
        <div className="relative rounded-lg overflow-hidden border border-gray-100 bg-white shadow-sm dark:bg-(--dark-sidebar) dark:border-(--card-border-color)">
          <div className="flex flex-col">
            {data.mediaUrl && (
              <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {(data.mediaType || "image") === "image" || data.mediaType === "video" ? (
                  <>
                    <img
                      src={data.mediaUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                      }}
                    />
                    {data.mediaType === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 p-4 text-gray-500">
                    {data.mediaType === "audio" ? (
                      <div className="bg-blue-50 p-4 rounded-full text-blue-500">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                        </svg>
                      </div>
                    ) : (
                      <div className="bg-orange-50 p-4 rounded-full text-orange-500">
                        <FileText size={32} strokeWidth={1.5} />
                      </div>
                    )}
                    <span className="text-[10px] font-medium max-w-50 truncate">{data.mediaUrl.split("/").pop() || "Selected file"}</span>
                  </div>
                )}
              </div>
            )}

            {data.caption && (
              <div className="p-2 border-t border-gray-50 dark:border-(--card-border-color)">
                <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{data.caption}</p>
              </div>
            )}
          </div>
          <div className="bg-gray-50/80 p-1.5 flex justify-end dark:bg-black/20">
            <span className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">WhatsApp Preview</span>
          </div>
        </div>
      </div>
    </BaseNode>
  );
}
