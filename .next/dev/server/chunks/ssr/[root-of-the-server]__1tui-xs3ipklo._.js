module.exports = [
(()=>{"use strict";return[
"[project]/src/components/site/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$Logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/site/Logo.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$ThemeToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/site/ThemeToggle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const links = [
    {
        label: "Home",
        href: "/",
        exact: true
    },
    {
        label: "Services",
        href: "/services"
    },
    {
        label: "Reviews",
        href: "/reviews"
    },
    {
        label: "Blog",
        href: "/blog"
    },
    {
        label: "About",
        href: "/about"
    },
    {
        label: "Contact",
        href: "/contact"
    }
];
function Header() {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$Logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Logo"], {}, void 0, false, {
                        fileName: "[project]/src/components/site/Header.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden items-center gap-6 md:flex lg:gap-8",
                        children: links.map((l)=>{
                            const isActive = l.exact ? pathname === l.href : pathname === l.href || pathname.startsWith(`${l.href}/`);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: l.href,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm transition-colors hover:text-foreground", isActive ? "text-primary font-semibold" : "text-muted-foreground"),
                                children: l.label
                            }, l.label, false, {
                                fileName: "[project]/src/components/site/Header.tsx",
                                lineNumber: 42,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/site/Header.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden items-center gap-3 md:flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$ThemeToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeToggle"], {}, void 0, false, {
                                fileName: "[project]/src/components/site/Header.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden lg:block",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/contact",
                                    className: "btn-primary",
                                    children: "Get a Free Audit"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/site/Header.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/site/Header.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/site/Header.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 md:hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$ThemeToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeToggle"], {}, void 0, false, {
                                fileName: "[project]/src/components/site/Header.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": open ? "Close menu" : "Open menu",
                                "aria-expanded": open,
                                "aria-controls": "mobile-nav",
                                onClick: ()=>setOpen((v)=>!v),
                                children: open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-6 w-6"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/site/Header.tsx",
                                    lineNumber: 74,
                                    columnNumber: 21
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "h-6 w-6"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/site/Header.tsx",
                                    lineNumber: 74,
                                    columnNumber: 49
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/site/Header.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/site/Header.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/site/Header.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "mobile-nav",
                className: "border-t border-border md:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4",
                    children: [
                        links.map((l)=>{
                            const isActive = l.exact ? pathname === l.href : pathname === l.href || pathname.startsWith(`${l.href}/`);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: l.href,
                                onClick: ()=>setOpen(false),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("rounded-lg px-2 py-2.5 text-sm transition-colors hover:bg-secondary hover:text-foreground", isActive ? "font-semibold text-primary" : "text-muted-foreground"),
                                children: l.label
                            }, l.label, false, {
                                fileName: "[project]/src/components/site/Header.tsx",
                                lineNumber: 88,
                                columnNumber: 17
                            }, this);
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/contact",
                            onClick: ()=>setOpen(false),
                            className: "btn-primary mt-3",
                            children: "Get a Free Audit"
                        }, void 0, false, {
                            fileName: "[project]/src/components/site/Header.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/site/Header.tsx",
                    lineNumber: 81,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/site/Header.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/site/Header.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/site/Logo.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Logo",
    ()=>Logo,
    "LogoMark",
    ()=>LogoMark
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/image-component.js [app-ssr] (ecmascript) <export Image as default>");
;
;
;
function LogoMark() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
        src: "/icon-192.png",
        alt: "",
        width: 36,
        height: 36,
        className: "h-9 w-9 shrink-0 rounded-xl ring-1 ring-white/10",
        priority: true
    }, void 0, false, {
        fileName: "[project]/src/components/site/Logo.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
function Logo() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: "/",
        className: "flex items-center gap-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LogoMark, {}, void 0, false, {
                fileName: "[project]/src/components/site/Logo.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-display text-lg font-bold tracking-tight",
                children: [
                    "NovaMind ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-primary",
                        children: "AI"
                    }, void 0, false, {
                        fileName: "[project]/src/components/site/Logo.tsx",
                        lineNumber: 33,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/site/Logo.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/site/Logo.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/site/ThemeToggle.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeToggle",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-ssr] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-ssr] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/theme.ts [app-ssr] (ecmascript)");
;
;
;
function ThemeToggle({ className = "" }) {
    const { toggle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: toggle,
        "aria-label": "Toggle dark or light mode",
        title: "Toggle dark or light mode",
        className: `inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                className: "h-4 w-4 light:hidden",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/site/ThemeToggle.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                className: "hidden h-4 w-4 light:block",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/site/ThemeToggle.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/site/ThemeToggle.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/contact-details.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "contactDetails",
    ()=>contactDetails
]);
const contactDetails = {
    // The live inbox. This is the address the contact page, the footer and the
    // Organization schema all publish, so a typo here silently loses enquiries.
    email: "ainovamind43@gmail.com",
    // Display only — there is deliberately no `tel:` link anywhere on the site.
    // Contact runs through WhatsApp, so a click-to-call would ring a line nobody
    // answers. Shown in international format because most enquiries come from
    // outside Pakistan, where a bare 03xx number reads as a local one they cannot
    // dial. `whatsapp` is the same number with the country code and no punctuation.
    phone: "+92 315 845 4839",
    whatsapp: "923158454839",
    whatsappHref: "https://wa.me/923158454839",
    hours: "Mon — Fri, 9am to 6pm",
    response: "Within 24 hours"
};
}),
"[project]/src/lib/seo.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ABOUT_KEYWORDS",
    ()=>ABOUT_KEYWORDS,
    "AREAS_SERVED",
    ()=>AREAS_SERVED,
    "BLOG_KEYWORDS",
    ()=>BLOG_KEYWORDS,
    "CONTACT_KEYWORDS",
    ()=>CONTACT_KEYWORDS,
    "HOME_KEYWORDS",
    ()=>HOME_KEYWORDS,
    "OG_IMAGE",
    ()=>OG_IMAGE,
    "OG_IMAGE_ALT",
    ()=>OG_IMAGE_ALT,
    "OG_IMAGE_HEIGHT",
    ()=>OG_IMAGE_HEIGHT,
    "OG_IMAGE_WIDTH",
    ()=>OG_IMAGE_WIDTH,
    "PAGES",
    ()=>PAGES,
    "PRIVACY_KEYWORDS",
    ()=>PRIVACY_KEYWORDS,
    "REVIEWS_KEYWORDS",
    ()=>REVIEWS_KEYWORDS,
    "SERVICES_KEYWORDS",
    ()=>SERVICES_KEYWORDS,
    "SITE_DESCRIPTION",
    ()=>SITE_DESCRIPTION,
    "SITE_NAME",
    ()=>SITE_NAME,
    "SITE_TAGLINE",
    ()=>SITE_TAGLINE,
    "SITE_URL",
    ()=>SITE_URL,
    "THEME_COLOR",
    ()=>THEME_COLOR,
    "THEME_COLOR_LIGHT",
    ()=>THEME_COLOR_LIGHT,
    "breadcrumbSchema",
    ()=>breadcrumbSchema,
    "faqSchema",
    ()=>faqSchema,
    "organizationSchema",
    ()=>organizationSchema,
    "pageMeta",
    ()=>pageMeta,
    "websiteSchema",
    ()=>websiteSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$contact$2d$details$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/contact-details.ts [app-ssr] (ecmascript)");
;
const SITE_URL = "https://www.novamindai.info";
const SITE_NAME = "NovaMind AI";
const SITE_DESCRIPTION = "NovaMind AI is a web design, AI automation and SEO agency. We build websites, AI agents, ERP, POS and custom software for clients in the US, UK, UAE, Saudi Arabia and Pakistan.";
const SITE_TAGLINE = "Web Design, AI Automation & SEO Agency";
const OG_IMAGE = `${SITE_URL}/og.jpg`;
const OG_IMAGE_WIDTH = "1600";
const OG_IMAGE_HEIGHT = "900";
const OG_IMAGE_ALT = "NovaMind AI — web design, AI automation, SEO and custom business software";
const THEME_COLOR = "#0f0e04";
const THEME_COLOR_LIGHT = "#faf8f4";
const HOME_KEYWORDS = [
    "novamind",
    "novamindai",
    "novamindai.info",
    "nova",
    "nova website",
    "novamind website",
    "NovaMind AI",
    "NovaMindAI",
    "NovaMind AI Pakistan",
    "NovaMind AI Karachi",
    "NovaMindAI Pakistan",
    "NovaMind AI Agency",
    "NovaMind AI Solutions",
    "NovaMind AI Automation",
    "customer support agent",
    "AI customer support widget",
    "live chat customer support",
    "customer service chatbot",
    "24/7 AI customer support",
    "automated customer service agent",
    "erp system",
    "best erp system",
    "erp system software",
    "custom erp system development",
    "erp system for business",
    "cloud erp system",
    "erp system in pakistan",
    "erp system in dubai",
    "enterprise erp systems",
    "erp pos software systems",
    "AI automation services",
    "AI automation agency",
    "AI agent development",
    "AI agents development",
    "AI chatbot development",
    "business automation services",
    "AI workflow automation",
    "custom AI solutions",
    "AI software development",
    "AI integration services",
    "custom software development",
    "web application development",
    "AI-powered business solutions",
    "AI automation agency in Pakistan",
    "AI automation company in Pakistan",
    "AI development company in Pakistan",
    "AI agent developer Pakistan",
    "AI chatbot development Pakistan",
    "software development company Pakistan",
    "web development company Pakistan",
    "AI automation agency Karachi",
    "AI development company Karachi",
    "software development company Karachi",
    "web design agency",
    "hire web developers",
    "AI automation company",
    "SEO services",
    "custom software house",
    "ERP software development",
    "POS system development",
    "mobile app development",
    "best software house in Pakistan",
    "top IT company in Dubai",
    "dedicated software development team",
    "outsource web development",
    "hire React Next.js developers",
    "Python AI automation",
    "B2B digital agency",
    "software company Lahore Karachi Islamabad",
    "IT consulting Saudi Arabia Qatar"
];
const SERVICES_KEYWORDS = [
    "erp system",
    "erp system software",
    "custom erp system",
    "enterprise erp system",
    "cloud erp software",
    "hire full stack developers",
    "React development company",
    "Next.js development services",
    "ecommerce website builders",
    "Shopify experts for hire",
    "enterprise AI automation",
    "custom AI agent building",
    "LLM integration services",
    "technical SEO audit",
    "local SEO for businesses",
    "bespoke ERP solutions",
    "cloud based POS software",
    "inventory management systems",
    "Android iOS app development",
    "SaaS product engineering",
    "Google Meta Ads management",
    "lead generation for agencies",
    "API integration and development"
];
const ABOUT_KEYWORDS = [
    "NovaMind AI portfolio",
    "software engineering team",
    "web design experts",
    "AI researchers and developers",
    "tech agency Pakistan Dubai",
    "Alishba NovaMind AI",
    "custom software case studies",
    "digital transformation agency"
];
const CONTACT_KEYWORDS = [
    "hire NovaMind AI developers",
    "get a free project quote",
    "software development pricing",
    "hire AI automation experts",
    "book a tech consultation",
    "contact software house Lahore",
    "contact IT company Dubai",
    "request a free SEO audit"
];
const REVIEWS_KEYWORDS = [
    "NovaMind AI client testimonials",
    "web design agency success stories",
    "AI automation project results",
    "verified software house reviews",
    "software company ratings Pakistan Dubai"
];
const BLOG_KEYWORDS = [
    "hire web design agency",
    "hire AI automation agency",
    "hire custom software developers",
    "custom ERP software development company",
    "retail POS software development Dubai",
    "AI chatbot development company USA UK",
    "hire full stack web developers",
    "best software house in Pakistan",
    "software company in Dubai UAE",
    "SEO agency for B2B and SaaS",
    "custom web application development services",
    "enterprise workflow automation consultants",
    "hire mobile app development company",
    "e-commerce website development agency",
    "top digital agency for custom software",
    "autonomous AI agents for business guide",
    "how to outsource software development safely",
    "benefits of custom ERP for small business"
];
const PRIVACY_KEYWORDS = [
    "NovaMind AI privacy policy",
    "how we handle your data"
];
function pageMeta(pathname, keywords = []) {
    const url = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
    return {
        links: [
            {
                rel: "canonical",
                href: url
            }
        ],
        meta: [
            {
                property: "og:url",
                content: url
            },
            {
                name: "keywords",
                content: keywords.join(", ")
            }
        ]
    };
}
const AREAS_SERVED = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "United Arab Emirates",
    "Saudi Arabia",
    "Qatar",
    "Kuwait",
    "Germany",
    "Netherlands",
    "Singapore",
    "Pakistan",
    "India",
    "South Africa"
];
/** The disciplines the team can be trusted to write about — schema.org
 *  `knowsAbout`, which feeds Google's entity understanding of the brand. */ const KNOWS_ABOUT = [
    "Web design",
    "Web development",
    "Artificial intelligence",
    "AI agents",
    "Chatbot development",
    "Business process automation",
    "Search engine optimization",
    "Technical SEO",
    "Link building",
    "Digital marketing",
    "Paid advertising",
    "Google Ads",
    "Meta Ads",
    "Enterprise resource planning",
    "Point of sale software",
    "Custom software development",
    "Android app development",
    "SaaS development",
    "Next.js development",
    "React development",
    "B2B lead generation",
    "E-commerce development",
    "Custom API integration",
    "Workflow automation"
];
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: [
        "NovaMind",
        "NovaMindAI",
        "Nova",
        "novamindai.info",
        "Nova Website",
        `${SITE_NAME} — ${SITE_TAGLINE}`
    ],
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    slogan: "Precision growth you can stand behind.",
    logo: {
        "@type": "ImageObject",
        // The 512px render of the monogram. Google's guidance for Organization.logo
        // is a minimum of 112x112; this is the largest raster we generate, so it is
        // the one that survives whatever size the knowledge panel asks for.
        url: `${SITE_URL}/icon-512.png`
    },
    image: OG_IMAGE,
    email: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$contact$2d$details$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contactDetails"].email,
    telephone: `+${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$contact$2d$details$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contactDetails"].whatsapp}`,
    contactPoint: [
        {
            "@type": "ContactPoint",
            contactType: "sales",
            email: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$contact$2d$details$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contactDetails"].email,
            telephone: `+${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$contact$2d$details$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contactDetails"].whatsapp}`,
            availableLanguage: [
                "en",
                "ur"
            ],
            areaServed: AREAS_SERVED.map((name)=>({
                    "@type": "Country",
                    name
                }))
        }
    ],
    areaServed: AREAS_SERVED.map((name)=>({
            "@type": "Country",
            name
        })),
    knowsAbout: KNOWS_ABOUT,
    founder: {
        "@type": "Person",
        name: "Alishba",
        jobTitle: "Founder"
    },
    foundingDate: "2021"
};
const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: [
        "NovaMind",
        "NovaMindAI",
        "Nova",
        "novamindai.info",
        "Nova Website"
    ],
    description: SITE_DESCRIPTION,
    publisher: {
        "@id": `${SITE_URL}/#organization`
    },
    inLanguage: "en"
};
function breadcrumbSchema(trail) {
    const items = [
        {
            name: "Home",
            path: "/"
        },
        ...trail
    ];
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i)=>({
                "@type": "ListItem",
                position: i + 1,
                name: item.name,
                item: `${SITE_URL}${item.path}`
            }))
    };
}
function faqSchema(faqs) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f)=>({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: f.a
                }
            }))
    };
}
const PAGES = [
    {
        path: "/",
        changefreq: "weekly",
        priority: "1.0"
    },
    {
        path: "/services",
        changefreq: "weekly",
        priority: "0.9"
    },
    {
        path: "/blog",
        changefreq: "weekly",
        priority: "0.8"
    },
    {
        path: "/about",
        changefreq: "monthly",
        priority: "0.7"
    },
    {
        path: "/contact",
        changefreq: "monthly",
        priority: "0.8"
    },
    // /reviews is out of this list while the feature is unlinked and its database
    // is not connected. A sitemap entry is a request to index a page, and asking
    // Google to index a form that cannot save is worse than not asking at all.
    {
        path: "/privacy",
        changefreq: "yearly",
        priority: "0.3"
    }
];
}),
"[project]/src/lib/theme.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "THEME_STORAGE_KEY",
    ()=>THEME_STORAGE_KEY,
    "applyTheme",
    ()=>applyTheme,
    "readTheme",
    ()=>readTheme,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo.ts [app-ssr] (ecmascript)");
