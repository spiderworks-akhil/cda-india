import { SlugList } from "@/Datas/endpoints/SlugList";
import { baseUrl, urlEntry, urlset, sendXml } from "@/Datas/sitemap";

function SiteMap() {}

export async function getServerSideProps({ res }) {
  try {
    const request = await SlugList.company_pages();
    // This endpoint answers with a bare array, not the usual { data: [...] }.
    const posts = Array.isArray(request?.data) ? request.data : [];
    const base = baseUrl();
    const entries = posts
      .filter((obj) => obj?.slug)
      .map((obj) => urlEntry(`${base}/company/${obj.slug}`, obj));
    return sendXml(res, urlset(entries));
  } catch (error) {
    console.error("Error generating company-pages sitemap:", error);
    return sendXml(res, urlset([]));
  }
}

export default SiteMap;
