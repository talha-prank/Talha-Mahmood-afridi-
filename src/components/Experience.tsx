import React from 'react';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 lg:py-28 relative bg-[#060a12]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            04. Instructional Leadership &amp; Pedagogy
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Professional Experience
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mt-2">
            Over 4 years of classroom teaching, calligraphy instruction, and board exam mentorship across schools and educational centers in Peshawar.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-10 sm:space-y-12">
          {EXPERIENCE_DATA.map((exp, index) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#080c14] border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all duration-300 shadow-sm shadow-cyan-400/50" />

              {/* Experience Card */}
              <div className="glass-card p-6 sm:p-7 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-0.5 rounded">
                      {exp.period} {exp.duration ? `· ${exp.duration}` : ''}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Role and Institution */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {exp.role} <span className="text-slate-400 font-normal">at</span> {exp.institution}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Responsibilities */}
                <div className="mt-4 pt-4 border-t border-slate-800/70">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Responsibilities &amp; Achievements
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
