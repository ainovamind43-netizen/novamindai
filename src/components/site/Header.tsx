import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

/**
 * The nav points at the real routes, not at the home page's section anchors.
 * /services, /about and /contact are full pages with their own copy and
 * metadata, and the header is the strongest internal link on the site — sending
 * it to "#services" left those pages reachable only from the footer, and made
 * the active state wrong for anyone standing on one of them.
 */
type NavLink = {
  label: string;
  to: "/" | "/services" | "/about" | "/contact";
  /** Only Home highlights on an exact match; the rest stay lit on sub-paths. */
  exact?: boolean;
};

const links: readonly NavLink[] = [
  { label: "Home", to: "/", exact: true },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
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
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary text-sm font-semibold" }}
              activeOptions={{ exact: l.exact ?? false }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link to="/contact" className="btn-primary">
            Get a Free Audit
          </Link>
        </div>

        {/* The toggle sits outside the menu rather than inside it, so the theme
            can be changed without opening the nav first. */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-border md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                activeProps={{
                  className: "rounded-lg px-2 py-2.5 text-sm font-semibold text-primary",
                }}
                activeOptions={{ exact: l.exact ?? false }}
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
