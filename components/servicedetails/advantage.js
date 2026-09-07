import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { BlueBtn, Eye2icon, Eyeicon } from "../common/svgicon";
import Popup from "../common/Popup";
import { HTMLParser } from "@/utils/HTMLParser";


const ToggleItem = ({ capt, title, text, isOpen, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="account_list"
    >
      <div className="flex items-center gap-[30px] w-full">
        <span className="avd-item-index" >{capt}</span>
        <div className="w-full">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={onClick}
          >
            <h3>{title}</h3>
            {isOpen ? <Eye2icon /> : <Eyeicon />}
          </div>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="content"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: "hidden" }}
              >
                <p>{text}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const SerDetAdvantage = ({ data }) => {

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  return (
    data?.services_key_advantages?.length > 0 && (
      <>
        {isPopupOpen && (
          <Popup
            isOpen={isPopupOpen}
            onClose={() => setPopupOpen(false)}
            service={{ id: data?.id, title: data?.title }}
            leadSource='Service Detail - Key Advantages'
          />
        )}

        <section className="ser-det-advantage pt-[50px]">
          <div className="container relative z-[1]">
            <h2 className="h2 max-w-[425px]">
              {HTMLParser(data?.content?.title_3)}
            </h2>

            <div className="advantage_bg">
              <div className="md:flex">
                <div className="w-full max-w-[720px] advantage_left">
                  <div className="w-full advantage_left_scroll flex flex-col gap-[28px]">
                    {data?.services_key_advantages?.map((items, index) => (
                      <ToggleItem
                        key={index}
                        capt={index + 1}
                        title={items?.title}
                        text={items?.short_description}
                        isOpen={openIndex === index}
                        onClick={() =>
                          setOpenIndex(openIndex === index ? null : index)
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="advantage_right w-full">
                  <div className="max-w-[285px] ml-auto mr-auto h-full flex flex-col items-center justify-between">
                    <div className="mb-[25px]">
                      <h4>{data?.static_page_content?.title_4}</h4>
                      <h5>{data?.static_page_content?.short_description}</h5>
                      <div
                        className="flex items-center w-full justify-center cursor-pointer"
                        onClick={() => setPopupOpen(true)}
                      >
                        <BlueBtn
                          btntext={data?.static_page_content?.button_text_4}
                        />
                      </div>
                    </div>

                    <Image
                      src={data?.static_page_content?.media?.file_path}
                      alt={data?.static_page_content?.media?.alt_text || data?.title || ""}
                      width={447}
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default SerDetAdvantage;
