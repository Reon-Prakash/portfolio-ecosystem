export default function AboutSection({
  content,
}: {
  content?: string;
}) {
  return (
    <section id="about" className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center">About</h2>
        <div className="w-16 h-1 bg-navBlue mx-auto mt-4 mb-8" />
        <div className="text-base sm:text-lg leading-relaxed text-gray-800 whitespace-pre-wrap break-words">
          {content || "No content added yet."}
        </div>
      </div>
    </section>
  );
}
