"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, CircleDollarSign, Clock, X, ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";

const PublicUniversityPageContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shouldAutoOpenFinder = searchParams.get("openFinder") === "true";

  const userName = "Aklima";
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(shouldAutoOpenFinder);
  const [currentStep, setCurrentStep] = useState(1);
  const [finderFormData, setFinderFormData] = useState({
    university: "",
    group: "",
    shaka: "",
    collegeName: "",
    schoolName: "",
    hscScore: "",
    sscScore: "",
    oLevelScore: "",
    aLevelScore: "",
  });

  useEffect(() => {
    if (shouldAutoOpenFinder) {
      router.replace(pathname, { scroll: false });
    }
  }, [pathname, router, shouldAutoOpenFinder]);

  const universities = [
    {
      id: 1,
      name: "University of Chittagong",
      location: "Chittagong",
      image: "/universities/chittagong.png",
      price: "$21,090/year",
      duration: "24 months",
    },
    {
      id: 2,
      name: "University of Chittagong",
      location: "Chittagong",
      image: "/universities/chittagong.png",
      price: "$21,090/year",
      duration: "24 months",
    },
    {
      id: 3,
      name: "University of Chittagong",
      location: "Chittagong",
      image: "/universities/chittagong.png",
      price: "$21,090/year",
      duration: "24 months",
    },
    {
      id: 4,
      name: "University of Chittagong",
      location: "Chittagong",
      image: "/universities/chittagong.png",
      price: "$21,090/year",
      duration: "24 months",
    },
    {
      id: 5,
      name: "University of Chittagong",
      location: "Chittagong",
      image: "/universities/chittagong.png",
      price: "$21,090/year",
      duration: "24 months",
    },
    {
      id: 6,
      name: "University of Chittagong",
      location: "Chittagong",
      image: "/universities/chittagong.png",
      price: "$21,090/year",
      duration: "24 months",
    },
    {
      id: 7,
      name: "University of Chittagong",
      location: "Chittagong",
      image: "/universities/chittagong.png",
      price: "$21,090/year",
      duration: "24 months",
    },
    {
      id: 8,
      name: "University of Chittagong",
      location: "Chittagong",
      image: "/universities/chittagong.png",
      price: "$21,090/year",
      duration: "24 months",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-4xl md:text-6xl font-medium text-[#E3572B] mb-2 font-outfit text-center">
          Hello, {userName}!
        </h1>
        <h2 className="text-4xl md:text-6xl font-medium mb-8 font-outfit text-center">
          Here&apos;s your personalized list of universities!
        </h2>

        <div
          className="bg-gradient-to-r from-[#FF9B6B] to-[#FFA87A] rounded-[24px] p-8 md:p-12 mb-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(90deg, rgba(255, 139, 34, 1) 0%, rgba(255, 182.29, 116.47, 1) 100%)",
          }}
        >
          <div className="absolute top-4 right-12 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-4 right-32 w-24 h-24 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-1/2 right-4 w-16 h-16 bg-white opacity-10 rounded-full"></div>

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
            <button className="px-8 py-3 bg-white text-[#6B5CE7] rounded-lg font-outfit font-semibold hover:shadow-lg transition-all whitespace-nowrap">
              Get Personalized Advice
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Program"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-full font-outfit focus:outline-none focus:border-[#E3572B] transition-colors"
            />
          </div>

          <button
            onClick={() => {
              setCurrentStep(1);
              setIsModalOpen(true);
            }}
            className="px-6 py-3 border-2 border-gray-300 rounded-full font-outfit font-semibold text-gray-700 hover:border-[#E3572B] transition-all flex items-center justify-center gap-2"
          >
            <SlidersHorizontal size={20} />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {universities.map((university) => (
            <div key={university.id} className="bg-white rounded-t-[32px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-[366px] w-full overflow-hidden">
                <Image
                  src={university.image}
                  alt={university.name}
                  width={550}
                  height={366}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-outfit">{university.name}</h3>
                    <p className="text-sm text-gray-500 font-outfit">{university.location}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 mb-1">
                        <CircleDollarSign size={18} className="text-[#E3572B]" />
                        <span className="text-base font-semibold text-[#E3572B] font-outfit">{university.price}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-gray-600" />
                        <span className="text-sm text-gray-600 font-outfit">{university.duration}</span>
                      </div>
                    </div>
                    <Image src="/icons/circle-arrow.png" alt="Info" width={24} height={24} className="cursor-pointer" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/national-university/public-university/my-application"
                    className="flex-1 py-3 text-[#E3572B] text-sm font-semibold font-outfit rounded-full hover:bg-gray-50 transition-colors text-center"
                    style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                  >
                    Apply Now
                  </Link>
                  <Link
                    href="/national-university/public-university/see-all-details"
                    className="flex-1 py-3 text-[#E3572B] text-sm font-semibold font-outfit rounded-full hover:bg-gray-50 transition-colors text-center"
                    style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                  >
                    See all details
                  </Link>
                </div>
              </div>
            </div>
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
          <div className="absolute top-1/2 right-4 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-8 right-32 w-20 h-20 bg-white opacity-10 rounded-full"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-white text-2xl md:text-4xl font-bold mb-3 font-outfit">Want to give it a go again?</h3>
              <p className="text-white text-sm md:text-base font-outfit">
                Consult with our experts to understand how to create the best shortlist for your needs
              </p>
            </div>
            <button className="px-10 py-3 bg-white text-gray-900 rounded-full font-outfit font-semibold hover:shadow-lg transition-all whitespace-nowrap">
              Try again
            </button>
          </div>
        </div>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden">
            <div className="p-4 md:p-5">
              <div className="flex items-start gap-4">
                <div className="w-2 h-6 bg-[#F88210] rounded-full mt-1"></div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-outfit font-semibold text-base md:text-2xl uppercase text-[#111111]">
                      {currentStep === 1
                        ? "College Finder Tool: Find Your Dream Public university"
                        : "TELL US ALL ABOUT YOUR UNDERGRAD"}
                    </h2>

                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-[#FBE8D5] overflow-hidden">
                        <div
                          className="h-full bg-[#F88210] rounded-full transition-all"
                          style={{ width: currentStep === 1 ? "50%" : "100%" }}
                        ></div>
                      </div>
                      <span className="font-outfit text-sm text-gray-600">{currentStep}/2</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    currentStep === 1 ? "bg-[#E3572B] hover:bg-[#cc4d25]" : "bg-black hover:bg-gray-800"
                  }`}
                >
                  <X size={16} className="text-white" />
                </button>
              </div>

              {currentStep === 1 ? (
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="block font-outfit text-base md:text-lg text-[#111111] mb-2">
                      Where do you want to study? <span className="text-[#E3572B]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={finderFormData.university}
                        onChange={(event) =>
                          setFinderFormData({ ...finderFormData, university: event.target.value })
                        }
                        className="w-full h-11 md:h-12 px-4 border border-[#D9D9D9] rounded-full font-outfit text-sm md:text-base text-gray-500 focus:outline-none focus:border-[#E3572B] appearance-none"
                      >
                        <option value="">Which university</option>
                        <option value="chittagong">University of Chittagong</option>
                        <option value="dhaka">University of Dhaka</option>
                        <option value="jahangirnagar">Jahangirnagar University</option>
                      </select>
                      <ChevronDown
                        size={20}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-outfit text-base md:text-lg text-[#111111] mb-2">
                      What are you planning to study? <span className="text-[#E3572B]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={finderFormData.group}
                        onChange={(event) => setFinderFormData({ ...finderFormData, group: event.target.value })}
                        className="w-full h-11 md:h-12 px-4 border border-[#D9D9D9] rounded-full font-outfit text-sm md:text-base text-gray-500 focus:outline-none focus:border-[#E3572B] appearance-none"
                      >
                        <option value="">Which group</option>
                        <option value="science">Science</option>
                        <option value="commerce">Commerce</option>
                        <option value="arts">Arts</option>
                      </select>
                      <ChevronDown
                        size={20}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-outfit text-base md:text-lg text-[#111111] mb-2">Which shaka do you prefer?</label>
                    <div className="relative">
                      <select
                        value={finderFormData.shaka}
                        onChange={(event) => setFinderFormData({ ...finderFormData, shaka: event.target.value })}
                        className="w-full h-11 md:h-12 px-4 border border-[#D9D9D9] rounded-full font-outfit text-sm md:text-base text-gray-500 focus:outline-none focus:border-[#E3572B] appearance-none"
                      >
                        <option value="">A</option>
                        <option value="a">A</option>
                        <option value="b">B</option>
                        <option value="c">C</option>
                      </select>
                      <ChevronDown
                        size={20}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-1">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-7 h-10 md:h-11 border border-[#D9D9D9] rounded-full font-outfit text-sm md:text-base text-[#111111] hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-7 h-10 md:h-11 bg-[#E3572B] rounded-full font-outfit text-white text-sm md:text-base hover:bg-[#cc4d25] transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-outfit text-base md:text-lg text-[#111111] mb-2">
                      What was your collage name? <span className="text-[#E3572B]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={finderFormData.collegeName}
                          onChange={(event) =>
                            setFinderFormData({ ...finderFormData, collegeName: event.target.value })
                          }
                          className="w-full h-11 md:h-12 px-4 border border-[#D9D9D9] rounded-full font-outfit text-sm md:text-base text-gray-500 focus:outline-none focus:border-[#E3572B] appearance-none"
                        >
                          <option value="">Which college</option>
                          <option value="chittagong-college">Chittagong College</option>
                          <option value="dhaka-college">Dhaka College</option>
                          <option value="rajuk">Rajuk College</option>
                        </select>
                        <ChevronDown
                          size={20}
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-outfit text-base md:text-lg text-[#111111] mb-2">
                        What was your school name? <span className="text-[#E3572B]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={finderFormData.schoolName}
                          onChange={(event) =>
                            setFinderFormData({ ...finderFormData, schoolName: event.target.value })
                          }
                          className="w-full h-11 md:h-12 px-4 border border-[#D9D9D9] rounded-full font-outfit text-sm md:text-base text-gray-500 focus:outline-none focus:border-[#E3572B] appearance-none"
                        >
                          <option value="">Which school</option>
                          <option value="city-school">City School</option>
                          <option value="gov-school">Govt High School</option>
                          <option value="ideal-school">Ideal School</option>
                        </select>
                        <ChevronDown
                          size={20}
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-outfit text-sm md:text-base text-[#111111] mb-1">
                        What is your HSC score? <span className="text-[#E3572B]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="0/4"
                        value={finderFormData.hscScore}
                        onChange={(event) => setFinderFormData({ ...finderFormData, hscScore: event.target.value })}
                        className="w-full h-11 px-4 border border-[#D9D9D9] rounded-full font-outfit text-sm md:text-base text-gray-500 focus:outline-none focus:border-[#E3572B]"
                      />
                    </div>

                    <div>
                      <label className="block font-outfit text-sm md:text-base text-[#111111] mb-1">
                        What is your SSC score? <span className="text-[#E3572B]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="0"
                        value={finderFormData.sscScore}
                        onChange={(event) => setFinderFormData({ ...finderFormData, sscScore: event.target.value })}
                        className="w-full h-11 px-4 border border-[#D9D9D9] rounded-full font-outfit text-sm md:text-base text-gray-500 focus:outline-none focus:border-[#E3572B]"
                      />
                    </div>

                    <div>
                      <label className="block font-outfit text-sm md:text-base text-[#111111] mb-1">
                        What is your O level score? <span className="text-[#E3572B]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="0/4"
                        value={finderFormData.oLevelScore}
                        onChange={(event) =>
                          setFinderFormData({ ...finderFormData, oLevelScore: event.target.value })
                        }
                        className="w-full h-11 px-4 border border-[#D9D9D9] rounded-full font-outfit text-sm md:text-base text-gray-500 focus:outline-none focus:border-[#E3572B]"
                      />
                    </div>

                    <div>
                      <label className="block font-outfit text-sm md:text-base text-[#111111] mb-1">
                        What is your A level score? <span className="text-[#E3572B]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="0"
                        value={finderFormData.aLevelScore}
                        onChange={(event) =>
                          setFinderFormData({ ...finderFormData, aLevelScore: event.target.value })
                        }
                        className="w-full h-11 px-4 border border-[#D9D9D9] rounded-full font-outfit text-sm md:text-base text-gray-500 focus:outline-none focus:border-[#E3572B]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-7 h-10 md:h-11 border border-[#D9D9D9] rounded-full font-outfit text-sm md:text-base text-[#111111] hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setCurrentStep(1);
                      }}
                      className="px-7 h-10 md:h-11 bg-[#E3572B] rounded-full font-outfit text-white text-sm md:text-base hover:bg-[#cc4d25] transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const PublicUniversityPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F5]" />}>
      <PublicUniversityPageContent />
    </Suspense>
  );
};

export default PublicUniversityPage;
