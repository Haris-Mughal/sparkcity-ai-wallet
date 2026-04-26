import { liveTickerEvents } from "@/lib/mockData";

export const LiveTicker = () => {
  const items = [...liveTickerEvents, ...liveTickerEvents];
  return (
    <div className="relative overflow-hidden border-y border-border/40 bg-background/40 backdrop-blur">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <div className="flex items-center gap-3 px-4 py-2 text-xs font-mono">
        <span className="shrink-0 px-2 py-0.5 rounded-full bg-gradient-primary text-primary-foreground tracking-widest">LIVE</span>
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-8 whitespace-nowrap animate-ticker w-max">
            {items.map((t, i) => (
              <span key={i} className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="text-primary mr-2">▸</span>{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
