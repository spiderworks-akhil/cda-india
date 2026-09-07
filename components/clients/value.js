import { useEffect, useState } from 'react'
import Image from 'next/image'
import Client1 from '../../public/images/client.png'

import Client2 from '../../public/images/cl5.png'
import Client3 from '../../public/images/cl6.png'
import Client4 from '../../public/images/cl7.png'
import Client5 from '../../public/images/cl8.svg'
import Client6 from '../../public/images/cl9.jpg'

import Client7 from '../../public/images/cl10.png'
import Client8 from '../../public/images/cl11.png'
import Client9 from '../../public/images/cl12.png'
import Client10 from '../../public/images/cl13.png'
import Client11 from '../../public/images/cl14.png'








import { CircleArrowicon } from '../common/svgicon'
import Link from 'next/link'
import { HTMLParser } from '@/utils/HTMLParser'

const clientImages = [Client2, Client3, Client4, Client5, Client6, Client7, Client8, Client9, Client10, Client11];

// Repeat the array if you want to show more logos
const repeatedClients = [...clientImages, ...clientImages]; // You can control how many times you repeat it

const OurValue = ({data}) => { 
  return (
    <section className='home-clients'>
      <div className='container'>

        <div className='h3'>{HTMLParser(data?.content?.title)}</div>

          <div className='flex flex-col md:flex-row items-center gap-[30px] rounded-[12px] overflow-hidden border border-[#E5E5E5] mt-[27px]'> 

          <div className='clients_left'>
            <div className='clients_left_cap'>
              <h4> {data?.content?.short_description}</h4>
              <Link href={data?.content?.btn_link || '#'} className='btn flex items-center justify-between gap-[20px]'> {data?.content?.btn_text} <CircleArrowicon/> </Link>
            </div>
            <Image src={data?.content?.media_id_10?.file_path} alt={data?.content?.media_id_10?.alt_text || data?.content?.title_10 || ''} width={560} height={530}  />
          </div>

          <div className='clients_right w-full'>
            <div className='grid grid-cols-3 md:grid-cols-5 gap-[20px] xl:gap-[45px]'>

              {data?.content?.our_exceptional_clients_listing_id.map((client, index) => (
                <div className='clients_list' key={index}>
                  <Image src={client?.media_id.file_path} alt={client?.media_id?.alt_text || client?.title || client?.name || 'Client logo'} width={80} height={35} />
                </div>
              ))}

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default OurValue