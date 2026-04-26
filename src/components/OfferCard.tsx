import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Sparkles, X, HelpCircle, Check, Flame, Snowflake, Zap, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Offer } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const colorMap: Record<Offer["color"], string> = {
  cyan: "from-neon-cyan/30 to-neon-violet/10 border-neon-cyan/40",
  magenta: "from-neon-magenta/30 to-neon-violet/10 border-neon-magenta/40",
  violet: "from-neon-violet/30 to-neon-cyan/10 border-neon-violet/40",
  lime: "from-neon-lime/25 to-neon-cyan/10 border-neon-lime/40",
  amber: "from-neon-amber/25 to-neon-magenta/10 border-neon-amber/40",
};

const surgeMap: Record<NonNullable<Offer["surge"]>, { icon: typeof Flame; cls: string; label: string }> = {
  HOT: { icon: Flame, cls: "border-neon-magenta/60 text-neon-magenta bg-neon-magenta/10", label: "HOT" },
  SURGE: { icon: Zap, cls: "border-neon-amber/60 text-neon-amber bg-neon-amber/10", label: "SURGE" },
  QUIET: { icon: Snowflake, cls: "border-neon-cyan/60 text-neon-cyan bg-neon-cyan/10", label: "QUIET" },
  RARE: { icon: Star, cls: "border-neon-lime/60 text-neon-lime bg-neon-lime/10", label: "RARE" },
};

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export const OfferCard = ({ offer, onAccept, onDismiss, index = 0 }: { offer: Offer; onAccept?: (o: Offer) => void; onDismiss?: (o: Offer) => void; index?: number }) => {
  const [secs, setSecs] = useState(offer.expiresInSec);
  const [showWhy, setShowWhy] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const total = offer.expiresInSec;
  const pct = Math.max(0, Math.min(1, secs / total));
  const urgent = secs < 300;
  const Surge = offer.surge ? surgeMap[offer.surge] : null;
  // ring math
  const R = 16;
  const C = 2 * Math.PI * R;
  const dash = C * pct;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, x: -40, transition: { duration: 0.25 } }}
      transition={{ delay: index * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-5 border bg-gradient-to-br backdrop-blur-xl",
        "transition-shadow hover:shadow-[0_20px_60px_-20px_hsl(var(--neon-cyan)/0.4)]",
        colorMap[offer.color],
      )}
    >
      {/* sheen on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-x-full inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-foreground/10 to-transparent skew-x-12 animate-shimmer" />
      </div>

      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-primary opacity-20 blur-2xl" />

      {/* surge badge */}
      {Surge && (
        <div className={cn("absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border", Surge.cls)}>
          <Surge.icon className="h-3 w-3" />
          {Surge.label}
        </div>
      )}

      <div className="flex items-start justify-between gap-3 relative">
        <div className="flex items-center gap-3 min-w-0">
          <div className="text-3xl shrink-0">{offer.emoji}</div>
          <div className="min-w-0">
            <div className="text-xs text-muted-foreground font-mono truncate">{offer.merchant}</div>
            <h3 className="font-semibold leading-tight truncate">{offer.title}</h3>
          </div>
        </div>

        {/* timer ring */}
        <div className="relative shrink-0 mt-6">
          <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90">
            <circle cx="22" cy="22" r={R} stroke="hsl(var(--secondary))" strokeWidth="3" fill="none" />
            <circle
              cx="22" cy="22" r={R}
              stroke={urgent ? "hsl(var(--neon-magenta))" : "hsl(var(--neon-cyan))"}
              strokeWidth="3" fill="none" strokeLinecap="round"
              strokeDasharray={`${dash} ${C}`}
              className={urgent ? "drop-shadow-[0_0_6px_hsl(var(--neon-magenta))]" : "drop-shadow-[0_0_6px_hsl(var(--neon-cyan))]"}
            />
          </svg>
          <div className={cn("absolute inset-0 flex items-center justify-center text-[9px] font-mono", urgent ? "text-neon-magenta" : "text-primary")}>
            <Clock className="h-2.5 w-2.5 mr-0.5" />
            {fmt(secs)}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm flex-wrap">
        <span className="px-2.5 py-1 rounded-md bg-foreground/10 font-mono text-xs">{offer.discount}</span>
        <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{offer.distance}</span>
        <span className="ml-auto flex items-center gap-1 text-[10px] font-mono text-primary">
          <Sparkles className="h-3 w-3" /> AI {offer.confidence}%
        </span>
      </div>

      {/* AI confidence bar */}
      <div className="mt-2 h-1 rounded-full bg-secondary/60 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${offer.confidence}%` }}
          transition={{ delay: 0.2 + index * 0.05, duration: 0.9, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta"
        />
      </div>

      {/* signal chips */}
      <div className="mt-3 flex flex-wrap gap-1">
        {offer.signals.slice(0, 4).map((s) => (
          <span key={s} className="text-[10px] font-mono px-1.5 py-0.5 rounded-md border border-border/60 text-muted-foreground">#{s}</span>
        ))}
      </div>

      <AnimatePresence>
        {showWhy && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 rounded-lg bg-background/50 border border-border/60 text-xs text-muted-foreground">
              <Sparkles className="inline h-3 w-3 mr-1 text-primary" />
              {offer.reason}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex items-center gap-2">
        <Button asChild variant="hero" size="sm" className="flex-1" onClick={() => onAccept?.(offer)}>
          <Link to={`/checkout/${offer.id}`}>
            <Check className="h-3.5 w-3.5" /> Accept Offer
          </Link>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setShowWhy((v) => !v)} aria-label="Why this offer">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDismiss?.(offer)} aria-label="Dismiss">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};
