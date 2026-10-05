import { useEffect, useRef, useState, type ReactNode } from "react";

type Segment = {
  /** "x" runs left→right across a row; "y" runs top→bottom down a stacked column. */
  axis: "x" | "y";
  /** For "x": the left edge of the gap. For "y": the horizontal centre of the card. */
  left: number;
  /** For "x": the vertical centre of the row. For "y": the top edge of the gap. */
  top: number;
  /** For "x": the width of the gap. For "y": the height of the gap. */
  length: number;
};

/**
 * Wraps a CSS grid and draws an animated dashed connector through every gap
 * between neighbouring cards, with glowing dots running the length of each
 * line. Grid classes are passed straight through, so the layout is untouched —
 * the connectors live inside the gaps and never intercept clicks.
 *
 * Side-by-side cards get horizontal lines. When the grid collapses to a single
 * column (mobile), stacked cards get vertical lines instead, so the effect
 * survives every breakpoint.
 */
export function CardConnectors({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // offsetTop/offsetLeft rather than getBoundingClientRect, so the reading is
    // unaffected by the translateY the Reveal wrapper is still animating.
    const measure = () => {
      const boxes = Array.from(grid.children).map((child) => {
        const el = child as HTMLElement;
        return {
          left: el.offsetLeft,
          right: el.offsetLeft + el.offsetWidth,
          top: el.offsetTop,
          bottom: el.offsetTop + el.offsetHeight,
          cx: el.offsetLeft + el.offsetWidth / 2,
        };
      });
      if (boxes.length < 2) return setSegments([]);

      // Cards whose vertical spans overlap share a grid row.
      const rows: (typeof boxes)[] = [];
      for (const box of [...boxes].sort((a, b) => a.top - b.top)) {
        const row = rows.find((r) => r.some((b) => b.bottom > box.top && b.top < box.bottom));
        if (row) row.push(box);
        else rows.push([box]);
      }

      // Every row holding a single card means the grid is stacked, not gridded.
      const stacked = rows.every((r) => r.length === 1);

      const next: Segment[] = [];
      if (stacked) {
        for (let i = 1; i < rows.length; i++) {
          const prev = rows[i - 1]?.[0];
          const curr = rows[i]?.[0];
          if (!prev || !curr) continue;
          const length = curr.top - prev.bottom;
          if (length < 8) continue;
          next.push({ axis: "y", left: prev.cx, top: prev.bottom, length });
        }
      } else {
        for (const row of rows) {
          const ordered = [...row].sort((a, b) => a.left - b.left);
          for (let i = 1; i < ordered.length; i++) {
            const prev = ordered[i - 1];
            const curr = ordered[i];
            if (!prev || !curr) continue;
            const length = curr.left - prev.right;
            // A gap this small means the columns are stacked, not side by side.
            if (length < 8) continue;
            next.push({
              axis: "x",
              left: prev.right,
              top: (prev.top + prev.bottom) / 2,
              length,
            });
          }
        }
      }
      setSegments(next);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    Array.from(grid.children).forEach((child) => observer.observe(child));

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.1 },
    );
    io.observe(grid);

    window.addEventListener("resize", measure);
    // Web fonts and images settle after first paint and nudge the rows.
    const settle = [200, 600, 1200].map((ms) => window.setTimeout(measure, ms));

    return () => {
      observer.disconnect();
      io.disconnect();
      window.removeEventListener("resize", measure);
      settle.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <div className="relative">
      <div ref={gridRef} className={className}>
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {segments.map((s, i) => {
          const vertical = s.axis === "y";
          return (
            <span
              key={`${s.axis}-${s.left}-${s.top}-${s.length}`}
              className={vertical ? "card-connector-v" : "card-connector"}
              style={
                vertical
                  ? { left: s.left, top: s.top, height: s.length }
                  : { left: s.left, top: s.top, width: s.length }
              }
            >
              {[0, 1200].map((offset) => (
                <span
                  key={offset}
                  className={vertical ? "card-connector-dot-v" : "card-connector-dot"}
                  style={{ animationDelay: `${(i % 4) * 600 + offset}ms` }}
                />
              ))}
            </span>
          );
        })}
      </div>
    </div>
  );
}
