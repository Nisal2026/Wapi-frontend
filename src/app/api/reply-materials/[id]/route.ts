import { getServerSession } from "next-auth";
import { authoption } from "../../auth/[...nextauth]/authOption";
import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_API_URL } from "@/src/constants/route";

type Params = { params: Promise<{ id: string }> };

/** PUT /api/reply-materials/[id] — update name/content/file */
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string | undefined;

    const formData = await request.formData();

    const response = await fetch(`${PUBLIC_API_URL}/reply-materials/${id}`, {
      method: "PUT",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error updating reply material:", error);
    return NextResponse.json({ success: false, message: "Failed to update reply material" }, { status: 500 });
  }
}

/** DELETE /api/reply-materials/[id] — soft-delete a single item */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string | undefined;

    const response = await fetch(`${PUBLIC_API_URL}/reply-materials/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error deleting reply material:", error);
    return NextResponse.json({ success: false, message: "Failed to delete reply material" }, { status: 500 });
  }
}
