import { useRef } from "react";
import Image from "next/image";
import Abt1 from "../../public/images/ab3.webp";
import Abt2 from "../../public/images/ab4.webp";
import Abt3 from "../../public/images/ab5.webp";

import { CircleArrow2icon, CircleArrowicon } from "../common/svgicon";

import { motion } from "framer-motion";

const Aboutwho = ({ data }) => {
  const firstClass =
    " md:border-r border-[#E4E4E4]  px-[33px] pb-[40px] md:pb-[20px] pt-[40px] md:pt-[60px]";
  const secondClass =
    "border-t md:border-t-0 md:border-r border-[#E4E4E4] px-[33px] pb-[40px] md:pb-[20px] pt-[40px] md:pt-[60px]";

  const thirdClass =
    "border-t md:border-t-0  border-[#E4E4E4] px-[33px] pb-[40px] md:pb-[20px] pt-[40px] md:pt-[60px]";

  return (
    <section className="pt-[95px] pb-[0]">
      <div className="container">
        <div className="grid md:grid-cols-3  border border-[#E4E4E4] hm-why-list">
          {data?.content?.aboutus_listing_id?.map((obj, index) => (
            <div
              key={index}
              className={
                index % 3 == 0
                  ? firstClass
                  : index % 3 == 1
                  ? secondClass
                  : index % 3 == 2
                  ? thirdClass
                  : ""
              }
            >
              {index % 2 != 0 && (
                <div className="overflow-hidden img-zoom hidden md:block  w-full  mx-auto mb-[25px]">
                  <Image
                    src={obj?.media_id?.file_path}
                    alt={obj?.media_id?.alt_text || obj?.title || `Who we are ${index + 1}`}
                    width={280}
                    height={186}
                    className="w-full"
                  />
                </div>
              )}
              <span className=" county-tag"> {obj?.title} </span>
              <p className=" mb-[78px] md:mb-[30px]">
                {obj?.short_description}
              </p>

              <div className="overflow-hidden img-zoom">
                <Image
                  src={obj?.media_id?.file_path}
                  alt={obj?.media_id?.alt_text || obj?.title || `Who we are ${index + 1}`}
                  width={177}
                  height={265}
                  className={`w-full  ${
                    index % 2 != 0 ? "mx-auto md:hidden " : ""
                  } `}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Aboutwho;
