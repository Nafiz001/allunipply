"use client";

import Image from "next/image";
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

const courseFilters = ["All courses", "Designing", "Development", "Marketing", "Data Science"];

const freeCourses = [
  {
    title: "Google UX Design Professional Certificate",
    description: "Learn coding fundamentals, modern frameworks",
  },
  {
    title: "Data Science: Unlock the power of data analysis",
    description: "Master data analysis, and machine learning",
  },
  {
    title: "Visual designing : Begin your design journey",
    description: "Master design basics, and create stunning visuals",
  },
  {
    title: "Visual designing : Begin your design journey",
    description: "Master design basics, and create stunning visuals",
  },
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
  { label: "Personal Develop", icon: Lightbulb },
  { label: "Helth & Fitness", icon: HeartPulse },
  { label: "Finance", icon: HandCoins },
  { label: "Teaching", icon: GraduationCap },
];

const popularCourseCards = [
  {
    title: "Google UX Design Professional Certificate",
    description: "Learn coding fundamentals, modern frameworks",
  },
  {
    title: "Data Science: Unlock the power of data analysis",
    description: "Master data analysis, and machine learning",
  },
  {
    title: "Visual designing : Begin your design journey",
    description: "Master design basics, and create stunning visuals",
  },
  {
    title: "Visual designing : Begin your design journey",
    description: "Master design basics, and create stunning visuals",
  },
];

const achievements = [
  { value: "300", label: "Instructor", icon: BookOpen, box: "bg-[#EAF7F1]", iconColor: "text-[#EA5B2A]" },
  { value: "10,000+", label: "Video", icon: Video, box: "bg-[#FFF1DF]", iconColor: "text-[#E4A24A]" },
  { value: "20,000+", label: "Student", icon: GraduationCap, box: "bg-[#FCEFF2]", iconColor: "text-[#EB5D79]" },
  { value: "1,00,000+", label: "User’s", icon: Users, box: "bg-[#ECF4FF]", iconColor: "text-[#3C8BFF]" },
];

const feedbackCards = [
  {
    name: "Jenny Wilson",
    role: "UI-UX Designer",
    avatar: "/testimonials/user1.png",
  },
  {
    name: "Guy Hawkins",
    role: "UI-UX Designer",
    avatar: "/testimonials/user2.png",
  },
];

