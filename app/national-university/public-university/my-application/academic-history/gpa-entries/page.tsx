"use client";

import Link from "next/link";
import AcademicHistoryStepLayout from "@/components/national-university/AcademicHistoryStepLayout";

const gpaSteps = [
  {
    key: "colleges" as const,
    label: "Colleges Attended",
    href: "/national-university/public-university/my-application/academic-history/colleges-attended",
  },
  {
    key: "gpa" as const,
    label: "GPA Entries",
    href: "/national-university/public-university/my-application/academic-history/gpa-entries",
  },
];

const GpaEntriesNotCompletedPage = () => {
  return (
    <AcademicHistoryStepLayout activeStep="gpa" steps={gpaSteps} title="GPA Entries">
      <div className="max-w-4xl space-y-5">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-outfit">
          The Colleges Attended section has not been completed.
        </h2>

        <p className="text-base text-[#1d1d1d] font-outfit">
          <span className="text-[#E3572B] mr-1">*</span>
          You must complete the Colleges Attended portion of your application before you can complete GPA Entry
        </p>

        <Link
          href="/national-university/public-university/my-application/academic-history/colleges-attended"
          className="inline-flex px-6 py-2 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
        >
          Go to college attended section
        </Link>
      </div>
    </AcademicHistoryStepLayout>
  );
};

export default GpaEntriesNotCompletedPage;

