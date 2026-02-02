"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { Search } from "lucide-react";

const NewsUpdatesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'International', 'National', 'Scholarships', 'Admissions'];

  const newsArticles = [
    {
      id: 1,
      image: '/news/news1.png',
      title: 'Aga Khan Foundation International Scholarship Programme',
      description: 'These programmes offer funding and support opportunities for students interested in pursuing education in various fields across the world.',
      views: '14k',
      category: 'International',
      date: '2 days ago'
    },
    {
      id: 2,
      image: '/news/news2.png',
      title: 'The World Bank Scholarship',
      description: 'Several universities in Australia offer full scholarships for Bangladeshi and other students to study in a world-class education system.',
      views: '14k',
      category: 'International',
      date: '3 days ago'
    },
    {
      id: 3,
      image: '/news/news3.png',
      title: 'The Mastercard Foundation Scholarship',
      description: 'Many programs exist, funding and support varies by institution and criteria set by institution for eligible students.',
      views: '14k',
      category: 'Scholarships',
      date: '5 days ago'
    },
    {
      id: 4,
      image: '/news/news4.png',
      title: 'Ulster University Scholarships',
      description: 'It can provide some details about Ulster University\'s programs and scholarship opportunities for international students.',
      views: '14k',
      category: 'International',
      date: '1 week ago'
    },
    {
      id: 5,
      image: '/news/news1.png',
      title: 'National University Admission Update',
      description: 'Latest updates on national university admissions process and important dates for the upcoming academic year.',
      views: '12k',
      category: 'National',
      date: '1 week ago'
    },
    {
      id: 6,
      image: '/news/news2.png',
      title: 'Engineering University Application Process',
      description: 'Complete guide to engineering university applications including eligibility criteria and selection process.',
      views: '10k',
      category: 'Admissions',
      date: '2 weeks ago'
    },
    {
      id: 7,
      image: '/news/news3.png',
      title: 'Public University Exam Schedule Released',
      description: 'Public universities across the country have announced their entrance examination schedule for the new session.',
      views: '15k',
      category: 'National',
      date: '2 weeks ago'
    },
    {
      id: 8,
      image: '/news/news4.png',
      title: 'International Student Visa Guidelines',
      description: 'Updated guidelines and requirements for international students applying for study visas in popular destinations.',
      views: '18k',
      category: 'International',
      date: '3 weeks ago'
    }
  ];

  const filteredNews = selectedFilter === 'All' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedFilter);

  const searchedNews = filteredNews.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#FF8B22] to-[#E3572B] py-16 md:py-24">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4 font-outfit">
            News & Updates
          </h1>
          <p className="text-white text-center text-lg md:text-xl font-outfit">
            Here's the news & updates that you all need to stay up to date
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Search Bar and Filter Button */}
        <div className="flex gap-4 items-center max-w-4xl mx-auto mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search Program"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-[#E3572B] rounded-full font-outfit text-base focus:outline-none focus:border-[#E3572B] transition-colors"
            />
          </div>
          <button className="px-6 py-4 border-2 border-[#E3572B] text-[#E3572B] rounded-full font-outfit font-semibold text-base hover:bg-[#E3572B] hover:text-white transition-all flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
            Filter
          </button>
        </div>

        {/* Filter Buttons - Hidden by default, can be shown when Filter button is clicked */}
        {selectedFilter !== 'All' && (
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2.5 rounded-full font-outfit font-semibold text-sm md:text-base transition-all ${
                  selectedFilter === filter
                    ? 'bg-[#E3572B] text-white'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#E3572B]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Subscription Section */}
      <div className="bg-[#FF8B22] py-12 md:py-16 mb-12">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-outfit">
            Get all the news delivery fast in your Inbox
          </h2>
          <p className="text-white text-base md:text-lg mb-8 font-outfit">
            Stay informed with the latest news, insights, and updates delivered straight to your Inbox
          </p>
          
          {/* Email Input */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="📧 Email address"
              className="flex-1 px-6 py-4 text-gray-800 font-outfit rounded-full focus:outline-none focus:ring-2 focus:ring-white border border-white/40"
            />
            <button className="px-8 py-4 bg-white text-[#FF8B22] rounded-full font-outfit font-semibold text-lg hover:bg-gray-100 transition-all">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* International University News Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 font-outfit">
          International University News and Updates
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-8 font-outfit">
          Latest news on scholarship & application updates
        </p>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {searchedNews.slice(0, 4).map((article) => (
            <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-[160px] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-base mb-2 line-clamp-2 font-outfit">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3 font-outfit">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-xs font-outfit">{article.views} views</p>
                  <p className="text-gray-400 text-xs font-outfit">{article.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search Button */}
        <div className="text-center">
          <button className="px-10 py-4 bg-[#E3572B] text-white rounded-full font-outfit font-semibold text-lg hover:bg-[#c24d2b] transition-all">
            Search for specific news
          </button>
        </div>
      </div>

      {/* National University News Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 font-outfit">
          National public/ private University News and Updates
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-8 font-outfit">
          Latest news on exam date & application updates
        </p>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {searchedNews.slice(4, 8).map((article) => (
            <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-[160px] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-base mb-2 line-clamp-2 font-outfit">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3 font-outfit">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-xs font-outfit">{article.views} views</p>
                  <p className="text-gray-400 text-xs font-outfit">{article.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search Button */}
        <div className="text-center">
          <button className="px-10 py-4 bg-[#E3572B] text-white rounded-full font-outfit font-semibold text-lg hover:bg-[#c24d2b] transition-all">
            Search for specific news
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsUpdatesPage;
