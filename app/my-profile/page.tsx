"use client";

import Link from "next/link";
import DashboardHeader from "@/components/layout/DashboardHeader";

const profileTabs = [
  { label: "My Application", href: "/dashboard/my-application", active: true },
  { label: "Add Programs", href: "#" },
  { label: "Submit Application", href: "#" },
  { label: "Check Status", href: "#" },
];

const sidebarItems = ["My Profile", "Privacy Policy", "Payment history", "Help Center"];

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

              <h3 className="font-outfit text-2xl font-semibold text-gray-900 mb-4">Aklima Tul Jannat</h3>

              <div className="space-y-3">
                {sidebarItems.map((item, index) => (
                  <button
                    key={item}
                    className={`w-full text-left px-5 py-2.5 rounded-full border font-outfit text-sm transition-colors ${
                      index === 0
                        ? "bg-[#E3572B] text-white border-[#E3572B]"
                        : "bg-white text-gray-900 border-gray-200 hover:border-[#E3572B]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </aside>

            <section className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 font-outfit mb-4">My Profile</h1>
              <p className="text-gray-500 font-outfit text-sm leading-relaxed mb-3">
                Below is the current information used to create your account. If you need to update or change any of
                the following information, you can do that here. Once all changes are complete, click on Save Changes
                below.
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
                  <input type="email" className="w-full h-11 rounded-lg border border-gray-200 px-4 font-outfit text-sm focus:outline-none focus:border-[#E3572B]" />
                </div>

                <div>
                  <label className="block text-sm font-outfit text-gray-700 mb-1">Confirm Email*</label>
                  <input type="email" className="w-full h-11 rounded-lg border border-gray-200 px-4 font-outfit text-sm focus:outline-none focus:border-[#E3572B]" />
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
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfilePage;

