"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";

const StartApplyingPage = () => {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFDFB]">
      <DashboardHeader />

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <h1 className="text-2xl md:text-4xl font-jakarta font-bold text-[#000000] mb-8">
            General Steps for Applying to Public Universities in Bangladesh:
          </h1>

          <div className="space-y-3 text-[#000000] leading-7">
            <p className="text-sm md:text-base font-outfit">
              Public university admission criteria in Bangladesh typically include minimum GPA requirements in SSC and HSC (or equivalent) exams, a combined GPA across both exams, and sometimes specific subject-based grade requirements. Some universities also consider performance in standardized tests like the university entrance exam or cluster tests. International students may need to fulfill additional requirements like English language proficiency (TOEFL/IELTS) and degree recognition.
            </p>

            <div className="space-y-3 font-poppins font-bold text-[15px]">
              <p>
                1. Check Eligibility: Each university sets its own minimum GPA requirements for both SSC and HSC or equivalent exams. Some universities may also consider A-level or O-level results. For example, East West University requires a minimum GPA of 3.00 in both SSC and HSC.
              </p>
              <p>
                2. Gather Required Documents: You&apos;ll typically need to provide scanned copies of your academic certificates, mark sheets, and passport-sized photographs.
              </p>
              <p>
                3. Complete the Online Application Form: Most universities now have online application portals. You&apos;ll need to fill out the form with your personal and academic details, upload required documents, and pay the application fee.
              </p>
              <p>
                4. Appear for the Admission Test: Public universities generally conduct an admission test to assess students&apos; aptitude and knowledge. The test is often a crucial part of the selection process.
              </p>
              <p>
                5. Wait for Results and Merit List: After the admission test, universities will publish a merit list based on the test results and other criteria.
              </p>
              <p>
                6. Final Admission: If your name appears on the merit list, you will be eligible for admission. You&apos;ll need to submit the required documents and complete the admission formalities to secure your place.
              </p>
              <p>Specific University Information: University of Dhaka: The official website (www.du.ac.bd) is the best place to find detailed information on admission.</p>
              <p>Bangladesh Agricultural University: Check the official website (bau.edu.bd) for the latest updates.</p>
              <p>Jahangirnagar University: Visit their official website (juniv.edu) for admission-related information.</p>
              <p>University of Chittagong: Visit their official website (cu.ac.bd) for the latest updates.</p>
              <p>National University: Visit their website (nu.edu.bd) for admission information.</p>
              <p>Important Considerations: Application Deadlines: Public universities have specific application deadlines for each program, which vary from university to university. Check the official website of your chosen university for the most up-to-date information.</p>
              <p>Admission Test: Most public universities in Bangladesh conduct admission tests for undergraduate programs. Prepare well for these tests.</p>
              <p>Freedom Fighter Quota: If you are eligible for the freedom fighter quota, you&apos;ll need to submit the relevant documents as proof.</p>
            </div>
          </div>

          <hr className="my-8 border-[#E5E7EB]" />

          <h2 className="text-xl md:text-2xl font-jakarta font-semibold text-[#000000] mb-3">
            Allunipply Acknowledgement Statement
          </h2>
          <p className="text-sm text-[#000000] leading-6 mb-6">
            * Allunipply collects general demographic data in the Personal Information section, primarily intended for reporting purposes. Allunipply recognizes that the provided lists of identity markers may be limited in scope. As such, individual programs may choose to ask additional demographic questions in the Program Materials section to collect more in-depth data relevant to their institution.
          </p>

          <label className="inline-flex items-center gap-3 text-sm text-[#000000] mb-5">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="w-4 h-4 accent-[#E3572B]"
            />
            I acknowledge
          </label>

          <div>
            <button
              disabled={!acknowledged}
              className="px-6 py-2.5 rounded-lg bg-[#E3572B] text-[#FFFFFF] font-outfit font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#cc4a22] transition-colors"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartApplyingPage;

