import React from 'react';
import { Trophy3D } from './3d/Trophy3D';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 relative border-t border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-semibold">
            Recognitions &amp; Milestones
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            Hackathons &amp; Achievements
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Competitive hackathon recognition evaluated through technical innovation and rigorous multi-stage review.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-4" />
        </div>

        {/* Physical 3D Trophy Showcase */}
        <Trophy3D />
      </div>
    </section>
  );
};
