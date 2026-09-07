import Head from 'next/head'
import { useRouter } from 'next/router';
import React from 'react'
import { HTMLParser } from '@/utils/HTMLParser';

const SITE_NAME = 'CDA Audit';
// 1200x630 share image used whenever the CMS has no og_image / banner_image.
const DEFAULT_OG_IMAGE = '/images/og-default.png';
// CMS file paths can contain spaces; encode them so the URL is valid in meta tags.
const abs = (domain, path) => (path ? encodeURI(path.startsWith('http') ? path : `${domain}${path}`) : '');

const titleCase = (slug = '') =>
    slug.split('-').filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

// BreadcrumbList built from the path: Home > Services > <page title>.
function breadcrumbJsonLd(domain, pathname, pageTitle) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return null;
    const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${domain}/` }];
    segments.forEach((seg, i) => {
        const isLast = i === segments.length - 1;
        items.push({
            '@type': 'ListItem',
            position: i + 2,
            name: isLast && pageTitle ? pageTitle : titleCase(seg),
            item: `${domain}/${segments.slice(0, i + 1).join('/')}`,
        });
    });
    return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
}

function SEO({ data, settings }) {
    const router = useRouter();
    const domain = (process.env.NEXT_PUBLIC_FRONT_END_DOMAIN || '').replace(/\/$/, '');

    const pathname = (router?.asPath || '/').split('?')[0].split('#')[0];
    const isErrorPage = router?.pathname === '/404';
    const isHome = pathname === '/' || pathname === '/index';
    const canonical = `${domain}${isHome ? '' : pathname}`;

    const rawTitle = data?.browser_title || data?.title || data?.name || settings?.site_name || SITE_NAME;
    const title = rawTitle.toLowerCase().includes(SITE_NAME.toLowerCase()) || rawTitle.includes('CDA')
        ? rawTitle
        : `${rawTitle} | ${SITE_NAME}`;
    const description = String(
        data?.meta_description || data?.short_description || data?.content?.short_description_1 || settings?.footer_content || ''
    ).replace(/<[^>]*>/g, '').trim().slice(0, 160);

    const ogImage = abs(domain, data?.og_image?.file_path || data?.banner_image?.file_path || DEFAULT_OG_IMAGE);
    const ogImageAlt = data?.og_image?.alt_text || data?.banner_image?.alt_text || rawTitle;
    const ogTitle = data?.og_title || title;
    const ogDescription = data?.og_description || description;
    const ogType = pathname.startsWith('/blog/') ? 'article' : 'website';

    const extrajs = HTMLParser(typeof data?.extra_js === 'string' ? data?.extra_js : '');

    // The CMS holds the tag manager snippet as markup - the <script> wrapper
    // included, the way Google hands it over - so it is parsed rather than
    // injected into a <script> of our own, which would nest one inside the
    // other. html-react-parser renders script bodies through
    // dangerouslySetInnerHTML, so the JS is not entity-escaped on the way out.
    const gtmHead = HTMLParser(typeof settings?.google_tag_manager_head === 'string'
        ? settings?.google_tag_manager_head
        : '');

    const breadcrumb = !isHome && !isErrorPage ? breadcrumbJsonLd(domain, pathname, data?.title || data?.name) : null;

    return (
        <Head>
            {gtmHead}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="google-site-verification" content="dghu7IaS1_edNpNrqGVUwJKvGzPld5lFGJG5JD0y_QE" />
            <meta name="google-site-verification" content="bmPRZB5hkAHp9r73BCtvCuz9MTjs1m8YWseClrkgmM0" />

            <title>{title}</title>
            <meta name="description" content={description} />
            {!isErrorPage && <link rel="canonical" href={canonical} />}
            {isErrorPage && <meta name="robots" content="noindex" />}

            <link rel="icon" href="/favicon.ico" sizes="48x48" />
            <link rel="icon" href="/favicon-new-2.png" type="image/png" />
            <link rel="apple-touch-icon" href="/favicon-new-2.png" />

            {/* Open Graph / Twitter for social sharing */}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonical} />
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={ogDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:alt" content={ogImageAlt} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={ogTitle} />
            <meta name="twitter:description" content={ogDescription} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:image:alt" content={ogImageAlt} />

            {breadcrumb && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }}
                />
            )}

            {extrajs}
        </Head>
    )
}

export default SEO
