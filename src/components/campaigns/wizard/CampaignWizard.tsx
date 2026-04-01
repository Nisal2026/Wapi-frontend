/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { Card } from "@/src/elements/ui/card";
import { cn } from "@/src/lib/utils";
import { useCreateCampaignMutation } from "@/src/redux/api/campaignApi";
import { chatApi } from "@/src/redux/api/chatApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import WabaRequired from "@/src/shared/WabaRequired";
import { CampaignFormValues } from "@/src/types/components";
import { useFormik } from "formik";
import { Check, ChevronLeft, ChevronRight, Loader2, Send } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import StepBasicInfo from "./StepBasicInfo";
import StepRecipients from "./StepRecipients";
import StepScheduling from "./StepScheduling";
import StepVariablesMapping from "./StepVariablesMapping";
import StepWhatsAppConfig from "./StepWhatsAppConfig";

const ALL_STEPS = [
  { id: "basic", title: "Basic Information", description: "Name and internal description" },
  { id: "config", title: "WhatsApp Config", description: "WABA & Template Selection" },
  { id: "variables", title: "Variable Mapping", description: "Dynamic content mapping" },
  { id: "recipients", title: "Recipients", description: "Target audience" },
  { id: "schedule", title: "Schedule", description: "Timing and Launch" },
];

const DIRECT_STEPS = [
  { id: "config", title: "WhatsApp Config", description: "WABA & Template Selection" },
  { id: "variables", title: "Variable Mapping", description: "Dynamic content mapping" },
  { id: "schedule", title: "Schedule", description: "Review and Launch" },
];

