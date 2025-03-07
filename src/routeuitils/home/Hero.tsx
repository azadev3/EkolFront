import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Header from "../../components/header/Header";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader";

export interface SocialsType {
  _id: string;
  icon: string;
  link: string;
}

interface HeroDataType {
  _id: string;
  title: string;
  description: string;
  image: string;
  mobileImage: string;
}

const Hero: React.FC = () => {
  const selectedlang = useRecoilValue(SelectedLanguageState);

  const [mobile, setMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const resizeMobile = () => {
      if (window.innerWidth <= 568) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }

    resizeMobile();
    window.addEventListener("resize", resizeMobile);
    return () => window.removeEventListener("resize", resizeMobile);
  }, []);

  //hero
  const {
    data: heroData,
    isLoading,
    isError,
    error,
  } = useQuery<HeroDataType[]>({
    queryKey: ["heroDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/herofront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 9000000,
  });

  const hasHero = heroData && heroData?.length > 0;

  //prev - next swiper button clicked
  const swiperRef = React.useRef<any>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current?.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current?.slideNext();
    }
  };

  return (
    <section className="hero-wrapper">
      <div className="hero">
        <Header />
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <p className="error-msg">
            Bir xəta baş verdi. Səhifəni yeniləyib təkrar yoxlayın.
            <strong>Error: {error && error.message ? error.message : ""}</strong>
          </p>
        ) : (
          <Swiper
            // autoplay={{
            //   delay: 1500,
            //   pauseOnMouseEnter: false,
            // }}
            loop={true}
            // speed={1000}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper">
            {hasHero
              ? heroData.map((item: HeroDataType, index: number) => (
                <SwiperSlide key={index}>
                  <img
                    src={
                      mobile ? `https://ekol-server-1.onrender.com${item?.mobileImage}` : `https://ekol-server-1.onrender.com${item?.image}`
                    }
                    alt={`${item?._id}-image`}
                    loading="lazy"
                  />
                  <div className="slide-content">
                    <div className="left">
                      <h1 style={{ display: item?.title === '' || item?.title === null ? 'none' : '' }}>{item?.title}</h1>
                      <p style={{ display: item?.description === '' || item?.description === null ? 'none' : '' }}>{item?.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))
              : ""}

            <div className="buttons">
              <button className="swiper-prev" onClick={handlePrev}>
                <img src="../prevwhite.svg" alt="prev" />
              </button>
              <button className="swiper-next" onClick={handleNext}>
                <img src="../prevnext.svg" alt="next" />
              </button>
            </div>
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Hero;
