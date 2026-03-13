"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import MyApplicationTabs from "@/components/national-university/MyApplicationTabs";

type ApplicationSectionType =
  | "PERSONAL_INFORMATION"
  | "ACADEMIC_HISTORY"
  | "SUPPORTING_INFORMATION"
  | "PROGRAM_MATERIALS"
  | "REVIEW_AND_SUBMIT";

type ApiApplication = {
  id: string;
  status: string;
  progress: number;
  intakeTerm: string | null;
  intakeYear: number | null;
  readyToSubmit: boolean;
  university: {
    id: string;
    name: string;
    slug: string;
    country: string;
    city: string;
  };
  program: {
    id: string;
    name: string;
    slug: string;
    intakeTerm: string | null;
    intakeYear: number | null;
    applicationDeadline: string | null;
  };
  sections: Array<{
    id: string;
    type: ApplicationSectionType;
    status: string;
    progress: number;
  }>;
};

const sectionCardConfig: Array<{
  type: ApplicationSectionType;
  title: string;
  subtitle: string;
  href: string;
  items: string[];
}> = [
  {
    type: "PERSONAL_INFORMATION",
    title: "Personal Information",
    subtitle: "Fillout all the information",
    href: "/national-university/public-university/my-application/personal-information",
    items: [
      "Release & Acknowledge",
      "Statement",
      "Biometric information",
      "Contact information",
      "Other information",
    ],
  },
  {
    type: "ACADEMIC_HISTORY",
    title: "Academic History",
    subtitle: "Fillout all the information",
    href: "/national-university/public-university/my-application/academic-history",
    items: ["College Attended", "Coursework Entry", "Gpx Entry", "Standardized Test"],
  },
];

