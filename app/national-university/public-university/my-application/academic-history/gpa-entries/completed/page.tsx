"use client";

import { useRouter } from "next/navigation";
import AcademicHistoryStepLayout from "@/components/national-university/AcademicHistoryStepLayout";

const gpaCompletedSteps = [
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

const GpaEntriesCompletedPage = () => {
  const router = useRouter();

  return (
    <AcademicHistoryStepLayout activeStep="gpa" steps={gpaCompletedSteps} title="GPA Entries">
      <div className="max-w-5xl space-y-5">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-outfit">
          The Colleges Attended section has been completed.
        </h2>

        <p className="text-base text-[#1d1d1d] font-outfit">
          <span className="text-[#E3572B] mr-1">*</span>
          You must complete the Colleges Attended portion of your application before you can complete GPA Entry
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <div>
            <label className="block text-sm text-gray-700 font-outfit mb-2">
              What is your HSC gpa <span className="text-[#E3572B]">*</span>
            </label>
            <input
              type="text"
              placeholder="0"
              className="w-full rounded-full border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-outfit mb-2">
              What is your SSC score? <span className="text-[#E3572B]">*</span>
            </label>
            <input
              type="text"
              placeholder="0"
              className="w-full rounded-full border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
          </div>
        </div>

        <button
          onClick={() =>
            router.push("/national-university/public-university/my-application/academic-history/standardized-tests")
          }
          className="inline-flex px-6 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
        >
          Save & Continue
        </button>
      </div>
    </AcademicHistoryStepLayout>
  );
};

export default GpaEntriesCompletedPage;

