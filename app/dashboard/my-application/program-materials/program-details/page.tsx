"use client";

import { useState } from "react";
import { UserRound, CirclePlus } from "lucide-react";
import ProgramMaterialsStepLayout from "@/components/dashboard/ProgramMaterialsStepLayout";

const uploadTips = [
  {
    title: "Recovery my Account",
    body: "Forgot credentials, requesting account recovery support and access",
  },
  {
    title: "Accepted File Types",
    body: "Forgot credentials, requesting account recovery support and access",
  },
  {
    title: "Do Not Password Protect You Documents",
    body: "Forgot credentials, requesting account recovery support and access",
  },
  {
    title: "Conceal Your Social Security Number (SSN)",
    body: "Forgot credentials, requesting account recovery support and access",
  },
];

const ProgramDetailsPage = () => {
  const [activeTab, setActiveTab] = useState<"home" | "documents">("home");
  const [fileName, setFileName] = useState("");

  return (
    <ProgramMaterialsStepLayout activeStep="programDetails" title="Program details">
      <div className="max-w-5xl space-y-6">
        <div className="grid grid-cols-2 gap-4 max-w-xl">
          <button
            onClick={() => setActiveTab("home")}
            className={`rounded-lg px-5 py-2 text-sm font-outfit font-semibold transition-colors ${
              activeTab === "home"
                ? "bg-[#E3572B] text-white"
                : "bg-white border border-[#E3572B] text-[#E3572B] hover:bg-[#fff7f3]"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`rounded-lg px-5 py-2 text-sm font-outfit font-semibold transition-colors ${
              activeTab === "documents"
                ? "bg-[#E3572B] text-white"
                : "bg-white border border-[#E3572B] text-[#E3572B] hover:bg-[#fff7f3]"
            }`}
          >
            Documents
          </button>
        </div>

        {activeTab === "home" ? (
          <div className="space-y-6">
            <p className="font-outfit text-sm md:text-base text-[#1d1d1d] leading-7">
              You want to be at the forefront of medical technological advancements that are shaping the future. As a
              biomedical engineer with a Master&apos;s degree, you will help lead the way by developing biomedical devices,
              procedures and innovative solutions. Be prepared to change the world and improve life expectancy and
              quality of life of the next generation and beyond.
            </p>

            <div>
              <p className="font-outfit text-base md:text-lg font-semibold text-gray-900 mb-2">How to apply</p>
              <ul className="list-disc pl-6 space-y-1 font-outfit text-sm md:text-base text-[#1d1d1d]">
                <li>Complete all required sections of your CAS application.</li>
                <li>In Academic History, request that official transcripts from all US institutions attended be sent to CAS.</li>
                <li>English proficiency tests are required for applicants with less than four years of undergraduate study.</li>
                <li>Upload your personal statement in the Documents tab.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-outfit mb-3">Program Details</h2>
              <ul className="list-disc pl-6 space-y-1 font-outfit text-sm md:text-base text-[#1d1d1d]">
                <li>Program Name: MS - Biomedical Engineering</li>
                <li>Start Term: Fall</li>
                <li>Start Year: 2025</li>
                <li>Application Deadline: August 1, 2025</li>
                <li>Delivery: Onsite</li>
                <li>Full-Time/Part-Time: Flexible</li>
                <li>State: PA</li>
                <li>City: Pittsburgh</li>
                <li>Program Level: Masters</li>
                <li>Accepted English Language Tests: TOEFL, IELTS, Duolingo</li>
                <li>Standardized Test Score Requirement: None</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-outfit mb-4">Upload Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {uploadTips.map((tip) => (
                  <article key={tip.title} className="rounded-2xl bg-[#FFF4EA] border border-[#F6E7D8] p-4">
                    <UserRound size={14} className="text-gray-500 mb-2" />
                    <h3 className="font-outfit text-lg font-semibold text-gray-900 mb-1">{tip.title}</h3>
                    <p className="font-outfit text-sm text-gray-600 leading-6">{tip.body}</p>
                    <button className="mt-2 font-outfit text-sm text-[#E3572B] hover:opacity-80 transition-opacity">
                      Learn more
                    </button>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-outfit mb-3">Required Documents</h2>
              <div className="rounded bg-[#FDF1E4] p-5 space-y-4">
                <div>
                  <p className="font-outfit text-xl font-semibold text-gray-900">
                    <span className="text-[#E3572B] mr-1">*</span>Personal Statement
                  </p>
                  <p className="font-outfit text-sm text-gray-600 mt-1">Select the file to upload</p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E3572B] text-white text-xs font-outfit font-semibold cursor-pointer hover:bg-[#c24d2b] transition-colors">
                      <CirclePlus size={12} />
                      Choose file
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                      />
                    </label>
                    {fileName ? <span className="text-xs text-gray-600 font-outfit">{fileName}</span> : null}
                  </div>
                  <button className="inline-flex px-8 py-2 rounded-lg bg-[#E3572B] text-white text-xs font-outfit font-semibold hover:bg-[#c24d2b] transition-colors w-fit">
                    Upload This Documents
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProgramMaterialsStepLayout>
  );
};

export default ProgramDetailsPage;

