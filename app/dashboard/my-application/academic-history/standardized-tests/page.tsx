"use client";

import { useState } from "react";
import { CheckCircle2, CirclePlus, CalendarDays, ArrowLeft } from "lucide-react";
import AcademicHistoryStepLayout from "@/components/dashboard/AcademicHistoryStepLayout";

const englishTests = ["TOEFL", "IELTS", "PTE", "GRE", "GMAT"];
type TestAnswer = "yes" | "no";

const StandardizedTestsPage = () => {
  const [optedOut, setOptedOut] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [testAnswers, setTestAnswers] = useState<Record<string, TestAnswer>>({});
  const [plannedDates, setPlannedDates] = useState<Record<string, string>>({});
  const [selectedFiles, setSelectedFiles] = useState<Record<string, string>>({});

  const activeAnswer: TestAnswer = selectedTest ? testAnswers[selectedTest] ?? "yes" : "yes";

  return (
    <AcademicHistoryStepLayout
      activeStep="tests"
      title="Standardized Tests"
      description={
        optedOut || selectedTest
          ? undefined
          : "You can self-report your standardized test scores or report tests you plan to take in this section. Some of the programs you apply to may require you to report certain test scores; be sure to check with your programs to ensure you're completing all requirements. Visit the Applicant Help Center for more information."
      }
    >
      {!optedOut && selectedTest ? (
        <div className="max-w-5xl space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 font-outfit">{selectedTest}</h2>
            <button
              onClick={() => setSelectedTest(null)}
              className="inline-flex items-center gap-2 text-sm font-outfit text-gray-600 hover:text-[#E3572B] transition-colors"
            >
              <ArrowLeft size={14} />
              Back to tests
            </button>
          </div>

          <div>
            <p className="text-base font-outfit font-semibold text-gray-900 mb-3">
              <span className="text-[#E3572B] mr-1">*</span>
              Is this your permanent address?
            </p>
            <div className="relative inline-flex items-center gap-3">
              <button
                onClick={() =>
                  setTestAnswers((prev) => ({
                    ...prev,
                    [selectedTest]: "yes",
                  }))
                }
                className={`inline-flex min-w-[64px] justify-center items-center gap-2 rounded-lg border px-5 py-2 text-sm font-outfit transition-colors ${
                  activeAnswer === "yes"
                    ? "border-gray-800 text-gray-900"
                    : "border-gray-200 text-gray-500 hover:border-gray-400"
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full border ${
                    activeAnswer === "yes" ? "border-gray-900 bg-gray-900" : "border-gray-300"
                  }`}
                />
                Yes
              </button>

              <button
                onClick={() =>
                  setTestAnswers((prev) => ({
                    ...prev,
                    [selectedTest]: "no",
                  }))
                }
                className={`inline-flex min-w-[64px] justify-center items-center gap-2 rounded-lg border px-5 py-2 text-sm font-outfit transition-colors ${
                  activeAnswer === "no"
                    ? "border-gray-800 text-gray-900"
                    : "border-gray-200 text-gray-500 hover:border-gray-400"
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full border ${
                    activeAnswer === "no" ? "border-gray-900 bg-gray-900" : "border-gray-300"
                  }`}
                />
                No
              </button>

              <div
                className={`absolute -bottom-8 w-4 h-4 rotate-45 bg-[#FDF1E4] transition-all duration-200 ${
                  activeAnswer === "yes" ? "left-7" : "left-[102px]"
                }`}
              />
            </div>
          </div>

          <div className="relative bg-[#FDF1E4] rounded-sm p-5 md:p-6">

            {activeAnswer === "yes" ? (
              <div className="max-w-md">
                <label className="block text-sm font-outfit text-gray-800 mb-2">
                  <span className="text-[#E3572B] mr-1">*</span>
                  When do you plan to take this test?
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={plannedDates[selectedTest] ?? ""}
                    onChange={(e) =>
                      setPlannedDates((prev) => ({
                        ...prev,
                        [selectedTest]: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-[#F2E0CE] bg-white px-4 py-3 pr-10 font-outfit text-sm text-gray-700 focus:outline-none focus:border-[#E3572B]"
                  />
                  <CalendarDays size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E3572B]" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-outfit">Required Documents</h3>
                <div className="rounded-lg border border-[#F3DFCC] bg-white/70 p-5">
                  <label className="block text-sm font-outfit text-gray-900 mb-3">
                    <span className="text-[#E3572B] mr-1">*</span>
                    Select the file to upload
                  </label>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E3572B] text-white text-xs font-outfit font-semibold cursor-pointer hover:bg-[#c24d2b] transition-colors">
                        <CirclePlus size={12} />
                        Choose file
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const fileName = e.target.files?.[0]?.name ?? "";
                            setSelectedFiles((prev) => ({
                              ...prev,
                              [selectedTest]: fileName,
                            }));
                          }}
                        />
                      </label>
                      {selectedFiles[selectedTest] ? (
                        <span className="text-xs text-gray-600 font-outfit">{selectedFiles[selectedTest]}</span>
                      ) : null}
                    </div>
                    <button className="inline-flex px-6 py-2 rounded-lg bg-[#E3572B] text-white text-xs font-outfit font-semibold hover:bg-[#c24d2b] transition-colors w-fit">
                      Upload This Documents
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <button className="w-full rounded-lg bg-[#B9B9B9] px-6 py-2.5 text-white font-outfit font-semibold text-sm">
                Save & Add Another
              </button>
              <button className="w-full rounded-lg bg-[#B9B9B9] px-6 py-2.5 text-white font-outfit font-semibold text-sm">
                Save This Test
              </button>
            </div>
          </div>
        </div>
      ) : !optedOut ? (
        <div className="max-w-3xl space-y-6">
          <p className="text-sm md:text-base text-[#1d1d1d] font-outfit leading-7">
            Once you submit your application, you cannot edit previously entered tests. You can add new tests and
            update planned tests.
          </p>

          <p className="text-sm md:text-base text-[#1d1d1d] font-outfit leading-7">
            Note that self-reporting your score isn't the same as providing official scores to your programs. If your
            programs require official test scores, see Sending Official Test Scores for more information.
          </p>

          <button
            onClick={() => {
              setSelectedTest(null);
              setOptedOut(true);
            }}
            className="inline-flex px-6 py-2 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
          >
            I am not adding any standard test
          </button>

          <div className="max-w-md">
            <label className="block text-sm font-outfit text-gray-900 mb-2">
              Which English test did you take? <span className="text-[#E3572B]">*</span>
            </label>
            <div className="space-y-3">
              {englishTests.map((test) => (
                <button
                  key={test}
                  onClick={() => {
                    setSelectedTest(test);
                    setTestAnswers((prev) => ({
                      ...prev,
                      [test]: prev[test] ?? "yes",
                    }));
                  }}
                  className="w-full flex items-center justify-between rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-outfit text-gray-500 hover:border-[#E3572B] transition-colors"
                >
                  <span>{test}</span>
                  <CirclePlus size={16} className="text-[#E3572B]" />
                </button>
              ))}
            </div>
          </div>

          <button className="inline-flex px-8 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors">
            Save & Upload
          </button>
        </div>
      ) : (
        <div className="max-w-4xl space-y-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={22} className="text-[#6BCF63]" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-outfit">
              You opted not to add any standardized tests.
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#1d1d1d] font-outfit leading-7">
            You may update the information in this section at any time prior to submission. Once you have submitted,
            you will be able to add more standardized tests, but you will not be able to update or delete.
          </p>

          <p className="text-sm md:text-base text-[#1d1d1d] font-outfit leading-7">
            Some programs do require you to report standardized test scores. Please make sure to check your program
            requirements to ensure that your application will be reviewed in full.
          </p>

          <button
            onClick={() => setOptedOut(false)}
            className="inline-flex px-6 py-2 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
          >
            Would you like to add a tests?
          </button>
        </div>
      )}
    </AcademicHistoryStepLayout>
  );
};

export default StandardizedTestsPage;
