import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = ({ compact = false }: { compact?: boolean }) => (
  <Link to="/" className="flex items-center gap-2 group">
    <div className="relative h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center glow-cyan transition-transform group-hover:scale-105">
      <Sparkles className="h-5 w-5 text-primary-foreground" strokeWidth={2.4} />
    </div>
    {!compact && (
      <div className="leading-tight">
        <div className="font-semibold text-base tracking-tight">SparkCity</div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Wallet</div>
      </div>
    )}
  </Link>
);
