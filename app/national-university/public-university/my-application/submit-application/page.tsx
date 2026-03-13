"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Download } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import MyApplicationTabs from "@/components/national-university/MyApplicationTabs";

type ApiApplication = {
  id: string;
  status: string;
  progress: number;
  readyToSubmit: boolean;
  intakeTerm: string | null;
  intakeYear: number | null;
  university: {
    name: string;
  };
  program: {
    name: string;
    applicationDeadline: string | null;
  };
};

function formatDate(dateValue: string | null) {
  if (!dateValue) return "Deadline not set";

  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return "Deadline not set";

  return parsed.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

function formatTerm(term: string | null, year: number | null) {
  if (term && year) return `${term} ${year}`;
  if (term) return term;
  if (year) return String(year);
  return "Not set";
}

const SubmitApplicationPage = () => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("deadline");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [applications, setApplications] = useState<ApiApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmittingAll, setIsSubmittingAll] = useState(false);
  const [submittingApplicationId, setSubmittingApplicationId] = useState<string | null>(null);

  const loadApplications = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        "/api/applications?page=1&pageSize=100&status=DRAFT,IN_PROGRESS,SUBMITTED,UNDER_REVIEW,OFFERED,REJECTED,WAITLISTED,WITHDRAWN",
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error || "Failed to load applications.");
      }

      const result = (await response.json()) as { data?: ApiApplication[] };
      setApplications(result.data ?? []);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadApplications();
  }, []);

  const sortableApplications = useMemo(() => {
    const mutable = applications.filter(
      (application) => application.status === "DRAFT" || application.status === "IN_PROGRESS",
    );

    mutable.sort((a, b) => {
      if (sortBy === "university") {
        return a.university.name.localeCompare(b.university.name);
      }

      if (sortBy === "program") {
        return a.program.name.localeCompare(b.program.name);
      }

      const aDate = a.program.applicationDeadline ? new Date(a.program.applicationDeadline).getTime() : Number.MAX_SAFE_INTEGER;
      const bDate = b.program.applicationDeadline ? new Date(b.program.applicationDeadline).getTime() : Number.MAX_SAFE_INTEGER;
      return aDate - bDate;
    });

    return mutable;
  }, [applications, sortBy]);

  const readyApplications = useMemo(
    () => sortableApplications.filter((application) => application.readyToSubmit),
    [sortableApplications],
  );

  const totalFee = readyApplications.length * 58;

  const submitApplication = async (applicationId: string) => {
    setSubmittingApplicationId(applicationId);
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "submit" }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error || "Failed to submit application.");
      }

      setIsSubmitModalOpen(true);
      await loadApplications();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit application.");
    } finally {
      setSubmittingApplicationId(null);
    }
  };

  const submitAllApplications = async () => {
    if (!readyApplications.length) return;

    setIsSubmittingAll(true);
    setErrorMessage(null);

    try {
      const results = await Promise.all(
        readyApplications.map(async (application) => {
          const response = await fetch(`/api/applications/${application.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ action: "submit" }),
          });

          if (!response.ok) {
            const result = (await response.json().catch(() => null)) as { error?: string } | null;
            throw new Error(result?.error || `Failed to submit ${application.program.name}`);
          }

          return response;
        }),
      );

      if (results.length) {
        setIsSubmitModalOpen(true);
      }

      await loadApplications();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit all applications.");
    } finally {
      setIsSubmittingAll(false);
    }
  };

  const deleteApplication = async (applicationId: string) => {
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error || "Failed to delete application.");
      }

      await loadApplications();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to delete application.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {isSubmitModalOpen ? (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsSubmitModalOpen(false)}></div>

          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 p-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                  <svg className="w-16 h-16" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                    <circle className="animate-circle" cx="26" cy="26" r="25" fill="none" stroke="white" strokeWidth="3" />
                    <path
                      className="animate-check"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 26l8 8 16-16"
                    />
                  </svg>
                </div>
              </div>

              <style jsx>{`
                @keyframes scale-in {
                  0% {
                    transform: scale(0);
                    opacity: 0;
                  }
                  50% {
                    transform: scale(1.1);
                  }
                  100% {
                    transform: scale(1);
                    opacity: 1;
                  }
                }

                @keyframes draw-circle {
                  0% {
                    stroke-dasharray: 0, 157;
                  }
                  100% {
                    stroke-dasharray: 157, 157;
                  }
                }

                @keyframes draw-check {
                  0% {
                    stroke-dashoffset: 50;
                  }
                  100% {
                    stroke-dashoffset: 0;
                  }
                }

                .animate-scale-in {
                  animation: scale-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .animate-circle {
                  stroke-dasharray: 157;
                  stroke-dashoffset: 0;
                  animation: draw-circle 0.6s ease-out forwards;
                  animation-delay: 0.2s;
                  stroke-dasharray: 0, 157;
                }

                .animate-check {
                  stroke-dasharray: 50;
                  stroke-dashoffset: 50;
                  animation: draw-check 0.4s ease-out forwards;
                  animation-delay: 0.6s;
                }
              `}</style>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-outfit mb-4">Your application is submitted</h2>
              <p className="text-gray-600 font-outfit text-lg mb-8">Check your status</p>

              <button
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  router.push("/national-university/public-university/my-application/check-status");
                }}
                className="px-12 py-4 bg-white text-[#E3572B] border-2 border-[#E3572B] rounded-full font-outfit font-bold text-lg hover:bg-[#E3572B] hover:text-white transition-all"
              >
                Check Status
              </button>
            </div>
          </div>
        </>
      ) : null}

      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MyApplicationTabs activeTab="submit-application" />

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-outfit mb-3">Submit Application</h1>
          <p className="text-gray-700 font-outfit text-sm max-w-3xl mx-auto mb-2">
            Review your program selections here, check on status of individual program tasks, and pay for your program selections.
          </p>
          <p className="text-gray-700 font-outfit text-sm font-semibold">
            Once your application is submitted, no changes or refunds can be made.
          </p>
        </div>

        {errorMessage ? (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{errorMessage}</div>
        ) : null}

        <div className="rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <p className="text-gray-700 font-outfit text-sm mb-1">Applications ready for submission</p>
            <p className="text-5xl font-bold text-gray-900 font-outfit">{readyApplications.length}</p>
          </div>
          <div>
            <p className="text-gray-700 font-outfit text-sm mb-1">Total Fee(s)</p>
            <p className="text-5xl font-bold text-gray-900 font-outfit">${totalFee.toFixed(2)}</p>
          </div>
          <button
            onClick={() => void submitAllApplications()}
            disabled={isSubmittingAll || !readyApplications.length}
            className="px-10 py-3 bg-[#FFF4EA] text-gray-900 rounded-lg font-outfit font-semibold border-2 border-gray-300 hover:border-[#E3572B] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmittingAll ? "Submitting..." : "Submit All"}
          </button>
        </div>

        <div className="bg-[#FFF4EA] p-4 flex items-center gap-2 mb-6">
          <span className="font-outfit text-sm text-gray-700">Sort By</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="px-3 py-2 rounded-full bg-[#E3572B] text-white font-outfit font-semibold text-sm border-none focus:outline-none cursor-pointer"
          >
            <option value="deadline">Deadline</option>
            <option value="university">University</option>
            <option value="program">Program</option>
          </select>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-dashed border-[#E3572B]/40 bg-white p-8 text-center text-gray-600">
            Loading applications...
          </div>
        ) : null}

        {!isLoading && !sortableApplications.length ? (
          <div className="rounded-2xl border border-dashed border-[#E3572B]/40 bg-white p-8 text-center text-gray-600">
            No draft or in-progress applications found.
          </div>
        ) : null}

        <div className="space-y-6">
          {sortableApplications.map((application) => {
            const deadline = formatDate(application.program.applicationDeadline);
            const term = formatTerm(application.intakeTerm, application.intakeYear);

            return (
              <div key={application.id}>
                <div className="bg-[#F4EEEA] rounded-[28px] p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-10">
                    <div>
                      <h3 className="text-[20px] leading-tight md:text-[32px] font-bold text-gray-900 font-outfit mb-4">
                        {application.university.name}
                      </h3>
                      <p className="text-[30px] leading-snug text-gray-800 font-outfit mb-8">{application.program.name}</p>
                      <div className="w-full max-w-[320px] bg-[#E3DCD4] h-[8px] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#F08A24] rounded-full transition-all"
                          style={{ width: `${Math.max(0, Math.min(application.progress, 100))}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-3 md:pt-1">
                      <div className="flex items-center gap-2">
                        <span className="font-outfit text-[20px] text-gray-900">Deadline :</span>
                        <span className="font-outfit text-[20px] text-gray-900">{deadline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-outfit text-[20px] text-gray-900">Term :</span>
                        <span className="font-outfit text-[20px] text-gray-900">{term}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-5 md:pt-1">
                      <button type="button" className="text-[#E7CFC8] hover:text-[#D9B4AA] transition-colors" aria-label="Download application PDF">
                        <Download size={34} />
                      </button>
                      <button
                        type="button"
                        onClick={() => void deleteApplication(application.id)}
                        className="text-[#E7CFC8] hover:text-[#D9B4AA] transition-colors"
                        aria-label="Delete draft application"
                      >
                        <Trash2 size={34} />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => void submitApplication(application.id)}
                      disabled={submittingApplicationId === application.id || !application.readyToSubmit}
                      className="min-w-[230px] px-10 py-3 bg-[#E3572B] text-white rounded-[22px] font-outfit text-[24px] leading-none hover:bg-[#d95d39] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submittingApplicationId === application.id ? "Submitting..." : "Submit"}
                    </button>
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

export default SubmitApplicationPage;
