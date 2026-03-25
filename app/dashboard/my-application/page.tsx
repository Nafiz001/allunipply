"use client";

import React, { useMemo, useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, Check, Trash2, Download } from 'lucide-react';
import DashboardHeader from "@/components/layout/DashboardHeader";

const MyApplicationPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('myApplication');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgramTab, setSelectedProgramTab] = useState('find');
  const [sortBy, setSortBy] = useState('deadline');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Programs data
  const [programs, setPrograms] = useState([
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
  const [applicationsForSubmission, setApplicationsForSubmission] = useState([
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
      href: '/dashboard/my-application/personal-information',
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
      href: '/dashboard/my-application/academic-history',
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
      href: '/dashboard/my-application/supporting-information',
      items: ['Documents']
    },
    {
      title: 'Program Materials',
      subtitle: 'Fillout all the Information',
      progress: 68,
      href: '/dashboard/my-application/program-materials',
      items: ['Program details']
    }
  ];

  const filteredPrograms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return programs;

    return programs.filter((program) =>
      `${program.university} ${program.program} ${program.state} ${program.campus}`
        .toLowerCase()
        .includes(query),
    );
  }, [programs, searchQuery]);

  const handleDownloadApplication = (applicationId: number) => {
    const application = applicationsForSubmission.find((item) => item.id === applicationId);
    if (!application) return;

    const payload = {
      generatedAt: new Date().toISOString(),
      application,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${application.university.replace(/\s+/g, '-').toLowerCase()}-application.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

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

      <DashboardHeader />

      {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-4 md:gap-8 overflow-x-auto md:overflow-visible whitespace-nowrap md:justify-between">
              <button
                onClick={() => setActiveTab('myApplication')}
                className={`shrink-0 py-4 font-outfit text-base md:text-[22px] font-medium transition-colors relative ${
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
                className={`shrink-0 py-4 font-outfit text-base md:text-[22px] font-medium transition-colors relative ${
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
                className={`shrink-0 py-4 font-outfit text-base md:text-[22px] font-medium transition-colors relative ${
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
                className={`shrink-0 py-4 font-outfit text-base md:text-[22px] font-medium transition-colors relative ${
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
          </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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
                <Link
                  key={index}
                  href={section.href}
                  className="block bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow"
                >
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
                </Link>
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
                <button onClick={() => { setSearchQuery(''); setSelectedProgramTab('find'); setActiveTab('addPrograms'); }} className="px-10 py-3 bg-white text-gray-900 rounded-full font-outfit font-semibold hover:shadow-lg transition-all whitespace-nowrap">
                  Try again
                </button>
              </div>
            </div>
          </>
        )}

        {/* Add Program Tab Content */}
        {activeTab === 'addPrograms' && (
          <div className="bg-[#ff8b2221] rounded-3xl p-6 md:p-8">
            {/* Sub Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
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
            <div className="flex flex-col md:flex-row gap-4 mb-6">
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
              <button onClick={() => setSelectedProgramTab('available')} className="px-6 py-3 border border-gray-300 rounded-xl font-outfit font-semibold text-gray-700 hover:border-[#E3572B] transition-all flex items-center justify-center gap-2">
                <SlidersHorizontal size={20} />
                Filter
              </button>
            </div>

            {/* Programs Table */}
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
              <table className="w-full min-w-[960px]">
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
                  {filteredPrograms.map((program) => (
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
                          <button onClick={() => router.push('/dashboard/my-application/program-materials/program-details')} className="text-[#E3572B] hover:text-[#d95d39] font-outfit font-semibold text-sm">
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
            <div className=" rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <p className="text-gray-700 font-outfit text-sm mb-1">Applications ready for submission</p>
                <p className="text-3xl md:text-5xl font-bold text-gray-900 font-outfit">0</p>
              </div>
              <div>
                <p className="text-gray-700 font-outfit text-sm mb-1">Total Fee(s)</p>
                <p className="text-3xl md:text-5xl font-bold text-gray-900 font-outfit">$58.00</p>
              </div>
              <button onClick={() => setIsSubmitModalOpen(true)} className="px-10 py-3 bg-[#FFF4EA] text-gray-900 rounded-lg font-outfit font-semibold border-2 border-gray-300 hover:border-[#E3572B] transition-all">
                Submit All
              </button>
            </div>

            {/* Sort By */}
            <div className="bg-[#FFF4EA]  p-4 flex items-center gap-2 mb-6">
              <span className="font-outfit text-sm text-gray-700">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-full bg-[#E3572B] text-white font-outfit font-semibold text-sm border-none focus:outline-none cursor-pointer"
              >
                <option value="deadline">Deadline</option>
                <option value="university">University</option>
                <option value="program">Program</option>
              </select>
            </div>

            {/* Application Cards */}
            <div className="space-y-6">
              {!applicationsForSubmission.length ? (
                <div className="rounded-2xl border border-dashed border-[#E3572B]/30 bg-white p-8 text-center text-gray-600">No applications selected for submission yet.</div>
              ) : null}
              {applicationsForSubmission.map((app) => (
                <div key={app.id}>
                  <div className="bg-[#F4EEEA] rounded-[28px] p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-10">
                      <div>
                        <h3 className="text-[20px] leading-tight md:text-[32px] font-bold text-gray-900 font-outfit mb-4">
                          {app.university}
                        </h3>
                        <p className="text-[30px] leading-snug text-gray-800 font-outfit mb-8">{app.program}</p>
                        <div className="w-full max-w-[320px] bg-[#E3DCD4] h-[8px] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#F08A24] rounded-full transition-all"
                            style={{ width: `${Math.max(0, Math.min(app.progress, 100)) * 0.3}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-3 md:pt-1">
                        <div className="flex items-center gap-2">
                          <span className="font-outfit text-[20px] text-gray-900">Deadline :</span>
                          <span className="font-outfit text-[20px] text-gray-900">{app.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-outfit text-[20px] text-gray-900">Term :</span>
                          <span className="font-outfit text-[20px] text-gray-900">{app.term}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-5 md:pt-1">
                        <button onClick={() => handleDownloadApplication(app.id)} className="text-[#E7CFC8] hover:text-[#D9B4AA] transition-colors">
                          <Download size={34} />
                        </button>
                        <button onClick={() => setApplicationsForSubmission((prev) => prev.filter((item) => item.id !== app.id))} className="text-[#E7CFC8] hover:text-[#D9B4AA] transition-colors">
                          <Trash2 size={34} />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                    <button
                      onClick={() => setIsSubmitModalOpen(true)}
                      className="min-w-[230px] px-10 py-3 bg-[#E3572B] text-white rounded-[22px] font-outfit text-[24px] leading-none hover:bg-[#d95d39] transition-all"
                    >
                      Submit
                    </button>
                  </div>
                  </div>

                  
                </div>
              ))}
            </div>
          </>
        )}

        {/* Check Status Tab Content */}
        {activeTab === 'checkStatus' && (
          <>
            <div className="bg-[#ffe5ce] rounded-2xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
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
                <div key={status.id} className="bg-[#fff4ea8f] rounded-2xl border border-gray-200 p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start">
                    <div className="">
                      <h3 className="text-2xl font-bold text-gray-900 font-outfit mb-1">
                        {status.university} - <span className="text-[#E3572B]">{status.status}</span>
                      </h3>
                      <p className="text-gray-600 font-outfit">{status.program}</p>

                      
                    </div>
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

export default MyApplicationPage;


