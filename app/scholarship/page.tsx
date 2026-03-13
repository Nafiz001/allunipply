"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, ChevronDown, Crown, ArrowRight } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";

type ScholarshipCard = {
  id: string;
  image: string;
  intake: string;
  tag: string;
  description: string;
  title: string;
};

function formatDeadline(deadline: string | null | undefined) {
  if (!deadline) return "Open intake";

  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return "Open intake";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

const ScholarshipPageContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shouldAutoOpenFilter = searchParams.get("openFilter") === "true";

  const [isHydrated, setIsHydrated] = useState(false);
  const [userName] = useState("Aklima");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(shouldAutoOpenFilter);
  const [currentStep, setCurrentStep] = useState(1);
  const [scholarships, setScholarships] = useState<ScholarshipCard[]>([]);
  const [isScholarshipsLoading, setIsScholarshipsLoading] = useState(true);

  const [formData, setFormData] = useState({
    country: "",
    major: "",
    researchPaperCount: "",
    collegeName: "",
    undergradMajor: "",
    score: "",
    backlogs: "",
    englishTest: "",
    overallScore: "",
    aptitudeTest: "",
    verbal: "",
    quants: "",
    awa: "",
    workExperience: "",
    projects: "",
    publishedPapers: "",
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    if (shouldAutoOpenFilter) {
      router.replace(pathname, { scroll: false });
    }
  }, [isHydrated, pathname, router, shouldAutoOpenFilter]);

  useEffect(() => {
    let isMounted = true;

    const loadScholarships = async () => {
      setIsScholarshipsLoading(true);
      try {
        const response = await fetch("/api/scholarships?page=1&pageSize=100&includeInactive=false", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load scholarships.");
        }

        const result = (await response.json()) as {
          data?: Array<{
            id: string;
            title: string;
            type: string;
            description?: string | null;
            deadline?: string | null;
            university?: {
              bannerImageUrl?: string | null;
              logoUrl?: string | null;
            } | null;
          }>;
        };

        const parsed = (result.data ?? []).map((item) => {
          const formattedType = item.type
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(/^\w/, (char) => char.toUpperCase());

          return {
            id: item.id,
            image:
              item.university?.bannerImageUrl ||
              item.university?.logoUrl ||
              "/universities/delaware.png",
            intake: formatDeadline(item.deadline),
            tag: formattedType,
            description: item.description?.trim() || item.title,
            title: item.title,
          };
        });

        if (isMounted) {
          setScholarships(parsed);
        }
      } catch {
        if (isMounted) {
          setScholarships([]);
        }
      } finally {
        if (isMounted) {
          setIsScholarshipsLoading(false);
        }
      }
    };

    void loadScholarships();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredScholarships = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return scholarships;

    return scholarships.filter((scholarship) =>
      `${scholarship.title} ${scholarship.description}`.toLowerCase().includes(query),
    );
  }, [scholarships, searchQuery]);

  if (!isHydrated) {
    return <div className="min-h-screen bg-[#F5F5F5]" />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ScrollReveal direction="down">
          <h1 className="text-4xl md:text-6xl font-medium text-[#E3572B] mb-2 font-outfit text-center">
            Hello, {userName}!
          </h1>
          <h2 className="text-xl md:text-3xl font-semibold mb-8 font-outfit text-center text-[#222]">
            Here&apos;s your personalized list of Scholarship according to universities!
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="rounded-3xl p-8 md:p-10 mb-8 relative overflow-hidden shadow-lg border border-white/20"
            style={{
              background: "linear-gradient(90deg, rgba(255, 139, 34, 1) 0%, rgba(255, 182.29, 116.47, 1) 100%)",
            }}
          >
            <div className="absolute top-4 right-12 w-32 h-32 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-4 right-32 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 font-outfit">
                  Your shortlist can make or break
                  <br />
                  your study abroad journey
                </h3>
                <p className="text-white text-sm md:text-base font-outfit opacity-90">
                  Consult with our experts to understand how to create the best shortlist for your needs
                </p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-[#E3572B] rounded-full font-outfit font-semibold cursor-pointer shadow-md transition-all whitespace-nowrap"
              >
                Get Personalized Advice
              </motion.button>
            </div>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2} className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative group">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#E3572B] transition-colors" />
            <input
              type="text"
              placeholder="Search Programs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-glow w-full pl-11 pr-4 py-3 border border-[#D8D8D8] rounded-full font-outfit focus:outline-none focus:border-[#E3572B] transition-all bg-white"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setCurrentStep(1);
              setIsModalOpen(true);
            }}
            className="px-6 py-3 border border-[#D8D8D8] rounded-full font-outfit font-semibold text-gray-700 hover:border-[#E3572B] hover:text-[#E3572B] cursor-pointer transition-all flex items-center justify-center gap-2 bg-white"
          >
            <SlidersHorizontal size={18} />
            Filter
          </motion.button>
        </ScrollReveal>

        <StaggerReveal key={isScholarshipsLoading ? "loading" : "loaded"} staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-12">
          {filteredScholarships.map((scholarship) => (
            <motion.article 
              key={scholarship.id} 
              whileHover={{ y: -8 }}
              className="card-hover-glow rounded-3xl border border-transparent bg-white overflow-hidden p-3"
            >
              <div className="img-hover-zoom relative h-56 w-full rounded-[20px] mb-5 overflow-hidden">
                <Image
                  src={scholarship.image}
                  alt={scholarship.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute left-4 bottom-4 flex items-center gap-2">
                  <span className="px-4 py-1.5 rounded-full text-[11px] font-bold border border-[#E3572B] bg-white text-[#222] font-outfit">
                    {scholarship.intake}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-[11px] font-bold border border-[#E3572B] bg-white text-[#222] font-outfit">
                    {scholarship.tag}
                  </span>
                </div>
              </div>

              <div className="px-2 pb-2">
                <p className="text-xl md:text-2xl leading-tight text-[#111] font-outfit font-bold mb-6 line-clamp-2">
                  {scholarship.description}
                </p>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-between min-w-[180px] pl-6 py-1.5 pr-1.5 rounded-full bg-[#E3572B] text-white font-urbanist text-[16px] leading-none font-semibold hover:bg-[#c24d2b] transition-colors cursor-pointer"
                >
                  <span>Learn more</span>
                  <span className="ml-5 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight size={16} />
                  </span>
                </motion.button>
              </div>
            </motion.article>
          ))}
          {isScholarshipsLoading ? (
            <div className="col-span-full rounded-3xl border border-dashed border-[#E3572B]/40 bg-white p-8 text-center text-gray-600">
              Loading scholarships...
            </div>
          ) : null}
          {!isScholarshipsLoading && !filteredScholarships.length ? (
            <div className="col-span-full rounded-3xl border border-dashed border-[#E3572B]/40 bg-white p-8 text-center text-gray-600">
              No scholarships found.
            </div>
          ) : null}
        </StaggerReveal>

        <div
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(90deg, rgba(255, 139, 34, 1) 0%, rgba(255, 182.29, 116.47, 1) 100%)",
          }}
        >
          <div className="absolute top-4 left-12 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-4 left-32 w-24 h-24 bg-white opacity-10 rounded-full"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-white text-2xl md:text-4xl font-bold mb-3 font-outfit">Want to give it a go again?</h3>
              <p className="text-white text-sm md:text-base font-outfit">
                Consult with our experts to understand how to create the best shortlist for your needs
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentStep(1);
                setIsModalOpen(true);
              }}
              className="px-10 py-3 bg-white text-gray-900 rounded-full font-outfit font-semibold hover:shadow-lg transition-all whitespace-nowrap"
            >
              Try again
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-white rounded-[32px] shadow-2xl max-w-3xl w-full overflow-hidden"
            >
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors z-10 cursor-pointer"
              >
                <X size={18} className="text-white" />
              </motion.button>

              <div className="p-8 md:p-10">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-1.5 h-8 bg-[#F88210] rounded-full mt-0.5"></div>
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-outfit leading-tight mb-2">
                      {currentStep === 1 && "Scholarship Finder Tool"}
                      {currentStep === 2 && "TELL US ALL ABOUT YOUR UNDERGRAD"}
                      {currentStep === 3 && "FILL UP YOUR TEST SCORES"}
                      {currentStep === 4 && "College Finder Tool"}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Step {currentStep} of 4 • {Math.round((currentStep / 4) * 100)}% complete
                    </p>
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    {[1, 2, 3, 4].map((step) => (
                      <motion.div
                        key={step}
                        animate={{ 
                          width: step === currentStep ? 32 : 12,
                          backgroundColor: step <= currentStep ? "#F88210" : "#F7DDC5"
                        }}
                        className="h-2 rounded-full"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-6 min-h-[300px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {currentStep === 1 && (
                        <>
                          <div className="space-y-2">
                            <label className="block text-gray-900 font-bold font-outfit">
                              Where do you want to study? <span className="text-[#E3572B]">*</span>
                            </label>
                            <div className="relative">
                              <select
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                className="w-full px-6 py-3.5 border border-[#DDDDDD] rounded-2xl font-outfit text-gray-600 focus:outline-none focus:border-[#E3572B] focus:ring-4 focus:ring-[#E3572B]/10 transition-all appearance-none bg-white cursor-pointer"
                              >
                                <option value="">Which country</option>
                                <option value="usa">United States</option>
                                <option value="canada">Canada</option>
                                <option value="uk">United Kingdom</option>
                              </select>
                              <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-gray-900 font-bold font-outfit">
                              What are you planning to study? <span className="text-[#E3572B]">*</span>
                            </label>
                            <div className="relative">
                              <select
                                value={formData.major}
                                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                                className="w-full px-6 py-3.5 border border-[#DDDDDD] rounded-2xl font-outfit text-gray-600 focus:outline-none focus:border-[#E3572B] focus:ring-4 focus:ring-[#E3572B]/10 transition-all appearance-none bg-white cursor-pointer"
                              >
                                <option value="">Which major</option>
                                <option value="engineering">Engineering</option>
                                <option value="cs">Computer Science</option>
                                <option value="business">Business</option>
                              </select>
                              <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="block text-gray-900 font-bold font-outfit opacity-50">How many research papers?</label>
                              <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-[#E3572B] text-[10px] font-bold uppercase tracking-wider rounded-full border border-orange-100">
                                <Crown size={12} />
                                Premium
                              </span>
                            </div>
                            <div className="relative group grayscale">
                              <select disabled className="w-full px-6 py-3.5 border border-[#DDDDDD] rounded-2xl font-outfit text-gray-400 appearance-none bg-gray-50">
                                <option>Unlock with Premium</option>
                              </select>
                              <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                            </div>
                          </div>
                        </>
                      )}

                      {currentStep === 2 && (
                        <>
                          <div className="space-y-2">
                            <label className="block text-gray-900 font-bold font-outfit">
                              What was your undergraduate college name? <span className="text-[#E3572B]">*</span>
                            </label>
                            <div className="relative">
                              <select
                                value={formData.collegeName}
                                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                                className="w-full px-6 py-3.5 border border-[#DDDDDD] rounded-2xl font-outfit text-gray-600 focus:outline-none focus:border-[#E3572B] shadow-sm appearance-none bg-white cursor-pointer"
                              >
                                <option value="">Which college</option>
                                <option value="college-a">College A</option>
                                <option value="college-b">College B</option>
                              </select>
                              <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-gray-900 font-bold font-outfit">
                              Which course did you major in? <span className="text-[#E3572B]">*</span>
                            </label>
                            <div className="relative">
                              <select
                                value={formData.undergradMajor}
                                onChange={(e) => setFormData({ ...formData, undergradMajor: e.target.value })}
                                className="w-full px-6 py-3.5 border border-[#DDDDDD] rounded-2xl font-outfit text-gray-600 focus:outline-none focus:border-[#E3572B] shadow-sm appearance-none bg-white cursor-pointer"
                              >
                                <option value="">Which major</option>
                                <option value="cs">Computer Science</option>
                                <option value="ece">Electrical Engineering</option>
                              </select>
                              <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-gray-900 font-bold font-outfit text-sm">
                                Score/Expected Score <span className="text-[#E3572B]">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="0/4"
                                value={formData.score}
                                onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                                className="w-full px-6 py-3.5 border border-[#DDDDDD] rounded-2xl font-outfit text-gray-600 focus:outline-none focus:border-[#E3572B] shadow-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-gray-900 font-bold font-outfit text-sm">Backlogs</label>
                              <input
                                type="text"
                                placeholder="0"
                                value={formData.backlogs}
                                onChange={(e) => setFormData({ ...formData, backlogs: e.target.value })}
                                className="w-full px-6 py-3.5 border border-[#DDDDDD] rounded-2xl font-outfit text-gray-600 focus:outline-none focus:border-[#E3572B] shadow-sm"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {currentStep === 3 && (
                        <>
                          <div className="space-y-3">
                            <label className="block text-gray-900 font-bold font-outfit">
                              English Test <span className="text-[#E3572B]">*</span>
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                              {["TOEFL", "IELTS", "PTE"].map((test) => (
                                <button
                                  key={test}
                                  onClick={() => setFormData({ ...formData, englishTest: test })}
                                  className={`py-3 rounded-2xl border font-outfit font-bold transition-all ${
                                    formData.englishTest === test
                                      ? "bg-[#E3572B] border-[#E3572B] text-white shadow-lg"
                                      : "bg-white border-[#DDDDDD] text-gray-500 hover:border-gray-400"
                                  }`}
                                >
                                  {test}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="block text-gray-900 font-bold font-outfit text-sm">Overall score</label>
                              <input
                                type="text"
                                placeholder="9"
                                value={formData.overallScore}
                                onChange={(e) => setFormData({ ...formData, overallScore: e.target.value })}
                                className="w-full px-6 py-3.5 border border-[#DDDDDD] rounded-2xl font-outfit text-gray-600 focus:outline-none focus:border-[#E3572B] shadow-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-gray-900 font-bold font-outfit text-sm">Aptitude Test</label>
                              <select 
                                value={formData.aptitudeTest}
                                onChange={(e) => setFormData({ ...formData, aptitudeTest: e.target.value })}
                                className="w-full px-6 py-3.5 border border-[#DDDDDD] rounded-2xl font-outfit text-gray-600 focus:outline-none focus:border-[#E3572B] shadow-sm bg-white"
                              >
                                <option value="None">None</option>
                                <option value="GRE">GRE</option>
                                <option value="GMAT">GMAT</option>
                              </select>
                            </div>
                          </div>
                        </>
                      )}

                      {currentStep === 4 && (
                        <>
                          <div className="space-y-2">
                            <label className="block text-gray-900 font-bold font-outfit">Work Experience</label>
                            <select
                              value={formData.workExperience}
                              onChange={(e) => setFormData({ ...formData, workExperience: e.target.value })}
                              className="w-full px-6 py-3.5 border border-[#DDDDDD] rounded-2xl font-outfit text-gray-600 focus:outline-none focus:border-[#E3572B] shadow-sm bg-white"
                            >
                              <option value="">Which month</option>
                              <option value="0-6">0-6 months</option>
                              <option value="6-12">6-12 months</option>
                              <option value="12+">12+ months</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-gray-900 font-bold font-outfit">Research Papers</label>
                            <div className="grid grid-cols-3 gap-3">
                              {["International", "National", "None"].map((option) => (
                                <button
                                  key={option}
                                  onClick={() => setFormData({ ...formData, publishedPapers: option })}
                                  className={`py-3 rounded-2xl border font-outfit font-bold transition-all ${
                                    formData.publishedPapers === option
                                      ? "bg-[#E3572B] border-[#E3572B] text-white shadow-lg"
                                      : "bg-white border-[#DDDDDD] text-gray-500 hover:border-gray-400"
                                  }`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between mt-10">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : setIsModalOpen(false)}
                    className="px-8 py-3 bg-white border border-[#DDDDDD] text-gray-600 rounded-full font-outfit font-semibold cursor-pointer transition-all"
                  >
                    {currentStep > 1 ? "Back" : "Cancel"}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 20px rgba(227,87,43,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (currentStep < 4) {
                        setCurrentStep(currentStep + 1);
                      } else {
                        setIsModalOpen(false);
                      }
                    }}
                    className="px-10 py-3 bg-[#E3572B] text-white rounded-full font-outfit font-bold shadow-lg cursor-pointer flex items-center gap-2"
                  >
                    {currentStep === 4 ? "Complete" : "Continue"}
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ScholarshipPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F5]" />}>
      <ScholarshipPageContent />
    </Suspense>
  );
};

export default ScholarshipPage;
