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
import { WhyApi } from "@/Datas/endpoints/why";
import Whychoose from "@/components/why/choose";
import { GeneralApi } from "@/Datas/endpoints/general";
import { WidgetApi } from "@/Datas/endpoints/widget";

export default function Why({ data, general, process }) {
  return (
    <Base data={data} general={general}>
      <div className="Small_banner h-screen">
        <CommBanner
          title={data?.content?.short_title_1}
          discription={data?.content?.description_1}
          short_description={data?.content?.short_description_1}
          bnrimg={data?.content?.media_id_1?.file_path}
          bnrimgalt={data?.content?.media_id_1?.alt_text}
        />
      </div>

      <Whycda data={data} />

      <Whychoose data={data} />

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
    const WhyPageData = await WhyApi.page();
    const GeneralData = await GeneralApi.general();
    const ProcessData = await WidgetApi.process();
    return {
      props: {
        data: WhyPageData?.data?.data,
        general: GeneralData?.data?.data,
        process: ProcessData?.data?.data,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log("why cda page error", error);
    throw error
  }
}
