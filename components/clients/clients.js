import { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo1 from '../../public/images/logo.svg'

import Logo2 from '../../public/images/cl1.png'
import Logo3 from '../../public/images/cl2.png'
import Logo4 from '../../public/images/cl3.png'
import Logo5 from '../../public/images/cl4.png'





import { LargeArrowicon, Lineicon, Medalicon } from '../common/svgicon'
import { HTMLParser } from '@/utils/HTMLParser'

 

const ClientsList = ({data}) => {


   
  
  return (
    <section className='Client_list_cntr pt-[20px] md:pt-[50px] pb-[50px]'>
      <div className='container  '>



      <div className="grid md:grid-cols-2 gap-[20px] mb-[40px] md:mb-[80px]"> 
                <div>
                    <div className='max-w-[520px]'>
                        <div className='h3'>{HTMLParser(data?.content?.title_1)}</div>  
                    </div> 
                </div>

                <div className='flex md:justify-end'>
                     <div className='max-w-[560px]'>
                        <div className='p'>{HTMLParser(data?.content?.description_1)}</div>  
                    </div>
                </div> 
            </div>


        



        <div className=' '>

       
            <div className='grid grid-cols-2  md:grid-cols-5 gap-[30px]'>


                {data?.content?.clients_listing_id.map((item, index) =>(

                    <div key={index} className='client-logo-list'>
                        <Image src={item?.media_id?.file_path} alt={item?.media_id?.alt_text || item?.title || `Client logo ${index + 1}`} width={180} height={80} />
                    </div>


                ))}

                

            </div>



          
         
           
             
             

         
        </div>
      </div>
    </section>
  )
}

export default ClientsList
