import { Prisma, UniversityType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type UpdateUniversityPayload = {
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

async function findUniversityOrNull(idOrSlug: string) {
  return db.university.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
  });
}

async function createUniqueUniversitySlug(baseValue: string, currentId?: string) {
  const baseSlug = toSlug(baseValue);
  let candidate = baseSlug || "university";
  let suffix = 1;

  while (true) {
    const existing = await db.university.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing || existing.id === currentId) return candidate;

    suffix += 1;
    candidate = `${baseSlug || "university"}-${suffix}`;
  }
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const university = await db.university.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        programs: {
          where: { isActive: true },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
        scholarships: {
          where: { isActive: true },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
        _count: {
          select: {
            programs: true,
            scholarships: true,
            newsArticles: true,
            applications: true,
          },
        },
      },
    });

    if (!university) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }

    return NextResponse.json({ data: university });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load university", details: String(error) },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const existing = await findUniversityOrNull(id);
    if (!existing) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }

    const body = (await request.json()) as UpdateUniversityPayload;
    const updateData: Prisma.UniversityUpdateInput = {};

    if (typeof body.name === "string") {
      const name = normalizeText(body.name);
      if (!name) {
        return NextResponse.json({ error: "name cannot be empty" }, { status: 400 });
      }
      updateData.name = name;
    }

    if (body.type !== undefined) {
      const parsedType = parseUniversityType(body.type);
      if (!parsedType) {
        return NextResponse.json(
          { error: `Invalid university type: ${String(body.type)}` },
          { status: 400 },
        );
      }
      updateData.type = parsedType;
    }

    if (typeof body.country === "string") {
      const country = normalizeText(body.country);
      if (!country) {
        return NextResponse.json({ error: "country cannot be empty" }, { status: 400 });
      }
      updateData.country = country;
    }

    if (typeof body.city === "string") {
      const city = normalizeText(body.city);
      if (!city) {
        return NextResponse.json({ error: "city cannot be empty" }, { status: 400 });
      }
      updateData.city = city;
    }

    if (body.state !== undefined) updateData.state = normalizeText(body.state) || null;
    if (body.description !== undefined) updateData.description = normalizeText(body.description) || null;
    if (body.websiteUrl !== undefined) updateData.websiteUrl = normalizeText(body.websiteUrl) || null;
    if (body.logoUrl !== undefined) updateData.logoUrl = normalizeText(body.logoUrl) || null;
    if (body.bannerImageUrl !== undefined) {
      updateData.bannerImageUrl = normalizeText(body.bannerImageUrl) || null;
    }
    if (typeof body.isActive === "boolean") updateData.isActive = body.isActive;

    if (typeof body.slug === "string" || typeof body.name === "string") {
      const slugSource =
        normalizeText(body.slug) || normalizeText(body.name) || existing.slug;
      updateData.slug = await createUniqueUniversitySlug(slugSource, existing.id);
    }

    const updated = await db.university.update({
      where: { id: existing.id },
      data: updateData,
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "University slug or unique field already exists." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Failed to update university", details: String(error) },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const existing = await findUniversityOrNull(id);
    if (!existing) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }

    await db.university.update({
      where: { id: existing.id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete university", details: String(error) },
      { status: 500 },
    );
  }
}
