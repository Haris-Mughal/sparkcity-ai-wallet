import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { weatherStates } from "@/lib/mockData";

export const WeatherWidget = ({ index = 0 }: { index?: number }) => {
  const [i, setI] = useState(index);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % weatherStates.length), 6000);
    return () => clearInterval(t);
  }, []);
  const w = weatherStates[i];
  return (
    <div className="glass rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute -top-8 -right-8 text-7xl opacity-20">{w.icon}</div>
      <div className="text-xs font-mono text-muted-foreground tracking-widest">WEATHER</div>
      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2">
        <div className="flex items-end gap-2">
          <div className="text-4xl font-semibold">{w.temp}°</div>
          <div className="text-2xl mb-1">{w.icon}</div>
        </div>
        <div className="text-sm text-muted-foreground">{w.label}</div>
        <div className="mt-3 text-xs text-primary font-mono">{w.mood}</div>
      </motion.div>
    </div>
  );
};

export const ClockWidget = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return (
    <div className="glass rounded-2xl p-5 relative overflow-hidden">
      <div className="text-xs font-mono text-muted-foreground tracking-widest">LOCAL TIME</div>
      <div className="mt-2 text-4xl font-semibold font-mono tabular-nums">{time}</div>
      <div className="text-sm text-muted-foreground">{now.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })}</div>
      <div className="mt-3 text-xs text-neon-violet font-mono">⚡ Lunch window active</div>
    </div>
  );
};
