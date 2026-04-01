import PhoneNumbers from "@/src/components/manage-waba/PhoneNumbers";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) return null;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-100">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <PhoneNumbers wabaId={id} />
    </Suspense>
  );
}
