"use client";

import Link from "next/link";
import DashboardHeader from "@/components/layout/DashboardHeader";

const optionLinks = [
  {
    label: "Release & Acknowledge statement",
    href: "/national-university/public-university/my-application/personal-information/release-acknowledge-statement",
  },
  {
    label: "Biometric information",
    href: "/national-university/public-university/my-application/personal-information/biometric-information",
  },
  {
    label: "Contact information",
    href: "/national-university/public-university/my-application/personal-information/contact-information",
  },
  {
    label: "Other Information",
    href: "/national-university/public-university/my-application/personal-information/other-information",
  },
];

const PersonalInformationSummaryPage = () => {
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
          <div className="border-b border-gray-200 mb-10">
            <div className="flex items-center justify-center gap-5 md:gap-12">
              <Link
                href="/national-university/public-university/my-application"
                className="py-4 px-2 font-outfit text-sm md:text-[22px] font-medium text-[#E3572B] border-b-2 border-[#E3572B]"
              >
                My Application
              </Link>
              <button className="py-4 px-2 font-outfit text-sm md:text-[22px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
                Add Programs
              </button>
              <button className="py-4 px-2 font-outfit text-sm md:text-[22px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
                Submit Application
              </button>
              <button className="py-4 px-2 font-outfit text-sm md:text-[22px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
                Check Status
              </button>
            </div>
          </div>

          <div className="flex justify-end -mt-4 mb-2">
            <Link
              href="/national-university/public-university/my-application"
              className="text-[#E3572B] text-4xl leading-none hover:opacity-80 transition-opacity"
            >
              &times;
            </Link>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 font-outfit mb-4">Personal Information</h1>
            <p className="text-gray-500 font-outfit text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              This dashboard is your application home providing access to each part of the application
              <br className="hidden md:block" />
              you need to complete and a high level overview of your progress.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-gray-900 font-outfit">Personal Information</h2>
              <p className="text-gray-400 font-outfit text-sm">Fillout all the Information</p>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-40 md:w-56 h-3 bg-[#F4DAC3] rounded-full overflow-hidden">
                <div className="h-full w-[20%] bg-[#F88210] rounded-full"></div>
              </div>
              <span className="text-xs text-gray-600 font-outfit">0/4</span>
            </div>

            <div className="space-y-3">
              {optionLinks.map((option) => (
                <Link
                  key={option.label}
                  href={option.href}
                  className="w-full block rounded-md bg-[#F4DAC3] text-gray-600 px-4 py-2 text-sm font-outfit hover:bg-[#f0d4bc] transition-colors"
                >
                  {option.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalInformationSummaryPage;
