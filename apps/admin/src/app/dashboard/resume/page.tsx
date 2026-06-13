"use client";

import { useEffect, useState } from "react";

export default function ResumePage() {
  const [resume, setResume] = useState<{ fileUrl: string; fileName: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/resume")
      .then((res) => res.json())
      .then((data) => {
        if (data?.fileUrl) setResume(data);
      })
      .catch(console.error);
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage("Please upload a PDF file.");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (uploadData?.url) {
        await fetch("/api/resume", {
          method: "POST",
          body: JSON.stringify({
            fileUrl: uploadData.url,
            fileName: file.name,
          }),
        });

        setResume({ fileUrl: uploadData.url, fileName: file.name });
        setMessage("Resume uploaded successfully.");
      }
    } catch {
      setMessage("Failed to upload resume.");
    }

    setUploading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Resume Management</h1>

      {message && <div className="mb-4 p-3 rounded bg-green-50 text-green-700">{message}</div>}

      <div className="bg-white rounded-lg shadow p-6">
        {resume && (
          <div className="mb-4">
            <p className="text-sm text-gray-500">Current Resume</p>
            <p className="font-medium">{resume.fileName}</p>
            <a
              href={resume.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline"
            >
              View Current Resume
            </a>
          </div>
        )}

        <label className="block text-sm font-medium mb-2">
          {resume ? "Replace Resume (PDF)" : "Upload Resume (PDF)"}
        </label>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleUpload}
          disabled={uploading}
          className="block w-full text-sm"
        />

        {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
      </div>
    </div>
  );
}
