import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { acceptanceData, revenueSeries, trafficSeries, signalMix } from "@/lib/mockData";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import {
  Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Line, Area,
} from "recharts";

const tooltip = { background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 };

const Analytics = () => {
  return (
    <AppLayout variant="merchant">
      <div className="container py-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-primary tracking-widest">ANALYTICS</div>
            <h1 className="text-3xl md:text-4xl font-semibold mt-1">Performance insights</h1>
          </div>
          <div className="glass px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-lime animate-pulse" /> Updated live · 2s ago
          </div>
        </div>

        {/* KPI counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Revenue uplift", value: 1840, prefix: "$", suffix: "", delta: "+24%" },
            { label: "Acceptance", value: 68, suffix: "%", delta: "+6pt" },
            { label: "Avg basket", value: 14.2, decimals: 1, prefix: "$", delta: "+9%" },
            { label: "Active offers", value: 7, delta: "live" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-primary opacity-10 blur-2xl" />
              <div className="text-xs font-mono text-muted-foreground tracking-widest">{s.label.toUpperCase()}</div>
              <div className="mt-1 text-3xl font-semibold">
                <AnimatedCounter to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <div className="text-xs font-mono text-neon-lime mt-1">{s.delta}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-xs font-mono text-muted-foreground tracking-widest">REVENUE IMPACT (LAST 7 DAYS)</div>
                <div className="text-lg font-semibold">Baseline vs AI uplift</div>
              </div>
              <div className="hidden sm:flex gap-2 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded-full border border-neon-violet/40 text-neon-violet">BASELINE</span>
                <span className="px-2 py-0.5 rounded-full border border-neon-cyan/40 text-neon-cyan">AI UPLIFT</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={revenueSeries}>
                <defs>
                  <linearGradient id="upliftGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--neon-cyan))" />
                    <stop offset="100%" stopColor="hsl(var(--neon-violet))" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltip} cursor={{ fill: "hsl(var(--secondary)/0.4)" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="baseline" stackId="a" fill="hsl(var(--neon-violet)/0.6)" />
                <Bar dataKey="uplift" stackId="a" fill="url(#upliftGrad)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="text-xs font-mono text-muted-foreground tracking-widest">ACCEPT vs DECLINE</div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={acceptanceData} dataKey="value" innerRadius={56} outerRadius={86} paddingAngle={4} stroke="transparent">
                  {acceptanceData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltip} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-1">
              {acceptanceData.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: d.color }} />{d.name}</div>
                  <div>{d.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-5 lg:col-span-2">
            <div className="text-xs font-mono text-muted-foreground tracking-widest">ENGAGEMENT vs REVENUE</div>
            <div className="text-lg font-semibold mt-1">Hourly composite curve</div>
            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart data={trafficSeries}>
                <defs>
                  <linearGradient id="trafficArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--neon-cyan))" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(var(--neon-cyan))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltip} />
                <Area dataKey="traffic" stroke="hsl(var(--neon-cyan))" fill="url(#trafficArea)" strokeWidth={2} />
                <Bar dataKey="accepted" fill="hsl(var(--neon-magenta)/0.7)" radius={[6, 6, 0, 0]} />
                <Line dataKey="revenue" stroke="hsl(var(--neon-lime))" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(var(--neon-lime))" }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="text-xs font-mono text-muted-foreground tracking-widest">AI SIGNAL MIX</div>
            <div className="text-lg font-semibold mt-1">What's driving offers</div>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={signalMix}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="signal" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <PolarRadiusAxis tick={false} stroke="transparent" domain={[0, 100]} />
                <Radar dataKey="value" stroke="hsl(var(--neon-cyan))" fill="hsl(var(--neon-cyan))" fillOpacity={0.35} strokeWidth={2} />
                <Tooltip contentStyle={tooltip} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Avg session", value: "3m 12s" },
            { label: "Returning customers", value: "47%" },
            { label: "Net Promoter", value: "72" },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl p-5">
              <div className="text-xs font-mono text-muted-foreground">{s.label.toUpperCase()}</div>
              <div className="text-2xl font-semibold mt-1">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Analytics;
