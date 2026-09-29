# Speak FM project overview

Reviewed on 2026-09-29. This describes the current working tree, including existing uncommitted changes. No application source files were changed for this review.

## Tech stack

- Vue 3, declared as `^3.2.13`; installed `3.5.38` (`package.json:14`, `package-lock.json:2988`).
- Vuetify 3, declared as `^3.0.0-beta.0`; installed `3.12.8` (`package.json:16`).
- Vue Router 4 (`package.json:15`), Vuex 4 (`package.json:17`), Core-js (`package.json:12`).
- Vue CLI 5 / webpack build, not Vite: `@vue/cli-service` and CLI plugins (`package.json:23-27`); build config is `vue.config.js:1-10`.
- UI assets: MDI font `5.9.55`, Roboto fontface, and dynamically loaded Google Poppins, Montserrat, and Roboto (`package.json:11,13`, `src/plugins/webfontloader.js:7-19`).
- Linting/formatting: ESLint 7, eslint-plugin-vue, Prettier (`package.json:28-32`).

## Key folders and files

| Path | Purpose |
| --- | --- |
| `src/components/` | Page sections and schedule subcomponents. |
| `src/views/` | Route-level views: the composed home page and placeholder about page. |
| `src/router/` | Vue Router history and routes (`src/router/index.js:1-24`). |
| `src/store/` | Empty Vuex store scaffold (`src/store/index.js:3-9`). |
| `src/plugins/` | Vuetify and font-loader setup. |
| `src/utils/` | Hardcoded schedule, services, team data, and schedule helpers. |
| `src/assets/` | Logos, station images, news image, and staff photos. |
| `public/` | Static favicon and HTML shell. |
| `dist/` | Existing generated build output; ignored by Git (`.gitignore:3`). |

## Intended 10 sections: current implementation

1. **Header** — `src/components/AppNavigation.vue:1-64`; Vuetify app bar and temporary drawer. Navigation uses hash links for About, Schedule, Services, Team, and Contact (`:20-41`). Items in the drawer currently render as text without links (`:3-12,52-58`).
2. **Hero** — `src/components/HomeHero.vue:1-27`; hardcoded station name, frequency, tagline, background image, and native audio control. The stream URL is hardcoded at `:17-19`.
3. **Advert banner** — not implemented. `src/views/HomeView.vue:1-10` has no advert component between hero and About.
4. **About us** — `src/components/AboutUs.vue:1-84`; hardcoded intro, vision, mission, and strategic goal text. No separate values list is present (`:6-69`).
5. **Radio schedule** — `src/components/RadioSchedule.vue:1-113` plus `src/components/radioSchedule/*`; schedule data is hardcoded in `src/utils/radioScheduler.js:7-304`, with current/next show logic in `src/utils/timeHelper.js:7-119`.
6. **Latest posts** — `src/components/NewsArticles.vue:1-69`; fetched directly from the third-party WordPress REST API at `:51-61`. It requests six embedded posts, renders title/excerpt HTML, and constructs a hardcoded article URL (`:25-35,53-54`).
7. **Services** — `src/components/OurServices.vue:1-59`; hardcoded service data from `src/utils/servicesHelper.js:1-47`; Get in touch is a hash link to Contact (`OurServices.vue:30-40`).
8. **Team** — `src/components/OurTeam.vue:1-40`; hardcoded team data and imported local photos from `src/utils/teamHelper.js:1-50`.
9. **Reviews** — not implemented. There is no review component, form, API client, route, datastore, or review endpoint in the repository inventory.
10. **Contact us** — `src/components/ContactUs.vue:1-115`; contact details are hardcoded in the template (`:16-43`). There is no contact form.

The home page order currently is Header, Hero, About, Schedule, News, Services, Team, Contact (`src/views/HomeView.vue:1-10`), so Advert and Reviews are absent and News is before Services as intended.

## Stream playback

