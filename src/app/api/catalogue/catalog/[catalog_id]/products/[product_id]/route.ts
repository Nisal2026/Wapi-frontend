import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authoption } from "../../../../../auth/[...nextauth]/authOption";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function PUT(req: Request, { params }: { params: Promise<{ catalog_id: string; product_id: string }> }) {
  try {
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string;
    const { catalog_id, product_id } = await params;
    const body = await req.json();

    const response = await fetch(`${BACKEND_API_URL}/ecommerce-catalog/catalog/${catalog_id}/products/${product_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || "Failed to update product" }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error("Product update API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ catalog_id: string; product_id: string }> }) {
  try {
    const session = await getServerSession(authoption);
    const token = session?.accessToken as string;
    const { catalog_id, product_id } = await params;

    const response = await fetch(`${BACKEND_API_URL}/ecommerce-catalog/catalog/${catalog_id}/products/${product_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || "Failed to delete product" }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error("Product delete API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
