import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export const KeyConceptCard: React.FC = () => {
  const guidelines = [
    { label: "Target Entropy", desc: "Aim for 60+ bits for normal accounts, and 80+ bits for administrative credentials." },
    { label: "Zero-Knowledge", desc: "All audits, hashing, and password scans execute client-side. No data ever leaves your device." },
    { label: "Dictionary Audits", desc: "Scan against standard dictionaries to prevent exposure to basic automated guessing scripts." },
    { label: "High-Entropy Keys", desc: "Combining uppercase, lowercase, digits, and special characters exponentially slows cracking rates." }
  ];

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0, 229, 255, 0.12)' }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full text-left rounded-xl p-6 border-l-4 border-l-cyber-accent border border-cyber-border/40 cyber-glass-glow select-none"
    >
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-4 h-4 text-cyber-accent" />
        <h3 className="text-sm font-bold text-cyber-accent uppercase tracking-wider font-mono">
          Security Standards
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        {guidelines.map((item, index) => (
          <div key={index} className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-cyber-heading font-sans uppercase tracking-wide">
              {item.label}
            </span>
            <span className="text-[11px] text-cyber-secondary font-sans leading-relaxed">
              {item.desc}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
