import { useRef } from 'react'
import Base from '@/components/layout/Base'
import { BlogApi } from '@/Datas/endpoints/blog'
import CommBanner from '@/components/common/banner'
import BlogDetailsitems from '@/components/blog/blogdetails'
import BlogListitems from '@/components/blog/bloglist'
import Process from '@/components/home/Process'
import { WidgetApi } from '@/Datas/endpoints/widget'
import { GeneralApi } from '@/Datas/endpoints/general'
import BlogList from '@/components/blog/list'

export default function AuthorDetails({ general, athorDetail }) {

  // console.log(athorDetail?.author?.name)

  return (
    <Base general={general} data={athorDetail}>

      <div className="Small_banner">
        <CommBanner
          title={athorDetail?.author?.name}
          discription={athorDetail?.author?.designation}
          short_description={athorDetail?.author?.short_description}
          Authimg={athorDetail?.author?.featured_image?.file_path}
          Authimgalt={athorDetail?.author?.featured_image?.alt_text}
        />

      </div>

      <BlogList
        data={athorDetail?.blogs}
        emptyTitle='No posts from this author yet'
        emptyText='This author has not published anything so far. Please check back soon.'
      />





    </Base>
  )
}

// Generate paths for all blog slugs
export const getStaticPaths = async () => {
  const list = [
    {
      author: 'author'
    }
  ]
  const paths =
    list?.map(item => ({
      params: { author: item?.author }
    })) || []

  return { paths, fallback: 'blocking' }
}

// Fetch data for each blog page
export const getStaticProps = async ({ params }) => {
  // console.log(params)
  try {
    const AuthorPageData = await BlogApi.athorDetail({ slug: params.author })
    const GeneralData = await GeneralApi.general()
    const ProcessData = await WidgetApi.process()
    return {
      props: {
        athorDetail: AuthorPageData?.data,
        general: GeneralData?.data?.data,
        process: ProcessData?.data?.data
      },
      revalidate: 10 // Optional: revalidate every 60 seconds
    }
  } catch (error) {
    console.log(error)

    if (error?.error == 'Author not found') {
      return {
        notFound: true
      }
    }
    throw error
  }
}
