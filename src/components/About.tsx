import React from 'react';
import { 
  Code, 
  Cpu, 
  TrendingUp, 
  Search, 
  Database, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  GraduationCap,
  Users
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const INTERESTS = [
  {
    title: "Web Development",
    icon: Code,
    desc: "Crafting modern, accessible, and fast web applications using clean HTML5, modern CSS/Tailwind, JavaScript, and React."
  },
  {
    title: "Artificial Intelligence",
    icon: Cpu,
    desc: "Investigating applied machine learning paradigms, prompt logic, and incorporating intelligent automation into real software."
  },
  {
    title: "Digital Marketing",
    icon: TrendingUp,
    desc: "Understanding digital channel mechanics, audience engagement patterns, brand storytelling, and multi-channel campaigns."
  },
  {
    title: "SEO",
    icon: Search,
    desc: "Technical on-page architecture, Core Web Vitals optimization, semantic structured data, and search engine discoverability."
  },
  {
    title: "Data Management",
    icon: Database,
    desc: "Relational database schema normalization, SQL integrity constraints, accurate high-volume data entry, and record validation."
  },
  {
    title: "Robotics & Hardware",
    icon: Bot,
    desc: "Hands-on microcontroller programming with Arduino, breadboard prototyping, sensor integration, and digital logic gates."
  },
  {
    title: "Creative Technology",
    icon: Sparkles,
    desc: "Blending artistic aesthetics with computational precision, including calligraphy-inspired visual typography and UI craft."
  }
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            01. Background &amp; Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mt-3 leading-relaxed">
            A balanced perspective combining technical computer science rigour with practical digital execution and human communication.
          </p>
        </div>

        {/* Narrative & Context Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Narrative Bio (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
              {/* Identity Header Strip */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400 shrink-0 shadow-md shadow-cyan-900/40">
                  <img
                    src={PERSONAL_INFO.profileImage}
                    alt="Talha Mahmood Afridi"
                    className="w-full h-full object-cover object-[center_15%]"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== PERSONAL_INFO.profileImageRemote) {
                        target.src = PERSONAL_INFO.profileImageRemote;
                      }
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Talha Mahmood Afridi</h4>
                  <p className="text-xs text-cyan-400">BS Computer Science @ UET Peshawar · Peshawar, PK</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white">
                Computer Science at UET Peshawar
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                I am a dedicated Computer Science undergraduate at the <strong className="text-white font-semibold">University of Engineering and Technology (UET), Peshawar</strong>. My academic coursework emphasizes core foundational engineering principles—spanning algorithmic efficiency in C++, Object-Oriented software architectures, discrete mathematics, digital logic design, and relational database systems.
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Rather than limiting my studies to abstract theory, I continually translate computer science fundamentals into practical digital solutions. Over the past several years, I have actively expanded into modern frontend web engineering, search engine optimization, and technology automation.
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Additionally, having served as an educator across five distinct academic and tuition institutions in Peshawar, I possess proven instructional leadership, clear verbal clarity, and the discipline needed to manage complex technical assignments smoothly.
              </p>
            </div>

            {/* Credibility highlights */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-cyan-400 font-mono text-xl font-bold">UET</div>
                <div className="text-xs text-white font-medium mt-1">Peshawar Campus</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Top Engineering Univ.</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-cyan-400 font-mono text-xl font-bold">A+</div>
                <div className="text-xs text-white font-medium mt-1">FSc &amp; Matric</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Academic Record</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-cyan-400 font-mono text-xl font-bold">5+</div>
                <div className="text-xs text-white font-medium mt-1">Teaching Roles</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Leadership &amp; Pedagogy</div>
              </div>
            </div>
          </div>

          {/* Core Areas of Interest (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Primary Areas of Focus
            </h3>

            <div className="space-y-2.5">
              {INTERESTS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={item.title} 
                    className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
