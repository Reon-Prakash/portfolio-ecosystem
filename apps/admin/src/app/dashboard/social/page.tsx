"use client";

import { useEffect, useState } from "react";

type SocialLink = {
  id: string;
  platform: string;
  url: string;
};

export default function SocialPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [editing, setEditing] = useState<SocialLink | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ platform: "", url: "" });

  const load = async () => {
    const res = await fetch("/api/social");
    setLinks(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const reset = () => {
    setEditing(null);
    setShowForm(false);
    setForm({ platform: "", url: "" });
  };

  const save = async () => {
    await fetch("/api/social", {
      method: "POST",
      body: JSON.stringify({
        action: editing ? "update" : "create",
        id: editing?.id,
        ...form,
      }),
    });
    setMessage(editing ? "Social link updated." : "Social link created.");
    reset();
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this link?")) return;
    await fetch("/api/social", {
      method: "POST",
      body: JSON.stringify({ action: "delete", id }),
    });
    setMessage("Social link deleted.");
    load();
  };

  const edit = (item: SocialLink) => {
    setEditing(item);
    setForm({ platform: item.platform, url: item.url });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Social Links Management</h1>
        <button
          onClick={() => {
            reset();
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Add Link
        </button>
      </div>

      {message && <div className="mb-4 p-3 rounded bg-green-50 text-green-700">{message}</div>}

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Edit Link" : "New Link"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Platform"
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="URL or email"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={save} className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
              {editing ? "Update" : "Create"}
            </button>
            <button onClick={reset} className="bg-gray-200 px-4 py-2 rounded text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        {links.length === 0 ? (
          <p className="p-6 text-gray-500">No social links yet.</p>
        ) : (
          <div className="divide-y">
            {links.map((link) => (
              <div key={link.id} className="p-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium break-words">{link.platform}</p>
                  <p className="text-sm text-gray-500 break-all">{link.url}</p>
                </div>
                <div className="shrink-0 flex gap-2">
                  <button onClick={() => edit(link)} className="text-blue-600 text-sm">Edit</button>
                  <button onClick={() => remove(link.id)} className="text-red-600 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
