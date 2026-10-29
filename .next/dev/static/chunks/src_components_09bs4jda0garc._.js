(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/site/CardConnectors.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CardConnectors",
    ()=>CardConnectors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function CardConnectors({ children, className = "" }) {
    _s();
    const gridRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [segments, setSegments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CardConnectors.useEffect": ()=>{
            const grid = gridRef.current;
            if (!grid) return;
            // offsetTop/offsetLeft rather than getBoundingClientRect, so the reading is
            // unaffected by the translateY the Reveal wrapper is still animating.
            const measure = {
                "CardConnectors.useEffect.measure": ()=>{
                    const boxes = Array.from(grid.children).map({
                        "CardConnectors.useEffect.measure.boxes": (child)=>{
                            const el = child;
                            return {
                                left: el.offsetLeft,
                                right: el.offsetLeft + el.offsetWidth,
                                top: el.offsetTop,
                                bottom: el.offsetTop + el.offsetHeight,
                                cx: el.offsetLeft + el.offsetWidth / 2
                            };
                        }
                    }["CardConnectors.useEffect.measure.boxes"]);
                    if (boxes.length < 2) return setSegments([]);
                    // Cards whose vertical spans overlap share a grid row.
                    const rows = [];
                    for (const box of [
                        ...boxes
                    ].sort({
                        "CardConnectors.useEffect.measure": (a, b)=>a.top - b.top
                    }["CardConnectors.useEffect.measure"])){
                        const row = rows.find({
                            "CardConnectors.useEffect.measure.row": (r)=>r.some({
                                    "CardConnectors.useEffect.measure.row": (b)=>b.bottom > box.top && b.top < box.bottom
                                }["CardConnectors.useEffect.measure.row"])
                        }["CardConnectors.useEffect.measure.row"]);
                        if (row) row.push(box);
                        else rows.push([
                            box
                        ]);
                    }
                    // Every row holding a single card means the grid is stacked, not gridded.
                    const stacked = rows.every({
                        "CardConnectors.useEffect.measure.stacked": (r)=>r.length === 1
                    }["CardConnectors.useEffect.measure.stacked"]);
                    const next = [];
                    if (stacked) {
                        for(let i = 1; i < rows.length; i++){
                            const prev = rows[i - 1]?.[0];
                            const curr = rows[i]?.[0];
                            if (!prev || !curr) continue;
                            const length = curr.top - prev.bottom;
                            if (length < 8) continue;
                            next.push({
                                axis: "y",
                                left: prev.cx,
                                top: prev.bottom,
                                length
                            });
                        }
                    } else {
                        for (const row of rows){
                            const ordered = [
                                ...row
                            ].sort({
                                "CardConnectors.useEffect.measure.ordered": (a, b)=>a.left - b.left
                            }["CardConnectors.useEffect.measure.ordered"]);
                            for(let i = 1; i < ordered.length; i++){
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
                                    length
                                });
                            }
                        }
                    }
                    setSegments(next);
                }
            }["CardConnectors.useEffect.measure"];
            measure();
            const observer = new ResizeObserver(measure);
            observer.observe(grid);
            Array.from(grid.children).forEach({
                "CardConnectors.useEffect": (child)=>observer.observe(child)
            }["CardConnectors.useEffect"]);
            const io = new IntersectionObserver({
                "CardConnectors.useEffect": (entries)=>entries.forEach({
                        "CardConnectors.useEffect": (e)=>e.isIntersecting && setVisible(true)
                    }["CardConnectors.useEffect"])
            }["CardConnectors.useEffect"], {
                threshold: 0.1
            });
            io.observe(grid);
            window.addEventListener("resize", measure);
            // Web fonts and images settle after first paint and nudge the rows.
            const settle = [
                200,
                600,
                1200
            ].map({
                "CardConnectors.useEffect.settle": (ms)=>window.setTimeout(measure, ms)
            }["CardConnectors.useEffect.settle"]);
            return ({
                "CardConnectors.useEffect": ()=>{
                    observer.disconnect();
                    io.disconnect();
                    window.removeEventListener("resize", measure);
                    settle.forEach({
                        "CardConnectors.useEffect": (id)=>window.clearTimeout(id)
                    }["CardConnectors.useEffect"]);
                }
            })["CardConnectors.useEffect"];
        }
    }["CardConnectors.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: gridRef,
                className: className,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/site/CardConnectors.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": "true",
                className: `pointer-events-none absolute inset-0 z-10 transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`,
                children: segments.map((s, i)=>{
                    const vertical = s.axis === "y";
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: vertical ? "card-connector-v" : "card-connector",
                        style: vertical ? {
                            left: s.left,
                            top: s.top,
                            height: s.length
                        } : {
                            left: s.left,
                            top: s.top,
                            width: s.length
                        },
                        children: [
                            0,
                            1200
                        ].map((offset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: vertical ? "card-connector-dot-v" : "card-connector-dot",
                                style: {
                                    animationDelay: `${i % 4 * 600 + offset}ms`
                                }
                            }, offset, false, {
                                fileName: "[project]/src/components/site/CardConnectors.tsx",
                                lineNumber: 147,
                                columnNumber: 17
                            }, this))
                    }, `${s.axis}-${s.left}-${s.top}-${s.length}`, false, {
                        fileName: "[project]/src/components/site/CardConnectors.tsx",
                        lineNumber: 137,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/site/CardConnectors.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/site/CardConnectors.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_s(CardConnectors, "UdmHiwwzjn1Vt9RmfcfotwUqAOc=");
_c = CardConnectors;
var _c;
__turbopack_context__.k.register(_c, "CardConnectors");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/site/HeroAtmosphere.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroAtmosphere",
    ()=>HeroAtmosphere
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/theme.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
/**
 * Resolve any CSS colour — oklch included — to an [r, g, b] triple.
 *
 * A canvas is the only place the browser will hand back a resolved colour, so
 * we set a sentinel, assign the value, and read back what stuck: if the
 * sentinel survives, the value did not parse and we keep the fallback.
 */ function toRgb(value, fallback) {
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
        return [
            Number.parseInt(r, 16),
            Number.parseInt(g, 16),
            Number.parseInt(b, 16)
        ];
    }
    const rgb = /^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(out);
    const rr = rgb?.[1];
    const gg = rgb?.[2];
    const bb = rgb?.[3];
    if (rr && gg && bb) return [
        Number(rr),
        Number(gg),
        Number(bb)
    ];
    return fallback;
}
function token(name, fallback) {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name);
    return raw ? toRgb(raw.trim(), fallback) : fallback;
}
function rgba(c, alpha) {
    return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
}
/** Pull a colour toward white — the white-hot centre of a spark. */ function lighten(c, amount) {
    return [
        Math.round(c[0] + (255 - c[0]) * amount),
        Math.round(c[1] + (255 - c[1]) * amount),
        Math.round(c[2] + (255 - c[2]) * amount)
    ];
}
/** Push a colour toward black — the far edge of the glow, where it dies out. */ function darken(c, amount) {
    const k = 1 - amount;
    return [
        Math.round(c[0] * k),
        Math.round(c[1] * k),
        Math.round(c[2] * k)
    ];
}
/** oklch(0.86 0.16 90) — the --gold token, if the probe cannot read it. */ const FALLBACK_GOLD = [
    220,
    198,
    120
];
const TAU = Math.PI * 2;
/** How far a spark drifts sideways over one sway cycle, in pixels. */ const SWAY_PIXELS = 15;
/** Glow radius, as a multiple of the spark's own size. */ const GLOW_SCALE = 8.5;
function makeEmbers(count) {
    const out = [];
    for(let i = 0; i < count; i += 1){
        out.push({
            xf: Math.random(),
            // Seeded across the frame and above it, so the field is already full on
            // the first frame rather than filling up from the bottom.
            yf: Math.random() * 1.06 - 0.03,
            radius: Math.random() * 1.5 + 0.6,
            speed: Math.random() * 24 + 11,
            sway: Math.random() * TAU,
            alpha: Math.random() * 0.58 + 0.42,
            flicker: Math.random() * TAU
        });
    }
    return out;
}
/**
 * Drive the embers.
 *
 * Everything lives in this function so the canvas, its context and the host
 * element arrive fully resolved — inside a hoisted closure TypeScript cannot
 * carry the caller's null checks over, and every `ctx.` would need a guard.
 *
 * Returns the teardown.
 */ function runEmbers({ canvas, ctx, host, light }) {
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
   */ const glowScale = light ? 5 : GLOW_SCALE;
    let gold = FALLBACK_GOLD;
    let core = light ? darken(FALLBACK_GOLD, 0.4) : lighten(FALLBACK_GOLD, 0.55);
    let emberDeep = darken(FALLBACK_GOLD, light ? 0.75 : 0.3);
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let onScreen = true;
    let seeded = false;
    const embers = [];
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
   */ function seed() {
        if (seeded) return;
        seeded = true;
        const count = Math.max(55, Math.min(170, Math.round(width * height / 6500)));
        embers.push(...makeEmbers(count));
    }
    function paint(dt) {
        ctx.clearRect(0, 0, width, height);
        if (!embers.length) {
            ctx.globalCompositeOperation = "source-over";
            return;
        }
        // Additive on dark: sparks are light, so where two overlap they brighten
        // into a hotter point rather than one covering the other. On light the
        // opposite is wanted — overlapping motes deepen rather than blow out.
        ctx.globalCompositeOperation = light ? "source-over" : "lighter";
        for (const e of embers){
            // Rise, sway and flicker all advance on real elapsed time, so the drift
            // looks the same on a 60Hz and a 120Hz screen.
            e.yf -= e.speed * dt / height;
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
    function tick(now) {
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
    const resizeObserver = new ResizeObserver(()=>{
        resize();
        if (still) paint(0);
    });
    resizeObserver.observe(host);
    // No animation to pause for someone who asked for less motion.
    if (still) {
        return ()=>resizeObserver.disconnect();
    }
    const visibility = new IntersectionObserver((entries)=>{
        onScreen = entries[0]?.isIntersecting ?? true;
        if (onScreen) start();
        else stop();
    }, {
        threshold: 0.01
    });
    visibility.observe(host);
    return ()=>{
        stop();
        resizeObserver.disconnect();
        visibility.disconnect();
    };
}
function HeroAtmosphere() {
    _s();
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const light = theme === "light";
    // Keyed on the theme rather than on nothing: the palette *and* the
    // compositing mode both change with it, so the field is torn down and rebuilt
    // instead of being left running with the previous theme's settings.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroAtmosphere.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const host = canvas.parentElement;
            if (!host) return;
            return runEmbers({
                canvas,
                ctx,
                host,
                light
            });
        }
    }["HeroAtmosphere.useEffect"], [
        light
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "pointer-events-none absolute inset-0 z-10 h-full w-full"
    }, void 0, false, {
        fileName: "[project]/src/components/site/HeroAtmosphere.tsx",
        lineNumber: 328,
        columnNumber: 5
    }, this);
}
_s(HeroAtmosphere, "t9WLS/wJ6rLRNbAt6tCGk5Uy+mA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = HeroAtmosphere;
var _c;
__turbopack_context__.k.register(_c, "HeroAtmosphere");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/site/Reveal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Reveal",
    ()=>Reveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function Reveal({ children, delay = 0, className = "" }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [shown, setShown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Reveal.useEffect": ()=>{
            const el = ref.current;
            if (!el) return;
            // Without IntersectionObserver the reveal can never fire, and the card
            // would stay at opacity 0 forever. Show it instead of losing it.
            if (typeof IntersectionObserver === "undefined") {
                setShown(true);
                return;
            }
            const io = new IntersectionObserver({
                "Reveal.useEffect": (entries)=>{
                    entries.forEach({
                        "Reveal.useEffect": (e)=>{
                            if (e.isIntersecting) {
                                setShown(true);
                                io.disconnect();
                            }
                        }
                    }["Reveal.useEffect"]);
                }
            }["Reveal.useEffect"], // threshold 0.12 could never be met by a card taller than the viewport,
            // which left tall cards permanently invisible. A near-zero threshold
            // fires on the first pixel, and the positive bottom rootMargin reveals
            // slightly before the card scrolls into view so it never appears blank.
            {
                threshold: 0.01,
                rootMargin: "0px 0px 12% 0px"
            });
            io.observe(el);
            return ({
                "Reveal.useEffect": ()=>io.disconnect()
            })["Reveal.useEffect"];
        }
    }["Reveal.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: `reveal ${shown ? "reveal-in" : ""} ${className}`,
        style: {
            transitionDelay: `${delay}ms`
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/site/Reveal.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(Reveal, "ulyIE6ycWSg9Eyuc1w5Wg/OKYqg=");
_c = Reveal;
var _c;
__turbopack_context__.k.register(_c, "Reveal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Interactive3DCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Interactive3DCard",
    ()=>Interactive3DCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
/**
 * Lazily created and cached: this is read on every pointer move across a grid
 * of these cards, and matchMedia is not free. Motion here is a pointer-driven
 * tilt rather than autoplaying animation, so the global reduced-motion rule in
 * styles.css does not cover it.
 */ let reducedMotionQuery = null;
function prefersReducedMotion() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    reducedMotionQuery ??= window.matchMedia("(prefers-reduced-motion: reduce)");
    return reducedMotionQuery.matches;
}
function Interactive3DCard({ children, className = "", intensity = 15 }) {
    _s();
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const glareRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Pointer moves fire several times per frame; the transform is only worth
    // recomputing once per frame, so the latest position is parked here and
    // drained by the animation frame below.
    const pointer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Interactive3DCard.useEffect": ()=>({
                "Interactive3DCard.useEffect": ()=>{
                    if (frame.current !== null) cancelAnimationFrame(frame.current);
                }
            })["Interactive3DCard.useEffect"]
    }["Interactive3DCard.useEffect"], []);
    const paint = ()=>{
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
        card.style.setProperty("--rotate-x", `${(y - centerY) / centerY * -intensity}deg`);
        card.style.setProperty("--rotate-y", `${(x - centerX) / centerX * intensity}deg`);
        glare.style.setProperty("--glare-x", `${x / rect.width * 100}%`);
        glare.style.setProperty("--glare-y", `${y / rect.height * 100}%`);
        glare.style.setProperty("opacity", "0.6");
    };
    const handleMouseMove = (e)=>{
        if (prefersReducedMotion()) return;
        pointer.current = {
            x: e.clientX,
            y: e.clientY
        };
        if (frame.current !== null) return;
        frame.current = requestAnimationFrame(paint);
    };
    const handleMouseLeave = ()=>{
        if (frame.current !== null) {
            cancelAnimationFrame(frame.current);
            frame.current = null;
        }
        cardRef.current?.style.setProperty("--rotate-x", "0deg");
        cardRef.current?.style.setProperty("--rotate-y", "0deg");
        glareRef.current?.style.setProperty("opacity", "0");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: cardRef,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        className: `interactive-3d-card relative transition-transform duration-100 ease-out will-change-transform ${className}`,
        style: {
            transform: "perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))",
            transformStyle: "preserve-3d"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: glareRef,
                className: "pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-150",
                style: {
                    // --glare rather than a literal: the highlight has to darken in the
                    // light theme, where a white glare disappears into a white card.
                    background: `radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), var(--glare) 0%, transparent 80%)`
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Interactive3DCard.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Interactive3DCard.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_s(Interactive3DCard, "Vg7/INu4aVS1KvX1hByN7IxXgx4=");
_c = Interactive3DCard;
var _c;
__turbopack_context__.k.register(_c, "Interactive3DCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=src_components_09bs4jda0garc._.js.map