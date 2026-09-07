import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Abt2 from '../../public/images/ab2.webp';
import { BlueBtn, Bluecircleicon, CircleArrowicon, CurveLargeArrowicon, WhiteBtn } from '../common/svgicon';
import Noise from '../common/Noise';
import { HTMLParser } from '@/utils/HTMLParser';

const Aboutabout = ({data}) => {
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
               
                <h4>{data?.content?.title_1} </h4>


                <div className=' pt-[25] pb-[55px] md:hidden'>
            <Image src={Abt2} alt='About CDA Audit' width={500} height={500} />
            </div>

            <div className='p'>{HTMLParser(data?.content?.description_1)}</div>
                
               
                
              </div>
          
         
              
            </motion.div>


            <div className='hidden md:block '>
            <Image src={data?.content?.media_id_2?.file_path} alt={data?.content?.media_id_2?.alt_text || data?.content?.title_2 || 'About CDA Audit'} width={500} height={500} className='sticky top-[80px]' />
            </div>

         
           
           
          </div>
        </div>
 
      </section>
    
  );
};

export default Aboutabout;