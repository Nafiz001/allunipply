"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Plus, Minus, Heart, ArrowUpRight, Star, Mail, Phone, MapPin, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [universityType, setUniversityType] = useState<'national' | 'international'>('national');
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const [selectedCountry, setSelectedCountry] = useState('Canada');
  const [nationalType, setNationalType] = useState<'public' | 'private'>('public');
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [gpa, setGpa] = useState('');
  const [ielts, setIelts] = useState('');
  const [tuitionRange, setTuitionRange] = useState([0, 60000]);
  const [isFiltering, setIsFiltering] = useState(false);
  const router = useRouter();

  // Check if any filter is active
  useEffect(() => {
    setIsFiltering(gpa !== '' || ielts !== '' || tuitionRange[1] < 60000);
  }, [gpa, ielts, tuitionRange]);

  // Reset failed images when country changes
  useEffect(() => {
    setFailedImages(new Set());
  }, [selectedCountry]);

  const countries = [
    { name: 'USA', code: 'us' },
    { name: 'UK', code: 'gb' },
    { name: 'Australia', code: 'au' },
    { name: 'Canada', code: 'ca' },
    { name: 'China', code: 'cn' },
    { name: 'Japan', code: 'jp' },
    { name: 'Italy', code: 'it' },
    { name: 'Spain', code: 'es' },
    { name: 'Germany', code: 'de' },
    { name: 'France', code: 'fr' },
    { name: 'Netherlands', code: 'nl' },
    { name: 'Sweden', code: 'se' },
  ];

  const universitiesByCountry: { [key: string]: any[] } = {
    'USA': [
      {
        name: 'Harvard University',
        type: 'Private university',
        location: 'Cambridge, USA',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop',
        minGpa: 3.8,
        minIelts: 7.5,
        tuition: 55000,
      },
      {
        name: 'Stanford University',
        type: 'Private university',
        location: 'Stanford, USA',
        image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop',
        minGpa: 3.7,
        minIelts: 7.0,
        tuition: 52000,
      },
      {
        name: 'MIT',
        type: 'Private university',
        location: 'Cambridge, USA',
        image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&auto=format&fit=crop',
        minGpa: 3.9,
        minIelts: 7.5,
        tuition: 54000,
      },
    ],
    'UK': [
      {
        name: 'University of Oxford',
        type: 'Public university',
        location: 'Oxford, UK',
        image: 'https://images.unsplash.com/photo-1587556930796-68d5dbe01b43?w=800&auto=format&fit=crop',
        minGpa: 3.8,
        minIelts: 7.5,
        tuition: 32000,
      },
      {
        name: 'University of Cambridge',
        type: 'Public university',
        location: 'Cambridge, UK',
        image: 'https://images.unsplash.com/photo-1606750370219-fcd054c53f02?w=800&auto=format&fit=crop',
        minGpa: 3.7,
        minIelts: 7.0,
        tuition: 30000,
      },
      {
        name: 'Imperial College London',
        type: 'Public university',
        location: 'London, UK',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop',
        minGpa: 3.6,
        minIelts: 7.0,
        tuition: 35000,
      },
    ],
    'Australia': [
      {
        name: 'University of Melbourne',
        type: 'Public university',
        location: 'Melbourne, Australia',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop',
        minGpa: 3.5,
        minIelts: 6.5,
        tuition: 28000,
      },
      {
        name: 'University of Sydney',
        type: 'Public university',
        location: 'Sydney, Australia',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop',
        minGpa: 3.4,
        minIelts: 6.5,
        tuition: 27000,
      },
      {
        name: 'Australian National University',
        type: 'Public university',
        location: 'Canberra, Australia',
        image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&auto=format&fit=crop',
        minGpa: 3.6,
        minIelts: 6.5,
        tuition: 29000,
      },
    ],
    'Canada': [
      {
        name: 'University of Toronto',
        type: 'Public university',
        location: 'Toronto, Canada',
        image: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&auto=format&fit=crop',
        minGpa: 3.5,
        minIelts: 6.5,
        tuition: 25000,
      },
      {
        name: 'University of British Columbia',
        type: 'Public university',
        location: 'Vancouver, Canada',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop',
        minGpa: 3.3,
        minIelts: 6.5,
        tuition: 24000,
      },
      {
        name: 'McGill University',
        type: 'Public university',
        location: 'Montreal, Canada',
        image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&auto=format&fit=crop',
        minGpa: 3.4,
        minIelts: 6.5,
        tuition: 22000,
      },
    ],
    'China': [
      {
        name: 'Tsinghua University',
        type: 'Public university',
        location: 'Beijing, China',
        image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&auto=format&fit=crop',
      },
      {
        name: 'Peking University',
        type: 'Public university',
        location: 'Beijing, China',
        image: 'https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?w=800&auto=format&fit=crop',
      },
      {
        name: 'Fudan University',
        type: 'Public university',
        location: 'Shanghai, China',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop',
      },
    ],
    'Japan': [
      {
        name: 'University of Tokyo',
        type: 'Public university',
        location: 'Tokyo, Japan',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop',
      },
      {
        name: 'Kyoto University',
        type: 'Public university',
        location: 'Kyoto, Japan',
        image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&auto=format&fit=crop',
      },
      {
        name: 'Osaka University',
        type: 'Public university',
        location: 'Osaka, Japan',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop',
      },
    ],
    'Italy': [
      {
        name: 'University of Bologna',
        type: 'Public university',
        location: 'Bologna, Italy',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop',
      },
      {
        name: 'Sapienza University of Rome',
        type: 'Public university',
        location: 'Rome, Italy',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop',
      },
      {
        name: 'University of Milan',
        type: 'Public university',
        location: 'Milan, Italy',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop',
      },
    ],
    'Spain': [
      {
        name: 'University of Barcelona',
        type: 'Public university',
        location: 'Barcelona, Spain',
        image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&auto=format&fit=crop',
      },
      {
        name: 'Complutense University of Madrid',
        type: 'Public university',
        location: 'Madrid, Spain',
        image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&auto=format&fit=crop',
      },
      {
        name: 'Autonomous University of Barcelona',
        type: 'Public university',
        location: 'Barcelona, Spain',
        image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&auto=format&fit=crop',
      },
    ],
    'Germany': [
      {
        name: 'Technical University of Munich',
        type: 'Public university',
        location: 'Munich, Germany',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop',
      },
      {
        name: 'Ludwig Maximilian University',
        type: 'Public university',
        location: 'Munich, Germany',
        image: 'https://images.unsplash.com/photo-1587556930796-68d5dbe01b43?w=800&auto=format&fit=crop',
      },
      {
        name: 'Heidelberg University',
        type: 'Public university',
        location: 'Heidelberg, Germany',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop',
      },
    ],
    'France': [
      {
        name: 'Sorbonne University',
        type: 'Public university',
        location: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
      },
      {
        name: 'École Polytechnique',
        type: 'Public university',
        location: 'Palaiseau, France',
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop',
      },
      {
        name: 'Paris Sciences et Lettres',
        type: 'Public university',
        location: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&auto=format&fit=crop',
      },
    ],
    'Netherlands': [
      {
        name: 'University of Amsterdam',
        type: 'Public university',
        location: 'Amsterdam, Netherlands',
        image: 'https://images.unsplash.com/photo-1459679749680-18eb1eb37418?w=800&auto=format&fit=crop',
      },
      {
        name: 'Delft University of Technology',
        type: 'Public university',
        location: 'Delft, Netherlands',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop',
      },
      {
        name: 'Utrecht University',
        type: 'Public university',
        location: 'Utrecht, Netherlands',
        image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&auto=format&fit=crop',
      },
    ],
    'Sweden': [
      {
        name: 'Lund University',
        type: 'Public university',
        location: 'Lund, Sweden',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop',
      },
      {
        name: 'Uppsala University',
        type: 'Public university',
        location: 'Uppsala, Sweden',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop',
      },
      {
        name: 'KTH Royal Institute of Technology',
        type: 'Public university',
        location: 'Stockholm, Sweden',
        image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&auto=format&fit=crop',
      },
    ],
  };

  // Filter universities based on criteria
  const allUniversities = universitiesByCountry[selectedCountry] || [];
  const filteredUniversities = allUniversities.filter(uni => {
    const userGpa = parseFloat(gpa) || 0;
    const userIelts = parseFloat(ielts) || 0;
    
    // If no filters applied, return all
    if (!isFiltering) return true;
    
    // Check if user meets requirements
    const meetsGpa = gpa === '' || userGpa >= uni.minGpa;
    const meetsIelts = ielts === '' || userIelts >= uni.minIelts;
    const meetsTuition = uni.tuition <= tuitionRange[1];
    
    return meetsGpa && meetsIelts && meetsTuition;
  });

  // Limit to 2 universities when filtering
  const universities = isFiltering ? filteredUniversities.slice(0, 2) : allUniversities;
  const hasMoreResults = isFiltering && filteredUniversities.length > 2;

  const nationalUniversities = [
    {
      name: 'Dhaka University',
      type: 'Public university',
      location: 'Dhaka, Bangladesh',
      image: '/universities/dhaka.jpg',
    },
    {
      name: 'Jahangir Nagar University',
      type: 'Public university',
      location: 'Dhaka, Bangladesh',
      image: '/universities/jahangir.jpg',
    },
    {
      name: 'Jahangirnagar University',
      type: 'Public university',
      location: 'Dhaka, Bangladesh',
      image: '/universities/jahangirnagar.jpg',
    },
  ];

  return (
    <div className="">
      {/* Hero Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 pt-6 md:pt-12">
        <div className="relative rounded-[20px] md:rounded-[40px] overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="relative h-[700px] sm:h-[650px] md:h-[600px] lg:h-[700px]">
            <Image
              src="/hero/banner.png"
              alt="Students with backpacks"
              fill
              className="object-cover"
              priority
            />

          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-6 text-center">
            {/* Hero Text */}
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-outfit font-medium mb-3 md:mb-4 max-w-5xl leading-tight">
              Let's fly to your{" "}
              <span className="block mt-1 md:mt-2">
                Dream <span className="font-playfair font-semibold">University</span>
              </span>
            </h1>

            <p className="text-white font-outfit font-normal text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mb-6 md:mb-12 leading-relaxed px-4">
              "Your dream university is just a click away — no stress, no mess, just success!<br />
              Apply smart, not hard — we make admissions easy."
            </p>

            {/* University Type Toggles */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4  w-full max-w-xl px-4">

              <Link href="/national-university">
                <button
                  className="flex items-center justify-center gap-2 md:gap-3 px-4 py-3 md:py-4 rounded-t-2xl font-outfit font-extrabold text-sm md:text-lg transition-all bg-white text-gray-700 hover:bg-[#F88210] w-full"
                >
                  <span><Image src="/icons/bd-flag.png" width={25} height={25} alt="Bangladesh flag"></Image></span>National University
                </button>
              </Link>


              <Link href="/international-university">
                <button
                  className="flex items-center justify-center gap-2 md:gap-3 px-4 py-3 md:py-4 rounded-t-2xl font-outfit font-extrabold text-sm md:text-lg transition-all bg-white text-gray-700 hover:bg-[#F88210] w-full"
                >
                  <span><Image src="/icons/worldmap.png" width={25} height={25} alt="Bangladesh flag"></Image></span>
                  International University
                </button>
              </Link>
            </div>

            {/* Search/Filter Card */}
            <div className="bg-[#ffffff3d] backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 w-full max-w-6xl mx-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {/* Location */}
                <div className="flex flex-col border-r border-white pr-4 md:pr-6">
                  <h3 className="font-outfit font-normal text-white text-sm md:text-2xl mb-1 md:mb-2">Location</h3>
                  <p className="text-[#ffffff99] font-outfit font-normal  text-xs md:text-lg">Search destination</p>
                </div>

                {/* Application Date */}
                <div className="flex flex-col border-r border-white pr-4 md:pr-6">
                  <h3 className="font-outfit font-normal text-white text-sm md:text-2xl mb-1 md:mb-2">Application<br /> date</h3>

                </div>

                {/* Application Process */}
                <div className="flex flex-col border-r border-white pr-4 md:pr-6">
                  <h3 className="font-outfit font-normal text-white text-sm md:text-2xl mb-1 md:mb-2">Application<br /> Process</h3>

                </div>

                {/* Criteria */}
                <div className="flex flex-col border-r border-white pr-4 md:pr-6">
                  <h3 className="font-outfit font-normal text-white text-sm md:text-2xl mb-1 md:mb-2">Criteria</h3>
                  <p className="text-[#ffffff99] font-outfit font-normal  text-xs md:text-lg">See all info</p>
                </div>

                {/* IELTS, GRE */}
                <div className="flex flex-col">
                  <h3 className="font-outfit font-normal text-white text-sm md:text-2xl mb-1 md:mb-2">IELTS, GRE</h3>
                  <p className="text-[#ffffff99] font-outfit font-normal  text-xs md:text-lg">facilities Program</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold  font-poppins text-center mb-12 md:mb-16">
          What we <span className="text-[#E3572B]">offer</span>
        </h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* International University Column */}
          <div className="bg-white rounded-3xl p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-outfit font-extrabold text-[#E3572B] mb-8">International University</h3>

            <div className="space-y-6">
              {/* Item 1 */}
              <div className="border-b border-gray-200 pb-6">
                <button
                  onClick={() => setExpandedItems({ ...expandedItems, 'int-1': !expandedItems['int-1'] })}
                  className="w-full flex items-start justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#fff4ea] flex items-center justify-center flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d95d39" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg md:text-xl text-gray-900">Luxury Architecture and Technology</h4>
                      {expandedItems['int-1'] && (
                        <p className="text-gray-600 text-sm md:text-base mt-3">
                          Lorem ipsum dolor sit amet consectetur. Pharetra gravida posuere malesuada gravida mi.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {expandedItems['int-1'] ? (
                      <Minus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    ) : (
                      <Plus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    )}
                  </div>
                </button>
              </div>

              {/* Item 2 */}
              <div className="border-b border-gray-200 pb-6">
                <button
                  onClick={() => setExpandedItems({ ...expandedItems, 'int-2': !expandedItems['int-2'] })}
                  className="w-full flex items-start justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#fff4ea] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d95d39" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg md:text-xl text-gray-900">Expert Counseling & Visa Support</h4>
                      {expandedItems['int-2'] && (
                        <p className="text-gray-600 text-sm md:text-base mt-3">
                          Lorem ipsum dolor sit amet consectetur. Pharetra gravida posuere malesuada gravida mi.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {expandedItems['int-2'] ? (
                      <Minus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    ) : (
                      <Plus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    )}
                  </div>
                </button>
              </div>

              {/* Item 3 */}
              <div className="border-b border-gray-200 pb-6">
                <button
                  onClick={() => setExpandedItems({ ...expandedItems, 'int-3': !expandedItems['int-3'] })}
                  className="w-full flex items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#fff4ea] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d95d39" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg md:text-xl text-gray-900">Scholarship & Loan Assistance</h4>
                      {expandedItems['int-3'] && (
                        <p className="text-gray-600 text-sm md:text-base mt-3">
                          Lorem ipsum dolor sit amet consectetur. Pharetra gravida posuere malesuada gravida mi.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {expandedItems['int-3'] ? (
                      <Minus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    ) : (
                      <Plus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    )}
                  </div>
                </button>
              </div>

              {/* Item 4 */}
              <div className="pb-6">
                <button
                  onClick={() => setExpandedItems({ ...expandedItems, 'int-4': !expandedItems['int-4'] })}
                  className="w-full flex items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#fff4ea] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d95d39" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg md:text-xl text-gray-900">Track All Applications in One Place</h4>
                      {expandedItems['int-4'] && (
                        <p className="text-gray-600 text-sm md:text-base mt-3">
                          Lorem ipsum dolor sit amet consectetur. Pharetra gravida posuere malesuada gravida mi.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {expandedItems['int-4'] ? (
                      <Minus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    ) : (
                      <Plus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Start Application Button */}
            <div className="text-center">
              <button className="w-[280px] mx-auto mt-8 px-8 py-4 border-2 border-[#d95d39] text-[#d95d39] rounded-full font-outfit font-extrabold text-xl hover:bg-[#d95d39] hover:text-white transition-all">
              Start Application
            </button>
            </div>
          </div>

          {/* National University Column */}
          <div className="bg-white rounded-3xl p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-outfit font-extrabold text-[#E3572B] mb-8">National University</h3>

            <div className="space-y-6">
              {/* Item 1 */}
              <div className="border-b border-gray-200 pb-6">
                <button
                  onClick={() => setExpandedItems({ ...expandedItems, 'nat-1': !expandedItems['nat-1'] })}
                  className="w-full flex items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#fff4ea] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d95d39" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg md:text-xl text-gray-900">Luxury Architecture and Technology</h4>
                      {expandedItems['nat-1'] && (
                        <p className="text-gray-600 text-sm md:text-base mt-3">
                          Lorem ipsum dolor sit amet consectetur. Pharetra gravida posuere malesuada gravida mi.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {expandedItems['nat-1'] ? (
                      <Minus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    ) : (
                      <Plus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    )}
                  </div>
                </button>
              </div>

              {/* Item 2 */}
              <div className="border-b border-gray-200 pb-6">
                <button
                  onClick={() => setExpandedItems({ ...expandedItems, 'nat-2': !expandedItems['nat-2'] })}
                  className="w-full flex items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#fff4ea] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d95d39" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="12" y1="18" x2="12" y2="12"></line>
                        <line x1="9" y1="15" x2="15" y2="15"></line>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg md:text-xl text-gray-900">Easy application process</h4>
                      {expandedItems['nat-2'] && (
                        <p className="text-gray-600 text-sm md:text-base mt-3">
                          Lorem ipsum dolor sit amet consectetur. Pharetra gravida posuere malesuada gravida mi.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {expandedItems['nat-2'] ? (
                      <Minus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    ) : (
                      <Plus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    )}
                  </div>
                </button>
              </div>

              {/* Item 3 */}
              <div className="border-b border-gray-200 pb-6">
                <button
                  onClick={() => setExpandedItems({ ...expandedItems, 'nat-3': !expandedItems['nat-3'] })}
                  className="w-full flex items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#fff4ea] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d95d39" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg md:text-xl text-gray-900">Application date & criteria</h4>
                      {expandedItems['nat-3'] && (
                        <p className="text-gray-600 text-sm md:text-base mt-3">
                          Lorem ipsum dolor sit amet consectetur. Pharetra gravida posuere malesuada gravida mi.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {expandedItems['nat-3'] ? (
                      <Minus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    ) : (
                      <Plus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    )}
                  </div>
                </button>
              </div>

              {/* Item 4 */}
              <div className="pb-6">
                <button
                  onClick={() => setExpandedItems({ ...expandedItems, 'nat-4': !expandedItems['nat-4'] })}
                  className="w-full flex items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#fff4ea] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d95d39" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg md:text-xl text-gray-900">Track All Applications in One Place</h4>
                      {expandedItems['nat-4'] && (
                        <p className="text-gray-600 text-sm md:text-base mt-3">
                          Lorem ipsum dolor sit amet consectetur. Pharetra gravida posuere malesuada gravida mi.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {expandedItems['nat-4'] ? (
                      <Minus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    ) : (
                      <Plus className="text-[#d95d39]" size={24} strokeWidth={2.5} />
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Start Application Button */}
            <div className="text-center">
              <button className="w-[280px] mx-auto mt-8 px-8 py-4 border-2 border-[#d95d39] text-[#d95d39] rounded-full font-outfit font-extrabold text-xl hover:bg-[#d95d39] hover:text-white transition-all">
              Start Application
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted by Institutes Worldwide Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-outfit text-center mb-8 md:mb-12">
          Trusted by <span className="text-[#E3572B]">Institutes<br />Worldwide</span>
        </h2>

        {/* Country Filter Buttons - Marquee */}
        <div className="relative overflow-hidden mb-12">
          <style jsx>{`
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .marquee-container {
              display: flex;
              animation: marquee 20s linear infinite;
            }
            .marquee-container:hover {
              animation-play-state: paused;
            }
          `}</style>
          
          <div className="flex">
            <div className="marquee-container">
              {/* First set */}
              {countries.map((country) => (
                <button
                  key={`${country.name}-1`}
                  onClick={() => setSelectedCountry(country.name)}
                  className={`flex justify-center items-center gap-2 px-4 md:px-6 py-2 rounded-full font-outfit font-semibold text-sm md:text-base transition-all border mx-2 whitespace-nowrap ${selectedCountry === country.name
                      ? 'bg-[#d95d39] text-white border-[#d95d39]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#d95d39]'
                    }`}
                >
                  <span className={`fi fi-${country.code} text-xl fis rounded-full`}></span>
                  {country.name}
                </button>
              ))}
              {/* Second set for seamless loop */}
              {countries.map((country) => (
                <button
                  key={`${country.name}-2`}
                  onClick={() => setSelectedCountry(country.name)}
                  className={`flex justify-center items-center gap-2 px-4 md:px-6 py-2 rounded-full font-outfit font-semibold text-sm md:text-base transition-all border mx-2 whitespace-nowrap ${selectedCountry === country.name
                      ? 'bg-[#d95d39] text-white border-[#d95d39]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#d95d39]'
                    }`}
                >
                  <span className={`fi fi-${country.code} text-xl fis rounded-full`}></span>
                  {country.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Refine Your Search Filter Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-12 border border-gray-100">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-outfit">
            Refine Your Search
          </h3>
          
          {/* GPA and IELTS Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* GPA Input */}
            <div>
              <label className="block text-gray-900 font-semibold mb-3 font-outfit text-sm md:text-base">
                Your GPA (0.0 - 4.0)
              </label>
              <input
                type="number"
                placeholder="e.g., 3.5"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                min="0"
                max="4"
                step="0.1"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit focus:outline-none focus:border-[#E3572B] transition-colors text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* IELTS Input */}
            <div>
              <label className="block text-gray-900 font-semibold mb-3 font-outfit text-sm md:text-base">
                Your IELTS Score (0.0 - 9.0)
              </label>
              <input
                type="number"
                placeholder="e.g., 7.0"
                value={ielts}
                onChange={(e) => setIelts(e.target.value)}
                min="0"
                max="9"
                step="0.5"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit focus:outline-none focus:border-[#E3572B] transition-colors text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Tuition Fee Range */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-gray-900 font-semibold font-outfit text-sm md:text-base">
                Tuition Fee Range
              </label>
              <span className="text-[#E3572B] font-bold font-outfit text-sm md:text-base">
                ${tuitionRange[0].toLocaleString()} - ${tuitionRange[1].toLocaleString()}
              </span>
            </div>
            
            {/* Range Slider */}
            <div className="relative">
              <input
                type="range"
                min="0"
                max="60000"
                step="1000"
                value={tuitionRange[1]}
                onChange={(e) => setTuitionRange([tuitionRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gradient-to-r from-[#E3572B] to-[#FF8B22] rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #E3572B 0%, #FF8B22 ${(tuitionRange[1] / 60000) * 100}%, #e5e7eb ${(tuitionRange[1] / 60000) * 100}%, #e5e7eb 100%)`
                }}
              />
              <style jsx>{`
                input[type='range']::-webkit-slider-thumb {
                  appearance: none;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #E3572B;
                  cursor: pointer;
                  border: 3px solid white;
                  box-shadow: 0 2px 8px rgba(227, 87, 43, 0.3);
                }
                input[type='range']::-moz-range-thumb {
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #E3572B;
                  cursor: pointer;
                  border: 3px solid white;
                  box-shadow: 0 2px 8px rgba(227, 87, 43, 0.3);
                }
              `}</style>
            </div>
          </div>
        </div>

        {/* University Cards Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((university, index) => (
              <div
                key={index}
                className="relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                  {/* University Image */}
                  <div className="relative h-[280px] md:h-[320px] overflow-hidden">
                    <Image
                      src={failedImages.has(university.image) ? 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop' : university.image}
                      alt={university.name}
                      width={400}
                      height={320}
                      className="object-cover w-full h-full"
                      onError={() => {
                        setFailedImages(prev => new Set(prev).add(university.image));
                      }}
                    />
                    {/* Heart Icon */}
                    <button className="absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md">
                      <Heart size={20} strokeWidth={2} className="text-gray-600" />
                    </button>
                  </div>

                  {/* University Info */}
                  <div className="p-6 bg-white">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-[#d95d39] mb-2">
                          {university.name}
                        </h3>
                        <p className="text-gray-900 font-semibold mb-1">{university.type}</p>
                        <p className="text-gray-600 text-sm">{university.location}</p>
                      </div>
                      {/* Arrow Icon */}
                      <button className="w-10 h-10 md:w-12 md:h-12 bg-[#d95d39] rounded-full flex items-center justify-center hover:bg-[#c24d2b] transition-colors flex-shrink-0">
                        <ArrowUpRight size={20} strokeWidth={2.5} className="text-white" />
                      </button>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Buttons - Show "See More" when filtering, otherwise show "Explore More" */}
        <div className="mx-auto text-center mt-8">
          {hasMoreResults ? (
            <button 
              onClick={() => router.push('/sign-in')}
              className="font-outfit font-semibold text-white text-xl md:text-2xl py-4 md:py-5 px-6 md:px-8 bg-[#E3572B] rounded-[40px] hover:bg-[#c24d2b] transition-all shadow-lg"
            >
              See More Results ({filteredUniversities.length - 2} more)
            </button>
          ) : (
            <button className="font-outfit font-semibold text-white text-xl md:text-2xl py-4 md:py-5 px-6 md:px-8 bg-[#E3572B] rounded-[40px] hover:bg-[#c24d2b] transition-all">
              Explore More Institute
            </button>
          )}
        </div>
      </div>

      {/* Trusted by National Institute's Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-outfit text-center mb-8 md:mb-12">
          Trusted by <span className="text-[#E3572B]">National<br />Institute's</span>
        </h2>

        {/* Public/Private Toggle */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setNationalType('public')}
            className={`px-14 py-1 rounded-[20px] font-outfit font-semibold text-base md:text-lg transition-all ${nationalType === 'public'
                ? 'bg-[#d95d39] text-white'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-[#d95d39]'
              }`}
          >
            Public University
          </button>
          <button
            onClick={() => setNationalType('private')}
            className={`px-14 py-1 rounded-[20px] font-outfit font-semibold text-base md:text-lg transition-all ${nationalType === 'private'
                ? 'bg-[#d95d39] text-white'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-[#d95d39]'
              }`}
          >
            Private University
          </button>
        </div>

        {/* University Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {nationalUniversities.map((university, index) => (
            <div
              key={index}
              className="relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* University Image */}
              <div className="relative h-[250px] overflow-hidden">
                <Image
                  src={university.image}
                  alt={university.name}
                  fill
                  className="object-cover"
                />
                {/* Heart Icon */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md">
                  <Heart size={20} strokeWidth={2} className="text-gray-600" />
                </button>
              </div>

              {/* University Info */}
              <div className="p-6 bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-[#d95d39] mb-2">
                      {university.name}
                    </h3>
                    <p className="text-gray-900 font-semibold mb-1">{university.type}</p>
                    <p className="text-gray-600 text-sm">{university.location}</p>
                  </div>
                  {/* Arrow Icon */}
                  <button className="w-10 h-10 bg-[#d95d39] rounded-full flex items-center justify-center hover:bg-[#c24d2b] transition-colors flex-shrink-0">
                    <ArrowUpRight size={20} strokeWidth={2.5} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="text-center">
          <button className="font-outfit font-semibold text-white text-2xl py-5 px-8 bg-[#E3572B] rounded-[40px]">
            Explore More Institute
          </button>
        </div>
      </div>

      {/* Choose from Study Programs Section */}
      <div className="relative bg-[#ff8b22] max-w-[1120px] mx-auto rounded-3xl overflow-hidden px-4 md:px-0">
        <div className="max-w-full mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 py-8 md:py-0">
            {/* Left Girl Image */}
            <div className="relative w-[120px] h-[150px] md:w-[200px] md:h-[280px] lg:w-[280px] lg:h-[350px] shrink-0 md:right-7">
              <Image
                src="/hero/girl1.png"
                alt="Student with books"
                fill
                className="object-contain"
              />
            </div>

            {/* Center Content */}
            <div className="flex-1 text-center text-white max-w-2xl px-4 md:px-0">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-normal font-poppins mb-4 md:mb-6">
                Choose from 12000 + study Program the phd funding, IELTS,GRE facilities
              </h2>
              <p className="text-sm md:text-base lg:text-lg mb-6 md:mb-8 opacity-90 font-normal font-poppins">
                Stay informed with the latest news, insights, and updates delivered straight to your inbox
              </p>

              {/* Email Input */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="✉ Email address"
                    className="w-full px-4 md:px-6 py-3 md:py-4 text-gray-800 font-outfit focus:outline-none focus:ring-2 focus:ring-white border border-[rgba(255,255,255,0.4)] rounded-[80px] placeholder:text-[#ffffff99] text-sm md:text-base"
                  />
                </div>
                <button className="px-6 md:px-8 py-3 md:py-4 bg-white text-[#ff8b22] rounded-full font-outfit font-semibold text-base md:text-lg hover:bg-gray-100 transition-all">
                  Submit
                </button>
              </div>
            </div>

            {/* Right Girl Image */}
            <div className="relative w-[120px] h-[150px] md:w-[200px] md:h-[280px] lg:w-[280px] lg:h-[350px] shrink-0 md:left-11 md:top-2">
              <Image
                src="/hero/girl2.png"
                alt="Student with backpack"
                fill
                className="object-contain"
              />
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

      {/* Student Success Story Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Section Header */}
        <div className="text-center mb-12 font-outfit font-normal">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3">Student Success Story</h2>
          <p className="text-[#00000099] text-base md:text-lg">
            See how we've turned clients'  dreams into reality with <br /> exceptional service
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1120px] mx-auto">
          {/* Testimonial Card 1 */}
          <div className="relative bg-[#FFF4EA] pt-12 px-8 pb-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow mt-8 md:col-span-2 max-w-[664px]">
            <div className="absolute -top-8 left-8">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white">
                <Image
                  src="/testimonials/user1.png"
                  alt="Jennifer Mendy"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <p className="text-gray-700 text-sm md:text-base mb-6 relative z-10">
              Lorem ipsum dolor sit amet consectetur. Placerat gravida posuere malesuada gravida. Semper amet dignissim suspendisse vel bibendum in adipiscing orci. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo provident corporis quae ducimus quam quia velit, consequuntur rerum. Fuga eos sed adipisci amet distinctio dolorum a vel natus veritatis placeat!
            </p>
            <div>
              <h4 className="font-bold text-lg mb-1">Jennifer Mendy</h4>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} size={18} className="fill-[#d95d39] text-[#d95d39]" />
                ))}
                <Star size={18} className="fill-gray-300 text-gray-300" />
              </div>
            </div>
            <div className="absolute bottom-6 right-6 ">
              <Image
                src="/icons/quotation-marks.png"
                alt="Quote"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          </div>

          {/* Testimonial Card 2 */}
          <div className="relative bg-[#fff4ea] pt-12 px-8 pb-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow mt-8 md:col-span-1">
            <div className="absolute -top-8 left-8">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white">
                <Image
                  src="/testimonials/user2.png"
                  alt="John Walker"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <p className="text-gray-700 text-sm md:text-base mb-6 relative z-10">
              Lorem ipsum dolor sit amet consectetur. Placerat gravida posuere malesuada gravida. Semper amet dignissim suspendisse vel bibendum in adipiscing orci.
            </p>
            <div>
              <h4 className="font-bold text-lg mb-1">John Walker</h4>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} className="fill-[#d95d39] text-[#d95d39]" />
                ))}
              </div>
            </div>
            <div className="absolute bottom-6 right-6">
              <Image
                src="/icons/quotation-marks.png"
                alt="Quote"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          </div>

          {/* Testimonial Card 3 */}
          <div className="relative bg-[#fff4ea] pt-12 px-8 pb-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow mt-8 md:col-span-1">
            <div className="absolute -top-8 left-8">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white">
                <Image
                  src="/testimonials/user3.png"
                  alt="Sharon Lee"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <p className="text-gray-700 text-sm md:text-base mb-6 relative z-10">
              Lorem ipsum dolor sit amet consectetur. Placerat gravida posuere malesuada gravida. Semper amet dignissim
            </p>
            <div>
              <h4 className="font-bold text-lg mb-1">Sharon Lee</h4>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} size={18} className="fill-[#d95d39] text-[#d95d39]" />
                ))}
                <Star size={18} className="fill-gray-300 text-gray-300" />
              </div>
            </div>
            <div className="absolute bottom-6 right-6 ">
              <Image
                src="/icons/quotation-marks.png"
                alt="Quote"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          </div>

          {/* Testimonial Card 4 */}
          <div className="relative bg-[#fff4ea] pt-12 px-8 pb-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow mt-8 md:col-span-2 max-w-[664px] ml-auto ">
            <div className="absolute -top-8 left-8">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white">
                <Image
                  src="/testimonials/user4.png"
                  alt="Sinlter Monroe"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <p className="text-gray-700 text-sm md:text-base mb-6 relative z-10">
              Lorem ipsum dolor sit amet consectetur. Placerat gravida posuere malesuada gravida. Semper amet dignissim suspendisse vel bibendum in adipiscing orci.
            </p>
            <div>
              <h4 className="font-bold text-lg mb-1">Sinlter Monroe</h4>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} className="fill-[#d95d39] text-[#d95d39]" />
                ))}
              </div>
            </div>
            <div className="absolute bottom-6 right-6 ">
              <Image
                src="/icons/quotation-marks.png"
                alt="Quote"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Do you have a question Section */}
      <div className="max-w-[1120px] mx-auto my-5 px-4 md:px-6 relative">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-4 md:gap-0">
          {/* Left Side - Text */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal font-inter">
              Do you have a question?
            </h2>
          </div>

          {/* Right Side - Question image */}
          <div className="relative h-[150px] w-[280px] sm:h-[200px] sm:w-[350px] md:h-[280px] md:w-[450px] lg:h-[381px] lg:w-[623px]">
            <div className="relative w-full h-full">
              <Image
                src="/icons/question.png"
                alt="Question"
                fill
                className="object-contain"
              />

            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-normal font-poppins  mb-3">Contact Us</h2>
          <p className="text-[#00000066] text-base md:text-xl font-outfit font-normal ">
            Contact us to start your university <br /> application journey today
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Email Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-[#fff4ea] rounded-full flex items-center justify-center mb-4">
              <Mail className="text-[#d95d39]" size={24} strokeWidth={2} />
            </div>
            <h3 className="font-bold text-xl mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Office : hello@skyline.co</p>
            <button className="px-6 py-2.5 border-2 border-[#d95d39] text-[#d95d39] rounded-full font-outfit font-semibold text-sm hover:bg-[#d95d39] hover:text-white transition-all">
              Contact us 
            </button>
            <span className="text-[#00000066] text-xs ml-1">*available 24 hrs</span>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-[#fff4ea] rounded-full flex items-center justify-center mb-4">
              <Phone className="text-[#d95d39]" size={24} strokeWidth={2} />
            </div>
            <h3 className="font-bold text-xl mb-2">Phone</h3>
            <p className="text-gray-600 mb-4">Office : +91 8932-1151-22</p>
            <button className="px-6 py-2.5 border-2 border-[#d95d39] text-[#d95d39] rounded-full font-outfit font-semibold text-sm hover:bg-[#d95d39] hover:text-white transition-all">
              Contact us 
            </button>
            <span className="text-[#00000066] text-xs ml-1">*available 24 hrs</span>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-[#fff4ea] rounded-full flex items-center justify-center mb-4">
              <MapPin className="text-[#d95d39]" size={24} strokeWidth={2} />
            </div>
            <h3 className="font-bold text-xl mb-2">Location</h3>
            <p className="text-gray-600 mb-4">Office : 123 Maple Street, Springfield</p>
            <button className="px-6 py-2.5 border-2 border-[#d95d39] text-[#d95d39] rounded-full font-outfit font-semibold text-sm hover:bg-[#d95d39] hover:text-white transition-all">
              Contact us 
            </button>
            <span className="text-[#00000066] text-xs ml-1">*available 24 hrs</span>
          </div>
        </div>
      </div>




    </div>
  );
}
