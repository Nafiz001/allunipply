"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PersonalInfoStepLayout from "@/components/dashboard/PersonalInfoStepLayout";

const BiometricInformationPage = () => {
  const router = useRouter();
  const [formerName, setFormerName] = useState("yes");
  const [myName, setMyName] = useState("yes");
  const [legalSex, setLegalSex] = useState("female");

  return (
    <PersonalInfoStepLayout
      activeStep="biometric"
      title="Biometric information"
      description="Enter your contact information in this section. Keep this information up to date throughout the application process. Visit the Applicant Help Center for more information."
    >
      <div className="max-w-4xl space-y-8">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-gray-900 mb-2">Your Legal Name</h2>
          <p className="text-sm text-gray-600 font-outfit mb-1">
            To make changes to your name, go to the{" "}
            <span className="underline font-semibold">Profile Section</span>.
          </p>

          <div className="mt-5 space-y-4">
            <input
              type="text"
              placeholder="Legal First Name"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
            <input
              type="text"
              placeholder="Middle Name"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
            <input
              type="text"
              placeholder="Last or Family Name"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
          </div>
        </section>

        <hr className="border-gray-200" />

        <section className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold font-outfit text-gray-900">Former Name</h3>
            <p className="text-sm text-gray-600 font-outfit mt-1">
              <span className="text-[#E3572B] mr-1">*</span>
              Do you have any materials under a former legal name?
            </p>
            <div className="flex gap-3 mt-3">
              {["yes", "no"].map((value) => (
                <button
                  key={value}
                  onClick={() => setFormerName(value)}
                  className={`px-6 py-2 rounded-lg border text-sm font-outfit ${
                    formerName === value
                      ? "border-gray-800 text-gray-900"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  {value === "yes" ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold font-outfit text-gray-900">My Name</h3>
            <p className="text-sm text-gray-600 font-outfit mt-1">
              <span className="text-[#E3572B] mr-1">*</span>
              Would you like to share a different first name that people call you?
            </p>
            <div className="flex gap-3 mt-3">
              {["yes", "no"].map((value) => (
                <button
                  key={value}
                  onClick={() => setMyName(value)}
                  className={`px-6 py-2 rounded-lg border text-sm font-outfit ${
                    myName === value
                      ? "border-gray-800 text-gray-900"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  {value === "yes" ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold font-outfit text-gray-900">Legal Sex</h3>
            <p className="text-sm text-gray-600 font-outfit mt-1">
              <span className="text-[#E3572B] mr-1">*</span>
              For reporting purposes, how should we report your sex?
            </p>
            <div className="flex flex-wrap gap-3 mt-3">
              {[
                { key: "female", label: "Female" },
                { key: "male", label: "Male" },
                { key: "other", label: "X or another legal sex" },
                { key: "decline", label: "Decline to State" },
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setLegalSex(option.key)}
                  className={`px-4 py-2 rounded-lg border text-sm font-outfit ${
                    legalSex === option.key
                      ? "border-gray-800 text-gray-900"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h3 className="text-2xl font-bold font-outfit text-gray-900 mb-4">Birth Information</h3>
          <div className="space-y-3 max-w-md">
            <input
              type="text"
              placeholder="Select Medium"
              className="w-full rounded-lg border border-gray-200 bg-[#FDF7F1] px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
            <input
              type="text"
              placeholder="Select Country"
              className="w-full rounded-lg border border-gray-200 bg-[#FDF7F1] px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
            <input
              type="text"
              placeholder="Select Birth"
              className="w-full rounded-lg border border-gray-200 bg-[#FDF7F1] px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
            <input
              type="text"
              placeholder="Select Province of Birth"
              className="w-full rounded-lg border border-gray-200 bg-[#FDF7F1] px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
          </div>

          <button
            onClick={() => router.push("/dashboard/my-application/personal-information/contact-information")}
            className="mt-6 px-6 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
          >
            Save & Continue
          </button>
        </section>
      </div>
    </PersonalInfoStepLayout>
  );
};

export default BiometricInformationPage;

