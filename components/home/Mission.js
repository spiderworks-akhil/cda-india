import { useEffect, useRef } from "react";
import Image from "next/image";
import Miss1 from "../../public/images/miss1.png";
import { LargeArrowicon } from "../common/svgicon";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Squares from "../common/square";
import Link from "next/link";
import { HTMLParser } from "@/utils/HTMLParser";

gsap.registerPlugin(ScrollTrigger);

const Mission = ({
  misstitle_1,
  missdescription_1,
  misstitle_2,
  missdescription_2,
  maintitle,
  shorttitle,
  MisImg,
  MisImgAlt
}) => {
  const missionRef = useRef();
  const visionRef = useRef();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements = [missionRef.current, visionRef.current].filter(Boolean);
    const originals = elements.map((el) => el.textContent);
    const tweens = [];

    if (!reduceMotion) {
      elements.forEach((textElement) => {
        const characters = textElement.textContent.split("");
        textElement.innerHTML = ""; // Clear existing text

        characters.forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          textElement.appendChild(span);
        });

        tweens.push(
          gsap.to(textElement.children, {
            color: "#000",
            duration: 0.5,
            scrollTrigger: {
              trigger: textElement,
              start: "top 40%",
              end: "bottom 40%",
              scrub: true,
            },
            stagger: {
              each: 0.3,
              from: "start",
            },
          })
        );
      });
    }

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });

      // Drop the per character spans so a re-run splits clean text instead of
      // stacking spans inside spans.
      elements.forEach((el, i) => {
        el.textContent = originals[i];
      });
    };
  }, [missdescription_1, missdescription_2]);

  return (
    <section className="home-mission" data-aos="fade-up">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-[40px] xl:gap-[83px]">
          <div className="miss_bg">
            <Squares
              speed={0.5}
              squareSize={30}
              direction="diagonal"
              borderColor="rgba(200, 200, 200, 0.36)"
              hoverFillColor="#222"
            />
            <div className="relative z-[1] flex flex-col justify-between h-full">
              <div>
                <h6> {maintitle || "Why CDA"} </h6>
                <div className='span'>{HTMLParser(shorttitle || "<b>100%</b> Corporate Finance Solutions")}</div>
              </div>
              {
                MisImg &&
                <Image
                  src={MisImg}
                  alt={MisImgAlt || maintitle || "Why CDA"}
                  width={445}
                  height={350}
                  className="w-full max-w-[445px] h-auto object-contain mx-auto"
                />
              }
            </div>

            <div className="absolute right-[30px] bottom-[30px] cursor-pointer z-[2] mission-arrow">
              <Link href={`/why-cda`} aria-label="Why choose CDA">
                <LargeArrowicon />
              </Link>
            </div>
          </div>

          <div className="w-full mt-[40px] lg:mt-0">
            <div className="mb-[40px] sm:mb-[60px] lg:mb-[114px]">
              <h5> {misstitle_1} </h5>
              <p ref={missionRef}>{missdescription_1}</p>
            </div>

            <div>
              <h5> {misstitle_2} </h5>
              <p ref={visionRef}> {missdescription_2}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
