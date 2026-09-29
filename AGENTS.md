# Speak FM agent guardrails

## Purpose and scope

This repository is a static Vue/Vuetify radio-station site with exactly these page sections, in order: Header, Hero, Advert banner, About us, Radio schedule, Latest posts, Services, Team, Reviews, and Contact us.

In scope: accessible presentation of station content, live stream playback, schedule, third-party WordPress news consumption, static adverts, static sample reviews, and a configurable external contact form.

Out of scope unless explicitly approved: new pages or sections, accounts/login, e-commerce, CMS/admin UI, unrelated backend endpoints, plugins, server changes to the third-party WordPress site, and new dependencies.

## Stack source of truth

Use `package.json` for declared versions. The current project uses Vue 3, Vuetify 3, Vue Router 4, Vuex 4, Vue CLI 5, webpack, ESLint, and Prettier. Do not assume Vite: `vue.config.js` and the CLI scripts are authoritative.

## Commands

```text
npm install
npm run serve
npm run build
npm run lint
npm test              # currently unavailable: no test script is defined
npm run preview       # currently unavailable: no preview script is defined
```

Do not invent missing commands; update this file only when the project scripts change.

## Code conventions

- Prefer Vue 3 Composition API with `<script setup>` for new or substantially edited components.
- One component owns one page section; keep schedule subcomponents focused.
- Use PascalCase component filenames and clear camelCase composable/helper names.
- Type props and emits where the project’s chosen JavaScript/TypeScript approach permits; do not add TypeScript solely for a small change.
- Keep station data/configuration separate from presentation. Keep stream and WordPress base URLs in one config source.
- Make small, reversible changes. Explain why in the change summary and preserve unrelated working-tree edits.

## Vuetify rules

- Use tree-shaken component imports/auto-import configuration only; never import the full library manually.
- Use Vuetify theme tokens instead of hardcoded brand colors.
- Use Vuetify grid and breakpoint utilities for responsive layout.
- Avoid custom CSS that overrides Vuetify internals unless a documented, narrow exception is necessary.

## Performance budget

Until the Phase 4 baseline is recorded, use this provisional ceiling: initial JavaScript <=170 KB gzip, total first-load page assets <=1 MB excluding the live stream, and no added animation JS above 2 KB gzip. The measured Phase 4 budget becomes the governing ceiling if it is tighter. Do not knowingly regress LCP, CLS, or TBT; targets are Lighthouse mobile >=90, LCP <2.5s on 4G, and CLS <0.1.

## Security and privacy

- Never use `v-html` for untrusted WordPress, review, or advert content. Prefer plain text; sanitize only when HTML is unavoidable.
- Never put secrets, API keys, or credentials in frontend code or committed `.env` files.
- Treat static adverts and sample reviews as editable content, not verified user submissions. Label sample reviews clearly and never imply they are real testimonials.
- Contact form submissions must use the configured external form-service endpoint; validate and length-limit fields client-side and use a honeypot.
- Use HTTPS for all assets, stream, WordPress, and form-service requests.
- Recommend CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and frame protections for the chosen host.

## Motion rules

- All scroll reveals use the shared `v-reveal` directive and CSS timing variables.
- Animate only `opacity` and `transform`; no animation libraries without approval.
- Reveal once with IntersectionObserver, reserve layout space, and honor `prefers-reduced-motion`.
- Hero and all above-the-fold/LCP content must never be delayed. Content must remain visible if JavaScript or the observer fails.
- Motion JS budget is <=2 KB gzip. Use 300-500ms duration, the shared easing token, 16-24px travel, 60-80ms stagger, and no more than six staggered items per group.

## Accessibility minimums

Use semantic landmarks, meaningful alt text, keyboard navigation, visible focus states, WCAG AA contrast, 44px touch targets, and reduced-motion support. Audio starts only after user action and must expose a clear state/error.

## Change rules and definition of done

Do not add dependencies, sections, or delete existing content without approval. Do not commit secrets. Do not run destructive commands or force upgrades. For each task: production build is clean, lint passes, Lighthouse mobile is checked, console errors are investigated, and relevant reduced-motion/keyboard/mobile behavior is verified.

## Ask first

Confirm before: choosing review hosting or moderation; adding a dependency; adding a proxy for WordPress/stream; changing external URLs or content; adding third-party scripts/ads/CAPTCHA; changing deployment/headers; adding pages/sections; changing retention or privacy wording; applying broad refactors; deleting content; or implementing Phase 6 motion/polish work before plan approval.
