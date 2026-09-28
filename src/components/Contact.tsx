import React from 'react';
import { Contact3DScene } from './3d/Contact3DScene';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative border-t border-slate-800/80 bg-[#07090e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Contact3DScene />
      </div>
    </section>
  );
};
