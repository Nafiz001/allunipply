"use client";

import DashboardHeader from "@/components/layout/DashboardHeader";
import Link from "next/link";
import MyApplicationTabs from "@/components/national-university/MyApplicationTabs";

const applicationSections = [
  {
    title: "Personal Information",
    subtitle: "Fillout all the information",
    progress: 68,
    href: "/national-university/public-university/my-application/personal-information",
    items: [
      "Release & Acknowledge",
      "Statement",
      "Biometric information",
      "Contact information",
      "Other information",
    ],
  },
  {
    title: "Academic History",
    subtitle: "Fillout all the information",
    progress: 68,
    href: "/national-university/public-university/my-application/academic-history",
    items: ["College Attended", "Coursework Entry", "Gpx Entry", "Standardized Test"],
  },
];

const PublicUniversityMyApplicationPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <DashboardHeader />

      <main className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 py-10 md:py-14">
          <MyApplicationTabs activeTab="my-application" />

          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 font-outfit mb-4">My Application</h1>
            <p className="text-gray-500 font-outfit text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              This dashboard is your application home providing access to each part of the application
              <br className="hidden md:block" />
              you need to complete and a high level overview of your progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {applicationSections.map((section) => (
              <Link
                key={section.title}
                href={section.href}
                className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 hover:shadow-lg transition-shadow block"
              >
                <div className="mb-5">
                  <h3 className="text-3xl font-bold text-gray-900 font-outfit mb-1">{section.title}</h3>
                  <p className="text-gray-400 font-outfit text-sm">{section.subtitle}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="relative shrink-0">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#E3572B"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - section.progress / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900 font-outfit">{section.progress}%</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-outfit font-semibold text-gray-900 text-sm mb-2">What&apos;s included:</h4>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item} className="text-gray-500 font-outfit text-sm leading-5">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div
            className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
            style={{
              background: "linear-gradient(90deg, rgba(255, 139, 34, 1) 0%, rgba(255, 182, 116, 1) 100%)",
            }}
          >
            <div className="absolute -left-10 -top-10 w-40 h-40 border-[18px] border-white/25 rounded-full"></div>
            <div className="absolute right-8 -top-10 w-28 h-28 border-[14px] border-white/25 rounded-full"></div>
            <div className="absolute left-1/2 -bottom-16 w-48 h-48 border-[18px] border-white/25 rounded-full -translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h3 className="text-white text-4xl md:text-5xl font-bold mb-3 font-outfit">Want to give it a go again?</h3>
                <p className="text-white text-sm md:text-base font-outfit opacity-90">
                  Consult with our experts to understand how to create the best shortlist for your needs
                </p>
              </div>

              <button className="px-10 py-3 bg-white text-[#6B5CE7] rounded-full font-outfit font-semibold hover:shadow-lg transition-all whitespace-nowrap">
                Try again
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicUniversityMyApplicationPage;
