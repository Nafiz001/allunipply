"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Phone } from 'lucide-react';

const page = () => {
  const [selectedUniversityType, setSelectedUniversityType] = useState('public');

  // Universities data by category
  const universitiesByType: { [key: string]: Array<{ name: string; type: string; location: string; image: string }> } = {
    public: [
      { name: 'University of Dhaka', type: 'Public university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/dhaka-uni/800/600' },
      { name: 'University of Chittagong', type: 'Public university', location: 'Chittagong, Bangladesh', image: 'https://picsum.photos/seed/chittagong-uni/800/600' },
      { name: 'Jahangirnagar University', type: 'Public university', location: 'Savar, Bangladesh', image: 'https://picsum.photos/seed/jahangir-uni/800/600' },
      { name: 'Rajshahi University', type: 'Public university', location: 'Rajshahi, Bangladesh', image: 'https://picsum.photos/seed/rajshahi-uni/800/600' },
      { name: 'Khulna University', type: 'Public university', location: 'Khulna, Bangladesh', image: 'https://picsum.photos/seed/khulna-uni/800/600' },
      { name: 'Shahjalal University', type: 'Public university', location: 'Sylhet, Bangladesh', image: 'https://picsum.photos/seed/sust/800/600' },
      { name: 'Islamic University', type: 'Public university', location: 'Kushtia, Bangladesh', image: 'https://picsum.photos/seed/islamic-uni/800/600' },
      { name: 'Comilla University', type: 'Public university', location: 'Comilla, Bangladesh', image: 'https://picsum.photos/seed/comilla-uni/800/600' },
    ],
    private: [
      { name: 'North South University', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/nsu/800/600' },
      { name: 'BRAC University', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/bracu/800/600' },
      { name: 'Independent University', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/iub/800/600' },
      { name: 'East West University', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/ewu/800/600' },
      { name: 'United International', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/uiu/800/600' },
      { name: 'American International', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/aiub/800/600' },
      { name: 'Daffodil International', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/diu/800/600' },
      { name: 'Ahsanullah University', type: 'Private university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/aust/800/600' },
    ],
    agricultural: [
      { name: 'Bangladesh Agricultural University', type: 'Agricultural university', location: 'Mymensingh, Bangladesh', image: 'https://picsum.photos/seed/bau/800/600' },
      { name: 'Sher-e-Bangla Agricultural', type: 'Agricultural university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/sau/800/600' },
      { name: 'Sylhet Agricultural University', type: 'Agricultural university', location: 'Sylhet, Bangladesh', image: 'https://picsum.photos/seed/sylhet-agri/800/600' },
      { name: 'Patuakhali Science & Tech', type: 'Agricultural university', location: 'Patuakhali, Bangladesh', image: 'https://picsum.photos/seed/pstu/800/600' },
      { name: 'Khulna Agricultural University', type: 'Agricultural university', location: 'Khulna, Bangladesh', image: 'https://picsum.photos/seed/kau/800/600' },
      { name: 'Bangabandhu Sheikh Mujibur', type: 'Agricultural university', location: 'Gazipur, Bangladesh', image: 'https://picsum.photos/seed/bsmrau/800/600' },
      { name: 'Hajee Mohammad Danesh', type: 'Agricultural university', location: 'Dinajpur, Bangladesh', image: 'https://picsum.photos/seed/hstu/800/600' },
      { name: 'Chittagong Veterinary', type: 'Agricultural university', location: 'Chittagong, Bangladesh', image: 'https://picsum.photos/seed/cvasu/800/600' },
    ],
    engineering: [
      { name: 'BUET', type: 'Engineering university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/buet/800/600' },
      { name: 'CUET', type: 'Engineering university', location: 'Chittagong, Bangladesh', image: 'https://picsum.photos/seed/cuet/800/600' },
      { name: 'RUET', type: 'Engineering university', location: 'Rajshahi, Bangladesh', image: 'https://picsum.photos/seed/ruet/800/600' },
      { name: 'KUET', type: 'Engineering university', location: 'Khulna, Bangladesh', image: 'https://picsum.photos/seed/kuet/800/600' },
      { name: 'Dhaka University of Engineering', type: 'Engineering university', location: 'Gazipur, Bangladesh', image: 'https://picsum.photos/seed/duet/800/600' },
      { name: 'Military Institute of Science', type: 'Engineering university', location: 'Dhaka, Bangladesh', image: 'https://picsum.photos/seed/mist/800/600' },
      { name: 'Rajshahi University of Engineering', type: 'Engineering university', location: 'Rajshahi, Bangladesh', image: 'https://picsum.photos/seed/ruet2/800/600' },
      { name: 'Sylhet Engineering College', type: 'Engineering university', location: 'Sylhet, Bangladesh', image: 'https://picsum.photos/seed/sec/800/600' },
    ],
  };

  const universities = universitiesByType[selectedUniversityType] || [];

  return (
    <div className="">
      {/* Hero Section - Full Width */}
      <div className="relative w-full">
        {/* Background Image */}
        <div className="relative h-[500px] sm:h-[600px] md:h-[650px] lg:h-[733px]">
          <Image
            src="/hero/national_banner.png"
            alt="National University Banner"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#00000096]"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-6 text-center">
          {/* Hero Text */}
          <h1 className="text-white text-5xl font-jakarta font-extrabold mb-3 md:mb-6 max-w-5xl leading-tight uppercase ">
            Streamline your university<br />
            applications – one submission,<br />
            multiple choices.
          </h1>

          <p className="text-white font-outfit text-sm sm:text-base md:text-lg max-w-3xl mb-6 md:mb-10 leading-relaxed px-4">
            "Your dream university is just a click away — no stress, no mess, just success!<br />
            Apply smart, not hard — we make admissions easy."
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            <button className="px-6 py-2.5 md:px-8 md:py-3 rounded-t-2xl bg-[#e67609] text-white font-outfit font-semibold text-sm md:text-base hover:bg-[#e67609] transition-all">
              Public University
            </button>
            <button className="px-6 py-2.5 md:px-8 md:py-3 rounded-t-2xl bg-white text-gray-700 font-outfit font-semibold text-sm md:text-base hover:bg-gray-100 transition-all">
              Start Applying
            </button>
          </div>

          {/* Search/Filter Card */}
          <div className="bg-[#ffffff3d] backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 w-full max-w-6xl mx-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
              {/* Location */}
              <div className="flex flex-col text-center border-r border-white pr-4 md:pr-6">
                <h3 className="font-outfit font-normal text-white text-sm md:text-2xl mb-1 md:mb-2">Location</h3>
                <p className="text-[#ffffff99] text-xs md:text-sm">Search destination</p>
              </div>

              {/* Application Date */}
              <div className="flex flex-col text-center border-r border-white pr-4 md:pr-6">
                <h3 className="font-outfit font-normal text-white text-sm md:text-2xl mb-1 md:mb-2">Application date</h3>
                
              </div>

              {/* Application Process */}
              <div className="flex flex-col text-center border-r border-white pr-4 md:pr-6">
                <h3 className="font-outfit font-normal text-white text-sm md:text-2xl mb-1 md:mb-2">Application Process</h3>
                
              </div>

              {/* Criteria */}
              <div className="flex flex-col text-center border-r border-white pr-4 md:pr-6">
                <h3 className="font-outfit font-normal text-white text-sm md:text-2xl mb-1 md:mb-2">Criteria</h3>
                <p className="text-[#ffffff99] text-xs md:text-sm">See all info</p>
              </div>

              {/* Search Button */}
              <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex items-center">
                <button className="w-full px-6 py-3 rounded-full bg-[#F88210] text-white font-outfit font-semibold text-sm md:text-base hover:bg-[#e67609] transition-all">
                  See more details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services We Will Provide Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold font-rubik text-center mb-4 text-[#e3572b]">
          Services we will provide
        </h2>
        
        <p className="text-center text-[#1a202c] text-sm md:text-base mb-12 md:mb-16 mt-12 font-jakarta font-normal">
          What We Offer to Simplify Your University Application Journey
        </p>

        {/* Three Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 - One-Click Multi-University Application */}
          <div className="bg-[#fff4ea] rounded-[10px] p-6 md:p-8 text-center hover:shadow-lg transition-shadow border border-[#e3572b]">
            
            <h3 className="font-rubik font-bold text-lg md:text-xl lg:text-2xl mb-4 text-gray-900">
              One-Click Multi-University<br />Application
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Apply to multiple national universities through a single, streamlined submission process.
            </p>
            <div className="mt-3">
              <div className="w-[117px] h-16 md:w-[117px] md:h-20 mx-auto rounded-2xl flex items-center justify-center">
                <Image 
                  src="/icons/application-icon.png" 
                  width={117} 
                  height={62} 
                  alt="Application icon"
                  
                  
                />
              </div>
            </div>
          </div>

          {/* Card 2 - Smart Document Management */}
          <div className="bg-[#fff4ea] rounded-[10px] p-6 md:p-8 text-center hover:shadow-lg transition-shadow border border-[#e3572b]">
            
            <h3 className="font-rubik font-bold text-lg md:text-xl lg:text-2xl mb-4 text-gray-900">
              Smart Document<br />Management
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Easily upload, manage, and reuse your academic documents for all applications in one secure place.
            </p>
            <div className="mt-3">
              <div className=" mx-auto bg-[#FFF4EA] rounded-2xl flex items-center justify-center">
                <Image 
                  src="/icons/document-icon.png" 
                  width={85} 
                  height={65} 
                  alt="Document icon"
                />
              </div>
            </div>
          </div>

          {/* Card 3 - Real-Time Application Tracking */}
          <div className="bg-[#FFF4EA] rounded-[10px] p-6 md:p-8 text-center hover:shadow-lg transition-shadow border border-[#e3572b]">
            
            <h3 className="font-rubik font-bold text-lg md:text-xl lg:text-2xl mb-4 text-gray-900">
              Real-Time Application<br />Tracking
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Track the status of your applications, get deadline reminders, and stay informed every step of the way.
            </p>
            <div className="mt-3">
              <div className=" mx-auto  rounded-2xl flex items-center justify-center">
                <Image 
                  src="/icons/tracking-icon.png" 
                  width={87} 
                  height={72} 
                  alt="Tracking icon"
                  
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners in Success Section */}
      <div className="bg-[#FFF4EA] py-12 md:py-16">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12">
            <div>
              <h2 className="font-poppins font-semibold text-3xl md:text-4xl lg:text-6xl  mb-2">
                Partners in Success
              </h2>
              <p className="text-black font-outfit font-normal text-sm md:text-base">
                Trusted by over top 50+ consultant & Institute 
              </p>
            </div>
            <button className="mt-4 sm:mt-0 px-6 py-2.5 rounded-full bg-[#E3572B] text-white font-outfit font-semibold text-sm md:text-base hover:bg-orange-800 transition-all">
               View All
            </button>
          </div>

          {/* Partner Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            <div className="">
              <Image
                src="/partners/company1.png"
                width={160}
                height={160}
                alt=''
                />
            </div>

            <div className="">
              <Image
                src="/partners/company2.png"
                width={160}
                height={160}
                alt=''
                />
            </div>

            <div className="">
              <Image
                src="/partners/company3.png"
                width={160}
                height={160}
                alt=''
                />
            </div>

            <div className="">
              <Image
                src="/partners/company4.png"
                width={160}
                height={160}
                alt=''
                />
            </div>

            <div className="">
              <Image
                src="/partners/company5.png"
                width={160}
                height={160}
                alt=''
                />
            </div>
          </div>
        </div>
      </div>

      {/* University We Are Working With Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl  text-center mb-3 font-outfit font-bold">
          <span className="text-[#E3572B]">University</span> we are working with
        </h2>
        
        <p className="text-center text-[#1a202c] text-sm md:text-[20px] mt-12 mb-8 md:mb-12 font-outfit font-semibold">
          Trusted by Top National Universities to Simplify Admissions and Empower<br className="hidden sm:block" /> Student Application Experience.
        </p>

        {/* University Type Tabs */}
        <div className="flex flex-wrap justify-between gap-8 md:gap-12 mb-8 md:mb-12 border-b-2 border-gray-200">
          <button 
            onClick={() => setSelectedUniversityType('public')}
            className={`relative px-2 pb-3 font-outfit font-semibold text-sm md:text-base transition-all ${
              selectedUniversityType === 'public' 
                ? 'text-[#F88210]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Public university
            {selectedUniversityType === 'public' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F88210]"></span>
            )}
          </button>
          <button 
            onClick={() => setSelectedUniversityType('private')}
            className={`relative px-2 pb-3 font-outfit font-semibold text-sm md:text-base transition-all ${
              selectedUniversityType === 'private' 
                ? 'text-[#F88210]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Private University
            {selectedUniversityType === 'private' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F88210]"></span>
            )}
          </button>
          <button 
            onClick={() => setSelectedUniversityType('agricultural')}
            className={`relative px-2 pb-3 font-outfit font-semibold text-sm md:text-base transition-all ${
              selectedUniversityType === 'agricultural' 
                ? 'text-[#F88210]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Agricultural University
            {selectedUniversityType === 'agricultural' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F88210]"></span>
            )}
          </button>
          <button 
            onClick={() => setSelectedUniversityType('engineering')}
            className={`relative px-2 pb-3 font-outfit font-semibold text-sm md:text-base transition-all ${
              selectedUniversityType === 'engineering' 
                ? 'text-[#F88210]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Engineering University
            {selectedUniversityType === 'engineering' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F88210]"></span>
            )}
          </button>
        </div>

        {/* University Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {universities.map((university, index) => (
            <div key={index} className="bg-[#fff4ea] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow p-5">
              <div className="relative h-48">
                <Image
                  src={university.image}
                  alt={university.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{university.name}</h3>
                <p className="text-[#F88210] text-sm font-semibold mb-1">{university.type}</p>
                <p className="text-gray-500 text-sm mb-4">{university.location}</p>
                <button className="w-full px-4 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold text-sm">
                  Application Form open
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Start Application Button */}
        <div className="flex justify-center">
          <button className="px-8 py-3.5 rounded-xl rou bg-[#E3572B] text-white font-outfit font-bold text-base md:text-lg hover:bg-[#e67609] transition-all flex items-center gap-3 shadow-lg border border-black">
            Start Application now
            
          </button>
        </div>
      </div>

      {/* Applying Process Section */}
      <div className=" py-12 md:py-16">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl  text-center mb-3 text-[#E3572B] font-jakarta font-medium">
            Applying Process
          </h2>
          <p className="text-center text-gray-600 text-sm md:text-base mb-12 md:mb-16">
            University Application Sign-Up Form: Contact National University Database With All<br className="hidden sm:block" /> the Information Anyone Can Search Specific.
          </p>

          {/* Process Steps */}
          <div className="relative">
            {/* Steps with Icons and Descriptions */}
            <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-0">
              {/* Step 1 */}
              <div className="flex-1 flex flex-col items-center text-center max-w-xs">
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-6">
                  <Image
                    src="/icons/location.png"
                    width={78}
                    height={78}
                    alt="Location Icon"
                  />
                </div>
                <h3 className="font-semibold text-lg md:text-xl mb-2 text-[#E3572B] font-jakarta">Choose University</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Apply to each university through a simple, streamlined application form.
                </p>
              </div>

              {/* Connector 1 */}
              <div className="hidden lg:flex items-start justify-center pt-8 flex-shrink-0">
                <Image
                  src="/icons/connector.png"
                  width={180}
                  height={60}
                  alt="Connector"
                  className="object-contain"
                />
              </div>

              {/* Step 2 */}
              <div className="flex-1 flex flex-col items-center text-center max-w-xs">
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-6">
                  <Image
                    src="/icons/doc.png"
                    width={78}
                    height={78}
                    alt="Document Icon"
                  />
                </div>
                <h3 className="font-semibold text-lg md:text-xl mb-2 text-[#E3572B] font-jakarta">Upload Documents</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Upload your identification, High school transcripts, CV, and all other required documents for complete application.
                </p>
              </div>

              {/* Connector 2 */}
              <div className="hidden lg:flex items-start justify-center pt-8 flex-shrink-0">
                <Image
                  src="/icons/connector.png"
                  width={180}
                  height={60}
                  alt="Connector"
                  className="object-contain"
                />
              </div>

              {/* Step 3 */}
              <div className="flex-1 flex flex-col items-center text-center max-w-xs">
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-6">
                  <Image
                    src="/icons/payment.png"
                    width={78}
                    height={78}
                    alt="Payment Icon"
                  />
                </div>
                <h3 className="font-semibold text-lg md:text-xl mb-2 text-[#E3572B] font-jakarta">One-time payment</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  From admissions to visa dates, whether you're joining spring, winter, or fall term - track them all
                </p>
              </div>

              {/* Connector 3 */}
              <div className="hidden lg:flex items-start justify-center pt-8 flex-shrink-0">
                <Image
                  src="/icons/connector.png"
                  width={180}
                  height={60}
                  alt="Connector"
                  className="object-contain"
                />
              </div>

              {/* Step 4 */}
              <div className="flex-1 flex flex-col items-center text-center max-w-xs">
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-6">
                  <Image
                    src="/icons/car.png"
                    width={78}
                    height={78}
                    alt="Car Icon"
                  />
                </div>
                <h3 className="font-semibold text-lg md:text-xl mb-2 text-[#E3572B] font-jakarta">Start Applying</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Your University is not far away. Get ready to fly to your dream University Life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News and Updates Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
              {/* Section Header */}
              <div className="mb-12 font-normal font-poppins">
                <h2 className="text-3xl md:text-4xl lg:text-5xl  mb-2">News and Updates</h2>
                <p className="text-gray-600 text-base md:text-lg">Stay up to date with us</p>
              </div>
      
              {/* News Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* News Card 1 */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative h-[160px] overflow-hidden">
                    <Image
                      src="/news/news1.png"
                      alt="Aga Khan Foundation Scholarship"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-base mb-2 line-clamp-2">
                      Aga Khan Foundation International Scholarship Programme
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      These programmes offer funding and support opportunities for students interested in pursuing education...
                    </p>
                    <p className="text-gray-400 text-xs">14k views</p>
                  </div>
                </div>
      
                {/* News Card 2 */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative h-[160px] overflow-hidden">
                    <Image
                      src="/news/news2.png"
                      alt="World Bank Scholarship"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-base mb-2 line-clamp-2">
                      the World Bank Scholarship
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      Several universities in Australia offer full scholarships for Bangladeshi and other students to study in a...
                    </p>
                    <p className="text-gray-400 text-xs">14k views</p>
                  </div>
                </div>
      
                {/* News Card 3 */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative h-[160px] overflow-hidden">
                    <Image
                      src="/news/news3.png"
                      alt="Mastercard Foundation Scholarship"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-base mb-2 line-clamp-2">
                      the Mastercard Foundation Scholarship
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      Many programs exist, funding and support varies by institution and criteria set by institution...
                    </p>
                    <p className="text-gray-400 text-xs">14k views</p>
                  </div>
                </div>
      
                {/* News Card 4 */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative h-[160px] overflow-hidden">
                    <Image
                      src="/news/news4.png"
                      alt="Ulster University Scholarships"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-base mb-2 line-clamp-2">
                      Ulster University Scholarships
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      It can provide some details about Ulster University's programs and scholarship opportunities...
                    </p>
                    <p className="text-gray-400 text-xs">14k views</p>
                  </div>
                </div>
              </div>
      
              {/* Explore More Button */}
              <div className="text-center">
                <Link href="/news-updates">
                  <button className="font-outfit font-semibold text-white text-2xl py-5 px-8 bg-[#E3572B] rounded-[40px] hover:bg-[#c24d2b] transition-all">
                    Explore More News
                  </button>
                </Link>
              </div>
            </div>

      {/* Need Help Section */}
      <div className=" py-12 md:py-16 mb-25">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 font-jakarta text-[#E3572B]">
            Need help with application?
          </h2>
          <p className="text-center text-gray-600 text-sm md:text-base mb-12 mt-12 md:mb-16">
            Let the right one in. This platform supports students with what they want, and<br className="hidden sm:block" /> we are here for ease of admission for students.
          </p>

          {/* Help Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 - Customer Support */}
            <div className="bg-[#FFF4EA] rounded-3xl p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-[#FFF4EA] rounded-full flex items-center justify-center">
                <Image
                  src="/icons/support.png"
                  width={51}
                  height={51}
                  alt="Support Icon"
                />
              </div>
              <h3 className=" text-xl md:text-2xl mb-3 text-[#1a202c] font-jakarta font-semibold">Customer Support</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.
              </p>
              
            </div>

            {/* Card 2 - One-on-One Consultation */}
            <div className="bg-[#FFF4EA] rounded-3xl p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-[#FFF4EA] rounded-full flex items-center justify-center">
                <Image
                  src="/icons/onetime.png"
                  width={51}
                  height={51}
                  alt="Support Icon"
                />
              </div>
              <h3 className=" text-xl md:text-2xl mb-3 text-[#1a202c] font-jakarta font-semibold">One time Payment process</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.
              </p>
              
            </div>

            {/* Card 3 - Campus Visit */}
            <div className="bg-[#FFF4EA] rounded-3xl p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-[#FFF4EA] rounded-full flex items-center justify-center">
                <Image
                  src="/icons/consult.png"
                  width={51}
                  height={51}
                  alt="Support Icon"
                />
              </div>
              <h3 className=" text-xl md:text-2xl mb-3 text-[#1a202c] font-jakarta font-semibold">Consult with us in our office</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
