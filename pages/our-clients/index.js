import { useRef } from "react";
import Base from "@/components/layout/Base";
import Process from "@/components/home/Process";
import CommBanner from "@/components/common/banner";
import OurValue from "@/components/clients/value";
import { ClientsApi } from "@/Datas/endpoints/clients";
import { GeneralApi } from "@/Datas/endpoints/general";
import ClientsList from "@/components/clients/clients";
import { WidgetApi } from "@/Datas/endpoints/widget";

export default function Why({ data, general, process, exceptionalclients }) {
  return (
    <Base data={data} general={general}>
      <div className="Small_banner h-screen ">
        <CommBanner
          title={data?.title}
          discription={data?.content?.description_1}
          short_description={data?.content?.short_description_1}
          bnrimg={data?.content?.media_id_1?.file_path}
          bnrimgalt={data?.content?.media_id_1?.alt_text}
        />
      </div>

      <ClientsList data={data} />

      {/* <OurValue data={exceptionalclients} /> */}

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
    const ClientsPageData = await ClientsApi.page();
    const GeneralData = await GeneralApi.general();
    const ProcessData = await WidgetApi.process();
    const exceptionalclientsData = await WidgetApi.exceptionalclients();
    return {
      props: {
        data: ClientsPageData?.data?.data,
        general: GeneralData?.data?.data,
        process: ProcessData?.data?.data,
        exceptionalclients: exceptionalclientsData?.data?.data,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
}
