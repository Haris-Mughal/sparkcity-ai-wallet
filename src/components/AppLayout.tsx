import { AppHeader } from "./AppHeader";
import { AIAssistant } from "./AIAssistant";
import { ReactNode } from "react";

export const AppLayout = ({ children, variant = "user" }: { children: ReactNode; variant?: "user" | "merchant" | "landing" }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader variant={variant} />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/40 mt-16">
        <div className="container py-8 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-3">
          <div>© {new Date().getFullYear()} SparkCity Wallet — Your city, intelligent.</div>
          <div className="font-mono">v1.0 · prototype</div>
        </div>
      </footer>
      <AIAssistant />
    </div>
  );
};
