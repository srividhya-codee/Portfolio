import React from 'react';
import { ArrowDown, ArrowUpRight, Github, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { HeroWorkstationScene } from './3d/HeroWorkstationScene';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-grid-subtle">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/3 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/10 via-indigo-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-purple-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Personal Hero Typography & Clean Actions */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-cyan-300 font-medium">3D Digital Workspace</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.08] text-balance">
                Sri Vidhya A
              </h1>
              <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent font-display">
                AI &amp; Data Science Engineer
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg text-pretty">
              Building intelligent applications with AI, Machine Learning and Generative AI.
            </p>

            {/* Clean Apple-style Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white transition-all shadow-[0_0_30px_rgba(6,182,212,0.35)] cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap transform hover:-translate-y-0.5"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 text-slate-950" />
              </button>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-sm text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2 whitespace-nowrap transform hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>View GitHub</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </a>
            </div>

            {/* Verified Credentials Strip */}
            <div className="pt-6 border-t border-slate-800/80 w-full flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-slate-400">
              <span className="text-slate-200">Easwari Engineering College</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-cyan-400 font-semibold">8.77 CGPA</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Chennai, India</span>
            </div>
          </div>

          {/* Right Column: Real 3D Workstation Scene */}
          <div className="lg:col-span-7 w-full">
            <HeroWorkstationScene />
          </div>
        </div>
      </div>
    </section>
  );
};
