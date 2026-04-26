import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { OfferCard } from "@/components/OfferCard";
import { Button } from "@/components/ui/button";
import { getOffers, type Offer } from "@/lib/mockData";
import { RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { LiveTicker } from "@/components/LiveTicker";

const FILTERS = ["All", "Coffee", "Food", "Bakery", "Cinema", "Fitness"] as const;

const Offers = () => {
  const [seed, setSeed] = useState(2);
  const [filter, setFilter] = useState<typeof FILTERS[number]>("All");
  const [dismissed, setDismissed] = useState<string[]>([]);
  const offers = useMemo(() => getOffers(seed), [seed]);
  const visible: Offer[] = offers.filter(
    (o) => !dismissed.includes(o.id) && (filter === "All" || o.category.toLowerCase() === filter.toLowerCase()),
  );

  return (
    <AppLayout>
      <LiveTicker />
      <div className="container py-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-primary tracking-widest">FEED</div>
            <h1 className="text-3xl md:text-4xl font-semibold mt-1">Live AI offers</h1>
          </div>
          <Button onClick={() => { setSeed((s) => s + 1); setDismissed([]); toast.success("New offers generated", { description: "Re-scanned 38 nearby merchants" }); }} variant="hero">
            <RefreshCw className="mr-1 h-4 w-4" /> Refresh AI Offers
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap overflow-x-auto scrollbar-none -mx-1 px-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${filter === f ? "bg-gradient-primary text-primary-foreground border-transparent shadow-[0_4px_18px_-4px_hsl(var(--neon-cyan)/0.6)]" : "border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40"}`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((o, i) => (
              <OfferCard key={o.id} offer={o} index={i} onDismiss={(x) => setDismissed((d) => [...d, x.id])} />
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-10 text-center">
            <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="font-semibold">No offers in this category right now</div>
            <div className="text-sm text-muted-foreground mt-1">Try another filter or refresh the AI feed.</div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default Offers;
