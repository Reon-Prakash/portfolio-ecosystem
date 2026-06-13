"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/analytics?summary=true")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  const links = [
    { label: "Profile Picture", href: "/dashboard/profile" },
    { label: "About", href: "/dashboard/about" },
    { label: "Timeline", href: "/dashboard/timeline" },
    { label: "Skills", href: "/dashboard/skills" },
    { label: "Certifications", href: "/dashboard/certifications" },
    { label: "Resume", href: "/dashboard/resume" },
    { label: "Social Links", href: "/dashboard/social" },
    { label: "Quote", href: "/dashboard/quote" },
    { label: "Analytics", href: "/dashboard/analytics" }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500">Total Visitors</p>
            <p className="text-3xl font-bold mt-2">{stats.totalVisitors}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500">Today&apos;s Visitors</p>
            <p className="text-3xl font-bold mt-2">{stats.todayVisitors}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500">Avg Session Duration</p>
            <p className="text-3xl font-bold mt-2">{stats.avgDuration}s</p>
          </div>
        </div>
      ) : (
        <p>Loading dashboard statistics...</p>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Manage Content</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded border bg-gray-50 p-4 text-sm font-medium hover:bg-gray-100"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
