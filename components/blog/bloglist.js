import { useEffect, useState } from 'react'
import Image from 'next/image' 

import Blog1 from '../../public/images/blog1.png' 
import Link from 'next/link'
import moment from 'moment';



 

const BlogListitems = ({imgSrc, imgAlt, date, time, title, link  }) => {

 const now = moment(date).format('Do MMMM YYYY');
   
  
  return (
     <div className='blog_list'>
      <Link href={`/blog/${link}`}>        <Image src={imgSrc} alt={imgAlt || title || 'Blog post'} width={440} height={266} />
        <div className='p-[15px]'>
            <h5>  {now} </h5>
            <h4> {title} </h4>
            <span> {time} </span>
        </div>
        </Link>


     </div>
  )
}

export default BlogListitems
