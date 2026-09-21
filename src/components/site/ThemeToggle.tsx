import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

/**
 * Switches between the dark theme and the light one.
 *
 * Both icons are always rendered and the `light:` variant decides which is
 * visible. That matters more than it looks: the theme is applied by an inline
 * script before first paint, so a component that read the theme into state
 * would paint the wrong icon on the first frame and swap it after hydration.
 * Here the CSS picks the icon, and the correct one is on screen immediately.
 *
 * The label is deliberately static. "Toggle dark or light mode" is accurate in
 * both states, so there is no state-dependent string to go stale.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark or light mode"
      title="Toggle dark or light mode"
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary ${className}`}
    >
      <Moon className="h-4 w-4 light:hidden" aria-hidden="true" />
      <Sun className="hidden h-4 w-4 light:block" aria-hidden="true" />
    </button>
  );
}
