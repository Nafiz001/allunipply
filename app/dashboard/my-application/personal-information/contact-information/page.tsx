"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PersonalInfoStepLayout from "@/components/dashboard/PersonalInfoStepLayout";

const ContactInformationPage = () => {
  const router = useRouter();
  const [isPermanentSame, setIsPermanentSame] = useState("no");

  return (
    <PersonalInfoStepLayout
      activeStep="contact"
      title="Contact information"
      description="Enter your contact information in this section. Keep this information up to date throughout the application process. Visit the Applicant Help Center for more information."
    >
      <div className="max-w-4xl space-y-8">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-gray-900 mb-4">Current Address</h2>
          <div className="max-w-xl space-y-3">
            <input
              type="text"
              placeholder="Country / Territory"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
            <input
              type="text"
              placeholder="Street Address"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
            <input
              type="text"
              placeholder="State/Province"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
          </div>
        </section>

        <hr className="border-gray-200" />

        <section>
          <p className="text-sm text-gray-700 font-outfit mb-3">
            <span className="text-[#E3572B] mr-1">*</span>
            Is this your permanent address?
          </p>
          <div className="flex gap-3">
            {["yes", "no"].map((value) => (
              <button
                key={value}
                onClick={() => setIsPermanentSame(value)}
                className={`px-6 py-2 rounded-lg border text-sm font-outfit ${
                  isPermanentSame === value
                    ? "border-gray-800 text-gray-900"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                {value === "yes" ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-[#FDF1E4] rounded-lg p-5">
          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-gray-900 mb-3">Permanent address</h2>
          <div className="max-w-xl space-y-3">
            <input
              type="text"
              placeholder="Country / Territory"
              className="w-full rounded-lg border border-[#F2E0CE] bg-white/70 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
            <input
              type="text"
              placeholder="Street Address"
              className="w-full rounded-lg border border-[#F2E0CE] bg-white/70 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full rounded-lg border border-[#F2E0CE] bg-white/70 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
            <input
              type="text"
              placeholder="State/Province"
              className="w-full rounded-lg border border-[#F2E0CE] bg-white/70 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-gray-900 mb-2">Phone & Email</h2>
          <p className="text-sm text-gray-600 font-outfit mb-4">
            To make changes to your name, go to the <span className="underline font-semibold">Profile Section</span>
          </p>
          <div className="max-w-xl space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
            <input
              type="email"
              placeholder="Confirm Email"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
            <input
              type="tel"
              placeholder="Preferred Phone Number"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
          </div>
        </section>

        <button
          onClick={() => router.push("/dashboard/my-application/personal-information/other-information")}
          className="px-6 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
        >
          Save & Continue
        </button>
      </div>
    </PersonalInfoStepLayout>
  );
};

export default ContactInformationPage;

