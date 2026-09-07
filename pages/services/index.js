import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Base from "@/components/layout/Base";
import Service from "@/components/home/Service";
import About from "@/components/home/About";
import Why from "@/components/home/Why";
import Mission from "@/components/home/Mission";
import Certificate from "@/components/home/Certificate";
import Testimonials from "@/components/home/Testimonials";
import Ourclients from "@/components/home/Clients";
import Associates from "@/components/home/Associates";
import Faq from "@/components/home/Faq";
import Process from "@/components/home/Process";
import SerBanner from "@/components/services/banner";
import SerOffer from "@/components/common/Servoffer";
import SerWhy from "@/components/services/Servwhy";
import SerSolution from "@/components/services/Servsolution";
import { ServicesApi } from "@/Datas/endpoints/services";
import { GeneralApi } from "@/Datas/endpoints/general";
import { WidgetApi } from "@/Datas/endpoints/widget";


export default function Home({ data, listdata, general, financialSolutions, certifications, process, ourassociates, faqrigthtext }) {


  return (
    <Base
      general={general}
      data={data}
      footerContentTitle={data?.content?.title_5}
      footerContentDiscription={data?.content?.description_5}
    >

      <SerBanner
        title={data?.content?.title_1}
        subtitle={data?.content?.short_title_1}
        discription={data?.content?.short_description_1}
        bnrimg={data?.content?.media_id_1?.file_path}
        bnrimgalt={data?.content?.media_id_1?.alt_text}
      />

      <SerOffer
        listdata={listdata} shorttitle={data?.content?.short_title_2}
        title={data?.content?.title_2}
        discription={data?.content?.description_2}
      />

      <SerWhy
        shorttitle={data?.content?.short_title_3}
        title={data?.content?.title_3}
        discription={data?.content?.description_3}
        Whycdalist={data?.content?.why_cda_service_listing_id}
        btntext={data?.content?.button_text}

        whyimg={data?.content?.media_id_3?.file_path}
        whyimgalt={data?.content?.media_id_3?.alt_text}
        whyimgcap={data?.content?.image_title_3}
        whyimgsubcap={"India"}
        whyimgbtntxt={data?.content?.image_button_text}
      />

      <SerSolution
        soluVideo={financialSolutions?.content?.media_id_1?.file_path}
        soluHead={financialSolutions?.content?.title}
      />

      <Certificate
        certificatHead={certifications?.content?.title}
        certificatSubHead={certifications?.content.sub_title}
        certificatLogo={certifications?.content?.media_id_2?.file_path}
        certificatLogoAlt={certifications?.content?.media_id_2?.alt_text}
        certificatLogoList={certifications?.content?.our_certifications_listing_id}
      />

      <Testimonials />

      <Associates
        associateTitle={ourassociates?.content?.title}
        associateSubTitle={ourassociates?.content.short_title}
        satisfiedClientsCount={ourassociates?.content?.satisfied_clients_count}
        satisfiedClients={ourassociates?.content?.satisfied_clients}
        experienceCount={ourassociates?.content?.experience_count}
        experienceText={ourassociates?.content?.experience}
        sectorCount={ourassociates?.content.industry_sectors_count}
        sectorText={ourassociates?.content.industry_sectors}
        associateLocations={ourassociates?.content?.our_associates_listing_id}
      />

      <Faq
        leadSource='Services - FAQ Section'
        servfaqs={data?.faq}
        faqrighttitle={faqrigthtext?.content?.title}
        faqrightdiscription={faqrigthtext?.content?.text}
        faqrightbtn={faqrigthtext?.content?.btn_text}
      />

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
    const ServicesPageData = await ServicesApi.page()
    const ServiceslistPageData = await ServicesApi.listpage()
    const GeneralData = await GeneralApi.general()
    const WidgetData = await WidgetApi.financialSolutions()
    const CertificationsData = await WidgetApi.certifications()
    const ProcessData = await WidgetApi.process()
    const OurassociatesData = await WidgetApi.ourassociates()
    const FaqrigthtextData = await WidgetApi.faqrigthtext()




    return {
      props: {
        listdata: ServiceslistPageData?.data?.data,
        data: ServicesPageData?.data?.data,
        general: GeneralData?.data?.data,
        financialSolutions: WidgetData?.data?.data,
        certifications: CertificationsData?.data?.data,
        process: ProcessData?.data?.data,
        ourassociates: OurassociatesData?.data?.data,
        faqrigthtext: FaqrigthtextData?.data?.data,
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