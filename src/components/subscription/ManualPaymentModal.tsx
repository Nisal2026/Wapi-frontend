/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/elements/ui/dialog";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/elements/ui/select";
import { cn } from "@/src/lib/utils";
import { useCreateManualSubscriptionMutation } from "@/src/redux/api/subscriptionApi";
import CurrencyValue from "@/src/shared/CurrencyValue";
import { Plan } from "@/src/types/subscription";
import { validationManualPaymentSchema } from "@/src/utils/validationSchema";
import { Form, Formik } from "formik";
import { Banknote, Landmark, Loader2, ReceiptText, ShieldCheck, Upload } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

interface ManualPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: Plan | null;
}

const ManualPaymentModal: React.FC<ManualPaymentModalProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [createManual, { isLoading }] = useCreateManualSubscriptionMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const initialValues = {
    manual_payment_type: "cash",
    payment_reference: "",
    bank_account_no: "",
    bank_name: "",
    bank_holder_name: "",
    bank_swift_code: "",
    bank_routing_number: "",
    bank_ifsc_no: "",
    transaction_receipt: null as File | null,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (!selectedPlan) return;

    const formData = new FormData();
    formData.append("plan_id", selectedPlan._id);
    formData.append("manual_payment_type", values.manual_payment_type);
    formData.append("payment_reference", values.payment_reference);

    if (values.transaction_receipt) {
      formData.append("transaction_receipt", values.transaction_receipt);
    }

    if (values.manual_payment_type === "bank_transfer") {
      formData.append("bank_account_no", values.bank_account_no);
      formData.append("bank_name", values.bank_name);
      formData.append("bank_holder_name", values.bank_holder_name);
      formData.append("bank_swift_code", values.bank_swift_code);
      formData.append("bank_routing_number", values.bank_routing_number);
      formData.append("bank_ifsc_no", values.bank_ifsc_no);
    }

    try {
      const response = await createManual(formData).unwrap();
      if (response.success) {
        toast.success(response.message || "Subscription request submitted successfully");
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit subscription request");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-2xl! max-w-[calc(100%-2rem)]! border-none shadow-2xl overflow-hidden p-0! bg-white dark:bg-(--card-color) rounded-xl">
        <div className="bg-slate-50 dark:bg-(--card-color) px-6 py-6 border-b border-slate-100 dark:border-(--card-border-color) flex items-center justify-between">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <ReceiptText className="h-6 w-6 text-primary" />
              Payment Details
            </DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">Total Amount</p>
              <div className="text-xl font-black text-primary">
                <CurrencyValue amount={selectedPlan.price} fromCode={selectedPlan.currency?.code || "USD"} fallbackSymbol={selectedPlan.currency.symbol} />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar max-h-[75vh]">
          <Formik initialValues={initialValues} validationSchema={validationManualPaymentSchema} onSubmit={handleSubmit}>
            {({ values, errors, touched, setFieldValue, isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Payment Type */}
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-gray-400">Payment Type</Label>
                    <Select value={values.manual_payment_type} onValueChange={(value) => setFieldValue("manual_payment_type", value)}>
                      <SelectTrigger className="h-11 border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--page-body-bg) font-bold">
                        <SelectValue placeholder="Select Payment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash" className="font-bold">
                          <div className="flex items-center gap-2">
                            <Banknote className="h-4 w-4" />
                            Cash
                          </div>
                        </SelectItem>
                        <SelectItem value="bank_transfer" className="font-bold">
                          <div className="flex items-center gap-2">
                            <Landmark className="h-4 w-4" />
                            Bank Transfer
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {touched.manual_payment_type && errors.manual_payment_type && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.manual_payment_type}</p>}
                  </div>

                  {/* Payment Reference */}
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-gray-400">Transaction ID / Reference</Label>
                    <Input name="payment_reference" placeholder="Enter reference number" className="h-11 border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--page-body-bg) font-bold" value={values.payment_reference} onChange={(e) => setFieldValue("payment_reference", e.target.value)} />
                    {touched.payment_reference && errors.payment_reference && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.payment_reference}</p>}
                  </div>
                </div>

                {/* Bank Details Section (Conditional) */}
                {values.manual_payment_type === "bank_transfer" && (
                  <div className="p-6 bg-slate-50/50 dark:bg-(--page-body-bg) rounded-xl border border-slate-100 dark:border-(--card-border-color) space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <Landmark className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Bank Details</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-slate-400">Bank Name</Label>
                        <Input placeholder="e.g. Chase Bank" className="h-10 text-sm font-bold border-slate-200 dark:border-(--card-border-color)" value={values.bank_name} onChange={(e) => setFieldValue("bank_name", e.target.value)} />
                        {touched.bank_name && errors.bank_name && <p className="text-red-500 text-[10px] font-bold">{errors.bank_name}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-slate-400">Account Number</Label>
                        <Input placeholder="Enter account number" className="h-10 text-sm font-bold border-slate-200 dark:border-(--card-border-color)" value={values.bank_account_no} onChange={(e) => setFieldValue("bank_account_no", e.target.value)} />
                        {touched.bank_account_no && errors.bank_account_no && <p className="text-red-500 text-[10px] font-bold">{errors.bank_account_no}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-slate-400">Account Holder Name</Label>
                        <Input placeholder="Full name on account" className="h-10 text-sm font-bold border-slate-200 dark:border-(--card-border-color)" value={values.bank_holder_name} onChange={(e) => setFieldValue("bank_holder_name", e.target.value)} />
                        {touched.bank_holder_name && errors.bank_holder_name && <p className="text-red-500 text-[10px] font-bold">{errors.bank_holder_name}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-slate-400">IFSC Code / Routing No</Label>
                        <Input placeholder="Enter code" className="h-10 text-sm font-bold border-slate-200 dark:border-(--card-border-color)" value={values.bank_ifsc_no} onChange={(e) => setFieldValue("bank_ifsc_no", e.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-slate-400">Swift / BIC Code</Label>
                        <Input placeholder="Enter swift code" className="h-10 text-sm font-bold border-slate-200 dark:border-(--card-border-color)" value={values.bank_swift_code} onChange={(e) => setFieldValue("bank_swift_code", e.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-slate-400">Routing Number (Optional)</Label>
                        <Input placeholder="Enter routing number" className="h-10 text-sm font-bold border-slate-200 dark:border-(--card-border-color)" value={values.bank_routing_number} onChange={(e) => setFieldValue("bank_routing_number", e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Receipt Upload */}
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-gray-400">Transaction Receipt</Label>
                  <div onClick={() => fileInputRef.current?.click()} className={cn("group relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer overflow-hidden", previewUrl ? "border-primary bg-primary/5" : "border-slate-200 dark:border-(--card-border-color) hover:border-primary hover:bg-slate-50 dark:hover:bg-(--page-body-bg)")}>
                    {previewUrl ? (
                      <div className="relative w-full max-w-xs flex flex-col items-center gap-3">
                        <Image src={previewUrl} alt="Receipt Preview" className="h-32 w-auto object-contain rounded-lg shadow-lg" width={100} height={100} unoptimized />
                        <p className="text-xs font-bold text-primary truncate max-w-full">{values.transaction_receipt?.name}</p>
                        <Button type="button" variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase pointer-events-none">
                          Change Receipt
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-(--dark-body) flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                          <Upload className="h-6 w-6" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-black text-slate-700 dark:text-white">Click to upload receipt</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">PNG, JPG or PDF up to 5MB</p>
                        </div>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*,application/pdf"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        if (file) {
                          setFieldValue("transaction_receipt", file);
                          if (file.type.startsWith("image/")) {
                            setPreviewUrl(URL.createObjectURL(file));
                          } else {
                            setPreviewUrl(null); // No preview for PDF
                          }
                        }
                      }}
                    />
                  </div>
                  {touched.transaction_receipt && errors.transaction_receipt && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.transaction_receipt}</p>}
                </div>

                <div className="pt-4 flex gap-4">
                  <Button type="button" variant="ghost" className="flex-1 h-12 font-semibold bg-slate-100 dark:bg-(--page-body-bg) text-xs tracking-widest text-slate-500 px-4.5 py-5 hover:bg-slate-200/50 rounded-lg" onClick={onClose} disabled={isLoading || isSubmitting}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 h-12 bg-primary text-white font-semibold text-xs tracking-widest rounded-lg active:scale-[0.98] transition-all px-4.5 py-5 disabled:opacity-50" disabled={isLoading || isSubmitting}>
                    {isLoading || isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Complete Purchase"}
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Secure Transaction Layer
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManualPaymentModal;
