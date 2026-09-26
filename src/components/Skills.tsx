import React, { useState } from 'react';
import { SKILLS_DATA, SkillItem } from '../data/portfolioData';
import { Code2, Terminal, Globe, Award, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Competencies', icon: Sparkles },
  { id: 'core', label: 'Core CS & Logic', icon: Terminal },
  { id: 'web', label: 'Web & Frontend', icon: Globe },
  { id: 'growth', label: 'SEO & Data', icon: Code2 },
  { id: 'creative', label: 'Leadership & Craft', icon: Award },
];

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSkills = activeCategory === 'all'
    ? SKILLS_DATA
    : SKILLS_DATA.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 lg:py-28 relative bg-[#060a12]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
              02. Technical &amp; Practical Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
              Skills &amp; Competencies
            </h2>
            <p className="text-base text-slate-400 mt-2">
              A balanced blend of low-level computer science logic, modern web development, search engine strategy, and instructional leadership.
            </p>
          </div>

          {/* Interactive Filter Tabs (Buttons with click handlers - allowed per Zero-Pill rules) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 self-start md:self-auto">
            {CATEGORIES.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Title & Level Indicator */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-xs font-mono font-medium text-cyan-400 tabular-nums">
                    {skill.level}%
                  </span>
                </div>

                {/* Subtitle / Experience Context */}
                <p className="text-xs text-slate-400 mb-3">
                  {skill.experience}
                </p>

                {/* Animated Progress Bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {/* Detailed Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              {/* Zero-Pill Discipline: Unboxed metadata tags separated by dots */}
              <div className="pt-3 border-t border-slate-800/80">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-400">
                  {skill.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <span className="font-mono text-slate-300">{tag}</span>
                      {idx < skill.tags.length - 1 && (
                        <span className="text-slate-600" aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
