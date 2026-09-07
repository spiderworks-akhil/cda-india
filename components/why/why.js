import { useState } from 'react';
import { BlueBtn, Quateicon } from '../common/svgicon';
import Accordion from '../common/Accordion';
import Why1 from '../../public/images/why.jpg' 
import Image from 'next/image';
import { HTMLParser } from '@/utils/HTMLParser';

const Whycda = ({data}) => {
 

  return (
   <div className='why_cda pt-[30px] md:pt-[80px] pb-[30px] md:pb-[80px]'> 
     <div className='container'>


        <div className='max-w-[450px]'>
            <span> {data?.content?.short_title_1}</span>
            <h3> {data?.content?.title_1}</h3>

        </div>

        <hr/>

  

         

        <div className='md:flex flex-col md:flex-row   md:gap-[30px] lg:gap-[70px]'>

            <div className=' md:w-[70%]  '>

                <div>{HTMLParser(data?.content?.description_1)}</div>
                 
                
            </div>


            <div className='mt-[25px] md:mt-[0] max-w-[568px] w-full'> 
                <div className='sticky top-[100px]'>
                    <Image src={data?.content?.media_id_2?.file_path} alt={data?.content?.media_id_2?.alt_text || data?.content?.title_1 || 'Why CDA'} width={450} height={550}  />
                </div>
               
            </div>

        </div>



     </div>
 

   </div>
  );
};

export default Whycda;
