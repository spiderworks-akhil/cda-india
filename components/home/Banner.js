import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import BannerIcon from "../../public/images/bannericon.png";
import { CircleArrowicon } from "../common/svgicon";
import Link from "next/link";
import { HTMLParser } from "@/utils/HTMLParser";

// Updated GradualSpacing: full line fade-in
// Rendered as a plain <h1> so the page's main heading is visible in the
// server HTML (and without JavaScript); the entrance is a CSS animation.
const GradualSpacing = ({ text }) => {
  return <h1 className="text-center fade-up-anim">{text}</h1>;
};

const Banner = ({ data }) => {
  const containerRef = useRef(null);

  // Scroll progress for video parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], ["0px", "200px"]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.classList.add("ready");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={containerRef} className="banner-sec">
      <div className="banner-cap">
        <div className="container">
          <div className="max-w-[672px] mx-auto flex flex-col items-center justify-center gap-[15px]">
            <GradualSpacing text={data?.content?.title_1 || ""} />

            <div>{HTMLParser(data?.content?.description_1)}</div>

            <Link
              href={`/contact-us`}
              className="btn flex items-center gap-[12px]"
            >
              <span>{data?.content?.button_text_1}</span>
              <CircleArrowicon />
            </Link>
          </div>

          <hr />

          <div className="flex items-center justify-center md:justify-between">
            <div className="circle-img relative">
              <Image src={BannerIcon} alt="" priority width={74} height={74} />
              <svg
                className="absolute left-[50%] top-[50%] circle-img-arrow"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="15"
                viewBox="0 0 18 15"
                fill="none"
              >
                <path
                  d="M8.19704 13.829C8.63053 14.2625 9.33334 14.2625 9.76682 13.829L16.8308 6.76501C17.2643 6.33153 17.2643 5.62872 16.8308 5.19523C16.3973 4.76175 15.6945 4.76175 15.261 5.19523L8.98193 11.4743L2.70282 5.19523C2.26934 4.76175 1.56653 4.76175 1.13305 5.19523C0.699566 5.62872 0.699566 6.33153 1.13305 6.76501L8.19704 13.829ZM7.87193 0.312561L7.87193 13.0441L10.0919 13.0441L10.0919 0.312561L7.87193 0.312561Z"
                  fill="white"
                />
              </svg>
            </div>

            <div
              className="hidden md:block">{HTMLParser(data?.content?.short_description)}</div>
          </div>
        </div>
      </div>

      <motion.video
        src={ data?.content?.media_id_1?.file_path ||"/videos/banner.mp4"}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{ y: translateY }}
      />
    </section>
  );
};

export default Banner;
