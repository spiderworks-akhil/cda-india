import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Trust1 from "../../public/images/logo.svg";
import { CircleArrow2icon } from "../common/svgicon";
import { motion } from "framer-motion";
import Link from "next/link";
import Popup from "../common/Popup";
import { HTMLParser } from "@/utils/HTMLParser";

const Trust = ({ data }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        // On small screens the section is taller than the viewport, so a
        // ratio based threshold can never be reached. Fire once it has
        // scrolled 15% into the viewport instead.
        threshold: 0,
        rootMargin: "0px 0px -15% 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);



  return (
    <>
      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          leadSource='Home - Trust Section'
        />
      )}

      <section
        ref={sectionRef}
        className={`home-trust ${inView ? "in-view" : ""}`}
      >
        <div className="container">
          <div className="md:flex gap-[40px]">
            <div className="trust_right w-full md:hidden">
              <div className="max-w-[575px] mx-auto flex flex-col items-center  mb-[30px]">
                <motion.div className='h3'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}>{HTMLParser(data?.content?.title_2)}</motion.div>

                <div className='p'>{HTMLParser(data?.content?.description_2)}</div>

                <a
                  onClick={() => setPopupOpen(true)}
                  className="btn flex items-center gap-[12px]"
                >
                  {data?.content?.button_text_2} <CircleArrow2icon />
                </a>
              </div>
            </div>

            <div className="trust_left max-w-[400px] lg:max-w-[450px] xl:max-w-[530px] w-full flex flex-col items-center justify-between">
              <Image src={Trust1} alt="Trusted partners" width={188} height={130} />
              <Image
                src={data?.content?.media_id_2?.file_path}
                alt={data?.content?.media_id_2?.alt_text || "Trusted partners"}
                width={600}
                height={480}
                className="trust_left_img"
              />
            </div>

            <div className="trust_right w-full">
              <div className="max-w-[575px] mx-auto hidden md:flex flex-col items-center  mb-[30px]">
                <motion.div className='h3'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}>{HTMLParser(data?.content?.title_2)}</motion.div>
                <div className='p'>{HTMLParser(data?.content?.description_2)}</div>
                <a
                  onClick={() => setPopupOpen(true)}
                  className="btn flex items-center gap-[12px]"
                >
                  {data?.content?.button_text_2} <CircleArrow2icon />
                </a>
              </div>

              <div className="grid md:grid-cols-3 gap-[35px]  md:gap-[5px] lg:gap-[35px] mt-[30px] md:mt-[0] ">
                {data?.content?.trusted_partners_listing_id?.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="trust_item-block"
                  >
                    <div className="trust_item-block-item">
                      <div
                        className={`${index == 1 ? "md:mt-[90px]" : ""} ${
                          index == 2 ? "md:mt-[160px]" : ""
                        } trust_item flex flex-col items-center justify-center`}
                      >
                        <p className="trust-item-txt">{item?.title}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Trust;
