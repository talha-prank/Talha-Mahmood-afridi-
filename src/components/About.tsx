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
          
          {/* Photo & Identity Showcase */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500/30 via-teal-500/20 to-blue-600/30 blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                <img
                  src="/talha_outdoor.jpg"
                  alt="Talha Mahmood Afridi"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/profile.jpg';
                  }}
                  className="w-full h-84 sm:h-96 object-cover object-top transition duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-md mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Talha Mahmood Afridi</span>
                  </div>
                  <h4 className="text-white font-heading font-bold text-base">
                    UET Peshawar &bull; CS Student
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Full-Stack Web Developer &bull; Peshawar, Pakistan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative and Highlights */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                I am a Computer Science student at the prestigious <span className="text-white font-semibold">University of Engineering and Technology (UET), Peshawar</span>, with an intensive focus on web architecture, database design, and systems programming.
              </p>
              <p>
                My coding journey combines foundational computer science principles—Data Structures, Algorithms, Object-Oriented Design—with modern technologies like <span className="text-cyan-300">Next.js, React, Node.js, and MongoDB</span>.
              </p>
              <p>
                Whether structuring MongoDB document schemas, creating responsive user interfaces with Tailwind CSS, or wiring microcontroller circuits, I thrive on turning complex problems into elegant solutions.
              </p>
            </div>

            {/* Core Values */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {[
                "Clean, typed code with TypeScript",
                "Full-Stack API & MongoDB Atlas integration",
                "Performance-first responsive UIs",
                "Proactive communication & collaboration",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* 4 Feature Badges */}
            <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-2.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white text-xs sm:text-sm mb-0.5">Education</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  BS Computer Science at UET Peshawar (2023 - Present)
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-2.5">
                  <Code2 className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white text-xs sm:text-sm mb-0.5">Web Engineering</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Full-Stack Next.js, React, Node.js, &amp; REST APIs
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2.5">
                  <Database className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white text-xs sm:text-sm mb-0.5">Databases</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  MongoDB Atlas, Mongoose, SQL schemas &amp; CRUD logic
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-2.5">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white text-xs sm:text-sm mb-0.5">Location &amp; Remote</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Peshawar, KP, Pakistan — available for remote work globally
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
