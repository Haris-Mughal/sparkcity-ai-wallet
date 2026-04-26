import { NavLink as RouterNavLink } from "react-router-dom";
import { Home, Sparkles, Wallet, Shield, BarChart3, Settings, Store } from "lucide-react";

const userItems = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/offers", icon: Sparkles, label: "Offers" },
  { to: "/wallet", icon: Wallet, label: "Wallet" },
  { to: "/privacy", icon: Shield, label: "Privacy" },
];

const merchantItems = [
  { to: "/merchant", icon: Store, label: "Portal" },
  { to: "/merchant/controls", icon: Settings, label: "Controls" },
  { to: "/merchant/analytics", icon: BarChart3, label: "Analytics" },
];

export const MobileNav = ({ variant = "user" }: { variant?: "user" | "merchant" | "landing" }) => {
  if (variant === "landing") return null;
  const items = variant === "merchant" ? merchantItems : userItems;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-3 mb-3 glass-strong rounded-2xl border border-border/60 px-2 py-1.5 flex items-center justify-around">
        {items.map((it) => (
          <RouterNavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-mono transition-all ${
                isActive
                  ? "text-primary-foreground bg-gradient-primary shadow-[0_4px_20px_-4px_hsl(var(--neon-cyan)/0.6)]"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <it.icon className="h-4 w-4" />
            <span>{it.label}</span>
          </RouterNavLink>
        ))}
      </div>
    </nav>
  );
};
