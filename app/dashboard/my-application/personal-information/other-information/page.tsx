"use client";

import { useRouter } from "next/navigation";
import PersonalInfoStepLayout from "@/components/dashboard/PersonalInfoStepLayout";

const OtherInformationPage = () => {
  const router = useRouter();

  return (
    <PersonalInfoStepLayout
      activeStep="other"
      title="Other information"
      description="Enter your responses to these additional questions. Visit the Applicant Help Center for more information. Once you submit your application, you cannot edit this section."
    >
      <div className="max-w-4xl space-y-8">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-gray-900 mb-3">Language Proficiency</h2>
          <div className="max-w-md space-y-3">
            <input
              type="text"
              placeholder="What is your First Language?"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
            <button className="px-4 py-2 rounded-lg bg-[#E3572B] text-white text-sm font-outfit font-semibold hover:bg-[#c24d2b] transition-colors">
              Add another language
            </button>
          </div>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-gray-900 mb-3">Social Security Number</h2>
          <p className="text-sm text-gray-700 font-outfit mb-3">
            Your designated programs may require your SSN for institutional or federal financial aid forms.
          </p>
          <div className="max-w-md">
            <input
              type="text"
              placeholder="SSN"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-gray-900 mb-3">Background Information</h2>
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Did either of your parents graduate from a 4-year college or university?"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 font-outfit text-sm focus:outline-none focus:border-[#E3572B]"
            />
          </div>
        </section>

        <button
          onClick={() => router.push("/dashboard/my-application/personal-information")}
          className="px-6 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
        >
          Save & Continue
        </button>
      </div>
    </PersonalInfoStepLayout>
  );
};

export default OtherInformationPage;

