"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown, X } from "lucide-react";

type NotificationTab = "all" | "unread";

const notifications = [
  {
    id: 1,
    icon: "!",
    message: "Welcome to allunipply. Please complete your profile update",
    time: "2m ago",
    isRead: false,
  },
  {
    id: 2,
    icon: "+",
    message: "You have started your application process. Finish it before deadline.",
    time: "2m ago",
    isRead: false,
  },
  {
    id: 3,
    icon: "*",
    message: "Try our new premium package offer",
    time: "2m ago",
    isRead: false,
  },
];

const DashboardHeader = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationTab, setNotificationTab] = useState<NotificationTab>("all");

  const visibleNotifications =
    notificationTab === "all"
      ? notifications
      : notifications.filter((notification) => !notification.isRead);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="">
            <Image
              src="/icons/logo.png"
              alt="allunipply logo"
              width={216}
              height={84}
              className="object-contain"
            />
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                className="relative"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <Bell size={24} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {isNotificationOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsNotificationOpen(false)}
                  ></div>
                  <div className="fixed sm:absolute right-0 sm:right-0 top-16 sm:top-12 left-0 sm:left-auto w-full sm:w-96 bg-[#4A4A4A] rounded-t-3xl sm:rounded-3xl shadow-2xl z-40 overflow-hidden max-h-[85vh] sm:max-h-[90vh]">
                    <div className="px-6 py-5 flex items-center justify-between border-b border-gray-600">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-[#E3572B] rounded-full"></div>
                        <h2 className="text-white text-2xl font-bold font-outfit">Notification</h2>
                      </div>
                      <button
                        onClick={() => setIsNotificationOpen(false)}
                        className="text-white hover:text-gray-300 transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <div className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => setNotificationTab("all")}
                          className={`flex-1 py-3 rounded-full font-outfit font-semibold text-sm transition-all ${
                            notificationTab === "all"
                              ? "bg-[#E3572B] text-white"
                              : "bg-transparent text-white hover:bg-gray-600"
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => setNotificationTab("unread")}
                          className={`flex-1 py-3 rounded-full font-outfit font-semibold text-sm transition-all ${
                            notificationTab === "unread"
                              ? "bg-[#E3572B] text-white"
                              : "bg-transparent text-white hover:bg-gray-600"
                          }`}
                        >
                          Unread
                        </button>
                      </div>
                    </div>

                    <div className="px-6 pb-6 space-y-4 max-h-96 overflow-y-auto">
                      {visibleNotifications.map((notification) => (
                        <div key={notification.id} className="flex gap-4">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
                            <Bell size={24} className="text-[#E3572B]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-outfit text-sm mb-1">
                              <span className="mr-1">{notification.icon}</span>
                              {notification.message}
                            </p>
                            <p className="text-gray-400 text-xs font-outfit">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="px-6 pb-6">
                      <button className="w-full py-4 bg-[#E3572B] text-white rounded-2xl font-outfit font-semibold hover:bg-[#d95d39] transition-all">
                        View all notifications
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src="/icons/user-avatar.png"
                    alt="User"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <span className="text-gray-900 font-outfit font-semibold hidden sm:inline">Aklima Tul</span>
                <ChevronDown
                  size={20}
                  className={`text-gray-600 hidden sm:block transition-transform ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    href="#"
                    className="block px-4 py-3 text-gray-900 font-outfit font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Help Center
                  </Link>
                  <Link
                    href="/my-profile"
                    className="block px-4 py-3 text-gray-900 font-outfit font-semibold hover:bg-gray-50 transition-colors"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-3 text-gray-900 font-outfit font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-3 text-gray-900 font-outfit font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Payment History
                  </Link>
                  <button className="block w-full text-left px-4 py-3 text-gray-900 font-outfit font-semibold hover:bg-gray-50 transition-colors">
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            <button className="hidden lg:flex px-6 py-2 border-2 border-[#E3572B] text-[#E3572B] rounded-lg font-outfit font-semibold hover:bg-[#E3572B] hover:text-white transition-all">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
