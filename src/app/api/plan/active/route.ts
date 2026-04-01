import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_API_URL}/plan/active`);

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || "Active plans fetch failed" }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error("Plans API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
