import { CircleArrow2icon } from '@/components/common/svgicon'
import Base from '@/components/layout/Base'
import { GeneralApi } from '@/Datas/endpoints/general'
import React from 'react'
import Image from 'next/image' 

import Thanks from '../public/images/thank-you.png' 
import Link from 'next/link'
import Head from 'next/head'

function ThankYou({general}) {
  return (

     <Base general={general} data={{ browser_title: 'Thank you' }}>
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
            
 <Image src={Thanks} alt='Thank you' width={200} height={300} className='block mx-auto  ' />
          </div>

          <div className='flex md:flex-col justify-center md:justify-baseline items-center md:items-start'>

             <div className='mt-auto'>
               <h3>You’re Officially Connected</h3>
              <p>Great things take time—luckily, we’re fast! We’ll connect shortly!</p>  
              <Link  href='/' className=" btn flex items-center gap-[12px]"> Return to Home <CircleArrow2icon/> </Link>
              </div>
            
          </div>

        </div>

      </div>

    
   
    
      
    </section>

    </Base>
  )
}

export default ThankYou


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
    // return{
    //   notFound:true
    // }
  }
}

