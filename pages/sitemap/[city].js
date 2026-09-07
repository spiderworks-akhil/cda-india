import { SlugList } from "@/Datas/endpoints/SlugList";
import { LOCATION_PAGES_INDEXABLE } from "@/Datas/seo";
import { baseUrl, urlEntry, urlset, sendXml } from "@/Datas/sitemap";

// One sitemap per city: /sitemap-calicut.xml lists the services that live
// under /calicut. The named sitemaps in this folder (blog, services, ...) are
// static files, so Next matches those first and only a real city slug reaches
// here.
function SiteMap() {}

export async function getServerSideProps({ res, params }) {
  if (!LOCATION_PAGES_INDEXABLE) return { notFound: true };
  try {
    const request = await SlugList.location_services({ slug: params?.city });
    // A city the CMS does not know answers 200 with { error: "Page not Found!" }
    // rather than a status code, so the shape is what decides here.
    if (!Array.isArray(request?.data)) return { notFound: true };
    const base = baseUrl();
    const entries = request.data
      .filter((service) => service?.slug)
      .map((service) => urlEntry(`${base}/${params.city}/${service.slug}`, service));
    return sendXml(res, urlset(entries));
  } catch (error) {
    console.error("Error generating city sitemap:", error);
    return sendXml(res, urlset([]));
  }
}

export default SiteMap;
