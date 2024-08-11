import React, { useMemo, useCallback } from "react";
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

export type ServicesContentType = {
  title: string;
  description: string;
  image: string;
};

const ServicesActivity: React.FC = () => {
  const selectedLang = useRecoilValue(SelectedLanguageState);

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

  const [selectedService, setSelectedService] = React.useState<number>(0);

  // Handle service selection
  const handleSelectService = useCallback((i: number) => {
    setSelectedService(i);
  }, []);

  // Determine if there is service data available
  const hasServicesData = useMemo(() => servicesPageData && servicesPageData.length > 0, [servicesPageData]);

  // Get service image for the selected service
  const serviceImage = useMemo(() => {
    if (hasServicesData && servicesPageData && servicesPageData.length > selectedService) {
      return servicesPageData && servicesPageData[selectedService]?.image;
    }
    return "";
  }, [selectedService, hasServicesData, servicesPageData]);

  // Get sanitized service description for the selected service
  const serviceDescription = useMemo(() => {
    if (hasServicesData && servicesPageData && servicesPageData.length > selectedService) {
      return DOMPurify.sanitize(servicesPageData[selectedService]?.description || "");
    }
    return "";
  }, [selectedService, hasServicesData, servicesPageData]);

  return (
    <section className="servicesActivity-section">
      <div className="servicesActivity">
        <Breadcrumb prevpage="Ana səhifə" uri="Xidmətlər" />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="container-servicesActivity">
            <h2>Xidmətlər</h2>
            <div className="container-services">
              <div className="service-items">
                <div className="service-image-container">
                  {hasServicesData && serviceImage && (
                    <img
                      src={`http://localhost:3000${serviceImage}`}
                      alt={`service-${selectedService}-image`}
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="navigator-content">
                  <Swiper
                    spaceBetween={12}
                    slidesPerView={4.5}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper">
                    {hasServicesData &&
                      servicesPageData?.map((item, i) => (
                        <SwiperSlide
                          className={selectedService === i ? "actived" : ""}
                          key={item.title}
                          onClick={() => handleSelectService(i)}>
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
