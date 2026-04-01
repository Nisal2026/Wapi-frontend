/* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_API_URL } from "@/src/constants/route";
import { getServerSession } from "next-auth";
import { authoption } from "@/src/app/api/auth/[...nextauth]/authOption";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string | undefined;
    const { id } = await context.params;

    const response = await fetch(`${PUBLIC_API_URL}/template/${id}`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error (GET):", errorText.substring(0, 200));
      return NextResponse.json({ error: "Failed to fetch template", details: errorText.substring(0, 200) }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Error fetching Template:", error);
    return NextResponse.json({ error: "Failed to fetch template", details: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string | undefined;
    const { id } = await params;

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

    const response = await fetch(`${PUBLIC_API_URL}/template/${id}`, {
      method: "PUT",
      headers,
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Error updating Template:", error);
    return NextResponse.json({ error: "Failed to update template", details: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string | undefined;
    const { id } = await params;

    const response = await fetch(`${PUBLIC_API_URL}/template/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error (DELETE):", errorText.substring(0, 200));
      return NextResponse.json({ error: "Failed to delete template", details: errorText.substring(0, 200) }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Error deleting Template:", error);
    return NextResponse.json({ error: "Failed to delete template", details: error.message }, { status: 500 });
  }
}
