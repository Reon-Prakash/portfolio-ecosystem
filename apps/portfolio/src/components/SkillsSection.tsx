type Skill = {
  id: string;
  name: string;
  category: string | null;
};

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce((acc: Record<string, Skill[]>, skill) => {
    const key = skill.category || "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center">Skills</h2>
        <div className="w-16 h-1 bg-navBlue mx-auto mt-4 mb-12" />

        {skills.length === 0 ? (
          <p className="text-center text-gray-500">No skills added yet.</p>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                {Object.keys(grouped).length > 1 && (
                  <h3 className="text-xl font-semibold mb-4">{category}</h3>
                )}
                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-4 py-2 bg-gray-100 border border-gray-200 rounded text-sm font-medium break-words"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