const PublicUniversityMyApplicationPage = () => {
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams.toString();
  const [applications, setApplications] = useState<ApiApplication[]>([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadApplications = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const params = new URLSearchParams(searchParamsKey);
        const universityId = params.get("universityId")?.trim() || "";
        const programId = params.get("programId")?.trim() || "";

        if (universityId || programId) {
          const createResponse = await fetch("/api/applications", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              universityId: universityId || undefined,
              programId: programId || undefined,
            }),
          });

          if (!createResponse.ok) {
            const createResult = (await createResponse.json().catch(() => null)) as {
              error?: string;
            } | null;
            throw new Error(createResult?.error || "Failed to initialize application.");
          }
        }

        const response = await fetch("/api/applications?page=1&pageSize=50", {
          cache: "no-store",
        });

        if (!response.ok) {
          const result = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(result?.error || "Failed to load applications.");
        }

        const result = (await response.json()) as {
          data?: ApiApplication[];
        };

        const list = result.data ?? [];

        if (isMounted) {
          setApplications(list);

          const requestedId = params.get("applicationId")?.trim();
          if (requestedId && list.some((item) => item.id === requestedId)) {
            setSelectedApplicationId(requestedId);
          } else {
            const preferred = list.find(
              (item) => item.status === "DRAFT" || item.status === "IN_PROGRESS",
            );
            setSelectedApplicationId((current) => current ?? preferred?.id ?? list[0]?.id ?? null);
          }
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadApplications();

    return () => {
      isMounted = false;
    };
  }, [searchParamsKey]);

  const selectedApplication = useMemo(() => {
    if (!applications.length) return null;
    if (selectedApplicationId) {
      const matched = applications.find((item) => item.id === selectedApplicationId);
      if (matched) return matched;
    }

    return applications[0];
  }, [applications, selectedApplicationId]);

  const sectionProgressByType = useMemo(() => {
    const map = new Map<ApplicationSectionType, number>();

    selectedApplication?.sections.forEach((section) => {
      map.set(section.type, Math.max(0, Math.min(section.progress, 100)));
    });

    return map;
  }, [selectedApplication]);

  const linkWithApplicationId = (href: string) => {
    if (!selectedApplication) return href;
    return `${href}?applicationId=${selectedApplication.id}`;
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <DashboardHeader />

      <main className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 py-10 md:py-14">
          <MyApplicationTabs activeTab="my-application" />

          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 font-outfit mb-4">My Application</h1>
            <p className="text-gray-500 font-outfit text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              This dashboard is your application home providing access to each part of the application
              <br className="hidden md:block" />
              you need to complete and a high level overview of your progress.
            </p>
            {selectedApplication ? (
              <p className="mt-3 text-gray-700 font-outfit text-sm md:text-base">
                {selectedApplication.university.name} | {selectedApplication.program.name}
              </p>
            ) : null}
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-dashed border-[#E3572B]/40 bg-white p-8 text-center text-gray-600 mb-12">
              Loading applications...
            </div>
          ) : null}

          {errorMessage ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 mb-12">
              {errorMessage}
            </div>
          ) : null}

          {!isLoading && !errorMessage && !applications.length ? (
            <div className="rounded-2xl border border-dashed border-[#E3572B]/40 bg-white p-8 text-center text-gray-600 mb-12">
              <p className="mb-4">No applications found yet.</p>
              <Link
                href="/national-university/public-university"
                className="inline-flex px-6 py-2 rounded-full border border-[#E3572B] text-[#E3572B] hover:bg-[#FFF4EA]"
              >
                Browse universities
              </Link>
            </div>
          ) : null}

          {!isLoading && !errorMessage && applications.length ? (
            <div className="mb-8 flex items-center justify-end">
              <label className="font-outfit text-sm text-gray-600 mr-2" htmlFor="application-select">
                Active Application
              </label>
              <select
                id="application-select"
                value={selectedApplication?.id ?? ""}
                onChange={(event) => setSelectedApplicationId(event.target.value || null)}
                className="rounded-full border border-gray-300 bg-white px-4 py-2 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
              >
                {applications.map((application) => (
                  <option key={application.id} value={application.id}>
                    {application.university.name} - {application.program.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {!isLoading && !errorMessage && selectedApplication ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {sectionCardConfig.map((section) => {
                const progress = sectionProgressByType.get(section.type) ?? 0;

                return (
                  <Link
                    key={section.type}
                    href={linkWithApplicationId(section.href)}
                    className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 hover:shadow-lg transition-shadow block"
                  >
                    <div className="mb-5">
                      <h3 className="text-3xl font-bold text-gray-900 font-outfit mb-1">{section.title}</h3>
                      <p className="text-gray-400 font-outfit text-sm">{section.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="relative shrink-0">
                        <svg className="w-24 h-24 transform -rotate-90">
                          <circle cx="48" cy="48" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="#E3572B"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-gray-900 font-outfit">{progress}%</span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h4 className="font-outfit font-semibold text-gray-900 text-sm mb-2">What&apos;s included:</h4>
                        <ul className="space-y-1">
                          {section.items.map((item) => (
                            <li key={item} className="text-gray-500 font-outfit text-sm leading-5">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : null}

          <div
            className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
            style={{
              background: "linear-gradient(90deg, rgba(255, 139, 34, 1) 0%, rgba(255, 182, 116, 1) 100%)",
            }}
          >
            <div className="absolute -left-10 -top-10 w-40 h-40 border-[18px] border-white/25 rounded-full"></div>
            <div className="absolute right-8 -top-10 w-28 h-28 border-[14px] border-white/25 rounded-full"></div>
            <div className="absolute left-1/2 -bottom-16 w-48 h-48 border-[18px] border-white/25 rounded-full -translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h3 className="text-white text-4xl md:text-5xl font-bold mb-3 font-outfit">Want to give it a go again?</h3>
                <p className="text-white text-sm md:text-base font-outfit opacity-90">
                  Consult with our experts to understand how to create the best shortlist for your needs
                </p>
              </div>

              <Link
                href="/national-university/public-university?openFinder=true"
                className="px-10 py-3 bg-white text-[#6B5CE7] rounded-full font-outfit font-semibold hover:shadow-lg transition-all whitespace-nowrap"
              >
                Try again
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicUniversityMyApplicationPage;
