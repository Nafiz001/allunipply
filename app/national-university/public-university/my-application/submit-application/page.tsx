"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Download } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import MyApplicationTabs from "@/components/national-university/MyApplicationTabs";

const applicationsForSubmission = [
  {
    id: 1,
    university: "Duquesne University",
    program: "MS - Biomedical Engineering",
    deadline: "08/01/2025",
    term: "Fall",
    progress: 100,
    ready: true,
  },
];

const SubmitApplicationPage = () => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("deadline");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {isSubmitModalOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsSubmitModalOpen(false)}></div>

          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 p-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                  <svg className="w-16 h-16" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                    <circle className="animate-circle" cx="26" cy="26" r="25" fill="none" stroke="white" strokeWidth="3" />
                    <path
                      className="animate-check"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 26l8 8 16-16"
                    />
                  </svg>
                </div>
              </div>

              <style jsx>{`
                @keyframes scale-in {
                  0% {
                    transform: scale(0);
                    opacity: 0;
                  }
                  50% {
                    transform: scale(1.1);
                  }
                  100% {
                    transform: scale(1);
                    opacity: 1;
                  }
                }

                @keyframes draw-circle {
                  0% {
                    stroke-dasharray: 0, 157;
                  }
                  100% {
                    stroke-dasharray: 157, 157;
                  }
                }

                @keyframes draw-check {
                  0% {
                    stroke-dashoffset: 50;
                  }
                  100% {
                    stroke-dashoffset: 0;
                  }
                }

                .animate-scale-in {
                  animation: scale-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .animate-circle {
                  stroke-dasharray: 157;
                  stroke-dashoffset: 0;
                  animation: draw-circle 0.6s ease-out forwards;
                  animation-delay: 0.2s;
                  stroke-dasharray: 0, 157;
                }

                .animate-check {
                  stroke-dasharray: 50;
                  stroke-dashoffset: 50;
                  animation: draw-check 0.4s ease-out forwards;
                  animation-delay: 0.6s;
                }
              `}</style>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-outfit mb-4">Your application is submitted</h2>
              <p className="text-gray-600 font-outfit text-lg mb-8">Check your status</p>

              <button
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  router.push("/national-university/public-university/my-application/check-status");
                }}
                className="px-12 py-4 bg-white text-[#E3572B] border-2 border-[#E3572B] rounded-full font-outfit font-bold text-lg hover:bg-[#E3572B] hover:text-white transition-all"
              >
                Check Status
              </button>
            </div>
          </div>
        </>
      )}

      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MyApplicationTabs activeTab="submit-application" />

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-outfit mb-3">Submit Application</h1>
          <p className="text-gray-700 font-outfit text-sm max-w-3xl mx-auto mb-2">
            Review your program selections here, check on status of individual program tasks, and pay for your program selections.
          </p>
          <p className="text-gray-700 font-outfit text-sm font-semibold">
            Once your application is submitted, no changes or refunds can be made.
          </p>
        </div>

        <div className=" rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <p className="text-gray-700 font-outfit text-sm mb-1">Applications ready for submission</p>
            <p className="text-5xl font-bold text-gray-900 font-outfit">0</p>
          </div>
          <div>
            <p className="text-gray-700 font-outfit text-sm mb-1">Total Fee(s)</p>
            <p className="text-5xl font-bold text-gray-900 font-outfit">$58.00</p>
          </div>
          <button className="px-10 py-3 bg-[#FFF4EA] text-gray-900 rounded-lg font-outfit font-semibold border-2 border-gray-300 hover:border-[#E3572B] transition-all">
            Submit All
          </button>
        </div>

        <div className="bg-[#FFF4EA]  p-4 flex items-center gap-2 mb-6">
          <span className="font-outfit text-sm text-gray-700">Sort By</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="px-3 py-2 rounded-full bg-[#E3572B] text-white font-outfit font-semibold text-sm border-none focus:outline-none cursor-pointer"
          >
            <option value="deadline">Deadline</option>
            <option value="university">University</option>
            <option value="program">Program</option>
          </select>
        </div>

        <div className="space-y-6">
          {applicationsForSubmission.map((application) => (
            <div key={application.id}>
              <div className="bg-[#F4EEEA] rounded-[28px] p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-10">
                  <div>
                    <h3 className="text-[20px] leading-tight md:text-[32px] font-bold text-gray-900 font-outfit mb-4">
                      {application.university}
                    </h3>
                    <p className="text-[30px] leading-snug text-gray-800 font-outfit mb-8">{application.program}</p>
                    <div className="w-full max-w-[320px] bg-[#E3DCD4] h-[8px] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F08A24] rounded-full transition-all"
                        style={{ width: `${Math.max(0, Math.min(application.progress, 100)) * 0.3}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-3 md:pt-1">
                    <div className="flex items-center gap-2">
                      <span className="font-outfit text-[20px] text-gray-900">Deadline :</span>
                      <span className="font-outfit text-[20px] text-gray-900">{application.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-outfit text-[20px] text-gray-900">Term :</span>
                      <span className="font-outfit text-[20px] text-gray-900">{application.term}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 md:pt-1">
                    <button className="text-[#E7CFC8] hover:text-[#D9B4AA] transition-colors">
                      <Download size={34} />
                    </button>
                    <button className="text-[#E7CFC8] hover:text-[#D9B4AA] transition-colors">
                      <Trash2 size={34} />
                    </button>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="min-w-[230px] px-10 py-3 bg-[#E3572B] text-white rounded-[22px] font-outfit text-[24px] leading-none hover:bg-[#d95d39] transition-all"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmitApplicationPage;

