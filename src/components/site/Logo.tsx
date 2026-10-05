import { Link } from "@tanstack/react-router";

/**
 * The NM monogram tile.
 *
 * This is the same artwork every icon in `public/` is generated from, so the
 * header, the browser tab and the Google search result all show one mark
 * instead of three drifting approximations of it. 192px is the smallest render
 * that still covers a 36px tile on a 3x display.
 *
 * The mark keeps its own dark-green background rather than being cut out to
 * transparency. The site ships a dark and a light theme, and a mark keyed off
 * its backdrop would have to sit on near-black olive and on cream — the tile
 * does both without a second asset. It is rounded in CSS rather than baked into
 * the file for the same reason: the identical PNG is the iOS home-screen icon,
 * where iOS applies its own mask and a pre-rounded one would double up.
 *
 * The faint ring is only there for the dark theme, where a dark tile on a
 * near-black header would otherwise have no defined edge. At 10% white it is
 * invisible against the cream of the light theme.
 */
export function LogoMark() {
  return (
    <img
      src="/icon-192.png"
      alt=""
      width={36}
      height={36}
      className="h-9 w-9 shrink-0 rounded-xl ring-1 ring-white/10"
    />
  );
}

/**
 * The mark plus the wordmark, linked home.
 *
 * The image carries `alt=""` on purpose: the wordmark beside it already reads
 * "NovaMind AI", so alt text here would announce the brand twice to a screen
 * reader. `width`/`height` are set so the header does not reflow once the PNG
 * arrives.
 */
export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <LogoMark />
      <span className="font-display text-lg font-bold tracking-tight">
        NovaMind <span className="text-primary">AI</span>
      </span>
    </Link>
  );
}
