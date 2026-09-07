import Head from 'next/head'
import LocationDetailScreen from '@/components/location/detail/Screen'
import { LocationApi } from '@/Datas/endpoints/location'
import {
  getLocationSharedProps,
  getAllLocations,
  buildLocationIndex,
  withLocationUrls
} from '@/Datas/pageData/location'

export default function LocationCity(props) {
  return (
    <>
      {/* Kept out of the index. The shared <SEO> emits the rest of the head
          for every route, so the directive lives here rather than there. */}
      <Head>
        <meta name="robots" content="noindex, nofollow" key="robots" />
      </Head>

      <LocationDetailScreen {...props} />
    </>
  )
}

export const getStaticPaths = async () => {
  try {
    const locations = await getAllLocations()

    const paths = locations
      .map(city => city?.slug)
      .filter(Boolean)
      .map(slug => ({ params: { slug } }))

    return { paths, fallback: 'blocking' }
  } catch (error) {
    console.log('location city paths error', error)
    return { paths: [], fallback: 'blocking' }
  }
}

export const getStaticProps = async ({ params }) => {
  try {
    const [LocationPageData, sharedProps, locations] = await Promise.all([
      LocationApi.locationDetail({ slug: params.slug }),
      getLocationSharedProps(),
      getAllLocations()
    ])

    const locationDetail = LocationPageData?.data?.data

    if (!locationDetail) {
      return { notFound: true }
    }

    // A service answers on this route too, because /<service-slug> is a single
    // segment like a city is. It belongs one level down, so send it there
    // rather than serving the same page from two addresses.
    if (locationDetail?.parent?.slug) {
      return {
        redirect: {
          destination: `/${locationDetail?.parent?.slug}/${params.slug}`,
          permanent: true
        }
      }
    }

    return {
      props: {
        ...sharedProps,
        locationDetail: {
          ...locationDetail,
          related_listing: withLocationUrls(
            locationDetail?.related_listing,
            buildLocationIndex(locations)
          )
        }
      },
      revalidate: 10
    }
  } catch (error) {
    console.log('location city page error', error)
    if (error?.error == 'Not found' || error?.error == 'Page not Found!') {
      return {
        notFound: true
      }
    }
    throw error
  }
}
