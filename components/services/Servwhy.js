import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Ser1 from '../../public/images/ser6.png'
import { BlueBtn, CircleArrow2icon, CircleArrowicon, CurveLargeArrowicon, LargeArrowicon, LongArrowicon, UpArrowicon, WideCircle1icon, WideCircle2icon, WideCircle3icon } from '../common/svgicon'
import Popup from '../common/Popup'
import Link from 'next/link'
import { HTMLParser } from '@/utils/HTMLParser'

const SerWhy = ({ shorttitle, title, Whycdalist, discription, btntext, whyimgtext, whyimg, whyimgalt, whyimgcap, whyimgsubcap, whyimgbtntxt }) => {

  const [isPopupOpen, setPopupOpen] = useState(false);

  return (


    <>

      {
        isPopupOpen &&
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          leadSource='Services - Why CDA'
        />
      }



      <section className='ser-why-sec pt-[100px] pb-[100px] '>

        <div className='container  '>



          <div className='flex flex-col md:flex-row items-center justify-between gap-[60px] '>


            <motion.div initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }} className='w-full max-w-[780px]'>

              <h5> {shorttitle}</h5>
              <h3>  {title}</h3>

              <div className='p'>{HTMLParser(discription)}</div>

              <ul className='why-cda-list'>

                {Whycdalist?.map((item, index) => (
                  <li key={index} className='flex items-center gap-[16px]'><span className='why-cda-list-span'></span>  {item?.title}</li>
                ))}


              </ul>
              <a onClick={() => setPopupOpen(true)} className='btn flex items-center justify-between'>   {btntext} <LargeArrowicon /> </a>

            </motion.div>


            <div className=' pt-[50px]'>
              <div className='relative rounded-[74px] overflow-hidden '>
                <Image src={whyimg} alt={whyimgalt || whyimgcap || title || 'Why CDA'} width={466} height={533} />
                <div className='absolute  left-0 top-0 w-full h-full flex flex-col items-center justify-between p-[40px] md:p-[20px] lg:p-[40px] text-center bg-[#00000015] '>
                  <span> {whyimgcap} </span>

                  <h4>{whyimgsubcap}</h4>

                  <Link href={`/contact-us`}><BlueBtn btntext={whyimgbtntxt} /></Link>

                </div>
              </div>

            </div>

          </div>


        </div>
      </section>
    </>
  )
}

export default SerWhy
