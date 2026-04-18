import { NextRequest, NextResponse } from "next/server";

const FALLBACK_BACKEND_API_URL = "https://api.chatpanelpro.com/api";
const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || FALLBACK_BACKEND_API_URL;

export async function GET(request: NextRequest) {
  try {
    const readJsonResponse = async (url: string) => {
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
      const { searchParams } = new URL(request.url);
      const queryString = searchParams.toString();
      const url = `${BACKEND_API_URL}/roles${queryString ? `?${queryString}` : ""}`;
      result = await readJsonResponse(url);
    } catch (error) {
      const publicRolesUrl = `${FALLBACK_BACKEND_API_URL}/auth/roles`;
      const publicRolesResult = await readJsonResponse(publicRolesUrl);
      const publicRoles = publicRolesResult.data?.data || [];

      return NextResponse.json(
        {
          success: true,
          data: {
            roles: publicRoles,
            pagination: {
              currentPage: 1,
              totalPages: publicRoles.length ? 1 : 0,
              totalItems: publicRoles.length,
              itemsPerPage: publicRoles.length || 10,
            },
          },
        },
        { status: 200 }
      );
    }

    const { response, data } = result;

    if (!response.ok) {
      return NextResponse.json({ message: data.message || "Failed to fetch roles" }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error("Roles API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
