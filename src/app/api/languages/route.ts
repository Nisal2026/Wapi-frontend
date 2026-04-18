import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authoption } from "../auth/[...nextauth]/authOption";

const FALLBACK_BACKEND_API_URL = "https://api.chatpanelpro.com/api";
const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || FALLBACK_BACKEND_API_URL;

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string | undefined;

    const queryString = request.nextUrl.searchParams.toString();
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const readJsonResponse = async (baseUrl: string) => {
      const url = `${baseUrl}/languages${queryString ? `?${queryString}` : ""}`;
      const response = await fetch(url, {
        method: "GET",
        headers,
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
      return NextResponse.json({ message: data.message || "Failed to fetch languages" }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Languages GET error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
