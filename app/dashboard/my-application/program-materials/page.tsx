"use client";

import MyApplicationSummaryLayout from "@/components/dashboard/MyApplicationSummaryLayout";

const ProgramMaterialsPage = () => {
  return (
    <MyApplicationSummaryLayout
      title="Program Materials"
      cardTitle="Program Materials"
      items={["Program-details"]}
      progressWidthClass="w-[20%]"
    />
  );
};

export default ProgramMaterialsPage;

