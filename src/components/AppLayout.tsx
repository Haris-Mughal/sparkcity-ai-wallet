import { AppHeader } from "./AppHeader";
import { AIAssistant } from "./AIAssistant";
import { MobileNav } from "./MobileNav";
import { ReactNode } from "react";

export const AppLayout = ({ children, variant = "user" }: { children: ReactNode; variant?: "user" | "merchant" | "landing" }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Ambient aurora background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-mesh opacity-60" />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-10%,hsl(180_100%_55%/0.18),transparent_60%)]" />

      <AppHeader variant={variant} />
      <main className={`flex-1 ${variant !== "landing" ? "pb-24 md:pb-0" : ""}`}>{children}</main>
      <footer className="border-t border-border/40 mt-16">
        <div className="container py-8 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-3">
          <div>© {new Date().getFullYear()} SparkCity Wallet — Your city, intelligent.</div>
          <div className="font-mono">v1.0 · prototype</div>
        </div>
      </footer>
      <AIAssistant />
      <MobileNav variant={variant} />
    </div>
  );
};
