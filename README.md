# Yui — marketing site

Marketing site for **Yui** — AI integrations and operations management for small
businesses, based in Sacramento.

## Stack

- **Vite + React 19**, multi-page via `react-router-dom`
- **vite-react-ssg** prerenders every route to static HTML at build time
- **Tailwind CSS v4** with the brand tokens defined in `src/index.css`
- **Netlify** for hosting, redirects, forms, and two serverless functions

## Commands

```bash
npm install
npm run dev        # local dev server on :5173
npm run build      # prerenders all 9 routes into dist/
npm run preview    # serve the built output
npm run test:run   # vitest, one pass
npm run lint       # eslint
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Homepage |
| `/about` | Long-form About, including the Yui name story |
| `/audit` | Operations Health Check — 10-question diagnostic |
| `/bottleneck` | Find My Bottleneck — 5-question diagnostic |
| `/free-audit` | Landing page pointing at both diagnostics |
| `/contact` | Contact form (Netlify Forms) |
| `/privacy`, `/terms`, `/security` | Legal and security pages |

`/med-spas` and `/spa` 301 to `/` — retired pages whose URLs may have been shared
externally.

## Brand tokens

Defined once in `src/index.css` under `@theme`; use the Tailwind classes rather
than raw hex values.

| Token | Value | Used for |
| --- | --- | --- |
| `ink` | `#0B0B0C` | Dark section backgrounds, primary text on light |
| `paper` | `#F6F6F4` | Light section backgrounds |
| white | `#FFFFFF` | Cards |
| `accent` | `#187D6D` | Buttons, the period after headlines, the wordmark square |
| `line` | `#E4E4E7` | Borders |
| `muted` | `#5A5A60` | Body text on light |
| `muted-dark` | `#8A8A90` | Body text on dark |

Type: **Geist** (400/500/600/700) for body and headings, **Geist Mono** (400/500)
for eyebrows, labels, and numerals — via the `.mono` utility (uppercase, 0.12em,
11px). Headlines use the `.headline` utility (600, `-0.04em`, `1.02`). Buttons are
fully rounded (`999px`); cards and panels use `20px`.

**Voice:** the site says "we" everywhere except the About section on the homepage
and the whole About page, which say "I". `src/test/voice.test.jsx` guards that
boundary.

## Netlify functions

`netlify/functions/audit.js` and `netlify/functions/bottleneck.js` score the two
diagnostics server-side, so the API key never reaches the browser. They are
reached through the `/api/*` redirect in `netlify.toml`.

Both need one environment variable:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Set it in Netlify (Site configuration → Environment variables) and locally in
`.env` — see `.env.example`.

## Assets

Every image on the site is currently a labeled placeholder. `public/ASSETS.md`
lists what is still needed, the spec for each, and where it is referenced.

## Forms

The contact form is a Netlify Form. `public/__forms.html` is the static file
Netlify parses at deploy time to register the form; `src/pages/ContactPage.jsx`
posts to it. Keep the field names in the two files in sync.
