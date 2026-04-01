import { getServerSession } from "next-auth";
import { authoption } from "../auth/[...nextauth]/authOption";
import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_API_URL } from "@/src/constants/route";

/** GET /api/reply-materials — fetch grouped reply materials */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string | undefined;

    const queryString = request.nextUrl.searchParams.toString();

    const response = await fetch(`${PUBLIC_API_URL}/reply-materials?${queryString}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching reply materials:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch reply materials" }, { status: 500 });
  }
}

/** POST /api/reply-materials — create a new reply material */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string | undefined;

    const formData = await request.formData();

    const response = await fetch(`${PUBLIC_API_URL}/reply-materials`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error creating reply material:", error);
    return NextResponse.json({ success: false, message: "Failed to create reply material" }, { status: 500 });
  }
}
