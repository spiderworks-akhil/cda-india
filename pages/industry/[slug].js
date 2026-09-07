import Image from 'next/image'
import Base from '@/components/layout/Base'
import Certificate from '@/components/home/Certificate'
import Testimonials from '@/components/home/Testimonials'
import Ourclients from '@/components/home/Clients'
import Associates from '@/components/home/Associates'
import Faq from '@/components/home/Faq'
import Process from '@/components/home/Process'

import SerDetFinance from '@/components/servicedetails/finance'
import SerDetAdvantage from '@/components/servicedetails/advantage'
import SerOffer from '@/components/common/Servoffer'
import SerDetSectors from '@/components/servicedetails/sectors'
import SerDetMore from '@/components/servicedetails/moreser'
import SerSolution from '@/components/services/Servsolution'

import { GeneralApi } from '@/Datas/endpoints/general'
import { WidgetApi } from '@/Datas/endpoints/widget'

import { IndustryApi } from '@/Datas/endpoints/industry'

import IndDetBnr from '@/components/industry/banner'

export default function Home({
  data,
  general,
  process,
  industryDetail,
  financialSolutions,
  certifications,
  ourassociates,
  testimonials
}) {
  return (
    <Base data={industryDetail} general={general}>

      <IndDetBnr data={industryDetail} />

      {/* <SerDetFinance data={serviceDetail}/>
      <SerDetAdvantage data={serviceDetail}/>
      <SerOffer listdata={serviceDetail} IsServiceDetails={true}
      title={serviceDetail?.content?.title_4}
      shorttitle={serviceDetail?.content?.short_title_4}
      discription={serviceDetail?.content?.description_4} 
      
      />
      <SerDetSectors data={serviceDetail}/>
      <SerDetMore data={serviceDetail}/> */}

      <SerSolution
        soluVideo={financialSolutions?.content?.media_id_1?.file_path}
        soluHead={financialSolutions?.content?.title}
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

      {/* <Faq 
      servfaqs={serviceDetail?.faq}   
      faqrighttitle={data?.content?.title_4}
      faqrightdiscription={data?.content?.short_description}
      faqrightbtn={data?.content?.button_text_4}
       /> */}

      <Process
        prosTitle={process?.content?.title_1}
        procesList={process?.content?.smart_accounting_listing_id}
        ProsImg={process?.content?.media_id_3?.file_path}
        ProsImgAlt={process?.content?.media_id_3?.alt_text}
      />

    </Base>
  )
}

// Generate paths for all blog slugs
export const getStaticPaths = async () => {
  const list = [
    {
      slug: 'slug'
    }
  ]
  const paths =
    list?.map(item => ({
      params: { slug: item?.slug }
    })) || []

  return { paths, fallback: 'blocking' }
}

// Fetch data for each blog page
export const getStaticProps = async ({ params }) => {
  // console.log(params)
  try {
    const IndustryPageData = await IndustryApi.industryDetail({
      slug: params.slug
    })
    const GeneralData = await GeneralApi.general()
    const ProcessData = await WidgetApi.process()
    const WidgetData = await WidgetApi.financialSolutions()
    const CertificationsData = await WidgetApi.certifications()
    const OurassociatesData = await WidgetApi.ourassociates()
    const TestimonialsData = await WidgetApi.testimonials()
    return {
      props: {
        industryDetail: IndustryPageData?.data?.data,
        general: GeneralData?.data?.data,
        process: ProcessData?.data?.data,
        financialSolutions: WidgetData?.data?.data,
        certifications: CertificationsData?.data?.data,
        ourassociates: OurassociatesData?.data?.data,
        testimonials: TestimonialsData?.data?.data
      },
      revalidate: 10 // Optional: revalidate every 60 seconds
    }
  } catch (error) {
    console.log(error)
    if (error?.error == 'Not found') {
      return {
        notFound: true
      }
    }
    throw error
  }

}