const CampaignWizard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contactId = searchParams.get("contact_id");
  const isDirectMode = !!contactId;

  const STEPS = isDirectMode ? DIRECT_STEPS : ALL_STEPS;

  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useAppDispatch();
  const [createCampaign, { isLoading: isCreating }] = useCreateCampaignMutation();
  const { selectedWorkspace } = useAppSelector((state) => state.workspace);
  const wabaIdFromWorkspace = selectedWorkspace?.waba_id || "";

  const formik = useFormik<CampaignFormValues>({
    initialValues: {
      name: isDirectMode ? `Direct Message - ${new Date().toLocaleString()}` : "",
      description: "",
      waba_id: wabaIdFromWorkspace,
      template_id: "",
      variables_mapping: {},
      recipient_type: isDirectMode ? "specific_contacts" : "all_contacts",
      specific_contacts: isDirectMode && contactId ? [contactId] : [],
      tag_ids: [],
      media_url: "",
      is_scheduled: false,
      scheduled_at: "",
      coupon_code: "",
      offer_expiration_minutes: "",
      thumbnail_product_retailer_id: "",
      carousel_cards_data: [],
      carousel_products: [],
    },
    onSubmit: async (values) => {
      try {
        const payload: any = { ...values };

        if (payload.recipient_type === "all_contacts") {
          payload.specific_contacts = [];
          payload.tag_ids = [];
        } else if (payload.recipient_type === "specific_contacts") {
          payload.tag_ids = [];
        } else if (payload.recipient_type === "tags") {
          payload.specific_contacts = [];
        }

        // Sanitize variables_mapping keys (remove stringified objects)
        if (payload.variables_mapping) {
          const cleanMapping: Record<any, any> = {};
          Object.entries(payload.variables_mapping).forEach(([key, value]) => {
            if (!key.startsWith("{") && !key.includes('"key":')) {
              cleanMapping[key] = value;
            }
          });
          payload.variables_mapping = cleanMapping;
        }

        // Remove empty optional template-specific fields to keep the payload clean
        if (!payload.coupon_code) delete payload.coupon_code;
        if (!payload.offer_expiration_minutes) delete payload.offer_expiration_minutes;
        if (!payload.thumbnail_product_retailer_id) delete payload.thumbnail_product_retailer_id;
        if (!payload.carousel_cards_data?.length) delete payload.carousel_cards_data;
        if (!payload.carousel_products?.length) delete payload.carousel_products;
        if (!payload.media_url) delete payload.media_url;
        if (!payload.variables_mapping || !Object.keys(payload.variables_mapping).length) delete payload.variables_mapping;

        const response = await createCampaign(payload).unwrap();
        if (response.success) {
          toast.success("Campaign created successfully!");
          if (isDirectMode) {
            dispatch(chatApi.util.invalidateTags(["Messages", "Chats"]));
          }
        } else {
          toast.error("Campaign created failed!");
        }

        const redirectTo = searchParams.get("redirect_to");
        if (redirectTo) {
          router.push(redirectTo);
        } else if (isDirectMode) {
          router.push("/chat");
        } else {
          router.push("/campaigns");
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create campaign");
      }
    },
  });

  if (!wabaIdFromWorkspace) {
    return <WabaRequired title="WABA Connection Required" description="To create and send campaigns, you first need to connect a WhatsApp Business Account (WABA) to this workspace." />;
  }


  const nextStep = () => {
    if (!isDirectMode && currentStep === 0 && !formik.values.name) return toast.error("Please enter a campaign name");

    const configStepIndex = isDirectMode ? 0 : 1;
    if (currentStep === configStepIndex && (!formik.values.waba_id || !formik.values.template_id)) return toast.error("Please select WABA and Template");

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="max-w-7xl mx-auto space-y-8 sm:p-8 p-4">
      <div className="flex md:flex-row md:items-center gap-6 pb-6 border-b dark:border-(--card-border-color)">
        <Button variant="ghost" size="icon" className="rounded-lg hover:bg-white dark:bg-(--card-color) dark:hover:bg-(--table-hover) shadow-md transition-all" onClick={() => router.back()}>
          <ChevronLeft size={24} className="text-slate-600 dark:text-slate-300" />
        </Button>
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-primary">Create Campaign</h1>
          <p className="text-slate-500 text-sm font-medium">Follow the steps to launch your campaign.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 [@media(min-width:1427px)]:grid-cols-12 gap-10">
        <div className="[@media(min-width:1427px)]:col-span-3 space-y-4 custom-scrollbar [@media(max-width:1426px)]:flex [@media(max-width:1426px)]:snap-x [@media(max-width:1426px)]:snap-mandatory [@media(max-width:1426px)]:overflow-x-auto">
          {STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            return (
              <div key={step.id} className={cn("relative flex items-start gap-4 p-4 [@media(max-width:1426px)]:min-w-70 rounded-lg transition-all duration-300 mb-4", isActive ? "bg-white dark:bg-(--card-color) shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200/50 dark:ring-(--card-border-color)" : "opacity-60")}>
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold transition-all", isCompleted ? "bg-emerald-500 text-white" : isActive ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20" : "bg-slate-100 dark:bg-(--dark-sidebar) text-slate-400")}>{isCompleted ? <Check size={20} /> : index + 1}</div>
                <div className="min-w-0">
                  <h3 className={cn("font-black text-sm uppercase tracking-wider line-clamp-1", isActive ? "text-primary dark:text-white" : "text-slate-500 dark:text-gray-400")}>{step.title}</h3>
                  <p className="text-[10px] text-slate-400 font-medium truncate">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="[@media(min-width:1427px)]:col-span-9">
          <Card className="sm:p-6 p-4 pb-0 rounded-lg border border-slate-100 dark:border-(--card-border-color) bg-white/50 dark:bg-(--card-color) backdrop-blur-xl shadow-md shadow-slate-200/20">
            <div className="min-h-100">
              {(isDirectMode ? currentStep === -1 : currentStep === 0) && <StepBasicInfo formik={formik} />}
              {(isDirectMode ? currentStep === 0 : currentStep === 1) && <StepWhatsAppConfig formik={formik} />}
              {(isDirectMode ? currentStep === 1 : currentStep === 2) && <StepVariablesMapping formik={formik} />}
              {(isDirectMode ? currentStep === -1 : currentStep === 3) && <StepRecipients formik={formik} />}
              {(isDirectMode ? currentStep === 2 : currentStep === 4) && <StepScheduling formik={formik} />}
            </div>

            <div className="mt-12 p-5 flex-wrap gap-3 border-t dark:border-(--card-border-color) flex items-center justify-between">
              <Button variant="ghost" onClick={prevStep} disabled={currentStep === 0} className="gap-2 rounded-lg bg-gray-200 dark:hover:bg-(--table-hover) h-12 px-4.5! py-5 dark:bg-(--dark-sidebar) font-bold hover:bg-slate-100">
                <ChevronLeft size={20} /> Back
              </Button>

              {isLastStep ? (
                <Button onClick={() => formik.handleSubmit()} disabled={isCreating} className="gap-2 rounded-lg h-12 px-8 font-bold dark:text-white bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                  {isCreating ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Send size={20} /> Launch Campaign
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={nextStep} className="gap-2 rounded-lg h-12 px-4.5! py-5 font-bold dark:text-white bg-primary hover:bg-primary  dark:hover:bg-primary/90">
                  Next Step <ChevronRight size={20} />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampaignWizard;
