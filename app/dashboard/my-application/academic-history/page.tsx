"use client";

import MyApplicationSummaryLayout from "@/components/dashboard/MyApplicationSummaryLayout";

const AcademicHistoryPage = () => {
  return (
    <MyApplicationSummaryLayout
      title="Academic History"
      cardTitle="Academic History"
      items={["College Attended", "Coursework Entry", "Gpa Entry", "Standardized Test"]}
      progressWidthClass="w-[20%]"
    />
  );
};

export default AcademicHistoryPage;

