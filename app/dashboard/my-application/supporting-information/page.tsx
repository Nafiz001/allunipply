"use client";

import MyApplicationSummaryLayout from "@/components/dashboard/MyApplicationSummaryLayout";

const SupportingInformationPage = () => {
  return (
    <MyApplicationSummaryLayout
      title="Supporting Information"
      cardTitle="Supporting Information"
      items={[
        {
          label: "Documents",
          href: "/dashboard/my-application/supporting-information/documents",
        },
      ]}
      progressWidthClass="w-[20%]"
    />
  );
};

export default SupportingInformationPage;
