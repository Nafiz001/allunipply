"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { Heart, ArrowUpRight } from "lucide-react";
import { fillGridRows } from "@/lib/grid-fill";

const helpCards = [
  { icon: '/icons/support.png', title: 'Customer Support', desc: 'Reach our 24/7 student support team for guidance on any part of your application journey.' },
  { icon: '/icons/onetime.png', title: 'One-time Payment Process', desc: 'A single, transparent fee covers all your national university applications — no hidden charges.' },
  { icon: '/icons/consult.png', title: 'Consult with Us In Office', desc: 'Book a one-on-one session with our advisors and get personalised application strategies.' },
];

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

type UniversityListItem = {
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

function formatUniversityType(type: string) {
  const lower = type.toLowerCase();
  if (lower === "public") return "Public university";
  if (lower === "private") return "Private university";
  if (lower === "national") return "National university";
  if (lower === "international") return "International university";
  return `${type.charAt(0)}${type.slice(1).toLowerCase()} university`;
}

const InternationalUniversityPage = () => {
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [gpa, setGpa] = useState("");
  const [ielts, setIelts] = useState("");
  const [tuitionRange, setTuitionRange] = useState([0, 60000]);
  const router = useRouter();
  const [allRemoteUniversities, setAllRemoteUniversities] = useState<UniversityListItem[]>([]);
  const [isUniversitiesLoading, setIsUniversitiesLoading] = useState(true);

  // Hero section filter states
  const [heroLocation, setHeroLocation] = useState("");
  const [heroDate, setHeroDate] = useState("");
  const [heroProcess, setHeroProcess] = useState("");
  const [heroCriteria, setHeroCriteria] = useState("");
  const [heroTestScore, setHeroTestScore] = useState("");

  const isFiltering = useMemo(() => {
    return gpa !== "" || ielts !== "" || tuitionRange[1] < 60000;
  }, [gpa, ielts, tuitionRange]);

  useEffect(() => {
    let isMounted = true;
    const loadUniversities = async () => {
      setIsUniversitiesLoading(true);
      try {
        const response = await fetch("/api/universities?page=1&pageSize=200&includeInactive=false", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to load universities");
        const result = (await response.json()) as {
          data?: Array<{ id: string; name: string; type: string; country: string; city?: string; location?: string; bannerImageUrl?: string | null; logoUrl?: string | null; minGpa?: number | null; minIelts?: number | null; tuition?: number | null; }>;
        };
        const parsed = (result.data ?? []).filter((item) => item.country.toLowerCase() !== "bangladesh").map((item) => ({
          id: item.id, name: item.name, type: formatUniversityType(item.type), country: item.country, location: item.location ?? `${item.city ?? ""}, ${item.country}`,
          image: item.bannerImageUrl || item.logoUrl || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop",
          minGpa: typeof item.minGpa === "number" ? item.minGpa : 0, minIelts: typeof item.minIelts === "number" ? item.minIelts : 0, tuition: typeof item.tuition === "number" ? item.tuition : 0,
        }));
        if (isMounted) setAllRemoteUniversities(parsed);
      } catch {
        if (isMounted) setAllRemoteUniversities([]);
      } finally {
        if (isMounted) setIsUniversitiesLoading(false);
      }
    };
    void loadUniversities();
    return () => { isMounted = false; };
  }, []);

  const countries = useMemo(() => {
    return Array.from(new Set(allRemoteUniversities.map((item) => item.country))).map((name) => ({
      name, code: COUNTRY_FLAG_CODES[name] ?? name.slice(0, 2).toLowerCase(),
    }));
  }, [allRemoteUniversities]);

  useEffect(() => {
    if (!countries.length) return;
    if (!countries.some((country) => country.name === selectedCountry)) {
      setSelectedCountry(countries[0].name);
    }
  }, [countries, selectedCountry]);

  const allUniversities = useMemo(() => allRemoteUniversities.filter((u) => u.country === selectedCountry), [allRemoteUniversities, selectedCountry]);
  const filteredUniversities = useMemo(() => allUniversities.filter((uni) => {
    const userGpa = Number.parseFloat(gpa) || 0;
    const userIelts = Number.parseFloat(ielts) || 0;
    if (!isFiltering) return true;
    return (gpa === "" || userGpa >= uni.minGpa) && (ielts === "" || userIelts >= uni.minIelts) && (uni.tuition <= tuitionRange[1]);
  }), [allUniversities, gpa, ielts, isFiltering, tuitionRange]);

  const universitiesRaw = isFiltering ? filteredUniversities.slice(0, 2) : allUniversities;
  const universitiesDisplay = useMemo(() => {
    return fillGridRows(universitiesRaw, allUniversities, { columns: [1, 2, 4] });
  }, [universitiesRaw, allUniversities]);
  const hasMoreResults = isFiltering && filteredUniversities.length > 2;

  return (
    <div className="overflow-x-hidden">
      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-content { display: flex; animation: marquee 25s linear infinite; }
        .marquee-container:hover .marquee-content { animation-play-state: paused; }
      `}</style>

      {/* Hero Section */}
      <div className="relative w-full px-4 md:px-6 pt-6 md:pt-12 ">
        <div className="relative rounded-[20px] md:rounded-[40px] overflow-hidden  h-[550px] md:h-[750px] lg:h-[850px]">
          <Image src="/hero/international_banner.jpeg" alt="International Banner" fill className="object-cover brightess-75" priority />
          
          <div className="absolute top-10 right-10 max-w-lg hidden lg:block">
            <p className="font-pacifico text-3xl text-orange-400 text-right leading-relaxed drop-shadow-lg">
              &quot;Your dream university is just a click away — no stress, no mess, just success!&quot;
            </p>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-6 text-center pt-20">
          <ScrollReveal direction="down">
            <h1 className="text-white text-5xl md:text-7xl font-jakarta font-extrabold mb-6 tracking-tight drop-shadow-xl">
              FLY TO YOUR <span className="text-orange-500">DREAM</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-black/90 font-outfit text-lg md:text-2xl mb-12 max-w-3xl mx-auto font-medium mt-12">
              Explore thousands of international universities and find your perfect academic home abroad.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4} className="bg-white/10 backdrop-blur-xl rounded-[40px] p-6 md:p-8 w-full max-w-6xl mx-auto border border-white/20 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-8 items-end">
              <div className="flex flex-col text-left group">
                <label className="font-outfit font-bold text-white text-sm mb-2 ml-1">Location</label>
                <input type="text" placeholder="Country / City" value={heroLocation} onChange={(e) => setHeroLocation(e.target.value)} className="px-4 py-3 rounded-2xl bg-white/20 text-white placeholder-white/50 border border-white/30 outline-none focus:bg-white/30 transition-all text-sm" />
              </div>
              <div className="flex flex-col text-left group">
                <label className="font-outfit font-bold text-white text-sm mb-2 ml-1">Date</label>
                <input type="date" value={heroDate} onChange={(e) => setHeroDate(e.target.value)} className="px-4 py-3 rounded-2xl bg-white/20 text-white border border-white/30 outline-none focus:bg-white/30 transition-all text-sm" />
              </div>
              <div className="flex flex-col text-left group">
                <label className="font-outfit font-bold text-white text-sm mb-2 ml-1">Process</label>
                <select value={heroProcess} onChange={(e) => setHeroProcess(e.target.value)} className="px-4 py-3 rounded-2xl bg-white/20 text-white border border-white/30 outline-none focus:bg-white/30 transition-all text-sm">
                  <option value="" className="text-gray-900">View process</option>
                  <option value="direct" className="text-gray-900">Direct</option>
                  <option value="agent" className="text-gray-900">Agent</option>
                </select>
              </div>
              <div className="flex flex-col text-left group">
                <label className="font-outfit font-bold text-white text-sm mb-2 ml-1">Criteria</label>
                <select value={heroCriteria} onChange={(e) => setHeroCriteria(e.target.value)} className="px-4 py-3 rounded-2xl bg-white/20 text-white border border-white/30 outline-none focus:bg-white/30 transition-all text-sm">
                  <option value="" className="text-gray-900">See all info</option>
                  <option value="gpa" className="text-gray-900">GPA Based</option>
                  <option value="ielts" className="text-gray-900">IELTS</option>
                </select>
              </div>
              <div className="flex flex-col text-left group">
                <label className="font-outfit font-bold text-white text-sm mb-2 ml-1">Test Score</label>
                <input type="number" placeholder="Score" value={heroTestScore} onChange={(e) => setHeroTestScore(e.target.value)} className="px-4 py-3 rounded-2xl bg-white/20 text-white placeholder-white/50 border border-white/30 outline-none focus:bg-white/30 transition-all text-sm" />
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3.5 rounded-2xl bg-[#E3572B] text-white font-outfit font-bold text-base shadow-xl shadow-orange-600/20">Search Now</motion.button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-20 lg:py-32">
        <ScrollReveal direction="up" className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-rubik text-[#e3572b] mb-6">Services we will provide</h2>
          <p className="text-gray-500 text-lg uppercase tracking-widest font-jakarta font-semibold">Simplifying Your Global Education Journey</p>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "One-Click Multi-University Application", icon: "/icons/application-icon.png", desc: "Apply to multiple universities worldwide with a single, smart profile." },
            { title: "Smart Document Management", icon: "/icons/document-icon.png", desc: "Upload and reuse your credentials securely for every application." },
            { title: "Real-Time Application Tracking", icon: "/icons/tracking-icon.png", desc: "Know exactly where your application stands at every moment." }
          ].map((s, i) => (
            <motion.div key={i} whileHover={{ y: -12 }} className="card-hover-glow bg-[#fff4ea] rounded-[40px] p-10 text-center border border-orange-100/50">
              <h3 className="font-bold text-2xl mb-6 text-gray-900 leading-tight">{s.title}</h3>
              <p className="text-gray-600 mb-10 leading-relaxed text-lg">{s.desc}</p>
              <motion.div whileHover={{ scale: 1.15, rotate: 5 }} className="w-24 h-24 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-lg"><Image src={s.icon} width={80} height={80} alt={s.title} /></motion.div>
            </motion.div>
          ))}
        </StaggerReveal>
      </div>

      {/* Partners Section */}
      <div className="bg-[#FFF4EA] py-20">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6">
          <ScrollReveal className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
            <div>
              <h2 className="font-poppins font-bold text-4xl md:text-6xl mb-4">Partners in Success</h2>
              <p className="text-gray-600 text-xl">Trusted by over 50+ Global Consultants & Institutes</p>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} className="px-10 py-4 rounded-full bg-[#E3572B] text-white font-outfit font-bold text-lg shadow-xl shadow-orange-500/20">View Global Network</motion.button>
          </ScrollReveal>
          <StaggerReveal staggerDelay={0.06} className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {[1, 2, 3, 4, 5].map((n) => (
              <motion.div key={n} whileHover={{ scale: 1.15 }} className="flex items-center justify-center opacity-70 hover:opacity-100 transition-all"><Image src={`/partners/company${n}.png`} width={160} height={160} alt="" /></motion.div>
            ))}
          </StaggerReveal>
        </div>
      </div>

      {/* University Explorer Grid */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-24">
        <ScrollReveal className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-6 text-gray-900">
            <span className="text-orange-500">Universities</span> We Represent
          </h2>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto">Discover top-tier institutions across the globe and find where you belong.</p>
        </ScrollReveal>

        {/* Marquee Banner */}
        <ScrollReveal className="relative overflow-hidden mb-16 px-4 py-8 rounded-[40px] bg-white shadow-xl border border-gray-100 marquee-container">
          <div className="marquee-content gap-4">
            {[...countries, ...countries].map((c, i) => (
              <motion.button key={i} onClick={() => setSelectedCountry(c.name)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-8 py-3 rounded-full font-bold text-lg transition-all border whitespace-nowrap shadow-sm ${selectedCountry === c.name ? 'bg-orange-500 text-white border-orange-500 shadow-orange-400/30' : 'bg-white text-gray-700 border-gray-200 hover:border-orange-500'}`}
              >
                <span className={`fi fi-${c.code} text-2xl fis rounded-full shadow-sm`}></span>
                {c.name}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Refine Your Search */}
        <ScrollReveal direction="up" className="bg-white rounded-[40px] shadow-2xl p-10 md:p-14 mb-20 border border-gray-50/50">
          <h3 className="text-3xl font-bold text-gray-900 mb-10 font-outfit">Refine Your Search</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div>
              <label className="block text-gray-900 font-bold mb-4 text-lg">Your GPA (0.0 - 4.0)</label>
              <input type="number" placeholder="e.g., 3.8" value={gpa} onChange={(e) => setGpa(e.target.value)} min="0" max="4" step="0.1" className="w-full px-6 py-4 border-2 border-gray-100 rounded-2xl font-outfit focus:border-orange-400 outline-none transition-all placeholder:text-gray-300" />
            </div>
            <div>
              <label className="block text-gray-900 font-bold mb-4 text-lg">Your IELTS Score (0.0 - 9.0)</label>
              <input type="number" placeholder="e.g., 7.5" value={ielts} onChange={(e) => setIelts(e.target.value)} min="0" max="9" step="0.5" className="w-full px-6 py-4 border-2 border-gray-100 rounded-2xl font-outfit focus:border-orange-400 outline-none transition-all placeholder:text-gray-300" />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-6">
              <label className="text-gray-900 font-bold text-lg">Tuition Fee Range</label>
              <span className="text-orange-500 font-extrabold text-2xl">${tuitionRange[1].toLocaleString()}</span>
            </div>
            <input type="range" min="0" max="60000" step="1000" value={tuitionRange[1]} onChange={(e) => setTuitionRange([tuitionRange[0], parseInt(e.target.value)])} className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-orange-500" />
          </div>
        </ScrollReveal>

        <StaggerReveal key={selectedCountry} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {universitiesDisplay.length ? universitiesDisplay.map((uni, index) => (
            <motion.div key={`${uni.id}-${index}`} whileHover={{ y: -10 }} className="card-hover-glow bg-white rounded-[32px] overflow-hidden shadow-lg border border-transparent flex flex-col">
              <div className="relative h-[200px] flex-shrink-0 group overflow-hidden">
                <Image src={uni.image} alt={uni.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
                <button className="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"><Heart size={22} className="text-gray-600" /></button>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2 min-h-[3.25rem]">{uni.name}</h3>
                <p className="text-orange-500 font-bold text-sm mb-1">{uni.type}</p>
                <p className="text-gray-500 text-sm mb-5 flex-1">{uni.location}</p>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 rounded-2xl bg-[#E3572B] text-white font-bold text-sm flex items-center justify-center gap-2">Apply Now <ArrowUpRight size={16} /></motion.button>
              </div>
            </motion.div>
          )) : isUniversitiesLoading ? <div className="col-span-full py-20 text-center text-gray-400 text-xl font-medium">Crunching university data...</div> : <div className="col-span-full py-20 text-center text-gray-400 text-xl font-medium">No results match your criteria.</div>}
        </StaggerReveal>

        <div className="text-center">
          <motion.button whileHover={{ scale: 1.05 }} className="px-14 py-5 rounded-3xl bg-[#E3572B] text-white font-bold text-xl shadow-2xl shadow-orange-600/30">
            {hasMoreResults ? `See More Results (${filteredUniversities.length - 2} more)` : "Start Global Application Now"}
          </motion.button>
        </div>
      </div>

      {/* Applying Process */}
      <div className="py-24 bg-[#FFF4EA]/40 border-y border-orange-100/30">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6">
          <ScrollReveal direction="up" className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-orange-500 font-bold mb-6 uppercase tracking-tight">Applying Process</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">From selection to acceptance — we guide you through every milestone.</p>
          </ScrollReveal>
          <div className="flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-0">
            {[ { icon: "/icons/location.png", title: "Choose University", desc: "Select from over 1000+ top institutions globally." }, { icon: "/icons/doc.png", title: "Upload Info", desc: "Securely submit your transcripts and test scores." }, { icon: "/icons/payment.png", title: "One-time Payment", desc: "Pay once and track unlimited applications easily." }, { icon: "/icons/car.png", title: "Start Applying", desc: "Receive admission and start your visa process." } ].map((s, i) => (
              <React.Fragment key={i}>
                <ScrollReveal direction="up" delay={i * 0.15} className="flex-1 flex flex-col items-center text-center max-w-[280px] mx-auto">
                  <motion.div whileHover={{ scale: 1.15, rotate: -5 }} className="mb-8 p-6 bg-white rounded-[32px] shadow-lg"><Image src={s.icon} width={80} height={80} alt="" /></motion.div>
                  <h3 className="font-bold text-2xl mb-4 text-[#E3572B]">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{s.desc}</p>
                </ScrollReveal>
                {i < 3 && <div className="hidden lg:flex pt-16 opacity-30 px-4"><Image src="/icons/connector.png" width={160} height={60} alt="" /></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── Help ── */}
            <div className="py-24 bg-white border-t border-gray-100">
              <div className="max-w-[1320px] mx-auto px-4 md:px-6">
                <ScrollReveal direction="up" className="text-center mb-20">
                  <h2 className="text-4xl md:text-5xl font-bold font-jakarta text-[#E3572B] mb-6">Need help with application?</h2>
                  <p className="text-gray-500 text-lg max-w-2xl mx-auto">We offer dedicated support to ensure your application journey is as smooth as possible.</p>
                </ScrollReveal>
      
                <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {helpCards.map((card, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -10 }}
                      className="bg-[#FFF4EA] rounded-[40px] p-10 text-center border border-white h-full shadow-sm hover:shadow-xl transition-all"
                    >
                      <div className="w-20 h-20 mx-auto mb-8 bg-white rounded-full flex items-center justify-center shadow-md">
                        <Image src={card.icon} width={45} height={45} alt={card.title} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 font-jakarta">{card.title}</h3>
                      <p className="text-gray-600 text-base leading-relaxed">{card.desc}</p>
                    </motion.div>
                  ))}
                </StaggerReveal>
              </div>
            </div>
    </div>
  );
};

export default InternationalUniversityPage;
