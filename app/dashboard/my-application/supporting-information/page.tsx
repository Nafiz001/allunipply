"use client";

import MyApplicationSummaryLayout from "@/components/dashboard/MyApplicationSummaryLayout";

const SupportingInformationPage = () => {
  return (
    <MyApplicationSummaryLayout
      title="Supporting Information"
      cardTitle="Supporting Information"
      items={["Documents"]}
      progressWidthClass="w-[20%]"
    />
  );
};

export default SupportingInformationPage;

