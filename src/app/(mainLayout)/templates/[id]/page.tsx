import MessageTemplates from "@/src/components/templates/MessageTemplates";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  if (!id) return null;

  return (
    <div>
      <MessageTemplates wabaId={id} />
    </div>
  );
};

export default page;
