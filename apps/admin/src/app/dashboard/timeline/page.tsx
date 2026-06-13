"use client";

import { useEffect, useState } from "react";

type Entry = {
  id: string;
  month: string;
  year: string;
  title: string;
  description: string;
  order: number;
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function TimelinePage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Entry | null>(null);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    month: "January",
    year: "",
    title: "",
    description: "",
  });

  const loadEntries = async () => {
    const res = await fetch("/api/timeline");
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const reset = () => {
    setForm({ month: "January", year: "", title: "", description: "" });
    setEditing(null);
    setShowForm(false);
  };

  const save = async () => {
    const action = editing ? "update" : "create";
    await fetch("/api/timeline", {
      method: "POST",
      body: JSON.stringify({
        action,
        id: editing?.id,
        ...form,
      }),
    });
    setMessage(editing ? "Timeline entry updated." : "Timeline entry created.");
    reset();
    loadEntries();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    await fetch("/api/timeline", {
      method: "POST",
      body: JSON.stringify({ action: "delete", id }),
    });
    setMessage("Timeline entry deleted.");
    loadEntries();
  };

  const reorder = async (newEntries: Entry[]) => {
    await fetch("/api/timeline", {
      method: "POST",
      body: JSON.stringify({
        action: "reorder",
        entries: newEntries.map((entry, index) => ({
          id: entry.id,
          order: index,
        })),
      }),
    });
    loadEntries();
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    const copy = [...entries];
    [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
    await reorder(copy);
  };

  const moveDown = async (index: number) => {
    if (index === entries.length - 1) return;
    const copy = [...entries];
    [copy[index], copy[index + 1]] = [copy[index + 1], copy[index]];
    await reorder(copy);
  };

  const edit = (entry: Entry) => {
    setEditing(entry);
    setForm({
      month: entry.month,
      year: entry.year,
      title: entry.title,
      description: entry.description,
    });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Timeline Management</h1>
        <button
          onClick={() => {
            reset();
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Add Entry
        </button>
      </div>

      {message && <div className="mb-4 p-3 rounded bg-green-50 text-green-700">{message}</div>}

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Edit Entry" : "New Entry"}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={form.month}
              onChange={(e) => setForm({ ...form, month: e.target.value })}
              className="border rounded px-3 py-2"
            >
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Year"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className="border rounded px-3 py-2"
            />

            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border rounded px-3 py-2 md:col-span-2"
            />

            <textarea
              rows={5}
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="border rounded px-3 py-2 md:col-span-2"
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
        {entries.length === 0 ? (
          <p className="p-6 text-gray-500">No timeline entries yet.</p>
        ) : (
          <div className="divide-y">
            {entries.map((entry, index) => (
              <div key={entry.id} className="p-4 flex justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm text-red-600 font-medium">
                    {entry.month} {entry.year}
                  </p>
                  <h3 className="font-semibold">{entry.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap break-words">
                    {entry.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-start gap-1">
                  <button onClick={() => moveUp(index)} className="px-2 py-1 text-sm">↑</button>
                  <button onClick={() => moveDown(index)} className="px-2 py-1 text-sm">↓</button>
                  <button onClick={() => edit(entry)} className="px-2 py-1 text-sm text-blue-600">Edit</button>
                  <button onClick={() => remove(entry.id)} className="px-2 py-1 text-sm text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
