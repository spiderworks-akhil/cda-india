import SerSolution from '@/components/services/Servsolution'
import Certificate from '@/components/home/Certificate'
import Testimonials from '@/components/home/Testimonials'
import Associates from '@/components/home/Associates'

// The listing page and the detail page close with the same four widget-driven
// sections. Keeping them in one place means a change to the block only has to
// be made once.
const CommonSections = ({
  financialSolutions,
  certifications,
  testimonials,
  ourassociates
}) => {
  return (
    <>
      <SerSolution
        soluVideo={financialSolutions?.content?.media_id_1?.file_path}
        soluHead={financialSolutions?.content?.title}
      />

      <Certificate
        certificatHead={certifications?.content?.title}
        certificatSubHead={certifications?.content?.sub_title}
        certificatLogo={certifications?.content?.media_id_2?.file_path}
        certificatLogoAlt={certifications?.content?.media_id_2?.alt_text}
        certificatLogoList={certifications?.content?.our_certifications_listing_id}
      />

      <Testimonials data={testimonials} />

      <Associates
        associateTitle={ourassociates?.content?.title}
        associateSubTitle={ourassociates?.content?.short_title}
        satisfiedClientsCount={ourassociates?.content?.satisfied_clients_count}
        satisfiedClients={ourassociates?.content?.satisfied_clients}
        experienceCount={ourassociates?.content?.experience_count}
        experienceText={ourassociates?.content?.experience}
        sectorCount={ourassociates?.content?.industry_sectors_count}
        sectorText={ourassociates?.content?.industry_sectors}
        associateLocations={ourassociates?.content?.our_associates_listing_id}
      />
    </>
  )
}

export default CommonSections
