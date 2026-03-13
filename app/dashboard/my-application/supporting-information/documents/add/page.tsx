"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, CirclePlus } from "lucide-react";
import SupportingInfoStepLayout from "@/components/dashboard/SupportingInfoStepLayout";

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024;

type DocumentTypeOption =
  | "CV_RESUME"
  | "PERSONAL_STATEMENT"
  | "TRANSCRIPT"
  | "TEST_SCORE"
  | "PASSPORT"
  | "ID_CARD"
  | "CERTIFICATE"
  | "RECOMMENDATION"
  | "OTHER";

const documentTypeOptions: Array<{ value: DocumentTypeOption; label: string }> = [
  { value: "CV_RESUME", label: "CV/Resume" },
  { value: "PERSONAL_STATEMENT", label: "Personal Statement" },
  { value: "TRANSCRIPT", label: "Transcript" },
  { value: "TEST_SCORE", label: "Test Score" },
  { value: "PASSPORT", label: "Passport" },
  { value: "ID_CARD", label: "ID Card" },
  { value: "CERTIFICATE", label: "Certificate" },
  { value: "RECOMMENDATION", label: "Recommendation" },
  { value: "OTHER", label: "Other" },
];

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }
      reject(new Error("Failed to read selected file."));
    };

    reader.onerror = () => {
      reject(new Error("Failed to read selected file."));
    };

    reader.readAsDataURL(file);
  });
}

type ApiApplication = {
  id: string;
};

const AddSupportingDocumentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [label, setLabel] = useState("");
  const [documentType, setDocumentType] = useState<DocumentTypeOption>("CV_RESUME");
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [isResolvingApplication, setIsResolvingApplication] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const applicationIdFromQuery = searchParams.get("applicationId")?.trim() || "";

    if (applicationIdFromQuery) {
      setApplicationId(applicationIdFromQuery);
      setIsResolvingApplication(false);
      return;
    }

    const resolveApplication = async () => {
      setIsResolvingApplication(true);
      try {
        const response = await fetch(
          "/api/applications?page=1&pageSize=1&status=DRAFT,IN_PROGRESS",
          { cache: "no-store" },
        );

        if (!response.ok) {
          if (isMounted) {
            setApplicationId(null);
          }
          return;
        }

        const result = (await response.json()) as { data?: ApiApplication[] };
        if (isMounted) {
          setApplicationId(result.data?.[0]?.id ?? null);
        }
      } finally {
        if (isMounted) {
          setIsResolvingApplication(false);
        }
      }
    };

    void resolveApplication();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  const selectedFileName = selectedFile?.name ?? "";
  const fileSizeLabel = useMemo(() => {
    if (!selectedFile) return "";
    const kb = selectedFile.size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  }, [selectedFile]);

  const handleUpload = async () => {
    setErrorMessage(null);

    if (!selectedFile) {
      setErrorMessage("Please choose a file before uploading.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage("File size exceeds the 15MB limit.");
      return;
    }

    setIsUploading(true);

    try {
      const fileUrl = await fileToDataUrl(selectedFile);

      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId,
          type: documentType,
          label: label.trim() || null,
          fileName: selectedFile.name,
          fileUrl,
          mimeType: selectedFile.type || "application/octet-stream",
          sizeBytes: selectedFile.size,
        }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error || "Failed to upload document.");
      }

      router.push("/dashboard/my-application/supporting-information/documents");
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to upload document.");
    } finally {
      setIsUploading(false);
    }
  };

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
            <label className="block text-sm font-outfit text-gray-900 mb-2">
              Document type
            </label>
            <select
              value={documentType}
              onChange={(event) => setDocumentType(event.target.value as DocumentTypeOption)}
              className="w-full md:w-80 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-outfit text-gray-900 mb-4 focus:outline-none focus:border-[#E3572B]"
            >
              {documentTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <label className="block text-sm font-outfit text-gray-900 mb-2">
              Label (optional)
            </label>
            <input
              type="text"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              placeholder="Example: Updated CV for Fall intake"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-outfit text-gray-900 mb-4 focus:outline-none focus:border-[#E3572B]"
            />

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
                    onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                  />
                </label>
                {selectedFileName ? (
                  <span className="text-xs text-gray-600 font-outfit">
                    {selectedFileName} {fileSizeLabel ? `(${fileSizeLabel})` : ""}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col items-start md:items-end gap-2">
                {isResolvingApplication ? (
                  <p className="text-xs font-outfit text-gray-500">Resolving application...</p>
                ) : null}
                {!isResolvingApplication && !applicationId ? (
                  <p className="text-xs font-outfit text-gray-500">No active application selected. Document will be saved to your profile.</p>
                ) : null}
                <button
                  type="button"
                  onClick={() => void handleUpload()}
                  disabled={isUploading}
                  className="inline-flex px-8 py-2 rounded-lg bg-[#E3572B] text-white text-xs font-outfit font-semibold hover:bg-[#c24d2b] transition-colors w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? "Uploading..." : "Upload This Documents"}
                </button>
              </div>
            </div>
          </div>

          {errorMessage ? (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 font-outfit">
              {errorMessage}
            </div>
          ) : null}
        </div>
      </div>
    </SupportingInfoStepLayout>
  );
};

export default AddSupportingDocumentPage;
