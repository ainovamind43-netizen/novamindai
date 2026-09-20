import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";

interface Interactive3DCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

/**
 * Lazily created and cached: this is read on every pointer move across a grid
 * of these cards, and matchMedia is not free. Motion here is a pointer-driven
 * tilt rather than autoplaying animation, so the global reduced-motion rule in
 * styles.css does not cover it.
 */
let reducedMotionQuery: MediaQueryList | null = null;
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  reducedMotionQuery ??= window.matchMedia("(prefers-reduced-motion: reduce)");
  return reducedMotionQuery.matches;
}

export function Interactive3DCard({
  children,
  className = "",
  intensity = 15,
}: Interactive3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  // Pointer moves fire several times per frame; the transform is only worth
  // recomputing once per frame, so the latest position is parked here and
  // drained by the animation frame below.
  const pointer = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const paint = () => {
    frame.current = null;
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    // Measured at paint time rather than cached on enter, so a card that has
    // scrolled or reflowed since the pointer landed still tilts correctly.
    const rect = card.getBoundingClientRect();
    const x = pointer.current.x - rect.left;
    const y = pointer.current.y - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    card.style.setProperty("--rotate-x", `${((y - centerY) / centerY) * -intensity}deg`);
    card.style.setProperty("--rotate-y", `${((x - centerX) / centerX) * intensity}deg`);

    glare.style.setProperty("--glare-x", `${(x / rect.width) * 100}%`);
    glare.style.setProperty("--glare-y", `${(y / rect.height) * 100}%`);
    glare.style.setProperty("opacity", "0.6");
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;

    pointer.current = { x: e.clientX, y: e.clientY };
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(paint);
  };

  const handleMouseLeave = () => {
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    cardRef.current?.style.setProperty("--rotate-x", "0deg");
    cardRef.current?.style.setProperty("--rotate-y", "0deg");
    glareRef.current?.style.setProperty("opacity", "0");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`interactive-3d-card relative transition-transform duration-100 ease-out will-change-transform ${className}`}
      style={{
        transform:
          "perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-150"
        style={{
          background: `radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.15) 0%, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}
