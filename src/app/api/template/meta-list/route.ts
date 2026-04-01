/* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_API_URL } from "@/src/constants/route";
import { getServerSession } from "next-auth";
import { authoption } from "@/src/app/api/auth/[...nextauth]/authOption";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string | undefined;

    const params = request.nextUrl.searchParams;
    const queryString = params.toString();

    const response = await fetch(`${PUBLIC_API_URL}/template/meta-list?${queryString}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error (GET):", errorText.substring(0, 200));
      return NextResponse.json(
        {
          error: "Backend returned an error",
          details: errorText.substring(0, 200),
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Error fetching Templates:", error);
    return NextResponse.json({ error: "Failed to fetch templates", details: error.message }, { status: 500 });
  }
}
