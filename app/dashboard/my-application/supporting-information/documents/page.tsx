"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Trash2, UserRound } from "lucide-react";
import SupportingInfoStepLayout from "@/components/dashboard/SupportingInfoStepLayout";

const tips = [
  {
    title: "Recovery my Account",
    body: "Forgot credentials, requesting account recovery support and access",
  },
  {
    title: "Accepted File Types",
    body: "Forgot credentials, requesting account recovery support and access",
  },
  {
    title: "Do Not Password Protect You Documents",
    body: "Forgot credentials, requesting account recovery support and access",
  },
  {
    title: "Conceal Your Social Security Number (SSN)",
    body: "Forgot credentials, requesting account recovery support and access",
  },
];

type ApiDocument = {
  id: string;
  type: string;
  label: string | null;
  fileName: string;
  fileUrl: string;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
  applicationId: string | null;
};

type ApiApplication = {
  id: string;
  university: {
    name: string;
  };
  program: {
    name: string;
  };
};

function formatBytes(bytes: number) {
  if (bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;
  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function humanizeType(type: string) {
  return type
    .toLowerCase()
    .split("_")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}

const SupportingDocumentsPage = () => {
  const [documents, setDocuments] = useState<ApiDocument[]>([]);
  const [activeApplication, setActiveApplication] = useState<ApiApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deletingDocumentId, setDeletingDocumentId] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const [documentsResponse, applicationsResponse] = await Promise.all([
        fetch("/api/documents?page=1&pageSize=100", { cache: "no-store" }),
        fetch("/api/applications?page=1&pageSize=1&status=DRAFT,IN_PROGRESS", {
          cache: "no-store",
        }),
      ]);

      if (!documentsResponse.ok) {
        const result = (await documentsResponse.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(result?.error || "Failed to load documents.");
      }

      const documentsResult = (await documentsResponse.json()) as {
        data?: ApiDocument[];
      };
      setDocuments(documentsResult.data ?? []);

      if (applicationsResponse.ok) {
        const applicationsResult = (await applicationsResponse.json()) as {
          data?: ApiApplication[];
        };
        setActiveApplication(applicationsResult.data?.[0] ?? null);
      } else {
        setActiveApplication(null);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const hasCvResume = useMemo(
    () => documents.some((document) => document.type === "CV_RESUME"),
    [documents],
  );

  const addDocumentHref = activeApplication
    ? `/dashboard/my-application/supporting-information/documents/add?applicationId=${activeApplication.id}`
    : "/dashboard/my-application/supporting-information/documents/add";

  const deleteDocument = async (documentId: string) => {
    setDeletingDocumentId(documentId);
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error || "Failed to delete document.");
      }

      setDocuments((current) => current.filter((document) => document.id !== documentId));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to delete document.");
    } finally {
      setDeletingDocumentId(null);
    }
  };

  return (
    <SupportingInfoStepLayout activeStep="documents" title="Documents">
      <div className="max-w-5xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip) => (
            <article key={tip.title} className="rounded-2xl bg-[#FFF4EA] border border-[#F6E7D8] p-4">
              <UserRound size={14} className="text-gray-500 mb-2" />
              <h2 className="font-outfit text-lg font-semibold text-gray-900 mb-1">{tip.title}</h2>
              <p className="font-outfit text-sm text-gray-600 leading-6">{tip.body}</p>
              <button className="mt-2 font-outfit text-sm text-[#E3572B] hover:opacity-80 transition-opacity">
                Learn more
              </button>
            </article>
          ))}
        </div>

        <div className="flex justify-end">
          <p className="font-outfit text-sm text-gray-700">* Indicates required field</p>
        </div>

        <div className="rounded bg-[#FDF1E4] p-5">
          <p className="font-outfit text-xl font-semibold text-gray-900 mb-1">
            <span className="text-[#E3572B] mr-1">*</span>CV/Resume
          </p>
          <p className="font-outfit text-sm text-gray-600">
            {hasCvResume ? "Uploaded" : "Not uploaded yet"}
          </p>

          {activeApplication ? (
            <p className="font-outfit text-xs text-gray-500 mt-2">
              Active application: {activeApplication.university.name} - {activeApplication.program.name}
            </p>
          ) : null}

          <Link
            href={addDocumentHref}
            className="inline-flex mt-4 px-4 py-2 rounded-lg bg-[#E3572B] text-white text-sm font-outfit font-semibold hover:bg-[#c24d2b] transition-colors"
          >
            Add Document
          </Link>
        </div>

        {errorMessage ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-lg border border-dashed border-[#E3572B]/40 bg-white p-6 text-sm text-gray-600 text-center">
            Loading documents...
          </div>
        ) : null}

        {!isLoading && !documents.length ? (
          <div className="rounded-lg border border-dashed border-[#E3572B]/40 bg-white p-6 text-sm text-gray-600 text-center">
            No uploaded documents yet.
          </div>
        ) : null}

        {!isLoading && documents.length ? (
          <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-[1.8fr_1fr_1fr_auto] gap-3 px-4 py-3 border-b border-gray-100 text-xs font-outfit font-semibold text-gray-600 uppercase tracking-wide">
              <p>File</p>
              <p>Type</p>
              <p>Size</p>
              <p className="text-right">Actions</p>
            </div>

            {documents.map((document) => (
              <div
                key={document.id}
                className="grid grid-cols-[1.8fr_1fr_1fr_auto] gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <p className="font-outfit text-sm font-semibold text-gray-900">{document.fileName}</p>
                  <p className="font-outfit text-xs text-gray-500">
                    Uploaded {new Date(document.uploadedAt).toLocaleDateString("en-US")}
                  </p>
                </div>
                <p className="font-outfit text-sm text-gray-700">{humanizeType(document.type)}</p>
                <p className="font-outfit text-sm text-gray-700">{formatBytes(document.sizeBytes)}</p>
                <div className="flex items-center justify-end gap-2">
                  <a
                    href={document.fileUrl}
                    download={document.fileName}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded border border-[#E3572B] text-[#E3572B] text-xs font-outfit font-semibold hover:bg-[#FFF4EA] transition-colors"
                  >
                    Download
                  </a>
                  <button
                    type="button"
                    onClick={() => void deleteDocument(document.id)}
                    disabled={deletingDocumentId === document.id}
                    className="inline-flex items-center justify-center w-8 h-8 rounded border border-red-200 text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Delete document"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </SupportingInfoStepLayout>
  );
};

export default SupportingDocumentsPage;
