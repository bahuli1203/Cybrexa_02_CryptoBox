import { useState, useEffect } from 'react';
import { Eye, EyeOff, Shield, ShieldAlert, ShieldCheck, Copy, Check, RotateCw, Key } from 'lucide-react';

const COMMON_PASSWORDS = [
  "123456", "password", "123456789", "12345678", "12345", "1234567", "555555", "666666",
  "111111", "123123", "1234567890", "qwerty", "password123", "admin", "dragon", "letmein",
  "football", "iloveyou", "monkey", "charlie", "trustnoone", "security", "pass123", "welcome",
  "shadow", "master", "hunter2", "crypto", "bitcoin", "cyber", "cybrexa", "box", "cryptobox",
  "strength", "checker", "password!", "admin123", "1234abcd", "abcd1234", "qwertyuiop",
  "asdfghjkl", "zxcvbnm", "login", "signin", "test", "testing", "user", "guest", "root",
  "oracle", "system", "cisco", "default", "password12", "pass", "abc123", "superman",
  "batman", "spiderman", "matrix", "pokemon", "princess", "angel", "sunshine", "starwars",
  "skywalker", "yoda", "darthvader", "chewbacca", "gandalf", "frodo", "harrypotter", "voldemort",
  "dumbledore", "ninja", "samurai", "warrior", "knight", "wizard", "sorcerer", "warlock",
  "necromancer", "paladin", "cleric", "druid", "ranger", "rogue", "assassin", "hunter", "scout",
  "sniper", "ghost", "spectre", "phantom", "wraith", "banshee", "goblin", "orc"
];

