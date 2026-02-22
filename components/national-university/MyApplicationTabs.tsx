"use client";

import Link from "next/link";

type TabKey = "my-application" | "submit-application" | "check-status";

type MyApplicationTabsProps = {
  activeTab: TabKey;
};

const tabs: Array<{ key: TabKey; label: string; href: string }> = [
  {
    key: "my-application",
    label: "My Application",
    href: "/national-university/public-university/my-application",
  },
  {
    key: "submit-application",
    label: "Submit Application",
    href: "/national-university/public-university/my-application/submit-application",
  },
  {
    key: "check-status",
    label: "Check Status",
    href: "/national-university/public-university/my-application/check-status",
  },
];

const MyApplicationTabs = ({ activeTab }: MyApplicationTabsProps) => {
  return (
    <div className="border-b border-gray-200 mb-10">
      <div className="flex items-center justify-between gap-8 md:gap-16">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={tab.href}
            className={`py-4 px-2 font-outfit text-base md:text-xl font-medium transition-colors ${
              activeTab === tab.key
                ? "text-[#E3572B] border-b-2 border-[#E3572B]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyApplicationTabs;

