import { DocumentType, NotificationType, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { db } from "@/lib/db";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

type CreateDocumentPayload = {
  applicationId?: string | null;
  sectionId?: string | null;
  type?: DocumentType;
  label?: string | null;
  fileName?: string;
  fileUrl?: string;
  mimeType?: string;
  sizeBytes?: number;
};

function parsePositiveInt(value: string | null, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}

function normalizeText(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function parseDocumentType(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.toUpperCase();
  if (!Object.values(DocumentType).includes(normalized as DocumentType)) {
    return null;
  }
  return normalized as DocumentType;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parsePositiveInt(searchParams.get("page"), DEFAULT_PAGE);
    const pageSize = Math.min(
      parsePositiveInt(searchParams.get("pageSize"), DEFAULT_PAGE_SIZE),
      MAX_PAGE_SIZE,
    );
    const skip = (page - 1) * pageSize;

    const applicationId = normalizeText(searchParams.get("applicationId"));
    const sectionId = normalizeText(searchParams.get("sectionId"));
    const parsedType = parseDocumentType(searchParams.get("type"));

    const where: Prisma.DocumentWhereInput = {
      userId: session.user.id,
      ...(applicationId ? { applicationId } : {}),
      ...(sectionId ? { sectionId } : {}),
      ...(parsedType ? { type: parsedType } : {}),
    };

    const [total, rows] = await Promise.all([
      db.document.count({ where }),
      db.document.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ uploadedAt: "desc" }],
        include: {
          application: {
            select: {
              id: true,
              status: true,
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
      }),
    ]);

    return NextResponse.json({
      data: rows,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load documents.", details: String(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitResult = checkRateLimit(request, `documents:create:${session.user.id}`, {
      windowMs: 10 * 60 * 1000,
      maxRequests: 40,
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many document upload attempts. Please try again later." },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) },
      );
    }

    const payload = (await request.json()) as CreateDocumentPayload;

    const parsedType = parseDocumentType(payload.type) ?? "OTHER";
    const fileName = normalizeText(payload.fileName);
    const fileUrl = normalizeText(payload.fileUrl);
    const mimeType = normalizeText(payload.mimeType);
    const sizeBytes =
      typeof payload.sizeBytes === "number" && Number.isFinite(payload.sizeBytes)
        ? Math.max(0, Math.round(payload.sizeBytes))
        : 0;
    const applicationId = normalizeText(payload.applicationId) || null;
    const sectionId = normalizeText(payload.sectionId) || null;

    if (!fileName || !fileUrl || !mimeType || !sizeBytes) {
      return NextResponse.json(
        { error: "fileName, fileUrl, mimeType and sizeBytes are required." },
        { status: 400 },
      );
    }

    let validatedApplicationId = applicationId;
    const validatedSectionId = sectionId;

    if (validatedApplicationId) {
      const application = await db.application.findFirst({
        where: {
          id: validatedApplicationId,
          userId: session.user.id,
        },
        select: { id: true },
      });

      if (!application) {
        return NextResponse.json(
          { error: "Invalid applicationId for this user." },
          { status: 400 },
        );
      }
    }

    if (validatedSectionId) {
      const section = await db.applicationSection.findFirst({
        where: {
          id: validatedSectionId,
          application: {
            userId: session.user.id,
          },
        },
        select: {
          id: true,
          applicationId: true,
        },
      });

      if (!section) {
        return NextResponse.json(
          { error: "Invalid sectionId for this user." },
          { status: 400 },
        );
      }

      validatedApplicationId = validatedApplicationId ?? section.applicationId;

      if (validatedApplicationId !== section.applicationId) {
        return NextResponse.json(
          { error: "sectionId does not belong to the provided applicationId." },
          { status: 400 },
        );
      }
    }

    const created = await db.document.create({
      data: {
        userId: session.user.id,
        applicationId: validatedApplicationId,
        sectionId: validatedSectionId,
        type: parsedType,
        label: normalizeText(payload.label) || null,
        fileName,
        fileUrl,
        mimeType,
        sizeBytes,
      },
      include: {
        application: {
          select: {
            id: true,
            university: {
              select: { name: true },
            },
            program: {
              select: { name: true },
            },
          },
        },
      },
    });

    await db.notification.create({
      data: {
        userId: session.user.id,
        type: created.applicationId ? NotificationType.APPLICATION : NotificationType.SYSTEM,
        title: "Document Uploaded",
        message: created.applicationId
          ? `${created.fileName} was uploaded for ${created.application?.program.name} at ${created.application?.university.name}.`
          : `${created.fileName} was uploaded to your documents.`,
        payload: {
          documentId: created.id,
          applicationId: created.applicationId,
          type: created.type,
        },
      },
    });

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create document.", details: String(error) },
      { status: 500 },
    );
  }
}
