import { motion } from "framer-motion";

export const CityMap = () => {
  const merchants = [
    { top: "28%", left: "30%", emoji: "☕", delay: 0.5, color: "neon-cyan" },
    { top: "62%", left: "62%", emoji: "🥐", delay: 0.7, color: "neon-amber" },
    { top: "38%", left: "72%", emoji: "🎬", delay: 0.9, color: "neon-magenta" },
    { top: "70%", left: "22%", emoji: "🍜", delay: 1.1, color: "neon-violet" },
    { top: "20%", left: "55%", emoji: "🧋", delay: 1.3, color: "neon-lime" },
  ];

  return (
    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden glass-strong">
      {/* base layers */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-magenta/10" />
      <div className="absolute inset-0 bg-mesh opacity-50" />

      {/* concentric scan rings around user */}
      <div className="absolute" style={{ top: "48%", left: "44%" }}>
        {[0, 0.6, 1.2].map((d, i) => (
          <span
            key={i}
            className="absolute h-6 w-6 rounded-full border border-primary/60 -translate-x-1/2 -translate-y-1/2 animate-ring-ping"
            style={{ animationDelay: `${d}s` }}
          />
        ))}
      </div>

      {/* radar sweep */}
      <div className="absolute" style={{ top: "48%", left: "44%" }}>
        <div className="relative -translate-x-1/2 -translate-y-1/2 h-[260px] w-[260px]">
          <div className="absolute inset-0 rounded-full border border-primary/10" />
          <div className="absolute inset-6 rounded-full border border-primary/10" />
          <div className="absolute inset-12 rounded-full border border-primary/10" />
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div
              className="absolute inset-0 origin-center animate-scan"
              style={{
                background: "conic-gradient(from 0deg, transparent 0deg, hsl(var(--neon-cyan)/0.35) 40deg, transparent 60deg)",
              }}
            />
          </div>
        </div>
      </div>

      {/* streets */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 250" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="street1" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(var(--neon-cyan))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--neon-cyan))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--neon-cyan))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 60 Q200 80 400 50" stroke="hsl(var(--neon-cyan)/0.3)" strokeWidth="1.5" />
        <path d="M0 130 Q200 100 400 150" stroke="hsl(var(--neon-violet)/0.3)" strokeWidth="1.5" />
        <path d="M0 200 Q200 220 400 190" stroke="hsl(var(--neon-magenta)/0.25)" strokeWidth="1.5" />
        <path d="M80 0 L120 250" stroke="hsl(var(--neon-cyan)/0.18)" strokeWidth="1" />
        <path d="M260 0 L240 250" stroke="hsl(var(--neon-violet)/0.18)" strokeWidth="1" />

        {/* moving data packet */}
        <circle r="2.5" fill="hsl(var(--neon-cyan))">
          <animateMotion dur="6s" repeatCount="indefinite" path="M0 60 Q200 80 400 50" />
        </circle>
        <circle r="2" fill="hsl(var(--neon-magenta))">
          <animateMotion dur="9s" repeatCount="indefinite" path="M0 200 Q200 220 400 190" />
        </circle>
      </svg>

      {/* user pin */}
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}
        className="absolute z-10" style={{ top: "48%", left: "44%" }}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/50 animate-ping h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
          <div className="relative h-4 w-4 rounded-full bg-primary border-2 border-background -translate-x-1/2 -translate-y-1/2 glow-cyan" />
        </div>
      </motion.div>

      {/* merchant pins */}
      {merchants.map((p, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, y: -10 }} animate={{ scale: 1, y: 0 }}
          transition={{ delay: p.delay, type: "spring" }}
          whileHover={{ scale: 1.15, y: -2 }}
          className="absolute z-10 cursor-pointer"
          style={{ top: p.top, left: p.left }}
        >
          <div className="relative -translate-x-1/2 -translate-y-full">
            <div className={`h-9 w-9 rounded-full glass flex items-center justify-center text-lg border border-${p.color}/60 animate-float`} style={{ animationDelay: `${i * 0.4}s`, boxShadow: `0 0 18px hsl(var(--${p.color})/0.45)` }}>
              {p.emoji}
            </div>
            <div className="h-2 w-2 rounded-full bg-foreground mx-auto -mt-0.5 opacity-70" />
          </div>
        </motion.div>
      ))}

      {/* compass */}
      <div className="absolute top-3 right-3 h-10 w-10 rounded-full glass border border-primary/40 flex items-center justify-center text-[10px] font-mono text-primary">N ↑</div>

      <div className="absolute bottom-3 left-3 text-[10px] font-mono text-muted-foreground tracking-widest flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-neon-lime animate-pulse" />
        LIVE · 38 MERCHANTS · SCAN RADIUS 500m
      </div>
      <div className="absolute bottom-3 right-3 text-[10px] font-mono text-primary">RADAR_v2.4</div>
    </div>
  );
};
