"use client";

export default function CertificateCard({
  cert,
  isExpanded,
  onToggle,
}: {
  cert: {
    id: string;
    title: string;
    issuer: string | null;
    date: string | null;
    imageUrl: string | null;
  };
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onToggle}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {cert.imageUrl ? (
              <img src={cert.imageUrl} alt={cert.title} className="w-full h-auto rounded" />
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <h3 className="text-xl font-bold mt-4 break-words">{cert.title}</h3>
            {cert.issuer && <p className="text-gray-600 mt-1 break-words">{cert.issuer}</p>}
            {cert.date && <p className="text-sm text-gray-500 mt-1">{cert.date}</p>}
          </div>
        </div>
      )}

      <div
        onClick={onToggle}
        className="w-72 shrink-0 rounded-lg bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        style={{ border: "1px solid rgba(0,0,0,0.15)" }}
      >
        <div className="h-40 bg-gray-50 rounded-t-lg overflow-hidden">
          {cert.imageUrl ? (
            <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>

        <div className="p-4">
          <h4 className="text-sm font-bold break-words">{cert.title}</h4>
          {cert.issuer && <p className="text-xs text-gray-500 mt-1 break-words">{cert.issuer}</p>}
          {cert.date && <p className="text-xs text-gray-400 mt-1">{cert.date}</p>}
        </div>
      </div>
    </>
  );
}
