import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";

type Rgb = [number, number, number];

/**
 * Resolve any CSS colour — oklch included — to an [r, g, b] triple.
 *
 * A canvas is the only place the browser will hand back a resolved colour, so
 * we set a sentinel, assign the value, and read back what stuck: if the
 * sentinel survives, the value did not parse and we keep the fallback.
 */
function toRgb(value: string, fallback: Rgb): Rgb {
  const probe = document.createElement("canvas").getContext("2d");
  if (!probe) return fallback;
  probe.fillStyle = "#123456";
  probe.fillStyle = value;
  const out = probe.fillStyle;
  if (out === "#123456") return fallback;

  const hex = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(out);
  const r = hex?.[1];
  const g = hex?.[2];
  const b = hex?.[3];
  if (r && g && b) {
    return [Number.parseInt(r, 16), Number.parseInt(g, 16), Number.parseInt(b, 16)];
  }

  const rgb = /^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(out);
  const rr = rgb?.[1];
  const gg = rgb?.[2];
  const bb = rgb?.[3];
  if (rr && gg && bb) return [Number(rr), Number(gg), Number(bb)];

  return fallback;
}

function token(name: string, fallback: Rgb): Rgb {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name);
  return raw ? toRgb(raw.trim(), fallback) : fallback;
}

function rgba(c: Rgb, alpha: number) {
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
}

/** Pull a colour toward white — the white-hot centre of a spark. */
function lighten(c: Rgb, amount: number): Rgb {
  return [
    Math.round(c[0] + (255 - c[0]) * amount),
    Math.round(c[1] + (255 - c[1]) * amount),
    Math.round(c[2] + (255 - c[2]) * amount),
  ];
}

/** Push a colour toward black — the far edge of the glow, where it dies out. */
function darken(c: Rgb, amount: number): Rgb {
  const k = 1 - amount;
  return [Math.round(c[0] * k), Math.round(c[1] * k), Math.round(c[2] * k)];
}

/** oklch(0.86 0.16 90) — the --gold token, if the probe cannot read it. */
const FALLBACK_GOLD: Rgb = [220, 198, 120];

const TAU = Math.PI * 2;

/** How far a spark drifts sideways over one sway cycle, in pixels. */
const SWAY_PIXELS = 15;

/** Glow radius, as a multiple of the spark's own size. */
const GLOW_SCALE = 8.5;

type Ember = {
  /** Position held as fractions of the frame, so a resize rescales the field
   *  instead of reshuffling it. */
  xf: number;
  yf: number;
  radius: number;
  /** Rise speed in pixels per second, so the drift reads the same at any
   *  frame height. */
  speed: number;
  sway: number;
  alpha: number;
  flicker: number;
};

function makeEmbers(count: number): Ember[] {
  const out: Ember[] = [];
  for (let i = 0; i < count; i += 1) {
    out.push({
      xf: Math.random(),
      // Seeded across the frame and above it, so the field is already full on
      // the first frame rather than filling up from the bottom.
      yf: Math.random() * 1.06 - 0.03,
      radius: Math.random() * 1.5 + 0.6,
      speed: Math.random() * 24 + 11,
      sway: Math.random() * TAU,
      alpha: Math.random() * 0.58 + 0.42,
      flicker: Math.random() * TAU,
    });
  }
  return out;
}

type Stage = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  host: HTMLElement;
};

/**
 * Drive the embers.
 *
 * Everything lives in this function so the canvas, its context and the host
 * element arrive fully resolved — inside a hoisted closure TypeScript cannot
 * carry the caller's null checks over, and every `ctx.` would need a guard.
 *
 * Returns the teardown.
 */
