import { NavbarLogo } from './components/NavbarLogo';
import { CryptoBoxDemo } from './components/CryptoBoxDemo';
import { Lock, ShieldCheck } from 'lucide-react';

function App() {
  return (
    <div className="relative min-h-screen bg-cyber-bg bg-cyber-grid text-white overflow-x-hidden font-sans flex flex-col justify-between">
      
      {/* Glowing neon background ambiance spots */}
      <div className="absolute top-[-5%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-cyber-accent/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-[#101730]/40 blur-[150px] pointer-events-none z-0" />

      {/* Navigation / Header Brand */}
      <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 flex justify-between items-center select-none">
        <NavbarLogo />
        
        {/* Top-Right System Status Indicator */}
        <div className="flex items-center gap-3.5 bg-[#101730]/65 border border-cyber-border/30 rounded-lg px-4 py-2 font-mono text-[10px] text-cyber-secondary shadow-glow-sm">
          <div className="flex items-center gap-1.5 text-cyber-accent">
            <Lock className="w-3.5 h-3.5 animate-pulse" />
            <span className="font-bold">STATUS: LOCAL</span>
          </div>
          <div className="w-px h-3.5 bg-cyber-border/30" />
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ZERO-KNOWLEDGE</span>
          </div>
        </div>
      </header>

      {/* Main Workbench: Centered single column */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl flex flex-col gap-6 items-center">
          
          {/* Tagline / Subtitle */}
          <div className="text-center flex flex-col gap-2.5 max-w-2xl select-none mb-2">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              CryptoBox
            </h1>
            <p className="text-xs sm:text-sm text-cyber-secondary font-sans leading-relaxed">
              Verify the strength of your credentials against brute-force entropy thresholds and dictionary breach lists. All cryptographic checks run strictly client-side in your browser.
            </p>
          </div>

          {/* Interactive Sandbox Engine */}
          <CryptoBoxDemo />

        </div>
      </main>

      {/* Footer branding */}
      <footer className="relative z-10 border-t border-cyber-border/10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-cyber-secondary font-mono text-[9px] select-none tracking-wider">
        <div>© 2026 CRYPTOBOX. ALL INTELLECTUAL PROPERTIES SECURED.</div>
        <div className="flex items-center gap-4">
          <span className="hover:text-cyber-accent cursor-pointer transition-colors duration-200">LOCAL CRYPTO POLICY</span>
          <span className="w-1 h-1 rounded-full bg-cyber-border/30" />
          <span className="hover:text-cyber-accent cursor-pointer transition-colors duration-200">DEPLOYED ON NETLIFY</span>
        </div>
      </footer>

    </div>
  );
}

export default App;
