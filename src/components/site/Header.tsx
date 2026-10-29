'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

type NavLink = {
  label: string;
  href: string;
  exact?: boolean;
};

const links: readonly NavLink[] = [
  { label: "Home", href: "/", exact: true },
  { label: "Services", href: "/services" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {links.map((l) => {
            const isActive = l.exact 
              ? pathname === l.href 
              : pathname === l.href || pathname.startsWith(`${l.href}/`);
            
            return (
              <Link
                key={l.label}
                href={l.href}
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <div className="hidden lg:block">
            <Link href="/contact" className="btn-primary">
              Get a Free Audit
            </Link>
          </div>
        </div>

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
            {links.map((l) => {
              const isActive = l.exact 
                ? pathname === l.href 
                : pathname === l.href || pathname.startsWith(`${l.href}/`);

              return (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-2 py-2.5 text-sm transition-colors hover:bg-secondary hover:text-foreground",
                    isActive ? "font-semibold text-primary" : "text-muted-foreground"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-3">
              Get a Free Audit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
