import { CircleArrow2icon } from '@/components/common/svgicon'
import Base from '@/components/layout/Base'
import { GeneralApi } from '@/Datas/endpoints/general'
import React from 'react'
import Image from 'next/image'

import Thanks from '../../public/images/thank-you.png'
import Link from 'next/link'
import Head from 'next/head'

function CareerThankYou({ general }) {
  return (

    <Base general={general} data={{ browser_title: 'Application received' }}>
      <Head>
        <meta name="robots" content="noindex, nofollow" key="robots" />
      </Head>

      <div className='h-[120px] bg-[#12283a]'>

      </div>

      <section className='w-full min-h-[100vh] flex flex-col items-center justify-center thank-you-container py-[50px] md:py-[100px]' >
        <div className='container'>
          <div className='grid md:grid-cols-3 gap-[25px]'>

            <div className=''>
              <h1>Thank You!</h1>
            </div>

            <div>
              <Image src={Thanks} alt='' width={200} height={300} className='block mx-auto  ' />
            </div>

            <div className='flex md:flex-col justify-center md:justify-baseline items-center md:items-start'>

              <div className='mt-auto'>
                <h3>Your Application Is In</h3>
                <p>Thanks for applying! Our team will review your profile and get back to you if there’s a match.</p>
                <Link href='/career' className=" btn flex items-center gap-[12px] text-nowrap"> Back to Careers <CircleArrow2icon /> </Link>
              </div>

            </div>

          </div>

        </div>

      </section>

    </Base>
  )
}

export default CareerThankYou


export async function getStaticProps() {
  try {
    const GeneralData = await GeneralApi.general();
    return {
      props: {
        general: GeneralData?.data?.data,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log("www", error);
    throw error;
  }
}
