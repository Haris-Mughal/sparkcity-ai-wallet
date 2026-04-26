import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { trafficSeries } from "@/lib/mockData";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TrendingUp, Users, Target, DollarSign } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const stats = [
  { icon: Users, label: "Customer visits", value: 342, prefix: "", suffix: "", delta: "+18%", color: "text-neon-cyan" },
  { icon: Target, label: "Acceptance rate", value: 68, suffix: "%", delta: "+6pt", color: "text-neon-violet" },
  { icon: DollarSign, label: "Revenue uplift", value: 1840, prefix: "$", delta: "+24%", color: "text-neon-lime" },
  { icon: TrendingUp, label: "Live offers", value: 7, delta: "active", color: "text-neon-magenta" },
];

const Merchant = () => {
  return (
    <AppLayout variant="merchant">
      <div className="container py-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-primary tracking-widest">MERCHANT · NIMBUS CAFÉ</div>
            <h1 className="text-3xl md:text-4xl font-semibold mt-1">Today at a glance</h1>
          </div>
          <div className="glass px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-lime animate-pulse" /> AI engine active
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-primary opacity-10 blur-2xl" />
              <s.icon className={`h-6 w-6 ${s.color} mb-2`} />
              <div className="text-xs font-mono text-muted-foreground">{s.label}</div>
              <div className="flex items-baseline gap-2 mt-1">
                <div className="text-2xl font-semibold">
                  <AnimatedCounter to={s.value} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
                </div>
                <div className="text-xs font-mono text-neon-lime">{s.delta}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs font-mono text-muted-foreground tracking-widest">TRAFFIC TODAY</div>
                <div className="text-lg font-semibold">Hourly visits vs accepted offers</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={trafficSeries}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--neon-cyan))" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="hsl(var(--neon-cyan))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--neon-magenta))" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(var(--neon-magenta))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Area dataKey="traffic" stroke="hsl(var(--neon-cyan))" fill="url(#g1)" strokeWidth={2} />
                <Area dataKey="accepted" stroke="hsl(var(--neon-magenta))" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="text-xs font-mono text-muted-foreground tracking-widest">STORE TRAFFIC</div>
            <div className="text-lg font-semibold mt-1">Quiet right now</div>
            <div className="mt-6 relative h-40">
              <svg viewBox="0 0 200 120" className="w-full h-full">
                <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="hsl(var(--secondary))" strokeWidth="14" strokeLinecap="round" />
                <motion.path
                  initial={{ strokeDasharray: "0 1000" }}
                  animate={{ strokeDasharray: "120 1000" }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  d="M20 100 A80 80 0 0 1 180 100"
                  fill="none"
                  stroke="url(#meterGrad)"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="meterGrad" x1="0" x2="1">
                    <stop offset="0%" stopColor="hsl(var(--neon-cyan))" />
                    <stop offset="100%" stopColor="hsl(var(--neon-magenta))" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-x-0 bottom-2 text-center">
                <div className="text-3xl font-semibold font-mono">28%</div>
                <div className="text-xs text-muted-foreground">capacity</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-neon-cyan font-mono">⚡ AI suggests: Coffee push to office workers</div>
          </div>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border/40 flex items-center justify-between">
            <div className="text-xs font-mono text-muted-foreground tracking-widest">TODAY'S AI-GENERATED OFFERS</div>
            <span className="text-xs font-mono text-neon-lime">7 active</span>
          </div>
          <div className="divide-y divide-border/40">
            {[
              { emoji: "☕", title: "20% off cappuccino · 12 min", views: 142, accepts: 38 },
              { emoji: "🥐", title: "Buy 2 get 1 croissant · 9 min", views: 98, accepts: 21 },
              { emoji: "🧋", title: "1+1 bubble tea · 8 min", views: 76, accepts: 18 },
            ].map((o, i) => (
              <div key={i} className="px-5 py-4 flex items-center gap-4">
                <div className="text-2xl">{o.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{o.title}</div>
                  <div className="text-xs text-muted-foreground font-mono">{o.views} views · {o.accepts} accepted</div>
                </div>
                <div className="font-mono text-xs text-neon-cyan">{Math.round((o.accepts / o.views) * 100)}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Merchant;
