import React, { useMemo, useCallback, useEffect } from "react";
import Breadcrumb from "../../Breadcrumb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import DOMPurify from "dompurify";
import Loader from "../../Loader";
import { useTranslate } from "../../context/TranslateContext";
import { useParams } from "react-router-dom";
import { IsClickedServiceState } from "./ServicesPage";

export type ServicesContentType = {
  _id: string;
  title: string;
  description: string;
  image: string;
};

const ServicesActivity: React.FC = () => {
  const { innerserviceid } = useParams<{ innerserviceid: string }>();
  const selectedLang = useRecoilValue(SelectedLanguageState);

  const selectedServiceID = useRecoilValue(IsClickedServiceState);

  // Fetch services page data
  const { data: servicesPageData, isLoading } = useQuery<ServicesContentType[]>({
    queryKey: ["servicesPageDataKey", selectedLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/servicespagefront`, {
        headers: {
          "Accept-Language": selectedLang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  const [selectedService, setSelectedService] = React.useState<string>("");
  const [selectedServiceTwo, setSelectedServiceTwo] = React.useState<string>("");

  // Handle service selection
  const handleSelectService = useCallback((id: string) => {
    setSelectedService(id);
  }, []);

  useEffect(() => {
    if (servicesPageData) {
      if (innerserviceid) {
        const serviceIndex = servicesPageData.find(
          (service: ServicesContentType) => service._id === innerserviceid
        )?._id;
        if (serviceIndex) {
          setSelectedService(serviceIndex);
        }
      } else if (selectedServiceID) {
        const serviceIndex = servicesPageData
          ? servicesPageData.find((service: ServicesContentType) => service._id === selectedServiceID)?._id
          : "";
        if (serviceIndex) {
          setSelectedServiceTwo(serviceIndex);
        }
      }
    }
  }, [servicesPageData, innerserviceid, selectedServiceID]);

  // Determine if there is service data available
  const hasServicesData = useMemo(() => servicesPageData && servicesPageData.length > 0, [servicesPageData]);

  // Get service image for the selected service
  const serviceImage = useMemo(() => {
    if (hasServicesData && selectedService) {
      const selectedServiceData = servicesPageData?.find((service) => service._id === selectedService);
      return selectedServiceData ? selectedServiceData.image : "";
    }
    return "";
  }, [selectedService, hasServicesData, servicesPageData]);

  // Get sanitized service description for the selected service
  const serviceDescription = useMemo(() => {
    if (hasServicesData && selectedService) {
      const selectedServiceData = servicesPageData?.find((service) => service._id === selectedService);
      return selectedServiceData ? DOMPurify.sanitize(selectedServiceData.description) : "";
    }
    return "";
  }, [selectedService, hasServicesData, servicesPageData]);

  const { translations } = useTranslate();

  const [my_swiper, set_my_swiper] = React.useState<any>();

  return (
    <section className="servicesActivity-section">
      <div className="servicesActivity">
        <Breadcrumb prevpage={translations["nav_anasehife"]} uri={translations["nav_haqqimizda_xidmetler"]} />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="container-servicesActivity">
            <h2>{translations["xidmetler_title"]}</h2>
            <div className="container-services">
              <div className="service-items">
                <div className="service-image-container">
                  {hasServicesData &&
                    serviceImage &&
                    (serviceImage?.length === 0 ? (
                      <Loader />
                    ) : (
                      <img
                        src={`https://ekol-server-1.onrender.com${serviceImage}`}
                        alt={`service-${selectedService}-image`}
                        loading="lazy"
                      />
                    ))}
                </div>

                <div className="navigator-content">
                  <Swiper
                    onInit={(ev) => {
                      set_my_swiper(ev);
                    }}
                    spaceBetween={12}
                    slidesPerView={4.5}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    breakpoints={{
                      268: {
                        slidesPerView: 1.2,
                      },
                      568: {
                        slidesPerView: 2.3,
                      },
                      968: {
                        slidesPerView: 4.5,
                      },
                    }}>
                    {hasServicesData &&
                      servicesPageData?.map((item) => (
                        <SwiperSlide
                          className={selectedService === item?._id || selectedServiceTwo === item?._id ? "actived" : ""}
                          key={item._id}
                          onClick={() => {
                            handleSelectService(item?._id);
                            my_swiper?.slideNext();
                          }}>
                          <span>{item.title}</span>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>

                <div className="content">
                  <div dangerouslySetInnerHTML={{ __html: serviceDescription }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesActivity;
