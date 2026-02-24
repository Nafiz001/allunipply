"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";
import SupportingInfoStepLayout from "@/components/dashboard/SupportingInfoStepLayout";

const tips = [
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

const SupportingDocumentsPage = () => {
  return (
    <SupportingInfoStepLayout activeStep="documents" title="Documents">
      <div className="max-w-5xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip) => (
            <article key={tip.title} className="rounded-2xl bg-[#FFF4EA] border border-[#F6E7D8] p-4">
              <UserRound size={14} className="text-gray-500 mb-2" />
              <h2 className="font-outfit text-lg font-semibold text-gray-900 mb-1">{tip.title}</h2>
              <p className="font-outfit text-sm text-gray-600 leading-6">{tip.body}</p>
              <button className="mt-2 font-outfit text-sm text-[#E3572B] hover:opacity-80 transition-opacity">
                Learn more
              </button>
            </article>
          ))}
        </div>

        <div className="flex justify-end">
          <p className="font-outfit text-sm text-gray-700">* Indicates required field</p>
        </div>

        <div className="rounded bg-[#FDF1E4] p-5">
          <p className="font-outfit text-xl font-semibold text-gray-900">
            <span className="text-[#E3572B] mr-1">*</span>CV/Resume
          </p>
          <Link
            href="/dashboard/my-application/supporting-information/documents/add"
            className="inline-flex mt-4 px-4 py-2 rounded-lg bg-[#E3572B] text-white text-sm font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
          >
            Add Document
          </Link>
        </div>
      </div>
    </SupportingInfoStepLayout>
  );
};

export default SupportingDocumentsPage;

