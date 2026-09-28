import React from 'react';
import { About3DCard } from './3d/About3DCard';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative border-t border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-semibold">
            3D Holographic Identity
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            About Me
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative Statement */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl border border-slate-800/90 bg-slate-900/40 backdrop-blur-md shadow-xl relative overflow-hidden">
              <div className="space-y-5 text-slate-300 text-base sm:text-lg leading-relaxed">
                <p>
                  I am a second-year B.Tech Artificial Intelligence and Data Science student at{' '}
                  <span className="text-white font-semibold">{PERSONAL_INFO.education.college}</span> with a CGPA of{' '}
                  <span className="text-cyan-400 font-semibold font-mono">{PERSONAL_INFO.education.cgpa}</span>. I am passionate about Generative AI, Artificial Intelligence, Machine Learning, and software development.
                </p>
                <p>
                  I enjoy building practical technology solutions that solve real-world problems. My projects include smart parking, government project monitoring, machine learning risk prediction, RAG-based information retrieval, and AI-powered decision-support systems.
                </p>
                <p>
                  I am currently looking for internship opportunities where I can learn, contribute, and work on real-world AI/ML and Generative AI applications.
                </p>
              </div>

              {/* Factual Summary Strip */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <div className="text-slate-400">INSTITUTION</div>
                  <div className="text-white font-semibold mt-0.5">{PERSONAL_INFO.education.college}</div>
                </div>
                <div>
                  <div className="text-slate-400">ACADEMIC STANDING</div>
                  <div className="text-cyan-400 font-semibold mt-0.5">CGPA: {PERSONAL_INFO.education.cgpa} / 10</div>
                </div>
                <div>
                  <div className="text-slate-400">EXPECTED GRADUATION</div>
                  <div className="text-purple-400 font-semibold mt-0.5">{PERSONAL_INFO.education.gradYear}</div>
                </div>
                <div>
                  <div className="text-slate-400">12TH PERCENTAGE</div>
                  <div className="text-white font-semibold mt-0.5">{PERSONAL_INFO.education.twelfthScore}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Holographic Card in Three.js */}
          <div className="lg:col-span-6 w-full">
            <About3DCard />
          </div>
        </div>
      </div>
    </section>
  );
};
