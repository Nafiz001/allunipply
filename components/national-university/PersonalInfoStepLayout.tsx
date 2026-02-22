"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";

type StepKey = "release" | "biometric" | "contact" | "other";

type PersonalInfoStepLayoutProps = {
  activeStep: StepKey;
  title: string;
  description: string;
  children: React.ReactNode;
};

const stepLinks: Array<{ key: StepKey; label: string; href: string }> = [
  {
    key: "release",
    label: "Release & Acknowledge statement",
    href: "/national-university/public-university/my-application/personal-information/release-acknowledge-statement",
  },
  {
    key: "biometric",
    label: "Biometric information",
    href: "/national-university/public-university/my-application/personal-information/biometric-information",
  },
  {
    key: "contact",
    label: "Contact information",
    href: "/national-university/public-university/my-application/personal-information/contact-information",
  },
  {
    key: "other",
    label: "Other Information",
    href: "/national-university/public-university/my-application/personal-information/other-information",
  },
];

const PersonalInfoStepLayout = ({
  activeStep,
  title,
  description,
  children,
}: PersonalInfoStepLayoutProps) => {
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

        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex items-center justify-between gap-8 md:gap-16">
              <Link
                href="/national-university/public-university/my-application"
                className="py-4 px-2 font-outfit text-sm md:text-[22px] font-medium text-[#E3572B] border-b-2 border-[#E3572B]"
              >
                My Application
              </Link>
              <button className="py-4 px-2 font-outfit text-sm md:text-[22px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
                Submit Application
              </button>
              <button className="py-4 px-2 font-outfit text-sm md:text-[22px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
                Check Status
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
            <aside className="lg:sticky lg:top-4 h-fit">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="#F4DAC3" strokeWidth="8" fill="none" />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#F88210"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * 0.75}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <FileText size={24} className="text-[#F88210]" />
                  </div>
                </div>
                <p className="text-xs text-gray-600 font-outfit mt-1">0/4</p>
                <h3 className="font-outfit font-bold text-3xl text-gray-900 mt-1">Personal Information</h3>
              </div>

              <div className="space-y-3">
                {stepLinks.map((step) => (
                  <Link
                    key={step.key}
                    href={step.href}
                    className={`w-full block rounded-full px-4 py-2.5 text-sm font-outfit transition-colors ${
                      activeStep === step.key
                        ? "bg-[#E3572B] text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-[#E3572B]"
                    }`}
                  >
                    {step.label}
                  </Link>
                ))}
              </div>
            </aside>

            <section>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 font-outfit mb-4">{title}</h1>
              <p className="text-gray-500 font-outfit text-sm md:text-base max-w-4xl leading-relaxed mb-8">
                {description}
              </p>
              {children}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalInfoStepLayout;
