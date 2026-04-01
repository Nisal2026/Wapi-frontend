import FormBuilderWizard from "@/src/components/form-builder/FormBuilderWizard";
import { EditFormPageProps } from "@/src/types/formBuilder";

const EditFormPage = async ({ params }: EditFormPageProps) => {
  const { id } = await params;
  return <FormBuilderWizard mode="edit" id={id} />;
};

export default EditFormPage;
