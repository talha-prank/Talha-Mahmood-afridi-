import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            02. Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Skills &amp; Technologies
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mt-2">
            Languages, frameworks, databases, and core Computer Science competencies.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors shadow-lg"
            >
              <h3 className="text-base font-bold text-white mb-5 pb-3 border-b border-slate-800 flex items-center justify-between">
                <span>{cat.category}</span>
                <span className="text-[11px] font-mono text-cyan-400">0{idx + 1}</span>
              </h3>

              <div className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-medium ${skill.highlight ? 'text-cyan-300 font-semibold' : 'text-slate-300'}`}>
                        {skill.name}
                      </span>
                      <span className="font-mono text-slate-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          skill.highlight
                            ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                            : 'bg-slate-500'
                        }`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
