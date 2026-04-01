import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authoption } from "../../../auth/[...nextauth]/authOption";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string;
    const { id } = await params;

    const response = await fetch(`${BACKEND_API_URL}/ecommerce-webhook/${id}/toggle`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || "Failed to toggle webhook" }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error("Webhook Toggle API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
