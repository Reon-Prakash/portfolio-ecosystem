"use client";

export default function ResumeSection({
  hasResume,
}: {
  hasResume: boolean;
}) {
  return (
    <section id="resume" className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Resume</h2>
        <div className="w-16 h-1 bg-navBlue mx-auto mt-4 mb-8" />

        {hasResume ? (
          <button
            onClick={() => window.location.assign("/api/resume")}
            className="px-8 py-3 bg-navBlue text-white rounded text-lg hover:bg-blue-700 transition-colors"
          >
            View Resume
          </button>
        ) : (
          <p className="text-gray-500">Resume not available yet.</p>
        )}
      </div>
    </section>
  );
}
