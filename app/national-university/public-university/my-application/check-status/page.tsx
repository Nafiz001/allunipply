"use client";

import { Check } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import MyApplicationTabs from "@/components/national-university/MyApplicationTabs";

const applicationStatuses = [
  {
    id: 1,
    university: "Duquesne University",
    program: "MS - Biomedical Engineering",
    status: "In Progress",
    progress: 68,
    steps: [
      { name: "Your applied university", completed: true },
      { name: "On progress", completed: true },
      { name: "Done", completed: false },
      { name: "Download", completed: false },
    ],
  },
];

const CheckStatusPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MyApplicationTabs activeTab="check-status" />

        <div className="bg-[#ffe5ce] rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <h4 className="font-outfit font-bold text-gray-900 text-sm mb-2">My Program</h4>
            </div>
            <div>
              <h4 className="font-outfit font-bold text-gray-900 text-sm mb-2">Application Status</h4>
            </div>
            <div>
              <h4 className="font-outfit font-bold text-gray-900 text-sm mb-2">Download Application (PDF)</h4>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {applicationStatuses.map((status) => (
            <div key={status.id} className="bg-[#fff4ea8f] rounded-2xl border border-gray-200 p-8">
              <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="">
                  <h3 className="text-2xl font-bold text-gray-900 font-outfit mb-1">
                    {status.university} - <span className="text-[#E3572B]">{status.status}</span>
                  </h3>
                  <p className="text-gray-600 font-outfit">{status.program}</p>
                </div>
                <div className="mt-6 space-y-3">
                  {status.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      {step.completed ? (
                        <Check size={20} className="text-green-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                      )}
                      <span className={`font-outfit text-sm ${step.completed ? "text-green-600" : "text-gray-400"}`}>
                        {step.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="relative shrink-0">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#E5E7EB" strokeWidth="12" fill="none" />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#E3572B"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - status.progress / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900 font-outfit">{status.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckStatusPage;

