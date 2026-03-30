import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | allunipply",
  description: "Terms and conditions for allunipply platform.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using allunipply, you agree to these terms and applicable laws. If you do not agree, you must not use the platform.",
  },
  {
    title: "Account Responsibilities",
    body: "You are responsible for maintaining account confidentiality and all activities performed through your account. You must provide accurate and current information.",
  },
  {
    title: "Application Content",
    body: "You are solely responsible for the authenticity and legality of data and documents submitted through the platform. Misrepresentation may lead to account suspension.",
  },
  {
    title: "Platform Availability",
    body: "We aim to keep services available, but uninterrupted access is not guaranteed. We may modify, suspend, or discontinue features as needed.",
  },
  {
    title: "Fees and Payments",
    body: "Any service fees, if applicable, must be paid as displayed during checkout or onboarding. Refund policies, where applicable, are communicated separately.",
  },
  {
    title: "Intellectual Property",
    body: "All platform content, branding, and software are owned by allunipply or its licensors. You may not copy, reverse engineer, or distribute proprietary materials without permission.",
  },
  {
    title: "Limitation of Liability",
    body: "allunipply is not liable for indirect, incidental, or consequential damages arising from platform use. Admission outcomes depend on institution criteria and applicant profile.",
  },
  {
    title: "Termination",
    body: "We may suspend or terminate access for violations of these terms, legal requirements, or abuse of platform services.",
  },
  {
    title: "Contact",
    body: "For legal questions regarding these terms, contact allunipply@gmail.com.",
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <h1 className="mb-4 text-4xl font-bold text-[#E3572B]">Terms and Conditions</h1>
      <p className="mb-10 text-sm text-gray-600">Effective date: March 30, 2026</p>

      <div className="space-y-8 rounded-3xl border border-[#E9E9E9] bg-white p-6 md:p-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">{section.title}</h2>
            <p className="leading-7 text-gray-700">{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
