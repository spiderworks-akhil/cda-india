import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Abt2 from '../../public/images/ab2.webp';
import { BlueBtn, Bluecircleicon, CircleArrowicon, CurveLargeArrowicon, WhiteBtn } from '../common/svgicon';
import Noise from '../common/Noise';

import Pros1 from '../../public/images/pros1.png' 
import Pros2 from '../../public/images/pros2.png' 
import Pros3 from '../../public/images/pros3.png' 
import { LongArrowicon } from '../common/svgicon'

const PackageHead = ({data}) => {
  return (
   
      <section className='pack-head  pt-[50px] pb-[50px] '> 
       
        <div className='container relative z-[1]'>


             <div className='grid md:grid-cols-2  gap-[30px] md:gap-[40px] xl:gap-[76px]'>
            
             
            
                        <div className='pros_list'>
                        <Image src={Pros2} alt='Our packages' width={272} height={101}  />
                        <div className='flex items-center mt-[34px] gap-[15px]'>
                        <h4> {data?.content?.title_2}</h4> 
                        <a href='#Tax'><LongArrowicon/></a>
                        </div>
                        
                        </div>
            
            
                        <div className='pros_list'>
                        <Image src={Pros3} alt='Our packages' width={272} height={101}  />
                        <div className='flex items-center mt-[34px] gap-[15px]'>
                        <h4>{data?.content?.title_3}</h4> 
                        <a href='#Audit'><LongArrowicon/></a>
                        </div>
                        
                        </div>
            
                    </div>



           
        </div>
 
      </section>
    
  );
};

export default PackageHead;
