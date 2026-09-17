# Assets still needed

Every item below is currently a **labeled placeholder**. Nothing here is final
artwork — each file says "ASSET PLACEHOLDER" on its face so a missing asset is
obvious in review rather than silently shipping.

| Asset | Placeholder in repo | Referenced from | Needed spec |
| --- | --- | --- | --- |
| Founder photo | `public/placeholders/founder-photo.svg` | `src/components/AboutSection.jsx`, `src/pages/AboutPage.jsx` | 4:5 portrait, min 800×1000, JPG or WebP |
| Missed-Call Rescue demo screenshot | `public/placeholders/missed-call-rescue.svg` | `src/components/Work.jsx` | 3:2, min 1200×800, PNG |
| Sacramento Ballet screenshot | `public/placeholders/sacramento-ballet.svg` | `src/components/Work.jsx` | 3:2, min 1200×800, PNG |
| Favicon | `public/favicon.svg` | `index.html` | Final mark as SVG + 180×180 `apple-touch-icon.png` |
| OG image | `public/placeholders/og-image.svg` | `index.html` (`og:image`, `twitter:image`) | 1200×630 PNG at `/og-image.png` |

## When replacing

1. Drop the real file in `public/` (not `public/placeholders/`).
2. Update the `src` in the component listed above, and keep the existing `alt`
   text — it is written for the final asset, not the placeholder.
3. For the OG image, point both `og:image` and `twitter:image` in `index.html`
   at the absolute `https://yuiops.com/og-image.png` URL.
4. Delete the placeholder file once nothing references it.
