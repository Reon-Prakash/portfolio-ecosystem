"use client";

import { useRef, useState } from "react";
import CertificateCard from "./CertificateCard";

type Certification = {
  id: string;
  title: string;
  issuer: string | null;
  date: string | null;
  imageUrl: string | null;
  type: string;
};

function Carousel({
  title,
  items,
}: {
  title: string;
  items: Certification[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-6">{title}</h3>

      {items.length === 0 ? (
        <p className="text-gray-500">No certifications yet.</p>
      ) : (
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow border border-gray-200"
            aria-label="Scroll left"
          >
            ←
          </button>

          <div ref={ref} className="carousel-container flex gap-4 overflow-x-auto px-12 py-2">
            {items.map((cert) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                isExpanded={expandedId === cert.id}
                onToggle={() =>
                  setExpandedId((prev) => (prev === cert.id ? null : cert.id))
                }
              />
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow border border-gray-200"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

export default function CertificationsSection({
  courseCerts,
  participationCerts,
}: {
  courseCerts: Certification[];
  participationCerts: Certification[];
}) {
  return (
    <section id="certifications" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center">Certifications</h2>
        <div className="w-16 h-1 bg-navBlue mx-auto mt-4 mb-12" />

        <Carousel
          title="Course & Examination Certifications"
          items={courseCerts}
        />

        <Carousel
          title="Participation & Achievement Certifications"
          items={participationCerts}
        />
      </div>
    </section>
  );
}
