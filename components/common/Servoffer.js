import { motion } from 'framer-motion'
import Image from 'next/image'
import { LoadBtn, LongArrowicon } from './svgicon'
import Link from 'next/link'
import { HTMLParser } from '@/utils/HTMLParser'



const SerOffer = ({ IsServiceDetails, shorttitle, title, discription, listdata }) => {

  return (

    <>

      {listdata?.length > 0 &&
        <section className='ser-offer-sec pt-[100px] pb-[50px] md:pb-[100px] '>
          <div className='container  '>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className='flex flex-col md:flex-row gap-[25px] md:gap-[10px] items-end justify-between ser-offer-head  '
            >
              <div>
                <div className='max-w-[528px]'>
                  <h5>{shorttitle}</h5>
                  <h2>{title}</h2>
                </div>
              </div>

              <div>
                <div className='max-w-[506px]'>
                  <div className='p'>{HTMLParser(discription)}</div>
                </div>
              </div>
            </motion.div>

            <hr />

            <div>
              {listdata?.map((service, index) => (
                <Link href={`/services/${service?.slug}`}
                  key={index}
                  className={`ser-offer-list flex flex-col md:flex-row items-stretch md:items-center  ${index % 2 === 0 ? 'justify-start' : 'justify-end'
                    } gap-[18px] md:gap-[20px] lg:gap-[40px]`}
                >
                  <div className='w-full md:w-auto flex items-center gap-[18px] md:gap-[20px] lg:gap-[40px]'>
                    <span className='item-index'>{index + 1}</span>
                    <Image
                      src={service?.featured_image?.file_path}
                      alt={service?.featured_image?.alt_text || service?.name || service?.title || `Service ${index + 1}`}
                      width={338} height={222}
                      sizes='338px'
                    />
                  </div>

                  <p>{service?.short_description}</p>

                  <div className='w-full md:max-w-[225px] flex items-center justify-between md:block'>
                    <h3>{service?.name}</h3>
                    <span className='btn flex items-center gap-[10px]'>
                      View Service <LongArrowicon />
                    </span>
                  </div>
                </Link>
              ))}
            </div>


            <>

              {listdata?.children?.length > 3 && (
                <>

                  {IsServiceDetails && <div className='flex justify-center pt-[30px]'> <button type='button' className='btn-reset cursor-pointer'> <LoadBtn loadtext={"Load More"} />  </button> </div>}

                </>

              )}

            </>


          </div>
        </section>}
    </>

  )
}

export default SerOffer
