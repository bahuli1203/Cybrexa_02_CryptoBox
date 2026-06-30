interface ProjectHeaderProps {
  title?: string;
  subtitle?: string;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title = "CryptoBox — Password Strength Checker",
  subtitle = "Analyze credential strength, estimate crack times, check dictionary exposure, and generate cryptographically secure keys entirely client-side."
}) => {
  return (
    <div className="flex flex-col gap-2.5 text-left select-none">
      <h1 className="text-[28px] md:text-[48px] font-extrabold leading-tight text-white font-sans tracking-tight">
        {title}
      </h1>
      <p className="text-sm md:text-base text-cyber-secondary font-sans leading-relaxed max-w-2xl">
        {subtitle}
      </p>
    </div>
  );
};
