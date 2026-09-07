import { useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import Noise from "../../components/common/Noise";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = ({ data }) => {
  // The testimonials come in as a prop from the page's getStaticProps /
  // getServerSideProps. Fetching them from the browser instead would hit the
  // API cross origin and be blocked by CORS.
  const videosTests = useMemo(
    () =>
      data?.filter((item) => item?.comment_type === "Video from Computer") ?? [],
    [data]
  );

  // With loop enabled Swiper clones slides, so every clone would otherwise be
  // decoding its own copy of the video at the same time. Keep only the slides
  // actually on screen playing.
  const syncVideos = useCallback((swiper) => {
    swiper?.slides?.forEach((slide) => {
      const video = slide.querySelector("video");
      if (!video) return;

      if (slide.classList.contains("swiper-slide-visible")) {
        const played = video.play();
        if (played?.catch) played.catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    });
  }, []);

  // Nothing decodes while the slider is mid transition - that is where the
  // dropped frames were most obvious on mobile.
  const pauseAll = useCallback((swiper) => {
    swiper?.slides?.forEach((slide) => {
      const video = slide.querySelector("video");
      if (video && !video.paused) video.pause();
    });
  }, []);

  if (videosTests.length === 0) return null;

  return (
    <motion.section
      className="home-testimonials"
      initial={{ y: 60 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <Noise
        patternSize={250}
        patternScaleX={1}
        patternScaleY={1}
        patternRefreshInterval={4}
        patternAlpha={15}
      />

      <div className="container">
        <h3>Voices of Trust And Satisfaction</h3>

        <div>
          <Swiper
            slidesPerView={1.5}
            spaceBetween={30}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            watchSlidesProgress={true}
            threshold={5}
            pagination={{ clickable: true }}
            navigation={true}
            speed={600}
            modules={[Pagination, Navigation]}
            onSwiper={syncVideos}
            onSlideChangeTransitionStart={pauseAll}
            onSlideChangeTransitionEnd={syncVideos}
            className="custom-swiper"
          >
            {videosTests.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="vid_prv_cntr">
                  <div>
                    <video
                      src={item?.video?.file_path}
                      loop
                      muted
                      playsInline
                      preload="none"
                    />
                    <h4>{item?.name}</h4>
                    <p>{item?.designation}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
