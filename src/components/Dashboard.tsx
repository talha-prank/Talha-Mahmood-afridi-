import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Terminal, 
  Cpu, 
  Award, 
  Calculator, 
  CheckCircle2, 
  Clock, 
  Code2, 
  Database, 
  Download, 
  ExternalLink, 
  Globe, 
  GraduationCap, 
  Layers, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Send, 
  Sparkles, 
  TrendingUp, 
  Zap,
  ChevronRight,
  RefreshCw,
  FolderGit2,
  Sliders,
  Check
} from 'lucide-react';
import { PERSONAL_INFO, SKILLS_DATA, EDUCATION_DATA, EXPERIENCE_DATA, PROJECTS_DATA } from '../data/portfolioData';

interface DashboardProps {
  onOpenCV: () => void;
  onSelectService: (serviceTitle: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onOpenCV, onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'terminal' | 'radar' | 'academic' | 'estimator'>('metrics');
  
  // Real-time Pakistan Time clock
  const [currentTime, setCurrentTime] = useState<string>('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format in Asia/Karachi (PKT: UTC+5)
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Karachi',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Terminal state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ type: 'input' | 'output' | 'system'; text: string; link?: string }>>([
    { type: 'system', text: 'Talha Mahmood Afridi — Developer Console v2.6.4 [Peshawar Node]' },
    { type: 'system', text: 'Type "help" or click one of the quick command buttons below.' },
    { type: 'output', text: 'Identity verified: BS Computer Science @ UET Peshawar | Web Developer & Digital Creator' }
  ]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...terminalHistory, { type: 'input' as const, text: `$ ${cmd}` }];

    switch (trimmed) {
      case 'help':
        newHistory.push(
          { type: 'output', text: 'Available Commands:' },
          { type: 'output', text: '  about        : Display Talha\'s background & philosophy' },
          { type: 'output', text: '  education    : Print UET Peshawar and academic achievements' },
          { type: 'output', text: '  skills       : Audit top technical & practical capabilities' },
          { type: 'output', text: '  projects     : List deployed web & software solutions' },
          { type: 'output', text: '  experience   : View teaching timeline (5 institutions)' },
          { type: 'output', text: '  contact      : Display direct phone, WhatsApp & email' },
          { type: 'output', text: '  ping         : Check Peshawar connection latency' },
          { type: 'output', text: '  clear        : Reset terminal screen' }
        );
        break;
      case 'about':
        newHistory.push(
          { type: 'output', text: `Name: ${PERSONAL_INFO.name}` },
          { type: 'output', text: `Tagline: ${PERSONAL_INFO.title}` },
          { type: 'output', text: `Institution: ${PERSONAL_INFO.institution}` },
          { type: 'output', text: `Summary: ${PERSONAL_INFO.bio}` }
        );
        break;
      case 'education':
        newHistory.push(
          { type: 'output', text: '1. BS Computer Science — UET Peshawar (Currently Studying)' },
          { type: 'output', text: '2. FSc Intermediate — Muslim Education Complex (Grade A+)' },
          { type: 'output', text: '3. Matriculation — Muslim College (Grade A+)' }
        );
        break;
      case 'skills':
        newHistory.push(
          { type: 'output', text: 'Web: HTML5 (95%), CSS3/Tailwind (90%), JavaScript/React (88%)' },
          { type: 'output', text: 'Core CS: C++ (85%), OOP (88%), Database/SQL (84%), AI & Robotics (80%)' },
          { type: 'output', text: 'Growth: SEO (86%), Digital Marketing (82%), Data Entry (95%)' },
          { type: 'output', text: 'Human: Instructional Leadership (92%), Calligraphy (90%)' }
        );
        break;
      case 'projects':
        newHistory.push(
          { type: 'output', text: 'Deployed Lab Solutions:' },
          { type: 'output', text: '  [1] Personal Portfolio Website (React + Tailwind + TypeScript)' },
          { type: 'output', text: '  [2] Library Management System (C++ / SQL relational schema)' },
          { type: 'output', text: '  [3] E-Commerce Online Store (Modern Cart & Checkout)' },
          { type: 'output', text: '  [4] Digital Logic Arduino Project (Microcontroller hardware & logic gates)' },
          { type: 'output', text: '  [5] Database Management Project (Normalized 3NF schema)' },
          { type: 'output', text: '  [6] AI & Technology Solution (Applied AI workflow)' }
        );
        break;
      case 'experience':
        newHistory.push(
          { type: 'output', text: 'Teaching & Mentorship Appointments:' },
          { type: 'output', text: '  • 2025: Happy Day School — Academic Teacher' },
          { type: 'output', text: '  • 2024: Allied School Gulberg Campus — Secondary Board Teacher' },
          { type: 'output', text: '  • 2022: United English Language Centre — Instructor & Calligraphy' },
          { type: 'output', text: '  • 2020: Muslim College — Teacher (Classes 7-8)' },
          { type: 'output', text: '  • 6 Mos: Iqra Tuition Center — Board Academic Support' }
        );
        break;
      case 'contact':
        newHistory.push(
          { type: 'output', text: `Phone: ${PERSONAL_INFO.phone}` },
          { type: 'output', text: `Email: ${PERSONAL_INFO.email}` },
          { type: 'output', text: `Location: ${PERSONAL_INFO.location}` },
          { type: 'output', text: 'WhatsApp direct: https://wa.me/923255691055' }
        );
        break;
      case 'ping':
        newHistory.push(
          { type: 'output', text: '64 bytes from peshawar.uet.pk (103.255.4.1): icmp_seq=1 ttl=56 time=18.4 ms' },
          { type: 'output', text: 'Status: 0% packet loss. Excellent connectivity.' }
        );
        break;
      case 'clear':
        setTerminalHistory([
          { type: 'system', text: 'Talha Mahmood Afridi — Developer Console [Cleared]' }
        ]);
        setTerminalInput('');
        return;
      default:
        newHistory.push(
          { type: 'output', text: `bash: command not found: ${trimmed}. Type "help" for a list of valid commands.` }
        );
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(terminalInput);
  };

