"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Bell, ChevronDown, LogOut, Menu, X } from "lucide-react";

type NotificationTab = "all" | "unread";

type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  role: "STUDENT" | "COUNSELOR" | "ADMIN";
};

type ApiNotification = {
  id: string;
  type: "SYSTEM" | "APPLICATION" | "DEADLINE" | "PAYMENT" | "PROMOTION";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

const universityLinks = [
  { href: "/national-university", label: "National University" },
  { href: "/international-university", label: "International University" },
];

function getTypeIcon(type: ApiNotification["type"]) {
  if (type === "APPLICATION") return "+";
  if (type === "DEADLINE") return "!";
  if (type === "PAYMENT") return "$";
  if (type === "PROMOTION") return "*";
  return "i";
}

function formatRelativeTime(value: string) {
  const date = new Date(value);
  const now = Date.now();
  const diffMs = now - date.getTime();

  if (Number.isNaN(diffMs) || diffMs < 0) return "just now";

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "just now";
  if (diffMs < hour) return `${Math.floor(diffMs / minute)}m ago`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)}h ago`;
  return `${Math.floor(diffMs / day)}d ago`;
}

function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "U";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUniversitiesMenuOpen, setIsUniversitiesMenuOpen] = useState(false);
  const [showScholarshipAuthModal, setShowScholarshipAuthModal] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationTab, setNotificationTab] = useState<NotificationTab>("all");
  const [notifications, setNotifications] = useState<ApiNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationsLoading, setIsNotificationsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const scholarshipTarget = "/scholarship?openFilter=true";

  const isScholarshipActive = pathname === "/scholarship" || pathname.startsWith("/scholarship/");
  const isUniversitiesActive =
    pathname === "/national-university" ||
    pathname.startsWith("/national-university/") ||
    pathname === "/international-university" ||
    pathname.startsWith("/international-university/");
  const initials = currentUser ? getInitials(currentUser.fullName) : "U";

  const closeTransientMenus = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsUniversitiesMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setIsNotificationOpen(false);
  }, []);

  const loadCurrentUser = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        setCurrentUser(null);
        setNotifications([]);
        setUnreadCount(0);
        return;
      }

      const result = (await response.json()) as {
        data?: AuthUser;
      };

      setCurrentUser(result.data ?? null);
    } catch {
      setCurrentUser(null);
      setNotifications([]);
      setUnreadCount(0);
    }
  }, []);

  const loadNotifications = useCallback(async () => {
    if (!currentUser) return;

    setIsNotificationsLoading(true);

    try {
      const response = await fetch("/api/notifications?page=1&pageSize=20", {
        cache: "no-store",
      });

      if (!response.ok) return;

      const result = (await response.json()) as {
        data?: ApiNotification[];
        meta?: { unreadCount?: number };
      };

      setNotifications(result.data ?? []);
      setUnreadCount(result.meta?.unreadCount ?? 0);
    } finally {
      setIsNotificationsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    void loadCurrentUser();
  }, [loadCurrentUser, pathname]);

  useEffect(() => {
    if (currentUser) {
      void loadNotifications();
    }
  }, [currentUser, loadNotifications]);

  useEffect(() => {
    if (isNotificationOpen) {
      void loadNotifications();
    }
  }, [isNotificationOpen, loadNotifications]);

  useEffect(() => {
    closeTransientMenus();
  }, [closeTransientMenus, pathname]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      if (currentScrollY < 24) {
        setIsHeaderVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (scrollDelta > 8) {
        setIsHeaderVisible(false);
      } else if (scrollDelta < -8) {
        setIsHeaderVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (
      isMobileMenuOpen ||
      isUniversitiesMenuOpen ||
      isProfileDropdownOpen ||
      isNotificationOpen ||
      showScholarshipAuthModal
    ) {
      setIsHeaderVisible(true);
    }
  }, [
    isMobileMenuOpen,
    isUniversitiesMenuOpen,
    isProfileDropdownOpen,
    isNotificationOpen,
    showScholarshipAuthModal,
  ]);

  const visibleNotifications = useMemo(
    () =>
      notificationTab === "all"
        ? notifications
        : notifications.filter((notification) => !notification.isRead),
    [notificationTab, notifications],
  );

  const handleProtectedRoute = async (target: string) => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        cache: "no-store",
      });

      if (response.ok) {
        router.push(target);
        return;
      }
    } catch {
      // Fall back to auth prompt on network/API failure.
    }

    setShowScholarshipAuthModal(true);
  };

  const handleScholarshipClick = async () => {
    await handleProtectedRoute(scholarshipTarget);
  };

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
    } finally {
      setCurrentUser(null);
      closeTransientMenus();
      router.push("/");
      router.refresh();
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markAllRead: true }),
      });

      if (!response.ok) return;

      setNotifications((current) => current.map((item) => ({ ...item, isRead: true })));
      setUnreadCount(0);
    } catch {
      // Ignore non-critical UX action failures.
    }
  };

  const markSingleRead = async (id: string) => {
    const target = notifications.find((item) => item.id === id);
    if (!target || target.isRead) return;

    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, isRead: true } : item)),
    );
    setUnreadCount((count) => Math.max(0, count - 1));

    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: [id], isRead: true }),
      });

      if (!response.ok) {
        await loadNotifications();
      }
    } catch {
      await loadNotifications();
    }
  };

  const desktopNavLinkClass = (isActive: boolean) =>
    `rounded-full px-4 py-2.5 text-sm xl:text-[15px] font-semibold transition-all ${
      isActive
        ? "bg-[#E3572B] text-white shadow-[0_10px_28px_rgba(227,87,43,0.28)]"
        : "text-[#4f463f] hover:bg-[#fff1e7] hover:text-[#d95d39]"
    }`;

  return (
    <>
      <div
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
      {showScholarshipAuthModal ? (
        <>
          <div
            className="fixed inset-0 z-80 bg-black/35 backdrop-blur-[2px]"
            onClick={() => setShowScholarshipAuthModal(false)}
          />
          <div className="fixed inset-0 z-90 flex items-center justify-center px-4">
            <div className="w-full max-w-160 rounded-[36px] bg-[#F7EFE6] p-8 text-center shadow-2xl md:p-12">
              <h2 className="mb-10 font-outfit text-4xl font-bold text-gray-900 md:text-5xl">
                Let get you sign up first ?
              </h2>

              <div className="mx-auto max-w-[320px] space-y-5">
                <Link
                  href={`/sign-in?next=${encodeURIComponent(scholarshipTarget)}`}
                  className="block w-full rounded-full border border-[#E3572B] py-4 text-[40px] font-bold leading-none text-[#E3572B] transition-colors hover:bg-[#fff7f1]"
                >
                  Sign in
                </Link>

                <p className="font-outfit text-4xl font-bold text-gray-900">Or</p>

                <Link
                  href={`/sign-up?next=${encodeURIComponent(scholarshipTarget)}`}
                  className="block w-full rounded-full border border-[#E3572B] py-4 text-[40px] font-bold leading-none text-[#E3572B] transition-colors hover:bg-[#fff7f1]"
                >
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className="mx-auto max-w-7xl px-3 py-3 md:px-4">
        <nav className="relative rounded-[30px] bg-gray-200/50 px-4 py-3   md:px-6">
          <div className="absolute inset-x-10 top-0 h-px  " />

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 lg:gap-6">
              <Link href="/" className="flex items-center rounded-full transition-transform hover:scale-[1.01]">
                <Image src="/icons/logo.png" alt="allunipply logo" width={216} height={84} className="h-12 w-auto object-contain md:h-14" />
              </Link>

              <ul className="hidden items-center gap-1 rounded-full border border-[#f0e0d4] bg-[#fff8f3] p-1.5 lg:flex">
                <li>
                  <Link href="/" className={desktopNavLinkClass(pathname === "/")}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className={desktopNavLinkClass(pathname === "/contact")}>
                    Contact
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => void handleScholarshipClick()}
                    className={desktopNavLinkClass(isScholarshipActive)}
                    type="button"
                  >
                    Scholarship
                  </button>
                </li>
                <li className="relative">
                  <button
                    onClick={() => setIsUniversitiesMenuOpen((current) => !current)}
                    className={`${desktopNavLinkClass(isUniversitiesActive)} inline-flex items-center gap-1.5`}
                    type="button"
                  >
                    Universities
                    <ChevronDown size={16} strokeWidth={2.5} className={`transition-transform ${isUniversitiesMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isUniversitiesMenuOpen ? (
                    <div className="absolute left-0 top-full mt-3 w-64 rounded-3xl border border-[#f0ddd2] bg-white p-3 shadow-[0_22px_50px_rgba(35,24,18,0.12)]">
                      {universityLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-[#433b35] transition-colors hover:bg-[#fff2e8] hover:text-[#E3572B]"
                          onClick={() => setIsUniversitiesMenuOpen(false)}
                        >
                          {item.label}
                          <span className="text-[#E3572B]">↗</span>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </li>
              </ul>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              {currentUser ? (
                <>
                  <div className="relative">
                    <button
                      className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#f0ddd2] bg-[#fff8f3] text-[#4f463f] transition-colors hover:border-[#E3572B] hover:text-[#E3572B]"
                      onClick={() => {
                        setIsNotificationOpen((current) => !current);
                        setIsProfileDropdownOpen(false);
                      }}
                      type="button"
                    >
                      <Bell size={20} />
                      {unreadCount > 0 ? (
                        <span className="absolute right-2 top-2 min-w-4 rounded-full bg-[#E3572B] px-1 text-center text-[10px] font-bold leading-4 text-white">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      ) : null}
                    </button>

                    {isNotificationOpen ? (
                      <div className="absolute right-0 top-full mt-3 w-90 overflow-hidden rounded-[28px] border border-[#f0ddd2] bg-[#2f2a27] shadow-[0_30px_70px_rgba(20,14,10,0.28)]">
                        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-[#f1b39d]">Updates</p>
                            <h2 className="font-outfit text-2xl font-bold text-white">Notifications</h2>
                          </div>
                          <button onClick={() => setIsNotificationOpen(false)} className="text-white/70 transition-colors hover:text-white" type="button">
                            <X size={20} />
                          </button>
                        </div>

                        <div className="p-5 pb-4">
                          <div className="grid grid-cols-2 gap-2 rounded-full bg-white/5 p-1">
                            <button
                              onClick={() => setNotificationTab("all")}
                              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                                notificationTab === "all" ? "bg-[#E3572B] text-white" : "text-white/80 hover:bg-white/10"
                              }`}
                              type="button"
                            >
                              All
                            </button>
                            <button
                              onClick={() => setNotificationTab("unread")}
                              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                                notificationTab === "unread" ? "bg-[#E3572B] text-white" : "text-white/80 hover:bg-white/10"
                              }`}
                              type="button"
                            >
                              Unread
                            </button>
                          </div>
                        </div>

                        <div className="max-h-80 space-y-4 overflow-y-auto px-5 pb-4">
                          {isNotificationsLoading ? <p className="text-sm text-white/70">Loading notifications...</p> : null}
                          {!isNotificationsLoading && !visibleNotifications.length ? <p className="text-sm text-white/70">No notifications yet.</p> : null}
                          {!isNotificationsLoading
                            ? visibleNotifications.map((notification) => (
                                <button
                                  key={notification.id}
                                  type="button"
                                  onClick={() => void markSingleRead(notification.id)}
                                  className="flex w-full gap-3 rounded-[20px] bg-white/5 p-3 text-left transition-colors hover:bg-white/10"
                                >
                                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#E3572B]">
                                    <Bell size={18} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm text-white">
                                      <span className="mr-1 text-[#f1b39d]">{getTypeIcon(notification.type)}</span>
                                      {notification.title}
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-white/70">{notification.message}</p>
                                    <div className="mt-2 flex items-center gap-2">
                                      {!notification.isRead ? <span className="h-2 w-2 rounded-full bg-[#E3572B]" /> : null}
                                      <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">{formatRelativeTime(notification.createdAt)}</span>
                                    </div>
                                  </div>
                                </button>
                              ))
                            : null}
                        </div>

                        <div className="grid grid-cols-2 gap-3 border-t border-white/10 p-5">
                          <button
                            onClick={() => void handleMarkAllRead()}
                            className="rounded-2xl border border-[#E3572B] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E3572B]"
                            type="button"
                          >
                            Mark all read
                          </button>
                          <Link
                            href="/my-profile?section=help"
                            className="rounded-2xl bg-[#E3572B] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#cd4f28]"
                            onClick={() => setIsNotificationOpen(false)}
                          >
                            View all
                          </Link>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen((current) => !current);
                        setIsNotificationOpen(false);
                      }}
                      className="flex items-center gap-3 rounded-full border border-[#f0ddd2] bg-[#fff8f3] px-2.5 py-2 pr-4 text-left transition-colors hover:border-[#E3572B]"
                      type="button"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-[#E3572B] to-[#ff9d6b] text-sm font-bold text-white shadow-[0_10px_20px_rgba(227,87,43,0.22)]">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="max-w-35 truncate text-sm font-bold text-[#2f2823]">{currentUser.fullName}</p>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#9a6f5b]">{currentUser.role}</p>
                      </div>
                      <ChevronDown size={18} className={`text-[#7a675c] transition-transform ${isProfileDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isProfileDropdownOpen ? (
                      <div className="absolute right-0 top-full mt-3 w-64 rounded-3xl border border-[#f0ddd2] bg-white p-3 shadow-[0_22px_50px_rgba(35,24,18,0.12)]">
                        <Link href="/dashboard" className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[#2f2823] transition-colors hover:bg-[#fff2e8] hover:text-[#E3572B]" onClick={() => setIsProfileDropdownOpen(false)}>
                          Dashboard
                        </Link>
                        <Link href="/my-profile?section=profile" className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[#2f2823] transition-colors hover:bg-[#fff2e8] hover:text-[#E3572B]" onClick={() => setIsProfileDropdownOpen(false)}>
                          My Profile
                        </Link>
                        <Link href="/my-profile?section=payment" className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[#2f2823] transition-colors hover:bg-[#fff2e8] hover:text-[#E3572B]" onClick={() => setIsProfileDropdownOpen(false)}>
                          Payment History
                        </Link>
                        <Link href="/my-profile?section=help" className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[#2f2823] transition-colors hover:bg-[#fff2e8] hover:text-[#E3572B]" onClick={() => setIsProfileDropdownOpen(false)}>
                          Help Center
                        </Link>
                        <button onClick={() => void handleSignOut()} className="mt-1 flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-[#2f2823] transition-colors hover:bg-[#fff2e8] hover:text-[#E3572B]" type="button">
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    ) : null}
                  </div>
                </>
              ) : (
                <Link href="/sign-in" className="rounded-full border border-[#E3572B] bg-white px-6 py-3 text-sm font-bold text-[#E3572B] transition-all hover:-translate-y-0.5 hover:bg-[#E3572B] hover:text-white hover:shadow-[0_14px_32px_rgba(227,87,43,0.26)]">
                  Get Started
                </Link>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#f0ddd2] bg-[#fff8f3] text-[#2d3748] transition-colors hover:border-[#E3572B] hover:text-[#d95d39] lg:hidden"
              aria-label="Toggle menu"
              type="button"
            >
              {isMobileMenuOpen ? <X size={24} strokeWidth={2.2} /> : <Menu size={24} strokeWidth={2.2} />}
            </button>
          </div>

          <div className={`overflow-hidden transition-all duration-300 lg:hidden ${isMobileMenuOpen ? "max-h-[80vh] pt-5 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="space-y-3 border-t border-[#f4e4d7] pt-5">
              {currentUser ? (
                <div className="flex items-center gap-3 rounded-3xl bg-[#fff8f3] p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-[#E3572B] to-[#ff9d6b] text-sm font-bold text-white">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#2f2823]">{currentUser.fullName}</p>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#9a6f5b]">{currentUser.role}</p>
                  </div>
                  <Link href="/my-profile?section=profile" onClick={() => setIsMobileMenuOpen(false)} className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#E3572B]">
                    Profile
                  </Link>
                </div>
              ) : null}

              <Link href="/" className={`block rounded-full px-5 py-3 text-center text-sm font-semibold transition-colors ${pathname === "/" ? "bg-[#E3572B] text-white" : "bg-[#fff8f3] text-[#2f2823]"}`} onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/contact" className={`block rounded-full px-5 py-3 text-center text-sm font-semibold transition-colors ${pathname === "/contact" ? "bg-[#E3572B] text-white" : "bg-[#fff8f3] text-[#2f2823]"}`} onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
              <button onClick={() => { setIsMobileMenuOpen(false); void handleScholarshipClick(); }} className={`block w-full rounded-full px-5 py-3 text-center text-sm font-semibold transition-colors ${isScholarshipActive ? "bg-[#E3572B] text-white" : "bg-[#fff8f3] text-[#2f2823]"}`} type="button">
                Scholarship
              </button>

              <div className="rounded-3xl bg-[#fff8f3] p-2">
                <p className="px-3 pb-2 pt-1 text-xs uppercase tracking-[0.18em] text-[#9a6f5b]">Universities</p>
                <div className="space-y-2">
                  {universityLinks.map((item) => (
                    <Link key={item.href} href={item.href} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[#2f2823] transition-colors hover:bg-white hover:text-[#E3572B]" onClick={() => setIsMobileMenuOpen(false)}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {currentUser ? (
                <>
                  <div className="rounded-3xl bg-[#fff8f3] p-3">
                    <div className="mb-3 flex items-center justify-between px-1">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#9a6f5b]">Notifications</p>
                      {unreadCount ? <span className="rounded-full bg-[#E3572B] px-2 py-1 text-[11px] font-bold text-white">{unreadCount}</span> : null}
                    </div>
                    <div className="space-y-2">
                      {visibleNotifications.slice(0, 3).map((notification) => (
                        <button key={notification.id} type="button" onClick={() => void markSingleRead(notification.id)} className="block w-full rounded-2xl bg-white px-4 py-3 text-left">
                          <p className="text-sm font-semibold text-[#2f2823]">{notification.title}</p>
                          <p className="mt-1 text-xs text-[#6f6259]">{notification.message}</p>
                        </button>
                      ))}
                      {!visibleNotifications.length ? <p className="px-2 text-sm text-[#6f6259]">No notifications yet.</p> : null}
                    </div>
                  </div>

                  <Link href="/dashboard" className="block rounded-full bg-[#fff8f3] px-5 py-3 text-center text-sm font-semibold text-[#2f2823]" onClick={() => setIsMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <button onClick={() => void handleSignOut()} className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E3572B] px-5 py-3 text-sm font-semibold text-[#E3572B]" type="button">
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/sign-in" className="block rounded-full border border-[#E3572B] px-5 py-3 text-center text-sm font-semibold text-[#E3572B]" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
      </div>

      <div aria-hidden="true" className="h-[92px] md:h-[104px]" />
    </>
  );
};

export default Navbar;
