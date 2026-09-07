'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Ser1 from '../../public/images/ser1.png';
import { Bluecircleicon, CircleArrowicon, CurveLargeArrowicon } from '../common/svgicon';
import Noise from '../common/Noise';
import { HTMLParser } from '@/utils/HTMLParser';

const SerBanner = ({ subtitle, title, discription, bnrimg, bnrimgalt }) => {
  return (
    <>
      <section className='ser-banner-sec min-h-screen flex items-end'>
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={15}
        />
        <div className='container relative z-[1]'>
          <div className='grid md:grid-cols-2 gap-[15px]'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className='md:flex justify-center items-center'>
              <div>
                <h5 className='flex items-center gap-[10px]'>
                  <Bluecircleicon />  {subtitle}
                </h5>
                <h1> {title}</h1>
                <CurveLargeArrowicon />
                <div className='text-[#ffffffcf]'>{HTMLParser(discription)}</div>
              </div>



            </motion.div>

            <div className='flex flex-col items-end justify-end'>
              <Image src={bnrimg} alt={bnrimgalt || title || 'Services banner'} width={633} height={633} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SerBanner;
