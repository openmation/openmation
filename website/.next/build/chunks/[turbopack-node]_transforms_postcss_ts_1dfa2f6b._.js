module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/simplest-automation/website/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/01207_53b92b78._.js",
  "chunks/[root-of-the-server]__e9d2a9c5._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/simplest-automation/website/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];