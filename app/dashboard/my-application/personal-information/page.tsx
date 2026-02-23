"use client";

import MyApplicationSummaryLayout from "@/components/dashboard/MyApplicationSummaryLayout";

const PersonalInformationPage = () => {
  return (
    <MyApplicationSummaryLayout
      title="Personal Information"
      cardTitle="Personal Information"
      items={[
        {
          label: "Release & Acknowledge statement",
          href: "/dashboard/my-application/personal-information/release-acknowledge-statement",
        },
        {
          label: "Biometric information",
          href: "/dashboard/my-application/personal-information/biometric-information",
        },
        {
          label: "Contact information",
          href: "/dashboard/my-application/personal-information/contact-information",
        },
        {
          label: "Other Information",
          href: "/dashboard/my-application/personal-information/other-information",
        },
      ]}
      progressWidthClass="w-[20%]"
    />
  );
};

export default PersonalInformationPage;
