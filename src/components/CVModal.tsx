import React from 'react';
import { X, Download, Printer, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES, EDUCATION, PROJECTS } from '../data/portfolioData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const cvText = `
${PERSONAL_INFO.name.toUpperCase()}
${PERSONAL_INFO.title}
${PERSONAL_INFO.location}
Email: ${PERSONAL_INFO.email} | WhatsApp: ${PERSONAL_INFO.whatsappDisplay}
GitHub: ${PERSONAL_INFO.github}

SUMMARY
${PERSONAL_INFO.bio}

EDUCATION
${EDUCATION.map(e => `${e.degree} - ${e.institution} (${e.period})`).join('\n')}

TECHNICAL SKILLS
${SKILL_CATEGORIES.map(c => `${c.category}: ${c.skills.map(s => s.name).join(', ')}`).join('\n')}

PROJECTS
${PROJECTS.map(p => `- ${p.title} (${p.category}): ${p.shortDesc} [Tech: ${p.techStack.join(', ')}]`).join('\n')}
    `.trim();

    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Talha_Mahmood_Afridi_CV.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">
              Curriculum Vitae / Resume
            </h3>
            <p className="text-xs text-slate-400">
              Talha Mahmood Afridi • UET Peshawar
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Body */}
        <div className="p-8 space-y-6 overflow-y-auto font-sans text-slate-300 text-xs sm:text-sm">
          
          {/* Header section */}
          <div className="border-b border-slate-800 pb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h2>
              <p className="text-sm font-medium text-cyan-400 mt-0.5">
                {PERSONAL_INFO.title}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-400 text-xs mt-2 font-mono">
                <span>{PERSONAL_INFO.location}</span>
                <span>•</span>
                <span>{PERSONAL_INFO.email}</span>
                <span>•</span>
                <span>{PERSONAL_INFO.whatsappDisplay}</span>
              </div>
            </div>

            <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-700 shrink-0 hidden sm:block shadow-md">
              <img
                src={PERSONAL_INFO.profileImage || '/profile.jpg'}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-[center_15%]"
              />
            </div>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
              Education
            </h4>
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-semibold text-white">
                  <span>{edu.institution}</span>
                  <span className="text-slate-400 font-mono text-xs">{edu.period}</span>
                </div>
                <div className="text-cyan-300">{edu.degree}</div>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
              Technical Proficiencies
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {SKILL_CATEGORIES.map((cat, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="font-semibold text-white text-xs mb-1">{cat.category}</div>
                  <div className="text-slate-400 text-xs">
                    {cat.skills.map(s => s.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
              Selected Projects
            </h4>
            <div className="space-y-3">
              {PROJECTS.map((proj, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="flex justify-between font-semibold text-white">
                    <span>{proj.title}</span>
                    <span className="text-cyan-400 font-mono text-[11px]">{proj.category}</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">{proj.shortDesc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {proj.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
