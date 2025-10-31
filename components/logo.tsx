interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className = "", size = 40, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* SVG Logo */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-110"
      >
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id={`bgGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id={`accentGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
          <linearGradient id={`innerGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
        
        {/* Outer rounded square */}
        <rect 
          x="5" 
          y="5" 
          width="90" 
          height="90" 
          rx="18" 
          fill="url(#bgGradient)"
          stroke="url(#accentGradient)"
          strokeWidth="2"
        />
        
        {/* Inner glow effect */}
        <rect 
          x="15" 
          y="15" 
          width="70" 
          height="70" 
          rx="12" 
          fill="url(#innerGradient)"
          opacity="0.95"
        />
        
        {/* Terminal icon style - chevron and underscore */}
        <g transform="translate(25, 25)">
          {/* First chevron */}
          <path 
            d="M 8 12 L 18 22 L 8 32" 
            stroke="white" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          {/* Second chevron */}
          <path 
            d="M 22 12 L 32 22 L 22 32" 
            stroke="white" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
            opacity="0.7"
          />
          {/* Underscore/cursor */}
          <rect 
            x="36" 
            y="32" 
            width="10" 
            height="3" 
            rx="1.5"
            fill="white"
          />
        </g>
        
        {/* Accent dot (status indicator) */}
        <circle 
          cx="82" 
          cy="18" 
          r="6" 
          fill="#fb923c"
          className="animate-pulse"
        />
      </svg>
      
      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold font-mono bg-gradient-to-r from-cyan-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
            TIVerse
          </span>
          <span className="text-xs font-mono text-muted-foreground/70 -mt-1">
            ~/dev/tools
          </span>
        </div>
      )}
    </div>
  );
}
