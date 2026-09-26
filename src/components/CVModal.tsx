import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Award,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_DATA, EXPERIENCE_DATA, SKILLS_DATA } from '../data/portfolioData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Talha Mahmood Afridi
N:Afridi;Talha;Mahmood;;
TITLE:Computer Science Student & Web Developer
ORG:University of Engineering and Technology (UET), Peshawar
TEL;TYPE=CELL,VOICE:+923255691055
EMAIL;TYPE=INTERNET,WORK:${PERSONAL_INFO.email}
ADR;TYPE=HOME:;;Peshawar;Khyber Pakhtunkhwa;;Pakistan
NOTE:Computer Science student, web developer and digital creator from Peshawar, Pakistan.
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Talha_Mahmood_Afridi.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0b1120] text-slate-200 border border-slate-700/60 rounded-2xl shadow-2xl shadow-cyan-950/40 p-6 sm:p-10 no-print-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800 no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded">
              CURRICULUM VITAE · OFFICIAL
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 cursor-pointer"
              title="Print CV or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={handleDownloadVCard}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 cursor-pointer"
              title="Save Contact to Phone"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Save Contact (.vcf)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close CV modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="space-y-8 print:text-black print:bg-white print:p-0">
          {/* Header */}
          <div className="border-b border-slate-800/80 pb-6 print:border-black flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white print:text-black">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-cyan-400 font-medium text-sm sm:text-base mt-1 print:text-slate-800">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5 print:text-slate-600">
                {PERSONAL_INFO.institution}
              </p>

              {/* Contact metadata strip */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-400 mt-4 print:text-black">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
                  {PERSONAL_INFO.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
                  <a href={PERSONAL_INFO.socials.phone} className="hover:text-cyan-300">
                    {PERSONAL_INFO.formattedPhone}
                  </a>
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
                  <a href={PERSONAL_INFO.socials.email} className="hover:text-cyan-300">
                    {PERSONAL_INFO.email}
                  </a>
                </span>
              </div>
            </div>

            {/* Profile Avatar in CV Header */}
            <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border-2 border-slate-700 print:border-black shrink-0 shadow-md">
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
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-sm font-semibold tracking-wider uppercase text-cyan-400 mb-2 print:text-black flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Professional Profile
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed print:text-slate-900">
              Passionate Computer Science undergraduate at UET Peshawar with demonstrated expertise in frontend web development, core programming (C++, OOP), relational databases, search engine optimization, and teaching. Proven ability to translate theoretical computer science concepts into responsive web interfaces and functional software, paired with exceptional interpersonal and instructional leadership honed through over 4 years of classroom teaching experience.
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm font-semibold tracking-wider uppercase text-cyan-400 mb-3 print:text-black flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Education
            </h2>
            <div className="space-y-4">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.id} className="border-l-2 border-cyan-500/40 pl-4 print:border-black">
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <h3 className="text-sm font-semibold text-white print:text-black">
                      {edu.degree}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400 print:text-slate-700">
                      {edu.period} · {edu.grade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 print:text-slate-800">
                    {edu.institution}, {edu.location}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-slate-400 flex items-start gap-1.5 print:text-slate-700">
                        <span className="text-cyan-400 mt-0.5 print:text-black">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-sm font-semibold tracking-wider uppercase text-cyan-400 mb-3 print:text-black flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Teaching &amp; Professional Experience
            </h2>
            <div className="space-y-4">
              {EXPERIENCE_DATA.map((exp) => (
                <div key={exp.id} className="border-l-2 border-slate-700 pl-4 print:border-black">
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <h3 className="text-sm font-semibold text-white print:text-black">
                      {exp.role} — {exp.institution}
                    </h3>
                    <span className="text-xs font-mono text-slate-400 print:text-slate-700">
                      {exp.period} {exp.duration ? `(${exp.duration})` : ''} · {exp.location}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 print:text-slate-800">
                    {exp.description}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="text-xs text-slate-400 flex items-start gap-1.5 print:text-slate-700">
                        <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0 mt-0.5 print:text-black" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills & Competencies */}
          <div>
            <h2 className="text-sm font-semibold tracking-wider uppercase text-cyan-400 mb-3 print:text-black flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Skills &amp; Technical Competencies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              {SKILLS_DATA.map((skill) => (
                <div key={skill.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-white">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white print:text-black">{skill.name}</span>
                    <span className="text-[11px] font-mono text-cyan-400 print:text-slate-600">{skill.level}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 truncate print:text-slate-600">
                    {skill.experience}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Notable Strengths */}
          <div className="border-t border-slate-800/80 pt-4 print:border-black">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-cyan-400 mb-2 print:text-black flex items-center gap-2">
              <Award className="w-4 h-4" />
              Key Strengths &amp; Additional Focus
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-300 print:text-slate-800">
              <span>· Board Exam Preparation &amp; Academic Tutoring</span>
              <span>· Artistic Penmanship &amp; Calligraphy Instruction</span>
              <span>· Digital Marketing &amp; SEO Growth Tactics</span>
              <span>· Accurate High-Speed Data Management</span>
              <span>· Hardware Logic &amp; Arduino Circuit Integration</span>
            </div>
          </div>
        </div>

        {/* Bottom Close Button */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end no-print">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-700"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
