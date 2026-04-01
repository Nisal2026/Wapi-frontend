import { authoption } from "@/src/app/api/auth/[...nextauth]/authOption";
import { PUBLIC_API_URL } from '@/src/constants/route';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

async function getAuthHeaders() {
  const session = await getServerSession(authoption);
  const token = session?.accessToken as string | undefined;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/* ================= GET ================= */

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: automationID } = await context.params;

    const headers = await getAuthHeaders();

    const response = await fetch(`${PUBLIC_API_URL}/automation/${automationID}`, {
      headers,
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error fetching automation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch automation' },
      { status: 500 }
    );
  }
}

/* ================= PUT ================= */

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: automationID } = await context.params;
    const body = await request.json();

    const headers = await getAuthHeaders();

    const response = await fetch(`${PUBLIC_API_URL}/automation/${automationID}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error updating automation:', error);
    return NextResponse.json(
      { error: 'Failed to update automation' },
      { status: 500 }
    );
  }
}

/* ================= DELETE ================= */

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: automationID } = await context.params;

    const headers = await getAuthHeaders();

    const response = await fetch(`${PUBLIC_API_URL}/automation/${automationID}`, {
      method: 'DELETE',
      headers,
      // body: JSON.stringify(await request.json()),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error deleting automation:', error);
    return NextResponse.json(
      { error: 'Failed to delete automation' },
      { status: 500 }
    );
  }
}