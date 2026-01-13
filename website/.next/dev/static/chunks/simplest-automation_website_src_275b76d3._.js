(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/simplest-automation/website/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/simplest-automation/website/src/components/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chrome$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chrome$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/chrome.js [app-client] (ecmascript) <export default as Chrome>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const navItems = [
    {
        name: "Features",
        href: "#features"
    },
    {
        name: "How It Works",
        href: "#how-it-works"
    },
    {
        name: "Use Cases",
        href: "#use-cases"
    }
];
function Navbar() {
    _s();
    const [isScrolled, setIsScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const handleScroll = {
                "Navbar.useEffect.handleScroll": ()=>{
                    setIsScrolled(window.scrollY > 20);
                }
            }["Navbar.useEffect.handleScroll"];
            window.addEventListener("scroll", handleScroll);
            return ({
                "Navbar.useEffect": ()=>window.removeEventListener("scroll", handleScroll)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].header, {
                initial: {
                    y: -100
                },
                animate: {
                    y: 0
                },
                transition: {
                    duration: 0.6,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ]
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "glass shadow-sm" : "bg-transparent"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "container-custom",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between h-16 md:h-18",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "flex items-center gap-3 group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/transparent.png",
                                        alt: "Simplest",
                                        width: 72,
                                        height: 72,
                                        className: "w-[72px] h-[72px] object-contain group-hover:scale-105 transition-transform"
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                        lineNumber: 43,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-semibold tracking-tight logo-gradient-text",
                                                children: "Simplest"
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                                lineNumber: 51,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-muted-foreground font-medium -mt-0.5",
                                                children: "Automation"
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                                lineNumber: 54,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex items-center gap-1",
                                children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50",
                                        children: item.name
                                    }, item.name, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex items-center gap-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "#get-started",
                                    className: "btn-primary text-sm px-5 py-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chrome$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chrome$3e$__["Chrome"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                            lineNumber: 79,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Add to Chrome"
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                            lineNumber: 80,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                            lineNumber: 81,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                    lineNumber: 75,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsMobileMenuOpen(!isMobileMenuOpen),
                                className: "md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors",
                                children: isMobileMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                    lineNumber: 91,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                    lineNumber: 93,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isMobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: -10
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -10
                    },
                    transition: {
                        duration: 0.2
                    },
                    className: "fixed inset-x-0 top-16 z-40 md:hidden glass border-b border-border",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container-custom py-4 space-y-1",
                        children: [
                            navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    onClick: ()=>setIsMobileMenuOpen(false),
                                    className: "block px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-colors",
                                    children: item.name
                                }, item.name, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                    lineNumber: 112,
                                    columnNumber: 17
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-4 mt-4 border-t border-border",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "#get-started",
                                    onClick: ()=>setIsMobileMenuOpen(false),
                                    className: "btn-primary w-full justify-center text-base py-3.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chrome$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chrome$3e$__["Chrome"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                            lineNumber: 127,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Add to Chrome — Free"
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                            lineNumber: 128,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                    lineNumber: 122,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                                lineNumber: 121,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                        lineNumber: 110,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                    lineNumber: 103,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/Navbar.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Navbar, "0+zEKVBL95ILuBb5rHE6ViYOHu8=");
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/simplest-automation/website/src/components/AutomationDemo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AutomationDemo",
    ()=>AutomationDemo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/mouse-pointer-2.js [app-client] (ecmascript) <export default as MousePointer2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const demoSteps = [
    {
        action: "click",
        element: "Email input"
    },
    {
        action: "type",
        element: "Email",
        value: "john@company.com"
    },
    {
        action: "click",
        element: "Password input"
    },
    {
        action: "type",
        element: "Password",
        value: "••••••••"
    },
    {
        action: "click",
        element: "Sign Up button"
    }
];
function AutomationDemo() {
    _s();
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [recordedSteps, setRecordedSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [cursorPosition, setCursorPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [showCursorClick, setShowCursorClick] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [automationName, setAutomationName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [shareUrl, setShareUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isRunningOnRight, setIsRunningOnRight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rightSideStep, setRightSideStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [rightCursorPosition, setRightCursorPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [showRightCursorClick, setShowRightCursorClick] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rightFormState, setRightFormState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        email: "",
        password: ""
    });
    // Form field positions (relative to browser content area)
    const formPositions = {
        email: {
            x: 160,
            y: 220
        },
        password: {
            x: 160,
            y: 300
        },
        button: {
            x: 160,
            y: 380
        }
    };
    // Run the demo automatically
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutomationDemo.useEffect": ()=>{
            const timer = setTimeout({
                "AutomationDemo.useEffect.timer": ()=>{
                    if (phase === "idle") {
                        startRecording();
                    }
                }
            }["AutomationDemo.useEffect.timer"], 1500);
            return ({
                "AutomationDemo.useEffect": ()=>clearTimeout(timer)
            })["AutomationDemo.useEffect"];
        }
    }["AutomationDemo.useEffect"], [
        phase
    ]);
    const startRecording = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AutomationDemo.useCallback[startRecording]": ()=>{
            setPhase("recording");
            setRecordedSteps([]);
            setCurrentStep(0);
        }
    }["AutomationDemo.useCallback[startRecording]"], []);
    // Recording animation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutomationDemo.useEffect": ()=>{
            if (phase !== "recording") return;
            if (currentStep >= demoSteps.length) {
                setTimeout({
                    "AutomationDemo.useEffect": ()=>setPhase("saving")
                }["AutomationDemo.useEffect"], 800);
                return;
            }
            const step = demoSteps[currentStep];
            let position = formPositions.email;
            if (step.element.includes("Password")) {
                position = formPositions.password;
            } else if (step.element.includes("Sign Up")) {
                position = formPositions.button;
            }
            // Move cursor
            setCursorPosition(position);
            const clickDelay = setTimeout({
                "AutomationDemo.useEffect.clickDelay": ()=>{
                    setShowCursorClick(true);
                    setTimeout({
                        "AutomationDemo.useEffect.clickDelay": ()=>setShowCursorClick(false)
                    }["AutomationDemo.useEffect.clickDelay"], 200);
                    // Add step to recorded list
                    setTimeout({
                        "AutomationDemo.useEffect.clickDelay": ()=>{
                            setRecordedSteps({
                                "AutomationDemo.useEffect.clickDelay": (prev)=>[
                                        ...prev,
                                        step
                                    ]
                            }["AutomationDemo.useEffect.clickDelay"]);
                            setCurrentStep({
                                "AutomationDemo.useEffect.clickDelay": (prev)=>prev + 1
                            }["AutomationDemo.useEffect.clickDelay"]);
                        }
                    }["AutomationDemo.useEffect.clickDelay"], 300);
                }
            }["AutomationDemo.useEffect.clickDelay"], 600);
            return ({
                "AutomationDemo.useEffect": ()=>clearTimeout(clickDelay)
            })["AutomationDemo.useEffect"];
        }
    }["AutomationDemo.useEffect"], [
        phase,
        currentStep
    ]);
    // Saving animation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutomationDemo.useEffect": ()=>{
            if (phase !== "saving") return;
            // Animate name typing
            const name = "User Signup Flow";
            let i = 0;
            const typeInterval = setInterval({
                "AutomationDemo.useEffect.typeInterval": ()=>{
                    if (i <= name.length) {
                        setAutomationName(name.slice(0, i));
                        i++;
                    } else {
                        clearInterval(typeInterval);
                        setTimeout({
                            "AutomationDemo.useEffect.typeInterval": ()=>setPhase("saved")
                        }["AutomationDemo.useEffect.typeInterval"], 500);
                    }
                }
            }["AutomationDemo.useEffect.typeInterval"], 50);
            return ({
                "AutomationDemo.useEffect": ()=>clearInterval(typeInterval)
            })["AutomationDemo.useEffect"];
        }
    }["AutomationDemo.useEffect"], [
        phase
    ]);
    // Saved -> Sharing transition
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutomationDemo.useEffect": ()=>{
            if (phase !== "saved") return;
            const timer = setTimeout({
                "AutomationDemo.useEffect.timer": ()=>setPhase("sharing")
            }["AutomationDemo.useEffect.timer"], 1200);
            return ({
                "AutomationDemo.useEffect": ()=>clearTimeout(timer)
            })["AutomationDemo.useEffect"];
        }
    }["AutomationDemo.useEffect"], [
        phase
    ]);
    // Sharing animation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutomationDemo.useEffect": ()=>{
            if (phase !== "sharing") return;
            const timer = setTimeout({
                "AutomationDemo.useEffect.timer": ()=>{
                    setShareUrl("simplest.app/run/xK9mL2");
                    setPhase("shared");
                }
            }["AutomationDemo.useEffect.timer"], 1000);
            return ({
                "AutomationDemo.useEffect": ()=>clearTimeout(timer)
            })["AutomationDemo.useEffect"];
        }
    }["AutomationDemo.useEffect"], [
        phase
    ]);
    // Shared -> Scheduling transition  
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutomationDemo.useEffect": ()=>{
            if (phase !== "shared") return;
            const timer = setTimeout({
                "AutomationDemo.useEffect.timer": ()=>setPhase("scheduling")
            }["AutomationDemo.useEffect.timer"], 1500);
            return ({
                "AutomationDemo.useEffect": ()=>clearTimeout(timer)
            })["AutomationDemo.useEffect"];
        }
    }["AutomationDemo.useEffect"], [
        phase
    ]);
    // Scheduling animation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutomationDemo.useEffect": ()=>{
            if (phase !== "scheduling") return;
            const timer = setTimeout({
                "AutomationDemo.useEffect.timer": ()=>setPhase("scheduled")
            }["AutomationDemo.useEffect.timer"], 1200);
            return ({
                "AutomationDemo.useEffect": ()=>clearTimeout(timer)
            })["AutomationDemo.useEffect"];
        }
    }["AutomationDemo.useEffect"], [
        phase
    ]);
    // Scheduled -> Running on right side
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutomationDemo.useEffect": ()=>{
            if (phase !== "scheduled") return;
            const timer = setTimeout({
                "AutomationDemo.useEffect.timer": ()=>{
                    setPhase("running");
                    setIsRunningOnRight(true);
                    setRightSideStep(0);
                    setRightFormState({
                        email: "",
                        password: ""
                    });
                }
            }["AutomationDemo.useEffect.timer"], 1500);
            return ({
                "AutomationDemo.useEffect": ()=>clearTimeout(timer)
            })["AutomationDemo.useEffect"];
        }
    }["AutomationDemo.useEffect"], [
        phase
    ]);
    // Right side automation running
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutomationDemo.useEffect": ()=>{
            if (phase !== "running" || !isRunningOnRight) return;
            if (rightSideStep >= demoSteps.length) {
                setTimeout({
                    "AutomationDemo.useEffect": ()=>{
                        setPhase("complete");
                        setIsRunningOnRight(false);
                    }
                }["AutomationDemo.useEffect"], 800);
                return;
            }
            const step = demoSteps[rightSideStep];
            let position = formPositions.email;
            if (step.element.includes("Password")) {
                position = formPositions.password;
            } else if (step.element.includes("Sign Up")) {
                position = formPositions.button;
            }
            // Move cursor
            setRightCursorPosition(position);
            const clickDelay = setTimeout({
                "AutomationDemo.useEffect.clickDelay": ()=>{
                    setShowRightCursorClick(true);
                    setTimeout({
                        "AutomationDemo.useEffect.clickDelay": ()=>setShowRightCursorClick(false)
                    }["AutomationDemo.useEffect.clickDelay"], 200);
                    // Update form state
                    setTimeout({
                        "AutomationDemo.useEffect.clickDelay": ()=>{
                            if (step.element === "Email" && step.value) {
                                setRightFormState({
                                    "AutomationDemo.useEffect.clickDelay": (prev)=>({
                                            ...prev,
                                            email: step.value
                                        })
                                }["AutomationDemo.useEffect.clickDelay"]);
                            } else if (step.element === "Password" && step.value) {
                                setRightFormState({
                                    "AutomationDemo.useEffect.clickDelay": (prev)=>({
                                            ...prev,
                                            password: step.value
                                        })
                                }["AutomationDemo.useEffect.clickDelay"]);
                            }
                            setRightSideStep({
                                "AutomationDemo.useEffect.clickDelay": (prev)=>prev + 1
                            }["AutomationDemo.useEffect.clickDelay"]);
                        }
                    }["AutomationDemo.useEffect.clickDelay"], 300);
                }
            }["AutomationDemo.useEffect.clickDelay"], 500);
            return ({
                "AutomationDemo.useEffect": ()=>clearTimeout(clickDelay)
            })["AutomationDemo.useEffect"];
        }
    }["AutomationDemo.useEffect"], [
        phase,
        rightSideStep,
        isRunningOnRight
    ]);
    // Complete -> Reset cycle
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutomationDemo.useEffect": ()=>{
            if (phase !== "complete") return;
            const timer = setTimeout({
                "AutomationDemo.useEffect.timer": ()=>{
                    // Reset everything
                    setPhase("idle");
                    setRecordedSteps([]);
                    setCurrentStep(0);
                    setAutomationName("");
                    setShareUrl("");
                    setRightSideStep(0);
                    setRightFormState({
                        email: "",
                        password: ""
                    });
                }
            }["AutomationDemo.useEffect.timer"], 3000);
            return ({
                "AutomationDemo.useEffect": ()=>clearTimeout(timer)
            })["AutomationDemo.useEffect"];
        }
    }["AutomationDemo.useEffect"], [
        phase
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card-elevated-lg overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-3 bg-secondary/30 border-b border-border/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: [
                            "Record",
                            "Share",
                            "Schedule",
                            "Auto-Run"
                        ].map((label, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300", i === 0 && [
                                    "recording",
                                    "saving",
                                    "saved"
                                ].includes(phase) || i === 1 && [
                                    "sharing",
                                    "shared"
                                ].includes(phase) || i === 2 && [
                                    "scheduling",
                                    "scheduled"
                                ].includes(phase) || i === 3 && [
                                    "running",
                                    "complete"
                                ].includes(phase) ? "bg-primary text-primary-foreground" : "text-muted-foreground"),
                                children: [
                                    i === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                        lineNumber: 260,
                                        columnNumber: 27
                                    }, this),
                                    i === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                        lineNumber: 261,
                                        columnNumber: 27
                                    }, this),
                                    i === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                        lineNumber: 262,
                                        columnNumber: 27
                                    }, this),
                                    i === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                        lineNumber: 263,
                                        columnNumber: 27
                                    }, this),
                                    label
                                ]
                            }, label, true, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 248,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-muted-foreground",
                        children: [
                            phase === "idle" && "Starting demo...",
                            phase === "recording" && "Recording actions...",
                            phase === "saving" && "Saving automation...",
                            phase === "saved" && "Automation saved!",
                            phase === "sharing" && "Generating link...",
                            phase === "shared" && "Link copied!",
                            phase === "scheduling" && "Setting schedule...",
                            phase === "scheduled" && "Scheduled daily!",
                            phase === "running" && "Running automation...",
                            phase === "complete" && "Complete! ✨"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-h-[520px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-6 bg-gradient-to-br from-secondary/20 to-secondary/5 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs font-medium text-muted-foreground mb-3 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-5 h-5 rounded bg-primary/10 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-primary text-[10px] font-bold",
                                            children: "1"
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                            lineNumber: 287,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                        lineNumber: 286,
                                        columnNumber: 13
                                    }, this),
                                    "Recording Session"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 285,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "extension-frame overflow-hidden bg-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "browser-chrome flex items-center gap-2 px-3 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2.5 h-2.5 rounded-full bg-red-400/80"
                                                    }, void 0, false, {
                                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2.5 h-2.5 rounded-full bg-yellow-400/80"
                                                    }, void 0, false, {
                                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                        lineNumber: 297,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2.5 h-2.5 rounded-full bg-green-400/80"
                                                    }, void 0, false, {
                                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                lineNumber: 295,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 flex justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-3 py-1 rounded-md bg-background text-[10px] text-muted-foreground font-mono",
                                                    children: "app.example.com/signup"
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                lineNumber: 300,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                        lineNumber: 294,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 bg-card relative min-h-[380px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SignupForm, {
                                                email: currentStep > 1 ? "john@company.com" : "",
                                                password: currentStep > 3 ? "••••••••" : "",
                                                activeField: currentStep === 0 || currentStep === 1 ? "email" : currentStep === 2 || currentStep === 3 ? "password" : currentStep === 4 ? "button" : null
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                lineNumber: 309,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                children: phase === "recording" && currentStep < demoSteps.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        scale: 0.5
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        scale: showCursorClick ? 0.8 : 1,
                                                        x: cursorPosition.x,
                                                        y: cursorPosition.y
                                                    },
                                                    exit: {
                                                        opacity: 0,
                                                        scale: 0.5
                                                    },
                                                    transition: {
                                                        duration: 0.4,
                                                        ease: "easeOut"
                                                    },
                                                    className: "absolute pointer-events-none z-20",
                                                    style: {
                                                        top: 0,
                                                        left: 0
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__["MousePointer2"], {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-5 h-5 text-primary drop-shadow-lg transition-transform", showCursorClick && "scale-90"),
                                                            fill: "currentColor"
                                                        }, void 0, false, {
                                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                            lineNumber: 335,
                                                            columnNumber: 21
                                                        }, this),
                                                        showCursorClick && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            initial: {
                                                                scale: 0,
                                                                opacity: 1
                                                            },
                                                            animate: {
                                                                scale: 2,
                                                                opacity: 0
                                                            },
                                                            transition: {
                                                                duration: 0.4
                                                            },
                                                            className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/40"
                                                        }, void 0, false, {
                                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                            lineNumber: 343,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                lineNumber: 320,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                        lineNumber: 308,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 293,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: (phase === "recording" || phase === "saving" || phase === "saved") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: -20,
                                        scale: 0.95
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -20,
                                        scale: 0.95
                                    },
                                    transition: {
                                        duration: 0.3
                                    },
                                    className: "absolute top-10 right-10 z-30",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RecordingPanel, {
                                        phase: phase,
                                        steps: recordedSteps,
                                        name: automationName
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                        lineNumber: 366,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 359,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 357,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 284,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[380px] border-l border-border flex flex-col bg-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExtensionPopup, {
                                phase: phase,
                                shareUrl: shareUrl,
                                isRunning: isRunningOnRight,
                                runningStep: rightSideStep,
                                totalSteps: demoSteps.length
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 378,
                                columnNumber: 11
                            }, this),
                            isRunningOnRight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    height: 0
                                },
                                animate: {
                                    opacity: 1,
                                    height: "auto"
                                },
                                className: "border-t border-border p-4 bg-secondary/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-5 h-5 rounded bg-success/10 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                    className: "w-3 h-3 text-success"
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                    lineNumber: 395,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                lineNumber: 394,
                                                columnNumber: 17
                                            }, this),
                                            "Auto-running on recipient's browser"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                        lineNumber: 393,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "extension-frame overflow-hidden bg-card scale-90 origin-top-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "browser-chrome flex items-center gap-2 px-2 py-1.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-2 h-2 rounded-full bg-red-400/80"
                                                        }, void 0, false, {
                                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                            lineNumber: 402,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-2 h-2 rounded-full bg-yellow-400/80"
                                                        }, void 0, false, {
                                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                            lineNumber: 403,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-2 h-2 rounded-full bg-green-400/80"
                                                        }, void 0, false, {
                                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                            lineNumber: 404,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                    lineNumber: 401,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                lineNumber: 400,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 bg-card relative min-h-[160px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SignupFormMini, {
                                                        email: rightFormState.email,
                                                        password: rightFormState.password
                                                    }, void 0, false, {
                                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                        lineNumber: 408,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                        children: rightSideStep < demoSteps.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            initial: {
                                                                opacity: 0
                                                            },
                                                            animate: {
                                                                opacity: 1,
                                                                x: rightCursorPosition.x * 0.5,
                                                                y: rightCursorPosition.y * 0.4
                                                            },
                                                            className: "absolute pointer-events-none z-20",
                                                            style: {
                                                                top: 0,
                                                                left: 0
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__["MousePointer2"], {
                                                                className: "w-4 h-4 text-success drop-shadow-lg",
                                                                fill: "currentColor"
                                                            }, void 0, false, {
                                                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                                lineNumber: 425,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                            lineNumber: 415,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                        lineNumber: 413,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                lineNumber: 407,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                        lineNumber: 399,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 388,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 377,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                lineNumber: 282,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
        lineNumber: 243,
        columnNumber: 5
    }, this);
}
_s(AutomationDemo, "UqcljjfCTs0r0/ZXUig/u9xO448=");
_c = AutomationDemo;
// Signup Form Component
function SignupForm({ email, password, activeField }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-[280px] mx-auto space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center mx-auto mb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                            className: "w-5 h-5 text-primary-foreground"
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                            lineNumber: 452,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 451,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-semibold",
                        children: "Create Account"
                    }, void 0, false, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 454,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground mt-1",
                        children: "Start your free trial today"
                    }, void 0, false, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 455,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                lineNumber: 450,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs font-medium mb-1.5 block text-muted-foreground",
                                children: "Email"
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 460,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-3 py-2.5 rounded-lg border bg-background text-sm transition-all", activeField === "email" ? "border-primary ring-2 ring-primary/20" : "border-border"),
                                children: email || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-muted-foreground/50",
                                    children: "john@company.com"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 467,
                                    columnNumber: 23
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 461,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 459,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs font-medium mb-1.5 block text-muted-foreground",
                                children: "Password"
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 472,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-3 py-2.5 rounded-lg border bg-background text-sm transition-all", activeField === "password" ? "border-primary ring-2 ring-primary/20" : "border-border"),
                                children: password || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-muted-foreground/50",
                                    children: "••••••••"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 479,
                                    columnNumber: 26
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 473,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 471,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full py-2.5 rounded-lg font-medium text-sm text-primary-foreground transition-all", activeField === "button" ? "bg-primary ring-2 ring-primary/30" : "bg-primary"),
                        children: "Sign Up"
                    }, void 0, false, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 483,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                lineNumber: 458,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
        lineNumber: 449,
        columnNumber: 5
    }, this);
}
_c1 = SignupForm;
// Mini Signup Form for right side
function SignupFormMini({ email, password }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-[160px] mx-auto space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-6 h-6 rounded-lg bg-primary flex items-center justify-center mx-auto mb-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                            className: "w-3 h-3 text-primary-foreground"
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                            lineNumber: 502,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 501,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] font-medium",
                        children: "Create Account"
                    }, void 0, false, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 504,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                lineNumber: 500,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-2 py-1.5 rounded border border-border bg-background text-[10px]",
                children: email || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-muted-foreground/50",
                    children: "Email"
                }, void 0, false, {
                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                    lineNumber: 507,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                lineNumber: 506,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-2 py-1.5 rounded border border-border bg-background text-[10px]",
                children: password || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-muted-foreground/50",
                    children: "Password"
                }, void 0, false, {
                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                    lineNumber: 510,
                    columnNumber: 22
                }, this)
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                lineNumber: 509,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "w-full py-1.5 rounded bg-primary text-primary-foreground text-[10px] font-medium",
                children: "Sign Up"
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                lineNumber: 512,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
        lineNumber: 499,
        columnNumber: 5
    }, this);
}
_c2 = SignupFormMini;
// Recording Panel Component - matches extension exactly
function RecordingPanel({ phase, steps, name }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "extension-frame-dark w-[260px] text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-3 py-2.5 border-b border-white/[0.06]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-6 h-6 rounded-md bg-gradient-to-br from-[#5E5CE6] to-[#BF5AF2] flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                className: "w-3 h-3",
                                strokeWidth: 2.5
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 531,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                            lineNumber: 530,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[13px] font-semibold text-white/90",
                            children: "Simplest"
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                            lineNumber: 533,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                    lineNumber: 529,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                lineNumber: 528,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3",
                children: phase === "saving" || phase === "saved" ? // Save view
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-7 h-7 rounded-full bg-green-500/15 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-4 h-4 text-green-400"
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                        lineNumber: 548,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 547,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-white/60",
                                    children: [
                                        steps.length,
                                        " actions · 00:12"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 550,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                            lineNumber: 546,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: name,
                            readOnly: true,
                            placeholder: "Name your automation...",
                            className: "w-full h-10 px-3 rounded-lg border border-white/10 bg-white/5 text-white text-[13px] outline-none"
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                            lineNumber: 554,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "flex-1 h-9 rounded-lg bg-white/[0.08] text-white/70 text-xs font-medium",
                                    children: "Discard"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 562,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-1 h-9 rounded-lg text-white text-xs font-medium transition-colors", phase === "saved" ? "bg-green-500" : "bg-[#5E5CE6]"),
                                    children: phase === "saved" ? "Saved ✓" : "Save"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 565,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                            lineNumber: 561,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                    lineNumber: 541,
                    columnNumber: 11
                }, this) : // Recording view
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 rounded-full bg-red-500 recording-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                            lineNumber: 578,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-medium text-white/90",
                                            children: "Recording"
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                            lineNumber: 579,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 577,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5 text-xs text-white/50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                steps.length,
                                                " actions"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                            lineNumber: 582,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white/20",
                                            children: "·"
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                            lineNumber: 583,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono",
                                            children: [
                                                "00:",
                                                String(steps.length * 2).padStart(2, '0')
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                            lineNumber: 584,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 581,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                            lineNumber: 576,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1.5 max-h-[120px] overflow-y-auto demo-scrollbar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: steps.map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: -10
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        className: "flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-green-500/10 border border-green-500/20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "w-3 h-3 text-green-400"
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                lineNumber: 598,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] text-green-300",
                                                children: step.action === "click" ? `Click ${step.element}` : `Type "${step.value}"`
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                lineNumber: 599,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                        lineNumber: 592,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 590,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                            lineNumber: 589,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "w-10 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center text-white/80",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                        lineNumber: 610,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 609,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "flex-1 h-9 rounded-lg bg-[#5E5CE6] text-white text-xs font-medium flex items-center justify-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                            className: "w-3 h-3",
                                            fill: "currentColor"
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                            lineNumber: 613,
                                            columnNumber: 17
                                        }, this),
                                        "Finish"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 612,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                            lineNumber: 608,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                    lineNumber: 575,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                lineNumber: 538,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
        lineNumber: 526,
        columnNumber: 5
    }, this);
}
_c3 = RecordingPanel;
// Extension Popup Component
function ExtensionPopup({ phase, shareUrl, isRunning, runningStep, totalSteps }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-5 py-4 border-b border-border/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 p-1 shadow-md",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/simplest.png",
                                alt: "Simplest",
                                width: 44,
                                height: 44,
                                className: "w-full h-full object-contain rounded-lg"
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 638,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                            lineNumber: 637,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-[16px] font-semibold tracking-tight logo-gradient-text",
                                    children: "Simplest"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 647,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-muted-foreground font-medium",
                                    children: "Automation"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 648,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                            lineNumber: 646,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                    lineNumber: 636,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                lineNumber: 635,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5 border-b border-border/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "w-full h-12 rounded-lg border border-border bg-background hover:bg-secondary/50 flex items-center justify-center gap-3 text-sm font-medium transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                className: "w-4 h-4 fill-destructive text-destructive"
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 656,
                                columnNumber: 11
                            }, this),
                            "Start New Recording"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 655,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-xs text-center text-muted-foreground",
                        children: "Opens a recording panel on the current page"
                    }, void 0, false, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 659,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                lineNumber: 654,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 border-b border-border/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex bg-secondary/50 rounded-lg p-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "flex-1 px-4 py-2 rounded-md text-sm font-medium bg-card shadow-sm",
                            children: "Automations"
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                            lineNumber: 667,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "flex-1 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground",
                            children: "History"
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                            lineNumber: 670,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                    lineNumber: 666,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                lineNumber: 665,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    mode: "wait",
                    children: phase === "idle" || phase === "recording" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        className: "flex flex-col items-center justify-center py-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                    className: "w-6 h-6 text-primary"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 688,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 687,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-[15px] font-semibold tracking-tight mb-1.5",
                                children: "No automations yet"
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 690,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[13px] text-muted-foreground max-w-[200px]",
                                children: "Start by recording your first automation"
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                lineNumber: 691,
                                columnNumber: 15
                            }, this)
                        ]
                    }, "empty", true, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 680,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 10
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        className: "space-y-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group rounded-xl border bg-card p-4 transition-all duration-200", isRunning ? "border-primary/30 shadow-md shadow-primary/5" : "hover:shadow-md"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200", isRunning ? "bg-primary/10" : "bg-muted"),
                                            children: isRunning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "w-4 h-4 text-primary animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                lineNumber: 713,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                className: "w-4 h-4 text-primary"
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                lineNumber: 715,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                            lineNumber: 708,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-[14px] font-medium truncate leading-tight",
                                                    children: "User Signup Flow"
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                    lineNumber: 720,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mt-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: "5 events"
                                                        }, void 0, false, {
                                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                            lineNumber: 724,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted-foreground/30",
                                                            children: "•"
                                                        }, void 0, false, {
                                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                            lineNumber: 725,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: "12s"
                                                        }, void 0, false, {
                                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                            lineNumber: 726,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted-foreground/30",
                                                            children: "•"
                                                        }, void 0, false, {
                                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                            lineNumber: 727,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: "Just now"
                                                        }, void 0, false, {
                                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                            lineNumber: 728,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                    lineNumber: 723,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                            lineNumber: 719,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "w-8 h-8 rounded-lg hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                        lineNumber: 735,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                    lineNumber: 734,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "w-8 h-8 rounded-lg hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                        className: "w-3.5 h-3.5 fill-current"
                                                    }, void 0, false, {
                                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                        lineNumber: 738,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                    lineNumber: 737,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground transition-colors",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                        lineNumber: 741,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                    lineNumber: 740,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                            lineNumber: 733,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 707,
                                    columnNumber: 17
                                }, this),
                                isRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 pt-3 border-t border-border/50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: "Running..."
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                    lineNumber: 750,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-primary font-medium",
                                                    children: [
                                                        runningStep,
                                                        "/",
                                                        totalSteps
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                    lineNumber: 751,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                            lineNumber: 749,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-1.5 bg-secondary rounded-full mt-2 overflow-hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                className: "h-full bg-primary rounded-full",
                                                initial: {
                                                    width: 0
                                                },
                                                animate: {
                                                    width: `${runningStep / totalSteps * 100}%`
                                                },
                                                transition: {
                                                    duration: 0.3
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                lineNumber: 754,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                            lineNumber: 753,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 748,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: (phase === "sharing" || phase === "shared") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            height: 0
                                        },
                                        animate: {
                                            opacity: 1,
                                            height: "auto"
                                        },
                                        exit: {
                                            opacity: 0,
                                            height: 0
                                        },
                                        className: "mt-3 pt-3 border-t border-border/50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 px-3 py-2 rounded-lg text-xs", phase === "shared" ? "bg-green-500/10 border border-green-500/20" : "bg-primary/5 border border-primary/10"),
                                            children: phase === "shared" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        className: "w-3.5 h-3.5 text-green-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                        lineNumber: 781,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-green-700 font-medium",
                                                        children: "Link copied!"
                                                    }, void 0, false, {
                                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                        lineNumber: 782,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-green-600/70 font-mono ml-auto",
                                                        children: shareUrl
                                                    }, void 0, false, {
                                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                        lineNumber: 783,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "w-3.5 h-3.5 text-primary animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                        lineNumber: 787,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-primary",
                                                        children: "Generating share link..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                        lineNumber: 788,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                            lineNumber: 773,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                        lineNumber: 767,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 765,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: (phase === "scheduling" || phase === "scheduled" || phase === "running" || phase === "complete") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            height: 0
                                        },
                                        animate: {
                                            opacity: 1,
                                            height: "auto"
                                        },
                                        exit: {
                                            opacity: 0,
                                            height: 0
                                        },
                                        className: "mt-3 pt-3 border-t border-border/50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-xs text-muted-foreground",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                            lineNumber: 807,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Scheduled: Daily at 9:00 AM"
                                                        }, void 0, false, {
                                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                            lineNumber: 808,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                    lineNumber: 806,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-8 h-5 rounded-full transition-colors relative", phase === "scheduling" ? "bg-muted" : "bg-primary"),
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        className: "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow",
                                                        animate: {
                                                            left: phase === "scheduling" ? 2 : 14
                                                        },
                                                        transition: {
                                                            duration: 0.2
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                        lineNumber: 814,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                                    lineNumber: 810,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                            lineNumber: 805,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                        lineNumber: 799,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                                    lineNumber: 797,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                            lineNumber: 703,
                            columnNumber: 15
                        }, this)
                    }, "automation", false, {
                        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                        lineNumber: 696,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                    lineNumber: 678,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
                lineNumber: 677,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/simplest-automation/website/src/components/AutomationDemo.tsx",
        lineNumber: 633,
        columnNumber: 5
    }, this);
}
_c4 = ExtensionPopup;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "AutomationDemo");
__turbopack_context__.k.register(_c1, "SignupForm");
__turbopack_context__.k.register(_c2, "SignupFormMini");
__turbopack_context__.k.register(_c3, "RecordingPanel");
__turbopack_context__.k.register(_c4, "ExtensionPopup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/simplest-automation/website/src/components/Hero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hero",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chrome$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chrome$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/chrome.js [app-client] (ecmascript) <export default as Chrome>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$components$2f$AutomationDemo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/src/components/AutomationDemo.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const rotatingWords = [
    "Signups",
    "Form Filling",
    "Data Entry",
    "Testing",
    "Reporting"
];
function Hero() {
    _s();
    const [currentWordIndex, setCurrentWordIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Hero.useEffect": ()=>{
            const interval = setInterval({
                "Hero.useEffect.interval": ()=>{
                    setCurrentWordIndex({
                        "Hero.useEffect.interval": (prev)=>(prev + 1) % rotatingWords.length
                    }["Hero.useEffect.interval"]);
                }
            }["Hero.useEffect.interval"], 2500);
            return ({
                "Hero.useEffect": ()=>clearInterval(interval)
            })["Hero.useEffect"];
        }
    }["Hero.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative min-h-screen overflow-hidden bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-subtle opacity-50"
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 opacity-[0.015]",
                style: {
                    backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                    backgroundSize: '64px 64px'
                }
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container-custom relative z-10 pt-28 md:pt-32 pb-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.5
                        },
                        className: "flex justify-center mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-xs font-medium text-primary",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this),
                                "Record · Replay · Share · Schedule"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.6,
                            delay: 0.1
                        },
                        className: "text-center max-w-4xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]",
                                children: [
                                    "Automate your",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative inline-block",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            mode: "wait",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                                initial: {
                                                    opacity: 0,
                                                    y: 20
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    y: 0
                                                },
                                                exit: {
                                                    opacity: 0,
                                                    y: -20
                                                },
                                                transition: {
                                                    duration: 0.3
                                                },
                                                className: "logo-gradient-text",
                                                children: rotatingWords[currentWordIndex]
                                            }, currentWordIndex, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                                                lineNumber: 67,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8",
                                children: "Turn repetitive browser tasks into one-click automations. Record once, replay forever, share with anyone."
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row items-center justify-center gap-3 mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "#get-started",
                                        className: "btn-primary text-base px-8 py-3.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chrome$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chrome$3e$__["Chrome"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                                                lineNumber: 90,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Add to Chrome — Free"
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                                                lineNumber: 91,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                                                lineNumber: 92,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "#how-it-works",
                                        className: "btn-secondary text-base px-8 py-3.5",
                                        children: "See how it works"
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-1.5 mb-12",
                                children: rotatingWords.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setCurrentWordIndex(index),
                                        className: `h-1 rounded-full transition-all duration-300 ${index === currentWordIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/20 hover:bg-muted-foreground/40"}`
                                    }, index, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 40
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.8,
                            delay: 0.3
                        },
                        className: "max-w-6xl mx-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$components$2f$AutomationDemo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutomationDemo"], {}, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/simplest-automation/website/src/components/Hero.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(Hero, "NBBVdMl1ttqjcqjogCU2kdaLem4=");
