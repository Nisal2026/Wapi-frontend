import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authoption } from "../../../auth/[...nextauth]/authOption";
import { PUBLIC_API_URL } from "@/src/constants";

export async function PUT(request: Request, { params }: { params: Promise<{ status: string }> }) {
  const session = await getServerSession(authoption);
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { status } = await params;

  try {
    const body = await request.json();
    const response = await fetch(`${PUBLIC_API_URL}/ecommerce-order/status-templates/${status}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Status template upsert error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
