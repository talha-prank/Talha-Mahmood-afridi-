import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, MapPin, Calendar, Award, CheckCircle2 } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            03. Academic Foundations
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Education
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mt-2">
            A consistent record of academic excellence across secondary, intermediate, and higher university education in Peshawar.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {EDUCATION_DATA.map((edu, index) => (
            <div
              key={edu.id}
              className="glass-card p-6 sm:p-7 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Academic Status and Period */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/40 px-2.5 py-0.5 rounded">
                    {edu.status}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {edu.period}
                  </span>
                </div>

                {/* Degree / Certificate Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {edu.degree}
                </h3>

                {/* Institution & Location */}
                <div className="space-y-1 mt-2 mb-4">
                  <p className="text-sm font-medium text-slate-300">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{edu.location}</span>
                  </p>
                </div>

                {/* Grade Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-700/70 text-xs font-semibold text-emerald-400 mb-5">
                  <Award className="w-3.5 h-3.5" />
                  <span>{edu.grade}</span>
                </div>

                {/* Academic Highlights */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Key Highlights
                  </p>
                  <ul className="space-y-1.5">
                    {edu.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{highlight}</span>
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
