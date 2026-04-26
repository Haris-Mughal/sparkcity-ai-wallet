import { motion } from "framer-motion";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";

const GOALS = [
  { id: "quiet", label: "Fill quiet hours", emoji: "🌙" },
  { id: "lunch", label: "Increase lunch traffic", emoji: "🍽️" },
  { id: "promote", label: "Promote new item", emoji: "✨" },
  { id: "weekend", label: "Boost weekends", emoji: "🎉" },
];

const MerchantControls = () => {
  const [goal, setGoal] = useState("quiet");
  const [discount, setDiscount] = useState(20);
  const [duration, setDuration] = useState(15);
  const [budget, setBudget] = useState(50);
  const [generating, setGenerating] = useState(false);
  const [campaign, setCampaign] = useState<{ title: string; copy: string; offer: string } | null>(null);

  const generate = () => {
    setGenerating(true);
    setCampaign(null);
    setTimeout(() => {
      const goalLabel = GOALS.find((g) => g.id === goal)?.label ?? "";
      const copies = [
        { title: `Smart push · ${goalLabel}`, copy: `Cold afternoon detected. Push warm drinks to walk-by office workers within 200m.`, offer: `${discount}% off any hot drink · valid ${duration} min` },
        { title: `Lunch surge play`, copy: `Predicted demand spike at 12:40. Pre-empt with combo deal targeting hungry intent signals.`, offer: `Combo at -${discount}% · valid ${duration} min` },
        { title: `Discovery boost`, copy: `Promote new item to first-time visitors with high curiosity scores nearby.`, offer: `${discount}% off new item · ${duration} min` },
      ];
      setCampaign(copies[Math.floor(Math.random() * copies.length)]);
      setGenerating(false);
      toast.success("AI campaign ready");
    }, 1200);
  };

  return (
    <AppLayout variant="merchant">
      <div className="container py-8 grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <div className="text-xs font-mono text-primary tracking-widest">CONTROLS</div>
            <h1 className="text-3xl md:text-4xl font-semibold mt-1">Tell AI your goal</h1>
            <p className="text-muted-foreground mt-2 text-sm">Set a few intents and let SparkCity generate the campaign for you.</p>
          </div>

          <div className="glass rounded-2xl p-5 space-y-4">
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-2">GOAL</div>
              <div className="grid grid-cols-2 gap-2">
                {GOALS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`text-left p-3 rounded-xl border transition-all ${goal === g.id ? "bg-gradient-primary text-primary-foreground border-transparent" : "border-border/60 hover:border-primary/40"}`}
                  >
                    <div className="text-xl">{g.emoji}</div>
                    <div className="text-sm font-medium mt-1">{g.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {[
              { label: "Max discount", value: discount, set: setDiscount, min: 5, max: 50, suffix: "%" },
              { label: "Offer duration", value: duration, set: setDuration, min: 5, max: 60, suffix: " min" },
              { label: "Daily budget", value: budget, set: setBudget, min: 10, max: 500, suffix: " $" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground font-mono">{s.label.toUpperCase()}</span>
                  <span className="font-mono text-primary">{s.value}{s.suffix}</span>
                </div>
                <input
                  type="range" min={s.min} max={s.max} value={s.value}
                  onChange={(e) => s.set(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            ))}
          </div>

          <Button onClick={generate} disabled={generating} variant="hero" size="xl" className="w-full">
            <Sparkles className="mr-1 h-4 w-4" />
            {generating ? "Generating with AI…" : "Generate campaign"}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="text-xs font-mono text-muted-foreground tracking-widest">PREVIEW</div>
          <div className="glass-strong rounded-3xl p-6 min-h-[300px] relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
            {generating && (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 w-1/3 bg-secondary rounded" />
                <div className="h-6 w-2/3 bg-secondary rounded" />
                <div className="h-20 w-full bg-secondary rounded-xl" />
              </div>
            )}
            {!generating && !campaign && (
              <div className="text-center text-muted-foreground py-16">
                <Zap className="h-10 w-10 mx-auto text-primary/60 mb-3 animate-float" />
                Your AI-generated campaign will appear here.
              </div>
            )}
            {campaign && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="text-xs font-mono text-neon-lime">✓ READY TO LAUNCH</div>
                <h3 className="text-xl font-semibold mt-1">{campaign.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{campaign.copy}</p>
                <div className="mt-4 p-4 rounded-xl border border-primary/40 bg-primary/5">
                  <div className="text-xs font-mono text-muted-foreground">OFFER</div>
                  <div className="font-semibold mt-1">{campaign.offer}</div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-mono text-center">
                  <div className="glass rounded-lg p-2"><div className="text-muted-foreground">REACH</div><div className="text-foreground">~ 280</div></div>
                  <div className="glass rounded-lg p-2"><div className="text-muted-foreground">UPLIFT</div><div className="text-neon-lime">+22%</div></div>
                  <div className="glass rounded-lg p-2"><div className="text-muted-foreground">SPEND</div><div className="text-foreground">${budget}</div></div>
                </div>
                <Button variant="hero" className="w-full mt-4" onClick={() => toast.success("Campaign launched")}>Launch campaign</Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MerchantControls;
