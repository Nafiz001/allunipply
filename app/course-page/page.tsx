"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Camera,
  Clock3,
  Database,
  FileCode2,
  GraduationCap,
  HandCoins,
  HeartPulse,
  Lightbulb,
  Megaphone,
  Music2,
  PenTool,
  Search,
  SlidersHorizontal,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Footer from "@/components/footer/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";

const courseFilters = ["All courses", "Designing", "Development", "Marketing", "Data Science"];

const freeCourses = [
  { id: 1, title: "Google UX Design Professional Certificate", description: "Learn coding fundamentals, modern frameworks", learners: "1.2M", duration: "10hrs" },
  { id: 2, title: "Data Science: Unlock the power of data", description: "Master data analysis, and machine learning", learners: "850k", duration: "15hrs" },
  { id: 3, title: "Visual Designing : Begin your journey", description: "Master design basics, and create stunning visuals", learners: "2.1M", duration: "8hrs" },
  { id: 4, title: "Web Architecture Deep Dive", description: "Learn modern system design and scaling", learners: "400k", duration: "20hrs" },
];

const popularCategories = [
  { label: "Design", icon: PenTool },
  { label: "Development", icon: FileCode2 },
  { label: "Marketing", icon: Megaphone },
  { label: "Business", icon: BriefcaseBusiness },
  { label: "Lifestyle", icon: Sparkles },
  { label: "Photography", icon: Camera },
  { label: "Music", icon: Music2 },
  { label: "Data Science", icon: Database },
];

const popularCourseCards = [
  { id: 1, title: "Professional Google UX Design", price: "$40", oldPrice: "$54" },
  { id: 2, title: "Advanced Data Science 2024", price: "$49", oldPrice: "$80" },
  { id: 3, title: "Modern Visual Design Mastery", price: "$35", oldPrice: "$60" },
  { id: 4, title: "FullStack Development Bootcamp", price: "$99", oldPrice: "$150" },
];

const achievements = [
  { value: "300", label: "Instructors", icon: BookOpen, bg: "bg-orange-50", color: "text-orange-600" },
  { value: "10,000+", label: "Videos", icon: Video, bg: "bg-blue-50", color: "text-blue-600" },
  { value: "20,000+", label: "Students", icon: GraduationCap, bg: "bg-green-50", color: "text-green-600" },
  { value: "100k+", label: "Users", icon: Users, bg: "bg-purple-50", color: "text-purple-600" },
];

