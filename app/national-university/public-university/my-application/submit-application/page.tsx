"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Trash2 } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import MyApplicationTabs from "@/components/national-university/MyApplicationTabs";

const applicationsForSubmission = [
  {
    id: 1,
    university: "Chittagong University",
    program: "Undergrade - A Shaka",
    progress: 32,
  },
];

const SubmitApplicationPage = () => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("deadline");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {isSubmitModalOpen ? (
        <>
          <div className="fixed inset-0 z-40 bg-black/10" onClick={() => setIsSubmitModalOpen(false)} />
          <div className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-10 shadow-2xl z-50">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                  <svg className="w-16 h-16" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                    <circle
                      className="animate-circle"
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                    />
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

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-outfit mb-3">Your application is submitted</h2>
              <p className="text-gray-600 font-outfit text-lg mb-8">Check your status</p>
              <button
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  router.push("/national-university/public-university/my-application/check-status");
                }}
                className="px-10 py-3 bg-white text-[#E3572B] border-2 border-[#E3572B] rounded-full font-outfit font-bold text-lg hover:bg-[#E3572B] hover:text-white transition-all"
              >
                Check Status
              </button>
            </div>
          </div>
        </>
      ) : null}

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
          <MyApplicationTabs activeTab="submit-application" />

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 font-outfit mb-3">Submit Application</h1>
            <p className="text-gray-900 font-outfit text-xl md:text-2xl font-semibold leading-relaxed">
              Review your program selections here, check on status of individual program tasks, and pay for your
              program selections.
            </p>
            <p className="text-gray-900 font-outfit text-xl md:text-2xl font-semibold mt-2">
              Once your application is submitted, no changes or refunds can be made.
            </p>
          </div>

          <div className="border-y border-gray-300 py-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-8">
                <div className="pr-8 border-r border-gray-300">
                  <p className="font-outfit text-3xl md:text-[34px] text-gray-900 leading-tight">
                    Applications ready for
                    <br />
                    submission
                  </p>
                  <p className="text-5xl font-outfit text-gray-900 mt-1">0</p>
                </div>

                <div>
                  <p className="font-outfit text-4xl md:text-5xl text-gray-900 mb-2">Total Fee(s)</p>
                  <p className="font-outfit text-6xl font-medium text-gray-900">Tk 500.00</p>
                </div>
              </div>

              <button className="px-10 py-3 bg-[#F8EEDF] rounded-2xl font-outfit text-4xl text-gray-900 hover:bg-[#f2e2ca] transition-colors">
                Submit All
              </button>
            </div>
          </div>

          <div className="bg-[#FFF4EA] px-4 py-3 flex items-center gap-3 mb-6">
            <span className="font-outfit font-semibold text-xl text-gray-900">Sort By</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="px-4 py-2 rounded-full bg-[#E3572B] text-white font-outfit font-semibold text-base border-none focus:outline-none"
            >
              <option value="deadline">Deadline</option>
              <option value="alphabetical">Alphabetically</option>
            </select>
          </div>

          <div className="space-y-6">
            {applicationsForSubmission.map((application) => (
              <div key={application.id} className="bg-[#F8F0E8] rounded-3xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div>
                    <h2 className="text-5xl font-bold text-gray-900 font-outfit mb-4">{application.university}</h2>
                    <p className="text-4xl text-gray-800 font-outfit mb-6">{application.program}</p>
                    <div className="w-[290px] h-2.5 bg-[#DFCFC0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F88210] rounded-full"
                        style={{ width: `${application.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[#E7CFC8] pt-2">
                    <button className="hover:text-[#d5b8b1] transition-colors">
                      <Download size={32} />
                    </button>
                    <button className="hover:text-[#d5b8b1] transition-colors">
                      <Trash2 size={32} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="min-w-[220px] px-10 py-3 rounded-2xl bg-[#E3572B] text-white text-3xl font-outfit hover:bg-[#d95d39] transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubmitApplicationPage;

