import { useEffect, useState } from "react";
import Image from "next/image";
import Pros1 from "../../public/images/pros1.png";
import Pros2 from "../../public/images/pros2.png";
import Pros3 from "../../public/images/pros3.png";
import { LongArrowicon } from "../common/svgicon";
import Link from "next/link";

const Process = ({ prosTitle, procesList, ProsImg, ProsImgAlt }) => {
  return (
    <section className="home-process">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-[76px] md:gap-[20px] xl:gap-[76px]">
          <div className="pros_left">
            <Image src={ProsImg || Pros1} alt={ProsImgAlt || prosTitle || "Our process"} width={250} height={250} />
            <p> {prosTitle}</p>
          </div>

          <div className="pros_list_cntr">
            {procesList?.map((items, index) => (
              <Link key={index} href={`/${items?.url || "#"}`}>
                <div className="pros_list img-zoom">
                  <Image
                    src={items?.media_id?.file_path}
                    alt={items?.media_id?.alt_text || items?.title || `Process step ${index + 1}`}
                    width={272}
                    height={101}
                  />
                  <div className="flex items-center mt-[34px] gap-[15px]">
                    <p> {items?.title} </p>
                    <div className="shrink-0">
                      <LongArrowicon />
                    </div>

                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
