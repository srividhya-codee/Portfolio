import React from 'react';
import { SmartPark3D } from './3d/SmartPark3D';
import { BharatCommand3D } from './3d/BharatCommand3D';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative border-t border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-semibold">
            3D Spatial Engineering Showcases
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            Featured Projects
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Real-time interactive miniature 3D environments illustrating architecture, machine learning prediction pipelines, and full-stack systems.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-4" />
        </div>

        <div className="space-y-20">
          {/* Project 1: Smart_Park Miniature 3D Environment */}
          <SmartPark3D />

          {/* Project 2: Bharat Project Intelligence 3D Command-Center Environment */}
          <BharatCommand3D />
        </div>
      </div>
    </section>
  );
};
