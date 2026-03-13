import { Prisma, UniversityType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 200;

type CreateUniversityPayload = {
  name?: string;
  slug?: string;
  type?: UniversityType;
  country?: string;
  city?: string;
  state?: string | null;
  description?: string | null;
  websiteUrl?: string | null;
  logoUrl?: string | null;
  bannerImageUrl?: string | null;
  isActive?: boolean;
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

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseUniversityType(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.toUpperCase();
  if (!Object.values(UniversityType).includes(normalized as UniversityType)) {
    return null;
  }
  return normalized as UniversityType;
}

async function createUniqueUniversitySlug(baseValue: string) {
  const baseSlug = toSlug(baseValue);
  let candidate = baseSlug || "university";
  let suffix = 1;

  // Ensure unique slug for the unique constraint.
  while (true) {
    const existing = await db.university.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing) return candidate;

    suffix += 1;
    candidate = `${baseSlug || "university"}-${suffix}`;
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const q = normalizeText(searchParams.get("q"));
    const country = normalizeText(searchParams.get("country"));
    const city = normalizeText(searchParams.get("city"));
    const type = parseUniversityType(searchParams.get("type"));
    const includeInactive = searchParams.get("includeInactive") === "true";

    const page = parsePositiveInt(searchParams.get("page"), DEFAULT_PAGE);
    const pageSize = Math.min(
      parsePositiveInt(searchParams.get("pageSize"), DEFAULT_PAGE_SIZE),
      MAX_PAGE_SIZE,
    );
    const skip = (page - 1) * pageSize;

    const where: Prisma.UniversityWhereInput = {
      ...(includeInactive ? {} : { isActive: true }),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { slug: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(country ? { country: { equals: country, mode: "insensitive" } } : {}),
      ...(city ? { city: { equals: city, mode: "insensitive" } } : {}),
      ...(type ? { type } : {}),
    };

    const [total, rows] = await Promise.all([
      db.university.count({ where }),
      db.university.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: {
          programs: {
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
            take: 1,
            select: {
              id: true,
              name: true,
              slug: true,
              minGpa: true,
              minIelts: true,
              tuitionAnnualUsd: true,
              durationMonths: true,
              intakeTerm: true,
              intakeYear: true,
              applicationDeadline: true,
            },
          },
          _count: {
            select: {
              programs: true,
              scholarships: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      data: rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        name: row.name,
        type: row.type,
        country: row.country,
        city: row.city,
        state: row.state,
        location: `${row.city}, ${row.country}`,
        websiteUrl: row.websiteUrl,
        logoUrl: row.logoUrl,
        bannerImageUrl: row.bannerImageUrl,
        isActive: row.isActive,
        primaryProgramId: row.programs[0]?.id ?? null,
        primaryProgramName: row.programs[0]?.name ?? null,
        primaryProgramSlug: row.programs[0]?.slug ?? null,
        primaryProgramIntakeTerm: row.programs[0]?.intakeTerm ?? null,
        primaryProgramIntakeYear: row.programs[0]?.intakeYear ?? null,
        primaryProgramApplicationDeadline: row.programs[0]?.applicationDeadline ?? null,
        minGpa: row.programs[0]?.minGpa ? Number(row.programs[0].minGpa) : null,
        minIelts: row.programs[0]?.minIelts ? Number(row.programs[0].minIelts) : null,
        tuition: row.programs[0]?.tuitionAnnualUsd
          ? Number(row.programs[0].tuitionAnnualUsd)
          : null,
        durationMonths: row.programs[0]?.durationMonths ?? null,
        programsCount: row._count.programs,
        scholarshipsCount: row._count.scholarships,
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
      { error: "Failed to load universities", details: String(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateUniversityPayload;

    const name = normalizeText(body.name);
    const country = normalizeText(body.country);
    const city = normalizeText(body.city);
    const parsedType = parseUniversityType(body.type);

    if (!name || !country || !city || !parsedType) {
      return NextResponse.json(
        {
          error:
            "Invalid payload. Required fields: name, type, country, city.",
        },
        { status: 400 },
      );
    }

    const slug = await createUniqueUniversitySlug(body.slug || name);

    const created = await db.university.create({
      data: {
        name,
        slug,
        type: parsedType,
        country,
        city,
        state: normalizeText(body.state) || null,
        description: normalizeText(body.description) || null,
        websiteUrl: normalizeText(body.websiteUrl) || null,
        logoUrl: normalizeText(body.logoUrl) || null,
        bannerImageUrl: normalizeText(body.bannerImageUrl) || null,
        isActive: typeof body.isActive === "boolean" ? body.isActive : true,
      },
    });

    return NextResponse.json(
      {
        data: created,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "University slug or unique field already exists." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create university", details: String(error) },
      { status: 500 },
    );
  }
}
