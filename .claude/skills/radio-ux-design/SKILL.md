---
name: radio-ux-design
description: Use when designing or reviewing the Speak FM radio website UI, section layouts, live listening experience, advert placement, accessibility, responsive behavior, or motion polish.
---

# Radio UX design skill

Use this skill for UI decisions in the Speak FM site. Preserve the existing brand assets and content unless approved. Extract patterns and principles; never copy code, assets, logos, text, or exact layouts from references.

## Research basis

Patterns were reviewed from the [OnAir2 demo](https://demo.qantumthemes.xyz/onair2/demo1/) and its [theme overview](https://themeforest.net/item/onair2-radio-station-wordpress-theme/19340714), [BBC Sounds persistent-player guidance](https://bbclatestnews.pages.dev/sounds/help/questions/recent-changes-to-bbc-sounds/persistent-player), and [ABC listen live/schedule pages](https://www.abc.net.au/listen/live/radioaustralia?program=peb2f41149). The reusable principles are persistent listening, clear live/up-next context, schedule discoverability, strong content hierarchy, and uninterrupted browsing—not visual imitation.

## Core principles

- Give each screen one primary action: **Tune in**.
- Use progressive disclosure, generous whitespace, clear hierarchy, and scannable content.
- Use no more than two typefaces and a restrained palette derived from the existing logo/brand.
- Keep the player persistent but compact, thumb-reachable, dismissible where appropriate, and never blocking content.

## Page and section patterns

1. **Header:** sticky logo/name plus section links; transparent over hero, solid after scroll; collapsible mobile menu; active-section state.
2. **Hero:** strong but optimized image, station name/tagline, one prominent Tune in action, and no delayed LCP content.
3. **Advert banner:** one fixed-height slot labeled “Advert”; static or slow cross-fade rotation, pause on hover/focus, no autoplay media, pop-ups, overlays, or layout shift.
4. **About:** short intro followed by compact vision, mission, and values cards; keep long copy collapsed or clearly chunked.
5. **Schedule:** day-tabbed list with current show highlighted as “On now,” next show visible, readable times, and no forced vertical carousel.
6. **Latest posts:** three-card grid on larger screens, one-column mobile stack, fixed image ratios, plain-text excerpts, and a clear link to the original article. Do not add “load more” if the API contract is limited.
7. **Services:** scannable icon/card grid with one Get in touch action that scrolls to Contact.
8. **Team:** compact, equal-height profile cards with consistent portrait ratios, names, and positions; meaningful alt text.
9. **Reviews:** short name/email/feedback/rating form with inline validation, character count, submit state, and at most five newest approved reviews. No pagination or load more; never display email.
10. **Contact:** contact details only, with tap-to-call/email links where verified; no form.

## Persistent player

Use one shared mini-player with play/pause, volume, now-playing/up-next text, and a visible LIVE state. Add equalizer bars only while playing, a buffering indicator, remembered volume via localStorage, and a concise stream-unavailable message. Use `preload="none"`; audio begins only after user action. On mobile, keep it above the safe-area inset and below the 44px touch-target minimum without covering content.

## Navigation and responsiveness

Use a sticky header, mobile-first Vuetify grid/breakpoints, active-section highlighting via a lightweight observer, and `scroll-margin-top` for headings. Get in touch must scroll to Contact. Respect reduced-motion for smooth scrolling.

## Vuetify design tokens

Derive tokens from the existing logo after brand confirmation. Keep the theme shape explicit and centralized:

```js
theme: {
  defaultTheme: "light",
  themes: { light: { colors: { primary, secondary, surface, background, onSurface } } },
  variables: { "border-radius-card": "16px", "elevation-card": "0 8px 24px rgba(...)" }
}
```

Use a 4px-based spacing scale, a readable type scale from body 16px to display headings, one radius family, and restrained elevation. Prefer theme tokens over per-component colors.

## Motion system (non-negotiable)

- Implement all scroll reveals with one small custom Vue `v-reveal` directive using `IntersectionObserver` and CSS transitions. Do not add GSAP, AOS, ScrollMagic, Framer-style libraries, or Lottie without approval.
- Animate only `opacity` and `transform`. Reveal once, unobserve after reveal, reserve layout space, and use `will-change` only during motion.
- Never animate/delay hero or above-the-fold/LCP content. Content must show without JS, with a no-JS/pre-hydration fallback if needed.
- For `prefers-reduced-motion: reduce`, disable transforms and reveals and show content immediately.
- Define timing once: 300–500ms, `cubic-bezier(0.22, 1, 0.36, 1)`, 16–24px travel, 60–80ms stagger, max six staggered items. Skip/pause for hidden tabs/off-screen work.
- Added motion JS must remain <=2 KB gzip and must not measurably regress LCP, CLS, or TBT.

Motion vocabulary:

| Location | Effect |
| --- | --- |
| Headings | Fade + slight upward slide |
| Cards | Staggered fade-up once |
| About | Fade; values stagger |
| Schedule | Fade; subtle On now dot pulse |
| Advert | Pausable cross-fade only |
| Reviews | New item fade; slight star scale on interaction |
| Navigation | Underline hover; active-section highlight |
| Buttons | Transform-only lift/press |

## Polish priority

1. Accessible player states, buffering, LIVE badge, equalizer, volume memory, and unavailable message.
2. Header state, active section, safe smooth scrolling, and back-to-top threshold.
3. Same-size post skeletons, image aspect ratios/placeholders, and lazy loading.
4. Inline form validation, disabled submit, snackbar feedback, character counter, and visible focus/active states.
5. Favicon, theme-color, Open Graph image, and empty/error/offline states.

Dark mode is optional only when it is near-zero-cost through theme tokens. Do not add it at the expense of performance or contrast.

## Forbidden patterns

No parallax, autoplay audio/video, scroll-jacking, cursor trails, page-load splash screens, modal popups on load, giant hero videos, unpausable auto-advancing carousels, infinite decorative loops, walls of text, or animations over 600ms. LIVE/equalizer indicators are the only permitted small continuous indicators.

## UI-change checklist

- Is Tune in still the clearest primary action?
- Are all ten sections present in the approved order, with no extra section?
- Is content visible without waiting for JS or an observer?
- Does reduced motion remove transforms and delayed reveals?
- Are keyboard focus, contrast, alt text, semantics, and 44px targets correct?
- Does the player remain accessible without covering content?
- Are ads labeled, fixed-height, pausable, non-blocking, and free of autoplay?
- Are WordPress/review/ad values treated as untrusted text or safely sanitized?
- Are loading, empty, error, offline, and stream-unavailable states designed?
- Were mobile performance, LCP, CLS, TBT, and console errors checked after the change?
