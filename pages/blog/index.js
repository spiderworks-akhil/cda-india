import { useRef } from "react";
import Base from "@/components/layout/Base";
import Process from "@/components/home/Process";
import PackageHead from "@/components/packages/head";
import CommBanner from "@/components/common/banner";
import PackageListing from "@/components/packages/package";
import TeamManagement from "@/components/team/management";
import TeamMeat from "@/components/team/meetteam";
import TeamGallery from "@/components/team/gallery";
import Whycda from "@/components/why/why";
import Whychoose from "@/components/why/choose";
import ClientList from "@/components/clients/clients";
import OurValue from "@/components/clients/value";
import CareerList from "@/components/career/list";
import BlogList from "@/components/blog/list";
import { GeneralApi } from "@/Datas/endpoints/general";
import { WidgetApi } from "@/Datas/endpoints/widget";
import { BlogApi } from "@/Datas/endpoints/blog";

export default function blog({ listdata, data, general, process }) {



  return (
    <Base general={general} data={data}>

      <div className="Small_banner">
        <CommBanner
          title={data?.title}
          discription={data?.content?.description_1}
          short_description={data?.content?.short_description_1}
          bnrimg={data?.content?.media_id_1?.file_path}
          bnrimgalt={data?.content?.media_id_1?.alt_text} />
      </div>

      <BlogList data={listdata} />

      <Process
        prosTitle={process?.content?.title_1}
        procesList={process?.content?.smart_accounting_listing_id}
        ProsImg={process?.content?.media_id_3?.file_path}
        ProsImgAlt={process?.content?.media_id_3?.alt_text}
      />
    </Base>
  );
}




export async function getStaticProps() {

  try {
    const BloglistPageData = await BlogApi.listpage()
    const BlogPageData = await BlogApi.page()
    const GeneralData = await GeneralApi.general()
    const ProcessData = await WidgetApi.process()
    return {
      props: {
        listdata: BloglistPageData?.data?.data,
        data: BlogPageData?.data?.data,
        process: ProcessData?.data?.data,
        general: GeneralData?.data?.data
      },
      revalidate: 10,
    }
  } catch (error) {
    console.log('www', error);
    throw error;
    // return{
    //   notFound:true
    // }
  }

}
