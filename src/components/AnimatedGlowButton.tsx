import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface AnimatedGlowButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export const AnimatedGlowButton: React.FC<AnimatedGlowButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 229, 255, 0.5)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 450, damping: 15 }}
      className={`relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-[#070C1F] bg-cyber-accent border border-cyber-accent rounded-lg shadow-glow hover:bg-cyber-accent/90 transition-all duration-300 font-sans tracking-wide cursor-cyber-pointer select-none outline-none focus:ring-2 focus:ring-cyber-accent/50 ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Dynamic background glow ring */}
      <span className="absolute inset-0 rounded-lg bg-cyber-accent/20 blur opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
    </motion.button>
  );
};
