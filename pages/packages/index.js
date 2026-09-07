import { useRef } from "react";
import Head from "next/head";
import Base from "@/components/layout/Base";
import Process from "@/components/home/Process";
import PackageHead from "@/components/packages/head";
import CommBanner from "@/components/common/banner";
import PackageListing from "@/components/packages/package";
import { GeneralApi } from "@/Datas/endpoints/general";
import { PackagesApi } from "@/Datas/endpoints/packages";
import { WidgetApi } from "@/Datas/endpoints/widget";

export default function Home({ general, data, process, packageList }) {



  return (
    <>
      {/* Kept out of the index. The shared <SEO> emits the rest of the head
          for every route, so the directive lives here rather than there. */}
      <Head>
        <meta name="robots" content="noindex, nofollow" key="robots" />
      </Head>

      <Base data={data} general={general}>

        <div className="Small_banner h-screen ">
          <CommBanner
            title={data?.title}
            discription={data?.content?.description_1}
            bnrimg={data?.content?.media_id_1?.file_path}
            bnrimgalt={data?.content?.media_id_1?.alt_text}
          />
        </div>


        <PackageHead data={data} />

        {packageList?.listing?.map((obj, index) => (
          <PackageListing key={index} data={obj?.category}
            listing={obj?.packages}
          />
        ))

        }

        {/* <PackageListing data={data} 
          listing={packageList}
        /> */}




        <Process
          prosTitle={process?.content?.title_1}
          procesList={process?.content?.smart_accounting_listing_id}
          ProsImg={process?.content?.media_id_3?.file_path}
          ProsImgAlt={process?.content?.media_id_3?.alt_text}
        />
      </Base>
    </>
  );
}



export async function getStaticProps() {

  try {
    const PackagesPageData = await PackagesApi.page()
    const packageRes = await PackagesApi.package()
    const GeneralData = await GeneralApi.general()
    const ProcessData = await WidgetApi.process()
    return {
      props: {
        packageList: packageRes?.data,
        data: PackagesPageData?.data?.data,
        general: GeneralData?.data?.data,
        process: ProcessData?.data?.data
      },
      revalidate: 10,
    }
  } catch (error) {
    console.log(error);

    return {
      notFound: true
    }
  }




}

