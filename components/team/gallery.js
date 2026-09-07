import { useState } from 'react';
import { BlueBtn } from '../common/svgicon';
import Accordion from '../common/Accordion';
import Teamlist from './teamlist';

import Image from 'next/image';
import Tm1 from '../../public/images/tm4.jpg';
import Tm2 from '../../public/images/tm5.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { HTMLParser } from '@/utils/HTMLParser';

const TeamGallery = ({ data }) => {


  return (
    <section className='team_gallery md:pt-[40px] pb-[80px]'>
      <div className='container relative z-[1]'>



        <div className="flex  gap-[80px] pack-listing_head mb-[55px]">

          <div className='max-w-[750px]'>
            <div className='h4'>{HTMLParser(data?.content?.description_4)}</div>

          </div>

        </div>


        <div className='mt-[50px]'>
          <Swiper
            spaceBetween={30}
            slidesPerView={1.5}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 50,
              },
            }}

            modules={[Autoplay]}
            className="mySwiper"
          >




            {data?.related_function?.gallery?.medias?.map((obj, index) => (

              <SwiperSlide key={index}>
                {/* {
                  console.log(obj)
                } */}
                <Image src={obj?.media?.file_path} alt={obj?.media?.alt_text || obj?.title || ''} width={550} height={550} />
              </SwiperSlide>
            ))}




          </Swiper>
        </div>





      </div>







    </section>
  );
};

export default TeamGallery;
