# Speak FM performance recommendations

Measured 2026-09-29 from `npm run build`. No application changes were made during measurement.

## Baseline

The production build completed successfully in 37.9 seconds, with webpack warnings for oversized assets.

| Output | Size | Gzip |
| --- | ---: | ---: |
| `dist/js/chunk-vendors.5b36492b.js` | 324.86 KiB | 106.11 KiB |
| `dist/js/app.18a34d1b.js` | 28.25 KiB | 8.95 KiB |
| `dist/js/webfontloader.16aec0c8.js` | 12.00 KiB | 4.82 KiB |
| `dist/js/about.e7168c09.js` | 0.41 KiB | 0.31 KiB |
| `dist/css/chunk-vendors.3481de80.css` | 577.20 KiB | 82.69 KiB |
| `dist/css/app.8f1b9096.css` | 1.24 KiB | 0.51 KiB |
| **Initial app entrypoint** | **932 KiB** | **~203 KiB JS/CSS gzip from listed chunks** |

Largest source assets are `ANGOMBABRAOFFICEATTENDANT.jpg` (2.0 MiB), `AGWENGLIZPRESENTER.jpg` (1.16 MiB), `Speakfm-exterior.png` (1.01 MiB), `MWAKA...jpg` (533 KiB), and `KIDEGA...jpg` (385 KiB). The build also emits MDI font files up to 1,000 KiB (`dist/fonts/`). Four public source maps are emitted (`dist/js/*.js.map`).

Lighthouse mobile was not run because no Lighthouse command or configured browser test harness exists in the repository. It must be run after implementation on the deployed HTTPS origin. The target remains Performance >=90, LCP <2.5s on 4G, CLS <0.1, and no measurable TBT regression.

## Recommendations, ordered by impact-to-effort ratio

| Recommendation | Impact | Effort | Risk |
| --- | --- | --- | --- |
| Convert the largest staff/exterior assets to responsive WebP/AVIF, compress them, and declare width/height/aspect ratios. | High | Low | Low; verify visual quality and existing references. |
| Replace the full MDI font with only used icons or inline SVG; remove unused font formats. | High | Low | Medium; verify icon rendering and Vuetify integration. |
| Self-host at most two font families and a small weight set; use `font-display: swap`. | High | Low | Low; recheck brand typography and layout. |
| Add a small client cache and timeout for schedule/posts; request only a small `_fields` set and latest few posts. | High | Low | Low; stale content is bounded by a short TTL. |
| Render WordPress excerpts as text, use fixed-size skeletons, lazy-load below-fold images, and provide an external fallback link. | High | Low | Low; improve resilience and reduce layout shift. |
| Keep `preload="none"` on the stream, start only from user action, and consolidate to one accessible player with error/reconnect state. | High | Medium | Medium; test browser stream compatibility. |
| Lazy-load below-the-fold sections with `defineAsyncComponent` after the critical hero/player path is stable. | Medium | Medium | Medium; avoid delaying content or harming no-JS fallback. |
| Configure Vuetify tree-shaking/auto-import for this Vue CLI setup and audit global component/icon imports. | Medium | Medium | Medium; validate build output because current tooling is old. |
| Disable public production source maps or upload them only to a protected error-tracking service. | Medium | Low | Low; preserve a secure debugging workflow. |
| Add Brotli/gzip, hashed long-lived asset caching, and CDN delivery at the chosen host; preconnect only to critical origins. | Medium | Low | Low; depends on hosting. |
| Remove unused CSS/dead components and avoid custom CSS that overrides Vuetify internals. | Medium | Medium | Low. |
| Use SSG/prerendering only if SEO/first paint testing shows a clear gain; current site is small but WordPress content remains runtime data. | Low/Medium | High | Medium; adds build/deployment complexity. |

## Implementation constraints

- Initial JavaScript budget: keep the current 8.95 KiB app chunk from growing materially; target <=170 KiB total initial JS gzip and <=2 KiB gzip added motion JS.
- Keep the hero/LCP image eager and optimized; all other images should be lazy, responsive, and dimensioned.
- Do not run reveal animation on the LCP element. Content must be visible if JavaScript is disabled or IntersectionObserver never fires.
- Re-run build and Lighthouse mobile after each motion/polish step and compare LCP, CLS, and TBT with a recorded pre-motion baseline.
