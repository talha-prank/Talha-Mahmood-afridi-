import React from 'react';
import { PROJECTS_DATA, ProjectItem } from '../data/portfolioData';
import { ExternalLink, Github, Layers, ArrowUpRight, Sparkles } from 'lucide-react';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  return (
    <section id="projects" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
              05. Selected Works &amp; Engineering Lab
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg text-slate-400 mt-2">
              A curated selection of software applications, web platforms, database systems, and hardware prototypes.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 self-start md:self-auto">
            Showing 6 Technical Projects
          </div>
        </div>

        {/* Project Cards Bento / Masonry Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project, index) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Thumbnail with Fallback */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-center">
                            <span class="text-3xl mb-1">⚡</span>
                            <span class="text-xs font-mono text-cyan-400">${project.category}</span>
                            <h4 class="text-sm font-semibold text-white mt-1">${project.title}</h4>
                          </div>
                        `;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Pill */}
                  <div className="absolute bottom-3 left-3 text-[11px] font-mono text-cyan-300 bg-slate-950/80 backdrop-blur-sm px-2.5 py-0.5 rounded border border-slate-700/60">
                    {project.category}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  <h3 
                    onClick={() => onSelectProject(project)}
                    className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Key Highlights list */}
                  <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-slate-400">
                    {project.highlights.map((h, hIdx) => (
                      <span key={hIdx} className="text-cyan-400/90 font-mono">
                        ✓ {h}
                      </span>
                    ))}
                  </div>

                  {/* Zero-Pill Tech Metadata */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                      {project.technologies.map((tech, idx) => (
                        <React.Fragment key={tech}>
                          <span className="font-mono text-slate-300">{tech}</span>
                          {idx < project.technologies.length - 1 && (
                            <span className="text-slate-600" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Real working modals / controls) */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => onSelectProject(project)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo &amp; Details</span>
                </button>

                <button
                  onClick={() => onSelectProject(project)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors cursor-pointer"
                  title="Inspect Source Code Architecture"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
