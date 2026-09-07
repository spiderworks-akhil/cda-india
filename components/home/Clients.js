import Image from "next/image";
import Link from "next/link";

import { CircleArrowicon } from "../common/svgicon";
import { HTMLParser } from "@/utils/HTMLParser";


const Ourclients = ({ data }) => {

  return (
    <>
      {
        data?.content?.our_exceptional_clients_listing_id?.length > 0 &&

        <section className="home-clients" data-aos="fade-up">
          <div className="container">
            <div className='h3'>{HTMLParser(data?.content?.title)}</div>

            <div className="flex flex-col md:flex-row items-center gap-[30px] rounded-[12px] overflow-hidden border border-[#E5E5E5] mt-[27px]">
              <div className="clients_left">
                <div className="clients_left_cap">
                  <h4>{data?.content?.short_description}</h4>
                  <Link
                    href={data?.content?.btn_link || "#"}
                    className="btn flex items-center justify-between gap-[20px]"
                  >
                    {data?.content?.btn_text} <CircleArrowicon />
                  </Link>
                </div>
                <Image
                  src={data?.content?.media_id_10?.file_path}
                  alt={data?.content?.media_id_10?.alt_text || "Our exceptional clients"}
                  width={560}
                  height={530}
                />
              </div>

              <div className="clients_right w-full">
                <div className="px-2 lg:px-4 grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[15px] lg:gap-[25px] xl:gap-[45px]">
                  {data?.content?.our_exceptional_clients_listing_id?.map(
                    (client, index) => (
                      <div className="clients_list" key={index}>
                        <Image
                          src={client?.media_id?.file_path}
                          alt={client?.media_id?.alt_text || client?.title || `Client logo ${index + 1}`}
                          width={80}
                          height={35}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  );
};

export default Ourclients;
