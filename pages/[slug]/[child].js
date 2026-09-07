import Head from 'next/head'
import LocationDetailScreen from '@/components/location/detail/Screen'
import { LocationApi } from '@/Datas/endpoints/location'
import { WidgetApi } from '@/Datas/endpoints/widget'
import {
  getLocationSharedProps,
  getAllLocations,
  buildLocationIndex,
  withLocationUrls
} from '@/Datas/pageData/location'

// /dubai/accounting-services-in-dubai - a service inside a city.
// `params.slug` is the city, `params.child` is the service the page renders.
export default function LocationService(props) {
  return (
    <>
      {/* Kept out of the index. The shared <SEO> emits the rest of the head
          for every route, so the directive lives here rather than there. */}
      <Head>
        <meta name="robots" content="noindex, nofollow" key="robots" />
      </Head>

      <LocationDetailScreen {...props} isServicePage />
    </>
  )
}

export const getStaticPaths = async () => {
  try {
    const locations = await getAllLocations()

    const paths = locations?.flatMap(city =>
      (city?.children || [])
        .map(service => service?.slug)
        .filter(Boolean)
        .map(child => ({ params: { slug: city?.slug, child } }))
    )

    return { paths, fallback: 'blocking' }
  } catch (error) {
    console.log('location service paths error', error)
    return { paths: [], fallback: 'blocking' }
  }
}

export const getStaticProps = async ({ params }) => {
  try {
    // Every city segment matches this route, so /abu-dhabi/<a Dubai
    // service> would otherwise serve the same page from a second address. The
    // nested endpoint checks the pairing itself and 404s when the service does
    // not sit under that city, which the catch below turns into a 404 page.
    const [LocationPageData, sharedProps, locations, ServiceSectorsData] =
      await Promise.all([
        LocationApi.location_service_detail({ slug: params.slug, child: params.child }),
        getLocationSharedProps(),
        getAllLocations(),
        // Only the service pages carry the sectors block, so it is fetched here
        // rather than in the props both location routes share. It is one
        // optional section, so a failure here must not reject the Promise.all
        // and take the whole page down with it - the section just drops out.
        WidgetApi.servicesectors().catch(error => {
          console.log('service sectors widget error', error)
          return null
        })
      ])

    const index = buildLocationIndex(locations)
    const locationDetail = LocationPageData?.data?.data

    if (!locationDetail) {
      return { notFound: true }
    }

    return {
      props: {
        ...sharedProps,
        serviceSectors: ServiceSectorsData?.data?.data || null,
        locationDetail: {
          ...locationDetail,
          related_listing: withLocationUrls(locationDetail?.related_listing, index)
        }
      },
      revalidate: 10
    }
  } catch (error) {
    console.log('location service page error', error)
    if (error?.error == 'Not found' || error?.error == 'Page not Found!') {
      return {
        notFound: true
      }
    }
    throw error
  }
}
