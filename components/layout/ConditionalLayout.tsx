"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavAndFooter =
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/otp-verification" ||
    pathname === "/course-page" ||
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/scholarship" ||
    pathname.startsWith("/scholarship/") ||
    pathname === "/my-profile" ||
    pathname === "/national-university/start-applying" ||
    pathname === "/national-university/public-university" ||
    pathname.startsWith("/national-university/public-university/");

  return (
    <div className="min-h-screen w-full overflow-x-clip">
      {!hideNavAndFooter && <Navbar />}
      {children}
      <WhatsAppButton />
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}
