"use client";

import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { Textarea } from "@/src/elements/ui/textarea";
import { ListFormHandle, ListFormProps } from "@/src/types/components/chat";
import { Plus, Trash2 } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { toast } from "sonner";

const ListForm = forwardRef<ListFormHandle, ListFormProps>(({ onSend, setIsSending }, ref) => {
  const generateId = (prefix: string) => `${prefix}_${Math.random().toString(36).substring(2, 11)}`;

  const [listHeader, setListHeader] = useState("");
  const [listBody, setListBody] = useState("");
  const [listFooter, setListFooter] = useState("");
  const [listButtonTitle, setListButtonTitle] = useState("");
  const [listSections, setListSections] = useState([
    {
      id: generateId("section"),
      title: "Section 1",
      items: [{ id: generateId("item"), title: "", description: "" }],
    },
  ]);

  useImperativeHandle(ref, () => ({
    submit: async () => {
      if (!listBody.trim()) {
        toast.error("Message body is required");
        return;
      }
      if (!listButtonTitle.trim()) {
        toast.error("Button title is required");
        return;
      }
      if (listSections.some((s) => !s.title.trim() || s.items.some((i) => !i.title.trim()))) {
        toast.error("All sections and items must have a title");
        return;
      }

      setIsSending(true);
      try {
        await onSend({
          messageType: "interactive",
          type: "interactive",
          interactiveType: "list",
          message: listBody,
          listParams: {
            header: listHeader,
            buttonTitle: listButtonTitle,
            sectionTitle: listSections[0].title,
            items: listSections.flatMap((s) => s.items.map((i) => ({ id: i.id, title: i.title, description: i.description }))),
          },
        });
        setListHeader("");
        setListBody("");
        setListFooter("");
        setListButtonTitle("");
        setListSections([{ id: generateId("section"), title: "Section 1", items: [{ id: generateId("item"), title: "", description: "" }] }]);
      } finally {
        setIsSending(false);
      }
    },
  }));

  const handleAddSection = () => {
    setListSections([
      ...listSections,
      {
        id: generateId("section"),
        title: `Section ${listSections.length + 1}`,
        items: [{ id: generateId("item"), title: "", description: "" }],
      },
    ]);
  };

  const handleRemoveSection = (index: number) => {
    setListSections(listSections.filter((_, i) => i !== index));
  };

  const handleSectionTitleChange = (index: number, value: string) => {
    const newSections = [...listSections];
    newSections[index].title = value;
    setListSections(newSections);
  };

  const handleAddItem = (sectionIndex: number) => {
    const newSections = [...listSections];
    newSections[sectionIndex].items.push({ id: generateId("item"), title: "", description: "" });
    setListSections(newSections);
  };

  const handleRemoveItem = (sectionIndex: number, itemIndex: number) => {
    const newSections = [...listSections];
    newSections[sectionIndex].items = newSections[sectionIndex].items.filter((_, i) => i !== itemIndex);
    setListSections(newSections);
  };

  const handleItemChange = (sectionIndex: number, itemIndex: number, field: "title" | "description", value: string) => {
    const newSections = [...listSections];
    newSections[sectionIndex].items[itemIndex][field] = value;
    setListSections(newSections);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2 flex flex-col">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Header (Optional)</label>
          <Input placeholder="Short top text..." value={listHeader} onChange={(e) => setListHeader(e.target.value)} className="bg-(--input-color) dark:bg-(--page-body-bg) border-slate-200 dark:border-(--card-border-color) rounded-lg" maxLength={60} />
        </div>
        <div className="space-y-2 flex flex-col">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Footer (Optional)</label>
          <Input placeholder="Short bottom text..." value={listFooter} onChange={(e) => setListFooter(e.target.value)} className="bg-(--input-color) dark:bg-(--page-body-bg) border-slate-200 dark:border-(--card-border-color) rounded-lg" maxLength={60} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-300">
          Message Body <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Textarea placeholder="The main message text before the list button..." value={listBody} onChange={(e) => setListBody(e.target.value)} className="min-h-25 resize-none bg-(--input-color) dark:bg-(--page-body-bg) border-slate-200 dark:border-(--card-border-color) focus:ring-blue-500 focus:border-blue-500 rounded-lg" maxLength={1024} />
          <div className="absolute bottom-2 right-3 text-[10px] text-slate-400 font-medium">{listBody.length}/1024</div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-300">
          List Button Label <span className="text-rose-500">*</span>
        </label>
        <Input placeholder="e.g. View Options, Select Service" value={listButtonTitle} onChange={(e) => setListButtonTitle(e.target.value)} className="bg-(--input-color) dark:bg-(--page-body-bg) border-slate-200 dark:border-(--card-border-color) rounded-lg" maxLength={20} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sections & Items</label>
          <Button onClick={handleAddSection} variant="outline" size="sm" className="h-8 gap-1 border-dashed border-primary text-primary hover:bg-blue-50 dark:hover:bg-(--table-hover)">
            <Plus size={14} /> Add Section
          </Button>
        </div>

        <div className="space-y-6">
          {listSections.map((section, sIndex) => (
            <div key={section.id} className="p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--card-color) space-y-4">
              <div className="flex items-center gap-3 ">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">{sIndex + 1}</div>
                <Input placeholder="Section Title (e.g. Products, Services)" value={section.title} onChange={(e) => handleSectionTitleChange(sIndex, e.target.value)} className="flex-1 h-9 bg-(--input-color) dark:bg-(--page-body-bg) border-slate-200 dark:border-(--card-border-color) rounded-lg text-sm font-bold" maxLength={24} />
                {listSections.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveSection(sIndex)} className="h-8 w-8 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10">
                    <Trash2 size={14} />
                  </Button>
                )}
              </div>

              <div className="pl-9 space-y-3 custom-scrollbar overflow-y-auto max-h-97">
                {section.items.map((item, iIndex) => (
                  <div key={item.id} className="relative p-3 rounded-lg bg-white dark:bg-(--card-color) border border-slate-100 dark:border-(--card-border-color) space-y-2 shadow-sm group">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Item #{iIndex + 1}</span>
                      {section.items.length > 1 && (
                        <button onClick={() => handleRemoveItem(sIndex, iIndex)} className="text-slate-300 hover:text-rose-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <Input placeholder="Item Title" value={item.title} onChange={(e) => handleItemChange(sIndex, iIndex, "title", e.target.value)} className="h-8 dark:border-(--card-border-color)  p-3 focus-visible:ring-0 text-sm font-semibold" maxLength={24} />
                    <Input placeholder="Description (optional)" value={item.description} onChange={(e) => handleItemChange(sIndex, iIndex, "description", e.target.value)} className="h-8 dark:border-(--card-border-color) p-3 focus-visible:ring-0 text-xs text-slate-500 dark:text-gray-500" maxLength={72} />
                  </div>
                ))}
                <Button type="button" variant="ghost" size="sm" onClick={() => handleAddItem(sIndex)} className="w-full h-8 border border-dashed border-slate-200 dark:border-(--card-border-color) text-slate-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-(--table-hover) rounded-lg text-xs gap-1">
                  <Plus size={14} /> Add Row
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

ListForm.displayName = "ListForm";

export default ListForm;
