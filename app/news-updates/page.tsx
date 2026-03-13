"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";

type NewsFilter = "All" | "International" | "National" | "Scholarships" | "Admissions";

type ApiNewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: "INTERNATIONAL" | "NATIONAL" | "SCHOLARSHIP" | "ADMISSION" | "SYSTEM" | "OTHER";
  coverImageUrl: string | null;
  publishedAt: string | null;
};

type NewsCard = {
  id: string;
  title: string;
  description: string;
  category: NewsFilter;
  image: string;
  dateLabel: string;
};

const filters: NewsFilter[] = ["All", "International", "National", "Scholarships", "Admissions"];

function mapCategory(category: ApiNewsArticle["category"]): NewsFilter {
  if (category === "INTERNATIONAL") return "International";
  if (category === "NATIONAL") return "National";
  if (category === "SCHOLARSHIP") return "Scholarships";
  if (category === "ADMISSION") return "Admissions";
  return "International";
}

function formatRelativeDate(dateValue: string | null) {
  if (!dateValue) return "Recently";

  const date = new Date(dateValue);
  const diffMs = Date.now() - date.getTime();

  if (Number.isNaN(diffMs) || diffMs < 0) return "Recently";

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (diffMs < hour) {
    const mins = Math.max(1, Math.floor(diffMs / minute));
    return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  }

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  if (diffMs < week) {
    const days = Math.floor(diffMs / day);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  const weeks = Math.floor(diffMs / week);
  return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
}

const NewsUpdatesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<NewsFilter>("All");
  const [newsCards, setNewsCards] = useState<NewsCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch("/api/news?page=1&pageSize=100&status=PUBLISHED", {
          cache: "no-store",
        });

        if (!response.ok) {
          const result = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(result?.error || "Failed to load news.");
        }

        const result = (await response.json()) as { data?: ApiNewsArticle[] };

        const mapped = (result.data ?? []).map((item) => ({
          id: item.id,
          title: item.title,
          description: item.excerpt || item.content.slice(0, 170),
          category: mapCategory(item.category),
          image: item.coverImageUrl || "/news/news1.png",
          dateLabel: formatRelativeDate(item.publishedAt),
        }));

        if (isMounted) {
          setNewsCards(mapped);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadNews();

    return () => {
      isMounted = false;
    };
  }, []);

  const searchedNews = useMemo(() => {
    const filteredByCategory =
      selectedFilter === "All"
        ? newsCards
        : newsCards.filter((article) => article.category === selectedFilter);

    const query = searchQuery.trim().toLowerCase();
    if (!query) return filteredByCategory;

    return filteredByCategory.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query),
    );
  }, [newsCards, searchQuery, selectedFilter]);

  const internationalNews = useMemo(() => {
    const preferred = searchedNews.filter(
      (article) => article.category === "International" || article.category === "Scholarships",
    );

    if (preferred.length) return preferred.slice(0, 4);
    return searchedNews.slice(0, 4);
  }, [searchedNews]);

  const nationalNews = useMemo(() => {
    const preferred = searchedNews.filter(
      (article) => article.category === "National" || article.category === "Admissions",
    );

    if (preferred.length) return preferred.slice(0, 4);
    return searchedNews.slice(4, 8);
  }, [searchedNews]);

  const newsRevealKey = `${selectedFilter}:${searchQuery.trim().toLowerCase()}`;

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 md:py-16 bg-gradient-to-b from-orange-50/60 to-white">
        <ScrollReveal direction="down" className="max-w-[1320px] mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-[48px] font-bold text-gray-900 mb-4 font-outfit">
            News &amp; Updates
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-outfit">
            Here&apos;s the news &amp; updates that you need to stay up to date
          </p>
        </ScrollReveal>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-8">
        <div className="flex gap-3 items-center max-w-3xl mx-auto mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-full font-outfit text-base input-glow"
            />
          </div>
          <button className="btn-outline px-6 py-4 flex items-center gap-2" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
            Filter
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`filter-pill px-6 py-2.5 rounded-full font-outfit font-semibold text-sm transition-all ${
                selectedFilter === filter
                  ? "bg-[#E3572B] text-white shadow-[0_4px_14px_rgba(227,87,43,0.35)]"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-[#E3572B]"
              }`}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-dashed border-[#E3572B]/40 bg-white p-8 text-center text-gray-600 mb-10">
            Loading news...
          </div>
        ) : null}

        {errorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center text-red-700 mb-10">
            {errorMessage}
          </div>
        ) : null}
      </div>

      <div className="max-w-[1320px] mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <ScrollReveal direction="left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 font-outfit">
            International University <span className="text-[#E3572B]">News</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg mb-8 font-outfit">Latest news on scholarship &amp; application updates</p>
        </ScrollReveal>

        <StaggerReveal key={`international-${newsRevealKey}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {internationalNews.map((article) => (
            <motion.div
              key={article.id}
              whileHover={{ y: -8 }}
              className="card-hover-glow bg-white rounded-2xl overflow-hidden shadow-sm border border-transparent cursor-pointer"
            >
              <div className="img-hover-zoom relative h-[180px]">
                <Image src={article.image} alt={article.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-base mb-2 line-clamp-2 font-outfit">{article.title}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-3 font-outfit">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="badge-pill">{article.category}</span>
                  <p className="text-gray-400 text-xs font-outfit">{article.dateLabel}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerReveal>

        {!isLoading && !errorMessage && !internationalNews.length ? (
          <p className="text-center text-gray-500 font-outfit">No matching articles found.</p>
        ) : null}

        <ScrollReveal direction="up" className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-10 py-4 text-lg"
            type="button"
          >
            Search for specific news
          </motion.button>
        </ScrollReveal>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 md:px-6 pb-16">
        <ScrollReveal direction="right">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 font-outfit">
            National University <span className="text-[#E3572B]">News</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg mb-8 font-outfit">Latest news on exam date &amp; application updates</p>
        </ScrollReveal>

        <StaggerReveal key={`national-${newsRevealKey}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {nationalNews.map((article) => (
            <motion.div
              key={article.id}
              whileHover={{ y: -8 }}
              className="card-hover-glow bg-white rounded-2xl overflow-hidden shadow-sm border border-transparent cursor-pointer"
            >
              <div className="img-hover-zoom relative h-[180px]">
                <Image src={article.image} alt={article.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-base mb-2 line-clamp-2 font-outfit">{article.title}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-3 font-outfit">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="badge-pill">{article.category}</span>
                  <p className="text-gray-400 text-xs font-outfit">{article.dateLabel}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerReveal>

        {!isLoading && !errorMessage && !nationalNews.length ? (
          <p className="text-center text-gray-500 font-outfit">No matching national/admission articles found.</p>
        ) : null}

        <ScrollReveal direction="up" className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-10 py-4 text-lg"
            type="button"
          >
            Search for specific news
          </motion.button>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div
          className="py-14 max-w-[1120px] mx-auto mb-16 rounded-[28px] relative overflow-hidden"
          style={{ background: "linear-gradient(90deg, #FF8B22 0%, #FFB674 100%)" }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-12 w-40 h-40 bg-white/10 rounded-full translate-y-1/2" />
          <div className="relative z-10 max-w-[1320px] mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-outfit">
              Get all the news delivered fast <br />in your Inbox
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-8 font-outfit">
              Stay informed with the latest news, insights, and updates delivered straight to your Inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto px-4">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-6 py-4 text-gray-800 font-outfit rounded-full focus:outline-none focus:ring-2 focus:ring-white border border-white/40 input-glow"
              />
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-[#FF8B22] rounded-full font-outfit font-semibold text-lg hover:bg-gray-50 hover:shadow-lg transition-all"
                type="button"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default NewsUpdatesPage;
