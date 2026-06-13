"use client";

import { DEFAULT_PROFILE_IMAGE } from "@/lib/constants";

export default function WelcomePage({
  profileImage,
  onEnter,
  transitioning,
}: {
  profileImage?: string | null;
  onEnter: () => void;
  transitioning: boolean;
}) {
  const imgSrc = profileImage || DEFAULT_PROFILE_IMAGE;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden relative">
      <div
        className={`overflow-hidden transition-all duration-1000 ease-in-out ${
          transitioning
            ? "w-16 h-16 fixed top-4 left-4 z-50 rounded-full"
            : "w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-none"
        }`}
      >
        <img
          src={imgSrc}
          alt="Profile"
          className={`w-full h-full object-cover transition-all duration-1000 ${
            transitioning ? "rounded-full" : "rounded-none"
          }`}
        />
      </div>

      <div
        className={`mt-8 flex flex-col items-center transition-opacity duration-700 ${
          transitioning ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold px-4">
          Welcome to Reon&apos;s Portfolio Website
        </h1>
        <button
          onClick={onEnter}
          disabled={transitioning}
          className="mt-8 px-8 py-3 bg-black text-white rounded text-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          Click to Proceed
        </button>
      </div>
    </div>
  );
}
