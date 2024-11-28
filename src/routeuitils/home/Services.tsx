import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useTranslate } from "../../context/TranslateContext";
import { Autoplay, Pagination } from "swiper/modules";
import { IsClickedServiceState } from "../activity/ServicesPage";
import { ServicesContentType } from "../activity/ServicesActivity";

const Services: React.FC = () => {
  const selectedlang = useRecoilValue(SelectedLanguageState);

  //services

  const { data: servicesPageData } = useQuery<ServicesContentType[]>({
    queryKey: ["servicesPageDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/servicespagefront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
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

  const [_, setSelectedServiceID] = useRecoilState(IsClickedServiceState);

  const { translations } = useTranslate();

  const hasServicesPageData = servicesPageData && servicesPageData?.length > 0;

  const navigate = useNavigate();

  return (
    <section className="services-section">
      <div className="services">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          direction={"horizontal"}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper">
          {hasServicesPageData
            ? servicesPageData.map((item: ServicesContentType, index: number) => (
                <SwiperSlide key={index}>
                  <div className="left">
                    <h3>{item?.title}</h3>
                    <p>{item?.slogan}</p>
                    <div
                      onClick={() => {
                        navigate(`/fealiyyet/xidmetler/${item?._id}`);
                        setSelectedServiceID(item?._id);
                      }}
                      className="show-more">
                      {translations["etrafli_bax_button"]}
                    </div>
                  </div>
                  {item?.image && (
                    <div className="right">
                      <img
                        src={`https://ekol-server-1.onrender.com${item?.image}`}
                        alt={`${item?._id}-image`}
                        title={item?.title}
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))
            : ""}
        </Swiper>
        <div className="button-swiper">
          <button className="prev" onClick={handlePrev}>
            <img src="/lefet.svg" alt="prev-slide-button" title="Əvvəlki" />
          </button>
          <button className="next" onClick={handleNext}>
            <img src="/righet.svg" alt="next-slide-button" title="Sonrakı" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
