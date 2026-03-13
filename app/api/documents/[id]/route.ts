import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const document = await db.document.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        application: {
          select: {
            id: true,
            university: {
              select: {
                id: true,
                name: true,
              },
            },
            program: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        section: {
          select: {
            id: true,
            type: true,
            status: true,
          },
        },
      },
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found." }, { status: 404 });
    }

    return NextResponse.json({ data: document });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load document.", details: String(error) },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const existing = await db.document.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Document not found." }, { status: 404 });
    }

    await db.document.delete({
      where: {
        id: existing.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete document.", details: String(error) },
      { status: 500 },
    );
  }
}
