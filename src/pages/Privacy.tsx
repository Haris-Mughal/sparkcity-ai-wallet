import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { Shield, Lock, Eye, Database, ToggleRight } from "lucide-react";

const Privacy = () => {
  return (
    <AppLayout>
      <div className="container py-10 max-w-3xl space-y-8">
        <div>
          <div className="text-xs font-mono text-primary tracking-widest">PRIVACY</div>
          <h1 className="text-3xl md:text-4xl font-semibold mt-1">You stay in control</h1>
          <p className="text-muted-foreground mt-3">SparkCity is built privacy-first. Your raw location never leaves your device. Only anonymous intent signals power the matching engine.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Lock, title: "Processed locally", text: "Location preferences are computed on your device — not in the cloud." },
            { icon: Eye, title: "Anonymous signals", text: "Only intent vectors (e.g. 'cold + walking') are shared with merchants." },
            { icon: Database, title: "Minimal storage", text: "We retain redemption history only — never raw movement data." },
            { icon: Shield, title: "GDPR-ready", text: "Export or delete your data at any time, with one tap." },
          ].map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-5">
              <c.icon className="h-6 w-6 text-primary mb-3" />
              <div className="font-semibold">{c.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{c.text}</div>
            </motion.div>
          ))}
        </div>

        <div className="glass-strong rounded-2xl divide-y divide-border/40">
          {[
            { label: "Share anonymous intent signals", on: true },
            { label: "Allow location-based offers", on: true },
            { label: "Personalize via merchant data", on: false },
            { label: "Marketing communications", on: false },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <div className="text-sm">{s.label}</div>
              <div className={`h-6 w-11 rounded-full flex items-center px-1 transition-colors ${s.on ? "bg-gradient-primary justify-end" : "bg-secondary justify-start"}`}>
                <div className="h-4 w-4 rounded-full bg-background" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs font-mono text-muted-foreground flex items-center justify-center gap-2">
          <ToggleRight className="h-3.5 w-3.5" /> All preferences saved locally · GDPR compliant
        </div>
      </div>
    </AppLayout>
  );
};

export default Privacy;
