import { SlugList } from "@/Datas/endpoints/SlugList";
import { LOCATION_PAGES_INDEXABLE } from "@/Datas/seo";
import { baseUrl, urlEntry, urlset, sendXml } from "@/Datas/sitemap";

// City URLs only - the services nested under them are their own sitemap,
// /sitemap-location-pages.xml.
function SiteMap() {}

export async function getServerSideProps({ res }) {
  // Withheld while the location pages are noindexed - see Datas/seo.js.
  if (!LOCATION_PAGES_INDEXABLE) return { notFound: true };
  try {
    const request = await SlugList.locations();
    const cities = Array.isArray(request?.data) ? request.data : [];
    const base = baseUrl();
    const entries = cities
      .filter((city) => city?.slug)
      .map((city) => urlEntry(`${base}/${city.slug}`, city));
    return sendXml(res, urlset(entries));
  } catch (error) {
    console.error("Error generating locations sitemap:", error);
    return sendXml(res, urlset([]));
  }
}

export default SiteMap;
