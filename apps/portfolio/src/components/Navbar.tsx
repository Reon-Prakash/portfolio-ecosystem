"use client";

import { useState } from "react";
import { DEFAULT_PROFILE_IMAGE } from "@/lib/constants";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#timeline" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Resume", href: "#resume" },
];

export default function Navbar({
  profileImage,
}: {
  profileImage?: string | null;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const imgSrc = profileImage || DEFAULT_PROFILE_IMAGE;

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const navHeight = 64;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-16 bg-navBlue shadow-md">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shrink-0">
          <img src={imgSrc} alt="Profile" className="w-full h-full object-cover" />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-white text-sm font-medium hover:text-blue-100 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-blue-500 bg-navBlue">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="block px-4 py-3 text-white text-sm hover:bg-blue-700"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
