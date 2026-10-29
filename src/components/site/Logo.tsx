import Link from "next/link";
import Image from "next/image";

/**
 * The NM monogram tile.
 *
 * This is the same artwork every icon in `public/` is generated from, so the
 * header, the browser tab and the Google search result all show one mark
 * instead of three drifting approximations of it. 192px is the smallest render
 * that still covers a 36px tile on a 3x display.
 */
export function LogoMark() {
  return (
    <Image
      src="/icon-192.png"
      alt=""
      width={36}
      height={36}
      className="h-9 w-9 shrink-0 rounded-xl ring-1 ring-white/10"
      priority
    />
  );
}

/**
 * The mark plus the wordmark, linked home.
 */
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <LogoMark />
      <span className="font-display text-lg font-bold tracking-tight">
        NovaMind <span className="text-primary">AI</span>
      </span>
    </Link>
  );
}
