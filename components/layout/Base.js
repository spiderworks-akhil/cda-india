import React, { useEffect } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from 'next/router';
import SEO from './Seo';
import { HTMLParser } from '@/utils/HTMLParser';

// The bottom content block sits at the top of the footer on every page, so it
// is rendered from here rather than remembered page by page. It defaults to the
// CMS fields carried on `data`; the two pages whose copy lives under different
// keys pass footerContentTitle/footerContentDiscription explicitly.
const Base = ({
    children,
    general,
    data,
    footerContentTitle,
    footerContentDiscription,
}) => {

    const router = useRouter()

    const gtmBody = HTMLParser(typeof general?.all_settings?.google_tag_manager_head === 'string'
        ? general?.all_settings?.google_tag_manager_body
        : '');

    return (
        <>
            <SEO data={data} settings={general?.all_settings} />

            {gtmBody}
            <Header general={general} />
            <main>{children}</main>
            <Footer
                general={general}
                footerContentTitle={footerContentTitle ?? data?.h1_title}
                footerContentDiscription={
                    footerContentDiscription ?? data?.bottom_description
                }
            />
        </>
    );
};

export default Base;
