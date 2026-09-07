import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Base from "@/components/layout/Base";
import Banner from "@/components/home/Banner";
import Trust from "@/components/home/Trust";
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
import { GeneralApi } from "@/Datas/endpoints/general";
import { WidgetApi } from "@/Datas/endpoints/widget";
import { HomeApi } from "@/Datas/endpoints";



export async function getStaticProps() {
  try {
    const GeneralData = await GeneralApi.general();
    // const WidgetData = await WidgetApi.financialSolutions();
    const ProcessData = await WidgetApi.process();
    const HomeData = await HomeApi.page();
    const OurassociatesData = await WidgetApi.ourassociates();
    const CertificationsData = await WidgetApi.certifications();
    const FaqrigthtextData = await WidgetApi.faqrigthtext();
    const exceptionalclientsData = await WidgetApi.exceptionalclients();
    const TestimonialsData = await WidgetApi.testimonials();


    return {
      props: {
        general: GeneralData?.data?.data,
        // financialSolutions: WidgetData?.data?.data,
        process: ProcessData?.data?.data,
        data: HomeData?.data?.data,
        ourassociates: OurassociatesData?.data?.data,
        certifications: CertificationsData?.data?.data,
        faqrigthtext: FaqrigthtextData?.data?.data,
        exceptionalclients: exceptionalclientsData?.data?.data,
        testimonials: TestimonialsData?.data?.data,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log("Home Page static Props", error);
    throw error;
    // return{
    //   notFound:true
    // }
  }
}



export default function Home({
  data,
  process,
  general,
  certifications,
  ourassociates,
  faqrigthtext,
  exceptionalclients,
  testimonials
}) {

  // console.log("GM", data);

  return (
    <Base general={general} data={data}>
      
      <Banner data={data} />

      <Trust data={data} />

      <Service data={data} />

      <About data={data} />

      <Why data={data} />

      <Mission
        misstitle_1={data?.content?.our_mission_title}
        missdescription_1={data?.content?.our_mission_description}
        misstitle_2={data?.content?.our_vision_title}
        missdescription_2={data?.content?.our_vision_description}
        maintitle={data?.content?.title_5}
        shorttitle={data?.content?.tag_line_5}
        MisImg={data?.content?.media_id_5?.file_path}
        MisImgAlt={data?.content?.media_id_5?.alt_text}
      />

      <Certificate
        certificatHead={certifications?.content?.title}
        certificatSubHead={certifications?.content.sub_title}
        certificatLogo={certifications?.content?.media_id_2?.file_path}
        certificatLogoAlt={certifications?.content?.media_id_2?.alt_text}
        certificatLogoList={
          certifications?.content?.our_certifications_listing_id
        }
      />

      <Testimonials data={testimonials} />

      <Ourclients data={exceptionalclients} />

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
        leadSource='Home - FAQ Section'
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
