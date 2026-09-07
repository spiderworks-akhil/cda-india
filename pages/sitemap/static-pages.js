import { baseUrl, urlEntry, urlset, sendXml } from "@/Datas/sitemap";

// The static routes that exist in pages/. This list is the source of truth:
// the CMS "list-urls/static-pages" endpoint returned slugs (/about, /service,
// /clients, /careers, /free-consultation, /freezones, /location) that have no
// route here and were 404s in the sitemap.
//
// Deliberately absent: /packages (noindex), /thank-you, /career/thank-you
// (noindex), /consultation/thank-you and anything under /api.
const STATIC_ROUTES = [
  "",
  "about-us",
  "services",
  "blog",
  "our-team",
  "our-clients",
  "why-cda",
  "career",
  "consultation",
  "contact-us",
  "message-from-director",
];

function SiteMap() {}

export async function getServerSideProps({ res }) {
  const base = baseUrl();
  const entries = STATIC_ROUTES.map((slug) => urlEntry(slug ? `${base}/${slug}` : `${base}/`));
  return sendXml(res, urlset(entries));
}

export default SiteMap;
