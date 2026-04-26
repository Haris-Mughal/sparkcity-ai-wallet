import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { RefreshCw, Brain } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { WeatherWidget, ClockWidget } from "@/components/ContextWidgets";
import { CityMap } from "@/components/CityMap";
import { OfferCard } from "@/components/OfferCard";
import { Button } from "@/components/ui/button";
import { getOffers } from "@/lib/mockData";
import { toast } from "sonner";

const Dashboard = () => {
  const [seed, setSeed] = useState(1);
  const offers = useMemo(() => getOffers(seed), [seed]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visible = offers.filter((o) => !dismissed.includes(o.id));

  const refresh = () => {
    setSeed((s) => s + 1);
    setDismissed([]);
    toast.success("AI offers refreshed", { description: "Re-scanned 38 nearby merchants" });
  };

  return (
    <AppLayout>
      <div className="container py-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-primary tracking-widest">YOUR CITY · DOWNTOWN</div>
            <h1 className="text-3xl md:text-4xl font-semibold mt-1">Hello, Alex 👋</h1>
          </div>
          <Button onClick={refresh} variant="hero" size="lg">
            <RefreshCw className="mr-1 h-4 w-4" /> Refresh AI Offers
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4">
          <WeatherWidget />
          <ClockWidget />
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-primary opacity-20 blur-2xl" />
            <div className="text-xs font-mono text-muted-foreground tracking-widest flex items-center gap-2"><Brain className="h-3 w-3" /> AI CONTEXT</div>
            <div className="mt-2 font-semibold leading-snug">Cold weather + lunch break + nearby café quiet</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["cold", "lunch", "low-traffic", "walking"].map((t) => (
                <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-primary/40 text-primary">#{t}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2"><CityMap /></div>
          <div className="glass rounded-2xl p-5 space-y-3">
            <div className="text-xs font-mono text-muted-foreground tracking-widest">CITY PULSE</div>
            {[
              { label: "Foot traffic", value: 62, color: "from-neon-cyan to-neon-violet" },
              { label: "Cafés capacity", value: 28, color: "from-neon-lime to-neon-cyan" },
              { label: "Cinema queue", value: 81, color: "from-neon-magenta to-neon-violet" },
              { label: "Event proximity", value: 44, color: "from-neon-amber to-neon-magenta" },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-xs mb-1"><span>{m.label}</span><span className="font-mono text-muted-foreground">{m.value}%</span></div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${m.value}%` }} transition={{ duration: 1, ease: "easeOut" }} className={`h-full bg-gradient-to-r ${m.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Personalized for you · right now</h2>
            <span className="text-xs font-mono text-muted-foreground">{visible.length} live offers</span>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {visible.map((o, i) => (
              <OfferCard key={o.id} offer={o} index={i} onDismiss={(x) => setDismissed((d) => [...d, x.id])} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
