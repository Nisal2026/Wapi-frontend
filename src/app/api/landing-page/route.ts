import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authoption } from "../auth/[...nextauth]/authOption";

const FALLBACK_BACKEND_API_URL = "https://api.chatpanelpro.com/api";
const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || FALLBACK_BACKEND_API_URL;

export async function GET() {
  try {
    const readJsonResponse = async (baseUrl: string) => {
      const url = `${baseUrl}/landing-page`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const text = await response.text();
      if (text.trim().startsWith("<")) {
        throw new Error(`Expected JSON from ${url} but received HTML`);
      }

      const data = JSON.parse(text);
      return { response, data };
    };

    let result;
    try {
      result = await readJsonResponse(BACKEND_API_URL);
    } catch (error) {
      if (BACKEND_API_URL === FALLBACK_BACKEND_API_URL) {
        throw error;
      }
      result = await readJsonResponse(FALLBACK_BACKEND_API_URL);
    }

    const { response, data } = result;

    if (!response.ok) {
      return NextResponse.json({ message: data.message || "Failed to fetch landing page" }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error("Landing Page GET error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const response = await fetch(`${BACKEND_API_URL}/landing-page`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || "Failed to update landing page" }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error("Landing Page PUT error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
