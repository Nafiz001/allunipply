"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { Heart, ArrowUpRight } from "lucide-react";

const newsItems = [
  { id: 1, img: '/news/news1.png', alt: 'Aga Khan Foundation', title: 'Aga Khan Foundation International Scholarship Programme', desc: 'These programmes offer funding and support opportunities for students pursuing education globally.', views: '14k' },
  { id: 2, img: '/news/news2.png', alt: 'World Bank', title: 'The World Bank Scholarship', desc: 'Full scholarships for Bangladeshi students to study in a world-class education system in Australia.', views: '14k' },
  { id: 3, img: '/news/news3.png', alt: 'Mastercard', title: 'The Mastercard Foundation Scholarship', desc: 'Funding and support varies by institution and criteria set by institution for eligible students.', views: '14k' },
  { id: 4, img: '/news/news4.png', alt: 'Ulster University', title: 'Ulster University Scholarships', desc: "Details about Ulster University's programs and scholarship opportunities for international students.", views: '14k' },
];

const processSteps = [
  { icon: '/icons/location.png', title: 'Choose University', desc: 'Apply to each university through a simple, streamlined application form.' },
  { icon: '/icons/doc.png', title: 'Upload Documents', desc: 'Upload your transcripts, CV, and all required documents for a complete application.' },
  { icon: '/icons/payment.png', title: 'One-time Payment', desc: 'From admissions to visa dates — spring, winter, or fall term — track them all.' },
  { icon: '/icons/car.png', title: 'Start Applying', desc: 'Your University is not far away. Get ready to fly to your dream University Life.' },
];

const serviceCards = [
  { icon: '/icons/application-icon.png', w: 117, h: 62, title: 'One-Click Multi-University Application', desc: 'Apply to multiple national universities through a single, streamlined submission process.' },
  { icon: '/icons/document-icon.png', w: 85, h: 65, title: 'Smart Document Management', desc: 'Easily upload, manage, and reuse your academic documents for all applications in one secure place.' },
  { icon: '/icons/tracking-icon.png', w: 87, h: 72, title: 'Real-Time Application Tracking', desc: 'Track your application status, get deadline reminders, and stay informed every step of the way.' },
];

const helpCards = [
  { icon: '/icons/support.png', title: 'Customer Support', desc: 'Reach our 24/7 student support team for guidance on any part of your application journey.' },
  { icon: '/icons/onetime.png', title: 'One-time Payment Process', desc: 'A single, transparent fee covers all your national university applications — no hidden charges.' },
  { icon: '/icons/consult.png', title: 'Consult with Us In Office', desc: 'Book a one-on-one session with our advisors and get personalised application strategies.' },
];

const universityTabs = ['public', 'private', 'agricultural', 'engineering'] as const;
const tabLabels: Record<string, string> = {
  public: 'Public University',
  private: 'Private University',
  agricultural: 'Agricultural University',
  engineering: 'Engineering University',
};

