"use client";

import { useRouter } from "next/navigation";
import AcademicHistoryStepLayout from "@/components/dashboard/AcademicHistoryStepLayout";

const AddCollegePage = () => {
  const router = useRouter();

  return (
    <AcademicHistoryStepLayout
      activeStep="colleges"
      title="Colleges Attended"
      description="You must review and respond to the following release statements to submit your application. Once you submit your application, your responses cannot be edited. Review these instructions and the content of the statements carefully. It's your responsibility to read and understand these statements before responding to them."
      showClose
      closeHref="/dashboard/my-application/academic-history/colleges-attended"
    >
      <div className="max-w-3xl space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 font-outfit mb-3">Add a College or University</h2>
          <p className="text-sm text-gray-600 font-outfit leading-7">
            Report all institutions attended. Once you submit your application, you cannot edit previously entered
            colleges and universities, but you can add new colleges and universities.
          </p>
        </div>

        <div>
          <label className="block text-sm font-outfit text-gray-900 mb-2">
            <span className="text-[#E3572B] mr-1">*</span>
            What college or university did you attend?
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
          />
        </div>

        <button
          onClick={() => router.push("/dashboard/my-application/academic-history/coursework-entry")}
          className="inline-flex px-6 py-2 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
        >
          Save
        </button>
      </div>
    </AcademicHistoryStepLayout>
  );
};

export default AddCollegePage;

