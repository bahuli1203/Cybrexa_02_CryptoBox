import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface SecurityAuditsProps {
  password: string;
  isBreached: boolean;
}

interface AuditItem {
  id: string;
  label: string;
  check: (pass: string, breached: boolean) => boolean;
}

const auditItems: AuditItem[] = [
  {
    id: 'length',
    label: 'Length (12+ Characters Recommended)',
    check: (pass) => pass.length >= 12
  },
  {
    id: 'uppercase',
    label: 'Includes Uppercase Letter (A-Z)',
    check: (pass) => /[A-Z]/.test(pass)
  },
  {
    id: 'lowercase',
    label: 'Includes Lowercase Letter (a-z)',
    check: (pass) => /[a-z]/.test(pass)
  },
  {
    id: 'number',
    label: 'Includes Numeric Digit (0-9)',
    check: (pass) => /[0-9]/.test(pass)
  },
  {
    id: 'symbol',
    label: 'Includes Special Character (!@#$...)',
    check: (pass) => /[^a-zA-Z0-9]/.test(pass)
  },
  {
    id: 'breach',
    label: 'Free of Dictionary Patterns',
    check: (pass, breached) => pass.length > 0 && !breached
  }
];

export const SecurityAudits: React.FC<SecurityAuditsProps> = ({ password, isBreached }) => {
  return (
    <div className="w-full text-left font-sans select-none">
      <h2 className="text-xs font-bold text-cyber-accent tracking-[0.2em] uppercase mb-5">
        SECURITY AUDIT
      </h2>
      <div className="flex flex-col gap-4">
        {auditItems.map((item) => {
          const isPassed = item.check(password, isBreached);
          return (
            <div
              key={item.id}
              className="flex items-start gap-3.5 text-left w-full pointer-events-none"
            >
              <div
                className={`flex-shrink-0 w-5 h-5 mt-0.5 border rounded-sm flex items-center justify-center transition-all duration-300 ${
                  isPassed 
                    ? 'border-cyber-accent bg-cyber-accent/15 shadow-glow-sm' 
                    : 'border-cyber-border bg-cyber-surface/40'
                }`}
              >
                <AnimatePresence>
                  {isPassed && (
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
              </div>
              <span className={`text-sm leading-snug transition-colors duration-300 ${
                isPassed ? 'text-cyber-heading font-medium' : 'text-cyber-secondary'
              }`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
