import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | allunipply",
  description: "Privacy policy for allunipply platform.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "We collect account details such as name, email, password hash, and optional profile details. We also collect application-related data you submit, including academic history, program selections, and uploaded document metadata.",
  },
  {
    title: "How We Use Information",
    body: "Your data is used to create and manage your account, process university applications, track application progress, and provide platform support notifications. We may also use aggregate analytics to improve platform performance.",
  },
  {
    title: "Data Sharing",
    body: "We do not sell personal data. Application-related information may be shared with relevant institutions and authorized service providers only to deliver the requested admission workflow.",
  },
  {
    title: "Data Security",
    body: "We apply technical safeguards including authenticated access controls, password hashing, and role-based permission checks. You are responsible for protecting your credentials.",
  },
  {
    title: "Data Retention",
    body: "We retain account and application records while your account remains active or as required by legal obligations. You may request account deactivation or deletion through support channels.",
  },
  {
    title: "Your Rights",
    body: "You can request access, correction, or deletion of your personal data, subject to legal and operational constraints. You can also opt out of promotional communications where available.",
  },
  {
    title: "Contact",
    body: "For privacy-related requests, contact allunipply@gmail.com or reach us at Chittagong, Bangladesh.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <h1 className="mb-4 text-4xl font-bold text-[#E3572B]">Privacy Policy</h1>
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
