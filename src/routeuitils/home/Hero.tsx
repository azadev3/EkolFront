import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { useRecoilValue } from "recoil";
import { ScrollHeaderState, SelectedLanguageState } from "../../recoil/Atoms";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader";
import ScrollHeader from "../../components/header/ScrollHeader";

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
}

const Hero: React.FC = () => {
  const selectedlang = useRecoilValue(SelectedLanguageState);

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

  //socials
  const { data: SocialsData } = useQuery({
    queryKey: ["socialData"],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/socialsfront`);
      console.log(response.data, "socaisl");
      return response.data;
    },
    staleTime: 9000000,
  });

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

  const scrollHeader = useRecoilValue(ScrollHeaderState);

  return (
    <section className="hero-wrapper">
      <div className="hero">
        {scrollHeader ? <ScrollHeader /> : <Header />}
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <p className="error-msg">
            Bir xəta baş verdi. Səhifəni yeniləyib təkrar yoxlayın.
            <strong>Error: {error && error.message ? error.message : ""}</strong>
          </p>
        ) : (
          <Swiper
            autoplay={{
              delay: 1500,
              pauseOnMouseEnter: true,
            }}
            speed={3000}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper">
            {hasHero
              ? heroData.map((item: HeroDataType, index: number) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`https://ekol-server-1.onrender.com${item?.image}`}
                      alt={`${item?._id}-image`}
                      loading="lazy"
                    />
                    <div className="slide-content">
                      <div className="left">
                        <h1>{item?.title}</h1>
                        <p>{item?.description}</p>
                        <div className="buttons">
                          <button className="swiper-prev" onClick={handlePrev}>
                            <img src="../prevwhite.svg" alt="prev" />
                          </button>
                          <button className="swiper-next" onClick={handleNext}>
                            <img src="../prevnext.svg" alt="next" />
                          </button>
                        </div>
                      </div>

                      <div className="right-socials">
                        {SocialsData && SocialsData.length > 0
                          ? SocialsData.map((item: SocialsType) => (
                              <Link key={item?._id} to={item?.link} className="icon">
                                <img
                                  src={`https://ekol-server-1.onrender.com${item?.icon}`}
                                  alt={`${item?._id}-icon`}
                                  title={item?.link}
                                />
                              </Link>
                            ))
                          : ""}
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              : ""}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Hero;
