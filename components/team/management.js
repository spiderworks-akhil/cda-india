import { useState } from 'react';
import { BlueBtn } from '../common/svgicon';
import Accordion from '../common/Accordion';
import Teamlist from './teamlist';
import { HTMLParser } from '@/utils/HTMLParser';



const TeamManagement = ({ data }) => {
 
  return (
    <section className='management-listing pt-[20px] md:pt-[80px] pb-[40px] md:pb-[80px]'>
      <div className='container relative z-[1]'>

        <div className="grid md:grid-cols-2 gap-[20px] pack-listing_head mb-[55px]">
          <div className='max-w-[500px]'>
            <div className='h3'>{HTMLParser(data?.content?.title_2)}</div>
          </div>
          <div className='flex md:justify-end max-w-[560px]'>
            <div className='p'>{HTMLParser(data?.content?.description_2)}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-[40px] mb-[25px]">

          <div>
            <Teamlist
              manDesig={data?.content?.chairman_designation}
              manImg={data?.content?.media_id_2?.file_path}
              manImgAlt={data?.content?.media_id_2?.alt_text}
              manName={data?.content?.chairman_name} />
          </div>

          <div>
            <Teamlist
              manDesig={data?.content?.founder_designation}
              manImg={data?.content?.media_id_3?.file_path}
              manImgAlt={data?.content?.media_id_3?.alt_text}
              manName={data?.content?.founder_name} />
          </div>

          <div>
            <Teamlist
              manDesig={data?.content?.mentor_designation}
              manImg={data?.content?.media_id_4?.file_path}
              manImgAlt={data?.content?.media_id_4?.alt_text}
              manName={data?.content?.mentor_name} />
          </div>

        </div>

      </div>
    </section>
  );
};

export default TeamManagement;
