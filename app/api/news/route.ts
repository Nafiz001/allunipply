import { ContentStatus, NewsCategory, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 50;

type CreateNewsPayload = {
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string;
  category?: NewsCategory;
  status?: ContentStatus;
  coverImageUrl?: string | null;
  publishedAt?: string | null;
  universityId?: string | null;
  authorId?: string | null;
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

function parseNewsCategory(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.toUpperCase();
  if (!Object.values(NewsCategory).includes(normalized as NewsCategory)) {
    return null;
  }
  return normalized as NewsCategory;
}

function parseContentStatus(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.toUpperCase();
  if (!Object.values(ContentStatus).includes(normalized as ContentStatus)) {
    return null;
  }
  return normalized as ContentStatus;
}

async function createUniqueNewsSlug(baseValue: string) {
  const baseSlug = toSlug(baseValue) || "news";
  let candidate = baseSlug;
  let suffix = 1;

  while (true) {
    const existing = await db.news.findUnique({
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
    const parsedCategory = parseNewsCategory(searchParams.get("category"));
    const parsedStatus = parseContentStatus(searchParams.get("status"));
    const defaultStatus: ContentStatus = "PUBLISHED";
    const status = parsedStatus ?? defaultStatus;

    const page = parsePositiveInt(searchParams.get("page"), DEFAULT_PAGE);
    const pageSize = Math.min(
      parsePositiveInt(searchParams.get("pageSize"), DEFAULT_PAGE_SIZE),
      MAX_PAGE_SIZE,
    );
    const skip = (page - 1) * pageSize;

    const where: Prisma.NewsWhereInput = {
      status,
      ...(parsedCategory ? { category: parsedCategory } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { excerpt: { contains: q, mode: "insensitive" } },
              { content: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [total, rows] = await Promise.all([
      db.news.count({ where }),
      db.news.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        include: {
          university: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          author: {
            select: {
              id: true,
              fullName: true,
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
        excerpt: row.excerpt,
        content: row.content,
        category: row.category,
        status: row.status,
        coverImageUrl: row.coverImageUrl,
        publishedAt: row.publishedAt,
        university: row.university,
        author: row.author,
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
      { error: "Failed to load news.", details: String(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateNewsPayload;

    const title = normalizeText(body.title);
    const content = normalizeText(body.content);
    const parsedCategory = parseNewsCategory(body.category) ?? "OTHER";
    const parsedStatus = parseContentStatus(body.status) ?? "DRAFT";

    if (!title || !content) {
      return NextResponse.json(
        { error: "title and content are required." },
        { status: 400 },
      );
    }

    const slug = await createUniqueNewsSlug(normalizeText(body.slug) || title);
    const publishedAt =
      parsedStatus === "PUBLISHED"
        ? body.publishedAt
          ? new Date(body.publishedAt)
          : new Date()
        : null;

    const created = await db.news.create({
      data: {
        title,
        slug,
        excerpt: normalizeText(body.excerpt) || null,
        content,
        category: parsedCategory,
        status: parsedStatus,
        coverImageUrl: normalizeText(body.coverImageUrl) || null,
        publishedAt,
        universityId: normalizeText(body.universityId) || null,
        authorId: normalizeText(body.authorId) || null,
      },
    });

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "News slug already exists." }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Failed to create news.", details: String(error) },
      { status: 500 },
    );
  }
}
