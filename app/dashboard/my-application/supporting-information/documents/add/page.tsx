"use client";

import { useState } from "react";
import { CheckCircle2, CirclePlus } from "lucide-react";
import SupportingInfoStepLayout from "@/components/dashboard/SupportingInfoStepLayout";

const AddSupportingDocumentPage = () => {
  const [fileName, setFileName] = useState("");

  return (
    <SupportingInfoStepLayout
      activeStep="documents"
      title="Documents"
      showClose
      closeHref="/dashboard/my-application/supporting-information/documents"
    >
      <div className="max-w-5xl space-y-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={20} className="text-[#6BCF63]" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-outfit">Ok, Let&apos;s Add Your Documents!</h2>
        </div>

        <p className="text-sm md:text-base text-[#1d1d1d] font-outfit leading-7">
          The accepted file formats are MS Word (.doc, .docx), JPEG (.jpeg, .jpg), HEIC (.heic), HEIF (.heif),
          PNG (.png), Rich Text Format (.rtf), Portable Document Format (.pdf), and ASCII Text file (.txt). The size
          limit for each file upload is 15MB.
        </p>

        <p className="text-sm md:text-base text-[#1d1d1d] font-outfit leading-7">
          IMPORTANT: If editing problems uploading PDF? While inside your PDF creation software in use, it&apos;s possible
          that the PDF you are trying to upload is in a format that we cannot read. Upload works best with PDF files
          conforming to the Acrobat 5.0 (PDF 1.4) standard.
        </p>

        <div className="rounded bg-[#FDF1E4] p-6 space-y-5">
          <div>
            <label className="block text-sm font-outfit text-gray-900 mb-3">
              <span className="text-[#E3572B] mr-1">*</span>Select the file to upload
            </label>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E3572B] text-white text-xs font-outfit font-semibold cursor-pointer hover:bg-[#c24d2b] transition-colors">
                  <CirclePlus size={12} />
                  Choose file
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                  />
                </label>
                {fileName ? <span className="text-xs text-gray-600 font-outfit">{fileName}</span> : null}
              </div>

              <button className="inline-flex px-8 py-2 rounded-lg bg-[#E3572B] text-white text-xs font-outfit font-semibold hover:bg-[#c24d2b] transition-colors w-fit">
                Upload This Documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </SupportingInfoStepLayout>
  );
};

export default AddSupportingDocumentPage;