There are two native `<audio>` elements: the hero player in `src/components/HomeHero.vue:17-19` and another inside the current-show schedule slide in `src/components/radioSchedule/LiveShowSlide.vue:29-36`. Both use `preload="none"`; neither has a Vue ref, explicit play/error/reconnect handling, shared state, or a persistent mini-player. The stream address is duplicated and hardcoded as `https://www.radiocomnetu.org/speakfm-stream`.

## WordPress/news integration

`NewsArticles.vue:51-68` performs one client-side fetch on mount to `https://www.radiocomnetu.org/speakfm/wp-json/wp/v2/posts?_embed&per_page=6`. It has loading and error text, but no timeout, cache, skeleton, fallback link, `_fields` limitation, or explicit CORS/mixed-content handling. WordPress title and excerpt HTML are inserted with `v-html` at `:25-27` without visible sanitization. The external content is therefore currently trusted by the browser.

## Reviews and data storage

No reviews workflow or storage exists in the current codebase. There is no backend configuration, environment variable, API client, moderation flow, validation, spam control, or public-review response handling to document.

## Navigation, responsiveness, and scrolling

- The home route is composed from section components in `src/views/HomeView.vue:1-38`; `/about` is a lazy-loaded placeholder route in `src/router/index.js:10-18`.
- Hash links target section IDs (`#home`, `#about`, `#schedule`, `#services`, `#team`, `#contactUs`) in `AppNavigation.vue:15-41` and `OurServices.vue:30-40`.
- Responsive behavior relies mainly on Vuetify utility classes and grid breakpoints, for example `hidden-sm-and-down` / `hidden-md-and-up` in `AppNavigation.vue:20-40` and `v-col` breakpoints in `OurServices.vue:7-14` and `OurTeam.vue:6-16`.
- The app bar uses Vuetify scroll behavior hide at `AppNavigation.vue:15`; there is no custom active-section tracking, smooth-scroll offset, or `scroll-margin-top` found.
- The schedule uses a vertical Vuetify carousel and a scroll container (`RadioSchedule.vue:6-24,107-113`).

## Build, run, and deploy

```text
npm install
npm run serve   # development server with hot reload
npm run build   # production build to dist/
npm run lint    # Vue CLI lint task
```

These scripts are defined in `package.json:5-8` and are also documented in `README.md:3-21`. There is no `test` script, `preview` script, deployment configuration, CI workflow, Netlify/Vercel configuration, Dockerfile, or documented hosting target in the repository. The static `dist/` output is generated by Vue CLI; the hosting platform and deployment command remain unknown.

## Current gaps against the intended structure

- Missing advert banner and reviews section.
- Stream URL and WordPress URL are duplicated/hardcoded instead of coming from one config source.
- News integration does not use the required `_fields` query, short client cache, timeout, skeleton, plain-text rendering, or friendly external-link fallback.
- News uses unsanitized `v-html` for third-party title/excerpt HTML.
- No shared/persistent player or stream error/reconnect state.
- No backend, validation, moderation, privacy, rate limiting, or spam controls for reviews.
- The page’s current no-JavaScript behavior is only the generic `noscript` message in `public/index.html:11-14`; section content is not server-rendered.
- Vuetify is imported globally in `src/plugins/vuetify.js:1-8`; the config does not visibly configure Vuetify auto-import/tree-shaking.
- The current working tree contains uncommitted application changes and untracked news/team files; these were preserved and not altered.

## Open questions

1. What production hosting platform and site origin will be used?
2. What is the canonical public WordPress base URL and article URL format, and does its REST API allow browser CORS from the final site origin?
3. Is the stream endpoint HTTPS-capable and CORS/media-compatible with the final site origin?
4. What are the approved brand colors, logo variant, and final content for values, schedule, contact, and ads?
5. For reviews, where should the lightweight backend run, and should moderation use a datastore flag, a protected approval action, or auto-approval with strict spam controls?
6. What retention period and consent wording should apply to reviewer names and emails?
7. Should the existing `/about` route remain, or should the site stay a single-page section layout?
