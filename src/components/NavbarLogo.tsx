import React from 'react';
import { Shield } from 'lucide-react';

export const NavbarLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-start select-none">
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center p-1.5 rounded bg-cyber-accent/5 border border-cyber-accent/30 shadow-glow-sm">
          <Shield className="w-5 h-5 text-cyber-accent" strokeWidth={1.5} />
          <div className="absolute inset-0 bg-cyber-accent/10 rounded blur-sm -z-10" />
        </div>
        <span className="text-xl font-extrabold tracking-wider text-white font-sans">
          Cybrexa
        </span>
      </div>
      <div className="text-[8px] font-semibold text-cyber-secondary tracking-[0.22em] mt-1 uppercase pl-0.5">
        CREATE | BUILD | SECURE
      </div>
    </div>
  );
};
