import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Map1 from '../../public/images/Map.png'
import Map2 from '../../public/images/falg2.png'

import { MapDot1icon } from '../common/svgicon';


import CountUp from '../../components/common/Count'
import { HTMLParser } from '@/utils/HTMLParser'


// Transform-only scroll reveal. Nothing here animates opacity on purpose: if
// `whileInView` ever fails to fire (a missed intersection, a resize during
// hydration) an opacity-based reveal leaves the block stuck at 0 and the whole
// section silently disappears. Every state below starts from something that is
// already on screen, so the worst case is an element sitting a few pixels off.
const EASE = [0.16, 1, 0.3, 1]

const section = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 }
  }
}

const rise = {
  hidden: { y: 40 },
  show: { y: 0, transition: { duration: 0.7, ease: EASE } }
}

// The map holds the pins, so it staggers them once it has settled itself.
const mapRise = {
  hidden: { y: 50 },
  show: {
    y: 0,
    transition: { duration: 0.8, ease: EASE, delayChildren: 0.35, staggerChildren: 0.08 }
  }
}

// Pins drop onto the map. Scale stays well clear of 0 so they never vanish.
const pinDrop = {
  hidden: { y: -14, scale: 0.8 },
  show: {
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 18 }
  }
}

const countRow = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

const countItem = {
  hidden: { y: 28 },
  show: { y: 0, transition: { duration: 0.6, ease: EASE } }
}


const Associates = ({ associateTitle, associateSubTitle, satisfiedClientsCount, satisfiedClients, associateLocations, experienceCount, experienceText, sectorCount, sectorText }) => {

  const associateLocationsstyle = [
    { right: '27%', top: '45%' },
    { right: '34%', top: '30%' },
    { left: '60%', top: '41%' },
    { left: '62%', top: '36%' },
    { right: '34%', top: '42%' },
    { left: '46%', top: '15%' },
    { right: '18%', bottom: '42%' },
  ];


  return (
    <motion.section
      className='home-associates overflow-hidden'
      variants={section}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className='container' >

        <motion.h3 variants={rise}>  {associateTitle} </motion.h3>
        <motion.h5 variants={rise}> {associateSubTitle} </motion.h5>


        <motion.div
          className='max-w-[300px] md:max-w-[910px] mx-auto relative associates_cntr'
          variants={mapRise}
        >
          <Image src={Map1} alt='' width={910} height={315} />

          {associateLocations && associateLocations.map((loc, index) => (
            <motion.div
              key={index}
              className='absolute cursor-pointer associates_list'
              style={associateLocationsstyle[index]}
              variants={pinDrop}
            >
              <MapDot1icon />
              <div className='absolute left-[-36px] md:left-0 top-[100%] bg-white p-[10px] rounded-[15px] associates_list_opt'>
                {
                  loc?.media_id?.file_path && <Image src={loc?.media_id?.file_path} alt={loc?.media_id?.alt_text || loc?.title || loc?.name || ''} width={910} height={315} />
                }

                <div className='h4'>{HTMLParser(loc?.title)}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>


        <div className='associates_count'>

          <motion.div
            className='grid md:grid-cols-3 gap-[25px] md:gap-[0] max-w-[300px] md:max-w-[unset] mx-auto'
            variants={countRow}
          >

            <motion.div
              className='border-r-0 md:border-r-1 border-dashed border-[#fff] flex items-center justify-center gap-[35px] pr-[10px]'
              variants={countItem}
            >
              <span className='count-num'><CountUp
                from={0}
                to={satisfiedClientsCount}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
              />
                +</span>
              <p>{satisfiedClients}</p>
            </motion.div>

            <motion.div
              className='px-[10px] py-[25px] border-b md:border-b-0 border-t md:border-t-0 border-r-0 md:border-r border-dashed border-[#fff] flex items-center justify-center gap-[35px]'
              variants={countItem}
            >
              <span className='count-num'><CountUp
                from={0}
                to={experienceCount}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
              /> </span>
              <p>{experienceText}</p>
            </motion.div>


            <motion.div
              className='flex items-center justify-center gap-[35px]  pl-[10px]'
              variants={countItem}
            >
              <span className='count-num'>
                <CountUp
                  from={0}
                  to={sectorCount}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />+ </span>
              <p> {sectorText}</p>
            </motion.div>

          </motion.div>


        </div>


      </div>
    </motion.section>
  )
}

export default Associates
