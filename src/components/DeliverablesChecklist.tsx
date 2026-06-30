import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
}

const initialItems: ChecklistItem[] = [
  { id: 'github', text: 'GitHub: Cybrexa_02_CryptoBox' },
  { id: 'live-url', text: 'Live URL deployed on Netlify' },
  { id: 'screen-rec', text: '2–3 min screen recording demo for LinkedIn' },
  { id: 'linkedin-post', text: 'LinkedIn post with mention @cybrexa and GitHub link' },
];

export const DeliverablesChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    github: true,
    'live-url': false,
    'screen-rec': false,
    'linkedin-post': false,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full text-left font-sans select-none">
      <h2 className="text-xs font-bold text-cyber-accent tracking-[0.2em] uppercase mb-5">
        DELIVERABLES
      </h2>
      <div className="flex flex-col gap-4">
        {initialItems.map((item) => {
          const isChecked = checkedItems[item.id];
          return (
            <button
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className="flex items-start gap-3.5 cursor-cyber-pointer group text-left w-full outline-none focus:outline-none"
            >
              <motion.div
                whileHover={{ scale: 1.08, borderColor: 'rgba(0, 229, 255, 0.8)' }}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 w-5 h-5 mt-0.5 border rounded-sm flex items-center justify-center transition-colors duration-200 ${
                  isChecked 
                    ? 'border-cyber-accent bg-cyber-accent/15 shadow-glow-sm' 
                    : 'border-cyber-border bg-cyber-surface/40'
                }`}
              >
                <AnimatePresence>
                  {isChecked && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <Check className="w-3.5 h-3.5 text-cyber-accent" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <span className={`text-sm leading-snug transition-colors duration-200 select-none ${
                isChecked ? 'text-cyber-heading font-medium' : 'text-cyber-secondary'
              } group-hover:text-[#00E5FF]`}>
                {item.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