_c = Hero;
var _c;
__turbopack_context__.k.register(_c, "Hero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/simplest-automation/website/src/components/Features.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Features",
    ()=>Features
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$click$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointerClick$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/mouse-pointer-click.js [app-client] (ecmascript) <export default as MousePointerClick>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const features = [
    {
        id: "recording",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$click$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointerClick$3e$__["MousePointerClick"],
        title: "Keystroke-level precision",
        description: "Every single click, keystroke, and scroll is captured with exact timing. Your automations replay exactly as you recorded them.",
        items: [
            "Capture every mouse click and keyboard input",
            "Record across multiple page navigations",
            "Real-time event counter shows what's being captured",
            "Beautiful floating panel stays out of your way"
        ]
    },
    {
        id: "replay",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"],
        title: "Visual playback with cursor",
        description: "Watch your automations execute with an animated cursor showing exactly where each action is performed.",
        items: [
            "Animated cursor shows actions in real-time",
            "Multi-strategy element finding for reliability",
            "Smart timing respects original recording pace",
            "Form validation triggered correctly"
        ]
    },
    {
        id: "sharing",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"],
        title: "One-click shareable links",
        description: "Generate a unique URL for any automation. Anyone can run it instantly without installing anything.",
        items: [
            "Generate shareable links in one click",
            "Recipients run automations instantly",
            "No extension required for running",
            "Links copied to clipboard automatically"
        ]
    },
    {
        id: "scheduling",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
        title: "Set it and forget it",
        description: "Schedule automations to run hourly, daily, weekly, or with custom intervals. Perfect for recurring tasks.",
        items: [
            "Preset schedules for common intervals",
            "Custom cron expressions for flexibility",
            "Background execution without interaction",
            "Run history tracks all scheduled runs"
        ]
    }
];
const stats = [
    {
        value: "50%",
        label: "Time saved on repetitive tasks"
    },
    {
        value: "1-click",
        label: "To share any automation"
    },
    {
        value: "100%",
        label: "Free forever"
    }
];
function Features() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("recording");
    const activeFeature = features.find((f)=>f.id === activeTab);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "features",
        className: "section-padding bg-background relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 opacity-[0.01]",
                style: {
                    backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                    backgroundSize: '48px 48px'
                }
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container-custom relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center max-w-3xl mx-auto mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4",
                                children: [
                                    "Delegate repetitive work",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "logo-gradient-text",
                                        children: "to automations"
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg text-muted-foreground",
                                children: "Built with obsessive attention to detail. Every feature designed to make browser automation feel effortless."
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-elevated-lg overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 px-4 py-3 border-b border-border/50 bg-secondary/30 overflow-x-auto no-scrollbar",
                                children: features.map((feature)=>{
                                    const Icon = feature.icon;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveTab(feature.id),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap", activeTab === feature.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-card/50"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                                lineNumber: 123,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: feature.id.charAt(0).toUpperCase() + feature.id.slice(1)
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                                lineNumber: 124,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, feature.id, true, {
                                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                        lineNumber: 113,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid md:grid-cols-2 gap-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-8 md:p-10 bg-card",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: 10
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            transition: {
                                                duration: 0.3
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(activeFeature.icon, {
                                                        className: "w-6 h-6 text-primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-3",
                                                    children: activeFeature.title
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-muted-foreground mb-6",
                                                    children: activeFeature.description
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "space-y-3",
                                                    children: activeFeature.items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].li, {
                                                            initial: {
                                                                opacity: 0,
                                                                x: -10
                                                            },
                                                            animate: {
                                                                opacity: 1,
                                                                x: 0
                                                            },
                                                            transition: {
                                                                delay: index * 0.1
                                                            },
                                                            className: "flex items-start gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                        className: "w-3 h-3 text-success"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                                                        lineNumber: 159,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                                                    lineNumber: 158,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm",
                                                                    children: item
                                                                }, void 0, false, {
                                                                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                                                    lineNumber: 161,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, index, true, {
                                                            fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, activeTab, true, {
                                            fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                            lineNumber: 134,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                        lineNumber: 133,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-8 md:p-10 bg-secondary/30 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                scale: 0.95
                                            },
                                            animate: {
                                                opacity: 1,
                                                scale: 1
                                            },
                                            transition: {
                                                duration: 0.4
                                            },
                                            className: "w-full max-w-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureVisual, {
                                                featureId: activeTab
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                                lineNumber: 177,
                                                columnNumber: 17
                                            }, this)
                                        }, activeTab, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                            lineNumber: 170,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                        lineNumber: 169,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-4 mt-8",
                        children: stats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-5 rounded-xl bg-card border border-border/50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl md:text-3xl font-bold logo-gradient-text mb-1",
                                        children: stat.value
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                        lineNumber: 190,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground",
                                        children: stat.label
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
_s(Features, "VwJAxMFL0ajvdVyk/wKBslyk4cw=");
_c = Features;
function FeatureVisual({ featureId }) {
    if (featureId === "recording") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card-elevated p-4 space-y-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3 h-3 rounded-full bg-destructive recording-pulse"
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium",
                                    children: "Recording..."
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: "5 events captured"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                    lineNumber: 212,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                            lineNumber: 210,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                    lineNumber: 206,
                    columnNumber: 9
                }, this),
                [
                    "Click email input",
                    "Type: user@example.com",
                    "Click submit"
                ].map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        transition: {
                            delay: i * 0.2
                        },
                        className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-success/5 border border-success/10 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                className: "w-3.5 h-3.5 text-success"
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                lineNumber: 224,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-success",
                                children: step
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                lineNumber: 225,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                        lineNumber: 217,
                        columnNumber: 13
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
            lineNumber: 205,
            columnNumber: 7
        }, this);
    }
    if (featureId === "replay") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card-elevated p-6 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                        className: "w-7 h-7 text-primary fill-current"
                    }, void 0, false, {
                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                        lineNumber: 237,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                    lineNumber: 236,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-medium mb-3",
                    children: "Running automation..."
                }, void 0, false, {
                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                    lineNumber: 239,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-2 bg-secondary rounded-full overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            width: 0
                        },
                        animate: {
                            width: "75%"
                        },
                        transition: {
                            duration: 2,
                            repeat: Infinity
                        },
                        className: "h-full bg-primary rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                        lineNumber: 241,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                    lineNumber: 240,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-muted-foreground mt-2",
                    children: "Step 3 of 4"
                }, void 0, false, {
                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                    lineNumber: 248,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
            lineNumber: 235,
            columnNumber: 7
        }, this);
    }
    if (featureId === "sharing") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card-elevated p-5 space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            className: "w-5 h-5 text-success"
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                            lineNumber: 257,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium text-success",
                            children: "Link copied to clipboard!"
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                            lineNumber: 258,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                    lineNumber: 256,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-3 rounded-lg bg-secondary border border-border font-mono text-xs text-muted-foreground break-all",
                    children: "simplest.app/run/xK9mL2pQ"
                }, void 0, false, {
                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                    lineNumber: 262,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-muted-foreground text-center",
                    children: "Anyone with this link can run your automation"
                }, void 0, false, {
                    fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                    lineNumber: 265,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
            lineNumber: 255,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card-elevated p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium",
                        children: "Schedule"
                    }, void 0, false, {
                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium",
                        children: "Active"
                    }, void 0, false, {
                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between py-2 border-b border-border",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "Frequency"
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                lineNumber: 282,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: "Every day"
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between py-2 border-b border-border",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "Time"
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: "9:00 AM"
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "Next run"
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                lineNumber: 290,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: "Tomorrow"
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                                lineNumber: 291,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
                lineNumber: 280,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/simplest-automation/website/src/components/Features.tsx",
        lineNumber: 273,
        columnNumber: 5
    }, this);
}
_c1 = FeatureVisual;
var _c, _c1;
__turbopack_context__.k.register(_c, "Features");
__turbopack_context__.k.register(_c1, "FeatureVisual");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/simplest-automation/website/src/components/HowItWorks.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HowItWorks",
    ()=>HowItWorks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
