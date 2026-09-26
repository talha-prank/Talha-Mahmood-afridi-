/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AdminPage } from './components/AdminPage';
import { ProjectItem } from './data/portfolioData';

export default function App() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedServicePreset, setSelectedServicePreset] = useState<string>('Web Development');
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === '/admin' || window.location.hash === '#admin';
    }
    return false;
  });

  useEffect(() => {
    const handleLocation = () => {
      if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, []);

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServicePreset(serviceTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.pathname === '/admin') {
      window.history.pushState({}, '', '/');
    } else if (window.location.hash === '#admin') {
      window.location.hash = '';
    }
  };

  if (isAdminOpen) {
    return <AdminPage onBackToPortfolio={handleCloseAdmin} />;
  }

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar onOpenCV={() => setIsCVModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenCV={() => setIsCVModalOpen(true)} />
        <Dashboard 
          onOpenCV={() => setIsCVModalOpen(true)} 
          onSelectService={handleSelectService} 
        />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <Services onSelectService={handleSelectService} />
        <Contact 
          selectedServicePreset={selectedServicePreset} 
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenCV={() => setIsCVModalOpen(true)} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Interactive CV Modal & Downloader */}
      <CVModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)} 
      />

      {/* Project Detail Modal & Live Simulator */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectService={handleSelectService}
      />
    </div>
  );
}