const universitiesByType: Record<string, Array<{ id: string; name: string; type: string; location: string; image: string }>> = {
  public: [
    { id: 'pub1', name: 'University of Dhaka', type: 'Public university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/university-of-dhaka/800/500' },
    { id: 'pub2', name: 'Bangladesh University of Engineering and Technology', type: 'Public university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/buet-dhaka/800/500' },
    { id: 'pub3', name: 'Jahangirnagar University', type: 'Public university', location: 'Savar, Bangladesh', image: 'https://picsum.photos/seed/jahangirnagar-university/800/500' },
    { id: 'pub4', name: 'Rajshahi University', type: 'Public university', location: 'Rajshahi, Bangladesh', image: 'https://picsum.photos/seed/rajshahi-university/800/500' },
    { id: 'pub5', name: 'Khulna University', type: 'Public university', location: 'Khulna, Bangladesh', image: 'https://picsum.photos/seed/khulna-university/800/500' },
    { id: 'pub6', name: 'Shahjalal University of Science and Technology', type: 'Public university', location: 'Sylhet, Bangladesh', image: 'https://picsum.photos/seed/shahjalal-university-sust/800/500' },
    { id: 'pub7', name: 'Comilla University', type: 'Public university', location: 'Comilla, Bangladesh', image: 'https://picsum.photos/seed/comilla-university/800/500' },
    { id: 'pub8', name: 'Noakhali Science and Technology University', type: 'Public university', location: 'Noakhali, Bangladesh', image: 'https://picsum.photos/seed/noakhali-science-and-technology-university/800/500' },
    { id: 'pub9', name: 'Mawlana Bhashani Science and Technology University', type: 'Public university', location: 'Tangail, Bangladesh', image: 'https://picsum.photos/seed/mbstu-tangail/800/500' },
  ],
  private: [
    { id: 'priv1', name: 'North South University', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/north-south-university/800/500' },
    { id: 'priv2', name: 'BRAC University', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/brac-university/800/500' },
    { id: 'priv3', name: 'Independent University Bangladesh', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/independent-university-bangladesh/800/500' },
    { id: 'priv4', name: 'East West University', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/east-west-university/800/500' },
    { id: 'priv5', name: 'American International University-Bangladesh', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/aiub-dhaka/800/500' },
    { id: 'priv6', name: 'Ahsanullah University of Science and Technology', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/ahsanullah-university-aust/800/500' },
    { id: 'priv7', name: 'Daffodil International University', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/daffodil-international-university/800/500' },
    { id: 'priv8', name: 'United International University', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/united-international-university/800/500' },
    { id: 'priv9', name: 'Southeast University', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/southeast-university-dhaka/800/500' },
    { id: 'priv10', name: 'University of Liberal Arts Bangladesh', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/ulab-dhaka/800/500' },
  ],
  agricultural: [
    { id: 'agri1', name: 'Bangladesh Agricultural University', type: 'Agricultural university', location: 'Mymensingh, Bangladesh', image: 'https://picsum.photos/seed/bangladesh-agricultural-university/800/500' },
    { id: 'agri2', name: 'Sher-e-Bangla Agricultural University', type: 'Agricultural university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/sher-e-bangla-agricultural/800/500' },
    { id: 'agri3', name: 'Sylhet Agricultural University', type: 'Agricultural university', location: 'Sylhet, Bangladesh', image: 'https://picsum.photos/seed/sylhet-agricultural-university/800/500' },
    { id: 'agri4', name: 'Bangabandhu Sheikh Mujibur Rahman Agricultural University', type: 'Agricultural university', location: 'Gazipur, Bangladesh', image: 'https://picsum.photos/seed/bsmrau-gazipur/800/500' },
    { id: 'agri5', name: 'Hajee Mohammad Danesh Science and Technology University', type: 'Agricultural university', location: 'Dinajpur, Bangladesh', image: 'https://picsum.photos/seed/hmdstu-dinajpur/800/500' },
    { id: 'agri6', name: 'Patuakhali Science and Technology University', type: 'Agricultural university', location: 'Patuakhali, Bangladesh', image: 'https://picsum.photos/seed/pstu-patuakhali/800/500' },
    { id: 'agri7', name: 'Chittagong Veterinary and Animal Sciences University', type: 'Agricultural university', location: 'Chittagong, Bangladesh', image: 'https://picsum.photos/seed/cvasu-chittagong/800/500' },
    { id: 'agri8', name: 'Khulna Agricultural University', type: 'Agricultural university', location: 'Khulna, Bangladesh', image: 'https://picsum.photos/seed/khulna-agricultural-university/800/500' },
  ],
  engineering: [
    { id: 'eng1', name: 'Bangladesh University of Engineering and Technology', type: 'Engineering university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/buet-dhaka/800/500' },
    { id: 'eng2', name: 'Chittagong University of Engineering and Technology', type: 'Engineering university', location: 'Chittagong, Bangladesh', image: 'https://picsum.photos/seed/cuet-chittagong/800/500' },
    { id: 'eng3', name: 'Rajshahi University of Engineering and Technology', type: 'Engineering university', location: 'Rajshahi, Bangladesh', image: 'https://picsum.photos/seed/ruet-rajshahi/800/500' },
    { id: 'eng4', name: 'Khulna University of Engineering and Technology', type: 'Engineering university', location: 'Khulna, Bangladesh', image: 'https://picsum.photos/seed/kuet-khulna/800/500' },
    { id: 'eng5', name: 'Dhaka University of Engineering and Technology', type: 'Engineering university', location: 'Gazipur, Bangladesh', image: 'https://picsum.photos/seed/duet-gazipur/800/500' },
    { id: 'eng6', name: 'Military Institute of Science and Technology', type: 'Engineering university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/mist-dhaka/800/500' },
    { id: 'eng7', name: 'Pabna University of Science and Technology', type: 'Engineering university', location: 'Pabna, Bangladesh', image: 'https://picsum.photos/seed/pust-pabna/800/500' },
    { id: 'eng8', name: 'Jessore University of Science and Technology', type: 'Engineering university', location: 'Jessore, Bangladesh', image: 'https://picsum.photos/seed/just-jessore/800/500' },
    { id: 'eng9', name: 'Mymensingh Engineering College', type: 'Engineering university', location: 'Mymensingh, Bangladesh', image: 'https://picsum.photos/seed/mec-mymensingh/800/500' },
  ],
};

const NationalUniversityPage = () => {
  const router = useRouter();
  const [selectedUniversityType, setSelectedUniversityType] = useState<keyof typeof universitiesByType>('public');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const publicUniversityTarget = "/national-university/public-university?openFinder=true";

  const handlePublicUniversityClick = async () => {
    try {
      const response = await fetch("/api/auth/me", { method: "GET", cache: "no-store" });
      if (response.ok) { router.push(publicUniversityTarget); return; }
    } catch { /* fall through */ }
    setShowAuthModal(true);
  };

  const universities = universitiesByType[selectedUniversityType] || [];

  return (
    <div className="overflow-x-hidden">
      {/* ── Auth Modal ── */}
      {showAuthModal && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" onClick={() => setShowAuthModal(false)} />
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
          >
            <div className="w-full max-w-[560px] rounded-[36px] bg-[#F7EFE6] p-8 md:p-12 text-center shadow-2xl border border-white/20">
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-8">Sign in to continue</h2>
              <div className="space-y-4 max-w-[280px] mx-auto">
                <Link href={`/sign-in?next=${encodeURIComponent(publicUniversityTarget)}`}
                  className="block w-full rounded-full bg-[#E3572B] text-white font-outfit font-bold text-xl py-4 hover:bg-[#c24d2b] transition-all hover:-translate-y-1 shadow-lg shadow-orange-200">
                  Sign in
                </Link>
                <p className="font-outfit text-xl font-bold text-gray-500">or</p>
                <Link href={`/sign-up?next=${encodeURIComponent(publicUniversityTarget)}`}
                  className="block w-full rounded-full border-2 border-[#E3572B] text-[#E3572B] font-outfit font-bold text-xl py-4 hover:bg-white transition-all hover:-translate-y-1">
                  Create account
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* ── Hero ── */}
      <div className="relative w-full px-4 md:px-6 pt-6 md:pt-12">
        <div className="relative rounded-[20px] md:rounded-[40px] overflow-hidden h-[500px] sm:h-[600px] md:h-[650px] lg:h-[733px]">
          <Image src="/hero/national_banner.jpeg" alt="National University Banner" fill className="object-cover brightness-75" priority />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <ScrollReveal direction="down">
            <h1 className="font-pacifico text-3xl text-orange-800 text-right leading-relaxed drop-shadow-lg absolute left-8 top-30">
              Streamline your university<br />applications – one submission,<br />multiple choices.
            </h1>
          </ScrollReveal>

          {/* <ScrollReveal delay={0.2}>
            <p className="text-black font-outfit text-sm sm:text-base md:text-lg max-w-2xl mb-8 leading-relaxed mt-100">
              Your dream university is just a click away — no stress, no mess, just success!<br />
              Apply smart, not hard — we make admissions easy.
            </p>
          </ScrollReveal> */}

          <div className="flex flex-wrap gap-4 justify-center mb-10 mt-100">
            <motion.button
              onClick={handlePublicUniversityClick}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-[#E3572B] text-white font-outfit font-bold text-lg shadow-xl shadow-orange-500/20 cursor-pointer"
            >
               Public University
            </motion.button>
            <Link href="/national-university/start-applying">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-white text-[#E3572B] font-outfit font-bold text-lg shadow-xl border-2 border-white/50 cursor-pointer"
              >
                 Start Applying
              </motion.button>
            </Link>
          </div>

          <ScrollReveal direction="up" delay={0.4} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-5xl mx-4 border border-white/20">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 items-center">
              {['Location', 'Date', 'Process', 'Criteria'].map((label) => (
                <div key={label} className="flex flex-col text-center border-r border-white/20 last:border-0 pr-4">
                  <h3 className="font-outfit font-bold text-white text-base mb-1">{label}</h3>
                  <p className="text-white/60 text-xs">Search {label.toLowerCase()}</p>
                </div>
              ))}
              <div className="col-span-2 sm:col-span-4 lg:col-span-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full py-3 rounded-full bg-[#F88210] text-white font-outfit font-bold text-sm"
                >
                  See details
                </motion.button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Services ── */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-16 md:py-24">
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-rubik text-[#E3572B] mb-4">Services we will provide</h2>
          <p className="text-gray-500 text-lg font-jakarta">What We Offer to Simplify Your University Application Journey</p>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="card-hover-glow bg-[#fff4ea] rounded-[32px] p-8 md:p-10 text-center border border-[#e3572b]/10 cursor-pointer group"
            >
              <h3 className="font-rubik font-bold text-xl md:text-2xl mb-4 text-gray-900 group-hover:text-[#E3572B] transition-colors">{card.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-8">{card.desc}</p>
              <div className="flex justify-center">
                <motion.div whileHover={{ rotate: -5, scale: 1.1 }} transition={{ type: "spring" }}>
                  <Image src={card.icon} width={card.w} height={card.h} alt={card.title} className="object-contain" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </StaggerReveal>
      </div>

      {/* ── Partners ── */}
      <div className="bg-[#FFF4EA] py-16 md:py-20">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6">
          <ScrollReveal className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div>
              <h2 className="font-poppins font-semibold text-3xl md:text-5xl mb-2 text-gray-900">Partners in Success</h2>
              <p className="text-gray-600 font-outfit text-base">Trusted by over 50+ consultants & institutes</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 sm:mt-0 px-8 py-3 rounded-full bg-[#E3572B] text-white font-outfit font-bold text-base shadow-lg"
            >
              View All
            </motion.button>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {[1, 2, 3, 4, 5].map((n) => (
              <motion.div key={n} whileHover={{ scale: 1.1 }} className="flex justify-center items-center opacity-70 hover:opacity-100 transition-opacity">
                <Image src={`/partners/company${n}.png`} width={160} height={160} alt={`Partner ${n}`} className="object-contain" />
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </div>

      {/* ── University Grid ── */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-20">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-4">
            <span className="text-[#E3572B]">University</span> we are working with
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Trusted by Top National Universities to Simplify Admissions and Empower Student Application Experience.
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {universityTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedUniversityType(tab)}
              className={`px-6 py-2 rounded-full font-outfit font-semibold transition-all ${
                selectedUniversityType === tab ? 'bg-[#E3572B] text-white shadow-lg' : 'bg-white text-gray-700 border-2 border-gray-100 hover:border-[#E3572B]'
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        <StaggerReveal key={selectedUniversityType} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {universities.length > 0 ? universities.map((uni) => (
            <motion.div
              key={uni.id}
              whileHover={{ y: -8 }}
              className="card-hover-glow rounded-[32px] overflow-hidden bg-white shadow-md border border-transparent flex flex-col"
            >
              <div className="relative h-[200px] flex-shrink-0 overflow-hidden">
                <Image src={uni.image} alt={uni.name} fill className="object-cover transition-transform duration-500 hover:scale-110" />
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md">
                  <Heart size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-base mb-2 text-gray-900 line-clamp-2 min-h-[3rem]">{uni.name}</h3>
                <p className="text-[#F88210] text-sm font-bold mb-1">{uni.type}</p>
                <p className="text-gray-500 text-sm mb-5 flex-1">{uni.location}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl bg-[#E3572B] text-white font-outfit font-bold text-sm flex items-center justify-center gap-2"
                >
                  Apply Now
                  <ArrowUpRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full rounded-2xl border border-dashed border-[#E3572B]/40 bg-white/70 p-8 text-center text-gray-600">
              No universities found for this category.
            </div>
          )}
        </StaggerReveal>

        <div className="mt-16 text-center">
          <Link href="/national-university/start-applying">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-12 py-4 rounded-full bg-[#E3572B] text-white font-outfit font-bold text-xl shadow-xl flex items-center gap-3 mx-auto"
            >
              Start Application Now
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* ── Process ── */}
      <div className="py-20 bg-[#FFF4EA]/50">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6">
          <ScrollReveal direction="up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[#E3572B] font-jakarta font-bold mb-4 uppercase">Applying Process</h2>
            <p className="text-gray-500 text-lg">Your journey from sign-up to success in 4 simple steps.</p>
          </ScrollReveal>

          <div className="flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-0">
            {processSteps.map((step, i) => (
              <React.Fragment key={i}>
                <ScrollReveal direction="up" delay={i * 0.15} className="flex-1 flex flex-col items-center text-center max-w-xs">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="w-24 h-24 flex items-center justify-center mb-6"
                  >
                    <Image src={step.icon} width={80} height={80} alt={step.title} />
                  </motion.div>
                  <h3 className="font-bold text-xl mb-3 text-[#E3572B] font-jakarta">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </ScrollReveal>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:flex items-start justify-center pt-8 flex-shrink-0 opacity-40">
                    <Image src="/icons/connector.png" width={160} height={60} alt="connector" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── News ── */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-20">
        <ScrollReveal className="mb-12">
          <h2 className="text-4xl font-bold font-poppins mb-2">News and Updates</h2>
          <p className="text-gray-500 text-lg">Stay up to date with the latest developments</p>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {newsItems.map((news) => (
            <motion.div key={news.id} whileHover={{ y: -8 }} className="card-hover-glow bg-white rounded-3xl overflow-hidden shadow-sm border border-transparent cursor-pointer flex flex-col">
              <div className="relative h-[180px] flex-shrink-0 overflow-hidden">
                <Image src={news.img} alt={news.alt} fill className="object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-base mb-2 line-clamp-2 min-h-[3rem] font-outfit">{news.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">{news.desc}</p>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{news.views} views</p>
              </div>
            </motion.div>
          ))}
        </StaggerReveal>

        <div className="text-center">
          <Link href="/news-updates">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-10 py-4 rounded-full bg-[#E3572B] text-white font-outfit font-bold text-xl shadow-lg shadow-orange-500/10"
            >
              Explore More News
            </motion.button>
          </Link>
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

export default NationalUniversityPage;
