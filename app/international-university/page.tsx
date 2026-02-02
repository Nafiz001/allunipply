"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const [selectedCountry, setSelectedCountry] = useState('Canada');
  const countries = [
    { name: 'USA', code: 'us' },
    { name: 'UK', code: 'gb' },
    { name: 'Australia', code: 'au' },
    { name: 'Canada', code: 'ca' },
    { name: 'China', code: 'cn' },
    { name: 'Japan', code: 'jp' },
    { name: 'Italy', code: 'it' },
    { name: 'Spain', code: 'es' },
  ];
  const [selectedUniversityType, setSelectedUniversityType] = useState('public');
  return (
    <div className="">
      {/* Hero Section - Full Width */}
      <div className="relative w-full">
        {/* Background Image */}
        <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
          <Image
            src="/hero/internationl_banner.png"
            alt="National University Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0000000a]"></div>
          <div className="flex justify-end relative right-5 top-5">
            <p className='font-pacifico text-[22px] text-[rgba(227,87,43,1)] font-normal leading-[39px] tracking-[0%] text-center'>
              "Your dream university is just a click away no stress, no mess, just success!
              <br />Apply smart, not hard  we make admissions easy."
            </p>
          </div>
        
        </div>
        

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end px-4 md:px-6 text-center bottom-10">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 md:gap-4  justify-center">
            <button className="px-6 md:px-8 py-1  rounded-t-[35px] bg-[#e67609] text-white font-outfit font-semibold text-sm md:text-base hover:bg-[#e67609] transition-all">
              Public University
            </button>
            <button className="px-6  md:px-8 py-1 rounded-t-[35px] bg-white text-gray-700 font-outfit font-semibold text-sm md:text-base hover:bg-gray-100 transition-all">
              <span className='text-[#e3572b] text-sm'>For address</span><br />
              <span className='text-[#e3572b]'>Search for details</span>
            </button>
          </div>

          {/* Search/Filter Card */}
          <div className="bg-[#dcdcdc70] backdrop-blur-[70px] rounded-2xl md:rounded-3xl p-4 md:p-6 w-full max-w-6xl mx-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
              {/* Location */}
              <div className="flex flex-col text-left border-r border-[#121417] pr-4 md:pr-6">
                <h3 className="font-outfit font-bold text-gray-900 text-sm md:text-base lg:text-lg mb-1">Location</h3>
                <p className="text-gray-500 text-xs md:text-sm">Search destination</p>
              </div>

              {/* Application Date */}
              <div className="flex flex-col text-left border-r border-[#121417] pr-4 md:pr-6">
                <h3 className="font-outfit font-bold text-gray-900 text-sm md:text-base lg:text-lg mb-1">Application date</h3>
                <p className="text-gray-500 text-xs md:text-sm">Select date</p>
              </div>

              {/* Application Process */}
              <div className="flex flex-col text-left border-r border-[#121417] pr-4 md:pr-6">
                <h3 className="font-outfit font-bold text-gray-900 text-sm md:text-base lg:text-lg mb-1">Application Process</h3>
                <p className="text-gray-500 text-xs md:text-sm">View process</p>
              </div>

              {/* Criteria */}
              <div className="flex flex-col text-left border-r border-[#121417] pr-4 md:pr-6">
                <h3 className="font-outfit font-bold text-gray-900 text-sm md:text-base lg:text-lg mb-1">Criteria</h3>
                <p className="text-gray-500 text-xs md:text-sm">See all info</p>
              </div>

              {/* Search Button */}
              <div className="flex flex-col text-left">
                <h3 className="font-outfit font-bold text-gray-900 text-sm md:text-base lg:text-lg mb-1">IELTS, GRE</h3>
                <p className="text-gray-500 text-xs md:text-sm">facilities Program</p>
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
              
              <p className="text-center text-gray-600 text-sm md:text-base mb-8 md:mb-12">
                Trusted by Top National Universities to Simplify Admissions and Empower<br className="hidden sm:block" /> Student Application Experience.
              </p>
      
              {/* Country Filter Buttons */}
        <div className="flex justify-center gap-3 md:gap-4 mb-12 flex-wrap px-4">
          {countries.map((country) => (
            <button
              key={country.name}
              onClick={() => setSelectedCountry(country.name)}
              className={`flex justify-center items-center gap-2 px-4 md:px-6 py-2 rounded-full font-outfit font-semibold text-sm md:text-base transition-all border border-orange-300 ${selectedCountry === country.name
                  ? 'bg-[#d95d39] text-white border-[#d95d39]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#d95d39]'
                }`}
            >
              <span className={`fi fi-${country.code} text-xl fis rounded-full`}></span>
              {country.name}
            </button>
          ))}
        </div>
      
              {/* University Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* University Card 1 */}
                        <div className="bg-[#fff4ea] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow p-5">
                          <div className="relative h-48">
                            <Image
                              src="/universities/dhaka.jpg"
                              alt="Chittagong University"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">Chittagong University</h3>
                            <p className="text-[#F88210] text-sm font-semibold mb-1">Public university</p>
                            <p className="text-gray-500 text-sm mb-4">Dhaka, Bangladesh</p>
                            <button className="w-full px-4 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold text-sm ">
                              Application Form open
                            </button>
                          </div>
                        </div>
              
                        {/* University Card 2 */}
                        <div className="bg-[#fff4ea] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow p-5">
                          <div className="relative h-48">
                            <Image
                              src="/universities/dhaka.jpg"
                              alt="Dhaka University"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">Dhaka University</h3>
                            <p className="text-[#F88210] text-sm font-semibold mb-1">Public university</p>
                            <p className="text-gray-500 text-sm mb-4">Dhaka, Bangladesh</p>
                            <button className="w-full px-4 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold text-sm">
                              Application Form open
                            </button>
                          </div>
                        </div>
              
                        {/* University Card 3 */}
                        <div className="bg-[#fff4ea] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow p-5">
                          <div className="relative h-48">
                            <Image
                              src="/universities/jahangir.jpg"
                              alt="Jahangirnagar University"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">Jahangirnagar University</h3>
                            <p className="text-[#F88210] text-sm font-semibold mb-1">Public university</p>
                            <p className="text-gray-500 text-sm mb-4">Dhaka, Bangladesh</p>
                            <button className="w-full px-4 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold text-sm">
                              Application Form open
                            </button>
                          </div>
                        </div>
              
                        {/* University Card 4 */}
                        <div className="bg-[#fff4ea] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow p-5">
                          <div className="relative h-48">
                            <Image
                              src="/universities/laurentian.jpg"
                              alt="Laurentian University"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">Laurentian University</h3>
                            <p className="text-[#F88210] text-sm font-semibold mb-1">Public university</p>
                            <p className="text-gray-500 text-sm mb-4">Dhaka, Bangladesh</p>
                            <button className="w-full px-4 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold text-sm">
                              Application Form open
                            </button>
                          </div>
                        </div>
              
                        {/* University Card 5 */}
                        <div className="bg-[#fff4ea] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow p-5">
                          <div className="relative h-48">
                            <Image
                              src="/universities/jahangir.jpg"
                              alt="Chittagong University"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">Chittagong University</h3>
                            <p className="text-[#F88210] text-sm font-semibold mb-1">Public university</p>
                            <p className="text-gray-500 text-sm mb-4">Dhaka, Bangladesh</p>
                            <button className="w-full px-4 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold text-sm">
                              Application Form open
                            </button>
                          </div>
                        </div>
              
                        {/* University Card 6 */}
                        <div className="bg-[#fff4ea] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow p-5">
                          <div className="relative h-48">
                            <Image
                              src="/universities/dhaka.jpg"
                              alt="Dhaka University"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">Dhaka University</h3>
                            <p className="text-[#F88210] text-sm font-semibold mb-1">Public university</p>
                            <p className="text-gray-500 text-sm mb-4">Dhaka, Bangladesh</p>
                            <button className="w-full px-4 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold text-sm">
                              Application Form open
                            </button>
                          </div>
                        </div>
              
                        {/* University Card 7 */}
                        <div className="bg-[#fff4ea] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow p-5">
                          <div className="relative h-48">
                            <Image
                              src="/universities/jahangir.jpg"
                              alt="Jahangirnagar University"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">Jahangirnagar University</h3>
                            <p className="text-[#F88210] text-sm font-semibold mb-1">Public university</p>
                            <p className="text-gray-500 text-sm mb-4">Dhaka, Bangladesh</p>
                            <button className="w-full px-4 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold text-sm">
                              Application Form open
                            </button>
                          </div>
                        </div>
              
                        {/* University Card 8 */}
                        <div className="bg-[#fff4ea] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow p-5">
                          <div className="relative h-48">
                            <Image
                              src="/universities/laurentian.jpg"
                              alt="Laurentian University"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">Laurentian University</h3>
                            <p className="text-[#F88210] text-sm font-semibold mb-1">Public university</p>
                            <p className="text-gray-500 text-sm mb-4">Dhaka, Bangladesh</p>
                            <button className="w-full px-4 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold text-sm">
                              Application Form open
                            </button>
                          </div>
                        </div>
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
