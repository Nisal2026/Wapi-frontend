import KeywordActionForm from "@/src/components/keyword-action/KeywordActionForm";

export const metadata = {
  title: "Edit Keyword Action",
  description: "Edit an existing keyword-triggered reply action",
};

export default async function EditKeywordActionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <KeywordActionForm editId={id} />;
}
