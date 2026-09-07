import { useState } from 'react';
import { BlueBtn } from '../common/svgicon';
import Accordion from '../common/Accordion';
import Teamlist from './teamlist';
import { HTMLParser } from '@/utils/HTMLParser';

 

const TeamMeat = ({data}) => {
 

  return (
    <section className=' md:pt-[40px] pb-[80px]'> 
      <div className='container relative z-[1]'>

        <div className='Team-meet'>

          
        <div className="lg:flex  gap-[30px] lg:gap-[80px] pack-listing_head mb-[55px]"> 

          <div className='md:w-[100%] lg:max-w-[550px]'>
            <div className='sticky top-[100px]'> 
                <h3 className='mb-[20px]'> {data?.content?.title_3}  </h3> 

                <div className='p'>{HTMLParser(data?.content?.description_3)}</div>  
            </div>
           
          </div> 

          <div>
         


                <div className="grid md:grid-cols-3 gap-[20px] lg:gap-[40px] mt-[25px]  lg:mt-[0] mb-[25px]"> 
              
                {data?.related_function?.team?.slice(0, 9).map((obj, index) => (
                  <div key={index}>
                    <Teamlist 
                    manName={obj?.title}
                    manImg={obj?.featured_image?.file_path}
                    manImgAlt={obj?.featured_image?.alt_text || obj?.title || `Team member ${index + 1}`}
                    manDesig={obj?.designation}
                    />
                  </div>
                ))}

 
          

          </div>
          </div>


        </div>


        


        </div>








       

 


  






      </div>
    </section>
  );
};

export default TeamMeat;
