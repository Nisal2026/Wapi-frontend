import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authoption } from "../../auth/[...nextauth]/authOption";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:5000/api";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authoption);
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const response = await fetch(`${BACKEND_API_URL}/import-jobs/bulk-delete`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
