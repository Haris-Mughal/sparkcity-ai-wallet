import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type Msg = { from: "ai" | "user"; text: string; streaming?: boolean };

const SUGGESTIONS = [
  "Find me a coffee deal",
  "What's hot near me?",
  "Show cinema offers",
  "Why am I seeing this?",
];

const replyFor = (q: string): string => {
  const t = q.toLowerCase();
  if (t.includes("coffee") || t.includes("café") || t.includes("cafe"))
    return "Best match: Nimbus Café · 80m · 20% off cappuccino. AI confidence 94% — cold weather + lunch + low café traffic ☕";
  if (t.includes("hot") || t.includes("near"))
    return "🔥 Right now: Volt Diner combo (cinema rush) and Pulse Tea Co. 1+1 (60m, you walked past twice).";
  if (t.includes("cinema"))
    return "🎬 Cinema District is at 81% queue load. Volt Diner 30% off combo expires in 28 mins — 320m walk.";
  if (t.includes("why"))
    return "I match weather, time, location, events, merchant traffic and your history. Tap 'Why this offer?' on any card to see the exact signals.";
  if (t.includes("wallet") || t.includes("cashback"))
    return "Your wallet has $11.50 cashback. Streak: 5 days 🔥. Want to redeem on coffee?";
  return "Scanning live signals from 38 merchants… Best matches surfaced on your dashboard.";
};

export const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "ai", text: "Hi! I'm Spark — your city's AI concierge. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    const reply = replyFor(text);
    setTimeout(() => {
      setTyping(false);
      // streaming chars
      setMsgs((m) => [...m, { from: "ai", text: "", streaming: true }]);
      let i = 0;
      const tick = setInterval(() => {
        i += 2;
        setMsgs((m) => {
          const copy = [...m];
          const last = copy[copy.length - 1];
          if (last && last.streaming) {
            copy[copy.length - 1] = { ...last, text: reply.slice(0, i) };
          }
          return copy;
        });
        if (i >= reply.length) {
          clearInterval(tick);
          setMsgs((m) => {
            const copy = [...m];
            const last = copy[copy.length - 1];
            if (last && last.streaming) copy[copy.length - 1] = { ...last, streaming: false };
            return copy;
          });
        }
      }, 18);
    }, 600);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, open, typing]);

  return (
    <>
      <motion.button
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, type: "spring" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50 h-14 w-14 rounded-full bg-gradient-primary flex items-center justify-center shadow-[0_10px_40px_hsl(var(--neon-cyan)/0.5)] glow-cyan"
        aria-label="AI Assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6 text-primary-foreground" />
            </motion.div>
          ) : (
            <motion.div key="s" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
        {!open && <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-neon-lime border-2 border-background animate-pulse" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-44 md:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[480px] glass-strong rounded-2xl flex flex-col overflow-hidden neon-border"
          >
            <div className="px-4 py-3 border-b border-border/50 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">Spark AI</div>
                <div className="text-[10px] text-neon-lime font-mono flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-lime animate-pulse" /> ONLINE · LIVE SIGNALS
                </div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${m.from === "ai" ? "bg-secondary/70 rounded-tl-sm" : "ml-auto bg-gradient-primary text-primary-foreground rounded-tr-sm"}`}
                >
                  {m.text}
                  {m.streaming && <span className="inline-block w-1.5 h-3 ml-0.5 bg-primary align-middle animate-pulse" />}
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-secondary/70 rounded-2xl rounded-tl-sm px-3 py-2 inline-flex gap-1 items-center">
                  {[0, 0.15, 0.3].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${d}s` }} />
                  ))}
                </motion.div>
              )}
            </div>

            <div className="px-3 pt-2 pb-1 flex gap-2 overflow-x-auto scrollbar-none">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-border/60 hover:border-primary/60 hover:text-primary transition-colors">
                  {s}
                </button>
              ))}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-3 border-t border-border/50 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Spark…"
                className="flex-1 bg-background/60 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 border border-border/60"
              />
              <Button type="submit" variant="hero" size="icon"><Send className="h-4 w-4" /></Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
