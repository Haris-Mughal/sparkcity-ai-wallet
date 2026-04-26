import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { getOffers } from "@/lib/mockData";
import { Check, ArrowLeft } from "lucide-react";

const Checkout = () => {
  const { id } = useParams();
  const offer = getOffers(0).find((o) => o.id === id) ?? getOffers(0)[0];
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {}, 0);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <AppLayout>
      <div className="container py-10 max-w-md mx-auto">
        <Link to="/offers" className="text-xs font-mono text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-4">
          <ArrowLeft className="h-3 w-3" /> Back to offers
        </Link>

        {!done ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-3xl p-6 text-center">
            <div className="text-5xl mb-2">{offer.emoji}</div>
            <h1 className="text-2xl font-semibold">{offer.title}</h1>
            <div className="text-sm text-muted-foreground">{offer.merchant} · {offer.distance}</div>
            <div className="my-6 inline-flex px-3 py-1 rounded-md bg-foreground/10 font-mono text-sm">{offer.discount}</div>

            {/* Animated QR */}
            <div className="mx-auto h-56 w-56 rounded-2xl glass p-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-neon-magenta/10" />
              <div className="relative grid grid-cols-12 grid-rows-12 gap-px h-full w-full">
                {Array.from({ length: 144 }).map((_, i) => {
                  const on = (i * 9301 + 49297) % 233280 % 3 !== 0;
                  return <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: on ? 1 : 0.05 }} transition={{ delay: i * 0.003 }} className="bg-foreground rounded-[1px]" />;
                })}
              </div>
              <motion.div
                initial={{ y: -10 }} animate={{ y: 220 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
              />
            </div>

            <div className="mt-6 text-sm text-muted-foreground">Scan at {offer.merchant} to redeem</div>
            <div className="mt-2 font-mono text-xs text-primary">TOKEN · SPK-{offer.id.toUpperCase()}-{(Math.random() * 9999 | 0).toString().padStart(4, "0")}</div>
            <Button onClick={() => setDone(true)} variant="hero" size="lg" className="w-full mt-6">Mark as redeemed</Button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass-strong rounded-3xl p-8 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="mx-auto h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center glow-cyan">
              <Check className="h-10 w-10 text-primary-foreground" strokeWidth={3} />
            </motion.div>
            <h1 className="text-2xl font-semibold mt-6">Cashback credited</h1>
            <p className="text-muted-foreground mt-1">Your wallet balance just got better.</p>
            <div className="mt-6 text-4xl font-semibold text-gradient">+ $1.20</div>
            <div className="mt-8 flex gap-2">
              <Button asChild variant="glass" className="flex-1"><Link to="/wallet">Open wallet</Link></Button>
              <Button asChild variant="hero" className="flex-1"><Link to="/offers">More offers</Link></Button>
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default Checkout;
