"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, ChevronDown, Crown, ArrowRight } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";

const scholarshipDescriptions = [
  "The university provides additional funding based on the estimated financial need determined by the FAFSA.",
  "The Office of Admissions has scholarships available for first-year, transfer, and international students.",
  "Delaware State University's Athletics: Your eligibility for scholarships may be impacted if you receive a certain...",
];

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

  const scholarships = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    image: "/universities/delaware.png",
    intake: "April 23",
    tag: "more information",
    description: scholarshipDescriptions[index % scholarshipDescriptions.length],
  }));

  if (!isHydrated) {
    return <div className="min-h-screen bg-[#F5F5F5]" />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-4xl md:text-6xl font-medium text-[#E3572B] mb-2 font-outfit text-center">
          Hello, {userName}!
        </h1>
        <h2 className="text-xl md:text-3xl font-semibold mb-8 font-outfit text-center text-[#222]">
          Here&apos;s your personalized list of Scholarship according to universities!
        </h2>

        <div
          className="rounded-3xl p-8 md:p-10 mb-8 relative overflow-hidden"
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
            <button className="px-8 py-3 bg-white text-[#6B5CE7] rounded-full font-outfit font-semibold hover:shadow-lg transition-all whitespace-nowrap">
              Get Personalized Advice
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Programs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-[#D8D8D8] rounded-full font-outfit focus:outline-none focus:border-[#E3572B] transition-colors bg-white"
            />
          </div>

          <button
            onClick={() => {
              setCurrentStep(1);
              setIsModalOpen(true);
            }}
            className="px-6 py-3 border border-[#D8D8D8] rounded-full font-outfit font-semibold text-gray-700 hover:border-[#E3572B] transition-all flex items-center justify-center gap-2 bg-white"
          >
            <SlidersHorizontal size={18} />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-12">
          {scholarships.map((scholarship) => (
            <article key={scholarship.id} className="rounded-3xl">
              <div className="relative h-56 w-full overflow-hidden rounded-[28px] mb-5">
                <Image src={scholarship.image} alt="Scholarship university" fill className="object-cover" />
                <div className="absolute left-4 bottom-4 flex items-center gap-2">
                  <span className="px-6 py-2 rounded-full text-[13px] border border-[#E3572B] bg-white text-[#222] font-outfit font-medium">
                    {scholarship.intake}
                  </span>
                  <span className="px-6 py-2 rounded-full text-[13px] border border-[#E3572B] bg-white text-[#222] font-outfit font-medium">
                    {scholarship.tag}
                  </span>
                </div>
              </div>

              <p className="text-2xl md:text-[28px] leading-[1.2] text-[#111] font-outfit font-bold mb-6">
                {scholarship.description}
              </p>

              <button className="inline-flex items-center justify-between min-w-[200px] px-6 py-3 rounded-full bg-[#E3572B] text-white font-outfit text-xl leading-none font-medium hover:bg-[#c24d2b] transition-colors">
                <span>Learn more</span>
                <span className="ml-5 h-10 w-10 rounded-full bg-[#f58056] flex items-center justify-center">
                  <ArrowRight size={18} />
                </span>
              </button>
            </article>
          ))}
        </div>

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

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-7 h-7 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors z-10"
            >
              <X size={16} className="text-white" />
            </button>

            <div className="p-6 md:p-7">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-1 h-7 bg-[#F88210] rounded-full mt-0.5"></div>
                <h2 className="text-lg font-semibold text-gray-900 font-outfit leading-tight flex-1">
                  {currentStep === 1 && "Scholarship Finder Tool: Find Your Dream University with scholarshipAbroad"}
                  {currentStep === 2 && "TELL US ALL ABOUT YOUR UNDERGRAD"}
                  {currentStep === 3 && "FILL UP YOUR TEST SCORES"}
                  {currentStep === 4 && "College Finder Tool: Find Your Dream College Abroad"}
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <span
                        key={step}
                        className={`h-1.5 w-6 rounded-full ${step <= currentStep ? "bg-[#F88210]" : "bg-[#F7DDC5]"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold font-outfit text-gray-600">{currentStep}/4</span>
                </div>
              </div>

              <div className="space-y-5">
                {currentStep === 1 ? (
                  <>
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit">
                        Where do you want to study? <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full px-4 py-3 border border-[#DDDDDD] rounded-full font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors appearance-none"
                        >
                          <option value="">Which country</option>
                          <option value="usa">United States</option>
                          <option value="canada">Canada</option>
                          <option value="uk">United Kingdom</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit">
                        What are you planning to study? <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.major}
                          onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                          className="w-full px-4 py-3 border border-[#DDDDDD] rounded-full font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors appearance-none"
                        >
                          <option value="">Which major</option>
                          <option value="engineering">Engineering</option>
                          <option value="cs">Computer Science</option>
                          <option value="business">Business</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-gray-900 font-medium font-outfit">how many research paper do you have ?</label>
                        <div className="flex items-center gap-1 text-[#E3572B] text-xs font-semibold">
                          <Crown size={12} />
                          Premium Exclusive
                        </div>
                      </div>
                      <div className="relative">
                        <select
                          value={formData.researchPaperCount}
                          onChange={(e) => setFormData({ ...formData, researchPaperCount: e.target.value })}
                          className="w-full px-4 py-3 border border-[#DDDDDD] rounded-full font-outfit text-gray-400 focus:outline-none appearance-none"
                          disabled
                        >
                          <option value="">Unlock</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </>
                ) : null}

                {currentStep === 2 ? (
                  <>
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit">
                        What was your undergraduate college name? <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.collegeName}
                          onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                          className="w-full px-4 py-3 border border-[#DDDDDD] rounded-full font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors appearance-none"
                        >
                          <option value="">Which college</option>
                          <option value="college-a">College A</option>
                          <option value="college-b">College B</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit">
                        Which course did you major in? <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.undergradMajor}
                          onChange={(e) => setFormData({ ...formData, undergradMajor: e.target.value })}
                          className="w-full px-4 py-3 border border-[#DDDDDD] rounded-full font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors appearance-none"
                        >
                          <option value="">Which major</option>
                          <option value="cs">Computer Science</option>
                          <option value="ece">Electrical Engineering</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-900 font-medium mb-2 font-outfit text-sm">
                          What is your score/expected score? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="0/4"
                          value={formData.score}
                          onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                          className="w-full px-4 py-3 border border-[#DDDDDD] rounded-full font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-900 font-medium mb-2 font-outfit text-sm">
                          Do you have any backlogs?
                        </label>
                        <input
                          type="text"
                          placeholder="0"
                          value={formData.backlogs}
                          onChange={(e) => setFormData({ ...formData, backlogs: e.target.value })}
                          className="w-full px-4 py-3 border border-[#DDDDDD] rounded-full font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors"
                        />
                      </div>
                    </div>
                  </>
                ) : null}

                {currentStep === 3 ? (
                  <>
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit">
                        Which English test did you take? <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {["TOEFL", "IELTS", "PTE"].map((test) => (
                          <button
                            key={test}
                            onClick={() => setFormData({ ...formData, englishTest: test })}
                            className={`py-2.5 rounded-full border font-outfit text-sm transition-all ${
                              formData.englishTest === test
                                ? "bg-[#FFD0A5] border-[#F88210] text-[#E3572B]"
                                : "bg-white border-[#DDDDDD] text-gray-500"
                            }`}
                          >
                            {test}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit text-sm">
                        Overall score <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="9"
                        value={formData.overallScore}
                        onChange={(e) => setFormData({ ...formData, overallScore: e.target.value })}
                        className="w-full md:w-1/3 px-4 py-3 border border-[#DDDDDD] rounded-full font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit text-sm">
                        Which aptitude test did you take? <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {["GRE", "GMAT", "None"].map((test) => (
                          <button
                            key={test}
                            onClick={() => setFormData({ ...formData, aptitudeTest: test })}
                            className={`py-2.5 rounded-full border font-outfit text-sm transition-all ${
                              formData.aptitudeTest === test
                                ? "bg-[#FFD0A5] border-[#F88210] text-[#E3572B]"
                                : "bg-white border-[#DDDDDD] text-gray-500"
                            }`}
                          >
                            {test}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-900 font-medium mb-2 font-outfit text-sm">Verbal</label>
                        <input
                          type="text"
                          placeholder="0/170"
                          value={formData.verbal}
                          onChange={(e) => setFormData({ ...formData, verbal: e.target.value })}
                          className="w-full px-4 py-3 border border-[#DDDDDD] rounded-full font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-900 font-medium mb-2 font-outfit text-sm">Quants</label>
                        <input
                          type="text"
                          placeholder="0/170"
                          value={formData.quants}
                          onChange={(e) => setFormData({ ...formData, quants: e.target.value })}
                          className="w-full px-4 py-3 border border-[#DDDDDD] rounded-full font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-900 font-medium mb-2 font-outfit text-sm">AWA</label>
                        <input
                          type="text"
                          placeholder="0"
                          value={formData.awa}
                          onChange={(e) => setFormData({ ...formData, awa: e.target.value })}
                          className="w-full px-4 py-3 border border-[#DDDDDD] rounded-full font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors"
                        />
                      </div>
                    </div>
                  </>
                ) : null}

                {currentStep === 4 ? (
                  <>
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit">
                        How much relevant work experience do you have?
                      </label>
                      <div className="relative">
                        <select
                          value={formData.workExperience}
                          onChange={(e) => setFormData({ ...formData, workExperience: e.target.value })}
                          className="w-full px-4 py-3 border border-[#DDDDDD] rounded-full font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors appearance-none"
                        >
                          <option value="">Which month</option>
                          <option value="0-6">0-6 months</option>
                          <option value="6-12">6-12 months</option>
                          <option value="12+">12+ months</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit">
                        How many relevant projects have you done?
                      </label>
                      <div className="relative">
                        <select
                          value={formData.projects}
                          onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
                          className="w-full px-4 py-3 border border-[#DDDDDD] rounded-full font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors appearance-none"
                        >
                          <option value="">0</option>
                          <option value="1-2">1-2</option>
                          <option value="3-5">3-5</option>
                          <option value="5+">5+</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit">
                        Have you published any relevant research papers?
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {["International", "National", "None"].map((option) => (
                          <button
                            key={option}
                            onClick={() => setFormData({ ...formData, publishedPapers: option })}
                            className={`py-2.5 rounded-full border font-outfit text-sm transition-all ${
                              formData.publishedPapers === option
                                ? "bg-[#FFD0A5] border-[#F88210] text-[#E3572B]"
                                : "bg-white border-[#DDDDDD] text-gray-500"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>

            <div className="p-6 md:p-7 pt-0 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-7 py-2.5 bg-white border border-[#DDDDDD] text-gray-700 rounded-full font-outfit font-medium hover:border-gray-300 transition-all"
                >
                  Back
                </button>
              ) : (
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-7 py-2.5 bg-white border border-[#DDDDDD] text-gray-700 rounded-full font-outfit font-medium hover:border-gray-300 transition-all"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={() => {
                  if (currentStep < 4) {
                    setCurrentStep(currentStep + 1);
                    return;
                  }
                  setIsModalOpen(false);
                  setCurrentStep(1);
                }}
                className="px-7 py-2.5 bg-[#E3572B] text-white rounded-full font-outfit font-semibold hover:bg-[#c24d2b] transition-all"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
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
