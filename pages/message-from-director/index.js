import { useRef } from "react";
import Base from "@/components/layout/Base";
import Process from "@/components/home/Process";
import DMessage from "@/components/director/message";
import { DirectorApi } from "@/Datas/endpoints/director";
import { GeneralApi } from "@/Datas/endpoints/general";
import { WidgetApi } from "@/Datas/endpoints/widget";


export default function Team({ data, general, process }) {




  return (
    <Base data={data} general={general}>

      <DMessage data={data} />

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
    const DirectorPageData = await DirectorApi.page()
    const GeneralData = await GeneralApi.general()
    const ProcessData = await WidgetApi.process()
    return {
      props: {
        data: DirectorPageData?.data?.data,
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

