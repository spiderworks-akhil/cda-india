import { CircleArrow2icon } from '@/components/common/svgicon'
import Base from '@/components/layout/Base'
import { GeneralApi } from '@/Datas/endpoints/general'
import React from 'react'
import Image from 'next/image' 

import Thanks from '../public/images/404.png' 
import Link from 'next/link'

function Page404({general}) {
  return (

     <Base general={general} data={{ browser_title: 'Page not found', meta_description: 'The page you are looking for does not exist or has moved. Return to the CDA Audit homepage.' }}>

      <div className='h-[120px] bg-[#12283a]'>

      </div>
    <section className='w-full min-h-[100vh] flex flex-col items-center justify-center thank-you-container py-[50px] md:py-[100px]' > 
      <div className='container'>
        <div className='grid md:grid-cols-3 gap-[25px]'>

          <div className=''>
              <h1>404 Error</h1>
          </div>

          <div>
            
 <Image src={Thanks} alt='' width={400} height={300} className='block mx-auto  ' />
          </div>

          <div className='flex md:flex-col justify-center md:justify-baseline items-center md:items-start'>

             <div className='mt-auto'>
               <h3>Page Not Found</h3>
              <p>Looks like a miscalculation! Don’t worry, we’ll reconcile this soon</p>  
              <Link  href='/' className=" btn flex items-center gap-[12px]"> Return to Home <CircleArrow2icon/> </Link>
              </div>
            
          </div>

        </div>

      </div>

    
   
    
      
    </section>

    </Base>
  )
}

export default Page404


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

