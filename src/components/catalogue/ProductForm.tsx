"use client";

import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Textarea } from "@/src/elements/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/elements/ui/select";
import { ArrowLeft, Box, DollarSign, Image as ImageIcon, LayoutGrid, Loader2, Plus, X, Tag, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product, ProductFormProps, ProductPayload } from "@/src/types/components/catalogue";
import Image from "next/image";

const normalizeProductForForm = (data?: Partial<Product>) => {
  const base = {
    name: "",
    description: "",
    price: "",
    sale_price: "",
    currency: "USD",
    availability: "in stock",
    condition: "new",
    image_urls: [""],
    image_url: "",
    url: "",
    category: "",
    brand: "",
    retailer_id: "",
    ...(data || {}),
  };

  if (!data) return base;

  const normalized = { ...base };

  if (typeof data.price === "string") {
    normalized.price = Math.round(Number(data.price.replace(/[^\d.]/g, "")) * 100) || 0;
  } else if (typeof data.price === "number") {
    normalized.price = Math.round(data.price * 100);
  }

  if (typeof data.sale_price === "string") {
    normalized.sale_price = Math.round(Number(data.sale_price.replace(/[^\d.]/g, "")) * 100) || 0;
  } else if (typeof data.sale_price === "number") {
    normalized.sale_price = Math.round(data.sale_price * 100);
  }

  if (!normalized.image_url && normalized.image_urls && normalized.image_urls.length > 0) {
    normalized.image_url = normalized.image_urls[0];
    normalized.image_urls = normalized.image_urls.length > 1 ? normalized.image_urls.slice(1) : [""];
  } else if (!normalized.image_urls || normalized.image_urls.length === 0) {
    normalized.image_urls = [""];
  }

  return normalized;
};

