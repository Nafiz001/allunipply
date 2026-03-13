import {
  Prisma,
  ScholarshipAmountType,
  ScholarshipType,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 50;

type CreateScholarshipPayload = {
  universityId?: string;
  programId?: string | null;
  title?: string;
  slug?: string;
  type?: ScholarshipType;
  amountType?: ScholarshipAmountType;
  amountValue?: number | string | null;
  currency?: string;
  eligibilityCriteria?: string | null;
  description?: string | null;
  deadline?: string | null;
  isActive?: boolean;
};

function normalizeText(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function parsePositiveInt(value: string | null, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseScholarshipType(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.toUpperCase();
  if (!Object.values(ScholarshipType).includes(normalized as ScholarshipType)) {
    return null;
  }
  return normalized as ScholarshipType;
}

function parseScholarshipAmountType(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.toUpperCase();
  if (!Object.values(ScholarshipAmountType).includes(normalized as ScholarshipAmountType)) {
    return null;
  }
  return normalized as ScholarshipAmountType;
}

async function createUniqueScholarshipSlug(baseValue: string) {
  const baseSlug = toSlug(baseValue) || "scholarship";
  let candidate = baseSlug;
  let suffix = 1;

  while (true) {
    const existing = await db.scholarship.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing) return candidate;

    suffix += 1;
    candidate = `${baseSlug}-${suffix}`;
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const q = normalizeText(searchParams.get("q"));
    const country = normalizeText(searchParams.get("country"));
    const universityId = normalizeText(searchParams.get("universityId"));
    const parsedType = parseScholarshipType(searchParams.get("type"));
    const includeInactive = searchParams.get("includeInactive") === "true";

    const page = parsePositiveInt(searchParams.get("page"), DEFAULT_PAGE);
    const pageSize = Math.min(
      parsePositiveInt(searchParams.get("pageSize"), DEFAULT_PAGE_SIZE),
      MAX_PAGE_SIZE,
    );
    const skip = (page - 1) * pageSize;

    const where: Prisma.ScholarshipWhereInput = {
      ...(includeInactive ? {} : { isActive: true }),
      ...(parsedType ? { type: parsedType } : {}),
      ...(universityId ? { universityId } : {}),
      ...(country
        ? {
            university: {
              country: {
                equals: country,
                mode: "insensitive",
              },
            },
          }
        : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
              { eligibilityCriteria: { contains: q, mode: "insensitive" } },
              {
                university: {
                  name: { contains: q, mode: "insensitive" },
                },
              },
              {
                program: {
                  name: { contains: q, mode: "insensitive" },
                },
              },
            ],
          }
        : {}),
    };

    const [total, rows] = await Promise.all([
      db.scholarship.count({ where }),
      db.scholarship.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ deadline: "asc" }, { createdAt: "desc" }],
        include: {
          university: {
            select: {
              id: true,
              name: true,
              slug: true,
              city: true,
              country: true,
              logoUrl: true,
              bannerImageUrl: true,
            },
          },
          program: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      data: rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        type: row.type,
        amountType: row.amountType,
        amountValue: row.amountValue ? Number(row.amountValue) : null,
        currency: row.currency,
        eligibilityCriteria: row.eligibilityCriteria,
        description: row.description,
        deadline: row.deadline,
        isActive: row.isActive,
        university: row.university,
        program: row.program,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      })),
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load scholarships", details: String(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateScholarshipPayload;

    const title = normalizeText(body.title);
    const universityId = normalizeText(body.universityId);
    const parsedType = parseScholarshipType(body.type);
    const parsedAmountType = parseScholarshipAmountType(body.amountType);
    const programId = normalizeText(body.programId) || null;

    if (!title || !universityId || !parsedType || !parsedAmountType) {
      return NextResponse.json(
        {
          error:
            "Invalid payload. Required fields: title, universityId, type, amountType.",
        },
        { status: 400 },
      );
    }

    const slug = await createUniqueScholarshipSlug(normalizeText(body.slug) || title);
    const amountValue =
      body.amountValue === null || body.amountValue === undefined || body.amountValue === ""
        ? null
        : Number(body.amountValue);

    if (amountValue !== null && !Number.isFinite(amountValue)) {
      return NextResponse.json(
        { error: "amountValue must be a valid number when provided." },
        { status: 400 },
      );
    }

    const created = await db.scholarship.create({
      data: {
        universityId,
        programId,
        slug,
        title,
        type: parsedType,
        amountType: parsedAmountType,
        amountValue:
          amountValue === null ? null : new Prisma.Decimal(amountValue),
        currency: normalizeText(body.currency) || "USD",
        eligibilityCriteria: normalizeText(body.eligibilityCriteria) || null,
        description: normalizeText(body.description) || null,
        deadline: body.deadline ? new Date(body.deadline) : null,
        isActive: typeof body.isActive === "boolean" ? body.isActive : true,
      },
    });

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "Scholarship slug or unique field already exists." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create scholarship", details: String(error) },
      { status: 500 },
    );
  }
}
