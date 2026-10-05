// Scratch: verifies the WCAG ratios documented in the :root.light block of
// src/styles.css. Not part of the app; delete after running.
const TAU = Math.PI * 2;

function oklchToRgb(L, C, hDeg) {
  const h = (hDeg * TAU) / 360;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  return [r, g, bb].map((u) => Math.max(0, Math.min(1, u)));
}

function encode(u) {
  return u <= 0.0031308 ? 12.92 * u : 1.055 * u ** (1 / 2.4) - 0.055;
}

function luminance(rgb) {
  const [r, g, b] = rgb;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

function lin(L, C, h) {
  return luminance(oklchToRgb(L, C, h));
}

function hex(L, C, h) {
  return (
    "#" +
    oklchToRgb(L, C, h)
      .map((u) =>
        Math.round(encode(u) * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

// Sanity: seo.ts documents oklch(0.16 0.022 105) as #0f0e04.
console.log("sanity dark bg  ", hex(0.16, 0.022, 105), "(expect #0f0e04)");
console.log("sanity light bg ", hex(0.98, 0.006, 95), "(meta says #faf8f4)");
console.log("sanity dark fg  ", hex(0.96, 0.014, 95));
console.log("");

const L = {
  bg: lin(0.98, 0.006, 95),
  card: 1,
  fg: lin(0.24, 0.03, 105),
  mutedFg: lin(0.5, 0.025, 100),
  primary: lin(0.52, 0.13, 85),
  olive: lin(0.6, 0.1, 112),
  gold: lin(0.74, 0.14, 88),
  label: lin(0.2, 0.04, 100),
  shimmerA: lin(0.42, 0.1, 112),
  shimmerB: lin(0.56, 0.14, 80),
  shimmerC: lin(0.44, 0.09, 100),
};

const rows = [
  ["foreground on background", L.fg, L.bg, 4.5],
  ["foreground on card", L.fg, L.card, 4.5],
  ["muted-foreground on background", L.mutedFg, L.bg, 4.5],
  ["muted-foreground on card", L.mutedFg, L.card, 4.5],
  ["primary on background", L.primary, L.bg, 4.5],
  ["primary on card", L.primary, L.card, 4.5],
  [".btn-primary label on olive end", L.label, L.olive, 4.5],
  [".btn-primary label on gold end", L.label, L.gold, 4.5],
  ["shimmer stop a on card", L.shimmerA, L.card, 1],
  ["shimmer stop b on card", L.shimmerB, L.card, 1],
  ["shimmer stop c on card", L.shimmerC, L.card, 1],
];

for (const [name, f, b, need] of rows) {
  const r = ratio(f, b);
  const ok = r >= need ? "ok  " : "FAIL";
  console.log(`${ok} ${r.toFixed(2).padStart(6)}:1  ${name}`);
}

console.log("");
console.log("dark theme, for comparison");
const d = {
  bg: lin(0.16, 0.022, 105),
  fg: lin(0.96, 0.014, 95),
  mutedFg: lin(0.75, 0.03, 100),
  primary: lin(0.82, 0.15, 92),
};
console.log("  foreground on background       ", ratio(d.fg, d.bg).toFixed(2) + ":1");
console.log("  muted-foreground on background ", ratio(d.mutedFg, d.bg).toFixed(2) + ":1");
console.log("  primary on background          ", ratio(d.primary, d.bg).toFixed(2) + ":1");
