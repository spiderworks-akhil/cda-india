import { useEffect, useState } from "react";
import Image from "next/image";
import Map1 from "../../public/images/Map.png";
import Map2 from "../../public/images/falg2.png";

import {
  CircleArrow2icon,
  CircleArrowicon,
  LongArrowicon,
  MapDot1icon,
} from "../common/svgicon";
import Accordion from "../common/Accordion";
import Popup from "../common/Popup";
import { HTMLParser } from "@/utils/HTMLParser";

const Faq = ({ servfaqs, faqrighttitle, faqrightdiscription, faqrightbtn, heading, service, leadSource = 'FAQ Section' }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const [openIndex, setOpenIndex] = useState(0); // <- this will open the first accordion by default

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          service={service}
          leadSource={leadSource}
        />
      )}

      <section className="home-faq">
        <div className="container">
          <div className="home-faq-cntr">
            <h3>
              {heading ? (
                heading
              ) : (
                <>
                  {" "}
                  Frequently Asked <b>Questions</b>
                </>
              )}
            </h3>

            <div className="flex flex-col md:flex-row gap-[50px] md:gap-[0] items-start">
              <div className="w-full flex flex-col gap-[24px] faq-accordion-block">
                {servfaqs?.map((item, index) => (
                  <Accordion
                    key={index}
                    title={item.question}
                    content={item.answer.replace(/<[^>]*>/g, "")}
                    isOpen={openIndex === index}
                    onToggle={() => toggleAccordion(index)}
                  />
                ))}

                {/* <div className='flex mt-[50px] '>
      <a className=' link flex items-center gap-[16px]'> Still Looking For Answers? <LongArrowicon/> </a>
      </div> */}
              </div>

              <div className="min-w-[360px] xl:min-w-[460px] flex md:justify-end pr-[40px]">
                <div className="px-[15px] md:px-0  max-w-[270px]">
                  <h4> {faqrighttitle}</h4>
                  <div className='p'>{HTMLParser(faqrightdiscription)}</div>

                  <button
                    type="button"
                    onClick={() => setPopupOpen(true)}
                    className="btn btn-reset flex items-center justify-between"
                  >
                    {" "}
                    {faqrightbtn} <CircleArrow2icon />{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