const CoursePage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <DashboardHeader />

      <main className="relative overflow-hidden pt-32">
        {/* Floating Orbs */}
        <div className="absolute top-40 -left-20 w-80 h-80 bg-orange-100/40 rounded-full blur-[100px] -z-10" />
        <div className="absolute top-20 right-0 w-60 h-60 bg-blue-50/50 rounded-full blur-[80px] -z-10" />

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-[#E3572B] font-bold text-sm tracking-widest mb-6">
                START TO SUCCESS
              </span>
              <h1 className="font-poppins text-5xl md:text-7xl font-bold leading-[1.1] text-[#06241B] mb-8">
                Access To <span className="text-[#E3572B]  ">5000+</span> Courses from Top Instructors
              </h1>
              <p className="font-poppins text-xl text-gray-500 mb-10 max-w-lg leading-relaxed">
                Elevate your skills with professional-grade content curated for the modern workforce.
              </p>

              <div className="relative group max-w-2xl">
                <div className="absolute inset-0 bg-orange-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative flex items-center bg-white rounded-2xl md:rounded-3xl p-2 shadow-xl border border-gray-100">
                  <input
                    type="text"
                    placeholder="What do you want to learn today?"
                    className="w-full px-6 py-4 bg-transparent font-outfit text-lg outline-none text-gray-700"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-[#E3572B] text-white rounded-xl md:rounded-2xl shadow-lg"
                  >
                    <Search size={28} />
                  </motion.button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-orange-400/20 to-transparent rounded-[60px] blur-2xl -z-10" />
              <Image
                src="/hero/course-hero.png"
                alt="Featured courses"
                width={700}
                height={560}
                className="h-auto w-full drop-shadow-2xl"
                priority
              />
            </ScrollReveal>
          </div>
        </section>

        {/* Free Courses Section */}
        <section className="bg-white/60 backdrop-blur-md py-24 md:py-32 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-8">
                Explore <span className="text-[#E3572B]">Free Online Courses</span> With Certificates
              </h2>
              
              <div className="flex flex-wrap items-center justify-center gap-3 p-2 bg-gray-50/80 rounded-full inline-flex mx-auto border border-gray-100">
                {courseFilters.map((filter, i) => (
                  <button
                    key={filter}
                    className={`px-8 py-3 rounded-full text-base font-bold transition-all ${i === 0 ? "bg-[#E3572B] text-white shadow-lg" : "text-gray-500 hover:text-gray-900"}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {freeCourses.map((course) => (
                <motion.article 
                  key={course.id}
                  whileHover={{ y: -10 }}
                  className="card-hover-glow group flex flex-col rounded-[32px] bg-white p-5 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-50 h-full"
                >
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl mb-6">
                    <Image src="/news/news2.png" alt={course.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">{course.title}</h3>
                  <p className="text-gray-500 line-clamp-2 mb-6 leading-relaxed">{course.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between font-outfit text-sm font-bold text-gray-400 mb-6">
                    <span className="flex items-center gap-2"><Users size={16} /> {course.learners}</span>
                    <span className="flex items-center gap-2"><Clock3 size={16} /> {course.duration}</span>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-50">
                    <button className="flex-1 py-3 rounded-xl border border-gray-100 font-bold text-sm text-gray-900 hover:bg-gray-50 transition-colors">Details</button>
                    <button className="flex-1 py-3 rounded-xl bg-[#E3572B] text-white font-bold text-sm shadow-md hover:bg-orange-600 transition-colors">Start Now</button>
                  </div>
                </motion.article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <ScrollReveal direction="left">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Most Popular <span className="text-[#E3572B]">Categories</span>
                </h2>
                <p className="text-gray-500 text-xl font-medium">Empowering choices for every unique ambition.</p>
              </ScrollReveal>
              <button className="flex items-center gap-3 px-8 py-3 rounded-full border border-gray-200 text-gray-700 font-bold hover:bg-white hover:shadow-lg transition-all">
                <SlidersHorizontal size={20} />
                Filter All
              </button>
            </div>

            <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {popularCategories.map((category, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50 flex items-center justify-between group cursor-pointer hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <category.icon size={24} />
                    </div>
                    <span className="font-bold text-gray-900 text-lg">{category.label}</span>
                  </div>
                  <ArrowUpRight className="text-gray-200 group-hover:text-orange-500 transition-colors" />
                </motion.div>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Popular Courses Section */}
        <section className=" py-24 md:py-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full -ml-40 -mb-40 blur-3xl" />
          
          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <ScrollReveal direction="up" className="text-center mb-20">
              <h2 className="text-4xl md:text-7xl font-bold text-black mb-6">Master Your Skills</h2>
              <p className="text-black/70 text-2xl font-medium">Our hand-picked professional courses for your growth.</p>
            </ScrollReveal>

            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularCourseCards.map((course) => (
                <motion.div key={course.id} whileHover={{ y: -10 }} className=" backdrop-blur-xl border border-black/20 rounded-[40px] p-6 text-black group">
                  <div className="relative h-44 rounded-3xl overflow-hidden mb-6">
                    <Image src="/news/news1.png" alt="" fill className="object-cover opacity-80 group-hover:opacity-100 transition-all" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 line-clamp-2 min-h-[4rem]">{course.title}</h3>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div>
                      <span className="text-black/40 line-through text-sm block">{course.oldPrice}</span>
                      <span className="text-3xl font-extrabold text-orange-400">{course.price}</span>
                    </div>
                    <motion.button whileHover={{ scale: 1.1 }} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#E3572B] shadow-xl">
                      <ArrowUpRight size={24} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <ScrollReveal direction="left">
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                  Our <span className="text-orange-500">Achievements</span> in Education
                </h2>
                <p className="text-gray-500 text-xl mb-12 max-w-lg">Building the bridge between ambition and reality for thousands of students globally.</p>
                
                <div className="grid grid-cols-2 gap-10">
                  {achievements.map((item, i) => (
                    <div key={i} className="flex items-center gap-5">
                      <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} shadow-sm`}>
                        <item.icon size={28} />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                        <p className="text-gray-400 font-bold uppercase tracking-wider text-xs">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="right" className="relative hidden lg:block">
                <div className="absolute -inset-10 bg-orange-100 rounded-full blur-[120px] -z-10" />
                <Image src="/hero/achievement2.png" alt="Achievement" width={600} height={600} className="rounded-[40px] drop-shadow-3xl" />
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CoursePage;
