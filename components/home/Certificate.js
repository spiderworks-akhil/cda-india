import { useEffect, useState } from "react";
import Image from "next/image";
import Logo1 from "../../public/images/logo.svg";
import Logo2 from "../../public/images/cl1.png";
import Logo3 from "../../public/images/cl2.png";
import Logo4 from "../../public/images/cl3.png";
import Logo5 from "../../public/images/cl4.png";

import { LargeArrowicon, Lineicon, Medalicon } from "../common/svgicon";
import { motion } from "framer-motion";
import { HTMLParser } from "@/utils/HTMLParser";

const Certificate = ({
  certificatHead,
  certificatSubHead,
  certificatLogo,
  certificatLogoList,
}) => {
  const colors = ["#fff", "#111", "#ccc", "#333", "#666"];
  const [color, setColor] = useState(colors[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % colors.length;
      setColor(colors[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="home-cartificate"
      initial={{ y: 80 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        <div className='h3'>
          <div className='span'>{HTMLParser(certificatHead)}</div>{" "}
          <Medalicon />
        </div>
        <h5>{certificatSubHead}</h5>

        <div className="flex flex-col md:flex-row items-center justify-center mt-[50px]">
          <div className="client-logo flex items-center justify-center">
            <Image src={certificatLogo} alt={certificatHead || "Certifications"} width={445} height={350} />
          </div>

          <div className="client-line">
            <motion.svg
              animate={{ stroke: color }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              width="113"
              height="305"
              viewBox="0 0 113 305"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M113 304L83.0593 304C78.1805 304 74.2255 300.045 74.2255 295.166L74.2255 162.834C74.2255 157.955 70.2704 154 65.3916 154L-2.77762e-05 154"
                stroke={color}
                strokeWidth="0.478502"
              />
              <motion.path
                d="M-3.05176e-05 153L65.1498 153C70.0286 153 73.9837 149.045 73.9837 144.166L73.9837 9.83389C73.9837 4.95508 77.9387 1.00001 82.8176 1.00001L113 1.00001"
                stroke={color}
                strokeWidth="0.478502"
              />
              <motion.path
                d="M44 153.5H111.5"
                stroke={color}
                strokeWidth="0.55"
              />
            </motion.svg>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[30px]">
            {certificatLogoList?.map((item, index) => (
              <div key={index} className="client-logo-list">
                <Image
                  src={item?.media_id.file_path}
                  alt={item?.media_id?.alt_text || item?.title || item?.name || "Certification"}
                  width={180}
                  height={80}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Certificate;
