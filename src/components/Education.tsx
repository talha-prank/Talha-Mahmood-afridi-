import React from 'react';
import { EDUCATION } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            04. Academic Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Education &amp; Background
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mt-2">
            Formal training in Computer Science at Pakistan's premier engineering institution.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-8">
          {EDUCATION.map((edu, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Undergraduate Degree
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {edu.institution}
                  </h3>
                  <p className="text-base text-cyan-300 font-medium mt-1">
                    {edu.degree}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{edu.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-4 pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {edu.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
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
