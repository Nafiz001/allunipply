import {
  ApplicationSectionType,
  ApplicationStatus,
  NotificationType,
  Program,
  SectionStatus,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { db } from "@/lib/db";

type CreateApplicationPayload = {
  universityId?: string;
  programId?: string;
  intakeTerm?: string | null;
  intakeYear?: number | null;
};

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;
const DEFAULT_SECTION_TYPES = Object.values(ApplicationSectionType);
const ACTIVE_APPLICATION_STATUSES: ApplicationStatus[] = ["DRAFT", "IN_PROGRESS"];

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

function parseApplicationStatusList(value: string | null) {
  if (!value) return null;
  const requested = value
    .split(",")
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean);

  const statuses = requested.filter((item): item is ApplicationStatus =>
    Object.values(ApplicationStatus).includes(item as ApplicationStatus),
  );

  return statuses.length ? statuses : null;
}

function computeApplicationProgress(
  sections: Array<{ progress: number; status: SectionStatus }>,
  fallbackProgress: number,
) {
  if (!sections.length) {
    return fallbackProgress;
  }

  const total = sections.reduce((sum, section) => sum + Math.max(0, Math.min(section.progress, 100)), 0);
  return Math.round(total / sections.length);
}

function isReadyToSubmit(sections: Array<{ status: SectionStatus }>) {
  if (!sections.length) return false;

  return sections.every(
    (section) => section.status === "COMPLETED" || section.status === "SKIPPED",
  );
}

function serializeApplication(
  application: {
    id: string;
    userId: string;
    universityId: string;
    programId: string;
    intakeTerm: string | null;
    intakeYear: number | null;
    status: ApplicationStatus;
    progress: number;
    submittedAt: Date | null;
    decisionAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    university: { id: string; name: string; slug: string; country: string; city: string };
    program: {
      id: string;
      name: string;
      slug: string;
      intakeTerm: string | null;
      intakeYear: number | null;
      applicationDeadline: Date | null;
    };
    sections: Array<{
      id: string;
      type: ApplicationSectionType;
      status: SectionStatus;
      progress: number;
      startedAt: Date | null;
      completedAt: Date | null;
      updatedAt: Date;
    }>;
  },
) {
  const progress = computeApplicationProgress(application.sections, application.progress);

  return {
    id: application.id,
    userId: application.userId,
    universityId: application.universityId,
    programId: application.programId,
    intakeTerm: application.intakeTerm ?? application.program.intakeTerm,
    intakeYear: application.intakeYear ?? application.program.intakeYear,
    status: application.status,
    progress,
    submittedAt: application.submittedAt,
    decisionAt: application.decisionAt,
    readyToSubmit: isReadyToSubmit(application.sections),
    university: application.university,
    program: application.program,
    sections: application.sections,
    createdAt: application.createdAt,
    updatedAt: application.updatedAt,
  };
}

async function getProgramForApplication(
  payload: CreateApplicationPayload,
): Promise<Pick<Program, "id" | "universityId" | "intakeTerm" | "intakeYear"> | null> {
  const programId = normalizeText(payload.programId);
  const universityId = normalizeText(payload.universityId);

  if (programId) {
    const program = await db.program.findUnique({
      where: { id: programId },
      select: {
        id: true,
        universityId: true,
        intakeTerm: true,
        intakeYear: true,
        isActive: true,
      },
    });

    if (!program || !program.isActive) {
      return null;
    }

    if (universityId && program.universityId !== universityId) {
      return null;
    }

    return {
      id: program.id,
      universityId: program.universityId,
      intakeTerm: program.intakeTerm,
      intakeYear: program.intakeYear,
    };
  }

  if (!universityId) {
    return null;
  }

  return db.program.findFirst({
    where: {
      universityId,
      isActive: true,
    },
    orderBy: [{ applicationDeadline: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      universityId: true,
      intakeTerm: true,
      intakeYear: true,
    },
  });
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

    const universityId = normalizeText(searchParams.get("universityId"));
    const programId = normalizeText(searchParams.get("programId"));
    const statuses = parseApplicationStatusList(searchParams.get("status"));

    const where = {
      userId: session.user.id,
      ...(universityId ? { universityId } : {}),
      ...(programId ? { programId } : {}),
      ...(statuses ? { status: { in: statuses } } : {}),
    };

    const [total, rows] = await Promise.all([
      db.application.count({ where }),
      db.application.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ updatedAt: "desc" }],
        include: {
          university: {
            select: {
              id: true,
              name: true,
              slug: true,
              country: true,
              city: true,
            },
          },
          program: {
            select: {
              id: true,
              name: true,
              slug: true,
              intakeTerm: true,
              intakeYear: true,
              applicationDeadline: true,
            },
          },
          sections: {
            orderBy: { createdAt: "asc" },
            select: {
              id: true,
              type: true,
              status: true,
              progress: true,
              startedAt: true,
              completedAt: true,
              updatedAt: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      data: rows.map(serializeApplication),
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load applications.", details: String(error) },
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

    const payload = (await request.json()) as CreateApplicationPayload;
    const program = await getProgramForApplication(payload);

    if (!program) {
      return NextResponse.json(
        { error: "Valid universityId/programId is required to create application." },
        { status: 400 },
      );
    }

    const existingDraft = await db.application.findFirst({
      where: {
        userId: session.user.id,
        programId: program.id,
        status: {
          in: ACTIVE_APPLICATION_STATUSES,
        },
      },
      include: {
        university: {
          select: {
            id: true,
            name: true,
            slug: true,
            country: true,
            city: true,
          },
        },
        program: {
          select: {
            id: true,
            name: true,
            slug: true,
            intakeTerm: true,
            intakeYear: true,
            applicationDeadline: true,
          },
        },
        sections: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            type: true,
            status: true,
            progress: true,
            startedAt: true,
            completedAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (existingDraft) {
      return NextResponse.json({ data: serializeApplication(existingDraft) }, { status: 200 });
    }

    const intakeTerm = normalizeText(payload.intakeTerm) || program.intakeTerm;
    const intakeYear =
      typeof payload.intakeYear === "number" && Number.isFinite(payload.intakeYear)
        ? Math.trunc(payload.intakeYear)
        : program.intakeYear;

    const created = await db.application.create({
      data: {
        userId: session.user.id,
        universityId: program.universityId,
        programId: program.id,
        intakeTerm,
        intakeYear,
        status: "IN_PROGRESS",
        progress: 0,
        sections: {
          create: DEFAULT_SECTION_TYPES.map((sectionType) => ({
            type: sectionType,
            status: "NOT_STARTED",
            progress: 0,
          })),
        },
      },
      include: {
        university: {
          select: {
            id: true,
            name: true,
            slug: true,
            country: true,
            city: true,
          },
        },
        program: {
          select: {
            id: true,
            name: true,
            slug: true,
            intakeTerm: true,
            intakeYear: true,
            applicationDeadline: true,
          },
        },
        sections: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            type: true,
            status: true,
            progress: true,
            startedAt: true,
            completedAt: true,
            updatedAt: true,
          },
        },
      },
    });

    await db.notification.create({
      data: {
        userId: session.user.id,
        type: NotificationType.APPLICATION,
        title: "Application Started",
        message: `Your application for ${created.program.name} at ${created.university.name} has started.`,
        payload: {
          applicationId: created.id,
          programId: created.programId,
          universityId: created.universityId,
          status: created.status,
        },
      },
    });

    return NextResponse.json({ data: serializeApplication(created) }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create application.", details: String(error) },
      { status: 500 },
    );
  }
}
