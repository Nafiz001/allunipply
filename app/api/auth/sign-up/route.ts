import { NotificationType, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

type SignUpPayload = {
  fullName?: string;
  email?: string;
  password?: string;
};

function normalizeText(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function validatePayload(payload: SignUpPayload) {
  const fullName = normalizeText(payload.fullName);
  const email = normalizeEmail(normalizeText(payload.email));
  const password = normalizeText(payload.password);

  if (!fullName || !email || !password) {
    return { error: "fullName, email and password are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Invalid email format." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long." };
  }

  return {
    fullName,
    email,
    password,
  };
}

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = checkRateLimit(request, "auth:signup", {
      windowMs: 15 * 60 * 1000,
      maxRequests: 10,
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many sign-up attempts. Please try again later." },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) },
      );
    }

    const body = (await request.json()) as SignUpPayload;
    const parsed = validatePayload(body);

    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const passwordHash = await hashPassword(parsed.password);

    const createdUser = await db.user.create({
      data: {
        fullName: parsed.fullName,
        email: parsed.email,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
      },
    });

    await db.notification.create({
      data: {
        userId: createdUser.id,
        type: NotificationType.SYSTEM,
        title: "Welcome to allunipply",
        message: "Your account has been created successfully. Start your first application now.",
      },
    });

    return NextResponse.json(
      {
        data: createdUser,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Failed to sign up.", details: String(error) },
      { status: 500 },
    );
  }
}
