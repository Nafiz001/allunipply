"use client";

import Link from "next/link";
import AcademicHistoryStepLayout from "@/components/dashboard/AcademicHistoryStepLayout";

const CollegesAttendedPage = () => {
  return (
    <AcademicHistoryStepLayout
      activeStep="colleges"
      title="Colleges Attended"
      description="You must review and respond to the following release statements to submit your application. Once you submit your application, your responses cannot be edited. Review these instructions and the content of the statements carefully. It's your responsibility to read and understand these statements before responding to them."
    >
      <div className="max-w-5xl space-y-6">
        <p className="text-base md:text-lg text-[#1d1d1d] font-outfit leading-8">
          Report all institutions attended, regardless of whether the coursework completed there was transferred to
          another institution. Also report each institution only once, regardless of the number of degrees earned or
          gaps in the dates of attendance. Visit the applicant help center for more information.
        </p>

        <p className="text-base md:text-lg text-[#1d1d1d] font-outfit leading-8">
          Each program decides the types of transcripts you must submit; this information is displayed on the right of
          this page. Official foreign evaluations can be requested through approved services. Be sure to review your
          program requirements and preferred evaluation services.
        </p>

        <p className="text-base md:text-lg text-[#1d1d1d] font-outfit leading-8">
          Once you submit your application, you cannot edit previously entered colleges and universities. You can add
          new institutions and update ones where your attendance is listed as still attending.
        </p>

        <Link
          href="/dashboard/my-application/academic-history/colleges-attended/add"
          className="inline-flex px-6 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
        >
          Add a college or university
        </Link>
      </div>
    </AcademicHistoryStepLayout>
  );
};

export default CollegesAttendedPage;

