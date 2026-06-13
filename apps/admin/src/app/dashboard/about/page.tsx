"use client";

import { useEffect, useState } from "react";

export default function AboutPage() {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setContent(data?.content || ""))
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      await fetch("/api/about", {
        method: "POST",
        body: JSON.stringify({ content }),
      });
      setMessage("About content saved successfully.");
    } catch {
      setMessage("Failed to save about content.");
    }

    setSaving(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">About Management</h1>

      {message && <div className="mb-4 p-3 rounded bg-green-50 text-green-700">{message}</div>}

      <div className="bg-white rounded-lg shadow p-6">
        <label className="block text-sm font-medium mb-2">About Me Content</label>
        <textarea
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
