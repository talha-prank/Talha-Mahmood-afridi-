import React from 'react';
import { 
  ArrowUp, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenCV: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCV, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05080f] border-t border-slate-800 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand & Summary (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <a 
              href="#home" 
              className="text-base font-bold text-white tracking-tight flex items-center gap-2 font-heading"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Talha Mahmood Afridi</span>
            </a>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Computer Science student at University of Engineering and Technology (UET) Peshawar, web developer, and digital creator building modern digital solutions.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={PERSONAL_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 transition-colors border border-slate-800"
                aria-label="WhatsApp"
                title="WhatsApp Direct"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.email}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors border border-slate-800"
                aria-label="Email"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.phone}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors border border-slate-800"
                aria-label="Phone"
                title="Call Directly"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  alert(`GitHub Profile: ${PERSONAL_INFO.socials.githubPlaceholder}\n\nAll open-source repositories and experimental labs by Talha Mahmood Afridi.`);
                }}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors border border-slate-800 cursor-pointer"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  alert(`LinkedIn Profile: ${PERSONAL_INFO.socials.linkedinPlaceholder}\n\nProfessional network and academic profile for Talha Mahmood Afridi.`);
                }}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors border border-slate-800 cursor-pointer"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Navigation (4 cols) */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 pt-1">
              <a href="#home" className="hover:text-cyan-300 transition-colors">Home</a>
              <a href="#dashboard" className="text-cyan-400 font-medium hover:text-white transition-colors">Dashboard</a>
              <a href="#about" className="hover:text-cyan-300 transition-colors">About</a>
              <a href="#skills" className="hover:text-cyan-300 transition-colors">Skills</a>
              <a href="#education" className="hover:text-cyan-300 transition-colors">Education</a>
              <a href="#experience" className="hover:text-cyan-300 transition-colors">Experience</a>
              <a href="#projects" className="hover:text-cyan-300 transition-colors">Projects</a>
              <a href="#services" className="hover:text-cyan-300 transition-colors">Services</a>
              <a href="#contact" className="hover:text-cyan-300 transition-colors">Contact</a>
            </div>
          </div>

          {/* Quick Actions (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Direct Inquiries
            </h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Peshawar, Pakistan</span>
              </p>
              <p className="flex items-center gap-1.5 font-mono">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <a href={PERSONAL_INFO.socials.phone} className="hover:text-cyan-300">
                  {PERSONAL_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-1.5 font-mono break-all">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href={PERSONAL_INFO.socials.email} className="hover:text-cyan-300">
                  {PERSONAL_INFO.email}
                </a>
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenCV}
                className="w-full text-center py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 font-medium transition-colors cursor-pointer text-xs"
              >
                Download / View CV
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Talha Mahmood Afridi. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>UET Peshawar · Computer Science</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-slate-400 hover:text-cyan-400 font-mono transition-colors cursor-pointer"
              >
                Admin (admin123)
              </button>
            )}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