export const CryptoBoxDemo: React.FC = () => {
  const [password, setPassword] = useState("");
  const [isBreached, setIsBreached] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generator Config
  const [genLength, setGenLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  // Strength details
  const [entropy, setEntropy] = useState(0);
  const [crackTime, setCrackTime] = useState("");
  const [strengthLabel, setStrengthLabel] = useState("EMPTY");
  const [strengthColor, setStrengthColor] = useState("text-cyber-secondary");
  const [barCount, setBarCount] = useState(0);

  // Calculate password metrics
  useEffect(() => {
    if (!password) {
      setEntropy(0);
      setCrackTime("N/A");
      setIsBreached(false);
      setStrengthLabel("EMPTY");
      setStrengthColor("text-cyber-secondary");
      setBarCount(0);
      return;
    }

    // Check Breach DB
    const lowerPassword = password.toLowerCase();
    const breached = COMMON_PASSWORDS.some(p => lowerPassword === p);
    setIsBreached(breached);

    // Calculate Pool Size
    let poolSize = 0;
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 33; // Special characters pool

    if (poolSize === 0) poolSize = 1;

    // Calculate Entropy
    const calcEntropy = password.length * (Math.log(poolSize) / Math.log(2));
    setEntropy(Math.round(calcEntropy * 10) / 10);

    // Calculate Crack Time
    const guessRate = 10000000000;
    const guesses = Math.pow(poolSize, password.length);
    const seconds = guesses / guessRate;

    const formatCrackTime = (secs: number): string => {
      if (secs < 0.01) return "Instantly";
      if (secs < 1) return "Under a second";
      if (secs < 60) return `${Math.round(secs)}s`;
      const mins = secs / 60;
      if (mins < 60) return `${Math.round(mins)} mins`;
      const hrs = mins / 60;
      if (hrs < 24) return `${Math.round(hrs)} hours`;
      const days = hrs / 24;
      if (days < 365) return `${Math.round(days)} days`;
      const yrs = days / 365;
      if (yrs < 1000) return `${Math.round(yrs)} years`;
      if (yrs < 1000000) return `${Math.round(yrs / 1000)}k years`;
      if (yrs < 1000000000) return `${Math.round(yrs / 1000000)}M years`;
      return `${Math.round(yrs / 1000000000)}B years`;
    };

    setCrackTime(formatCrackTime(seconds));

    // Determine strength level
    if (breached) {
      setStrengthLabel("COMPROMISED");
      setStrengthColor("text-red-500");
      setBarCount(1);
    } else if (calcEntropy < 35) {
      setStrengthLabel("WEAK");
      setStrengthColor("text-red-400");
      setBarCount(1);
    } else if (calcEntropy < 55) {
      setStrengthLabel("MEDIUM");
      setStrengthColor("text-yellow-500");
      setBarCount(2);
    } else if (calcEntropy < 75) {
      setStrengthLabel("STRONG");
      setStrengthColor("text-emerald-400");
      setBarCount(3);
    } else {
      setStrengthLabel("SECURE");
      setStrengthColor("text-cyber-accent");
      setBarCount(4);
    }
  }, [password]);

  // Generate secure password
  const generatePassword = () => {
    let charset = "";
    if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+-=[]{}|;:',./<>?~`";

    if (!charset) return;

    let result = "";
    for (let i = 0; i < genLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    setPassword(result);
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBarColor = (index: number) => {
    if (index >= barCount) return "bg-gray-800 border-transparent";
    if (isBreached) return "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] border-red-400";
    
    switch (barCount) {
      case 1: return "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)] border-red-300";
      case 2: return "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)] border-yellow-400";
      case 3: return "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] border-emerald-300";
      case 4: return "bg-cyber-accent shadow-[0_0_12px_rgba(0,229,255,0.6)] border-cyber-accent";
      default: return "bg-gray-800 border-transparent";
    }
  };

  return (
    <div className="w-full rounded-2xl border border-cyber-border/40 cyber-glass-glow p-5 sm:p-7 relative overflow-hidden flex flex-col gap-6">
      
      {/* Interactive header tag */}
      <div className="flex items-center justify-between pb-4 border-b border-cyber-border/20">
        <div className="flex items-center gap-2 select-none">
          <Key className="w-4 h-4 text-cyber-accent" />
          <span className="text-xs font-bold tracking-widest text-cyber-accent uppercase font-mono">
            SANDBOX ENGINE v1.0.4
          </span>
        </div>
        <div className="flex items-center gap-1.5 select-none">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-cyber-secondary font-mono tracking-wider">SECURE CONNECTION</span>
        </div>
      </div>

      {/* Main interactive panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Analyzer */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-cyber-secondary uppercase tracking-wider font-sans text-left">
              Input Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type password or use generator..."
                className="w-full bg-[#070C1F]/90 text-white font-mono text-sm border border-cyber-border/40 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-cyber-accent focus:shadow-glow-sm transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cyber-secondary hover:text-cyber-accent transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Strength Level and Bars */}
          <div className="flex flex-col gap-2 select-none">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cyber-secondary font-bold font-sans">STRENGTH PROFILE:</span>
              <span className={`font-mono font-bold tracking-wider ${strengthColor}`}>
                {strengthLabel}
              </span>
            </div>
            
            {/* 4 Segment Progress Bar */}
            <div className="grid grid-cols-4 gap-2 h-2.5">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`h-full rounded-sm border transition-all duration-500 ${getBarColor(idx)}`}
                />
              ))}
            </div>
          </div>

          {/* Metrics Display Grid */}
          <div className="grid grid-cols-2 gap-3 mt-1.5">
            {/* Entropy Card */}
            <div className="bg-[#070C1F]/40 border border-cyber-border/20 rounded-lg p-3 text-left">
              <div className="text-[10px] text-cyber-secondary font-bold font-sans uppercase tracking-wider">
                Entropy Score
              </div>
              <div className="text-lg font-mono font-bold text-cyber-accent mt-0.5">
                {entropy} <span className="text-xs text-cyber-secondary font-normal font-sans">bits</span>
              </div>
            </div>

            {/* Time to Crack Card */}
            <div className="bg-[#070C1F]/40 border border-cyber-border/20 rounded-lg p-3 text-left">
              <div className="text-[10px] text-cyber-secondary font-bold font-sans uppercase tracking-wider">
                Crack Time (Est.)
              </div>
              <div className="text-lg font-mono font-bold text-white mt-0.5 truncate" title={crackTime}>
                {crackTime}
              </div>
            </div>
          </div>

          {/* Breach Status Box */}
          <div className={`flex items-center gap-3 border rounded-lg p-3 mt-1.5 select-none ${
            !password 
              ? 'border-cyber-border/20 bg-[#070C1F]/20 text-cyber-secondary' 
              : isBreached 
                ? 'border-red-500/40 bg-red-950/10 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.05)]' 
                : 'border-cyber-accent/40 bg-cyber-accent/5 text-cyber-accent shadow-[0_0_15px_rgba(0,229,255,0.05)]'
          }`}>
            {isBreached ? (
              <>
                <ShieldAlert className="w-5 h-5 flex-shrink-0 text-red-400" />
                <div className="text-left">
                  <div className="text-xs font-bold uppercase tracking-wider font-sans">WARN: BREACH DETECTED</div>
                  <div className="text-[10px] opacity-75 font-sans">Matched with 100 most common standard passwords.</div>
                </div>
              </>
            ) : !password ? (
              <>
                <Shield className="w-5 h-5 flex-shrink-0 opacity-40" />
                <div className="text-left">
                  <div className="text-xs font-bold uppercase tracking-wider font-sans">BREACH DATABASE CHECK</div>
                  <div className="text-[10px] opacity-60 font-sans">Input a password to run real-time exposure scans.</div>
                </div>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 flex-shrink-0 text-cyber-accent animate-pulse" />
                <div className="text-left">
                  <div className="text-xs font-bold uppercase tracking-wider font-sans">SAFE: NO EXPOSURE</div>
                  <div className="text-[10px] opacity-75 font-sans">Password not found in breach list. Excellent choice.</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Side: Generator Parameters */}
        <div className="lg:col-span-5 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-cyber-border/20 pt-6 lg:pt-0 lg:pl-6 text-left">
          <span className="text-xs font-bold text-cyber-secondary uppercase tracking-wider font-sans select-none">
            Generator Settings
          </span>

          {/* Length Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs select-none">
              <span className="text-cyber-secondary font-bold font-sans">LENGTH:</span>
              <span className="font-mono font-bold text-cyber-accent">{genLength}</span>
            </div>
            <input
              type="range"
              min="8"
              max="32"
              value={genLength}
              onChange={(e) => setGenLength(parseInt(e.target.value))}
              className="w-full accent-cyber-accent bg-gray-900 border border-cyber-border/20 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Toggle Switches */}
          <div className="flex flex-col gap-3">
            {/* Uppercase */}
            <label className="flex items-center justify-between cursor-cyber-pointer select-none">
              <span className="text-xs font-semibold text-cyber-secondary font-sans uppercase">Uppercase (A-Z)</span>
              <input
                type="checkbox"
                checked={useUppercase}
                onChange={() => setUseUppercase(!useUppercase)}
                className="w-4 h-4 rounded border-cyber-border bg-[#070C1F] text-cyber-accent focus:ring-cyber-accent focus:ring-offset-[#070C1F]"
              />
            </label>

            {/* Lowercase */}
            <label className="flex items-center justify-between cursor-cyber-pointer select-none">
              <span className="text-xs font-semibold text-cyber-secondary font-sans uppercase">Lowercase (a-z)</span>
              <input
                type="checkbox"
                checked={useLowercase}
                onChange={() => setUseLowercase(!useLowercase)}
                className="w-4 h-4 rounded border-cyber-border bg-[#070C1F] text-cyber-accent focus:ring-cyber-accent focus:ring-offset-[#070C1F]"
              />
            </label>

            {/* Numbers */}
            <label className="flex items-center justify-between cursor-cyber-pointer select-none">
              <span className="text-xs font-semibold text-cyber-secondary font-sans uppercase">Numbers (0-9)</span>
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={() => setUseNumbers(!useNumbers)}
                className="w-4 h-4 rounded border-cyber-border bg-[#070C1F] text-cyber-accent focus:ring-cyber-accent focus:ring-offset-[#070C1F]"
              />
            </label>

            {/* Symbols */}
            <label className="flex items-center justify-between cursor-cyber-pointer select-none">
              <span className="text-xs font-semibold text-cyber-secondary font-sans uppercase">Symbols (!@#$)</span>
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={() => setUseSymbols(!useSymbols)}
                className="w-4 h-4 rounded border-cyber-border bg-[#070C1F] text-cyber-accent focus:ring-cyber-accent focus:ring-offset-[#070C1F]"
              />
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-auto">
            {/* Generate Trigger */}
            <button
              type="button"
              onClick={generatePassword}
              disabled={!useUppercase && !useLowercase && !useNumbers && !useSymbols}
              className="flex-1 bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent hover:bg-cyber-accent hover:text-[#070C1F] hover:shadow-glow hover:border-cyber-accent transition-all duration-300 rounded-lg py-2.5 font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 cursor-cyber-pointer select-none outline-none disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-cyber-accent"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Generate
            </button>

            {/* Copy Button */}
            <button
              type="button"
              onClick={copyToClipboard}
              disabled={!password}
              className={`flex-1 transition-all duration-300 rounded-lg py-2.5 font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 outline-none select-none ${
                copied
                  ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                  : 'bg-cyber-accent border border-cyber-accent text-[#070C1F] hover:bg-cyber-accent/90 shadow-glow disabled:opacity-40 disabled:shadow-none'
              } ${password ? 'cursor-cyber-pointer' : 'cursor-not-allowed'}`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
