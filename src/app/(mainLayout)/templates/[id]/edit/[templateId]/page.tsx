import TemplateForm from "@/src/components/templates/TemplateForm";

const Page = async ({ params }: { params: Promise<{ id: string; templateId: string }> }) => {
  const { id, templateId } = await params;

  return <TemplateForm wabaId={id} templateId={templateId} />;
};

export default Page;