  // Estimator State
  const [projectType, setProjectType] = useState<'landing' | 'webapp' | 'ecommerce' | 'seo' | 'data'>('webapp');
  const [timelineOption, setTimelineOption] = useState<'standard' | 'express'>('standard');
  const [featuresSelected, setFeaturesSelected] = useState<string[]>(['responsive', 'seo']);

  const toggleFeature = (featId: string) => {
    setFeaturesSelected(prev => 
      prev.includes(featId) ? prev.filter(f => f !== featId) : [...prev, featId]
    );
  };

  const getEstimatedDuration = () => {
    if (timelineOption === 'express') return '1 – 2 Weeks (Fast-track)';
    if (projectType === 'landing' || projectType === 'seo') return '1 – 3 Weeks';
    return '3 – 4 Weeks';
  };

  const handleDispatchEstimate = () => {
    const typeLabel = {
      landing: 'Custom Business / Portfolio Website',
      webapp: 'Full-stack / Interactive Web App',
      ecommerce: 'Modern E-Commerce Storefront',
      seo: 'SEO Audit & Optimization',
      data: 'Structured Data Management & Entry'
    }[projectType];

    const message = encodeURIComponent(
      `Hello Talha,\n\nI used your Portfolio Dashboard Estimator:\n• Scope: ${typeLabel}\n• Timeline: ${getEstimatedDuration()}\n• Features: ${featuresSelected.join(', ')}\n\nI would like to discuss this project with you.`
    );
    window.open(`https://wa.me/923255691055?text=${message}`, '_blank');
  };

