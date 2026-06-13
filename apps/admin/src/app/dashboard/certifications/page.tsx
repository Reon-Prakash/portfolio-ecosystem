"use client";

import { useEffect, useState } from "react";

type Certification = {
  id: string;
  title: string;
  issuer: string | null;
  date: string | null;
  imageUrl: string | null;
  type: string;
};

export default function CertificationsPage() {
  const [items, setItems] = useState<Certification[]>([]);
  const [editing, setEditing] = useState<Certification | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "",
    issuer: "",
    date: "",
    imageUrl: "",
    type: "course",
  });

  const load = async () => {
    const res = await fetch("/api/certifications");
    setItems(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const reset = () => {
    setEditing(null);
    setShowForm(false);
    setForm({
      title: "",
      issuer: "",
      date: "",
      imageUrl: "",
      type: "course",
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data?.url) {
        setForm((prev) => ({ ...prev, imageUrl: data.url }));
      }
    } catch {
      alert("Upload failed");
    }

    setUploading(false);
  };

  const save = async () => {
    await fetch("/api/certifications", {
      method: "POST",
      body: JSON.stringify({
        action: editing ? "update" : "create",
        id: editing?.id,
        ...form,
      }),
    });

    setMessage(editing ? "Certification updated." : "Certification created.");
    reset();
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this certification?")) return;
    await fetch("/api/certifications", {
      method: "POST",
      body: JSON.stringify({ action: "delete", id }),
    });
    setMessage("Certification deleted.");
    load();
  };

  const edit = (item: Certification) => {
    setEditing(item);
    setForm({
      title: item.title,
      issuer: item.issuer || "",
      date: item.date || "",
      imageUrl: item.imageUrl || "",
      type: item.type,
    });
    setShowForm(true);
  };

  const courseItems = items.filter((item) => item.type === "course");
  const participationItems = items.filter((item) => item.type === "participation");

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Certifications Management</h1>
        <button
          onClick={() => {
            reset();
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Add Certification
        </button>
      </div>

      {message && <div className="mb-4 p-3 rounded bg-green-50 text-green-700">{message}</div>}

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editing ? "Edit Certification" : "New Certification"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border rounded px-3 py-2 md:col-span-2"
            />
            <input
              type="text"
              placeholder="Issuer"
              value={form.issuer}
              onChange={(e) => setForm({ ...form, issuer: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="border rounded px-3 py-2"
            >
              <option value="course">Course & Examination</option>
              <option value="participation">Participation & Achievement</option>
            </select>

            <div>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm" />
              {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
              {form.imageUrl && (
                <img src={form.imageUrl} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded border" />
              )}
            </div>
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

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-3">Course & Examination Certifications</h2>
          <div className="bg-white rounded-lg shadow">
            {courseItems.length === 0 ? (
              <p className="p-4 text-gray-500">No course certifications yet.</p>
            ) : (
              <div className="divide-y">
                {courseItems.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt="" className="w-12 h-12 rounded object-cover border" />
                      )}
                      <div className="min-w-0">
                        <p className="font-medium break-words">{item.title}</p>
                        <p className="text-sm text-gray-500 break-words">
                          {item.issuer} {item.date ? `• ${item.date}` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 flex gap-2">
                      <button onClick={() => edit(item)} className="text-blue-600 text-sm">Edit</button>
                      <button onClick={() => remove(item.id)} className="text-red-600 text-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Participation & Achievement Certifications</h2>
          <div className="bg-white rounded-lg shadow">
            {participationItems.length === 0 ? (
              <p className="p-4 text-gray-500">No participation certifications yet.</p>
            ) : (
              <div className="divide-y">
                {participationItems.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt="" className="w-12 h-12 rounded object-cover border" />
                      )}
                      <div className="min-w-0">
                        <p className="font-medium break-words">{item.title}</p>
                        <p className="text-sm text-gray-500 break-words">
                          {item.issuer} {item.date ? `• ${item.date}` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 flex gap-2">
                      <button onClick={() => edit(item)} className="text-blue-600 text-sm">Edit</button>
                      <button onClick={() => remove(item.id)} className="text-red-600 text-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
