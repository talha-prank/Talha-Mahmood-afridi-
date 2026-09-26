import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Code2, Sparkles } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectService?: (serviceId: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0b1120] text-slate-200 border border-slate-700/60 rounded-2xl shadow-2xl shadow-cyan-950/40 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer z-10"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Container with Fallback */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 mb-6">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Graceful CSS fallback container
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-center">
                    <span class="text-3xl mb-2">⚡</span>
                    <h4 class="text-base font-semibold text-white">${project.title}</h4>
                    <p class="text-xs text-slate-400 mt-1">${project.category}</p>
                  </div>
                `;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 text-xs font-mono text-cyan-300 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded border border-slate-700/60">
            {project.category}
          </div>
        </div>

        {/* Title and Short Description */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            {project.title}
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Key Implementation Features
          </h3>
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {project.features.map((feature, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">›</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture & Tech Details */}
        {project.architecture && (
          <div className="mb-6 bg-slate-900/30 p-4 rounded-xl border border-slate-800/80">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              Technical Architecture &amp; Methodology
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {project.architecture}
            </p>
          </div>
        )}

        {/* Technologies Used (Zero-Pill discipline: unboxed clean metadata) */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-cyan-400" />
            Technologies &amp; Libraries
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            {project.technologies.map((tech, idx) => (
              <React.Fragment key={tech}>
                <span className="font-mono text-cyan-300">{tech}</span>
                {idx < project.technologies.length - 1 && (
                  <span className="text-slate-600" aria-hidden="true">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Discuss Similar Project</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert(`Repository Architecture: ${project.title}\n\nKey Modules:\n- Main Controller / Logic\n- Schema & Database Connector\n- Responsive View Layer\n\nGitHub repo link initialized: ${project.githubUrl}`);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Inspect Source</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
