"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CircleUserRound } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { useCurrentUser } from "@/hooks/useCurrentUser";

type ProfileSection = "profile" | "privacy" | "payment" | "help";

const profileTabs = [
  { label: "My Application", href: "/dashboard/my-application", active: true },
  { label: "Add Programs", href: "#" },
  { label: "Submit Application", href: "#" },
  { label: "Check Status", href: "#" },
];

const sidebarItems: Array<{ id: ProfileSection; label: string }> = [
  { id: "profile", label: "My Profile" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "payment", label: "Payment History" },
  { id: "help", label: "Help Center" },
];

const helpItems = [
  {
    title: "Recovery my Account",
    description: "Forgot credentials, requesting account recovery support and access",
  },
  {
    title: "Recovery my Account",
    description: "Forgot credentials, requesting account recovery support and access",
  },
  {
    title: "Recovery my Account",
    description: "Forgot credentials, requesting account recovery support and access",
  },
  {
    title: "Recovery my Account",
    description: "Forgot credentials, requesting account recovery support and access",
  },
];

const ProfileContent = () => {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<ProfileSection>("profile");
  const { user, loading } = useCurrentUser();
  const fullName = user?.fullName || "Guest";

  useEffect(() => {
    const section = searchParams.get("section") as ProfileSection | null;
    if (section && ["profile", "privacy", "payment", "help"].includes(section)) {
      setActiveSection(section);
    }
  }, [searchParams]);

  const sectionTitle = useMemo(() => {
    if (activeSection === "privacy") return "Privacy Policy";
    if (activeSection === "payment") return "Payment History";
    if (activeSection === "help") return "Alluniaaply Applicant Help Center";
    return "My Profile";
  }, [activeSection]);

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="border-b border-gray-200 mb-8">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {profileTabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={`py-4 px-2 font-outfit text-sm md:text-[22px] font-medium transition-colors ${
                tab.active
                  ? "text-[#E3572B] border-b-2 border-[#E3572B]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <aside className="border-r border-gray-200 pr-6">
          <div className="w-28 h-28 border border-[#E3572B] rounded-sm bg-white flex items-center justify-center mb-3">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gray-300"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-8 rounded-t-full bg-gray-300"></div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center mb-4">
              <span className="inline-block w-32 h-8 bg-gray-200 animate-pulse rounded-lg align-middle"></span>
            </div>
          ) : (
            <h3 className="font-outfit text-2xl font-semibold text-gray-900 mb-4">{fullName}</h3>
          )}

          <div className="space-y-3">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left px-5 py-2.5 rounded-full border font-outfit text-sm transition-colors ${
                  activeSection === item.id
                    ? "bg-[#E3572B] text-white border-[#E3572B]"
                    : "bg-white text-gray-900 border-gray-200 hover:border-[#E3572B]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        <section className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 font-outfit mb-4">{sectionTitle}</h1>

          {activeSection === "profile" ? (
            <>
              <p className="text-gray-500 font-outfit text-sm leading-relaxed mb-3">
                Below is the current information used to create your account. If you need to update or change any
                of the following information, you can do that here. Once all changes are complete, click on Save
                Changes below.
              </p>
              <p className="text-[#E3572B] font-outfit text-sm mb-4">* Indicates required field</p>

              <div className="flex items-center gap-3 mb-6">
                <button className="px-5 py-2.5 rounded-full bg-[#E3572B] text-white font-outfit text-sm font-semibold hover:bg-[#d95d39] transition-colors">
                  + Upload new picture
                </button>
                <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-900 font-outfit text-sm hover:bg-gray-50 transition-colors">
                  Remove
                </button>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 font-outfit mb-4">Your Legal Name</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-outfit text-gray-700 mb-1">Legal First Name*</label>
                  <input className="w-full h-11 rounded-lg border border-gray-200 px-4 font-outfit text-sm focus:outline-none focus:border-[#E3572B]" />
                </div>

                <div>
                  <label className="block text-sm font-outfit text-gray-700 mb-1">Last or Family Name*</label>
                  <input className="w-full h-11 rounded-lg border border-gray-200 px-4 font-outfit text-sm focus:outline-none focus:border-[#E3572B]" />
                </div>

                <div>
                  <label className="block text-sm font-outfit text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    className="w-full h-11 rounded-lg border border-gray-200 px-4 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-outfit text-gray-700 mb-1">Confirm Email*</label>
                  <input
                    type="email"
                    className="w-full h-11 rounded-lg border border-gray-200 px-4 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-outfit text-gray-700 mb-1">Preferred Phone Number*</label>
                  <input className="w-full h-11 rounded-lg border border-gray-200 px-4 font-outfit text-sm focus:outline-none focus:border-[#E3572B]" />
                </div>

                <div>
                  <label className="block text-sm font-outfit text-gray-700 mb-1 uppercase">Location</label>
                  <input className="w-full h-11 rounded-lg border border-gray-200 px-4 font-outfit text-sm focus:outline-none focus:border-[#E3572B]" />
                </div>

                <div>
                  <label className="block text-sm font-outfit text-gray-700 mb-1">User Name*</label>
                  <input className="w-full h-11 rounded-lg border border-gray-200 px-4 font-outfit text-sm focus:outline-none focus:border-[#E3572B]" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 font-outfit mt-7 mb-3">Text and Phone Authorization</h3>

              <label className="flex items-start gap-3 mb-6">
                <input type="checkbox" className="mt-1 w-4 h-4 accent-[#22C5C7]" />
                <span className="text-sm text-gray-600 font-outfit leading-relaxed">
                  I agree to the Terms of Service and to receive calls and/or texts at any phone number I have
                  provided or in the future, including any wireless number, from any entity associated with my
                  application process, including invited by my designated schools and programs, the liaison
                  international support team, the association or for this centralized application service.
                </span>
              </label>

              <div className="flex items-center gap-3">
                <button className="px-8 py-2.5 rounded-lg bg-[#F4DAC3] text-gray-800 text-sm font-outfit hover:bg-[#f0d4bc] transition-colors">
                  Save
                </button>
                <button className="px-8 py-2.5 rounded-lg bg-[#E3572B] text-white text-sm font-outfit hover:bg-[#d95d39] transition-colors">
                  Reset
                </button>
              </div>
            </>
          ) : null}

          {activeSection === "privacy" ? (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 font-outfit mb-6">Security & Password</h2>

              <h3 className="text-xl font-bold text-gray-900 font-outfit mb-1">Two-factor authentication</h3>
              <p className="text-sm text-gray-600 font-outfit mb-1">Two-factor authentication (2FA)</p>
              <p className="text-sm text-gray-600 font-outfit leading-relaxed mb-4">
                Two-factor authentication (2FA) is a way to add an extra layer of security to your account. When
                you sign in with 2FA, you use your password and a verification code from a device you have with
                you, like your mobile phone.
              </p>
              <button className="px-4 py-2 rounded-lg bg-[#F4DAC3] text-gray-800 text-xs font-outfit hover:bg-[#f0d4bc] transition-colors mb-8">
                Set up two-factor auth
              </button>

              <h3 className="text-xl font-bold text-gray-900 font-outfit mb-3">Change password</h3>
              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-sm font-outfit text-gray-700 mb-1">Current Password</label>
                  <input type="password" className="w-full h-10 rounded-lg border border-gray-200 px-4 font-outfit text-sm focus:outline-none focus:border-[#E3572B]" />
                </div>
                <div>
                  <label className="block text-sm font-outfit text-gray-700 mb-1">New Password</label>
                  <input type="password" className="w-full h-10 rounded-lg border border-gray-200 px-4 font-outfit text-sm focus:outline-none focus:border-[#E3572B]" />
                </div>
                <div>
                  <label className="block text-sm font-outfit text-gray-700 mb-1">Confirm New Password</label>
                  <input type="password" className="w-full h-10 rounded-lg border border-gray-200 px-4 font-outfit text-sm focus:outline-none focus:border-[#E3572B]" />
                </div>
              </div>
              <button className="mt-4 px-5 py-2.5 rounded-lg bg-[#E3572B] text-white text-sm font-outfit hover:bg-[#d95d39] transition-colors">
                Save new password
              </button>

              <h3 className="text-xl font-bold text-gray-900 font-outfit mt-8 mb-2">Security questions</h3>
              <p className="text-sm text-gray-600 font-outfit leading-relaxed mb-4 max-w-3xl">
                If you no longer wish to use allunipply, you can deactivate your account. Keep in mind that
                deactivating your account is not the same as deleting it. You can reactivate your account at any
                time by logging in.
              </p>

              <div className="space-y-3 max-w-3xl">
                <button className="w-full flex items-center justify-between rounded-lg bg-[#FDF1E4] px-5 py-3 text-sm font-outfit text-gray-800">
                  <span>Deactivate your account</span>
                  <span className="inline-flex items-center gap-2">
                    Deactivate <ArrowRight size={14} />
                  </span>
                </button>
                <button className="w-full flex items-center justify-between rounded-lg bg-[#FDF1E4] px-5 py-3 text-sm font-outfit text-gray-800">
                  <span>Delete your account</span>
                  <span className="inline-flex items-center gap-2">
                    Delete <ArrowRight size={14} />
                  </span>
                </button>
              </div>
            </div>
          ) : null}

          {activeSection === "payment" ? (
            <div>
              <p className="text-xl md:text-2xl text-gray-800 font-outfit mb-5">
                Below is your payment history. For a copy of your receipt, select View Order Details.
              </p>
              <h2 className="text-3xl font-bold text-gray-900 font-outfit mb-6">My Payments</h2>
              <p className="text-sm text-gray-700 font-outfit">There is no payment history for this application.</p>
            </div>
          ) : null}

          {activeSection === "help" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
              {helpItems.map((item, index) => (
                <div key={`${item.title}-${index}`} className="rounded-2xl bg-[#FDF1E4] p-5">
                  <CircleUserRound size={16} className="text-gray-400 mb-2" />
                  <h3 className="text-base font-bold text-gray-900 font-outfit mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 font-outfit leading-5 mb-3">{item.description}</p>
                  <button className="inline-flex items-center gap-2 text-[#E3572B] text-sm font-outfit hover:opacity-80">
                    Learn more <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
};

const MyProfilePage = () => {
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

        <Suspense fallback={<div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">Loading...</div>}>
          <ProfileContent />
        </Suspense>
      </main>
    </div>
  );
};

export default MyProfilePage;

