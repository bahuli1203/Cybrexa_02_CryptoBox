import React from 'react';
import { motion } from 'framer-motion';

interface TechTagProps {
  label: string;
}

export const TechTag: React.FC<TechTagProps> = ({ label }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-cyber-accent bg-transparent border border-cyber-accent/40 rounded-[10px] shadow-glow-sm hover:bg-cyber-accent hover:text-[#070C1F] hover:shadow-glow hover:border-cyber-accent transition-all duration-300 cursor-cyber-pointer select-none font-mono tracking-wide"
    >
      {label}
    </motion.div>
  );
};
