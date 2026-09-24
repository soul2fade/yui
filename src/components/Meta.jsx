import { Head } from 'vite-react-ssg'

const SITE = 'https://yuiops.com'

// 1200x630 PNG, ink background with the inverse ring mark. Absolute URL: social
// scrapers do not resolve relative paths.
const OG_IMAGE = `${SITE}/og-image.png`

// Every <head> tag that varies by page lives here, so index.html carries none of
// them and the prerendered pages never end up with duplicates.
export default function Meta({ title, description, path }) {
  const url = `${SITE}${path}`
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Yui" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Yui. The operator your business is missing." />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Head>
  )
}
