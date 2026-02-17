"use client";

import { useRouter } from "next/navigation";
import AcademicHistoryStepLayout from "@/components/national-university/AcademicHistoryStepLayout";

const collegesSteps = [
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
  {
    key: "tests" as const,
    label: "Standardized Tests",
    href: "/national-university/public-university/my-application/academic-history/standardized-tests",
  },
];

const AddCollegePage = () => {
  const router = useRouter();

  return (
    <AcademicHistoryStepLayout
      activeStep="colleges"
      steps={collegesSteps}
      title="Colleges/ School Attended"
      description="You must review and respond to the following release statements to submit your application. Once you submit your application, your responses cannot be edited. Review these instructions and the content of the statements carefully. It is your responsibility to read and understand these statements before responding to them."
      showClose
      closeHref="/national-university/public-university/my-application/academic-history/colleges-attended"
    >
      <div className="max-w-3xl space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 font-outfit mb-3">Add a College or University</h2>
          <p className="text-sm text-gray-600 font-outfit leading-7">
            Report all institutions attended. Once you submit your application, you cannot edit previously entered
            colleges and universities, but you can add new colleges and universities.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-outfit text-gray-900 mb-2">
              <span className="text-[#E3572B] mr-1">*</span>
              What college did you attend?
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
          </div>

          <div>
            <label className="block text-sm font-outfit text-gray-900 mb-2">
              <span className="text-[#E3572B] mr-1">*</span>
              What school did you attend?
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
          </div>
        </div>

        <button
          onClick={() =>
            router.push("/national-university/public-university/my-application/academic-history/gpa-entries/completed")
          }
          className="inline-flex px-6 py-2 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
        >
          Save
        </button>
      </div>
    </AcademicHistoryStepLayout>
  );
};

export default AddCollegePage;

