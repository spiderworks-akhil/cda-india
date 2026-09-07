import { SlugList } from "@/Datas/endpoints/SlugList";
import { LOCATION_PAGES_INDEXABLE } from "@/Datas/seo";
import { baseUrl, sitemapIndex, sendXml } from "@/Datas/sitemap";

// Points at one sitemap per city rather than listing the service URLs itself,
// so /sitemap-calicut.xml carries the services under /calicut.
function SiteMap() {}

export async function getServerSideProps({ res }) {
  if (!LOCATION_PAGES_INDEXABLE) return { notFound: true };
  try {
    const request = await SlugList.locations();
    const cities = Array.isArray(request?.data) ? request.data : [];
    const base = baseUrl();
    const locs = cities.filter((c) => c?.slug).map((c) => `${base}/sitemap-${c.slug}.xml`);
    return sendXml(res, sitemapIndex(locs));
  } catch (error) {
    console.error("Error generating location-pages sitemap:", error);
    return sendXml(res, sitemapIndex([]));
  }
}

export default SiteMap;
