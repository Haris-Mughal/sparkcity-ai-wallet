import { AppLayout } from "@/components/AppLayout";
import { acceptanceData, revenueSeries, trafficSeries } from "@/lib/mockData";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

const Analytics = () => {
  return (
    <AppLayout variant="merchant">
      <div className="container py-8 space-y-6">
        <div>
          <div className="text-xs font-mono text-primary tracking-widest">ANALYTICS</div>
          <h1 className="text-3xl md:text-4xl font-semibold mt-1">Performance insights</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-5 lg:col-span-2">
            <div className="text-xs font-mono text-muted-foreground tracking-widest">REVENUE IMPACT (LAST 7 DAYS)</div>
            <div className="text-lg font-semibold mt-1">Baseline vs AI uplift</div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={revenueSeries}>
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="baseline" stackId="a" fill="hsl(var(--neon-violet))" radius={[0,0,0,0]} />
                <Bar dataKey="uplift" stackId="a" fill="hsl(var(--neon-cyan))" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="text-xs font-mono text-muted-foreground tracking-widest">ACCEPT vs DECLINE</div>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={acceptanceData} dataKey="value" innerRadius={60} outerRadius={90} paddingAngle={4}>
                  {acceptanceData.map((d, i) => <Cell key={i} fill={d.color} stroke="transparent" />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
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

        <div className="glass rounded-2xl p-5">
          <div className="text-xs font-mono text-muted-foreground tracking-widest">BEST OFFER TIMES</div>
          <div className="text-lg font-semibold mt-1">Hourly engagement curve</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={trafficSeries}>
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Bar dataKey="accepted" fill="hsl(var(--neon-magenta))" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
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
