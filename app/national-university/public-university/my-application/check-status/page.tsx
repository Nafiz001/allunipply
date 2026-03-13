"use client";

import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import MyApplicationTabs from "@/components/national-university/MyApplicationTabs";

type ApiApplication = {
  id: string;
  status: string;
  progress: number;
  submittedAt: string | null;
  university: {
    name: string;
  };
  program: {
    name: string;
  };
};

function humanizeStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}

function statusClassName(status: string) {
  if (status === "OFFERED") return "text-green-600";
  if (status === "REJECTED") return "text-red-500";
  if (status === "WAITLISTED") return "text-amber-600";
  if (status === "WITHDRAWN") return "text-gray-500";
  return "text-[#E3572B]";
}

function buildProgressSteps(status: string, submittedAt: string | null) {
  const isSubmitted =
    status === "SUBMITTED" ||
    status === "UNDER_REVIEW" ||
    status === "OFFERED" ||
    status === "REJECTED" ||
    status === "WAITLISTED" ||
    status === "WITHDRAWN";

  const isUnderReview =
    status === "UNDER_REVIEW" ||
    status === "OFFERED" ||
    status === "REJECTED" ||
    status === "WAITLISTED";

  const hasDecision =
    status === "OFFERED" ||
    status === "REJECTED" ||
    status === "WAITLISTED" ||
    status === "WITHDRAWN";

  return [
    { name: "Your applied university", completed: isSubmitted },
    { name: "On progress", completed: isUnderReview },
    { name: "Done", completed: hasDecision },
    { name: "Download", completed: Boolean(submittedAt) },
  ];
}

const CheckStatusPage = () => {
  const [applications, setApplications] = useState<ApiApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadApplications = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch("/api/applications?page=1&pageSize=100", {
          cache: "no-store",
        });

        if (!response.ok) {
          const result = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(result?.error || "Failed to load application statuses.");
        }

        const result = (await response.json()) as {
          data?: ApiApplication[];
        };

        if (isMounted) {
          setApplications(result.data ?? []);
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
  }, []);

  const orderedApplications = useMemo(() => {
    return [...applications].sort((a, b) => {
      const aSubmittedAt = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
      const bSubmittedAt = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
      return bSubmittedAt - aSubmittedAt;
    });
  }, [applications]);

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MyApplicationTabs activeTab="check-status" />

        <div className="bg-[#ffe5ce] rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <h4 className="font-outfit font-bold text-gray-900 text-sm mb-2">My Program</h4>
            </div>
            <div>
              <h4 className="font-outfit font-bold text-gray-900 text-sm mb-2">Application Status</h4>
            </div>
            <div>
              <h4 className="font-outfit font-bold text-gray-900 text-sm mb-2">Download Application (PDF)</h4>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-dashed border-[#E3572B]/40 bg-white p-8 text-center text-gray-600">
            Loading statuses...
          </div>
        ) : null}

        {errorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{errorMessage}</div>
        ) : null}

        {!isLoading && !errorMessage && !orderedApplications.length ? (
          <div className="rounded-2xl border border-dashed border-[#E3572B]/40 bg-white p-8 text-center text-gray-600">
            No applications found.
          </div>
        ) : null}

        <div className="space-y-6">
          {orderedApplications.map((application) => {
            const steps = buildProgressSteps(application.status, application.submittedAt);
            const progress = Math.max(0, Math.min(application.progress, 100));
            const statusLabel = humanizeStatus(application.status);

            return (
              <div key={application.id} className="bg-[#fff4ea8f] rounded-2xl border border-gray-200 p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 font-outfit mb-1">
                      {application.university.name} - <span className={statusClassName(application.status)}>{statusLabel}</span>
                    </h3>
                    <p className="text-gray-600 font-outfit">{application.program.name}</p>
                  </div>

                  <div className="mt-2 space-y-3">
                    {steps.map((step) => (
                      <div key={step.name} className="flex items-center gap-3">
                        {step.completed ? (
                          <Check size={20} className="text-green-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                        )}
                        <span className={`font-outfit text-sm ${step.completed ? "text-green-600" : "text-gray-400"}`}>
                          {step.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="relative shrink-0">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="#E5E7EB" strokeWidth="12" fill="none" />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#E3572B"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900 font-outfit">{progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CheckStatusPage;
