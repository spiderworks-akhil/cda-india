import LocBanner from '@/components/location/detail/Banner'
import LocBody from '@/components/location/detail/Body'
import LocContent from '@/components/location/detail/Content'
import LocServices from '@/components/location/detail/Services'
import LocHighlights from '@/components/location/detail/Highlights'
import LocSectors from '@/components/location/detail/Sectors'
import LocRelated from '@/components/location/detail/Related'
import LocCommonSections from '@/components/location/shared/CommonSections'
import Base from '@/components/layout/Base'
import Faq from '@/components/home/Faq'
import Process from '@/components/home/Process'

// A city (/location/dubai) and a service inside a city
// (/location/dubai/accounting-services-in-dubai) are the same record type in
// the CMS and render the same way, so both routes mount this screen. Each
// section hides itself when the field it renders is empty, which is what lets
// one layout serve the two:
//   Banner      -> content.title_1 / content.description_1 / banner_image
//   Body        -> content.description_2   (the long editorial copy)
//   Services    -> children                (cities only)
//   Highlights  -> location_listing
//   Content     -> content.title_2 + content.description_2 (service pages
//                  only - /[slug]/[child] passes isServicePage)
//   Sectors     -> the service_sectors widget (service pages only)
//   Faq         -> faq + content.faq_heading
//   Related     -> related_listing (sibling services on a service page,
//                  other cities on a city page - it renders each differently)
const LocationDetailScreen = ({
  locationDetail,
  isServicePage,
  general,
  process,
  financialSolutions,
  certifications,
  ourassociates,
  faqrigthtext,
  testimonials,
  serviceSectors
}) => {


  return (
    <Base
      general={general}
      data={locationDetail}
      footerContentTitle={locationDetail?.bottom_text}
    >

      <LocBanner data={locationDetail} />

      {/* <LocBody data={locationDetail} /> */}

      <LocServices data={locationDetail} />

      <LocHighlights data={locationDetail} />


      {isServicePage &&
        <LocContent
          title={locationDetail?.content?.title_2}
          description={locationDetail?.content?.description_2}
        />
      }

      <LocSectors data={serviceSectors} />

      <LocRelated data={locationDetail} />

      <LocCommonSections
        financialSolutions={financialSolutions}
        certifications={certifications}
        testimonials={testimonials}
        ourassociates={ourassociates}
      />

      {locationDetail?.faq?.length > 0 && (
        <Faq
          leadSource={`Location FAQ : ${locationDetail?.title || locationDetail?.name || ''}`.trim()}
          heading={locationDetail?.content?.faq_heading}
          servfaqs={locationDetail?.faq}
          faqrighttitle={faqrigthtext?.content?.title}
          faqrightdiscription={faqrigthtext?.content?.text}
          faqrightbtn={faqrigthtext?.content?.btn_text}
        />
      )}



      <Process
        prosTitle={process?.content?.title_1}
        procesList={process?.content?.smart_accounting_listing_id}
        ProsImg={process?.content?.media_id_3?.file_path}
        ProsImgAlt={process?.content?.media_id_3?.alt_text}
      />

    </Base>
  )
}

export default LocationDetailScreen
