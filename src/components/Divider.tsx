import React from 'react';

export const Divider: React.FC = () => {
  return (
    <div className="relative w-full h-[1px] my-6 select-none pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-accent/35 to-transparent" />
    </div>
  );
};
