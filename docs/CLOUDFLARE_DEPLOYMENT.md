# Cloudflare Pages deployment guide

Reviewed 2026-09-30. The current repository is a Vite static frontend. It is compatible with Cloudflare Pages as a static site. Adverts and sample reviews are local content; contact submissions use an external form-to-email service.

## Pages configuration

- Framework preset: Vue (or custom).
- Build command: `npm run build`.
- Output directory: `dist`.
- Node version: use the project-supported Node version in the Pages build environment; pin it after confirming the station’s preferred version.
- SPA fallback: `public/_redirects` maps all routes to `/index.html`.
- Security headers: `public/_headers` provides a baseline CSP and browser headers. Review the final allowed origins after the API domain is known.

## Environment variables

Configure these in Cloudflare Pages → Settings → Environment variables for Production and Preview as appropriate:

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_STREAM_URL` | Yes | HTTPS live stream URL. |
| `VITE_WORDPRESS_BASE_URL` | Yes | Third-party WordPress base URL, without `/wp-json`. |
| `VITE_CONTACT_EMAIL` | Optional | Designated contact email for deployment configuration. |
| `VITE_CONTACT_FORM_ENDPOINT` | Yes for form delivery | Formspree-compatible public form endpoint. |

Frontend variables are embedded into the build and must never contain secrets. The contact endpoint is a public form destination, not a secret.

## Porkbun domain connection

1. Add the custom domain in Cloudflare Pages and copy the Cloudflare-provided DNS instructions.
2. In Porkbun DNS, enter exactly the CNAME or nameserver records Cloudflare provides. Do not substitute guessed values.
3. If Cloudflare requests nameserver delegation, replace Porkbun’s nameservers with the exact pair shown in the Cloudflare dashboard.
4. Keep any existing mail-related MX/TXT records unless Cloudflare or Porkbun explicitly instructs otherwise.
5. Wait for DNS propagation, then verify HTTPS, the SPA fallback, the stream, WordPress CORS, and API CORS from the final domain.

The final DNS target and records cannot be documented until Cloudflare provides the site-specific values.

## Static content model

Cloudflare Pages hosts the entire application. Advert content is in `src/data/adverts.js`, review sample content is in `src/data/reviews.js`, and advert artwork is in `public/images/adverts/`. No database, API, authentication, or upload storage is required for these features.

## News images

News images currently remain remote WordPress media URLs and are shown in the public cards. They are not uploaded to the station backend, so Cloudflare Pages does not need to store them. The WordPress API must keep returning HTTPS featured-media URLs and allow the final site’s origin. There is no local news-detail route in the current application; “Read More” links to the original WordPress article, preserving the source image on that site.

## Advert management status

The public advert component reads the three local records, shows one background-image advert at a time, rotates automatically, pauses while focused/hovered, and provides previous/next controls and indicators. Edit `src/data/adverts.js` to change content and `public/images/adverts/` to replace artwork.

## Contact form

The Contact section submits JSON to `VITE_CONTACT_FORM_ENDPOINT`, intended for a Formspree form endpoint. Create the form in the Formspree dashboard, set its destination email there, then copy the endpoint into Cloudflare Pages Production environment variables.

## Local verification

```text
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

Before production launch, verify API CORS, HTTPS stream compatibility, WordPress image CORS, `_headers` CSP allowances, image loading, and the final custom domain on both mobile and desktop.
