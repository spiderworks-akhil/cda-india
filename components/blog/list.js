import { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo1 from '../../public/images/logo.svg'

import Logo2 from '../../public/images/cl1.png'
import Logo3 from '../../public/images/cl2.png'
import Logo4 from '../../public/images/cl3.png'
import Logo5 from '../../public/images/cl4.png'





import { Articleicon, BlueBtn, LargeArrowicon, Lineicon, Medalicon } from '../common/svgicon'
import Accordion from '../common/Accordion'
import BlogListitems from './bloglist'



// The author page shares this list, so the empty copy is a prop - "no posts
// yet" reads wrong under an author who simply has not written any.
const BlogList = ({
  data,
  emptyTitle = 'No blog posts yet',
  emptyText = 'There is nothing published here right now. Please check back soon.'
}) => {

  const hasPosts = data?.length > 0

  return (
    <section className=' pt-[20px] md:pt-[50px] pb-[50px]'>
      <div className='container  '>

        {hasPosts ? (
          <div className=' grid md:grid-cols-3 gap-[35px]'>

            {
              data?.map((item, index) => (
                <BlogListitems key={index}
                  title={item?.title}
                  time={item?.published_by?.name}
                  imgSrc={item?.featured_image?.file_path}
                  imgAlt={item?.featured_image?.alt_text}
                  date={item?.published_on}
                  link={item?.slug}
                />
              ))
            }

          </div>
        ) : (
          <div className='blog_empty'>
            <span className='blog_empty_icon'>
              <Articleicon />
            </span>

            <h4>{emptyTitle}</h4>
            {emptyText && <p>{emptyText}</p>}
          </div>
        )}


      </div>
    </section>
  )
}

export default BlogList
