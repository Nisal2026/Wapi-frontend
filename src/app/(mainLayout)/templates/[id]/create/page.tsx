import TemplateForm from "@/src/components/templates/TemplateForm";

const Page = async ({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ templateId?: string }> }) => {
  const { id } = await params;
  const { templateId } = await searchParams;

  return <TemplateForm wabaId={id} adminTemplateId={templateId} />;
};

export default Page;

