"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Heart, Users, Award, Bell, Search, SlidersHorizontal, CircleDollarSign, Clock, X, ChevronDown, Crown } from 'lucide-react';

const DashboardPage = () => {
  const [userName] = useState('Aklima');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form state
  const [formData, setFormData] = useState({
    country: '',
    major: '',
    specialization: '',
    collegeName: '',
    course: '',
    score: '',
    backlogs: '',
    englishTest: '',
    overallScore: '',
    aptitudeTest: '',
    verbal: '',
    quants: '',
    awa: '',
    workExperience: '',
    projects: '',
    researchPapers: ''
  });

  const universities = [
    {
      id: 1,
      name: "University of Delaware",
      location: "United States",
      image: "/universities/delaware.png",
      price: "$21,090/year",
      duration: "24 months"
    },
    {
      id: 2,
      name: "University of Delaware",
      location: "United States",
      image: "/universities/delaware.png",
      price: "$21,090/year",
      duration: "24 months"
    },
    {
      id: 3,
      name: "University of Delaware",
      location: "United States",
      image: "/universities/delaware.png",
      price: "$21,090/year",
      duration: "24 months"
    },
    {
      id: 4,
      name: "University of Delaware",
      location: "United States",
      image: "/universities/delaware.png",
      price: "$21,090/year",
      duration: "24 months"
    },
    {
      id: 5,
      name: "University of Delaware",
      location: "United States",
      image: "/universities/delaware.png",
      price: "$21,090/year",
      duration: "24 months"
    },
    {
      id: 6,
      name: "University of Delaware",
      location: "United States",
      image: "/universities/delaware.png",
      price: "$21,090/year",
      duration: "24 months"
    },
    {
      id: 7,
      name: "University of Delaware",
      location: "United States",
      image: "/universities/delaware.png",
      price: "$21,090/year",
      duration: "24 months"
    },
    {
      id: 8,
      name: "University of Delaware",
      location: "United States",
      image: "/universities/delaware.png",
      price: "$21,090/year",
      duration: "24 months"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="">
            <Image src="/icons/logo.png" alt="allunipply logo" width={216} height={84} className="object-contain" />
          </Link>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <button className="relative">
                <Bell size={24} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <Image 
                    src="/icons/user-avatar.png" 
                    alt="User" 
                    width={40} 
                    height={40}
                    className="object-cover"
                  />
                </div>
                <span className="text-gray-900 font-outfit font-semibold hidden sm:inline">Aklima Tul</span>
              </div>

              {/* Sign Out Button */}
              <button className="px-6 py-2 border-2 border-[#E3572B] text-[#E3572B] rounded-lg font-outfit font-semibold hover:bg-[#E3572B] hover:text-white transition-all">
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Greeting */}
        <h1 className="text-4xl md:text-6xl font-medium text-[#E3572B] mb-2 font-outfit text-center">
          Hello, {userName}!
        </h1>
        <h2 className="text-4xl md:text-6xl font-medium  mb-8 font-outfit text-center">
          Here's your personalized list of universities!
        </h2>

        {/* Shortlist Banner */}
        <div className="bg-gradient-to-r from-[#FF9B6B] to-[#FFA87A] rounded-[24px] p-8 md:p-12 mb-8 relative overflow-hidden "
        style={{
            background: 'linear-gradient(90deg, rgba(255, 139, 34, 1) 0%, rgba(255, 182.29, 116.47, 1) 100%)'
          }}>
          {/* Decorative circles */}
          <div className="absolute top-4 right-12 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-4 right-32 w-24 h-24 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-1/2 right-4 w-16 h-16 bg-white opacity-10 rounded-full"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 font-outfit">
                Your shortlist can make or break<br />
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

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Program"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-full font-outfit focus:outline-none focus:border-[#E3572B] transition-colors"
            />
          </div>

          {/* Filter Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 border-2 border-gray-300 rounded-full font-outfit font-semibold text-gray-700 hover:border-[#E3572B] transition-all flex items-center justify-center gap-2"
          >
            <SlidersHorizontal size={20} />
            Filter
          </button>
        </div>

        {/* University Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {universities.map((university) => (
            <div key={university.id} className="bg-white rounded-t-[32px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* University Image */}
              <div className="relative h-[366px] w-full overflow-hidden">
                <Image
                  src={university.image}
                  alt={university.name}
                  width={550}
                  height={366}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Top Section - Name/Location and Price/Duration */}
                <div className="flex items-start justify-between mb-6">
                  {/* Left - University Name and Location */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-outfit">
                      {university.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-outfit">
                      {university.location}
                    </p>
                  </div>

                  {/* Right - Price, Duration and Icon */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 mb-1">
                        <CircleDollarSign size={18} className="text-[#E3572B]" />
                        <span className="text-base font-semibold text-[#E3572B] font-outfit">
                          {university.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-gray-600" />
                        <span className="text-sm text-gray-600 font-outfit">{university.duration}</span>
                      </div>
                    </div>
                    <Image 
                      src="/icons/circle-arrow.png" 
                      alt="Info" 
                      width={24} 
                      height={24}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button className="flex-1 py-3 text-[#E3572B] text-sm font-semibold font-outfit rounded-full hover:bg-gray-50 transition-colors" style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}>
                    Shortlisted
                  </button>
                  <button className="flex-1 py-3 text-[#E3572B] text-sm font-semibold font-outfit rounded-full hover:bg-gray-50 transition-colors" style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}>
                    See all details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
        style={{
            background: 'linear-gradient(90deg, rgba(255, 139, 34, 1) 0%, rgba(255, 182.29, 116.47, 1) 100%)'
          }}>
          {/* Decorative circles */}
          <div className="absolute top-4 left-12 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-4 left-32 w-24 h-24 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-1/2 right-4 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-8 right-32 w-20 h-20 bg-white opacity-10 rounded-full"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-white text-2xl md:text-4xl font-bold mb-3 font-outfit">
                Want to give it a go again?
              </h3>
              <p className="text-white text-sm md:text-base font-outfit">
                Consult with our experts to understand how to create the best shortlist for your needs
              </p>
            </div>
            <button className="px-10 py-3 bg-white text-gray-900 rounded-full font-outfit font-semibold hover:shadow-lg transition-all whitespace-nowrap">
              Try gain
            </button>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-opacity-20 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors z-10"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Modal Header */}
            <div className="p-8 pb-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-1 h-12 bg-[#E3572B] rounded-full"></div>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-outfit">
                    {currentStep === 1 && "College Finder Tool: Find Your Dream College Abroad"}
                    {currentStep === 2 && "TELL US ALL ABOUT YOUR UNDERGRAD"}
                    {currentStep === 3 && "FILL UP YOUR TEST SCORES"}
                    {currentStep === 4 && "College Finder Tool: Find Your Dream College Abroad"}
                  </h2>
                </div>
                <div className="text-sm font-semibold font-outfit text-gray-600">
                  {currentStep}/4
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex gap-2 mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-2 flex-1 rounded-full ${
                      step <= currentStep ? 'bg-[#E3572B]' : 'bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>

              {/* Step Content */}
              <div className="space-y-6">
                {/* Step 1 */}
                {currentStep === 1 && (
                  <>
                    {/* Country */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit">
                        Which country do you want to study? <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors appearance-none"
                        >
                          <option value="">Which country</option>
                          <option value="usa">United States</option>
                          <option value="uk">United Kingdom</option>
                          <option value="canada">Canada</option>
                          <option value="australia">Australia</option>
                        </select>
                        <ChevronDown size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Major */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit">
                        What are you planning to study? <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.major}
                          onChange={(e) => setFormData({...formData, major: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors appearance-none"
                        >
                          <option value="">Which major</option>
                          <option value="cs">Computer Science</option>
                          <option value="engineering">Engineering</option>
                          <option value="business">Business</option>
                          <option value="medicine">Medicine</option>
                        </select>
                        <ChevronDown size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Specialization */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-gray-900 font-medium font-outfit">
                          What specialization do you prefer?
                        </label>
                        <div className="flex items-center gap-1 text-[#E3572B] text-xs font-semibold">
                          <Crown size={14} />
                          Premium Exclusive
                        </div>
                      </div>
                      <div className="relative">
                        <select
                          value={formData.specialization}
                          onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit text-gray-400 focus:outline-none focus:border-[#E3572B] transition-colors appearance-none"
                          disabled
                        >
                          <option value="">Unlock</option>
                        </select>
                        <ChevronDown size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2 */}
                {currentStep === 2 && (
                  <>
                    {/* College Name */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit">
                        What was your undergraduate college name? <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.collegeName}
                          onChange={(e) => setFormData({...formData, collegeName: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors appearance-none"
                        >
                          <option value="">Which college</option>
                          <option value="college1">College 1</option>
                          <option value="college2">College 2</option>
                        </select>
                        <ChevronDown size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Course */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit">
                        Which course did you major in? <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.course}
                          onChange={(e) => setFormData({...formData, course: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors appearance-none"
                        >
                          <option value="">Which major</option>
                          <option value="cs">Computer Science</option>
                          <option value="engineering">Engineering</option>
                        </select>
                        <ChevronDown size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Score and Backlogs */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-900 font-medium mb-2 font-outfit text-sm">
                          What is your score/expected score? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="0/4"
                          value={formData.score}
                          onChange={(e) => setFormData({...formData, score: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors"
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
                          onChange={(e) => setFormData({...formData, backlogs: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3 */}
                {currentStep === 3 && (
                  <>
                    {/* English Test */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-3 font-outfit">
                        Which English test did you take? <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-3">
                        {['TOEFL', 'IELTS', 'PTE'].map((test) => (
                          <button
                            key={test}
                            onClick={() => setFormData({...formData, englishTest: test})}
                            className={`flex-1 py-3 rounded-full font-outfit font-semibold transition-all ${
                              formData.englishTest === test
                                ? 'bg-[#FFB27D] text-white'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {test}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Overall Score */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit">
                        Overall score <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="9"
                        value={formData.overallScore}
                        onChange={(e) => setFormData({...formData, overallScore: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors"
                      />
                    </div>

                    {/* Aptitude Test */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-3 font-outfit">
                        Which aptitude test did you take? <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-3">
                        {['GRE', 'GMAT', 'None'].map((test) => (
                          <button
                            key={test}
                            onClick={() => setFormData({...formData, aptitudeTest: test})}
                            className={`flex-1 py-3 rounded-full font-outfit font-semibold transition-all ${
                              formData.aptitudeTest === test
                                ? 'bg-[#FFB27D] text-white'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {test}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Test Scores */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-900 font-medium mb-2 font-outfit text-sm">
                          Verbal
                        </label>
                        <input
                          type="text"
                          placeholder="0/170"
                          value={formData.verbal}
                          onChange={(e) => setFormData({...formData, verbal: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-900 font-medium mb-2 font-outfit text-sm">
                          Quants
                        </label>
                        <input
                          type="text"
                          placeholder="0/170"
                          value={formData.quants}
                          onChange={(e) => setFormData({...formData, quants: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-900 font-medium mb-2 font-outfit text-sm">
                          AWA
                        </label>
                        <input
                          type="text"
                          placeholder="0"
                          value={formData.awa}
                          onChange={(e) => setFormData({...formData, awa: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 4 */}
                {currentStep === 4 && (
                  <>
                    {/* Work Experience */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit">
                        How much relevant work experience do you have?
                      </label>
                      <div className="relative">
                        <select
                          value={formData.workExperience}
                          onChange={(e) => setFormData({...formData, workExperience: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors appearance-none"
                        >
                          <option value="">Which month</option>
                          <option value="0-6">0-6 months</option>
                          <option value="6-12">6-12 months</option>
                          <option value="1-2">1-2 years</option>
                          <option value="2+">2+ years</option>
                        </select>
                        <ChevronDown size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Projects */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 font-outfit">
                        How many relevant projects have you done?
                      </label>
                      <div className="relative">
                        <select
                          value={formData.projects}
                          onChange={(e) => setFormData({...formData, projects: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit text-gray-500 focus:outline-none focus:border-[#E3572B] transition-colors appearance-none"
                        >
                          <option value="">0</option>
                          <option value="1-2">1-2</option>
                          <option value="3-5">3-5</option>
                          <option value="5+">5+</option>
                        </select>
                        <ChevronDown size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Research Papers */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-3 font-outfit italic">
                        Have you published any relevant research papers?
                      </label>
                      <div className="flex gap-3">
                        {['International', 'National', 'None'].map((option) => (
                          <button
                            key={option}
                            onClick={() => setFormData({...formData, researchPapers: option})}
                            className={`flex-1 py-3 rounded-full font-outfit font-semibold transition-all ${
                              formData.researchPapers === option
                                ? 'bg-[#FFB27D] text-white'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 pt-4 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-outfit font-semibold hover:border-gray-300 transition-all"
                >
                  Back
                </button>
              ) : (
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-outfit font-semibold hover:border-gray-300 transition-all"
                >
                  Cancel
                </button>
              )}
              
              <button
                onClick={() => {
                  if (currentStep < 4) {
                    setCurrentStep(currentStep + 1);
                  } else {
                    setIsModalOpen(false);
                    setCurrentStep(1);
                  }
                }}
                className="px-8 py-3 bg-[#E3572B] text-white rounded-full font-outfit font-semibold hover:bg-[#c24d2b] transition-all"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
