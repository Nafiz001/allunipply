"use client";

import { useRouter } from "next/navigation";
import AcademicHistoryStepLayout from "@/components/national-university/AcademicHistoryStepLayout";

const testsSteps = [
  {
    key: "colleges" as const,
    label: "Colleges Attended",
    href: "/national-university/public-university/my-application/academic-history/colleges-attended",
  },
  {
    key: "gpa" as const,
    label: "GPA Entries",
    href: "/national-university/public-university/my-application/academic-history/gpa-entries/completed",
  },
  {
    key: "tests" as const,
    label: "Standardized Tests",
    href: "/national-university/public-university/my-application/academic-history/standardized-tests",
  },
];

const StandardizedTestsPage = () => {
  const router = useRouter();

  return (
    <AcademicHistoryStepLayout
      activeStep="tests"
      steps={testsSteps}
      title="Standardized Tests"
      description="Provide your test details if your selected programs require them."
    >
      <div className="max-w-3xl space-y-4">
        <div>
          <label className="block text-sm text-gray-700 font-outfit mb-2">Test Name</label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 font-outfit mb-2">Score</label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
          />
        </div>

        <button
          onClick={() => router.push("/national-university/public-university/my-application")}
          className="inline-flex px-6 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
        >
          Save & Continue
        </button>
      </div>
    </AcademicHistoryStepLayout>
  );
};

export default StandardizedTestsPage;

