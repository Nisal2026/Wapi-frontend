import { PUBLIC_API_URL } from "@/src/constants/route";
import { NextResponse } from "next/server";

const FALLBACK_PUBLIC_API_URL = "https://api.chatpanelpro.com/api";

export async function GET() {
  try {
    const baseUrl = PUBLIC_API_URL || FALLBACK_PUBLIC_API_URL;
    const readJsonResponse = async (url: string) => {
      const response = await fetch(url, {
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
      result = await readJsonResponse(`${baseUrl}/is-demo-mode`);
    } catch (error) {
      if (baseUrl === FALLBACK_PUBLIC_API_URL) {
        throw error;
      }
      result = await readJsonResponse(`${FALLBACK_PUBLIC_API_URL}/is-demo-mode`);
    }

    const { response, data } = result;

    if (!response.ok) {
      return NextResponse.json({ message: data.message || "Failed to fetch public data." }, { status: response.status });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Demo mode check error:", error);
    return NextResponse.json({ success: false, message: "Failed to check demo mode" }, { status: 500 });
  }
}
