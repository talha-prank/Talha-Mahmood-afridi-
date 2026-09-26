import React from 'react';
import { GraduationCap, Code2, Database, Compass, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-950/60 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            01. Background &amp; Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            About Talha Mahmood Afridi
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mt-2">
            Bridging rigorous Computer Science fundamentals with contemporary web engineering.
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              I am a Computer Science student at the prestigious <span className="text-white font-semibold">University of Engineering and Technology (UET), Peshawar</span>, with an intensive focus on web architecture, database design, and systems programming.
            </p>
            <p>
              My coding journey combines foundational computer science principles—Data Structures, Algorithms, Object-Oriented Design—with modern technologies like <span className="text-cyan-300">Next.js, React, Node.js, and MongoDB</span>.
            </p>
            <p>
              Whether structuring MongoDB document schemas, creating responsive user interfaces with Tailwind CSS, or wiring microcontroller circuits, I thrive on turning complex problems into elegant solutions.
            </p>

            {/* Core Values */}
            <div className="grid sm:grid-cols-2 gap-3 pt-3">
              {[
                "Clean, typed code with TypeScript",
                "Full-Stack API & Database integration",
                "Performance-first responsive UIs",
                "Proactive communication & collaboration",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">Education</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                BS Computer Science at UET Peshawar (2023 - Present)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">Web Engineering</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full-Stack Next.js, React, Node.js, &amp; REST APIs
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">Databases</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                MongoDB Atlas, Mongoose, SQL schemas &amp; CRUD logic
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">Location</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Peshawar, KP, Pakistan — available for remote work globally
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
