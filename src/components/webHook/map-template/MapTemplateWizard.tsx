/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { flattenObject } from "@/src/lib/jsonUtils";
import { useGetTemplateQuery, useGetTemplatesQuery as useGetWabaTemplatesQuery } from "@/src/redux/api/templateApi";
import { useMapTemplateMutation } from "@/src/redux/api/webhookApi";
import { useAppSelector } from "@/src/redux/hooks";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import MappingStep from "./MappingStep";
import StepFooter from "./StepFooter";
import StepHeader from "./StepHeader";
import TemplateSelectionStep from "./TemplateSelectionStep";
import WabaRequired from "@/src/shared/WabaRequired";
import { MapTemplateWizardProps } from "@/src/types/webhook";

const MapTemplateWizard = ({ webhookId, initialData, connectionsData }: MapTemplateWizardProps) => {
  const router = useRouter();
  const { selectedWorkspace } = useAppSelector((state) => state.workspace);
  const wabaIdFromWorkspace = selectedWorkspace?.waba_id || "";

  const getInitialTemplateId = () => {
    const tId = initialData.webhook.template_id;
    return typeof tId === "string" ? tId : tId?.$oid || "";
  };

  const getInitialVariables = () => {
    const rawVars = initialData.webhook.field_mapping?.variables || {};
    const processed: Record<string, string> = {};

    const flatPayload = initialData?.webhook?.first_payload ? flattenObject(initialData.webhook.first_payload) : {};
    const validPayloadKeys = new Set(Object.keys(flatPayload));

    Object.entries(rawVars).forEach(([key, val]) => {
      const value = String(val);
      if (validPayloadKeys.has(value)) {
        processed[key] = `{{${value}}}`;
      } else {
        processed[key] = value;
      }
    });
    return processed;
  };

  const [step, setStep] = useState(1);

  const [selectedWabaId, setSelectedWabaId] = useState<string>(wabaIdFromWorkspace);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(getInitialTemplateId());
  const [phoneNumberField, setPhoneNumberField] = useState<string>(initialData.webhook.field_mapping?.phone_number_field || "");
  const [variableMappings, setVariableMappings] = useState<Record<string, string>>(getInitialVariables());

  const { data: templatesData, isLoading: isTemplatesLoading } = useGetWabaTemplatesQuery({ waba_id: selectedWabaId }, { skip: !selectedWabaId });
  const { data: templateResult } = useGetTemplateQuery(selectedTemplateId, { skip: !selectedTemplateId });
  const [mapTemplate, { isLoading: isMapping }] = useMapTemplateMutation();

  const template = templateResult?.data;

  const payloadFields = useMemo(() => {
    if (!initialData?.webhook?.first_payload) return [];
    return Object.keys(flattenObject(initialData.webhook.first_payload));
  }, [initialData]);

  const variables = useMemo(() => {
    if (!template) return [];
    return template.body_variables || template.variables || [];
  }, [template]);

  const previewVariables = useMemo(() => {
    return variables.map((v: any) => {
      const key = v.key || v;
      const value = variableMappings[key] || "";
      return {
        key,
        example: value.startsWith("{{") ? value : value || `${key}`,
      };
    });
  }, [variables, variableMappings]);

  const handleNext = () => {
    if (!selectedTemplateId) {
      toast.error("Please select a template first.");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async () => {
    if (!phoneNumberField) {
      toast.error("Please select a phone number field.");
      return;
    }
    const cleanedVariables: Record<string, string> = {};
    Object.entries(variableMappings).forEach(([key, val]) => {
      if (val.startsWith("{{") && val.endsWith("}}")) {
        cleanedVariables[key] = val.slice(2, -2);
      } else {
        cleanedVariables[key] = val;
      }
    });

    try {
      await mapTemplate({
        id: webhookId,
        body: {
          template_id: selectedTemplateId,
          phone_number_field: phoneNumberField,
          variables: cleanedVariables,
        },
      }).unwrap();
      toast.success("Template mapped successfully!");
      router.push("/webhooks");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save mapping.");
    }
  };

  if (!selectedWabaId) {
    return (
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <WabaRequired title="WABA Connection Required" description="To map templates to your webhooks, you first need to connect a WhatsApp Business Account (WABA) to this workspace." />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10 pb-32 animate-in fade-in duration-700">
      <StepHeader step={step} router={router} setStep={setStep} />

      <main>{step === 1 ? <TemplateSelectionStep webhookData={initialData} connectionsData={connectionsData} selectedWabaId={selectedWabaId} setSelectedWabaId={setSelectedWabaId} templatesData={templatesData} isTemplatesLoading={isTemplatesLoading} selectedTemplateId={selectedTemplateId} setSelectedTemplateId={setSelectedTemplateId} setVariableMappings={setVariableMappings} /> : <MappingStep payloadFields={payloadFields} phoneNumberField={phoneNumberField} setPhoneNumberField={setPhoneNumberField} variables={variables} variableMappings={variableMappings} setVariableMappings={setVariableMappings} template={template} previewVariables={previewVariables} />}</main>

      <StepFooter step={step} handleBack={handleBack} handleNext={handleNext} handleSave={handleSave} isMapping={isMapping} canNext={!!selectedTemplateId} canSave={!!phoneNumberField} />
    </div>
  );
};

export default MapTemplateWizard;
