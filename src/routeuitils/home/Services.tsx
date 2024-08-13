import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useTranslate } from "../../context/TranslateContext";

type ServicesDataType = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const Services: React.FC = () => {
  const selectedlang = useRecoilValue(SelectedLanguageState);

  //services
  const { data: servicesData } = useQuery<ServicesDataType[]>({
    queryKey: ["servicesDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/servicespagefront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 9000000,
  });

  //swiper button prev and next funcitons with custom
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

  const { translations } = useTranslate();
  
  return (
    <section className="services-section">
      <div className="services">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          direction={"vertical"}
          pagination={{
            clickable: true,
          }}
          className="mySwiper">
          {servicesData && servicesData.length > 0
            ? servicesData.map((item: ServicesDataType, index: number) => (
                <SwiperSlide key={index}>
                  <div className="button-swiper">
                    <button className="prev" onClick={handlePrev}>
                      <img src="/prev.svg" alt="prev-slide-button" title="Əvvəlki" />
                    </button>
                    <button className="next" onClick={handleNext}>
                      <img src="/next.svg" alt="next-slide-button" title="Sonrakı" />
                    </button>
                  </div>
                  <div className="left">
                    <h3>{item?.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description) }}/>
                    <Link to={`/fealiyyet/xidmetler/${item?.title}`} className="show-more">
                    {translations['etrafli_bax_button']}
                    </Link>
                  </div>
                  {item?.image && (
                    <div className="right">
                      <img src={`https://ekol-server-1.onrender.com${item?.image}`} alt={`${item?.id}-image`} title={item?.title} />
                    </div>
                  )}
                </SwiperSlide>
              ))
            : ""}
        </Swiper>
      </div>
    </section>
  );
};

export default Services;
