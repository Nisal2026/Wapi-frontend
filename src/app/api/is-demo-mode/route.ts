import { PUBLIC_API_URL } from "@/src/constants/route";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${PUBLIC_API_URL}/is-demo-mode`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || "Failed to fetch public data." }, { status: response.status });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Demo mode check error:", error);
    return NextResponse.json({ success: false, message: "Failed to check demo mode" }, { status: 500 });
  }
}
