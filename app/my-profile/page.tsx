"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown, Search, SlidersHorizontal, Check, Trash2, Download, X } from 'lucide-react';

const MyProfilePage = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationTab, setNotificationTab] = useState<'all' | 'unread'>('all');
  const [activeTab, setActiveTab] = useState('myApplication');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgramTab, setSelectedProgramTab] = useState('find');
  const [sortBy, setSortBy] = useState('deadline');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      icon: '⚠️',
      message: 'Welcome to allunipply. Please complete your profile update',
      time: '2m ago',
      isRead: false
    },
    {
      id: 2,
      icon: '✅',
      message: 'You have started your application process. Finish it before deadline.',
      time: '2m ago',
      isRead: false
    },
    {
      id: 3,
      icon: '💼',
      message: 'Try our new premium package offer',
      time: '2m ago',
      isRead: false
    }
  ];

  // Programs data
  const [programs] = useState([
    {
      id: 1,
      university: 'Duquesne University',
      program: 'MS - Biomedical Engineering',
      term: 'Fall',
      year: 2025,
      deadline: '08/01/2025',
      delivery: 'Onsite',
      time: 'Flexible',
      state: 'PA',
      campus: 'Main Campus',
      selected: false
    },
    {
      id: 2,
      university: 'Duquesne University',
      program: 'MS - Biomedical Engineering',
      term: 'Fall',
      year: 2025,
      deadline: '08/01/2025',
      delivery: 'Onsite',
      time: 'Flexible',
      state: 'PA',
      campus: 'Main Campus',
      selected: false
    },
    {
      id: 3,
      university: 'Duquesne University',
      program: 'MS - Biomedical Engineering',
      term: 'Fall',
      year: 2025,
      deadline: '08/01/2025',
      delivery: 'Onsite',
      time: 'Flexible',
      state: 'PA',
      campus: 'Main Campus',
      selected: false
    },
    {
      id: 4,
      university: 'Duquesne University',
      program: 'MS - Biomedical Engineering',
      term: 'Fall',
      year: 2025,
      deadline: '08/01/2025',
      delivery: 'Onsite',
      time: 'Flexible',
      state: 'PA',
      campus: 'Main Campus',
      selected: false
    }
  ]);

  // Submit application data
  const [applicationsForSubmission] = useState([
    {
      id: 1,
      university: 'Duquesne University',
      program: 'MS - Biomedical Engineering',
      deadline: '08/01/2025',
      term: 'Fall',
      progress: 100,
      ready: true
    }
  ]);

  // Status data
  const [applicationStatuses] = useState([
    {
      id: 1,
      university: 'Duquesne University',
      program: 'MS - Biomedical Engineering',
      status: 'In Progress',
      progress: 68,
      steps: [
        { name: 'Your applied university', completed: true },
        { name: 'On progress', completed: true },
        { name: 'Done', completed: false },
        { name: 'Download', completed: false }
      ]
    }
  ]);

  const applicationSections = [
    {
      title: 'Personal Information',
      subtitle: 'Fillout all the Information',
      progress: 68,
      items: [
        'Upload & Acknowledge',
        'Statement',
        'Demographic Information',
        'Connect Information',
        'Other Information'
      ]
    },
    {
      title: 'Academic History',
      subtitle: 'Fillout all the Information',
      progress: 68,
      items: [
        'College Attended',
        'Coursework Entry',
        'Gpx Entry',
        'Standardized Test'
      ]
    },
    {
      title: 'Supporting Information',
      subtitle: 'Fillout all the Information',
      progress: 68,
      items: ['Documents']
    },
    {
      title: 'Program Materials',
      subtitle: 'Fillout all the Information',
      progress: 68,
      items: ['Program details']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Submit Success Modal */}
      {isSubmitModalOpen && (
        <>
          {/* Invisible Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsSubmitModalOpen(false)}
          ></div>
          
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 p-12">
            <div className="text-center">
              {/* Green Check Icon with Animation */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                  <svg 
                    className="w-16 h-16" 
                    viewBox="0 0 52 52" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle 
                      className="animate-circle" 
                      cx="26" 
                      cy="26" 
                      r="25" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="3"
                    />
                    <path 
                      className="animate-check" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="3" 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 26l8 8 16-16"
                    />
                  </svg>
                </div>
              </div>
              
              <style jsx>{`
                @keyframes scale-in {
                  0% {
                    transform: scale(0);
                    opacity: 0;
                  }
                  50% {
                    transform: scale(1.1);
                  }
                  100% {
                    transform: scale(1);
                    opacity: 1;
                  }
                }
                
                @keyframes draw-circle {
                  0% {
                    stroke-dasharray: 0, 157;
                  }
                  100% {
                    stroke-dasharray: 157, 157;
                  }
                }
                
                @keyframes draw-check {
                  0% {
                    stroke-dashoffset: 50;
                  }
                  100% {
                    stroke-dashoffset: 0;
                  }
                }
                
                .animate-scale-in {
                  animation: scale-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                
                .animate-circle {
                  stroke-dasharray: 157;
                  stroke-dashoffset: 0;
                  animation: draw-circle 0.6s ease-out forwards;
                  animation-delay: 0.2s;
                  stroke-dasharray: 0, 157;
                }
                
                .animate-check {
                  stroke-dasharray: 50;
                  stroke-dashoffset: 50;
                  animation: draw-check 0.4s ease-out forwards;
                  animation-delay: 0.6s;
                }
              `}</style>
              
              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-outfit mb-4">
                Your application is submitted
              </h2>
              
              {/* Subtitle */}
              <p className="text-gray-600 font-outfit text-lg mb-8">
                Check your status
              </p>
              
              {/* Check Status Button */}
              <button 
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  setActiveTab('checkStatus');
                }}
                className="px-12 py-4 bg-white text-[#E3572B] border-2 border-[#E3572B] rounded-full font-outfit font-bold text-lg hover:bg-[#E3572B] hover:text-white transition-all"
              >
                Check Status
              </button>
            </div>
          </div>
        </>
      )}

      {/* Header */}
      <div className="bg-white ">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="">
            <Image src="/icons/logo.png" alt="allunipply logo" width={216} height={84} className="object-contain" />
          </Link>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <div className="relative">
                <button 
                  className="relative"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <Bell size={24} className="text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                {/* Notification Dropdown */}
                {isNotificationOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-30"
                      onClick={() => setIsNotificationOpen(false)}
                    ></div>
                    <div className="absolute right-0 top-12 w-96 bg-[#4A4A4A] rounded-3xl shadow-2xl z-40 overflow-hidden">
                      {/* Header */}
                      <div className="px-6 py-5 flex items-center justify-between border-b border-gray-600">
                        <div className="flex items-center gap-3">
                          <div className="w-1 h-8 bg-[#E3572B] rounded-full"></div>
                          <h2 className="text-white text-2xl font-bold font-outfit">Notification</h2>
                        </div>
                        <button 
                          onClick={() => setIsNotificationOpen(false)}
                          className="text-white hover:text-gray-300 transition-colors"
                        >
                          <X size={24} />
                        </button>
                      </div>

                      {/* Tabs */}
                      <div className="px-6 py-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => setNotificationTab('all')}
                            className={`flex-1 py-3 rounded-full font-outfit font-semibold text-sm transition-all ${
                              notificationTab === 'all'
                                ? 'bg-[#E3572B] text-white'
                                : 'bg-transparent text-white hover:bg-gray-600'
                            }`}
                          >
                            All
                          </button>
                          <button
                            onClick={() => setNotificationTab('unread')}
                            className={`flex-1 py-3 rounded-full font-outfit font-semibold text-sm transition-all ${
                              notificationTab === 'unread'
                                ? 'bg-[#E3572B] text-white'
                                : 'bg-transparent text-white hover:bg-gray-600'
                            }`}
                          >
                            Unread
                          </button>
                        </div>
                      </div>

                      {/* Notifications List */}
                      <div className="px-6 pb-6 space-y-4 max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div key={notification.id} className="flex gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
                              <Bell size={24} className="text-[#E3572B]" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-outfit text-sm mb-1">
                                <span className="mr-1">{notification.icon}</span>
                                {notification.message}
                              </p>
                              <p className="text-gray-400 text-xs font-outfit">{notification.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* View All Button */}
                      <div className="px-6 pb-6">
                        <button className="w-full py-4 bg-[#E3572B] text-white rounded-2xl font-outfit font-semibold hover:bg-[#d95d39] transition-all">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* User Profile with Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
                >
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
                  <ChevronDown size={20} className={`text-gray-600 hidden sm:block transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link 
                      href="#"
                      className="block px-4 py-3 text-gray-900 font-outfit font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Help Center
                    </Link>
                    <Link 
                      href="/my-profile"
                      className="block px-4 py-3 text-gray-900 font-outfit font-semibold hover:bg-gray-50 transition-colors"
                    >
                      My Profile
                    </Link>
                    <Link 
                      href="#"
                      className="block px-4 py-3 text-gray-900 font-outfit font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <Link 
                      href="#"
                      className="block px-4 py-3 text-gray-900 font-outfit font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Payment History
                    </Link>
                    <button 
                      className="block w-full text-left px-4 py-3 text-gray-900 font-outfit font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Sign Out Button - Hidden on mobile, shown on larger screens */}
              <button className="hidden lg:flex px-6 py-2 border-2 border-[#E3572B] text-[#E3572B] rounded-lg font-outfit font-semibold hover:bg-[#E3572B] hover:text-white transition-all">
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex items-center gap-8 max-w-7xl mx-auto px-4 justify-between">
              <button
                onClick={() => setActiveTab('myApplication')}
                className={`py-4 font-outfit text-sm font-medium transition-colors relative ${
                  activeTab === 'myApplication'
                    ? 'text-[#E3572B]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                My Application
                {activeTab === 'myApplication' && (
                  <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-[#E3572B]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('addPrograms')}
                className={`py-4 font-outfit text-sm font-medium transition-colors relative ${
                  activeTab === 'addPrograms'
                    ? 'text-[#E3572B]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Add Programs
                {activeTab === 'addPrograms' && (
                  <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-[#E3572B]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('submitApplication')}
                className={`py-4 font-outfit text-sm font-medium transition-colors relative ${
                  activeTab === 'submitApplication'
                    ? 'text-[#E3572B]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Submit Application
                {activeTab === 'submitApplication' && (
                  <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-[#E3572B]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('checkStatus')}
                className={`py-4 font-outfit text-sm font-medium transition-colors relative ${
                  activeTab === 'checkStatus'
                    ? 'text-[#E3572B]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Check Status
                {activeTab === 'checkStatus' && (
                  <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-[#E3572B]"></div>
                )}
              </button>
            </div>
          </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* My Application Tab Content */}
        {activeTab === 'myApplication' && (
          <>
            {/* Page Title */}
            <div className="text-center mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-outfit mb-3">My Application</h1>
              <p className="text-gray-500 font-outfit text-sm max-w-2xl mx-auto">
                This dashboard is your application home providing access to each part of the application<br />
                you need to complete and a high level overview of your progress.
              </p>
            </div>

            {/* Application Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-12">
              {applicationSections.map((section, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                  {/* Card Header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 font-outfit mb-1">
                      {section.title}
                    </h3>
                    <p className="text-gray-400 font-outfit text-sm">
                      {section.subtitle}
                    </p>
                  </div>

                  {/* Progress Circle and Details */}
                  <div className="flex items-center gap-6">
                    {/* Progress Circle */}
                    <div className="relative shrink-0">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                        <circle
                          cx="48" cy="48" r="40" stroke="#E3572B" strokeWidth="8" fill="none"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - section.progress / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900 font-outfit">{section.progress}%</span>
                      </div>
                    </div>

                    {/* What's Included List */}
                    <div className="flex-1">
                      <h4 className="font-outfit font-semibold text-gray-900 text-sm mb-3">What&apos;s included:</h4>
                      <ul className="space-y-2">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="text-gray-600 font-outfit text-sm">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Banner */}
            <div className="rounded-3xl p-8 md:p-12 relative overflow-hidden mt-12"
              style={{ background: 'linear-gradient(90deg, rgba(255, 139, 34, 1) 0%, rgba(255, 182.29, 116.47, 1) 100%)' }}>
              <div className="absolute top-4 right-12 w-32 h-32 bg-white opacity-10 rounded-full"></div>
              <div className="absolute bottom-4 right-32 w-24 h-24 bg-white opacity-10 rounded-full"></div>
              <div className="absolute top-1/2 right-4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 font-outfit">Want to give it a go again?</h3>
                  <p className="text-white text-sm md:text-base font-outfit opacity-90">
                    Consult with our experts to understand how to create the best shortlist for your needs
                  </p>
                </div>
                <button className="px-10 py-3 bg-white text-gray-900 rounded-full font-outfit font-semibold hover:shadow-lg transition-all whitespace-nowrap">
                  Try gain
                </button>
              </div>
            </div>
          </>
        )}

        {/* Add Program Tab Content */}
        {activeTab === 'addPrograms' && (
          <div className="bg-[#FFF4EA] rounded-3xl p-6 md:p-8">
            {/* Sub Navigation */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setSelectedProgramTab('find')}
                className={`px-6 py-2 rounded-full font-outfit font-semibold text-sm transition-all ${
                  selectedProgramTab === 'find'
                    ? 'bg-[#E3572B] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                find program
              </button>
              <button
                onClick={() => setSelectedProgramTab('selected')}
                className={`px-6 py-2 rounded-full font-outfit font-semibold text-sm transition-all ${
                  selectedProgramTab === 'selected'
                    ? 'bg-[#E3572B] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                view selecte program
              </button>
              <button
                onClick={() => setSelectedProgramTab('available')}
                className={`px-6 py-2 rounded-full font-outfit font-semibold text-sm transition-all ${
                  selectedProgramTab === 'available'
                    ? 'bg-[#E3572B] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                available program
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Program"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl font-outfit focus:outline-none focus:border-[#E3572B]"
                />
              </div>
              <button className="px-6 py-3 border border-gray-300 rounded-xl font-outfit font-semibold text-gray-700 hover:border-[#E3572B] transition-all flex items-center gap-2">
                <SlidersHorizontal size={20} />
                Filter
              </button>
            </div>

            {/* Programs Table */}
            <div className="bg-white rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#FFF4EA]">
                  <tr>
                    <th className="px-4 py-4 text-left font-outfit font-bold text-gray-900 text-sm"># Add Program Name</th>
                    <th className="px-4 py-4 text-left font-outfit font-bold text-gray-900 text-sm">Start Term</th>
                    <th className="px-4 py-4 text-left font-outfit font-bold text-gray-900 text-sm">Start Year</th>
                    <th className="px-4 py-4 text-left font-outfit font-bold text-gray-900 text-sm">Application Deadline</th>
                    <th className="px-4 py-4 text-left font-outfit font-bold text-gray-900 text-sm">Delivery</th>
                    <th className="px-4 py-4 text-left font-outfit font-bold text-gray-900 text-sm">Full-Time/Part-Time</th>
                    <th className="px-4 py-4 text-left font-outfit font-bold text-gray-900 text-sm">State</th>
                    <th className="px-4 py-4 text-left font-outfit font-bold text-gray-900 text-sm">Campus</th>
                    <th className="px-4 py-4 text-left font-outfit font-bold text-gray-900 text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((program) => (
                    <React.Fragment key={program.id}>
                      <tr className="border-t border-gray-200">
                        <td colSpan={9} className="px-4 py-3 font-outfit font-semibold text-gray-900 bg-gray-50">
                          {program.university}
                        </td>
                      </tr>
                      <tr className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-4 font-outfit text-sm text-gray-900">{program.program}</td>
                        <td className="px-4 py-4 font-outfit text-sm text-gray-700">{program.term}</td>
                        <td className="px-4 py-4 font-outfit text-sm text-gray-700">{program.year}</td>
                        <td className="px-4 py-4 font-outfit text-sm text-gray-700">{program.deadline}</td>
                        <td className="px-4 py-4 font-outfit text-sm text-gray-700">{program.delivery}</td>
                        <td className="px-4 py-4 font-outfit text-sm text-gray-700">{program.time}</td>
                        <td className="px-4 py-4 font-outfit text-sm text-gray-700">{program.state}</td>
                        <td className="px-4 py-4 font-outfit text-sm text-gray-700">{program.campus}</td>
                        <td className="px-4 py-4">
                          <button className="text-[#E3572B] hover:text-[#d95d39] font-outfit font-semibold text-sm">
                            Edit
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Submit Application Tab Content */}
        {activeTab === 'submitApplication' && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-outfit mb-3">Submit Application</h1>
              <p className="text-gray-700 font-outfit text-sm max-w-3xl mx-auto mb-2">
                Review your program selections here, check on status of individual program tasks, and pay for your program selections.
              </p>
              <p className="text-gray-700 font-outfit text-sm font-semibold">
                Once your application is submitted, no changes or refunds can be made.
              </p>
            </div>

            {/* Summary Bar */}
            <div className="bg-[#FFF4EA] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <p className="text-gray-700 font-outfit text-sm mb-1">Applications ready for submission</p>
                <p className="text-5xl font-bold text-gray-900 font-outfit">0</p>
              </div>
              <div>
                <p className="text-gray-700 font-outfit text-sm mb-1">Total Fee(s)</p>
                <p className="text-5xl font-bold text-gray-900 font-outfit">$58.00</p>
              </div>
              <button className="px-10 py-3 bg-[#FFF4EA] text-gray-900 rounded-lg font-outfit font-semibold border-2 border-gray-300 hover:border-[#E3572B] transition-all">
                Submit All
              </button>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2 mb-6">
              <span className="font-outfit text-sm text-gray-700">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full bg-[#E3572B] text-white font-outfit font-semibold text-sm border-none focus:outline-none cursor-pointer"
              >
                <option value="deadline">Deadline</option>
                <option value="university">University</option>
                <option value="program">Program</option>
              </select>
            </div>

            {/* Application Cards */}
            <div className="space-y-6">
              {applicationsForSubmission.map((app) => (
                <div key={app.id} className="bg-white rounded-2xl border border-gray-200 p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 font-outfit mb-2">{app.university}</h3>
                      <p className="text-gray-600 font-outfit">{app.program}</p>
                    </div>
                    <div className="flex gap-4">
                      <button className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors">
                        <Trash2 size={20} className="text-red-600" />
                      </button>
                      <button className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <Download size={20} className="text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-outfit text-sm text-gray-700">Deadline:</span>
                        <span className="font-outfit text-sm font-semibold text-gray-900">{app.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-outfit text-sm text-gray-700">Term:</span>
                        <span className="font-outfit text-sm font-semibold text-gray-900">{app.term}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#E3572B] rounded-full transition-all"
                          style={{ width: `${app.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsSubmitModalOpen(true)}
                      className="px-10 py-3 bg-[#E3572B] text-white rounded-full font-outfit font-semibold hover:bg-[#d95d39] transition-all"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Check Status Tab Content */}
        {activeTab === 'checkStatus' && (
          <>
            <div className="bg-[#FFF4EA] rounded-2xl p-6 mb-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h4 className="font-outfit font-bold text-gray-900 text-sm mb-2">My Program</h4>
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-gray-900 text-sm mb-2">Application Status</h4>
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-gray-900 text-sm mb-2">Download Application (PDF)</h4>
                </div>
              </div>
            </div>

            {/* Status Cards */}
            <div className="space-y-6">
              {applicationStatuses.map((status) => (
                <div key={status.id} className="bg-white rounded-2xl border border-gray-200 p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 font-outfit mb-1">
                        {status.university} - <span className="text-[#E3572B]">{status.status}</span>
                      </h3>
                      <p className="text-gray-600 font-outfit">{status.program}</p>

                      <div className="mt-6 space-y-3">
                        {status.steps.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            {step.completed ? (
                              <Check size={20} className="text-green-500" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                            )}
                            <span className={`font-outfit text-sm ${step.completed ? 'text-green-600' : 'text-gray-400'}`}>
                              {step.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Progress Circle */}
                    <div className="relative shrink-0">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="#E5E7EB" strokeWidth="12" fill="none" />
                        <circle
                          cx="64" cy="64" r="56" stroke="#E3572B" strokeWidth="12" fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - status.progress / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900 font-outfit">{status.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfilePage;
