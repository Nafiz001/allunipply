"use client";

import { useRouter } from "next/navigation";
import AcademicHistoryStepLayout from "@/components/national-university/AcademicHistoryStepLayout";

const courseworkSteps = [
  {
    key: "colleges" as const,
    label: "Colleges Attended",
    href: "/national-university/public-university/my-application/academic-history/colleges-attended",
  },
  {
    key: "coursework" as const,
    label: "Coursework Entry",
    href: "/national-university/public-university/my-application/academic-history/coursework-entry",
  },
  {
    key: "gpa" as const,
    label: "GPA Entries",
    href: "/national-university/public-university/my-application/academic-history/gpa-entries/completed",
  },
];

const CourseworkEntryPage = () => {
  const router = useRouter();

  return (
    <AcademicHistoryStepLayout
      activeStep="coursework"
      steps={courseworkSteps}
      title="Coursework Entry"
      description="Add your completed coursework information so your academic history stays complete and ready for review."
    >
      <div className="max-w-3xl space-y-4">
        <div>
          <label className="block text-sm text-gray-700 font-outfit mb-2">Course Name</label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 font-outfit mb-2">Grade</label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
          />
        </div>

        <button
          onClick={() =>
            router.push("/national-university/public-university/my-application/academic-history/gpa-entries/completed")
          }
          className="inline-flex px-6 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
        >
          Save & Continue
        </button>
      </div>
    </AcademicHistoryStepLayout>
  );
};

export default CourseworkEntryPage;

