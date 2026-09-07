import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Ser1 from "../../public/images/serdet1.png";
import AuthDef from "../../public/images/author.jpg";
import {
  Bluecircleicon,
  CircleArrowicon,
  CurveLargeArrowicon,
  WhiteBtn,
} from "../common/svgicon";
import Noise from "../common/Noise";
import Link from "next/link";
import { HTMLParser } from "@/utils/HTMLParser";

const CommBanner = ({
  data,
  ButtonClick,
  title,
  discription,
  short_description,
  btntext,
  btnlink,
  bnrimg,
  Authimg
}) => {
  // console.log(data);
  return (
    <section className="ser-det-banner h-full  relative mb-[45px] inner-banner">
      <Image src={bnrimg || Ser1} alt={title || ""} width={1920} height={773} priority sizes="100vw" />

      <div className="absolute top-0 left-0 w-full h-full z-[2] flex items-end pb-[60px] com_bnr_cap">
        <div className="container relative z-[1]">
          <div className="">
            <div className="fade-up-anim"
              className=""
            >
              <div>
                {Authimg &&
                  <Image src={Authimg || AuthDef} alt={title || "Author"} width={150} height={150} className="h-full object-cover author-img" />
                }


                <h1 className="max-w-[770px] ">{title}</h1>
                {/* <CurveLargeArrowicon /> */}

                <div className="max-w-[800px] p">{HTMLParser((short_description || ""))}</div>

                {/* {
                  btntext &&
                  (
                    data?.buttonUrl ?  
                    <Link href={btnlink || "#"} ><WhiteBtn btn2text={btntext}/> </Link>
                    :
                    <a onClick={ButtonClick} ><WhiteBtn btn2text={btntext}/>  </a>
                  )
                  
                } */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommBanner;
