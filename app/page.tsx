"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Plus, Minus, Heart, ArrowUpRight, Star, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { useRouter } from "next/navigation";

let hasHandledScholarModalEntry = false;

type HomeUniversity = {
  id: string;
  name: string;
  type: string;
  country: string;
  location: string;
  image: string;
  minGpa: number;
  minIelts: number;
  tuition: number;
};

type HomeNews = {
  id: string;
  title: string;
  description: string;
  image: string;
  meta: string;
};

const COUNTRY_FLAG_CODES: Record<string, string> = {
  USA: "us",
  UK: "gb",
  Australia: "au",
  Canada: "ca",
  China: "cn",
  Japan: "jp",
  Italy: "it",
  Spain: "es",
  Germany: "de",
  France: "fr",
  Netherlands: "nl",
  Sweden: "se",
  Bangladesh: "bd",
};

function formatUniversityType(type: string) {
  const lower = type.toLowerCase();

  if (lower === "public") return "Public university";
  if (lower === "private") return "Private university";
  if (lower === "national") return "National university";
  if (lower === "international") return "International university";

  return `${type.charAt(0)}${type.slice(1).toLowerCase()} university`;
}

function formatDateMeta(dateValue: string | null) {
  if (!dateValue) return "Latest update";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Latest update";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Home() {
  const [showScholarModal, setShowScholarModal] = useState(true);
  const [isFlashExiting, setIsFlashExiting] = useState(false);
  const [scholarBarWidth, setScholarBarWidth] = useState(100);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const [selectedCountry, setSelectedCountry] = useState('Canada');
  const [nationalType, setNationalType] = useState<'public' | 'private'>('public');
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [gpa, setGpa] = useState('');
  const [ielts, setIelts] = useState('');
  const [tuitionRange, setTuitionRange] = useState([0, 60000]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [homeUniversities, setHomeUniversities] = useState<HomeUniversity[]>([]);
  const [homeNews, setHomeNews] = useState<HomeNews[]>([]);
  const [isHomeDataLoading, setIsHomeDataLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (hasHandledScholarModalEntry) {
      setShowScholarModal(false);
      return;
    }

    hasHandledScholarModalEntry = true;

    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const navType = navEntry?.type;

    let initialPath = window.location.pathname;
    if (navEntry?.name) {
      try {
        initialPath = new URL(navEntry.name).pathname;
      } catch {
        initialPath = window.location.pathname;
      }
    }

    const shouldOpen = initialPath === "/" && (navType === "reload" || navType === "navigate" || !navType);

    if (!shouldOpen) {
      setShowScholarModal(false);
    }
  }, []);

  useEffect(() => {
    if (!showScholarModal) {
      return;
    }

    setScholarBarWidth(100);
    const animateTimer = window.setTimeout(() => setScholarBarWidth(0), 30);
    const exitTimer = window.setTimeout(() => setIsFlashExiting(true), 3500);
    const closeTimer = window.setTimeout(() => setShowScholarModal(false), 4200);

    return () => {
      window.clearTimeout(animateTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(closeTimer);
    };
  }, [showScholarModal]);

  useEffect(() => {
    setIsFiltering(gpa !== '' || ielts !== '' || tuitionRange[1] < 60000);
  }, [gpa, ielts, tuitionRange]);

  useEffect(() => {
    setFailedImages(new Set());
  }, [selectedCountry]);

  useEffect(() => {
    let isMounted = true;

    const loadHomeData = async () => {
      setIsHomeDataLoading(true);

      try {
        const [universitiesResponse, newsResponse] = await Promise.all([
          fetch("/api/universities?page=1&pageSize=200&includeInactive=false", {
            cache: "no-store",
          }),
          fetch("/api/news?page=1&pageSize=4&status=PUBLISHED", {
            cache: "no-store",
          }),
        ]);

        if (universitiesResponse.ok) {
          const result = (await universitiesResponse.json()) as {
            data?: Array<{
              id: string;
              name: string;
              type: string;
              country: string;
              location?: string;
              city?: string;
              bannerImageUrl?: string | null;
              logoUrl?: string | null;
              minGpa?: number | null;
              minIelts?: number | null;
              tuition?: number | null;
            }>;
          };

          const parsedUniversities = (result.data ?? []).map((item) => ({
            id: item.id,
            name: item.name,
            type: formatUniversityType(item.type),
            country: item.country,
            location: item.location ?? `${item.city ?? ""}, ${item.country}`,
            image:
              item.bannerImageUrl ||
              item.logoUrl ||
              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop",
            minGpa: typeof item.minGpa === "number" ? item.minGpa : 0,
            minIelts: typeof item.minIelts === "number" ? item.minIelts : 0,
            tuition: typeof item.tuition === "number" ? item.tuition : 0,
          }));

          if (isMounted) {
            setHomeUniversities(parsedUniversities);
          }
        }

        if (newsResponse.ok) {
          const result = (await newsResponse.json()) as {
            data?: Array<{
              id: string;
              title: string;
              excerpt?: string | null;
              coverImageUrl?: string | null;
              publishedAt?: string | null;
            }>;
          };

          const parsedNews = (result.data ?? []).map((item) => ({
            id: item.id,
            title: item.title,
            description: item.excerpt ?? "Stay up to date with the latest university updates.",
            image: item.coverImageUrl ?? "/news/news1.png",
            meta: formatDateMeta(item.publishedAt ?? null),
          }));

          if (isMounted) {
            setHomeNews(parsedNews);
          }
        }
      } catch {
        if (isMounted) {
          setHomeUniversities([]);
          setHomeNews([]);
        }
      } finally {
        if (isMounted) {
          setIsHomeDataLoading(false);
        }
      }
    };

    void loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const countries = Array.from(new Set(homeUniversities.map((item) => item.country))).map((name) => ({
    name,
    code: COUNTRY_FLAG_CODES[name] ?? name.slice(0, 2).toLowerCase(),
  }));

  useEffect(() => {
    if (!countries.length) {
      return;
    }

    if (!countries.some((country) => country.name === selectedCountry)) {
      setSelectedCountry(countries[0].name);
    }
  }, [countries, selectedCountry]);

  const allUniversities = homeUniversities.filter((university) => university.country === selectedCountry);
  const filteredUniversities = allUniversities.filter(uni => {
    const userGpa = parseFloat(gpa) || 0;
    const userIelts = parseFloat(ielts) || 0;

    if (!isFiltering) return true;

    const meetsGpa = gpa === '' || userGpa >= uni.minGpa;
    const meetsIelts = ielts === '' || userIelts >= uni.minIelts;
    const meetsTuition = uni.tuition <= tuitionRange[1];

    return meetsGpa && meetsIelts && meetsTuition;
  });

  const universities = isFiltering ? filteredUniversities.slice(0, 2) : allUniversities;
  const hasMoreResults = isFiltering && filteredUniversities.length > 2;

  const nationalUniversities = homeUniversities
    .filter((university) => {
      const type = university.type.toLowerCase();
      return nationalType === "public" ? type.includes("public") : type.includes("private");
    })
    .slice(0, 3);
  const newsCards = homeNews.slice(0, 4);

  return (
    <div className="overflow-x-hidden">
      {/* Flash Screen — 4-Strip Horizontal Curtain Exit */}
      {showScholarModal ? (
        <div className="fixed inset-0 z-[9999]">
          <button
            type="button"
            onClick={() => setIsFlashExiting(true)}
            aria-label="Skip flash screen"
            className={`fixed top-5 right-5 z-[10001] h-12 w-12 flex items-center justify-center rounded-full bg-white/90 border border-[#E3572B]/30 text-gray-500 hover:text-[#E3572B] hover:bg-white hover:scale-110 hover:rotate-90 hover:shadow-xl shadow-md transition-all duration-300 backdrop-blur-sm ${
              isFlashExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none ${
            isFlashExiting ? 'curtain-content-exit' : ''
          }`}>
            <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-xl">
              <div className="relative flex justify-center items-center mb-6">
                <div className="absolute w-44 h-44 bg-white rounded-full blur-[60px] animate-[pulse_3s_ease-in-out_infinite]" />
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  <Image
                    src="/icons/s-genie-logo-new.png"
                    alt="S-Genie Logo"
                    fill
                    className="object-contain scale-[1.5] animate-[bounce_4s_ease-in-out_infinite]"
                    priority
                  />
                </div>
              </div>

              <h2 className="font-outfit font-extrabold text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#E3572B] to-gray-800 tracking-tight mb-3">
                S-Genie
              </h2>
              <p className="font-outfit font-bold text-xl md:text-2xl text-gray-500 tracking-[0.2em] uppercase mb-8">
                will soon be on board
              </p>

              <button
                type="button"
                onClick={() => setIsFlashExiting(true)}
                className={`pointer-events-auto group relative inline-flex items-center justify-center px-12 py-4 font-outfit font-bold text-lg text-white focus:outline-none hover:-translate-y-1 transition-transform duration-300 ${
                  isFlashExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E3572B] via-[#F88210] to-[#E3572B] bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] shadow-[0_10px_40px_rgba(227,87,43,0.45)] group-hover:shadow-[0_14px_50px_rgba(227,87,43,0.65)] transition-shadow duration-300" />
                <div className="absolute inset-0 rounded-full border border-white/20" />
                <span className="relative flex items-center gap-3">
                  Explore Now
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <div
            className={`absolute top-0 left-0 w-full h-1/4 bg-[#fffbf7] ${
              isFlashExiting ? 'curtain-strip curtain-strip-1' : ''
            }`}
            style={{ borderBottom: '1px solid rgba(227,87,43,0.08)' }}
          />
          <div
            className={`absolute top-1/4 left-0 w-full h-1/4 bg-[#fef8f3] ${
              isFlashExiting ? 'curtain-strip curtain-strip-2' : ''
            }`}
            style={{ borderBottom: '1px solid rgba(227,87,43,0.06)' }}
          />
          <div
            className={`absolute top-2/4 left-0 w-full h-1/4 bg-[#fffbf7] ${
              isFlashExiting ? 'curtain-strip curtain-strip-3' : ''
            }`}
            style={{ borderBottom: '1px solid rgba(227,87,43,0.06)' }}
          />
          <div
            className={`absolute top-3/4 left-0 w-full h-1/4 bg-[#fef8f3] ${
              isFlashExiting ? 'curtain-strip curtain-strip-4' : ''
            }`}
          />
        </div>
      ) : null}

      {/* Hero Section */}
      <div className="relative w-full px-4 md:px-6 pt-6 md:pt-12">
        <div className="relative rounded-[20px] md:rounded-[40px] overflow-hidden">
          <div className="relative h-[700px] sm:h-[650px] md:h-[600px] lg:h-[700px]">
            <Image
              src="/hero/banner.jpeg"
              alt="Students with backpacks"
              fill
              className="object-cover brightness-75"
              priority
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-6 text-center">
            <ScrollReveal direction="down">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-outfit font-medium mb-3 md:mb-4 max-w-5xl leading-tight">
                Let&apos;s fly to your{" "}
                <span className="block mt-1 md:mt-2">
                  Dream <span className="font-playfair font-semibold">University</span>
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-white font-outfit font-normal text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mb-6 md:mb-12 leading-relaxed px-4">
                Your dream university is just a click away - no stress, no mess, just success!<br />
                Apply smart, not hard - we make admissions easy.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-3 w-full max-w-xl px-4 z-10">
              <Link href="/national-university" className="col-span-1">
                <button className="group flex items-center justify-center gap-2 w-full h-[52px] md:h-[60px] rounded-xl md:rounded-2xl font-outfit font-extrabold text-sm md:text-base transition-all duration-300 bg-white/95 backdrop-blur-sm text-gray-800 hover:bg-[#F88210] hover:text-white hover:shadow-[0_10px_30px_rgba(248,130,16,0.35)] hover:-translate-y-1 border border-white/40">
                  <span className="group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Image src="/icons/bd-flag.png" width={22} height={22} alt="Bangladesh flag" className="drop-shadow-sm" />
                  </span>
                  <span className="truncate">National University</span>
                </button>
              </Link>

              <Link href="/international-university" className="col-span-1">
                <button className="group flex items-center justify-center gap-2 w-full h-[52px] md:h-[60px] rounded-xl md:rounded-2xl font-outfit font-extrabold text-sm md:text-base transition-all duration-300 bg-white/95 backdrop-blur-sm text-gray-800 hover:bg-[#F88210] hover:text-white hover:shadow-[0_10px_30px_rgba(248,130,16,0.35)] hover:-translate-y-1 border border-white/40">
                  <span className="group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Image src="/icons/worldmap.png" width={22} height={22} alt="World Map" className="drop-shadow-sm" />
                  </span>
                  <span className="truncate">International University</span>
                </button>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-md hover:bg-white/15 transition-colors duration-500 rounded-2xl md:rounded-[32px] p-6 lg:p-8 w-full max-w-6xl mx-4 mt-6 md:mt-8 border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] z-10 relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 divide-x divide-white/20">
                <div className="flex flex-col px-4 first:pl-0 last:pr-0 group/item transition-transform duration-300 hover:scale-[1.02]">
                  <h3 className="font-outfit font-normal text-white text-base md:text-2xl mb-1 md:mb-2 group-hover/item:text-orange-200 transition-colors">Location</h3>
                  <p className="text-white/70 font-outfit font-normal text-xs md:text-base">Search destination</p>
                </div>
                <div className="flex flex-col px-4 group/item transition-transform duration-300 hover:scale-[1.02]">
                  <h3 className="font-outfit font-normal text-white text-base md:text-2xl mb-1 md:mb-2 group-hover/item:text-orange-200 transition-colors">Application<br /> date</h3>
                </div>
                <div className="flex flex-col px-4 group/item transition-transform duration-300 hover:scale-[1.02]">
                  <h3 className="font-outfit font-normal text-white text-base md:text-2xl mb-1 md:mb-2 group-hover/item:text-orange-200 transition-colors">Application<br /> Process</h3>
                </div>
                <div className="flex flex-col px-4 group/item transition-transform duration-300 hover:scale-[1.02]">
                  <h3 className="font-outfit font-normal text-white text-base md:text-2xl mb-1 md:mb-2 group-hover/item:text-orange-200 transition-colors">Criteria</h3>
                  <p className="text-white/70 font-outfit font-normal text-xs md:text-base">See all info</p>
                </div>
                <div className="flex flex-col px-4 group/item transition-transform duration-300 hover:scale-[1.02]">
                  <h3 className="font-outfit font-normal text-white text-base md:text-2xl mb-1 md:mb-2 group-hover/item:text-orange-200 transition-colors">IELTS, GRE</h3>
                  <p className="text-white/70 font-outfit font-normal text-xs md:text-base">facilities Program</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
        <ScrollReveal direction="up">
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold  font-poppins text-center mb-12 md:mb-16">
            What we <span className="text-[#E3572B]">offer</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-[1280px] mx-auto">
          <ScrollReveal direction="left" className="bg-white hover:bg-orange-50/20 transition-colors duration-500 rounded-[32px] p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(227,87,43,0.08)] transform hover:-translate-y-1 group">
            <h3 className="text-3xl md:text-4xl font-outfit font-extrabold text-[#E3572B] mb-10 tracking-tight group-hover:scale-[1.02] transition-transform origin-left">International University</h3>
            <div className="space-y-4">
              {['int-1', 'int-2', 'int-3', 'int-4'].map((id, idx) => (
                <div key={id} className={`border-gray-100 pb-2 ${idx !== 3 ? 'border-b' : ''}`}>
                  <button
                    onClick={() => setExpandedItems({ ...expandedItems, [id]: !expandedItems[id] })}
                    className="w-full flex items-start justify-between gap-4 text-left py-4 px-2 rounded-2xl hover:bg-orange-50/70 transition-all duration-300 group/btn outline-none focus-visible:ring-2 focus-visible:ring-orange-200">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-[#fff4ea] group-hover/btn:bg-[#E3572B] group-hover/btn:shadow-md transition-all duration-300 flex items-center justify-center flex-shrink-0">
                        {idx === 0 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-[#d95d39] group-hover/btn:stroke-white transition-colors duration-300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>}
                        {idx === 1 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-[#d95d39] group-hover/btn:stroke-white transition-colors duration-300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
                        {idx === 2 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-[#d95d39] group-hover/btn:stroke-white transition-colors duration-300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>}
                        {idx === 3 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-[#d95d39] group-hover/btn:stroke-white transition-colors duration-300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl md:text-2xl text-gray-900 group-hover/btn:text-[#E3572B] transition-colors duration-300">
                          {idx === 0 && "Luxury Architecture and Technology"}
                          {idx === 1 && "Expert Counseling & Visa Support"}
                          {idx === 2 && "Scholarship & Loan Assistance"}
                          {idx === 3 && "Track All Applications in One Place"}
                        </h4>
                        <div className={`grid transition-all duration-300 ease-in-out ${expandedItems[id] ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
                          <div className="overflow-hidden">
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                              Lorem ipsum dolor sit amet consectetur. Pharetra gravida posuere malesuada gravida mi.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-3 bg-white p-1 rounded-full shadow-sm group-hover/btn:shadow transition-shadow">
                      {expandedItems[id] ? <Minus className="text-[#d95d39]" size={20} strokeWidth={3} /> : <Plus className="text-[#d95d39]" size={20} strokeWidth={3} />}
                    </div>
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button className="group relative w-[280px] mx-auto px-8 py-4 bg-white border-2 border-[#E3572B] text-[#E3572B] rounded-full font-outfit font-extrabold text-xl overflow-hidden shadow-[0_4px_15px_rgba(227,87,43,0.1)] hover:shadow-[0_8px_25px_rgba(227,87,43,0.25)] transition-all duration-300">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Application</span>
                <div className="absolute inset-0 bg-[#E3572B] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="bg-white hover:bg-orange-50/20 transition-colors duration-500 rounded-[32px] p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(227,87,43,0.08)] transform hover:-translate-y-1 group">
            <h3 className="text-3xl md:text-4xl font-outfit font-extrabold text-[#E3572B] mb-10 tracking-tight group-hover:scale-[1.02] transition-transform origin-left">National University</h3>
            <div className="space-y-4">
              {['nat-1', 'nat-2', 'nat-3', 'nat-4'].map((id, idx) => (
                <div key={id} className={`border-gray-100 pb-2 ${idx !== 3 ? 'border-b' : ''}`}>
                  <button
                    onClick={() => setExpandedItems({ ...expandedItems, [id]: !expandedItems[id] })}
                    className="w-full flex items-start justify-between gap-4 text-left py-4 px-2 rounded-2xl hover:bg-orange-50/70 transition-all duration-300 group/btn outline-none focus-visible:ring-2 focus-visible:ring-orange-200">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-[#fff4ea] group-hover/btn:bg-[#E3572B] group-hover/btn:shadow-md transition-all duration-300 flex items-center justify-center flex-shrink-0">
                        {idx === 0 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-[#d95d39] group-hover/btn:stroke-white transition-colors duration-300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>}
                        {idx === 1 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-[#d95d39] group-hover/btn:stroke-white transition-colors duration-300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
                        {idx === 2 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-[#d95d39] group-hover/btn:stroke-white transition-colors duration-300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>}
                        {idx === 3 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-[#d95d39] group-hover/btn:stroke-white transition-colors duration-300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl md:text-2xl text-gray-900 group-hover/btn:text-[#E3572B] transition-colors duration-300">
                          {idx === 0 && "Luxury Architecture and Technology"}
                          {idx === 1 && "Expert Counseling & Visa Support"}
                          {idx === 2 && "Scholarship & Loan Assistance"}
                          {idx === 3 && "Track All Applications in One Place"}
                        </h4>
                        <div className={`grid transition-all duration-300 ease-in-out ${expandedItems[id] ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
                          <div className="overflow-hidden">
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                              Lorem ipsum dolor sit amet consectetur. Pharetra gravida posuere malesuada gravida mi.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-3 bg-white p-1 rounded-full shadow-sm group-hover/btn:shadow transition-shadow">
                      {expandedItems[id] ? <Minus className="text-[#d95d39]" size={20} strokeWidth={3} /> : <Plus className="text-[#d95d39]" size={20} strokeWidth={3} />}
                    </div>
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button className="group relative w-[280px] mx-auto px-8 py-4 bg-white border-2 border-[#E3572B] text-[#E3572B] rounded-full font-outfit font-extrabold text-xl overflow-hidden shadow-[0_4px_15px_rgba(227,87,43,0.1)] hover:shadow-[0_8px_25px_rgba(227,87,43,0.25)] transition-all duration-300">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Application</span>
                <div className="absolute inset-0 bg-[#E3572B] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Trusted by Institutes Worldwide Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
        <ScrollReveal direction="up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-outfit text-center mb-8 md:mb-12">
            Trusted by <span className="text-[#E3572B]"> Institutes <br /> Worldwide</span>
          </h2>
        </ScrollReveal>

        <div className="relative overflow-hidden mb-12">
          <style jsx>{`
            @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .marquee-container { display: flex; animation: marquee 20s linear infinite; }
            .marquee-container:hover { animation-play-state: paused; }
          `}</style>
          <div className="flex">
            <div className="marquee-container">
              {[...countries, ...countries].map((country, i) => (
                <button
                  key={`${country.name}-${i}`}
                  onClick={() => setSelectedCountry(country.name)}
                  className={`flex justify-center items-center gap-2 px-4 md:px-6 py-2 rounded-full font-outfit font-semibold text-sm md:text-base transition-all border mx-2 whitespace-nowrap ${selectedCountry === country.name ? 'bg-[#d95d39] text-white border-[#d95d39]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#d95d39]'}`}>
                  <span className={`fi fi-${country.code} text-xl fis rounded-full`}></span>
                  {country.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ScrollReveal className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-12 border border-gray-100">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-outfit">Refine Your Search</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-900 font-semibold mb-3 font-outfit text-sm md:text-base">Your GPA (0.0 - 4.0)</label>
              <input type="number" placeholder="e.g., 3.5" value={gpa} onChange={(e) => setGpa(e.target.value)} min="0" max="4" step="0.1" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit focus:outline-none focus:border-[#E3572B] transition-colors text-gray-700 placeholder:text-gray-400" />
            </div>
            <div>
              <label className="block text-gray-900 font-semibold mb-3 font-outfit text-sm md:text-base">Your IELTS Score (0.0 - 9.0)</label>
              <input type="number" placeholder="e.g., 7.0" value={ielts} onChange={(e) => setIelts(e.target.value)} min="0" max="9" step="0.5" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit focus:outline-none focus:border-[#E3572B] transition-colors text-gray-700 placeholder:text-gray-400" />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-gray-900 font-semibold font-outfit text-sm md:text-base">Tuition Fee Range</label>
              <span className="text-[#E3572B] font-bold font-outfit text-sm md:text-base">${tuitionRange[0].toLocaleString()} - ${tuitionRange[1].toLocaleString()}</span>
            </div>
            <div className="relative">
              <input type="range" min="0" max="60000" step="1000" value={tuitionRange[1]} onChange={(e) => setTuitionRange([tuitionRange[0], parseInt(e.target.value)])} className="w-full h-2 bg-gradient-to-r from-[#E3572B] to-[#FF8B22] rounded-lg appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, #E3572B 0%, #FF8B22 ${(tuitionRange[1] / 60000) * 100}%, #e5e7eb ${(tuitionRange[1] / 60000) * 100}%, #e5e7eb 100%)` }} />
              <style jsx>{`
                input[type='range']::-webkit-slider-thumb { appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #E3572B; cursor: pointer; border: 3px solid white; box-shadow: 0 2px 8px rgba(227, 87, 43, 0.3); }
                input[type='range']::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: #E3572B; cursor: pointer; border: 3px solid white; box-shadow: 0 2px 8px rgba(227, 87, 43, 0.3); }
              `}</style>
            </div>
          </div>
        </ScrollReveal>

        <StaggerReveal key={selectedCountry} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {universities.length ? (
            universities.map((university, index) => (
              <motion.div key={university.id || index} whileHover={{ y: -8 }} className="card-hover-glow relative rounded-3xl overflow-hidden bg-white shadow-md border border-transparent flex flex-col">
                <div className="relative h-[220px] flex-shrink-0 overflow-hidden">
                  <Image src={failedImages.has(university.image) ? 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop' : university.image} alt={university.name} fill className="object-cover transition-transform duration-500 hover:scale-110" onError={() => setFailedImages(prev => new Set(prev).add(university.image))} />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"><Heart size={20} strokeWidth={2} className="text-gray-600" /></button>
                </div>
                <div className="p-6 bg-white flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-4 flex-1">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#d95d39] mb-2 line-clamp-2 min-h-[3.25rem]">{university.name}</h3>
                      <p className="text-gray-900 font-semibold mb-1 text-sm">{university.type}</p>
                      <p className="text-gray-600 text-sm">{university.location}</p>
                    </div>
                    <button className="w-10 h-10 bg-[#d95d39] rounded-full flex items-center justify-center hover:bg-[#c24d2b] transition-colors flex-shrink-0 mt-1"><ArrowUpRight size={18} strokeWidth={2.5} className="text-white" /></button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-[#d95d39]/40 bg-white/70 p-8 text-center text-gray-600">
              {isHomeDataLoading ? "Loading universities..." : "No universities found for the selected country."}
            </div>
          )}
        </StaggerReveal>

        <div className="text-center mt-8">
          {hasMoreResults ? (
            <button onClick={() => router.push('/sign-in')} className="font-outfit font-semibold text-white text-xl md:text-2xl py-4 md:py-5 px-6 md:px-8 bg-[#E3572B] rounded-[40px] hover:bg-[#c24d2b] transition-all shadow-lg">See More Results({filteredUniversities.length - 2} more)</button>
          ) : (
            <button className="font-outfit font-semibold text-white text-xl md:text-2xl py-4 md:py-5 px-6 md:px-8 bg-[#E3572B] rounded-[40px] hover:bg-[#c24d2b] transition-all">Explore More Institute</button>
          )}
        </div>
      </div>

      {/* National Institute Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
        <ScrollReveal direction="up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-outfit text-center mb-8 md:mb-12">
            Trusted by <span className="text-[#E3572B]"> National <br /> Institute&apos;s</span>
          </h2>
        </ScrollReveal>

        <div className="flex justify-center gap-4 mb-12">
          {['public', 'private'].map((type) => (
            <button key={type} onClick={() => setNationalType(type as any)} className={`px-14 py-1 rounded-[20px] font-outfit font-semibold text-base md:text-lg transition-all ${nationalType === type ? 'bg-[#d95d39] text-white' : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-[#d95d39]'}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)} University
            </button>
          ))}
        </div>

        <StaggerReveal key={nationalType} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {nationalUniversities.length ? (
            nationalUniversities.map((university, index) => (
              <motion.div key={university.id || index} whileHover={{ y: -8 }} className="card-hover-glow relative rounded-3xl overflow-hidden bg-white shadow-md border border-transparent flex flex-col">
                <div className="relative h-[220px] flex-shrink-0 overflow-hidden">
                  <Image src={university.image} alt={university.name} fill className="object-cover transition-transform duration-500 hover:scale-110" />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"><Heart size={20} strokeWidth={2} className="text-gray-600" /></button>
                </div>
                <div className="p-6 bg-white flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-4 flex-1">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#d95d39] mb-2 line-clamp-2 min-h-[3.25rem]">{university.name}</h3>
                      <p className="text-gray-900 font-semibold mb-1 text-sm">{university.type}</p>
                      <p className="text-gray-600 text-sm">{university.location}</p>
                    </div>
                    <button className="w-10 h-10 bg-[#d95d39] rounded-full flex items-center justify-center hover:bg-[#c24d2b] transition-colors flex-shrink-0 mt-1"><ArrowUpRight size={18} strokeWidth={2.5} className="text-white" /></button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-[#d95d39]/40 bg-white/70 p-8 text-center text-gray-600">
              {isHomeDataLoading ? "Loading universities..." : "No universities found for this category."}
            </div>
          )}
        </StaggerReveal>

        <div className="text-center">
          <button className="font-outfit font-semibold text-white text-2xl py-5 px-8 bg-[#E3572B] rounded-[40px]">Explore More Institute</button>
        </div>
      </div>

      {/* Program Section */}
      <ScrollReveal direction="up" className="relative bg-[#ff8b22] max-w-[1120px] mx-auto rounded-3xl overflow-hidden px-4 md:px-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 p-8 md:p-0">
          <div className="relative w-[120px] h-[150px] md:w-[200px] md:h-[280px] lg:w-[280px] lg:h-[350px]"><Image src="/hero/girl1.png" alt="Student" fill className="object-contain" /></div>
          <div className="flex-1 text-center text-white px-4">
            <h2 className="text-lg md:text-2xl lg:text-3xl font-normal font-poppins mb-4">Choose from 12000+ study Program</h2>
            <p className="text-sm md:text-base mb-6 opacity-90">Stay informed with the latest news delivered straight to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="✉ Email address" className="w-full px-4 py-3 text-gray-800 bg-white/20 rounded-full border border-white/40 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white" />
              <button className="px-8 py-3 bg-white text-[#ff8b22] rounded-full font-semibold hover:bg-gray-100 transition-all">Submit</button>
            </div>
          </div>
          <div className="relative w-[120px] h-[150px] md:w-[200px] md:h-[280px] lg:w-[280px] lg:h-[350px]"><Image src="/hero/girl2.png" alt="Student" fill className="object-contain" /></div>
        </div>
      </ScrollReveal>

      {/* News Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
        <ScrollReveal direction="left" className="mb-12 font-normal font-poppins">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-2">News and Updates</h2>
          <p className="text-gray-600 text-base md:text-lg">Stay up to date with us</p>
        </ScrollReveal>
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {newsCards.length ? (
            newsCards.map((article) => (
              <motion.div key={article.id} whileHover={{ y: -8 }} className="card-hover-glow bg-white rounded-2xl overflow-hidden shadow-sm border border-transparent cursor-pointer flex flex-col">
                <div className="relative h-[180px] flex-shrink-0 overflow-hidden"><Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 hover:scale-110" /></div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-base mb-2 line-clamp-2 min-h-[3rem]">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-1">{article.description}</p>
                  <p className="text-gray-400 text-xs">{article.meta}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full p-8 text-center text-gray-600">No published news yet.</div>
          )}
        </StaggerReveal>
        <ScrollReveal direction="up" className="text-center">
          <Link href="/news-updates">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="font-outfit font-semibold text-white text-2xl py-5 px-8 bg-[#E3572B] rounded-[40px]">Explore More News</motion.button>
          </Link>
        </ScrollReveal>
      </div>

      {/* Success Story Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
        <ScrollReveal direction="up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3">Student Success Story</h2>
          <p className="text-[#00000099] text-base md:text-lg">See how we&apos;ve turned dreams into reality</p>
        </ScrollReveal>
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 max-w-[1120px] mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }} 
              className={`card-hover-glow relative bg-[#FFF4EA] p-8 pb-10 rounded-[32px] flex flex-col h-full ${
                i === 1 || i === 4 ? 'md:col-span-2' : 'md:col-span-1'
              } border border-transparent transition-all shadow-sm hover:shadow-xl`}
            >
              <div className="absolute -top-10 left-8 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                <Image src={`/testimonials/user${i}.png`} alt={`Student ${i}`} fill className="object-cover" />
              </div>
              <div className="pt-10 flex-1">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 italic">
                  &quot;The guidance I received here was life-changing. I managed to secure my spot at a top-tier university with a full scholarship. The process was seamless and the support was unmatched!&quot;
                </p>
              </div>
              <div>
                <h4 className="font-bold text-2xl text-gray-900 mb-2">Student Name {i}</h4>
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} className="fill-[#d95d39] text-[#d95d39]" />)}
                </div>
              </div>
              <div className="absolute bottom-8 right-8 opacity-20 w-16 h-16 pointer-events-none">
                <Image src="/icons/quotation-marks.png" alt="Quote" fill className="object-contain" />
              </div>
            </motion.div>
          ))}
        </StaggerReveal>
      </div>

      {/* Question Section */}
      <ScrollReveal direction="up" className="max-w-[1120px] mx-auto my-5 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-end gap-4">
          <h2 className="text-2xl md:text-5xl font-inter">Do you have a question?</h2>
          <div className="relative h-[150px] w-[280px] md:h-[300px] md:w-[600px]"><Image src="/icons/question.png" alt="Question" fill className="object-contain" /></div>
        </div>
      </ScrollReveal>

      {/* Contact Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
        <ScrollReveal direction="up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-6xl mb-3">Contact Us</h2>
          <p className="text-gray-500">Start your university application journey today</p>
        </ScrollReveal>
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{icon: Mail, title: 'Email', text: 'Office : hello@skyline.co'},{icon: Phone, title: 'Phone', text: 'Office : +91 8932-1151-22'},{icon: MapPin, title: 'Location', text: 'Office : 123 Maple Street'}].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -8 }} className="card-hover-glow bg-white rounded-3xl p-8 border border-gray-100/80">
              <div className="w-12 h-12 bg-[#fff4ea] rounded-full flex items-center justify-center mb-4"><item.icon className="text-[#d95d39]" size={24} /></div>
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.text}</p>
              <button className="px-6 py-2.5 border-2 border-[#d95d39] text-[#d95d39] rounded-full font-semibold hover:bg-[#d95d39] hover:text-white transition-all">Contact us</button>
            </motion.div>
          ))}
        </StaggerReveal>
      </div>
    </div>
  );
}
