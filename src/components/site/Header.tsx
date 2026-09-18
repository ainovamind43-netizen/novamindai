import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// The section anchors all live on the home route. Putting "#services" in `to`
// makes the router treat it as a literal path, so nothing ever scrolls — the
// hash has to be a separate option.
type NavLink = {
  label: string;
  to: "/";
  hash?: string;
  exact?: boolean;
};

const links: readonly NavLink[] = [
  { label: "Home", to: "/", exact: true },
  { label: "Services", to: "/", hash: "services" },
  { label: "About", to: "/", hash: "about" },
  { label: "Contact", to: "/", hash: "contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-gold)] font-display text-base font-bold text-primary-foreground">
            N
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            NovaMind <span className="text-primary">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              {...(l.hash ? { hash: l.hash } : {})}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary text-sm font-semibold" }}
              activeOptions={{ exact: l.exact ?? false, includeHash: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/contact" className="btn-primary">
            Get a Free Audit
          </Link>
        </div>

        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                {...(l.hash ? { hash: l.hash } : {})}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-3">
              Get a Free Audit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
