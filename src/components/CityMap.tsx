import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export const CityMap = () => {
  return (
    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden glass-strong">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-magenta/10" />

      {/* "streets" */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 250" fill="none">
        <path d="M0 60 Q200 80 400 50" stroke="hsl(var(--neon-cyan)/0.35)" strokeWidth="1.5" />
        <path d="M0 130 Q200 100 400 150" stroke="hsl(var(--neon-violet)/0.35)" strokeWidth="1.5" />
        <path d="M0 200 Q200 220 400 190" stroke="hsl(var(--neon-magenta)/0.3)" strokeWidth="1.5" />
        <path d="M80 0 L120 250" stroke="hsl(var(--neon-cyan)/0.2)" strokeWidth="1" />
        <path d="M260 0 L240 250" stroke="hsl(var(--neon-violet)/0.2)" strokeWidth="1" />
      </svg>

      {/* user pin */}
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}
        className="absolute" style={{ top: "48%", left: "44%" }}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
          <div className="relative h-4 w-4 rounded-full bg-primary border-2 border-background -translate-x-1/2 -translate-y-1/2 glow-cyan" />
        </div>
      </motion.div>

      {/* merchant pins */}
      {[
        { top: "28%", left: "30%", emoji: "☕", delay: 0.5 },
        { top: "62%", left: "62%", emoji: "🥐", delay: 0.7 },
        { top: "38%", left: "72%", emoji: "🎬", delay: 0.9 },
        { top: "70%", left: "22%", emoji: "🍜", delay: 1.1 },
      ].map((p, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, y: -10 }} animate={{ scale: 1, y: 0 }}
          transition={{ delay: p.delay, type: "spring" }}
          className="absolute"
          style={{ top: p.top, left: p.left }}
        >
          <div className="relative -translate-x-1/2 -translate-y-full">
            <div className="h-9 w-9 rounded-full glass flex items-center justify-center text-lg border border-primary/40 animate-float" style={{ animationDelay: `${i * 0.4}s` }}>
              {p.emoji}
            </div>
            <MapPin className="h-3 w-3 text-primary mx-auto -mt-1" />
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-3 left-3 text-[10px] font-mono text-muted-foreground tracking-widest">LIVE · 38 MERCHANTS NEARBY</div>
    </div>
  );
};
