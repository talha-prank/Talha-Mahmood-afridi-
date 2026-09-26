import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenCV?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCV }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/15 to-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Intro */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-slate-300">
                Available for Projects &amp; Software Roles
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white tracking-tight leading-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Talha Mahmood Afridi</span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-slate-300">
                Computer Science Student &amp; Full-Stack Web Developer
              </p>
            </div>

            {/* University & Location Badge */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Peshawar, Pakistan</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-mono font-bold">UET</span>
                <span>University of Engineering &amp; Technology</span>
              </div>
            </div>

            {/* Short Narrative */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              Crafting modern, reliable web applications and exploring efficient algorithms, scalable database systems, and interactive digital experiences.
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center gap-2 group"
              >
                <span>Let's Discuss a Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {onOpenCV && (
                <button
                  onClick={onOpenCV}
                  className="px-5 py-3 rounded-xl font-medium text-sm border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download CV / Resume</span>
                </button>
              )}
            </div>

            {/* Social Links */}
            <div className="pt-4 flex items-center gap-4 text-slate-400">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/923255691055`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Code Card & Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span>talha_profile.ts</span>
                <span className="text-[10px] text-cyan-400">v2.0</span>
              </div>

              {/* Code Snippet */}
              <pre className="pt-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
<code>{`const developer = {
  name: "Talha Mahmood Afridi",
  role: "CS Student & Developer",
  university: "UET Peshawar",
  location: "Peshawar, Pakistan",
  techStack: [
    "Next.js", "React", "TypeScript",
    "Node.js", "MongoDB", "Tailwind"
  ],
  interests: [
    "Full-Stack Web Development",
    "Database Architecture",
    "Embedded Hardware"
  ],
  contact: {
    email: "talhamahmood1055@gmail.com",
    phone: "+92 325 5691055"
  },
  status: "Ready for hire"
};`}</code>
              </pre>

              {/* Bottom Quick Feature Tag */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Modern Stack</span>
                </div>
                <span className="text-slate-500">MongoDB Atlas Ready</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
