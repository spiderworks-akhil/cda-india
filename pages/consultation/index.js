import { useRef } from "react";
import Base from "@/components/layout/Base";
import Process from "@/components/home/Process";
import CommBanner from "@/components/common/banner";
import { GeneralApi } from "@/Datas/endpoints/general";
import { WidgetApi } from "@/Datas/endpoints/widget";
import { ConsultationApi } from "@/Datas/endpoints/consultation";
import ConsultationForm from "@/components/consultation/consform";
export default function Consultation({ general, process, data }) {




  return (
    <Base data={data} general={general}>

      <div className="Small_banner  ">
        <CommBanner title={data?.title}
          discription={data?.content?.description_1}
        />
      </div>

      <ConsultationForm data={data} />

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
    const ConsultationData = await ConsultationApi.page()
    const GeneralData = await GeneralApi.general()
    const ProcessData = await WidgetApi.process()
    return {
      props: {
        data: ConsultationData?.data?.data,
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
