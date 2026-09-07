// Shared helpers for the sitemap routes under pages/sitemap/*.
//
// The routes are exposed at /sitemap.xml and /sitemap-<name>.xml through the
// rewrites in next.config.mjs, so every <loc> emitted here uses those
// addresses rather than the internal /sitemap/<name> paths.

// Always the canonical origin - never the request Host header, which would
// leak whatever hostname a crawler or proxy happened to use.
export const baseUrl = () =>
  (process.env.NEXT_PUBLIC_FRONT_END_DOMAIN || 'https://www.cdaaudit.in').replace(/\/$/, '')

const escapeXml = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Only emit <lastmod> when the CMS actually knows when the page changed.
// A fake "now" on every URL tells Google the whole site changes every crawl.
const lastmodTag = (item) => {
  const raw = item?.updated_at || item?.updatedAt || item?.published_on || item?.lastmod
  if (!raw) return ''
  const d = new Date(raw)
  return Number.isNaN(d.getTime()) ? '' : `<lastmod>${d.toISOString()}</lastmod>`
}

export const urlEntry = (loc, item) => {
  const lastmod = lastmodTag(item)
  return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n${lastmod ? `    ${lastmod}\n` : ''}  </url>\n`
}

export const urlset = (entries) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('')}</urlset>\n`

export const sitemapIndex = (locs) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locs
    .map((loc) => `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n  </sitemap>\n`)
    .join('')}</sitemapindex>\n`

export const sendXml = (res, xml, notFound = false) => {
  if (notFound) return { notFound: true }
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
  res.write(xml)
  res.end()
  return { props: {} }
}
