"use client";

import Image from "next/image";
import Link from "next/link";
import DashboardHeader from "@/components/layout/DashboardHeader";

const PublicUniversityDetailsPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <DashboardHeader />

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <div className="text-center mb-8">
            <h1 className="font-poppins font-bold text-2xl md:text-4xl text-gray-900 mb-2">
              চট্টগ্রাম বিশ্ববিদ্যালয়
            </h1>
            <h2 className="font-poppins font-bold text-lg md:text-2xl text-gray-900">
              ১ম বর্ষ স্নাতক (সম্মান) ভর্তি পরীক্ষা, শিক্ষাবর্ষ: ২০২৪-২০২৫
            </h2>
          </div>

          <div className="mb-8 rounded-xl overflow-hidden border border-gray-200">
            <Image
              src="/universities/uni-circular.png"
              alt="Chittagong University Admission Circular"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          <div className="space-y-6 font-poppins text-[15px] leading-8 text-[#222]">
            <div>
              <p className="font-bold mb-2">১. আবেদন গ্রহণ ও আবেদনের ফি জমাদানের তারিখ:</p>
              <p>
                ভর্তি পরীক্ষার আবেদনপত্র অনলাইনে ০১-০১-২০২৫ তারিখ সকাল ১১:০০ টা থেকে ২০-০১-২০২৫ তারিখ রাত
                ১১:৫৯ টা পর্যন্ত আবেদনকারীর তথ্য যাচাই করে জমা দেওয়া যাবে। ভর্তি পরীক্ষার ফি ২০-০১-২০২৫ তারিখ
                রাত ১১:৫৯ টা পর্যন্ত জমা দেওয়া যাবে।
              </p>
            </div>

            <div>
              <p className="font-bold mb-2">২. আবেদনের যোগ্যতা:</p>
              <p>
                বাংলাদেশের যেকোনো শিক্ষা বোর্ডের অধীনে ২০২১ বা ২০২২ সালে মাধ্যমিক বা সমমান পরীক্ষায় এবং ২০২৪
                সালে উচ্চ মাধ্যমিক বা সমমান পরীক্ষায় উত্তীর্ণ শিক্ষার্থীরা চট্টগ্রাম বিশ্ববিদ্যালয়ের নির্ধারিত
                ইউনিট/উপ-ইউনিট অনুযায়ী শর্তপূরণ সাপেক্ষে আবেদন করতে পারবে। আন্তর্জাতিক বোর্ডের ক্ষেত্রে সমমান
                নির্ধারণ করে আবেদন গ্রহণ করা হবে।
              </p>
            </div>

            <div>
              <p>
                চট্টগ্রাম বিশ্ববিদ্যালয়ের ২০২৪-২০২৫ শিক্ষাবর্ষের ১ম বর্ষ স্নাতক (সম্মান) ভর্তি পরীক্ষার বিস্তারিত
                নির্দেশিকা, ইউনিট/উপ-ইউনিট ভিত্তিক বিষয়সমূহ এবং আসন বণ্টনের তথ্য ভর্তি আবেদন পোর্টালে প্রকাশিত
                থাকবে। আবেদনকারীকে অনলাইনে ফরম পূরণের পূর্বে সব নির্দেশনা ভালোভাবে পড়ে নিতে হবে।
              </p>
              <p>
                আবেদন সংক্রান্ত যেকোনো আপডেট, সময়সূচি ও বিজ্ঞপ্তি বিশ্ববিদ্যালয়ের অফিসিয়াল ভর্তি ওয়েবসাইটে
                (https://admission.cu.ac.bd) প্রকাশ করা হবে। ভর্তি সংক্রান্ত সকল প্রক্রিয়া সম্পূর্ণভাবে অনলাইন
                ভিত্তিক এবং নির্ধারিত নিয়ম অনুসরণ করে আবেদন সম্পন্ন করতে হবে।
              </p>
            </div>

            <p className="font-bold">
              বিস্তারিত তথ্যের জন্য বিশ্ববিদ্যালয় কর্তৃপক্ষের প্রকাশিত ভর্তি নির্দেশিকাটি অনুসরণ করুন।
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="https://admission.cu.ac.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
            >
              CU official link
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicUniversityDetailsPage;
