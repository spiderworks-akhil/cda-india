// One switch for the location module's sitemaps.
//
// While this is false the location URLs are withheld from the sitemap:
// /sitemap does not list them and the sitemap routes themselves 404. Flipping
// it to true publishes both.
//
// The location pages ship <meta name="robots" content="noindex, nofollow">
// (pages/[slug]/index.js and pages/[slug]/[child].js), so this stays false -
// a sitemap must never advertise a page that tells crawlers to stay away. If
// the noindex is ever lifted, set this to true in the same change.
//
// Read by:
//   pages/sitemap/index.js           the sitemap index
//   pages/sitemap/locations.js       the city URLs
//   pages/sitemap/location-pages.js  index of the per-city sitemaps
//   pages/sitemap/[city].js          one city's service URLs
export const LOCATION_PAGES_INDEXABLE = false