const CoursePage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <DashboardHeader />

      <main className="relative overflow-hidden">
        <div className="absolute left-5 top-64 h-2 w-2 rounded-full bg-[#E3572B]"></div>
        <div className="absolute left-24 top-28 text-2xl text-[#F6A623]">✦</div>

        <div className="absolute right-96 top-54 text-4xl text-[#F6C27A]">✦</div>


        <section className="mx-auto max-w-7xl px-6 pb-16 pt-[186px] md:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.06fr_0.94fr]">
            <div>
              <p className="font-public-sans text-xl font-semibold tracking-wide text-[#E3572B] md:text-2xl">
                START TO SUCCESS
              </p>

              <h1 className="relative mt-6 font-poppins text-4xl font-semibold leading-[1.2] text-[#06241B] md:text-5xl md:leading-[1.18]">
                Access <span>To <span className="text-[#E3572B]">5000+<Image
                  src="/icons/line.png"
                  alt=""
                  width={168.79}
                  height={8}
                  className="absolute left-50 "
                /></span> </span> Courses
                <br />
                <span className="relative inline-block">
                  from
                  <Image
                    src="/icons/line.png"
                    alt=""
                    width={168.79}
                    height={8}
                    className="absolute left-0 -bottom-1"
                  />
                </span>{" "}
                <span className="text-[#E3572B]">300</span> Instructors
                <br />
                & Institutions
              </h1>

              <p className="mt-3 font-poppins text-xl font-normal text-[#6D737A]">
                Various versions have evolved over the years, sometimes by accident
              </p>

              <div className="mt-8 max-w-4xl rounded-xl bg-white px-5 py-4 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="text"
                    placeholder="What do want to learn?"
                    className="w-full bg-transparent font-outfit text-xl text-[#6D737A] outline-none md:text-2xl"
                  />
                  <button aria-label="Search courses" className="text-[#4B5563] hover:text-[#111827]">
                    <Search size={30} />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-160 lg:max-w-none">
              <Image
                src="/hero/course-hero.png"
                alt="Featured courses"
                width={700}
                height={560}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </section>

        <section className="bg-[#fff4eab3] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <h2 className="text-center font-outfit text-5xl font-semibold leading-tight text-black md:text-6xl">
              Explore <span className="text-[#E3572B]">Free Online Courses</span>
              <br />
              With Certificates
            </h2>

            <div className="mx-auto mt-10 flex w-full max-w-4xl flex-wrap items-center justify-center gap-2 rounded-3xl border border-[#F0D6C6] bg-transparent p-2 md:justify-between md:gap-3 md:rounded-full">
              {courseFilters.map((filter, index) => (
                <button
                  key={filter}
                  className={`rounded-full px-3 py-2 font-inter text-xs font-extrabold transition-colors whitespace-nowrap md:px-8 md:py-3 md:text-[16px] ${index === 0
                    ? "bg-[#FF8B22] text-white"
                    : "bg-transparent text-[#1F1F1F] hover:bg-white/60"
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {freeCourses.map((course, index) => (
                <article key={`${course.title}-${index}`} className="flex h-full flex-col rounded-3xl bg-[#F7F7F7] p-4">
                  <div className="relative h-36 w-full overflow-hidden rounded-2xl md:h-44">
                    <Image src="/news/news2.png" alt={course.title} fill className="object-cover" />
                  </div>

                  <h3 className="mt-4 font-outfit text-3xl font-bold leading-tight text-[#141219] line-clamp-3">{course.title}</h3>
                  <p className="mt-2 font-outfit text-2xl leading-snug text-[#141219] line-clamp-2">{course.description}</p>

                  <div className="mt-4 flex items-center justify-between font-outfit text-xl text-[#1B1D1F]">
                    <p className="font-semibold text-[#1B1D1F]">1,250,663 learners</p>
                    <p className="flex items-center gap-1.5 text-[#141219]">
                      <span className="text-lg">◷</span>
                      10hrs
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-2 pt-4">
                    <button className="rounded-full border border-[#D6D6D6] px-5 py-2 font-inter font-normal text-[16px] text-[#141219]">
                      More info
                    </button>
                    <button className="rounded-full bg-[#E3572B] px-5 py-2 font-inter font-normal text-[16px] text-white">
                      Start learning
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <button className="rounded-full bg-[#E3572B] px-12 py-4 font-inter text-[18px] font-bold text-white hover:bg-[#D84B1F] transition-colors">
                Explore all Free Courses
              </button>
            </div>
          </div>
        </section>

        <section className="py-18">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-public-sans text-4xl font-semibold leading-tight text-[#06241B] md:text-[40px]">
                  Most <span className="text-[#E46B23]">Popular Category&apos;s
                    <Image
                      src="/icons/line2.png"
                      alt=""
                      width={155.27}
                      height={8}
                      className="absolute left-70"
                    /></span>
                </h2>
                <p className="mt-3 font-public-sans text-xl font-normal text-[#6D737A]">
                  Various versions have evolved over the years, sometimes by accident,
                </p>
              </div>

              <button className="inline-flex items-center gap-2 rounded-full border border-[#EFA078] px-5 py-3 font-inter text-[10px] text-[#0A0707] md:text-[16px]">
                <SlidersHorizontal size={16} />
                Filter
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {popularCategories.map((category, index) => {
                const Icon = category.icon;

                return (
                  <button
                    key={category.label}
                    className="flex items-center justify-between rounded-xl border border-[#F2A36C] bg-[#F6F6F6] px-5 py-4 text-left"
                  >
                    <span className="inline-flex items-center gap-3">
                      <Icon size={24} className="text-[#8B8F96]" />
                      <span className="font-public-sans text-[20px] font-medium text-[#1B1D1F]">{category.label}</span>
                    </span>

                    {index === 0 ? (
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF8A00] text-white">
                        <ArrowUpRight size={20} />
                      </span>
                    ) : (
                      <ArrowUpRight size={22} className="text-[#FF8A00]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pb-10 pt-8">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <h2 className="text-center font-outfit text-5xl font-semibold leading-tight text-black md:text-6xl">
              Most <span className="text-[#E3572B]">Popular Course</span>
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {popularCourseCards.map((course, index) => (
                <article key={`${course.title}-popular-${index}`} className="flex h-full flex-col rounded-3xl bg-[#F7F7F7] p-4">
                  <div className="relative h-36 w-full overflow-hidden rounded-2xl md:h-44">
                    <Image src="/news/news2.png" alt={course.title} fill className="object-cover" />
                  </div>

                  <h3 className="mt-4 font-outfit text-3xl font-bold leading-tight text-[#141219] line-clamp-3">{course.title}</h3>
                  <p className="mt-2 font-outfit text-2xl leading-snug text-[#141219] line-clamp-2">{course.description}</p>

                  <div className="mt-4 flex items-center gap-6 font-outfit text-lg text-[#141219]">
                    <span className="inline-flex items-center gap-1.5">
                      <BarChart3 size={15} />
                      Expert
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={15} />
                      10hrs
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-[#E3E3E3] pt-4">
                    <p className="font-outfit text-lg text-[#141219]">
                      <span className="mr-2 line-through">$54</span>
                      <span className="text-4xl font-bold text-[#E3572B]">$40</span>
                    </p>
                    <button className="rounded-full border border-[#D6D6D6] px-4 py-2 font-outfit text-lg font-semibold text-[#E3572B]">
                      Enroll now
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button className="rounded-full bg-[#E3572B] px-12 py-4 font-inter text-[18px] font-bold text-white hover:bg-[#D84B1F] transition-colors">
                Explore all Courses
              </button>
            </div>
          </div>
        </section>

        <section className="pb-20 pt-14">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2">
            <div className="max-w-[546px]">
              <h3 className="max-w-3xl font-outfit text-6xl font-semibold leading-[1.2] text-[#000000] md:text-[40px]">
                Earn Discount by referring <br /> courses to your friends & <br /> family
              </h3>

              <p className="mt-8 max-w-3xl font-outfit text-3xl font-semibold leading-[1.45] text-[#000000] md:text-[20px]">
                Refer to your friends & family out allunipply courses and earn 15% discount for any plan. Join today to
                turn your trusted recommendations into income and grow your revenue.
              </p>

              <button className="mt-10 rounded-full bg-[#E3572B] px-12 py-2 font-inter text-[16px] font-extrabold text-white hover:bg-[#D84B1F] transition-colors">
                Get Started
              </button>
            </div>

            <div className="relative mx-auto w-full max-w-150 lg:max-w-none">
              <Image src="/hero/piggy.png" alt="Referral rewards illustration" width={436} height={367} className="" />
            </div>
          </div>

          <div className="mr-20 mt-2 flex justify-end">
            <span className="h-2 w-2 rounded-full bg-[#00B894]"></span>
          </div>
        </section>

        <section className="pb-14 pt-8">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <h2 className="font-public-sans text-4xl font-semibold leading-tight text-[#06241B] md:text-[40px]">
                  Our <span className="text-[#E46B23]">Achievement
                    <Image
                      src="/icons/line2.png"
                      alt=""
                      width={233.09}
                      height={8}
                      className="absolute left-60"
                    />
                  </span>
                </h2>
                <p className="mt-3 font-public-sans text-xl font-normal text-[#6D737A]">
                  Various versions have evolved over the years, sometimes by accident
                </p>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {achievements.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-4">
                        <span className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${item.box}`}>
                          <Icon size={24} className={item.iconColor} />
                        </span>
                        <div>
                          <p className="font-public-sans text-[32px] font-semibold text-black">{item.value}</p>
                          <p className="font-public-sans text-[20px] font-normal text-[#6D737A]">{item.label}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative mx-auto  max-w-130 lg:max-w-none">
                <Image
                  src="/hero/achievement2.png"
                  alt="Achievement"
                  width={312}
                  height={460}
                  className=""
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 pt-4">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <h2 className="font-public-sans text-4xl font-semibold leading-tight text-[#06241B] md:text-[40px]">
              Student <span className="text-[#E46B23]">Feedback
                <Image
                  src="/icons/line2.png"
                  alt=""
                  width={196}
                  height={8}
                  className="absolute left-80"
                />
              </span>
            </h2>
            <p className="mt-3 font-poppins text-xl font-normal text-[#6D737A]">
              Various versions have evolved over the years, sometimes by accident,
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {feedbackCards.map((item) => (
                <article key={item.name} className="rounded-3xl bg-[#F7F7F7] px-6 py-7">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full">
                      <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-outfit text-4xl font-bold text-[#000000]">{item.name}</h3>
                      <p className="font-outfit text-2xl text-[#000000]">{item.role}</p>
                    </div>
                  </div>

                  <p className="mt-6 font-outfit text-[23px] leading-[1.45] text-[#363A3D]">
                    Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In
                    hac habitasse platea dictumst. Praesent nulla massa, hendrerit vestibulum gravida in, feugiat
                    auctor felis.
                  </p>
                  <p className="mt-4 font-outfit text-[23px] leading-[1.45] text-[#363A3D]">
                    Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In
                    hac habitasse platea dictumst.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CoursePage;