;
;
const THEME_STORAGE_KEY = "novamind-theme";
/** Fired on documentElement by applyTheme, so subscribers re-read the theme. */ const THEME_EVENT = "novamind:theme";
function readTheme() {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.classList.contains("light") ? "light" : "dark";
}
/** Keep the mobile browser chrome in step with the page it is framing. */ function syncThemeColor(theme) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
        meta.setAttribute("content", theme === "light" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["THEME_COLOR_LIGHT"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["THEME_COLOR"]);
    }
}
function applyTheme(theme) {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    syncThemeColor(theme);
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch  {
    // Storage can be absent or throw when cookies are blocked. The theme still
    // applies for this page view; it just will not outlive the tab.
    }
    root.dispatchEvent(new Event(THEME_EVENT));
}
/**
 * The `storage` event fires only in *other* tabs, so the class is set directly
 * here rather than through applyTheme — calling applyTheme would write the same
 * value straight back to localStorage and bounce the event between tabs.
 */ function subscribe(onChange) {
    const root = document.documentElement;
    const onStorage = (event)=>{
        if (event.key !== THEME_STORAGE_KEY) return;
        const next = event.newValue === "light" ? "light" : "dark";
        root.classList.toggle("light", next === "light");
        syncThemeColor(next);
        onChange();
    };
    root.addEventListener(THEME_EVENT, onChange);
    window.addEventListener("storage", onStorage);
    return ()=>{
        root.removeEventListener(THEME_EVENT, onChange);
        window.removeEventListener("storage", onStorage);
    };
}
function useTheme() {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, readTheme, ()=>"dark");
    const toggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        applyTheme(readTheme() === "light" ? "dark" : "light");
    }, []);
    return {
        theme,
        setTheme: applyTheme,
        toggle
    };
}
}),
"[project]/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
]})(),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1tui-xs3ipklo._.js.map