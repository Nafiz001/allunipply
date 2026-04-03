"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
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
  const [isUserLoading, setIsUserLoading] = useState(true);
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
      setIsUserLoading(true);
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
    } finally {
      setIsUserLoading(false);
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
    `px-3 py-1.5 text-[13px] xl:text-sm font-medium transition-all duration-200 rounded-full ${
      isActive
        ? "text-[#E3572B] font-semibold bg-[#E3572B]/[0.06]"
        : "text-[#5a5a5a] hover:text-[#E3572B] hover:bg-[#E3572B]/[0.04]"
    }`;

  return (
    <>
      {showScholarshipAuthModal ? (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={() => setShowScholarshipAuthModal(false)}
          />
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
          >
            <div className="relative w-full max-w-[560px] rounded-[36px] bg-[#F7EFE6] p-8 md:p-12 text-center shadow-2xl border border-white/20">
              <button
                onClick={() => setShowScholarshipAuthModal(false)}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.05] text-gray-500 transition-all duration-200 hover:bg-black/[0.1] hover:text-gray-800"
                type="button"
                aria-label="Close"
              >
                <X size={18} strokeWidth={2} />
              </button>
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-8">Sign in to continue</h2>
              <div className="space-y-4 max-w-[280px] mx-auto">
                <Link
                  href={`/sign-in?next=${encodeURIComponent(scholarshipTarget)}`}
                  className="block w-full rounded-full bg-[#E3572B] text-white font-outfit font-bold text-xl py-4 hover:bg-[#c24d2b] transition-all hover:-translate-y-1 shadow-lg shadow-orange-200"
                >
                  Sign in
                </Link>
                <p className="font-outfit text-xl font-bold text-gray-500">or</p>
                <Link
                  href={`/sign-up?next=${encodeURIComponent(scholarshipTarget)}`}
                  className="block w-full rounded-full border-2 border-[#E3572B] text-[#E3572B] font-outfit font-bold text-xl py-4 hover:bg-white transition-all hover:-translate-y-1"
                >
                  Create account
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}

      <div
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
      <div className="mx-auto max-w-7xl px-3 pt-3 pb-2 md:px-6 md:pt-5">
        {/* Single pill capsule — logo + links + CTA all inside one container */}
        <nav className="relative flex w-full min-w-0 items-center gap-1.5 md:gap-3 rounded-2xl md:rounded-full bg-white/80 backdrop-blur-xl border border-black/[0.06] px-2.5 py-1.5 md:px-5 md:py-2 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center rounded-full transition-transform duration-200 hover:scale-[1.02]">
            <Image src="/icons/logo.png" alt="allunipply logo" width={216} height={84} className="h-6 w-auto max-w-[118px] object-contain sm:h-7 sm:max-w-[142px] md:h-10 md:max-w-none" />
          </Link>

          {/* Divider */}
          <div className="hidden lg:block h-4 w-px bg-black/[0.08] mx-1" />

          {/* Desktop nav links — flat, no inner pill */}
          <ul className="hidden items-center gap-0 lg:flex flex-1">
            <li>
              {pathname === "/" ? (
                <Link
                  href="/"
                  className="rotating-border-glow inline-flex items-center rounded-full px-3 py-1.5 text-[13px] xl:text-sm font-semibold bg-white text-[#E3572B] transition-all duration-200 relative z-[1]"
                >
                  ✦ S-genie
                </Link>
              ) : (
                <Link href="/" className={desktopNavLinkClass(false)}>
                  Home
                </Link>
              )}
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
                className={`${desktopNavLinkClass(isUniversitiesActive)} inline-flex items-center gap-0.5`}
                type="button"
              >
                Universities
                <ChevronDown size={13} strokeWidth={2} className={`transition-transform duration-200 ${isUniversitiesMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {isUniversitiesMenuOpen ? (
                <div className="absolute left-0 top-full mt-2 w-60 rounded-2xl border border-black/[0.06] bg-white/95 backdrop-blur-xl p-2 shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
                  {universityLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-[#433b35] transition-all duration-200 hover:bg-[#E3572B]/[0.05] hover:text-[#E3572B]"
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
          {/* Right side: user controls + mobile hamburger */}
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2 lg:gap-3">
              {currentUser ? (
                <>
                  <div className="hidden min-[360px]:block md:relative">
                    <button
                      className="relative flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full border border-black/[0.06] bg-white/60 text-[#4f463f] transition-all duration-200 hover:border-[#E3572B]/30 hover:text-[#E3572B] hover:bg-[#E3572B]/[0.04]"
                      onClick={() => {
                        if (!isNotificationOpen) {
                          setIsNotificationsLoading(true);
                        }
                        setIsNotificationOpen((current) => !current);
                        setIsProfileDropdownOpen(false);
                      }}
                      type="button"
                    >
                      <Bell size={18} className="w-[18px] h-[18px]" />
                      {unreadCount > 0 ? (
                        <span className="absolute -right-1 -top-1 lg:right-2 lg:top-2 min-w-4 rounded-full bg-[#E3572B] px-1 text-center text-[10px] font-bold leading-4 text-white">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      ) : null}
                    </button>

                    {isNotificationOpen ? (
                      <div className="absolute left-0 right-0 max-w-[calc(100vw-1.5rem)] md:left-auto md:w-80 md:max-w-none lg:w-90 top-full mt-3 overflow-hidden rounded-[28px] border border-[#f0ddd2] bg-white shadow-[0_30px_70px_rgba(20,14,10,0.15)] z-[100]">
                        <div className="flex items-center justify-between border-b border-[#f0ddd2] px-5 py-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-[#9a6f5b]">Updates</p>
                            <h2 className="font-outfit text-2xl font-bold text-[#2f2823]">Notifications</h2>
                          </div>
                          <button onClick={() => setIsNotificationOpen(false)} className="text-[#9a6f5b] transition-colors hover:text-[#E3572B]" type="button">
                            <X size={20} />
                          </button>
                        </div>

                        <div className="p-5 pb-4">
                          <div className="grid grid-cols-2 gap-2 rounded-full bg-[#fff8f3] p-1 border border-[#f0ddd2]">
                            <button
                              onClick={() => setNotificationTab("all")}
                              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                                notificationTab === "all" ? "bg-[#E3572B] text-white" : "text-[#4f463f] hover:bg-[#fff2e8]"
                              }`}
                              type="button"
                            >
                              All
                            </button>
                            <button
                              onClick={() => setNotificationTab("unread")}
                              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                                notificationTab === "unread" ? "bg-[#E3572B] text-white" : "text-[#4f463f] hover:bg-[#fff2e8]"
                              }`}
                              type="button"
                            >
                              Unread
                            </button>
                          </div>
                        </div>

                        <div className="max-h-80 space-y-4 overflow-y-auto px-5 pb-4">
                          {isNotificationsLoading ? (
                            <div className="space-y-3">
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="flex w-full gap-3 rounded-[20px] bg-[#fff8f3] border border-[#f0ddd2] p-3 animate-pulse">
                                  <div className="h-11 w-11 shrink-0 rounded-full bg-gray-200/60" />
                                  <div className="min-w-0 flex-1 space-y-2 py-1">
                                    <div className="h-4 w-3/4 rounded bg-gray-200/60" />
                                    <div className="h-3 w-full rounded bg-gray-200/60" />
                                    <div className="h-3 w-1/4 rounded bg-gray-200/60 mt-2" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}
                          {!isNotificationsLoading && !visibleNotifications.length ? <p className="text-sm text-[#7a675c] text-center pt-2">No notifications yet.</p> : null}
                          {!isNotificationsLoading
                            ? visibleNotifications.map((notification) => (
                                <button
                                  key={notification.id}
                                  type="button"
                                  onClick={() => void markSingleRead(notification.id)}
                                  className="flex w-full gap-3 rounded-[20px] bg-[#fff8f3] border border-[#f0ddd2] p-3 text-left transition-colors hover:bg-[#fff2e8]"
                                >
                                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#E3572B] shadow-sm">
                                    <Bell size={18} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm text-[#2f2823]">
                                      <span className="mr-1 text-[#E3572B] font-bold">{getTypeIcon(notification.type)}</span>
                                      {notification.title}
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-[#4f463f]">{notification.message}</p>
                                    <div className="mt-2 flex items-center gap-2">
                                      {!notification.isRead ? <span className="h-2 w-2 rounded-full bg-[#E3572B]" /> : null}
                                      <span className="text-[11px] uppercase tracking-[0.18em] text-[#9a6f5b]">{formatRelativeTime(notification.createdAt)}</span>
                                    </div>
                                  </div>
                                </button>
                              ))
                            : null}
                        </div>

                        <div className="grid grid-cols-2 gap-3 border-t border-[#f0ddd2] p-5">
                          <button
                            onClick={() => void handleMarkAllRead()}
                            className="rounded-2xl border border-[#E3572B] px-4 py-3 text-sm font-semibold text-[#E3572B] transition-colors hover:bg-[#fff8f3]"
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

                  <div className="hidden min-[400px]:block md:relative">
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen((current) => !current);
                        setIsNotificationOpen(false);
                      }}
                      className="flex items-center gap-2 lg:gap-2.5 rounded-full border border-black/[0.06] bg-white/60 p-1 lg:px-2 lg:py-1.5 lg:pr-3.5 text-left transition-all duration-200 hover:border-[#E3572B]/30 hover:bg-[#E3572B]/[0.03]"
                      type="button"
                    >
                      <div className="flex h-9 w-9 lg:h-10 lg:w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#E3572B] to-[#ff9d6b] text-xs font-bold text-white shadow-[0_4px_12px_rgba(227,87,43,0.2)]">
                        {initials}
                      </div>
                      <div className="hidden lg:block min-w-0">
                        <p className="max-w-35 truncate text-sm font-bold text-[#2f2823]">{currentUser.fullName}</p>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#9a6f5b]">{currentUser.role}</p>
                      </div>
                      <ChevronDown size={18} className={`hidden lg:block text-[#7a675c] transition-transform ${isProfileDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isProfileDropdownOpen ? (
                      <div className="absolute left-0 right-0 max-w-[calc(100vw-1.5rem)] md:left-auto md:w-64 md:max-w-none top-full mt-3 rounded-3xl border border-[#f0ddd2] bg-white p-3 shadow-[0_22px_50px_rgba(35,24,18,0.12)] z-[100]">
                        <div className="mb-2 px-4 py-2 lg:hidden">
                          <p className="truncate text-sm font-bold text-[#2f2823]">{currentUser.fullName}</p>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#9a6f5b]">{currentUser.role}</p>
                        </div>
                        <div className="mb-2 h-px bg-[#f0ddd2] lg:hidden" />
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
              ) : isUserLoading ? (
                <div className="hidden lg:block w-[96px] h-[40px] rounded-full bg-gray-200/40 animate-pulse border border-black/[0.05]" />
              ) : (
                <div className="hidden lg:block">
                  <Link
                    href="/sign-in"
                    className="rotating-border-glow-cta inline-flex rounded-full bg-[#E3572B] px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 relative z-[1]"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              <button
                onClick={() => setIsMobileMenuOpen((current) => !current)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-white/60 text-[#4f463f] transition-all duration-200 hover:border-[#E3572B]/30 hover:text-[#E3572B] hover:bg-[#E3572B]/[0.04] lg:hidden"
                aria-label="Toggle menu"
                type="button"
              >
                {isMobileMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
              </button>
          </div>

        </nav>

        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isMobileMenuOpen ? "mt-2 max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-black/[0.06] bg-white/95 p-3 shadow-[0_14px_34px_rgba(20,14,10,0.12)] backdrop-blur-xl">
            <div className="space-y-2">
              <Link
                href="/"
                className={`block rounded-xl px-4 py-3 text-center text-sm font-semibold transition-all duration-200 ${
                  pathname === "/" ? "bg-[#E3572B] text-white" : "bg-black/[0.03] text-[#4f463f]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/contact"
                className={`block rounded-xl px-4 py-3 text-center text-sm font-semibold transition-all duration-200 ${
                  pathname === "/contact" ? "bg-[#E3572B] text-white" : "bg-black/[0.03] text-[#4f463f]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  void handleScholarshipClick();
                }}
                className={`block w-full rounded-xl px-4 py-3 text-center text-sm font-semibold transition-all duration-200 ${
                  isScholarshipActive ? "bg-[#E3572B] text-white" : "bg-black/[0.03] text-[#4f463f]"
                }`}
                type="button"
              >
                Scholarship
              </button>

              <div className="rounded-xl border border-black/[0.06] bg-[#fbfbfb] p-2.5">
                <p className="px-2 pb-2 text-[11px] uppercase tracking-[0.18em] text-[#9a6f5b]">Universities</p>
                <div className="space-y-1">
                  {universityLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#4f463f] transition-colors hover:bg-[#E3572B]/[0.05] hover:text-[#E3572B]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {currentUser ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block rounded-xl bg-black/[0.03] px-4 py-3 text-center text-sm font-semibold text-[#4f463f]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/my-profile"
                    className="block rounded-xl bg-black/[0.03] px-4 py-3 text-center text-sm font-semibold text-[#4f463f]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => void handleSignOut()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-sm font-semibold text-[#4f463f]"
                    type="button"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </>
              ) : isUserLoading ? (
                <div className="h-[44px] w-full rounded-xl border border-black/[0.05] bg-gray-200/40 animate-pulse" />
              ) : (
                <Link
                  href="/sign-in"
                  className="block rounded-xl bg-[#E3572B] px-4 py-3 text-center text-sm font-semibold text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>

      <div aria-hidden="true" className="h-[80px] md:h-[92px]" />

      <style>{`
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotate-border {
          to { --border-angle: 360deg; }
        }

        /* S-genie: white bg pill with orange rotating line */
        .rotating-border-glow {
          --border-angle: 0deg;
          border: 1.5px solid transparent;
          background:
            linear-gradient(white, white) padding-box,
            conic-gradient(
              from var(--border-angle),
              transparent 60%,
              rgba(227,87,43,0.8) 78%,
              rgba(227,87,43,1) 90%,
              rgba(227,87,43,0.8) 95%,
              transparent 100%
            ) border-box;
          animation: rotate-border 2.8s linear infinite;
          box-shadow: 0 0 10px rgba(227,87,43,0.15), 0 0 20px rgba(227,87,43,0.08);
        }
        .rotating-border-glow:hover {
          box-shadow: 0 0 14px rgba(227,87,43,0.3), 0 0 28px rgba(227,87,43,0.15);
        }

        /* Get Started: orange bg pill with brighter rotating line */
        .rotating-border-glow-cta {
          --border-angle: 0deg;
          border: 1.5px solid transparent;
          background:
            linear-gradient(#E3572B, #E3572B) padding-box,
            conic-gradient(
              from var(--border-angle),
              rgba(227,87,43,0.6) 55%,
              rgba(255,255,255,0.9) 78%,
              rgba(255,255,255,1) 90%,
              rgba(255,255,255,0.9) 95%,
              rgba(227,87,43,0.6) 100%
            ) border-box;
          animation: rotate-border 2.8s linear infinite;
          box-shadow: 0 0 16px rgba(227,87,43,0.45), 0 0 32px rgba(227,87,43,0.2);
        }
        .rotating-border-glow-cta:hover {
          box-shadow: 0 0 24px rgba(227,87,43,0.65), 0 0 48px rgba(227,87,43,0.35);
        }
      `}</style>
    </>
  );
};

export default Navbar;
