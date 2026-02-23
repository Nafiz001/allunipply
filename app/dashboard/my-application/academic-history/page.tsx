"use client";

import MyApplicationSummaryLayout from "@/components/dashboard/MyApplicationSummaryLayout";

const AcademicHistoryPage = () => {
  return (
    <MyApplicationSummaryLayout
      title="Academic History"
      cardTitle="Academic History"
      items={[
        {
          label: "Colleges Attended",
          href: "/dashboard/my-application/academic-history/colleges-attended",
        },
        {
          label: "Coursework Entry",
          href: "/dashboard/my-application/academic-history/coursework-entry",
        },
        {
          label: "GPA Entries",
          href: "/dashboard/my-application/academic-history/gpa-entries",
        },
        {
          label: "Standardized Tests",
          href: "/dashboard/my-application/academic-history/standardized-tests",
        },
      ]}
      progressWidthClass="w-[20%]"
    />
  );
};

export default AcademicHistoryPage;
