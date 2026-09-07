import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Ser2 from '../../public/images/serdet2.png';
import { BlueBtn, Bluecircleicon, CircleArrowicon, CurveLargeArrowicon, WhiteBtn } from '../common/svgicon';
import Noise from '../common/Noise';
import Link from 'next/link';
import { HTMLParser } from '@/utils/HTMLParser';

const SerDetFinance = ({data}) => {
  return (
   
      <section className='ser-det-finance  '>



 
       
        <div className='container relative z-[1]'>
          <div className='grid md:grid-cols-2 gap-[15px]'>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
            className='md:flex justify-center items-center'>
              <div className='max-w-[610px]'>
               
                <div className='h4'>{HTMLParser(data?.content?.title_2)}</div>  


                <div className=' pt-[25] pb-[55px] md:hidden'>
            <Image src={data?.content?.media_id_2?.file_path} alt={data?.content?.media_id_2?.alt_text || 'Corporate finance solutions'} width={1920} height={773} />
            </div>
                
                <div className='p'>{HTMLParser(data?.content?.description_2)}</div> 
                <Link href={`/contact-us`}><BlueBtn btntext={data?.content?.button_text_2}/> </Link>
              </div>
          
         
              
            </motion.div>


            <div className='hidden md:block'>
            <Image src={data?.content?.media_id_2?.file_path} alt={data?.content?.media_id_2?.alt_text || 'Corporate finance solutions'} width={1920} height={773} />
            </div>

           
           
           
          </div>
        </div>
 
      </section>
    
  );
};

export default SerDetFinance;
