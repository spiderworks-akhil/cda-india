import { SlugList } from "@/Datas/endpoints/SlugList";
import { baseUrl, urlEntry, urlset, sendXml } from "@/Datas/sitemap";

// Blog posts render at /blog/<slug> (pages/blog/[slug].js). The sitemap used
// to prefix them with /e-mag, which does not exist on this site.
function SiteMap() {}

export async function getServerSideProps({ res }) {
  try {
    const request = await SlugList.blog();
    const posts = Array.isArray(request?.data) ? request.data : request?.data?.data || [];
    const base = baseUrl();
    const entries = posts
      .filter((obj) => obj?.slug)
      .map((obj) => urlEntry(`${base}/blog/${obj.slug}`, obj));
    return sendXml(res, urlset(entries));
  } catch (error) {
    console.error("Error generating blog sitemap:", error);
    return sendXml(res, urlset([]));
  }
}

export default SiteMap;
