"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PersonalInfoStepLayout from "@/components/national-university/PersonalInfoStepLayout";

const PersonalInformationPage = () => {
  const router = useRouter();
  const [isAccepted, setIsAccepted] = useState(false);
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  const canContinue = isAccepted && isAcknowledged;

  return (
    <PersonalInfoStepLayout
      activeStep="release"
      title="Release & Acknowledgement Statements"
      description="You must review and respond to the following release statements to submit your application. Once you submit your application, your responses cannot be edited. Review these instructions and the content of the statements carefully. If your responsibility to read and understand these statements before responding to them."
    >
      <div className="max-w-5xl border-t border-gray-200 pt-6">
        <section className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-outfit text-gray-900 mb-3">
            Allunipply Release Statement
          </h2>
          <p className="text-sm md:text-base text-[#1d1d1d] font-outfit leading-8">
            <span className="text-[#E3572B] mr-1">&bull;</span>
            By accepting these terms, I certify, as required in the application, that I have read, understand,
            and agree to all policies found within the Help Center, including the provisions that place responsibility
            for monitoring and ensuring the progress of my application process with me. I certify that all of the
            information and statements I have provided as part of this application process, including those statements
            contained in the application and as part of the evaluation verification process are current, accurate, and
            complete to the best of my knowledge. I understand that withholding information requested as part of the
            application process or submitting false or misleading information may be grounds for denial of admission by
            any participating program or expulsion from said program after admission. Additionally, I agree that
            Allunipply may release all application information that has been submitted through my application to the
            schools whose graduate programs I designate. I provide consent to engineering/CAS and/or its member
            institutions to use this information for educational research purposes aimed at improving graduate education
            and admissions programs. Allunipply has my permission to share deidentified demographic and other
            application data with educational organizations for research purposes.
          </p>
          <p className="font-outfit font-semibold text-gray-900 mt-2 mb-3">I Accept</p>

          <label className="inline-flex items-center gap-3 text-sm font-outfit text-gray-700">
            <input
              type="checkbox"
              checked={isAccepted}
              onChange={(e) => setIsAccepted(e.target.checked)}
              className="w-4 h-4 accent-[#22C5C7]"
            />
            I accept
          </label>
        </section>

        <hr className="border-gray-200 mb-10" />

        <section>
          <h2 className="text-3xl md:text-4xl font-bold font-outfit text-gray-900 mb-3">
            Allunipply Acknowledgement Statement
          </h2>
          <p className="text-sm md:text-base text-[#1d1d1d] font-outfit leading-8">
            <span className="text-[#E3572B] mr-1">&bull;</span>
            Allunipply collects general demographic data in the personal information section, primarily intended for
            reporting purposes. Allunipply recognizes that the provided lists of identity markers may be limited in
            scope. As such, individual programs may choose to ask additional demographic questions in the Program
            Materials section to collect more in-depth data relevant to their institution.
          </p>

          <label className="inline-flex items-center gap-3 text-sm font-outfit text-gray-700 mt-4">
            <input
              type="checkbox"
              checked={isAcknowledged}
              onChange={(e) => setIsAcknowledged(e.target.checked)}
              className="w-4 h-4 accent-[#22C5C7]"
            />
            I acknowledge
          </label>

          <div className="mt-5">
            <button
              onClick={() => {
                if (canContinue) {
                  router.push(
                    "/national-university/public-university/my-application/personal-information/biometric-information"
                  );
                }
              }}
              disabled={!canContinue}
              className="px-6 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#c24d2b] transition-colors"
            >
              Save & Continue
            </button>
          </div>
        </section>
      </div>
    </PersonalInfoStepLayout>
  );
};

export default PersonalInformationPage;


