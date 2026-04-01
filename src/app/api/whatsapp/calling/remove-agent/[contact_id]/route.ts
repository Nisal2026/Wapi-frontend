import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_API_URL } from "@/src/constants/route";
import { authoption } from "@/src/app/api/auth/[...nextauth]/authOption";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ contact_id: string }> }) {
  try {
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string | undefined;

    const { contact_id } = await params;

    const response = await fetch(`${PUBLIC_API_URL}/whatsapp/calling/remove-agent/${contact_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error removing AI call agent:", error);
    return NextResponse.json({ error: "Failed to remove AI call agent" }, { status: 500 });
  }
}
