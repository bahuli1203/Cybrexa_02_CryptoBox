import React from 'react';

interface FeatureRow {
  label: string;
  description: string;
}

const features: FeatureRow[] = [
  {
    label: "Strength",
    description: "Password meter — Weak to Strong, entropy, time-to-crack."
  },
  {
    label: "Generator",
    description: "Length slider 8–32, uppercase/symbols, copy-to-clipboard."
  },
  {
    label: "Breach DB",
    description: "Check vs 100 common passwords. Show WARN or SAFE."
  }
];

export const FeatureTable: React.FC = () => {
  return (
    <div className="w-full text-left border-t border-cyber-border/40 select-none">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] py-5 border-b border-cyber-border/40 items-start"
        >
          <div className="text-sm font-bold text-cyber-accent uppercase tracking-wide">
            {feature.label}
          </div>
          <div className="text-sm text-cyber-secondary font-sans leading-relaxed pl-2 sm:pl-4">
            {feature.description}
          </div>
        </div>
      ))}
    </div>
  );
};
