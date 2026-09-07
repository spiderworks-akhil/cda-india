import { useRef } from "react";
import Base from "@/components/layout/Base";
import Process from "@/components/home/Process";
import CommBanner from "@/components/common/banner";
import CareerList from "@/components/career/list";
import { GeneralApi } from "@/Datas/endpoints/general";
import { CareerApi } from "@/Datas/endpoints/career";
import { WidgetApi } from "@/Datas/endpoints/widget";

export default function career({ listdata, data, general, process }) {



  return (
    <Base data={data} general={general}>

      <div className="Small_banner h-[100dvh] ">
        <CommBanner
          title={data?.title}
          discription={data?.content?.description_1}
          short_description={data?.content?.short_description_1}
          bnrimg={data?.content?.media_id_1?.file_path}
          bnrimgalt={data?.content?.media_id_1?.alt_text} />
      </div>

      <CareerList listdata={listdata} data={data} />

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
    const CareerlistPageData = await CareerApi.listpage()
    const CareerPageData = await CareerApi.page()
    const GeneralData = await GeneralApi.general()
    const ProcessData = await WidgetApi.process()
    return {
      props: {
        listdata: CareerlistPageData?.data?.data,
        data: CareerPageData?.data?.data,
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