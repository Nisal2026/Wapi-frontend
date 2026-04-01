import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authoption } from "../auth/[...nextauth]/authOption";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:5000/api";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authoption);
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const response = await fetch(`${BACKEND_API_URL}/import-jobs?${queryString}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
