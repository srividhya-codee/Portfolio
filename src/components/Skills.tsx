import React from 'react';
import { Skills3DRoom } from './3d/Skills3DRoom';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative border-t border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-semibold">
            Interactive 3D Skill Environment
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            3D Technology Room
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Technologies mapped as floating 3D objects around a central data workspace. Drag to spin the room, or hover to inspect technical roles and proficiencies.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-4" />
        </div>

        {/* 3D Skill Room */}
        <Skills3DRoom />
      </div>
    </section>
  );
};
