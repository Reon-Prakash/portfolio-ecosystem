"use client";

import { useEffect, useState } from "react";

export default function QuotePage() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/quote")
      .then((res) => res.json())
      .then((data) => {
        setText(data?.text || "");
        setAuthor(data?.author || "");
      })
      .catch(console.error);
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage("");

    try {
      await fetch("/api/quote", {
        method: "POST",
        body: JSON.stringify({ text, author }),
      });
      setMessage("Quote saved successfully.");
    } catch {
      setMessage("Failed to save quote.");
    }

    setSaving(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quote Management</h1>

      {message && <div className="mb-4 p-3 rounded bg-green-50 text-green-700">{message}</div>}

      <div className="bg-white rounded-lg shadow p-6">
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Quote text"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author (optional)"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <button
          onClick={save}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
