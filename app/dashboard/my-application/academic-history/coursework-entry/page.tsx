"use client";

import { useRouter } from "next/navigation";
import AcademicHistoryStepLayout from "@/components/dashboard/AcademicHistoryStepLayout";

const CourseworkEntryPage = () => {
  const router = useRouter();

  return (
    <AcademicHistoryStepLayout activeStep="coursework" title="Coursework Entry">
      <div className="max-w-4xl space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-outfit">
          You do not need to enter any coursework for the programs you have selected.
        </h2>

        <button
          onClick={() => router.push("/dashboard/my-application/academic-history/colleges-attended")}
          className="inline-flex px-6 py-2 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
        >
          Back
        </button>
      </div>
    </AcademicHistoryStepLayout>
  );
};

export default CourseworkEntryPage;

