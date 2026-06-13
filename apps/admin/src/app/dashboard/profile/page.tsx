"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => setImageUrl(data?.imageUrl || null))
      .catch(console.error);
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        await fetch("/api/profile", {
          method: "POST",
          body: JSON.stringify({ imageUrl: uploadData.url }),
        });

        setImageUrl(uploadData.url);
        setMessage("Profile picture updated successfully.");
      }
    } catch {
      setMessage("Failed to upload image.");
    }

    setUploading(false);
  };

  const handleDelete = async () => {
    await fetch("/api/profile", { method: "DELETE" });
    setImageUrl(null);
    setMessage("Profile picture deleted.");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Profile Picture Management</h1>

      {message && <div className="mb-4 p-3 rounded bg-green-50 text-green-700">{message}</div>}

      <div className="bg-white rounded-lg shadow p-6">
        {imageUrl && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Current Profile Picture</p>
            <img src={imageUrl} alt="Profile" className="w-32 h-32 object-cover rounded border" />
          </div>
        )}

        <label className="block text-sm font-medium mb-2">
          {imageUrl ? "Replace Profile Picture" : "Upload Profile Picture"}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="block w-full text-sm"
        />

        {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}

        {imageUrl && (
          <button
            onClick={handleDelete}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
          >
            Delete Profile Picture
          </button>
        )}
      </div>
    </div>
  );
}