"use client";
;
;
const steps = [
    {
        number: "01",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"],
        title: "Record",
        description: "Click Start and perform any actions. Every click, keystroke, and navigation is captured automatically."
    },
    {
        number: "02",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"],
        title: "Replay",
        description: "Run your automation with a single click. Watch it execute with a visual cursor showing each step."
    },
    {
        number: "03",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"],
        title: "Share",
        description: "Generate a shareable link instantly. Anyone can run your automation without installing anything."
    },
    {
        number: "04",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
        title: "Schedule",
        description: "Set automations to run on a schedule. Perfect for reports, backups, and recurring tasks."
    }
];
function HowItWorks() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "how-it-works",
        className: "section-padding bg-secondary/30 relative",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-custom",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center max-w-3xl mx-auto mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4",
                            children: [
                                "Four steps to",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "logo-gradient-text",
                                    children: "automation bliss"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg text-muted-foreground",
                            children: "No code required. No complex setup. Just record, replay, and let automation handle the rest."
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid md:grid-cols-2 lg:grid-cols-4 gap-4",
                    children: steps.map((step, index)=>{
                        const Icon = step.icon;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative group",
                            children: [
                                index < steps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden lg:block absolute top-10 left-full w-full h-px z-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-px bg-border"
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                                            lineNumber: 62,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/30"
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                                            lineNumber: 63,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                                    lineNumber: 61,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative z-10 p-5 rounded-xl border border-border/50 bg-card hover:shadow-lg hover:border-border transition-all duration-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-bold text-muted-foreground/40 mb-3 block",
                                            children: step.number
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                                            lineNumber: 69,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                className: "w-6 h-6 text-primary"
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                                                lineNumber: 75,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                                            lineNumber: 74,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold mb-2",
                                            children: step.title
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                                            lineNumber: 79,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground leading-relaxed",
                                            children: step.description
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                                            lineNumber: 80,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                                    lineNumber: 67,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, step.number, true, {
                            fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                            lineNumber: 58,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/simplest-automation/website/src/components/HowItWorks.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = HowItWorks;
var _c;
__turbopack_context__.k.register(_c, "HowItWorks");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/simplest-automation/website/src/components/UseCases.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UseCases",
    ()=>UseCases
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/file-spreadsheet.js [app-client] (ecmascript) <export default as FileSpreadsheet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$test$2d$tube$2d$diagonal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TestTube2$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/test-tube-diagonal.js [app-client] (ecmascript) <export default as TestTube2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/database.js [app-client] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rectangle$2d$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormInput$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/rectangle-ellipsis.js [app-client] (ecmascript) <export default as FormInput>");
"use client";
;
;
const useCases = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rectangle$2d$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormInput$3e$__["FormInput"],
        title: "Form Automation",
        description: "Fill out repetitive forms with a single click. Perfect for registrations, applications, and data entry.",
        example: "Auto-fill signup forms for new accounts"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        title: "User Onboarding",
        description: "Guide new team members through complex workflows. Share automations that run their first setup.",
        example: "Onboard new hires to internal tools"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$test$2d$tube$2d$diagonal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TestTube2$3e$__["TestTube2"],
        title: "Testing & QA",
        description: "Record user flows once and replay them to catch regressions. No coding required.",
        example: "Test checkout flow after each deploy"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
        title: "Reporting",
        description: "Schedule automations to pull reports from dashboards. Get data delivered automatically.",
        example: "Export weekly analytics every Monday"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"],
        title: "Data Collection",
        description: "Automate repetitive data gathering from web applications. No more copy-pasting.",
        example: "Collect competitor pricing daily"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__["FileSpreadsheet"],
        title: "Spreadsheet Sync",
        description: "Keep web apps and spreadsheets in sync. Automate data transfers between systems.",
        example: "Update CRM from Google Sheets"
    }
];
function UseCases() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "use-cases",
        className: "section-padding bg-background relative",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-custom",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center max-w-3xl mx-auto mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4",
                            children: [
                                "Built for",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "logo-gradient-text",
                                    children: "real workflows"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg text-muted-foreground",
                            children: "From solo users to enterprise teams, Simplest adapts to how you work. Here are some popular use cases."
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
                    children: useCases.map((useCase)=>{
                        const Icon = useCase.icon;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "group p-5 rounded-xl border border-border/50 bg-card hover:shadow-lg hover:border-border transition-all duration-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: "w-5 h-5 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
                                        lineNumber: 84,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
                                    lineNumber: 83,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base font-semibold mb-2",
                                    children: useCase.title
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
                                    lineNumber: 87,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground mb-3 leading-relaxed",
                                    children: useCase.description
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
                                    lineNumber: 88,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 pt-3 border-t border-border/50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-medium text-muted-foreground uppercase tracking-wide",
                                            children: "Example"
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
                                            lineNumber: 93,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-foreground/70",
                                            children: useCase.example
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
                                            lineNumber: 96,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
                                    lineNumber: 92,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, useCase.title, true, {
                            fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
                            lineNumber: 79,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/simplest-automation/website/src/components/UseCases.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_c = UseCases;
var _c;
__turbopack_context__.k.register(_c, "UseCases");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/simplest-automation/website/src/components/CTA.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CTA",
    ()=>CTA
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chrome$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chrome$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/chrome.js [app-client] (ecmascript) <export default as Chrome>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/image.js [app-client] (ecmascript)");
"use client";
;
;
;
;
const stats = [
    {
        value: "10K+",
        label: "Active Users"
    },
    {
        value: "4.9",
        label: "Chrome Rating",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"]
    },
    {
        value: "100%",
        label: "Free Forever"
    },
    {
        value: "<1min",
        label: "Setup Time"
    }
];
function CTA() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "get-started",
        className: "section-padding bg-background relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-subtle opacity-50"
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container-custom relative z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mx-auto text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-block mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/transparent.png",
                                alt: "Simplest",
                                width: 96,
                                height: 96,
                                className: "w-24 h-24 object-contain"
                            }, void 0, false, {
                                fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                                lineNumber: 24,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4",
                            children: "Ready to automate?"
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg text-muted-foreground mb-8 max-w-xl mx-auto",
                            children: "Join thousands of users who have simplified their browser workflows. Free forever for personal use."
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col sm:flex-row items-center justify-center gap-3 mb-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "https://chrome.google.com/webstore",
                                target: "_blank",
                                className: "btn-primary text-base px-8 py-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chrome$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chrome$3e$__["Chrome"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Add to Chrome — Free"
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 md:grid-cols-4 gap-3",
                            children: stats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-xl bg-card border border-border/50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xl font-bold logo-gradient-text",
                                                    children: stat.value
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                                                    lineNumber: 64,
                                                    columnNumber: 19
                                                }, this),
                                                stat.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                    className: "w-4 h-4 text-yellow-500 fill-yellow-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                                            lineNumber: 63,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: stat.label
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                                            lineNumber: 69,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/simplest-automation/website/src/components/CTA.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = CTA;
var _c;
__turbopack_context__.k.register(_c, "CTA");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/simplest-automation/website/src/components/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/github.js [app-client] (ecmascript) <export default as Github>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript) <export default as Twitter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/simplest-automation/website/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const links = {
    product: [
        {
            name: "Features",
            href: "#features"
        },
        {
            name: "How It Works",
            href: "#how-it-works"
        },
        {
            name: "Use Cases",
            href: "#use-cases"
        }
    ],
    resources: [
        {
            name: "Documentation",
            href: "/docs"
        },
        {
            name: "API Reference",
            href: "/api"
        },
        {
            name: "Support",
            href: "/support"
        }
    ],
    company: [
        {
            name: "About",
            href: "/about"
        },
        {
            name: "Blog",
            href: "/blog"
        },
        {
            name: "Contact",
            href: "/contact"
        }
    ],
    legal: [
        {
            name: "Privacy",
            href: "/privacy"
        },
        {
            name: "Terms",
            href: "/terms"
        }
    ]
};
const socials = [
    {
        name: "GitHub",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__["Github"],
        href: "https://github.com/yourusername/simplest-automation"
    },
    {
        name: "Twitter",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__["Twitter"],
        href: "https://twitter.com/simplestapp"
    },
    {
        name: "Email",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"],
        href: "mailto:hello@simplest.app"
    }
];
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-secondary/30 border-t border-border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container-custom py-10 md:py-14",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-6 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "flex items-center gap-3 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/transparent.png",
                                            alt: "Simplest",
                                            width: 52,
                                            height: 52,
                                            className: "w-13 h-13 object-contain"
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                            lineNumber: 49,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-base font-semibold logo-gradient-text",
                                                    children: "Simplest"
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                                    lineNumber: 57,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-muted-foreground -mt-0.5",
                                                    children: "Automation"
                                                }, void 0, false, {
                                                    fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                                    lineNumber: 58,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                            lineNumber: 56,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                    lineNumber: 48,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground mb-5 max-w-xs",
                                    children: "Browser automation made beautiful. Record, replay, and share with pixel-perfect accuracy."
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: socials.map((social)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: social.href,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-colors",
                                            "aria-label": social.name,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(social.icon, {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                                lineNumber: 76,
                                                columnNumber: 19
                                            }, this)
                                        }, social.name, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                            lineNumber: 68,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-semibold mb-3",
                                    children: "Product"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2",
                                    children: links.product.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
                                                children: link.name
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                                lineNumber: 88,
                                                columnNumber: 19
                                            }, this)
                                        }, link.name, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                            lineNumber: 87,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-semibold mb-3",
                                    children: "Resources"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2",
                                    children: links.resources.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
                                                children: link.name
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                                lineNumber: 104,
                                                columnNumber: 19
                                            }, this)
                                        }, link.name, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                            lineNumber: 103,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-semibold mb-3",
                                    children: "Company"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2",
                                    children: links.company.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
                                                children: link.name
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                                lineNumber: 120,
                                                columnNumber: 19
                                            }, this)
                                        }, link.name, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                            lineNumber: 119,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-semibold mb-3",
                                    children: "Legal"
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2",
                                    children: links.legal.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
                                                children: link.name
                                            }, void 0, false, {
                                                fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                                lineNumber: 136,
                                                columnNumber: 19
                                            }, this)
                                        }, link.name, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                            lineNumber: 135,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-border",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container-custom py-5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: [
                                    "© ",
                                    new Date().getFullYear(),
                                    " Simplest. All rights reserved."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "flex items-center gap-1.5 text-xs text-muted-foreground",
                                children: [
                                    "Built with",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                        animate: {
                                            scale: [
                                                1,
                                                1.2,
                                                1
                                            ]
                                        },
                                        transition: {
                                            duration: 1,
                                            repeat: Infinity
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$simplest$2d$automation$2f$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                            className: "w-3.5 h-3.5 text-destructive fill-destructive"
                                        }, void 0, false, {
                                            fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                            lineNumber: 162,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    "by the Simplest team"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/simplest-automation/website/src/components/Footer.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=simplest-automation_website_src_275b76d3._.js.map