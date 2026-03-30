import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Share2,
  Twitter,
  Youtube,
} from "lucide-react";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "National Universities", href: "/national-university" },
  { label: "International Universities", href: "/international-university" },
  { label: "Scholarships", href: "/scholarship" },
];

const supportLinks = [
  { label: "Contact us", href: "/contact" },
  { label: "Sign In", href: "/sign-in" },
  { label: "Create Account", href: "/sign-up" },
];

const contactItems = [
  { icon: Phone, label: "Phone", value: "+880-1531-395312" },
  { icon: Mail, label: "Email", value: "allunipply@gmail.com" },
  { icon: MapPin, label: "Address", value: "Chittagong, Bangladesh" },
];

const socialLinks = [
  {
    label: "Twitter",
    href: "#",
    icon: Twitter,
    className: "bg-[#1DA1F2] hover:bg-[#1a8cd8]",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/iniastratech",
    icon: Facebook,
    className: "bg-[#1877F2] hover:bg-[#145dbf]",
  },
  {
    label: "Instagram",
    href: "#",
    icon: Instagram,
    className:
      "bg-[linear-gradient(135deg,#833AB4_0%,#FD1D1D_55%,#FCAF45_100%)]",
  },
  {
    label: "YouTube",
    href: "#",
    icon: Youtube,
    className: "bg-[#FF0000] hover:bg-[#cc0000]",
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: Linkedin,
    className: "bg-[#0A66C2] hover:bg-[#084d94]",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#fff4ea] px-4 pb-6 pt-14 md:px-6">
      <div className="mx-auto max-w-7xl font-outfit">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="mb-6 inline-flex">
            <Image
              src="/icons/logo.png"
              alt="allunipply logo"
              width={185}
              height={60}
              className="h-auto w-[150px] object-contain md:w-[185px]"
            />
          </Link>

          <p className="max-w-3xl text-sm leading-7 text-[#596273] md:text-[17px]">
            allunipply helps students discover universities, shortlist programs,
            and manage applications in one streamlined platform designed for
            studying abroad.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1.2fr_1.35fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            <section className=" ">
              <h4 className="mb-4 text-[15px] font-semibold uppercase tracking-[0.18em] text-[#1f2a44]">
                Company
              </h4>
              <ul className="space-y-3 text-[15px] text-[#596273]">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 transition hover:text-[#1f2a44]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#f08f4f]" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="">
              <h4 className="mb-4 text-[15px] font-semibold uppercase tracking-[0.18em] text-[#1f2a44]">
                Support
              </h4>
              <ul className="space-y-3 text-[15px] text-[#596273]">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 transition hover:text-[#1f2a44]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#f08f4f]" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="">
            <div className="mb-5 flex items-center gap-3 text-[#1f2a44]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef2ff] text-[#2a459a]">
                <Share2 className="h-5 w-5" />
              </span>
              <div>
                <h4 className="text-xl font-semibold">Connect &amp; Follow</h4>
                <p className="text-sm text-[#7a8597]">
                  Stay updated with our latest news and product updates.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={social.label}
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_10px_24px_rgba(31,42,68,0.18)] transition duration-300 hover:-translate-y-1 ${social.className}`}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="overflow-hidden">
            <div className="flex h-full flex-col justify-center  gap-6">
              

             

             

              <Link
                href="/national-university/start-applying"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2a459a] px-6 py-4 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#223b83] sm:w-auto"
              >
                Start Your Application
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-10 border-t border-[#ded6cc] pt-5">
          <div className="flex flex-col gap-4 text-sm text-[#7a8597] md:flex-row md:items-center md:justify-between">
            <p>&copy; 2026 All Rights Reserved to allunipply</p>

            <div className="flex flex-wrap items-center gap-6">
              <Link href="/privacy-policy" className="transition hover:text-[#1f2a44]">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="transition hover:text-[#1f2a44]">
                Terms and condition
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
