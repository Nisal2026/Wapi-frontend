import { authoption } from "@/src/app/api/auth/[...nextauth]/authOption";
import { PUBLIC_API_URL } from "@/src/constants/route";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

async function getAuthHeaders(): Promise<HeadersInit> {
  const session = await getServerSession(authoption);
  const token = session?.accessToken as string | undefined;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function GET(_request: NextRequest, context: { params: Promise<{ wabaId: string }> }) {
  try {
    const { wabaId } = await context.params;
    const headers = await getAuthHeaders();

    const response = await fetch(`${PUBLIC_API_URL}/waba-configurations/${wabaId}`, { headers });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.error || "Failed to fetch waba configuration" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ wabaId: string }> }) {
  try {
    const { wabaId } = await context.params;
    const body = await request.json();
    const headers = await getAuthHeaders();

    const response = await fetch(`${PUBLIC_API_URL}/waba-configurations/${wabaId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.error || "Failed to update waba configuration" }, { status: 500 });
  }
}
