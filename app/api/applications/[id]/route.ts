import {
  ApplicationSectionType,
  ApplicationStatus,
  NotificationType,
  Prisma,
  SectionStatus,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { db } from "@/lib/db";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

const MUTABLE_STATUSES: ApplicationStatus[] = ["DRAFT", "IN_PROGRESS"];

const applicationInclude = {
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
      data: true,
      startedAt: true,
      completedAt: true,
      updatedAt: true,
    },
  },
} satisfies Prisma.ApplicationInclude;

type ApplicationWithDetails = Prisma.ApplicationGetPayload<{
  include: typeof applicationInclude;
}>;

type PatchApplicationPayload = {
  action?: "submit" | "withdraw";
  status?: ApplicationStatus;
  intakeTerm?: string | null;
  intakeYear?: number | null;
  sections?: Array<{
    type?: ApplicationSectionType;
    status?: SectionStatus;
    progress?: number;
    data?: Prisma.InputJsonValue | null;
  }>;
};

function normalizeText(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function parseApplicationStatus(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.toUpperCase();
  if (!Object.values(ApplicationStatus).includes(normalized as ApplicationStatus)) {
    return null;
  }
  return normalized as ApplicationStatus;
}

function parseSectionStatus(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.toUpperCase();
  if (!Object.values(SectionStatus).includes(normalized as SectionStatus)) {
    return null;
  }
  return normalized as SectionStatus;
}

function parseSectionType(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.toUpperCase();
  if (!Object.values(ApplicationSectionType).includes(normalized as ApplicationSectionType)) {
    return null;
  }
  return normalized as ApplicationSectionType;
}

function clampProgress(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function computeApplicationProgress(
  sections: Array<{ progress: number; status: SectionStatus }>,
  fallbackProgress: number,
) {
  if (!sections.length) return fallbackProgress;

  const total = sections.reduce(
    (sum, section) => sum + clampProgress(section.progress),
    0,
  );
  return Math.round(total / sections.length);
}

function isReadyToSubmit(sections: Array<{ status: SectionStatus }>) {
  if (!sections.length) return false;
  return sections.every(
    (section) => section.status === "COMPLETED" || section.status === "SKIPPED",
  );
}

function serializeApplication(application: ApplicationWithDetails) {
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

async function getOwnedApplication(id: string, userId: string) {
  return db.application.findFirst({
    where: { id, userId },
    include: applicationInclude,
  });
}

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
    const application = await getOwnedApplication(id, session.user.id);

    if (!application) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    return NextResponse.json({ data: serializeApplication(application) });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load application.", details: String(error) },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitResult = checkRateLimit(request, `applications:update:${session.user.id}`, {
      windowMs: 5 * 60 * 1000,
      maxRequests: 60,
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many application update attempts. Please try again later." },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) },
      );
    }

    const { id } = await context.params;
    const existing = await getOwnedApplication(id, session.user.id);

    if (!existing) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    const payload = (await request.json()) as PatchApplicationPayload;
    const action = normalizeText(payload.action).toLowerCase();

    if (action === "submit") {
      if (!MUTABLE_STATUSES.includes(existing.status)) {
        return NextResponse.json(
          { error: "Only draft or in-progress applications can be submitted." },
          { status: 400 },
        );
      }

      if (!isReadyToSubmit(existing.sections)) {
        return NextResponse.json(
          {
            error:
              "Application is not ready to submit. Complete or skip all sections first.",
          },
          { status: 400 },
        );
      }

      const submitted = await db.application.update({
        where: { id: existing.id },
        data: {
          status: "SUBMITTED",
          submittedAt: new Date(),
          progress: computeApplicationProgress(existing.sections, existing.progress),
        },
        include: applicationInclude,
      });

      await db.notification.create({
        data: {
          userId: session.user.id,
          type: NotificationType.APPLICATION,
          title: "Application Submitted",
          message: `Your application for ${submitted.program.name} at ${submitted.university.name} has been submitted.`,
          payload: {
            applicationId: submitted.id,
            status: submitted.status,
            submittedAt: submitted.submittedAt,
          },
        },
      });

      return NextResponse.json({ data: serializeApplication(submitted) });
    }

    if (action === "withdraw") {
      if (existing.status === "WITHDRAWN") {
        return NextResponse.json(
          { error: "Application is already withdrawn." },
          { status: 400 },
        );
      }

      const withdrawn = await db.application.update({
        where: { id: existing.id },
        data: { status: "WITHDRAWN", decisionAt: new Date() },
        include: applicationInclude,
      });

      await db.notification.create({
        data: {
          userId: session.user.id,
          type: NotificationType.APPLICATION,
          title: "Application Withdrawn",
          message: `Your application for ${withdrawn.program.name} at ${withdrawn.university.name} was withdrawn.`,
          payload: {
            applicationId: withdrawn.id,
            status: withdrawn.status,
          },
        },
      });

      return NextResponse.json({ data: serializeApplication(withdrawn) });
    }

    if (!MUTABLE_STATUSES.includes(existing.status)) {
      return NextResponse.json(
        { error: "Only draft or in-progress applications can be edited." },
        { status: 400 },
      );
    }

    const updateData: Prisma.ApplicationUpdateInput = {};

    if (payload.intakeTerm !== undefined) {
      updateData.intakeTerm = normalizeText(payload.intakeTerm) || null;
    }

    if (payload.intakeYear !== undefined) {
      const parsedYear =
        typeof payload.intakeYear === "number" && Number.isFinite(payload.intakeYear)
          ? Math.trunc(payload.intakeYear)
          : null;
      updateData.intakeYear = parsedYear;
    }

    if (payload.status !== undefined) {
      const parsedStatus = parseApplicationStatus(payload.status);
      if (!parsedStatus || !MUTABLE_STATUSES.includes(parsedStatus)) {
        return NextResponse.json(
          {
            error:
              "Invalid status. Allowed status updates: DRAFT, IN_PROGRESS (use action=submit to submit).",
          },
          { status: 400 },
        );
      }
      updateData.status = parsedStatus;
    }

    const sectionUpdates = Array.isArray(payload.sections) ? payload.sections : [];

    const updated = await db.$transaction(async (tx) => {
      const sectionByType = new Map(existing.sections.map((section) => [section.type, section]));
      const now = new Date();

      for (const item of sectionUpdates) {
        const sectionType = parseSectionType(item.type);
        if (!sectionType) {
          return null;
        }

        const current = sectionByType.get(sectionType);
        if (!current) {
          return null;
        }

        const nextStatus =
          item.status !== undefined ? parseSectionStatus(item.status) : null;

        if (item.status !== undefined && !nextStatus) {
          return null;
        }

        const nextProgress =
          typeof item.progress === "number" && Number.isFinite(item.progress)
            ? clampProgress(item.progress)
            : null;

        const statusToUse = nextStatus ?? current.status;
        const progressToUse =
          nextProgress ??
          (statusToUse === "COMPLETED" ? 100 : statusToUse === "NOT_STARTED" ? 0 : current.progress);

        const startedAt =
          statusToUse === "IN_PROGRESS" || statusToUse === "COMPLETED" || statusToUse === "SKIPPED"
            ? current.startedAt ?? now
            : null;

        const completedAt =
          statusToUse === "COMPLETED" || statusToUse === "SKIPPED" ? now : null;

        const sectionData: Prisma.ApplicationSectionUpdateInput = {
          status: statusToUse,
          progress: clampProgress(progressToUse),
          startedAt,
          completedAt,
        };

        if (item.data !== undefined) {
          sectionData.data = item.data === null ? Prisma.JsonNull : item.data;
        }

        await tx.applicationSection.update({
          where: {
            applicationId_type: {
              applicationId: existing.id,
              type: sectionType,
            },
          },
          data: sectionData,
        });
      }

      const freshSections = await tx.applicationSection.findMany({
        where: { applicationId: existing.id },
        select: {
          status: true,
          progress: true,
        },
      });

      const progress = computeApplicationProgress(freshSections, existing.progress);

      await tx.application.update({
        where: { id: existing.id },
        data: {
          ...updateData,
          progress,
        },
      });

      return tx.application.findUnique({
        where: { id: existing.id },
        include: applicationInclude,
      });
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Invalid section update payload." },
        { status: 400 },
      );
    }

    return NextResponse.json({ data: serializeApplication(updated) });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update application.", details: String(error) },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitResult = checkRateLimit(request, `applications:delete:${session.user.id}`, {
      windowMs: 10 * 60 * 1000,
      maxRequests: 20,
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many application delete attempts. Please try again later." },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) },
      );
    }

    const { id } = await context.params;
    const existing = await getOwnedApplication(id, session.user.id);

    if (!existing) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    if (!MUTABLE_STATUSES.includes(existing.status)) {
      return NextResponse.json(
        { error: "Only draft or in-progress applications can be deleted." },
        { status: 400 },
      );
    }

    await db.application.delete({
      where: { id: existing.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete application.", details: String(error) },
      { status: 500 },
    );
  }
}
