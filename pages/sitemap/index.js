import { LOCATION_PAGES_INDEXABLE } from "@/Datas/seo";
import { baseUrl, sitemapIndex, sendXml } from "@/Datas/sitemap";

// Sitemap index, served at /sitemap.xml (rewrite in next.config.mjs).
function SiteMap() {}

export async function getServerSideProps({ res }) {
  const base = baseUrl();
  const names = ["static-pages", "services", "blog", "company-pages"];
  // The location module is listed only once its pages are indexable - see
  // Datas/seo.js. A sitemap must never advertise a noindexed page.
  if (LOCATION_PAGES_INDEXABLE) names.push("locations", "location-pages");
  return sendXml(res, sitemapIndex(names.map((n) => `${base}/sitemap-${n}.xml`)));
}

export default SiteMap;
