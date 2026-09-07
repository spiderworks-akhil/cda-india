import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Ser1 from '../../public/images/serdet1.png'
import {
  Bluecircleicon,
  CircleArrowicon,
  CurveLargeArrowicon,
  WhiteBtn
} from '../common/svgicon'
import Noise from '../common/Noise'
import Popup from '../common/Popup'
import { HTMLParser } from '@/utils/HTMLParser'

const SerDetHead = ({ data }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <>
      {
        isPopupOpen &&
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          service={{ id: data?.id, title: data?.title }}
          leadSource='Service Detail - Banner'
        />
      }


      <section className='ser-det-banner  relative mb-[45px]'>
        <Image src={data?.banner_image?.file_path} alt={data?.banner_image?.alt_text || data?.title || 'Service banner'} width={1920} height={773} />

        <div className='absolute top-0 left-0 w-full h-full z-[2] flex items-end pb-[60px]'>
          <div className='container relative z-[1]'>
            <div className='grid md:grid-cols-2 gap-[15px]'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true }}
                className='md:flex justify-center items-center'
              >
                <div>
                  <h1> {data?.content?.title_1} </h1>
                  {/* <CurveLargeArrowicon /> */}

                  <div className='p'>{HTMLParser(data?.content?.description_1)}</div>

                  {data?.content?.button_text_1 && (
                    <a onClick={() => setPopupOpen(true)}>
                      <WhiteBtn btn2text={data?.content?.button_text_1} />
                    </a>
                  )}

                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SerDetHead
