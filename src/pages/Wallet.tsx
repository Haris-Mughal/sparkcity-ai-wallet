import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { walletHistory } from "@/lib/mockData";
import { TrendingUp, Wallet as WalletIcon, Gift } from "lucide-react";

const Wallet = () => {
  const balance = walletHistory.reduce((s, w) => s + w.amount, 0);
  return (
    <AppLayout>
      <div className="container py-8 space-y-6">
        <div>
          <div className="text-xs font-mono text-primary tracking-widest">WALLET</div>
          <h1 className="text-3xl md:text-4xl font-semibold mt-1">Your savings</h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-neon-cyan/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-neon-magenta/20 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-muted-foreground tracking-widest">CASHBACK BALANCE</div>
              <div className="mt-2 text-5xl md:text-6xl font-semibold text-gradient">${balance.toFixed(2)}</div>
              <div className="mt-2 text-sm text-muted-foreground">Earned across {walletHistory.length} redeemed offers</div>
            </div>
            <div className="flex gap-3 font-mono text-xs">
              <div className="glass px-3 py-2 rounded-lg"><span className="text-muted-foreground">THIS WEEK</span><div className="text-base text-foreground">+ $7.40</div></div>
              <div className="glass px-3 py-2 rounded-lg"><span className="text-muted-foreground">STREAK</span><div className="text-base text-neon-lime">5 days 🔥</div></div>
            </div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: TrendingUp, label: "Avg saving", value: "$2.87", color: "text-neon-cyan" },
            { icon: WalletIcon, label: "Lifetime", value: "$84.20", color: "text-neon-violet" },
            { icon: Gift, label: "Rewards", value: "12 unlocked", color: "text-neon-magenta" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-5">
              <s.icon className={`h-6 w-6 ${s.color} mb-2`} />
              <div className="text-xs font-mono text-muted-foreground">{s.label}</div>
              <div className="text-xl font-semibold mt-1">{s.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border/40 text-xs font-mono text-muted-foreground tracking-widest">REDEMPTION HISTORY</div>
          <div className="divide-y divide-border/40">
            {walletHistory.map((h) => (
              <div key={h.id} className="px-5 py-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors">
                <div className="h-10 w-10 rounded-xl glass flex items-center justify-center text-xl">{h.emoji}</div>
                <div className="flex-1">
                  <div className="font-medium">{h.merchant}</div>
                  <div className="text-xs text-muted-foreground font-mono">{h.date}</div>
                </div>
                <div className="font-mono text-neon-lime">+ ${h.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Wallet;
