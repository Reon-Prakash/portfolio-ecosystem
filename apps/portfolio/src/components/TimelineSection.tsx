type TimelineEntry = {
  id: string;
  month: string;
  year: string;
  title: string;
  description: string;
};

export default function TimelineSection({
  entries,
}: {
  entries: TimelineEntry[];
}) {
  return (
    <section id="timeline" className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center">Timeline</h2>
        <div className="w-16 h-1 bg-timelineRed mx-auto mt-4 mb-12" />

        {entries.length === 0 ? (
          <p className="text-center text-gray-500">No timeline entries yet.</p>
        ) : (
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-timelineRed" />
            <div className="md:hidden absolute left-5 top-0 bottom-0 w-1 bg-timelineRed" />

            {entries.map((entry, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={entry.id} className="relative mb-12 last:mb-0">
                  <div className="hidden md:flex">
                    <div className={`w-1/2 ${isLeft ? "pr-12 text-right" : ""}`}>
                      {isLeft && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                          <p className="text-sm font-semibold text-timelineRed">
                            {entry.month} {entry.year}
                          </p>
                          <h3 className="text-lg font-bold mt-1 break-words">{entry.title}</h3>
                          <p className="text-sm text-gray-600 mt-2 leading-relaxed whitespace-pre-wrap break-words">
                            {entry.description}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-4 h-4 rounded-full bg-timelineRed border-4 border-white shadow" />

                    <div className={`w-1/2 ${!isLeft ? "pl-12" : ""}`}>
                      {!isLeft && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                          <p className="text-sm font-semibold text-timelineRed">
                            {entry.month} {entry.year}
                          </p>
                          <h3 className="text-lg font-bold mt-1 break-words">{entry.title}</h3>
                          <p className="text-sm text-gray-600 mt-2 leading-relaxed whitespace-pre-wrap break-words">
                            {entry.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:hidden flex items-start">
                    <div className="absolute left-5 mt-2 w-3 h-3 rounded-full bg-timelineRed border-2 border-white shadow" />
                    <div className="ml-10 bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex-1">
                      <p className="text-xs font-semibold text-timelineRed">
                        {entry.month} {entry.year}
                      </p>
                      <h3 className="text-base font-bold mt-1 break-words">{entry.title}</h3>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed whitespace-pre-wrap break-words">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="relative mt-12">
              <div className="hidden md:block">
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-timelineRed border-4 border-white shadow" />
                <p className="pt-8 text-center font-semibold text-timelineRed">More To Come...</p>
              </div>
              <div className="md:hidden">
                <div className="absolute left-5 w-3 h-3 rounded-full bg-timelineRed border-2 border-white shadow" />
                <p className="ml-10 font-semibold text-timelineRed">More To Come...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
