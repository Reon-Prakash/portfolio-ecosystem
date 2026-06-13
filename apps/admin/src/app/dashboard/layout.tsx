"use client";

import Link from "next/link";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const items = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Profile Picture", href: "/dashboard/profile" },
  { label: "About", href: "/dashboard/about" },
  { label: "Timeline", href: "/dashboard/timeline" },
  { label: "Skills", href: "/dashboard/skills" },
  { label: "Certifications", href: "/dashboard/certifications" },
  { label: "Resume", href: "/dashboard/resume" },
  { label: "Social Links", href: "/dashboard/social" },
  { label: "Quote", href: "/dashboard/quote" },
  { label: "Analytics", href: "/dashboard/analytics" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-950 p-4 flex flex-col">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white">Portfolio Admin</h1>
          <p className="text-sm text-gray-400">{session.user?.email}</p>
        </div>

        <nav className="p-2 flex-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded text-sm mb-1 ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full bg-red-600 text-white rounded py-2 text-sm hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
