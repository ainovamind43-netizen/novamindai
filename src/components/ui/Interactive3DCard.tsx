import { useRef, type ReactNode, type MouseEvent } from "react";

interface Interactive3DCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function Interactive3DCard({
  children,
  className = "",
  intensity = 15,
}: Interactive3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glareRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    cardRef.current.style.setProperty("--rotate-x", `${rotateX}deg`);
    cardRef.current.style.setProperty("--rotate-y", `${rotateY}deg`);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    glareRef.current.style.setProperty("--glare-x", `${glareX}%`);
    glareRef.current.style.setProperty("--glare-y", `${glareY}%`);
    glareRef.current.style.setProperty("opacity", "0.6");
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glareRef.current) return;

    cardRef.current.style.setProperty("--rotate-x", "0deg");
    cardRef.current.style.setProperty("--rotate-y", "0deg");
    glareRef.current.style.setProperty("opacity", "0");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`interactive-3d-card relative transition-transform duration-100 ease-out will-change-transform ${className}`}
      style={{
        transform: "perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))",
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