  return (
    <section id="dashboard" className="py-20 lg:py-28 relative bg-[#070b14]/70 border-y border-slate-800/80">
      {/* Background cyber grid accents */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-xs font-mono text-cyan-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>LIVE DEVELOPER &amp; CREATOR CONSOLE</span>
              <span className="text-slate-600">·</span>
              <span>2026 EDITION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-heading">
              Executive Developer Dashboard
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              An interactive diagnostic dashboard showcasing Talha Mahmood Afridi's technical performance, live metrics, verified academic milestones at UET Peshawar, and project sandbox.
            </p>
          </div>

          {/* Quick System Telemetry pill */}
          <div className="flex flex-wrap items-center gap-3 p-2 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 self-start md:self-auto">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>ONLINE</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>PST (UTC+5): {currentTime || 'Loading...'}</span>
            </div>
          </div>
        </div>

        {/* Master Identity Card with Talha's Real Photo */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-700/80 mb-8 relative overflow-hidden shadow-2xl">
          {/* Subtle gradient corner glow */}
          <div 
            aria-hidden="true" 
            className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-gradient-to-bl from-cyan-500/20 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" 
          />

          <div className="grid md:grid-cols-12 gap-6 items-center">
            {/* Real Photo Avatar & Status Frame */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative group">
                {/* Aura border */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 blur opacity-75 group-hover:opacity-100 transition duration-500" />
                
                {/* Image Container with precise crop for stylish sunglasses & pink shirt */}
                <div className="relative w-36 h-44 sm:w-40 sm:h-48 rounded-xl overflow-hidden bg-slate-900 border-2 border-slate-600 shadow-xl">
                  <img
                    src={PERSONAL_INFO.profileImage}
                    alt="Talha Mahmood Afridi"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[center_15%] transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback to remote hosted URL
                      const target = e.currentTarget;
                      if (target.src !== PERSONAL_INFO.profileImageRemote) {
                        target.src = PERSONAL_INFO.profileImageRemote;
                      }
                    }}
                  />
                  {/* Status Overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-2 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-300 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ACTIVE DEVELOPER
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Profile Bio & Key Credentials */}
            <div className="md:col-span-8 lg:col-span-9 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <span>{PERSONAL_INFO.name}</span>
                    <span className="text-xs font-mono font-normal text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-2.5 py-0.5 rounded">
                      VERIFIED ENGINEER
                    </span>
                  </h3>
                  <p className="text-sm font-medium text-cyan-400 mt-0.5">
                    {PERSONAL_INFO.title}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenCV}
                    className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Download CV</span>
                  </button>
                  <a
                    href={PERSONAL_INFO.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-900/40"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Computer Science undergraduate at <strong className="text-white">UET Peshawar</strong> specializing in modern web development, algorithms (C++), relational database systems, and practical digital automation. Experienced educator with 4+ years of classroom teaching and board exam mentorship across Peshawar.
              </p>

              {/* Quick High-Impact Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Education</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">UET Peshawar</div>
                  <div className="text-[10px] text-cyan-400">BS Computer Science</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Teaching Experience</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">5 Institutions</div>
                  <div className="text-[10px] text-emerald-400">1,400+ Hours Taught</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Lab Projects</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">6 Deployed</div>
                  <div className="text-[10px] text-cyan-400">Web, C++, DBMS, Arduino</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Location &amp; Avail.</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">Peshawar, PK</div>
                  <div className="text-[10px] text-emerald-400">Open for Work</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Interactive View Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'metrics'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Metrics &amp; Code Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'terminal'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Interactive Terminal &amp; Console</span>
          </button>

          <button
            onClick={() => setActiveTab('radar')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'radar'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Tech Radar &amp; Mastery Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('academic')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'academic'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Academic &amp; Pedagogy Ledger</span>
          </button>

          <button
            onClick={() => setActiveTab('estimator')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'estimator'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Project Scope &amp; Quote Estimator</span>
          </button>
        </div>

        {/* TAB 1: METRICS & CODE ANALYTICS */}
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            {/* Top Gauges Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Gauge 1: Web & Frontend */}
              <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Frontend Engineering</span>
                    <Globe className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">92.5%</div>
                  <p className="text-[11px] text-slate-400 mt-1">HTML5, Tailwind, Modern JS &amp; React</p>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full" style={{ width: '92.5%' }} />
                </div>
              </div>

              {/* Gauge 2: Core CS & C++ */}
              <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Algorithms &amp; C++</span>
                    <Cpu className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">88.0%</div>
                  <p className="text-[11px] text-slate-400 mt-1">OOP, Data Structures, Logic at UET</p>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              {/* Gauge 3: Database & SQL */}
              <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Database Systems</span>
                    <Database className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">85.0%</div>
                  <p className="text-[11px] text-slate-400 mt-1">Relational 3NF, SQL Queries &amp; Integrity</p>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Gauge 4: SEO & Growth */}
              <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>SEO &amp; Data Entry</span>
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">90.5%</div>
                  <p className="text-[11px] text-slate-400 mt-1">Technical SEO, Core Web Vitals, Accuracy</p>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full" style={{ width: '90.5%' }} />
                </div>
              </div>
            </div>

            {/* Developer Activity Grid (Simulated commit / engineering activity log) */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-cyan-400" />
                    <span>UET Peshawar &amp; Independent Engineering Activity Ledger</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Consistent development, algorithm lab practice, and project code contributions.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span>Less</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-slate-800" />
                    <span className="w-2.5 h-2.5 rounded bg-cyan-950" />
                    <span className="w-2.5 h-2.5 rounded bg-cyan-800" />
                    <span className="w-2.5 h-2.5 rounded bg-cyan-600" />
                    <span className="w-2.5 h-2.5 rounded bg-cyan-400" />
                  </div>
                  <span>More</span>
                </div>
              </div>

              {/* Heatmap Matrix Display */}
              <div className="grid grid-cols-12 sm:grid-cols-24 gap-1.5 pt-2 overflow-x-auto">
                {Array.from({ length: 48 }).map((_, i) => {
                  const level = (i * 7 + 3) % 5;
                  const bgClass = [
                    'bg-slate-800/80',
                    'bg-cyan-950/80 border border-cyan-900',
                    'bg-cyan-800/70',
                    'bg-cyan-600/90',
                    'bg-cyan-400'
                  ][level];

                  return (
                    <div
                      key={i}
                      title={`Week ${i + 1}: ${level * 4 + 2} code commits / lab submissions`}
                      className={`h-4 rounded-sm ${bgClass} transition-transform hover:scale-125 cursor-pointer`}
                    />
                  );
                })}
              </div>

              {/* Telemetry bottom bar */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 grid sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Architecture: Modern React 19 + TypeScript</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Deployment: High-speed edge CDN</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Security: Zero runtime errors / Strict validation</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE PROJECT TERMINAL */}
        {activeTab === 'terminal' && (
          <div className="glass-panel rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
            {/* Terminal Window Chrome */}
            <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">
                  talha@uet-peshawar:~ (interactive console)
                </span>
              </div>
              <button
                onClick={() => executeCommand('clear')}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>clear</span>
              </button>
            </div>

            {/* Terminal Log Screen */}
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-2 max-h-80 overflow-y-auto bg-[#050811]">
              {terminalHistory.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    item.type === 'input'
                      ? 'text-cyan-300 font-semibold'
                      : item.type === 'system'
                      ? 'text-slate-500'
                      : 'text-slate-300'
                  }`}
                >
                  {item.text}
                </div>
              ))}
            </div>

            {/* Quick Command Chips */}
            <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs font-mono">
              <span className="text-slate-500 text-[11px]">Presets:</span>
              {['help', 'about', 'education', 'skills', 'projects', 'experience', 'contact', 'ping'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  className="px-2 py-0.5 rounded bg-slate-900 hover:bg-cyan-950 text-cyan-400 border border-slate-800 hover:border-cyan-700 transition-colors cursor-pointer text-[11px]"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Command Input Prompt */}
            <form onSubmit={handleTerminalSubmit} className="p-3 bg-slate-900/60 border-t border-slate-800 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm pl-2">talha@uet:~$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type command ('help', 'projects', 'contact') and press Enter..."
                className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-white placeholder-slate-500"
              />
              <button
                type="submit"
                className="px-3 py-1 text-xs font-mono font-medium text-cyan-400 hover:text-white bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800 rounded transition-colors cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: TECH RADAR & MASTERY MATRIX */}
        {activeTab === 'radar' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Core Software & Web */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 uppercase font-mono text-cyan-400">
                <Code2 className="w-4 h-4" />
                <span>Web &amp; Software Engineering</span>
              </h4>
              <div className="space-y-3">
                {SKILLS_DATA.filter(s => s.category === 'web' || s.category === 'core').map(skill => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-white">{skill.name}</span>
                      <span className="font-mono text-cyan-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${skill.level}%` }} 
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">{skill.experience}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth, Data & Creative */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 uppercase font-mono text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>Growth, Data &amp; Human Leadership</span>
              </h4>
              <div className="space-y-3">
                {SKILLS_DATA.filter(s => s.category === 'growth' || s.category === 'creative').map(skill => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-white">{skill.name}</span>
                      <span className="font-mono text-cyan-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${skill.level}%` }} 
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">{skill.experience}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ACADEMIC & PEDAGOGY LEDGER */}
        {activeTab === 'academic' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* UET Peshawar Deep Dive */}
              <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                  <GraduationCap className="w-4 h-4" />
                  <span>ACADEMIC RECORD</span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  University of Engineering and Technology (UET), Peshawar
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Currently pursuing Bachelor of Science in Computer Science. Coursework emphasizes computational algorithms, discrete logic structures, object-oriented software engineering, relational database normalization, and microcontroller electronics.
                </p>
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Prior Distinctions</div>
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-200">FSc / Intermediate — Muslim Education Complex</span>
                    <span className="font-mono text-emerald-400 font-bold">Grade A+</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-200">Matriculation — Muslim College Peshawar</span>
                    <span className="font-mono text-emerald-400 font-bold">Grade A+</span>
                  </div>
                </div>
              </div>

              {/* Teaching Impact */}
              <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                  <Award className="w-4 h-4" />
                  <span>INSTRUCTIONAL APPOINTMENTS</span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  5 Academic &amp; Language Institutions in Peshawar
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Over 4 years of classroom teaching experience fostering conceptual understanding, board exam results, public speaking confidence, and penmanship calligraphy.
                </p>
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                  {EXPERIENCE_DATA.map((exp) => (
                    <div key={exp.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div>
                        <span className="font-semibold text-white">{exp.institution}</span>
                        <span className="text-slate-400 text-[11px] block">{exp.role}</span>
                      </div>
                      <span className="font-mono text-cyan-400 text-[11px]">{exp.period}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SCOPE & ESTIMATOR */}
        {activeTab === 'estimator' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
            <div className="max-w-2xl mb-6">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan-400" />
                <span>Interactive Project Scope &amp; Timeline Estimator</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Select your required project parameters to generate a clear milestone blueprint and directly initiate inquiry via WhatsApp or the contact form.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-start">
              {/* Step 1: Project Type */}
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase text-cyan-400">
                  1. Project Objective
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'webapp', title: 'Interactive Web App / Dashboard' },
                    { id: 'landing', title: 'Business Website & Portfolio' },
                    { id: 'ecommerce', title: 'E-Commerce Online Storefront' },
                    { id: 'seo', title: 'Technical SEO & Audit' },
                    { id: 'data', title: 'Data Management & Entry' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setProjectType(item.id as any)}
                      className={`w-full text-left p-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                        projectType === item.id
                          ? 'bg-cyan-950/80 border-cyan-500 text-white font-semibold'
                          : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Included Capabilities */}
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase text-cyan-400">
                  2. Capabilities &amp; Add-ons
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'responsive', title: '100% Mobile & Tablet Optimization' },
                    { id: 'seo', title: 'On-Page SEO & Meta Tags' },
                    { id: 'whatsapp', title: 'WhatsApp Direct Chat Integration' },
                    { id: 'forms', title: 'Validated Contact & Inquiry Forms' },
                    { id: 'darkmode', title: 'Custom Premium Dark Mode Styling' }
                  ].map((item) => {
                    const isChecked = featuresSelected.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleFeature(item.id)}
                        className={`w-full text-left p-3 rounded-xl text-xs flex items-center justify-between border transition-colors cursor-pointer ${
                          isChecked
                            ? 'bg-slate-900 border-cyan-600/70 text-white'
                            : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span>{item.title}</span>
                        {isChecked ? (
                          <Check className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-700" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Estimated Summary & Dispatch */}
              <div className="glass-card p-5 rounded-xl border border-slate-700 space-y-4">
                <div className="text-xs font-mono uppercase text-slate-400">
                  Estimated Plan Summary
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Duration:</span>
                    <span className="text-white font-mono font-semibold">{getEstimatedDuration()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Consultant:</span>
                    <span className="text-cyan-400 font-semibold">{PERSONAL_INFO.shortName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-200">Peshawar, PK</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <button
                    onClick={handleDispatchEstimate}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/50 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send Scope to WhatsApp</span>
                  </button>

                  <a
                    href="#contact"
                    onClick={() => onSelectService(projectType === 'landing' ? 'Website Design' : 'Web Development')}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer block text-center"
                  >
                    <span>Use Standard Contact Form</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
