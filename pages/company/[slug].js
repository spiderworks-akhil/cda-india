import Base from "@/components/layout/Base";
import { hasHtmlContent } from "@/components/common/functions/htmlcontent";
import { GeneralApi } from "@/Datas/endpoints/general";
import { CompanyApi } from "@/Datas/endpoints/company";
import { HTMLParser } from "@/utils/HTMLParser";

// /company/privacy-policy, /company/terms-and-conditions - every page the CMS
// lists under company-page-list. They are all title + body, so one template
// covers the lot and new ones appear without a code change.
export default function CompanyPage({ companyPage, general }) {
  return (
    <Base
      general={general}
      data={companyPage}
    >
      <section
        id="TermsCondition-section"
        className="relative flex flex-col justify-end items-end min-h-[70vh]"
      >
        <div className="container">
          <div className="flex justify-center">
            <div className="md:w-10/12 w-full">
              <div className="TermsCondition-content-block">
                <h1>{companyPage?.title || companyPage?.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {hasHtmlContent(companyPage?.content) && (
        <div className="container py-[80px]">
          <div className="flex justify-center">
            <div className="md:w-10/12 w-full">
              <div
                className="TermsCondition-content-block">{HTMLParser(companyPage?.content)}</div>
            </div>
          </div>
        </div>
      )}

    </Base>
  );
}

export const getStaticPaths = async () => {
  try {
    const CompanyListData = await CompanyApi.list();

    // This endpoint answers with a bare array, not the usual { data: [...] }.
    const list = Array.isArray(CompanyListData?.data)
      ? CompanyListData?.data
      : CompanyListData?.data?.data || [];

    const paths = list
      .map((item) => item?.slug)
      .filter(Boolean)
      .map((slug) => ({ params: { slug } }));

    return { paths, fallback: "blocking" };
  } catch (error) {
    console.log("company page paths error", error);
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps = async ({ params }) => {
  try {
    const [CompanyPageData, GeneralData] = await Promise.all([
      CompanyApi.detail({ slug: params.slug }),
      GeneralApi.general(),
    ]);

    const companyPage = CompanyPageData?.data?.data;

    if (!companyPage) {
      return { notFound: true, revalidate: 10 };
    }

    return {
      props: {
        companyPage,
        general: GeneralData?.data?.data || null,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log("company page error", error);
    if (error?.error == "Not found" || error?.error == "Page not Found!") {
      return { notFound: true, revalidate: 10 };
    }
    throw error;
  }
};
