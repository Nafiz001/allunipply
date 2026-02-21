"use client";

import { Check } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import MyApplicationTabs from "@/components/national-university/MyApplicationTabs";

const applicationStatuses = [
  {
    id: 1,
    university: "Chittagong University",
    program: "Undergrade - A Shaka",
    status: "In Progress",
    progress: 68,
    steps: [
      { label: "Your applied university", done: true },
      { label: "On progress", done: true },
      { label: "Done", done: false },
      { label: "Dowload", done: false },
    ],
  },
];

const CheckStatusPage = () => {
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

        <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-14">
          <MyApplicationTabs activeTab="check-status" />

          <div className="bg-[#FDE9D5] px-8 py-5 mb-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left md:text-center">
              <h3 className="font-outfit font-semibold text-[34px] text-gray-900">My Program</h3>
              <h3 className="font-outfit font-semibold text-[34px] text-gray-900">Application Status</h3>
              <h3 className="font-outfit font-semibold text-[34px] text-gray-900">Download Application (PDF)</h3>
            </div>
          </div>

          {applicationStatuses.map((application) => (
            <div key={application.id} className="bg-[#F8F0E8] px-8 py-8 md:py-10">
              <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr_auto] items-center gap-8">
                <div>
                  <h2 className="text-5xl font-bold text-gray-900 font-outfit leading-tight">
                    {application.university}-{" "}
                    <span className="text-[#FF1616]">{application.status}</span>
                  </h2>
                  <p className="text-4xl text-gray-800 font-outfit mt-4">{application.program}</p>
                </div>

                <div className="space-y-2">
                  {application.steps.map((step) => (
                    <div key={step.label} className="flex items-center gap-2">
                      <span className="text-lg font-outfit text-gray-700">{step.label}</span>
                      {step.done ? <Check size={18} className="text-[#38B87C]" /> : null}
                    </div>
                  ))}
                </div>

                <div className="relative w-28 h-28">
                  <svg className="w-28 h-28 -rotate-90">
                    <circle cx="56" cy="56" r="46" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                    <circle
                      cx="56"
                      cy="56"
                      r="46"
                      stroke="#E3572B"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 46}`}
                      strokeDashoffset={`${2 * Math.PI * 46 * (1 - application.progress / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900 font-outfit">{application.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CheckStatusPage;

