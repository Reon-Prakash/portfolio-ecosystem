"use client";

import { useEffect, useState } from "react";

type Visitor = {
  id: string;
  timestamp: string;
  browser: string | null;
  operatingSystem: string | null;
  deviceType: string | null;
  screenResolution: string | null;
  referrer: string | null;
  country: string | null;
  sessionDuration: number | null;
  entryTime: string;
  exitTime: string | null;
};

type AnalyticsData = {
  visitors: Visitor[];
  countryStats: { country: string | null; _count: { country: number } }[];
  browserStats: { browser: string | null; _count: { browser: number } }[];
  deviceStats: { deviceType: string | null; _count: { deviceType: number } }[];
  totalVisitors: number;
  avgDuration: number;
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    visitors: [],
    countryStats: [],
    browserStats: [],
    deviceStats: [],
    totalVisitors: 0,
    avgDuration: 0,
  });

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) =>
        setData(
          data || {
            visitors: [],
            countryStats: [],
            browserStats: [],
            deviceStats: [],
            totalVisitors: 0,
            avgDuration: 0,
          },
        ),
      )
      .catch(() =>
        setData({
          visitors: [],
          countryStats: [],
          browserStats: [],
          deviceStats: [],
          totalVisitors: 0,
          avgDuration: 0,
        }),
      );
  }, []);

  const formatDate = (value: string) => new Date(value).toLocaleString();

  const formatDuration = (seconds: number | null) => {
    if (seconds === null || Number.isNaN(seconds)) return "N/A";
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Visitor Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Total Visitors</p>
          <p className="text-3xl font-bold mt-2">{data.totalVisitors}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Average Session Duration</p>
          <p className="text-3xl font-bold mt-2">
            {formatDuration(data.avgDuration)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Visitor Rows Loaded</p>
          <p className="text-3xl font-bold mt-2">
            {data.visitors?.length || 0}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 pb-4">
          <h2 className="text-lg font-semibold">Visitor History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3">Timestamp</th>
                <th className="text-left px-4 py-3">Country</th>
                <th className="text-left px-4 py-3">Browser</th>
                <th className="text-left px-4 py-3">OS</th>
                <th className="text-left px-4 py-3">Device</th>
                <th className="text-left px-4 py-3">Resolution</th>
                <th className="text-left px-4 py-3">Duration</th>
                <th className="text-left px-4 py-3">Entry Time</th>
                <th className="text-left px-4 py-3">Exit Time</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {(data.visitors || []).map((visitor) => (
                <tr key={visitor.id}>
                  <td className="px-4 py-3">{formatDate(visitor.timestamp)}</td>
                  <td className="px-4 py-3">{visitor.country || "Unknown"}</td>
                  <td className="px-4 py-3">{visitor.browser || "Unknown"}</td>
                  <td className="px-4 py-3">
                    {visitor.operatingSystem || "Unknown"}
                  </td>
                  <td className="px-4 py-3">
                    {visitor.deviceType || "Unknown"}
                  </td>
                  <td className="px-4 py-3">
                    {visitor.screenResolution || "Unknown"}
                  </td>
                  <td className="px-4 py-3">
                    {formatDuration(visitor.sessionDuration)}
                  </td>
                  <td className="px-4 py-3">{formatDate(visitor.entryTime)}</td>
                  <td className="px-4 py-3">
                    {visitor.exitTime ? formatDate(visitor.exitTime) : "Active"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
