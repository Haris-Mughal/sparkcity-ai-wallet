import { motion } from "framer-motion";
import { Clock, MapPin, Sparkles, X, HelpCircle } from "lucide-react";
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

  const urgent = secs < 300;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-5 border bg-gradient-to-br backdrop-blur-xl",
        colorMap[offer.color],
      )}
    >
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-primary opacity-20 blur-2xl" />

      <div className="flex items-start justify-between gap-3 relative">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{offer.emoji}</div>
          <div>
            <div className="text-sm text-muted-foreground font-mono">{offer.merchant}</div>
            <h3 className="font-semibold leading-tight">{offer.title}</h3>
          </div>
        </div>
        <div className={cn("font-mono text-xs px-2 py-1 rounded-md border", urgent ? "border-neon-magenta/60 text-neon-magenta animate-pulse-glow" : "border-primary/40 text-primary")}>
          <Clock className="inline h-3 w-3 mr-1" />
          {fmt(secs)}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm">
        <span className="px-2.5 py-1 rounded-md bg-foreground/10 font-mono text-xs">{offer.discount}</span>
        <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{offer.distance}</span>
      </div>

      {showWhy && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 p-3 rounded-lg bg-background/50 border border-border/60 text-xs text-muted-foreground"
        >
          <Sparkles className="inline h-3 w-3 mr-1 text-primary" />
          {offer.reason}
        </motion.div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button asChild variant="hero" size="sm" className="flex-1" onClick={() => onAccept?.(offer)}>
          <Link to={`/checkout/${offer.id}`}>Accept Offer</Link>
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
