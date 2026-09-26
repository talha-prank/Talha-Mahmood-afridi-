import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Github, Mail, Phone, Heart, Shield } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-center md:text-left">
            <p className="font-heading font-bold text-white text-base">
              Talha Mahmood Afridi
            </p>
            <p className="text-slate-400 mt-1">
              Computer Science Student • UET Peshawar, Pakistan
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-cyan-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/923255691055"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 transition-colors"
              aria-label="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer ml-2"
                title="Admin Database Console"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin (admin123)</span>
              </button>
            )}
          </div>

          <div className="text-center md:text-right text-slate-500 font-mono text-[11px]">
            &copy; {new Date().getFullYear()} Talha Mahmood Afridi. Built with React, Next.js &amp; MongoDB.
          </div>

        </div>
      </div>
    </footer>
  );
};
