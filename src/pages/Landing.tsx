import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MapPin, Cloud, Zap, Shield, BarChart3, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/AppLayout";
import heroImg from "@/assets/hero-city.jpg";

const Landing = () => {
  return (
    <AppLayout variant="landing">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Futuristic neon smart city" className="h-full w-full object-cover opacity-40" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
          <div className="absolute inset-0 grid-bg opacity-50" />
        </div>

        <div className="container relative pt-20 pb-28 md:pt-28 md:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-mono mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon-lime animate-pulse" />
            LIVE · AI signals from 38 nearby merchants
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight max-w-4xl"
          >
            Your City Now <br />
            <span className="text-gradient">Works For You</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
          >
            Real-time AI offers from nearby local businesses — exactly when you need them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button asChild variant="hero" size="xl">
              <Link to="/dashboard">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/merchant">Merchant Portal</Link>
            </Button>
          </motion.div>

          {/* Floating preview cards */}
          <div className="mt-16 grid sm:grid-cols-3 gap-4 max-w-4xl">
            {[
              { icon: "☕", title: "Cold outside?", text: "Warm cappuccino · 80m · 20% off · 12 min", color: "border-neon-cyan/40" },
              { icon: "🥐", title: "Bakery surplus", text: "Combo nearby · valid 15 min", color: "border-neon-amber/40" },
              { icon: "🎬", title: "Cinema rush", text: "Burger deal before show · 320m", color: "border-neon-magenta/40" },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                className={`glass rounded-2xl p-4 border ${c.color} animate-float`}
                style={{ animationDelay: `${i * 0.6}s` }}
              >
                <div className="text-3xl mb-2">{c.icon}</div>
                <div className="font-semibold text-sm">{c.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono text-primary tracking-widest mb-3">HOW IT WORKS</div>
          <h2 className="text-3xl md:text-4xl font-semibold">A four-signal AI engine, working for you in real time.</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Cloud, title: "Live context", text: "Weather, time, events and city pulse signals.", color: "text-neon-cyan" },
            { icon: MapPin, title: "Hyper-local", text: "Distance + merchant traffic = perfect timing.", color: "text-neon-violet" },
            { icon: Brain, title: "AI matching", text: "Personalized offers tuned to your moment.", color: "text-neon-magenta" },
            { icon: Zap, title: "Instant redeem", text: "Tap, scan, save. Cashback in your wallet.", color: "text-neon-lime" },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 hover:border-primary/40 transition-colors"
            >
              <f.icon className={`h-8 w-8 ${f.color} mb-4`} />
              <div className="font-semibold mb-1">{f.title}</div>
              <div className="text-sm text-muted-foreground">{f.text}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Two audiences */}
      <section className="container pb-24">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-neon-cyan/20 blur-3xl" />
            <Sparkles className="h-8 w-8 text-neon-cyan mb-4" />
            <h3 className="text-2xl font-semibold mb-2">For citizens</h3>
            <p className="text-muted-foreground mb-6">Discover the right deal, at the right corner, at the right minute. Earn cashback automatically.</p>
            <Button asChild variant="hero"><Link to="/dashboard">Open the app</Link></Button>
          </div>
          <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-neon-magenta/20 blur-3xl" />
            <BarChart3 className="h-8 w-8 text-neon-magenta mb-4" />
            <h3 className="text-2xl font-semibold mb-2">For merchants</h3>
            <p className="text-muted-foreground mb-6">Fill quiet hours, lift revenue, and let AI design your campaigns automatically.</p>
            <Button asChild variant="glass"><Link to="/merchant">Enter the portal</Link></Button>
          </div>
        </div>
        <div className="text-center mt-10 text-xs font-mono text-muted-foreground flex items-center justify-center gap-2">
          <Shield className="h-3.5 w-3.5" /> Privacy-first · processed locally · GDPR-ready
        </div>
      </section>
    </AppLayout>
  );
};

export default Landing;
