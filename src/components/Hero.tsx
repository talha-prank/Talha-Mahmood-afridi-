import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Phone, MapPin, Sparkles, Camera, RotateCcw } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenCV?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCV }) => {
  const [avatarUrl, setAvatarUrl] = useState<string>('/profile.jpg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('talha_user_avatar_custom');
      if (saved) setAvatarUrl(saved);
    } catch {
      // fallback
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setAvatarUrl(result);
          try {
            localStorage.setItem('talha_user_avatar_custom', result);
          } catch {
            // storage quota
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetAvatar = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem('talha_user_avatar_custom');
    } catch {
      // ignore
    }
    setAvatarUrl('/profile.jpg');
  };
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

          {/* Right Column: High-Impact Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Ambient Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-teal-400/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-700" />

              <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800/90 p-6 shadow-2xl backdrop-blur-xl space-y-6">
                
                {/* Header: Profile & Status */}
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800/80">
                  <div className="flex items-center gap-3.5">
                    {/* Visual Photo Avatar with Pulse and Upload overlay */}
                    <div className="relative group/avatar">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[2px] shadow-lg shadow-cyan-500/25 overflow-hidden">
                        <img
                          src={avatarUrl}
                          alt="Talha Mahmood Afridi"
                          onError={(e) => {
                            // Fallback to placeholder if broken
                            (e.currentTarget as HTMLImageElement).src = '/profile.jpg';
                          }}
                          className="w-full h-full object-cover object-[center_15%] rounded-[14px] bg-slate-950 transition-transform duration-300 group-hover/avatar:scale-105"
                        />
                      </div>

                      {/* Active Online Pulse Indicator */}
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 pointer-events-none">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950" />
                      </span>

                      {/* Hover Camera Overlay to Change Photo */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        title="Change / Upload Your Picture"
                        className="absolute inset-0 rounded-2xl bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-cyan-300 opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer text-[10px] font-mono"
                      >
                        <Camera className="w-5 h-5 mb-0.5" />
                        <span>Upload</span>
                      </button>

                      {/* Hidden File Input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-white text-base sm:text-lg">
                          Talha Mahmood Afridi
                        </h3>
                      </div>
                      <p className="text-xs text-cyan-400 font-medium">
                        CS Student &bull; UET Peshawar
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>Peshawar, KP, Pakistan</span>
                        </p>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                        >
                          Change photo
                        </button>
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 whitespace-nowrap">
                    Active
                  </span>
                </div>

                {/* Key Metrics / Highlights */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
                    <div className="text-cyan-400 font-heading font-bold text-base sm:text-lg">UET</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Peshawar</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
                    <div className="text-emerald-400 font-heading font-bold text-base sm:text-lg">Full-Stack</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Specialist</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
                    <div className="text-blue-400 font-heading font-bold text-base sm:text-lg">MongoDB</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Atlas Ready</div>
                  </div>
                </div>

                {/* Stack Pills */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span className="uppercase tracking-wider">Core Technologies</span>
                    <span className="text-cyan-400">Production Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: 'Next.js', color: 'from-slate-800 to-slate-900 text-white' },
                      { name: 'React 19', color: 'from-cyan-950/60 to-slate-900 text-cyan-300' },
                      { name: 'TypeScript', color: 'from-blue-950/60 to-slate-900 text-blue-300' },
                      { name: 'Node.js', color: 'from-emerald-950/60 to-slate-900 text-emerald-300' },
                      { name: 'MongoDB Atlas', color: 'from-emerald-950/80 to-slate-900 text-emerald-400 font-semibold' },
                      { name: 'Tailwind CSS', color: 'from-cyan-950/60 to-slate-900 text-cyan-300' },
                      { name: 'C++ / OOP', color: 'from-purple-950/60 to-slate-900 text-purple-300' },
                      { name: 'REST APIs', color: 'from-slate-800 to-slate-900 text-slate-200' },
                    ].map((item, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono bg-gradient-to-r ${item.color} border border-slate-800/90 shadow-sm`}
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Live System Status */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-slate-300 font-medium">Database: MongoDB Atlas Connected</span>
                  </div>
                  <a
                    href="#contact"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group/btn"
                  >
                    <span>Connect</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
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
