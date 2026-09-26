import React from 'react';
import { ArrowDown, Mail, FileText, Sparkles, MapPin, GraduationCap, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenCV: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCV }) => {
  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:py-32 overflow-hidden"
    >
      {/* Subtle Background Glows (Anti-slop: disciplined, non-intrusive) */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none -z-10"
      />
      <div 
        aria-hidden="true" 
        className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[110px] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status metadata ticker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Web Projects &amp; Digital Solutions</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-cyan-400">Peshawar, PK</span>
            </div>

            {/* Main Headings */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Talha Mahmood Afridi</span>
              </h1>
              <p className="text-lg sm:text-2xl font-semibold text-slate-300 tracking-tight">
                Computer Science Student &amp; Digital Creator
              </p>
            </div>

            {/* Introduction paragraph */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              I’m a passionate Computer Science student and digital creator focused on building modern websites, digital solutions and creative technology projects.
            </p>

            {/* Claim-to-Proof Adjacency Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span>BS Computer Science @ UET Peshawar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Peshawar, Pakistan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>5+ Teaching &amp; Mentorship Roles</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="#dashboard"
                className="px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl transition-all shadow-lg shadow-cyan-900/40 flex items-center gap-2 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                <span>Executive Dashboard</span>
              </a>

              <a
                href="#projects"
                className="px-5 py-3 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 text-cyan-400" />
              </a>

              <a
                href="#contact"
                className="px-5 py-3 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </a>

              <button
                onClick={onOpenCV}
                className="px-4 py-3 text-sm font-semibold text-slate-300 hover:text-cyan-300 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>CV</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Portrait Frame (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-72 h-88 sm:w-80 sm:h-96 md:w-88 md:h-[420px]">
              {/* Outer Glowing Cyber Ring */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-cyan-500/50 via-blue-600/40 to-pink-500/30 blur-xl opacity-80 group-hover:opacity-100 transition duration-700 animate-pulse-subtle" />

              {/* Main Container */}
              <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border-2 border-slate-700/80 shadow-2xl group">
                <img
                  src={PERSONAL_INFO.profileImage}
                  alt="Talha Mahmood Afridi"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== PERSONAL_INFO.profileImageRemote) {
                      target.src = PERSONAL_INFO.profileImageRemote;
                    }
                  }}
                />

                {/* Top Corner Live Status Badge */}
                <div className="absolute top-3.5 right-3.5 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-[11px] font-mono text-emerald-400 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ONLINE · DEV</span>
                  </div>
                </div>

                {/* Glass bottom badge */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white tracking-tight">Talha Mahmood Afridi</p>
                    <p className="text-[11px] text-cyan-400 font-medium">BSCS @ UET Peshawar</p>
                  </div>
                  <a
                    href="#dashboard"
                    className="text-[11px] font-mono text-cyan-300 hover:text-white bg-cyan-950/90 hover:bg-cyan-900 px-2.5 py-1 rounded-lg border border-cyan-800 transition-colors"
                  >
                    Open Console →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
