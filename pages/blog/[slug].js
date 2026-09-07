import { useRef } from 'react'
import Base from '@/components/layout/Base'
import { BlogApi } from '@/Datas/endpoints/blog'
import CommBanner from '@/components/common/banner'
import BlogDetailsitems from '@/components/blog/blogdetails'
import BlogListitems from '@/components/blog/bloglist'
import Process from '@/components/home/Process'
import { WidgetApi } from '@/Datas/endpoints/widget'
import { GeneralApi } from '@/Datas/endpoints/general'
import ContactForm from '@/components/contact/getform'
import { ContactApi } from '@/Datas/endpoints/contact'

export default function BlogDetails({ general, blogDetail, process, data }) {

  // console.log('dd', blogDetail)

  return (
    <Base general={general} data={blogDetail}>
      <div className='Small_banner details_blog'>
        <CommBanner
          title={blogDetail?.title}
          bnrimg={blogDetail?.banner_image?.file_path || '/images/team.webp'}
          bnrimgalt={blogDetail?.banner_image?.alt_text}
        />
      </div>

      <BlogDetailsitems title={blogDetail?.title} data={blogDetail} />


      <ContactForm data={data} blog={blogDetail} />

      {
        blogDetail?.recent_posts?.length > 0 &&

        <section className='pt-[50px] pb-[50px] recent_blogsec'>
          <div className='container'>
            <h3>Recent Posts</h3>

            <div className='grid md:grid-cols-3 gap-[35px]'>
              {blogDetail?.recent_posts?.map((item, index) => (
                <BlogListitems
                  key={index}
                  title={item?.title}
                  time={item?.published_by?.name}
                  imgSrc={item?.featured_image?.file_path}
                  imgAlt={item?.featured_image?.alt_text}
                  date={item?.published_on}
                  link={item?.slug}
                />
              ))}

              {/* <div><BlogListitems /></div>
            <div><BlogListitems /></div>
            <div><BlogListitems /></div> */}
            </div>
          </div>
        </section>

      }



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
    const BlogPageData = await BlogApi.blogDetail({ slug: params.slug })
    const GeneralData = await GeneralApi.general()
    const ProcessData = await WidgetApi.process()
    const ContactPageData = await ContactApi.page()
    return {
      props: {
        blogDetail: BlogPageData?.data?.data,
        general: GeneralData?.data?.data,
        process: ProcessData?.data?.data,
        data: ContactPageData?.data?.data,
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
