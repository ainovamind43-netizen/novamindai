import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
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
  to: "/" | "/services" | "/reviews" | "/about" | "/contact";
  /** Only Home highlights on an exact match; the rest stay lit on sub-paths. */
  exact?: boolean;
};

/**
 * Reviews sits between Services and About, which is where a visitor decides
 * whether to believe the services page.
 *
 * It was held out of this row on purpose until the table behind it existed. The
 * page and its server functions were live the whole time; linking them while the
 * database was unconnected would only have sent visitors to a form whose one
 * possible answer was "reviews are not being saved yet". If the reviews table is
 * ever dropped again, take this entry back out with it.
 */
const links: readonly NavLink[] = [
  { label: "Home", to: "/", exact: true },
  { label: "Services", to: "/services" },
  { label: "Reviews", to: "/reviews" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo />

        {/* gap-6 rather than gap-8 between md and lg: it was tuned for a five-link
            row, which is what this is again now Reviews is back in it. Widening
            it back is a 768px judgement, not a code one. */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
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
          {/* Wrapped rather than given `hidden lg:inline-flex` directly: the
              btn-primary utility sets its own display, and two display
              utilities on one element resolve by source order rather than by
              intent. */}
          <div className="hidden lg:block">
            <Link to="/contact" className="btn-primary">
              Get a Free Audit
            </Link>
          </div>
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
