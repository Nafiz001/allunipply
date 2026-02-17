"use client";

import { useRouter } from "next/navigation";
import PersonalInfoStepLayout from "@/components/national-university/PersonalInfoStepLayout";

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
          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-gray-900 mb-4">Required Documents</h2>

          <div className="bg-[#FDF1E4] rounded-lg p-5">
            <h3 className="text-xl font-bold font-outfit text-gray-900 mb-2">Birth certificate/ NID</h3>
            <p className="text-sm text-gray-600 font-outfit mb-4">
              Your designated programs may require your birth certificate for institutional or federal financial aid
              forms.
            </p>

            <div className="space-y-5">
              <div>
                <p className="text-sm font-outfit font-semibold text-gray-800 mb-1">Select the file to upload</p>
                <button className="px-4 py-2 rounded-lg bg-[#E3572B] text-white text-xs font-outfit font-semibold hover:bg-[#c24d2b] transition-colors">
                  Choose file
                </button>
              </div>

              <div>
                <p className="text-sm font-outfit font-semibold text-gray-800 mb-1">
                  <span className="text-[#E3572B] mr-1">*</span>HSC Testimonial / Certificate
                </p>
                <button className="px-4 py-2 rounded-lg bg-[#E3572B] text-white text-xs font-outfit font-semibold hover:bg-[#c24d2b] transition-colors">
                  Choose file
                </button>
              </div>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <p className="text-sm font-outfit font-semibold text-gray-800 mb-1">
                    <span className="text-[#E3572B] mr-1">*</span>SSC Testimonial / Certificate
                  </p>
                  <button className="px-4 py-2 rounded-lg bg-[#E3572B] text-white text-xs font-outfit font-semibold hover:bg-[#c24d2b] transition-colors">
                    Choose file
                  </button>
                </div>
                <button className="px-4 py-2 rounded-lg bg-[#E3572B] text-white text-xs font-outfit font-semibold hover:bg-[#c24d2b] transition-colors w-fit">
                  Upload This Documents
                </button>
              </div>
            </div>
          </div>
        </section>

        <button
          onClick={() => router.push("/national-university/public-university/my-application")}
          className="px-6 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
        >
          Save & Continue
        </button>
      </div>
    </PersonalInfoStepLayout>
  );
};

export default OtherInformationPage;
