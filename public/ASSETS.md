# Assets still needed

The founder photo is **done**: `public/daniel.jpg`, 700×700, EXIF and GPS
stripped before committing. Everything below is still a placeholder.

Every item below is currently a **labeled placeholder**. Nothing here is final
artwork. Each file says "ASSET PLACEHOLDER" on its face so a missing asset is
obvious in review rather than silently shipping.

| Asset | Placeholder in repo | Referenced from | Needed spec |
| --- | --- | --- | --- |
| Missed-Call Rescue demo screenshot | `public/placeholders/missed-call-rescue.svg` | `src/components/Work.jsx` | 3:2, min 1200×800, PNG |
| Sacramento Ballet screenshot | `public/placeholders/sacramento-ballet.svg` | `src/components/Work.jsx` | 3:2, min 1200×800, PNG |
| ~~Favicon~~ **DONE** | public/favicon.svg, public/apple-touch-icon.png | index.html | Final ring mark, SVG + 180x180 PNG |
| OG image | `public/placeholders/og-image.svg` | `index.html` (`og:image`, `twitter:image`) | 1200×630 PNG at `/og-image.png` |

## When replacing

1. Drop the real file in `public/` (not `public/placeholders/`).
2. Update the `src` in the component listed above, and keep the existing `alt`
   text, which is written for the final asset, not the placeholder.
3. For the OG image, point both `og:image` and `twitter:image` in `index.html`
   at the absolute `https://yuiops.com/og-image.png` URL.
4. Delete the placeholder file once nothing references it.

## Logo assets (added 2026-09-24)

The mark is two 270-degree arcs with round caps, drawn on a 100x100 grid
(viewBox `8 8 84 84`). Accent arc is always `#187D6D`; the second arc is ink
`#0B0B0C` on light and paper `#F6F6F4` on dark.

| File | Use |
| --- | --- |
| `public/yui-mark.svg` | Mark alone on light surfaces |
| `public/yui-mark-inverse.svg` | Mark alone on the dark hero |
| `public/favicon.svg` | Browser tab, flips the ink arc under `prefers-color-scheme: dark` |
| `public/apple-touch-icon.png` | 180x180, mark on `#F6F6F4`, no transparency (iOS requirement) |

The in-app lockup is not an image file. `src/components/Wordmark.jsx` inlines
the same two paths so the mark scales with the text and inherits `currentColor`
for the non-accent arc.