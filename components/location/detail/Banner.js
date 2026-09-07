import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Loc1 from '@/public/images/serdet1.png'
import { WhiteBtn } from '@/components/common/svgicon'
import Popup from '@/components/common/Popup'
import { HTMLParser } from '@/utils/HTMLParser'

const LocBanner = ({ data }) => {

  const [isPopupOpen, setPopupOpen] = useState(false)

  const title = data?.content?.title_1 || data?.title || data?.name
  const description = data?.content?.description_1 || data?.short_description

  return (
    <>
      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          leadSource={`Location Banner : ${data?.title || data?.name || ''}`.trim()}
        />
      )}

      <section className='ser-det-banner relative  location_banner'>
        <Image
          src={data?.banner_image?.file_path || Loc1}
          alt={data?.banner_image?.alt_text || title || ''}
          width={1920}
          height={773}
          priority
          sizes="100vw"
        />

        <div className='absolute top-0 left-0 w-full h-full z-[2] flex items-end pb-[60px]'>
          <div className='container relative z-[1]'>
            <div className='grid md:grid-cols-2 gap-[15px]'>
              <div className="fade-up-anim"
                className='md:flex  items-center'
              >
                <div>
                  <h1>{title}</h1>

                  {description && (
                    <div
                      className='p'>{HTMLParser(description)}</div>
                  )}

                  {data?.content?.button_text_1 && (
                    <a onClick={() => setPopupOpen(true)}>
                      <WhiteBtn btn2text={data?.content?.button_text_1} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LocBanner
