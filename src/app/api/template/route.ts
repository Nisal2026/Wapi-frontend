/* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_API_URL } from "@/src/constants/route";
import { getServerSession } from "next-auth";
import { authoption } from "@/src/app/api/auth/[...nextauth]/authOption";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string | undefined;

    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    const response = await fetch(`${PUBLIC_API_URL}/template?${queryString}`, {
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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string | undefined;

    const contentType = request.headers.get("content-type") || "";
    let body: any;
    const headers: any = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    if (contentType.includes("multipart/form-data")) {
      body = await request.formData();
    } else {
      const jsonBody = await request.json();
      body = JSON.stringify(jsonBody);
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${PUBLIC_API_URL}/template/create`, {
      method: "POST",
      headers,
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Error creating Template:", error);
    return NextResponse.json({ error: "Failed to create template", details: error.message }, { status: 500 });
  }
}