const ProductForm = ({ initialData, onSubmit, isLoading, title }: ProductFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState(() => normalizeProductForForm(initialData));
  const isEditMode = Boolean(initialData);

  const [prevInitialData, setPrevInitialData] = useState(initialData);
  if (initialData !== prevInitialData) {
    setPrevInitialData(initialData);
    setFormData(normalizeProductForForm(initialData));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...(formData.image_urls || [])];
    newUrls[index] = value;
    setFormData((prev) => ({ ...prev, image_urls: newUrls }));
  };

  const addImageUrl = () => {
    setFormData((prev) => ({ ...prev, image_urls: [...(prev.image_urls || []), ""] }));
  };

  const removeImageUrl = (index: number) => {
    const newUrls = [...(formData.image_urls || [])];
    newUrls.splice(index, 1);
    setFormData((prev) => ({ ...prev, image_urls: newUrls }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ProductPayload = {
      retailer_id: formData.retailer_id || "",
      name: formData.name || "",
      description: formData.description || "",
      price: Math.round(Number(formData.price)) || 0,
      sale_price: Math.round(Number(formData.sale_price)) || 0,
      currency: formData.currency || "USD",
      availability: formData.availability || "in stock",
      condition: formData.condition || "new",
      image_urls: (formData.image_urls || []).filter((url) => url?.trim() !== ""),
      image_url: formData.image_url || "",
      url: formData.url || "",
      category: formData.category || "",
      brand: formData.brand || "",
    };

    await onSubmit(payload);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-lg border border-slate-200 bg-white dark:bg-(--card-color) dark:border-(--card-border-color) shadow-sm hover:bg-slate-50 transition-all">
            <ArrowLeft size={20} />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-amber-50 tracking-tight">{title}</h1>
            <p className="text-sm text-slate-500 font-medium">Configure your product details for the Meta Catalogue</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" onClick={() => router.back()} className="flex-1 sm:flex-none h-11 px-6 rounded-lg font-semibold border-slate-200 dark:border-(--card-border-color)">
            Cancel
          </Button>
          <Button type="submit" form="product-form" disabled={isLoading} className="flex-1 sm:flex-none h-11 px-8 rounded-lg font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95">
            {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
            Save Product
          </Button>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-(--card-color) rounded-lg border border-slate-200/60 dark:border-(--card-border-color) shadow-sm p-4 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50 dark:border-slate-800/50">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Box size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">General Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Product Name *
                </Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Premium Cotton T-Shirt" className="h-11 bg-slate-50/50 border-slate-200 dark:focus:bg-(--page-body-bg) focus:bg-white transition-all rounded-lg" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retailer_id" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Retailer ID * (Unique SKU)
                </Label>
                <Input id="retailer_id" name="retailer_id" value={formData.retailer_id} onChange={handleChange} required placeholder="e.g. SKU-12345" className="h-11 bg-slate-50/50 border-slate-200 focus:bg-white dark:focus:bg-(--page-body-bg) transition-all rounded-lg font-mono text-sm" />
              </div>

              <div className="col-span-full space-y-2">
                <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Description
                </Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={5} placeholder="Describe your product in detail..." className="bg-slate-50/50 border-slate-200 focus:bg-white dark:focus:bg-(--page-body-bg) transition-all rounded-lg resize-none" />
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-(--card-color) rounded-lg border border-slate-200/60 dark:border-(--card-border-color) shadow-sm p-4 sm:p-6 space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50 dark:border-(--card-border-color)">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-primary">
                <DollarSign size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Pricing & Inventory</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Currency
                </Label>
                <Select value={formData.currency} onValueChange={(v) => handleSelectChange("currency", v)} disabled={isEditMode}>
                  <SelectTrigger className="h-11 py-5 bg-slate-50/50 border-slate-200 rounded-lg">
                    <SelectValue placeholder="USD" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-slate-200 dark:border-(--card-border-color) dark:bg-(--card-color) shadow-xl">
                    <SelectItem className="dark:hover:bg-(--table-hover)" value="USD">
                      USD - US Dollar
                    </SelectItem>
                    <SelectItem className="dark:hover:bg-(--table-hover)" value="EUR">
                      EUR - Euro
                    </SelectItem>
                    <SelectItem className="dark:hover:bg-(--table-hover)" value="GBP">
                      GBP - British Pound
                    </SelectItem>
                    <SelectItem className="dark:hover:bg-(--table-hover)" value="INR">
                      INR - Indian Rupee
                    </SelectItem>
                    <SelectItem className="dark:hover:bg-(--table-hover)" value="AED">
                      AED - UAE Dirham
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Price *
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">{formData.currency}</span>
                  <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required className="h-11 pl-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-lg font-bold" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sale_price" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Sale Price
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">{formData.currency}</span>
                  <Input id="sale_price" name="sale_price" type="number" step="0.01" value={formData.sale_price} onChange={handleChange} className="h-11 pl-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-lg text-primary font-bold" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Availability
                </Label>
                <Select value={formData.availability} onValueChange={(v) => handleSelectChange("availability", v)}>
                  <SelectTrigger className="h-11 bg-slate-50/50 dark:border-none border-slate-200 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-slate-200 dark:border-(--card-border-color) dark:bg-(--card-color) shadow-xl">
                    <SelectItem className="dark:hover:bg-(--table-hover)" value="in stock">
                      In Stock
                    </SelectItem>
                    <SelectItem className="dark:hover:bg-(--table-hover)" value="out of stock">
                      Out of Stock
                    </SelectItem>
                    <SelectItem className="dark:hover:bg-(--table-hover)" value="available for order">
                      Available for Order
                    </SelectItem>
                    <SelectItem className="dark:hover:bg-(--table-hover)" value="discontinued">
                      Discontinued
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Condition
                </Label>
                <Select value={formData.condition} onValueChange={(v) => handleSelectChange("condition", v)}>
                  <SelectTrigger className="h-11 bg-slate-50/50 dark:border-none border-slate-200 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-slate-200 dark:border-(--card-border-color) dark:bg-(--card-color) shadow-xl">
                    <SelectItem className="dark:hover:bg-(--table-hover)" value="new">
                      New
                    </SelectItem>
                    <SelectItem className="dark:hover:bg-(--table-hover)" value="refurbished">
                      Refurbished
                    </SelectItem>
                    <SelectItem className="dark:hover:bg-(--table-hover)" value="used">
                      Used
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-(--card-color) rounded-lg border border-slate-200/60 dark:border-(--card-border-color) shadow-sm p-4 sm:p-6 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-50 flex-wrap dark:border-(--card-border-color)">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
                  <ImageIcon size={20} />
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Media & Assets</h2>
              </div>
              <Button type="button" variant="ghost" size="sm" className="text-primary font-bold hover:bg-primary/5 rounded-lg h-9" onClick={addImageUrl}>
                <Plus size={16} className="mr-1.5" />
                Add Image
              </Button>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-(--dark-body) rounded-lg border border-slate-100 dark:border-none">
                <Label htmlFor="image_url" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">
                  Primary Hero Image (Required)
                </Label>
                <div className="flex gap-4 flex-col sm:flex-row">
                  <div className="h-20 w-20 min-w-20 rounded-lg overflow-hidden border-2 dark:border-none border-white bg-white shadow-sm">
                    {formData.image_url ? (
                      <Image src={formData.image_url} alt="Preview" className="h-full w-full object-cover" width={100} height={100} unoptimized />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-300">
                        <ImageIcon size={24} />
                      </div>
                    )}
                  </div>
                  <Input id="image_url" name="image_url" value={formData.image_url} onChange={handleChange} required placeholder="Paste primary image URL here..." className="h-11 bg-white border-slate-200 rounded-lg flex-1 self-center" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formData.image_urls || []).map((url: string, index: number) => (
                  <div key={index} className="relative group">
                    <Label className="text-[10px] font-bold text-slate-400 mb-1.5 block">Secondary Image {index + 1}</Label>
                    <div className="flex gap-2">
                      <Input value={url} onChange={(e) => handleImageUrlChange(index, e.target.value)} placeholder="Image URL..." className="h-10 bg-slate-50/50 dark:border-none border-slate-200 rounded-lg text-sm" />
                      {formData?.image_urls && formData?.image_urls?.length > 1 && (
                        <Button type="button" variant="ghost" className="p-0 h-10 w-10 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg shrink-0" onClick={() => removeImageUrl(index)}>
                          <X size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white dark:bg-(--card-color) rounded-lg border border-slate-200/60 dark:border-(--card-border-color) shadow-sm p-6 space-y-6 sticky top-8">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50 dark:border-slate-800/50">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600">
                <Tag size={18} />
              </div>
              <h2 className="text-md font-bold text-slate-900 dark:text-slate-100">Organization</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Category
                </Label>
                <div className="relative">
                  <LayoutGrid size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input id="category" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Apparel" className="h-10 pl-9 bg-slate-50/50 dark:border-none border-slate-200 rounded-lg text-sm" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="brand" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Brand
                </Label>
                <div className="relative">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. WAPI" className="h-10 pl-9 bg-slate-50/50 dark:border-none border-slate-200 rounded-lg text-sm" />
                </div>
              </div>

              <div className="pt-2">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Globe size={16} />
                    <span className="text-xs font-bold uppercase">Online Presence</span>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="url" className="text-[10px] font-bold text-slate-500">
                      Product URL
                    </Label>
                    <Input id="url" name="url" type="url" value={formData.url} onChange={handleChange} placeholder="https://store.com/item" className="h-9 bg-white border-primary/20 rounded-lg text-xs" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 dark:border-(--card-border-color)">
              <p className="text-[10px] text-slate-400 leading-relaxed text-center px-2 italic">All fields marked with * are required by Meta for catalogue synchronization.</p>
            </div>
          </section>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
