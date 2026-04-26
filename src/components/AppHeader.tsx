import { Logo } from "./Logo";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const userLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/offers", label: "Offers" },
  { to: "/wallet", label: "Wallet" },
  { to: "/privacy", label: "Privacy" },
];
const merchantLinks = [
  { to: "/merchant", label: "Portal" },
  { to: "/merchant/controls", label: "Controls" },
  { to: "/merchant/analytics", label: "Analytics" },
];

export const AppHeader = ({ variant = "user" }: { variant?: "user" | "merchant" | "landing" }) => {
  const [open, setOpen] = useState(false);
  const links = variant === "merchant" ? merchantLinks : userLinks;

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass-strong border-b border-border/50">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Logo />
          {variant !== "landing" && (
            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className="px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground transition-colors"
                  activeClassName="!text-foreground bg-secondary/60"
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          )}
          <div className="flex items-center gap-2">
            {variant === "user" && (
              <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
                <a href="/merchant">Merchant Portal</a>
              </Button>
            )}
            {variant === "merchant" && (
              <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
                <a href="/dashboard">User App</a>
              </Button>
            )}
            {variant === "landing" && (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <a href="/merchant">Merchant Portal</a>
                </Button>
                <Button asChild variant="hero" size="sm">
                  <a href="/dashboard">Get Started</a>
                </Button>

              </>
            )}
            {variant !== "landing" && (
              <button onClick={() => setOpen((v) => !v)} className="md:hidden p-2 rounded-md hover:bg-secondary" aria-label="Menu">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>
        {open && variant !== "landing" && (
          <nav className="md:hidden border-t border-border/50 px-4 py-3 flex flex-col gap-1 animate-fade-in">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="px-3 py-2 text-sm rounded-md hover:bg-secondary" activeClassName="bg-secondary text-foreground">
                {l.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
