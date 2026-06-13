"use client";

import { useEffect, useState } from "react";

type Skill = {
  id: string;
  name: string;
  category: string | null;
};

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", category: "" });

  const load = async () => {
    const res = await fetch("/api/skills");
    setSkills(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const reset = () => {
    setEditing(null);
    setShowForm(false);
    setForm({ name: "", category: "" });
  };

  const save = async () => {
    await fetch("/api/skills", {
      method: "POST",
      body: JSON.stringify({
        action: editing ? "update" : "create",
        id: editing?.id,
        ...form,
      }),
    });
    setMessage(editing ? "Skill updated." : "Skill created.");
    reset();
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await fetch("/api/skills", {
      method: "POST",
      body: JSON.stringify({ action: "delete", id }),
    });
    setMessage("Skill deleted.");
    load();
  };

  const edit = (skill: Skill) => {
    setEditing(skill);
    setForm({ name: skill.name, category: skill.category || "" });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Skills Management</h1>
        <button
          onClick={() => {
            reset();
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Add Skill
        </button>
      </div>

      {message && <div className="mb-4 p-3 rounded bg-green-50 text-green-700">{message}</div>}

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Edit Skill" : "New Skill"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Skill name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Category (optional)"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
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
        {skills.length === 0 ? (
          <p className="p-6 text-gray-500">No skills yet.</p>
        ) : (
          <div className="divide-y">
            {skills.map((skill) => (
              <div key={skill.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{skill.name}</p>
                  {skill.category && <p className="text-sm text-gray-500">{skill.category}</p>}
                </div>
                <div className="shrink-0 flex gap-2">
                  <button onClick={() => edit(skill)} className="text-blue-600 text-sm">Edit</button>
                  <button onClick={() => remove(skill.id)} className="text-red-600 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
