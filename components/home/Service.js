import { useEffect, useRef } from "react";
import Image from "next/image";
import Ser1 from "../../public/images/hm-serv1.jpg";
import Ser2 from "../../public/images/hm-serv2.jpg";
import Ser3 from "../../public/images/hm-serv3.jpg";

import {
  CircleArrow2icon,
  CircleArrowicon,
  LongArrowicon,
} from "../common/svgicon";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { HTMLParser } from "@/utils/HTMLParser";

gsap.registerPlugin(ScrollTrigger);

const Service = ({ data }) => {
  const textRef = useRef();
  const sectionRef = useRef();

  useEffect(() => {
    const textElement = textRef.current;
    const section = sectionRef.current;

    // Split and animate characters
    const characters = textElement.textContent.split("");
    textElement.innerHTML = "";
    characters.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      textElement.appendChild(span);
    });

    gsap.to(textElement.children, {
      color: "#333",
      duration: 0.5,
      scrollTrigger: {
        trigger: textElement,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
      stagger: {
        each: 0.3,
        from: "start",
      },
    });

    // Fade-in section
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".home-why-item", {
      y: 150,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".home-why",
        start: "top 70%",
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="home-service">
      <div className="container sticky top-[25px]">
        <div className="home-service-cntr">
          <div className="max-w-[1005px] mx-auto">
            <div className='h4'
              ref={textRef}>{HTMLParser(data?.content?.description_3)}</div>

            <div className="grid md:grid-cols-3 gap-[50px] md:gap-[45px] xl:gap-[98px] mt-[50px] mb-[38px] md:mb-[97px] md:px-[45px]">
              {data?.content?.index_service_listing_id.map((item, index) => (
                <div key={index}>
                  <Link href={`/${item?.url || "#"}`}>
                    <div
                      className={`${
                        index === 1 ? " md:mt-[65px] ml-auto md:ml-0 " : ""
                      } hm-ser-list`}
                    >
                      <Image
                        src={item?.media_id?.file_path}
                        alt={item?.media_id?.alt_text || item?.title || `Service ${index + 1}`}
                        width={250}
                        height={250}
                      />
                      <div className="hm-ser-list-cap"> {item?.title} </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Link
                href={data?.content?.button_link_3 || "#"}
                className="btn flex items-center gap-[16px]"
              >
                {data?.content?.button_text_3} <LongArrowicon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