function runEmbers({ canvas, ctx, host, light }: Stage & { light: boolean }): () => void {
  // The user asked for less motion; draw one frame and stop.
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * Sparks are light *added* to a dark ground, which is what `lighter`
   * compositing does. There is nothing to add light to on a pale ground —
   * `lighter` there just washes everything toward white and the field vanishes.
   * So the light theme inverts the whole treatment: normal compositing, and
   * colours darker than the page instead of brighter, so the same drift reads as
   * motes of dust rather than as sparks.
   *
   * The glow is also tightened, and only there. Darkening the spark *and*
   * dropping its alpha is the obvious move and it is wrong: the colour is
   * already carrying the contrast, so scaling the alpha down as well leaves the
   * field at roughly half the visible contrast of the dark one — technically
   * drawn, still unreadable. The alpha stays as it is and the colour does the
   * whole job.
   */
  const glowScale = light ? 5 : GLOW_SCALE;

  let gold = FALLBACK_GOLD;
  let core = light ? darken(FALLBACK_GOLD, 0.4) : lighten(FALLBACK_GOLD, 0.55);
  let emberDeep = darken(FALLBACK_GOLD, light ? 0.75 : 0.3);

  let width = 0;
  let height = 0;
  let frame = 0;
  let last = 0;
  let onScreen = true;
  let seeded = false;

  const embers: Ember[] = [];

  function loadPalette() {
    gold = token("--gold", FALLBACK_GOLD);
    core = light ? darken(gold, 0.4) : lighten(gold, 0.55);
    emberDeep = darken(gold, light ? 0.75 : 0.3);
  }

  function resize() {
    const rect = host.getBoundingClientRect();
    // Cap the pixel ratio: past 2x the extra pixels cost more than they show.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /**
   * Populate the field once, after the first measurement.
   *
   * The tile this comes from re-seeded whenever the width changed, which threw
   * every spark away and restarted the drift on any resize. Positions here are
   * fractions of the frame, so the field survives a resize intact.
   */
  function seed() {
    if (seeded) return;
    seeded = true;
    const count = Math.max(55, Math.min(170, Math.round((width * height) / 6500)));
    embers.push(...makeEmbers(count));
  }

  function paint(dt: number) {
    ctx.clearRect(0, 0, width, height);

    if (!embers.length) {
      ctx.globalCompositeOperation = "source-over";
      return;
    }

    // Additive on dark: sparks are light, so where two overlap they brighten
    // into a hotter point rather than one covering the other. On light the
    // opposite is wanted — overlapping motes deepen rather than blow out.
    ctx.globalCompositeOperation = light ? "source-over" : "lighter";

    for (const e of embers) {
      // Rise, sway and flicker all advance on real elapsed time, so the drift
      // looks the same on a 60Hz and a 120Hz screen.
      e.yf -= (e.speed * dt) / height;
      e.sway += dt * 1.1;
      e.flicker += dt * 6;

      // Off the top: re-enter from below at a new column. The margins let a
      // spark finish fading out past the edge before it wraps.
      if (e.yf < -0.03) {
        e.yf = 1.03;
        e.xf = Math.random();
      }

      const x = e.xf * width + Math.sin(e.sway) * SWAY_PIXELS;
      const y = e.yf * height;
      // The flicker never reaches zero — a spark that blinks fully out reads
      // as a dropped frame, not as a flame.
      const a = e.alpha * (0.55 + 0.45 * Math.sin(e.flicker));
      const r = e.radius * glowScale;

      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, rgba(core, a));
      grad.addColorStop(0.42, rgba(gold, a * 0.46));
      grad.addColorStop(1, rgba(emberDeep, 0));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU);
      ctx.fill();
    }

    ctx.globalCompositeOperation = "source-over";
  }

  function tick(now: number) {
    if (!last) last = now;
    // Clamp dt so a backgrounded tab does not snap every spark on return.
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    paint(dt);
    frame = requestAnimationFrame(tick);
  }

  function start() {
    if (frame || still || !onScreen) return;
    last = 0;
    frame = requestAnimationFrame(tick);
  }

  function stop() {
    if (!frame) return;
    cancelAnimationFrame(frame);
    frame = 0;
  }

  loadPalette();
  resize();
  seed();
  paint(0);

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (still) paint(0);
  });
  resizeObserver.observe(host);

  // No animation to pause for someone who asked for less motion.
  if (still) {
    return () => resizeObserver.disconnect();
  }

  const visibility = new IntersectionObserver(
    (entries) => {
      onScreen = entries[0]?.isIntersecting ?? true;
      if (onScreen) start();
      else stop();
    },
    { threshold: 0.01 },
  );
  visibility.observe(host);

  return () => {
    stop();
    resizeObserver.disconnect();
    visibility.disconnect();
  };
}

/**
 * The hero's atmosphere — sparks rising through the dark.
 *
 * Each spark is a soft radial glow that drifts upward, sways on a slow sine,
 * and flickers, composited additively so overlapping ones burn hotter. The
 * flicker is offset from the sway and both run at their own rate, so the field
 * never pulses as a block.
 *
 * The colours are the brand's, not the tile's. The gallery version burned
 * orange — #ffd682 through #d98c28 — which sat beside the olive and gold as a
 * third, unrelated hue. These are driven off --gold: a white-hot core, the
 * gold itself as the body, and a darkened gold fading out at the rim.
 *
 * That applies to the dark theme. The light theme keeps the same drift but
 * inverts the treatment — see the note in runEmbers; additively-bright sparks
 * are invisible against cream, so there they are darker motes composited
 * normally.
 */
export function HeroAtmosphere() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const light = theme === "light";

  // Keyed on the theme rather than on nothing: the palette *and* the
  // compositing mode both change with it, so the field is torn down and rebuilt
  // instead of being left running with the previous theme's settings.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const host = canvas.parentElement;
    if (!host) return;

    return runEmbers({ canvas, ctx, host, light });
  }, [light]);

  return (
    <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10 h-full w-full" />
  );
}
