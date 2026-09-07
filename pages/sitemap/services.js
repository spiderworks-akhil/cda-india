import { SlugList } from "@/Datas/endpoints/SlugList";
import { baseUrl, urlEntry, urlset, sendXml } from "@/Datas/sitemap";

function SiteMap() {}

export async function getServerSideProps({ res }) {
  try {
    const request = await SlugList.service();
    const posts = Array.isArray(request?.data) ? request.data : request?.data?.data || [];
    const base = baseUrl();
    const entries = posts
      .filter((obj) => obj?.slug)
      .map((obj) => urlEntry(`${base}/services/${obj.slug}`, obj));
    return sendXml(res, urlset(entries));
  } catch (error) {
    console.error("Error generating services sitemap:", error);
    return sendXml(res, urlset([]));
  }
}

export default SiteMap;
