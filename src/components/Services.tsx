import React from 'react';
import { SERVICES_DATA, ServiceItem } from '../data/portfolioData';
import { 
  Code2, 
  Palette, 
  Search, 
  TrendingUp, 
  FileSpreadsheet, 
  Cpu, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  Palette,
  Search,
  TrendingUp,
  FileSpreadsheet,
  Cpu
};

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 lg:py-28 relative bg-[#060a12]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            06. Offerings &amp; Collaboration
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Services &amp; Solutions
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mt-2">
            Professional digital solutions designed for local businesses, international clients, educators, and organizations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Code2;
            return (
              <div
                key={service.id}
                className="glass-card p-6 sm:p-7 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-cyan-950/70 border border-cyan-800/40 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Deliverables List */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                      What's Included
                    </p>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For note */}
                  <div className="mt-4 pt-3 border-t border-slate-800/60">
                    <p className="text-[11px] text-slate-400">
                      <span className="text-slate-300 font-medium">Ideal for: </span>
                      {service.idealFor}
                    </p>
                  </div>
                </div>

                {/* Inquiry Action */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
