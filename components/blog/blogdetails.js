import { useEffect, useState } from 'react'
import Image from 'next/image'

import Blog1 from '../../public/images/pros3.png'
import { Backicon, Faceicon, Instaicon, Linkicon, Shareicon, Xicon, Youicon } from '../common/svgicon'
import moment from 'moment';
import Link from 'next/link';
import { HTMLParser } from '@/utils/HTMLParser';





const BlogDetailsitems = ({ data }) => {
  const [copied, setCopied] = useState(null)
  const now = moment(data?.published_on).format('Do MMMM YYYY');

  const hasAuthorSocials = [
    'facebook_link',
    'instagram_link',
    'twitter_link',
    'youtube_link',
    'linkedin_link',
  ].some((key) => data?.published_by?.[key]);

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 800);

      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  // const handleShare = () => {


  //     if (navigator.share) {
  //       navigator
  //         .share({
  //           title: data?.title,
  //           url: window.location.href,
  //           text: data?.meta_description,
  //         })

  //     } else {
  //       copyToClipboard(window.location.href);
  //     }
  //   };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
  };


  return (
    <section className='blog_details_sec pt-[50px] pb-[50px]'>
      <div className='container'  >

        <div className='flex items-center justify-between mb-[25px]'>
          <Link href="/blog" className='back_btn flex items-center gap-[10px]'> <Backicon /> All Blogs  </Link>
          <div>

            {copied && (
              <div className='py-[4px] px-[8px] bg-gray-500 text-[10px] rounded-[6px] mb-2'>
                Copied!
              </div>
            )}
            <div className='share_btn flex items-center gap-[10px] relative cursor-pointer' onClick={handleShare}>
              Share <Shareicon />
            </div>
          </div>
        </div>



        <Image src={data?.featured_image?.file_path} alt={data?.featured_image?.alt_text || data?.title || 'Blog post'} width={1000} height={350} priority sizes="(min-width: 1024px) 1000px, 100vw" />

        <div className='pt-[25px]'>


          <h2> {data?.title} </h2>

          <span> {now}</span>


          {data?.content?.map((items, index) => (

            <div key={index}>
              <h2>{items?.title} </h2>
              <div className='text-[#222]'>{HTMLParser(items?.description)}</div>
            </div>

          ))}


        </div>


        {/* The author block only makes sense with a name and a designation -
            without them it renders an empty bordered box. */}
        {data?.published_by?.name && data?.published_by?.designation && (
          <div className='author-sec flex flex-col md:flex-row items-center gap-[25px]'>

            {
              data?.published_by?.featured_image?.file_path &&
              <Image
                src={data?.published_by?.featured_image?.file_path}
                alt={data?.published_by?.featured_image?.alt_text || data?.published_by?.name || 'Author'}
                width={1000}
                height={350}
              />
            }

            <div>
              <h5>
                {data?.published_by?.slug
                  ? <Link href={`/author/${data?.published_by?.slug}`}>  {data?.published_by?.name} </Link>
                  : data?.published_by?.name}
              </h5>
              <h3> {data?.published_by?.designation}</h3>
              {data?.published_by?.short_description &&
                <p> {data?.published_by?.short_description}</p>
              }
              {hasAuthorSocials && (
                <div className='flex items-center gap-[15px]'>
                  {data?.published_by?.['facebook_link'] &&
                    <a href={data?.published_by?.facebook_link} target='_blank'><Faceicon /></a>
                  }
                  {data?.published_by?.['instagram_link'] &&
                    <a href={data?.published_by?.instagram_link} target='_blank'> <Instaicon /></a>
                  }
                  {data?.published_by?.['twitter_link'] &&
                    <a href={data?.published_by?.twitter_link} target='_blank'> <Xicon /> </a>
                  }
                  {data?.published_by?.['youtube_link'] &&
                    <a href={data?.published_by?.youtube_link} target='_blank'><Youicon /></a>
                  }
                  {data?.published_by?.['linkedin_link'] &&
                    <a href={data?.published_by?.linkedin_link} target='_blank'><Linkicon /></a>
                  }

                </div>
              )}
            </div>

          </div>
        )}

      </div>

    </section>
  )
}

export default BlogDetailsitems
