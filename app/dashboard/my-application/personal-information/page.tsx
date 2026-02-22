"use client";

import MyApplicationSummaryLayout from "@/components/dashboard/MyApplicationSummaryLayout";

const PersonalInformationPage = () => {
  return (
    <MyApplicationSummaryLayout
      title="Personal Information"
      cardTitle="Personal Information"
      items={[
        "Release & Acknowledge statement",
        "Biometric information",
        "Contact information",
        "Other Information",
      ]}
      progressWidthClass="w-[20%]"
    />
  );
};

export default PersonalInformationPage;

