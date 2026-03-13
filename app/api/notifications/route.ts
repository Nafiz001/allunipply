import { NotificationType, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { db } from "@/lib/db";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

type PatchNotificationsPayload = {
  ids?: string[];
  markAllRead?: boolean;
  isRead?: boolean;
};

function parsePositiveInt(value: string | null, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}

function parseNotificationType(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.toUpperCase();
  if (!Object.values(NotificationType).includes(normalized as NotificationType)) {
    return null;
  }
  return normalized as NotificationType;
}

function uniqueIds(ids: unknown) {
  if (!Array.isArray(ids)) return [];
  return [...new Set(ids.filter((id): id is string => typeof id === "string" && Boolean(id.trim())))];
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

    const unreadOnly = searchParams.get("unreadOnly") === "true";
    const parsedType = parseNotificationType(searchParams.get("type"));

    const where: Prisma.NotificationWhereInput = {
      userId: session.user.id,
      ...(unreadOnly ? { isRead: false } : {}),
      ...(parsedType ? { type: parsedType } : {}),
    };

    const [total, unreadCount, rows] = await Promise.all([
      db.notification.count({ where }),
      db.notification.count({
        where: {
          userId: session.user.id,
          isRead: false,
        },
      }),
      db.notification.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ createdAt: "desc" }],
      }),
    ]);

    return NextResponse.json({
      data: rows,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
        unreadCount,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load notifications.", details: String(error) },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = (await request.json()) as PatchNotificationsPayload;
    const ids = uniqueIds(payload.ids);
    const markAllRead = payload.markAllRead === true;
    const nextIsRead = payload.isRead === undefined ? true : Boolean(payload.isRead);

    if (!markAllRead && !ids.length) {
      return NextResponse.json(
        { error: "Provide ids or markAllRead=true." },
        { status: 400 },
      );
    }

    const updateWhere: Prisma.NotificationWhereInput = {
      userId: session.user.id,
      ...(markAllRead ? {} : { id: { in: ids } }),
    };

    await db.notification.updateMany({
      where: updateWhere,
      data: {
        isRead: nextIsRead,
        readAt: nextIsRead ? new Date() : null,
      },
    });

    const unreadCount = await db.notification.count({
      where: {
        userId: session.user.id,
        isRead: false,
      },
    });

    return NextResponse.json({ success: true, unreadCount });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update notifications.", details: String(error) },
      { status: 500 },
    );
  }
}
