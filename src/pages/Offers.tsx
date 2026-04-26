import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { OfferCard } from "@/components/OfferCard";
import { Button } from "@/components/ui/button";
import { getOffers } from "@/lib/mockData";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

const FILTERS = ["All", "Coffee", "Food", "Bakery", "Cinema", "Fitness"] as const;

const Offers = () => {
  const [seed, setSeed] = useState(2);
  const [filter, setFilter] = useState<typeof FILTERS[number]>("All");
  const offers = useMemo(() => getOffers(seed), [seed]);
  const visible = offers.filter((o) => filter === "All" || o.category.toLowerCase() === filter.toLowerCase());

  return (
    <AppLayout>
      <div className="container py-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-primary tracking-widest">FEED</div>
            <h1 className="text-3xl md:text-4xl font-semibold mt-1">Live AI offers</h1>
          </div>
          <Button onClick={() => { setSeed((s) => s + 1); toast.success("New offers generated"); }} variant="hero">
            <RefreshCw className="mr-1 h-4 w-4" /> Refresh AI Offers
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${filter === f ? "bg-gradient-primary text-primary-foreground border-transparent" : "border-border/60 text-muted-foreground hover:text-foreground"}`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visible.map((o, i) => (
            <OfferCard key={o.id} offer={o} index={i} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Offers;
