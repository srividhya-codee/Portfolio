import React, { useState } from 'react';
import { Github, Linkedin, Code2, ExternalLink, Copy, Check, Terminal, Sparkles } from 'lucide-react';
import { CODING_PROFILES } from '../data/portfolioData';
import { TiltCard } from './TiltCard';

export const CodingProfiles: React.FC = () => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'GitHub': return Github;
      case 'LinkedIn': return Linkedin;
      case 'LeetCode': return Code2;
      default: return Terminal;
    }
  };

  const getBadgeColor = (platform: string) => {
    switch (platform) {
      case 'GitHub': return 'text-slate-300 border-slate-700 bg-slate-800/80';
      case 'LinkedIn': return 'text-blue-400 border-blue-800/50 bg-blue-950/40';
      case 'LeetCode': return 'text-amber-400 border-amber-800/50 bg-amber-950/40';
      default: return 'text-cyan-400 border-cyan-800/50 bg-cyan-950/40';
    }
  };

  return (
    <section id="profiles" className="py-24 relative border-t border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-semibold">
            Online Presence
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance">
            Coding &amp; Developer Profiles
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Direct access to source code repositories, algorithmic problem-solving tracks, and professional engineering activities.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-4" />
        </div>

        {/* 3-Column Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CODING_PROFILES.map((profile) => {
            const Icon = getPlatformIcon(profile.platform);
            const isCopied = copiedUrl === profile.url;

            return (
              <TiltCard
                key={profile.platform}
                glowColor={profile.platform === 'LinkedIn' ? 'blue' : profile.platform === 'LeetCode' ? 'purple' : 'cyan'}
                className="p-6 sm:p-8 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white shadow-inner">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </span>
                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded-md border ${getBadgeColor(profile.platform)}`}>
                      {profile.primaryTag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-display mb-1">
                    {profile.platform}
                  </h3>
                  <div className="text-xs font-mono text-cyan-300 mb-4 truncate">
                    @{profile.handle}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {profile.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
                  >
                    <span>Visit Profile</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </a>

                  <button
                    onClick={() => handleCopy(profile.url)}
                    className="w-full py-2 px-3 rounded-lg text-[11px] font-mono text-slate-400 hover:text-slate-200 bg-slate-950/50 hover:bg-slate-900 border border-slate-800/60 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Copy profile URL"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-300">URL Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Profile URL</span>
                      </>
                    )}
                  </button>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
