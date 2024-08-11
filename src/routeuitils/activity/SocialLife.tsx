import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import Loader from "../../Loader";
import DOMPurify from "dompurify";

type SocialLifeCarouselDataType = {
  _id: string;
  title: string;
  image: string;
};
type SocialLifeDescriptionType = {
  _id: string;
  description: string;
};

const SocialLife: React.FC = () => {
  const selectedLang = useRecoilValue(SelectedLanguageState);

  //fetch carousel data
  const { data: SocialLifeCarouselData, isLoading } = useQuery<SocialLifeCarouselDataType[]>({
    queryKey: ["socialLifeCarouselDataKey", selectedLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/sociallifecarouselfront`, {
        headers: {
          "Accept-Language": selectedLang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  //fetch other social life data
  const { data: socialLifeData, isLoading: isLoadingSocialLife } = useQuery<SocialLifeDescriptionType[]>({
    queryKey: ["socialLifeDataKey", selectedLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/sociallifefront`, {
        headers: {
          "Accept-Language": selectedLang,
        },
      });
      console.log(response.data, "dsss");
      return response.data;
    },
    staleTime: 1000000,
  });

  const hasCarouselData = SocialLifeCarouselData && SocialLifeCarouselData?.length > 0;
  const hasSocialLifeData = socialLifeData && socialLifeData?.length > 0;


  return (
    <section className="social-life-section">
      <div className="sociallife">
        <Breadcrumb prevpage="Ana səhifə" uri="Sosial həyat" />

        <div className="container-sociallife">
          <h2>Sosial həyat</h2>

          <div className="container-descriptions">
            <div className="wrapperimg-carousel">
              <Swiper
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper">
                {hasCarouselData
                  ? SocialLifeCarouselData.map((item: SocialLifeCarouselDataType, i: number) =>
                      isLoading ? (
                        <Loader />
                      ) : (
                        <SwiperSlide key={item._id}>
                          <img src={`http://localhost:3000${item?.image}`} alt={`${i}-image`} title={item?.title} />
                          <h5>{item?.title}</h5>
                        </SwiperSlide>
                      )
                    )
                  : ""}
              </Swiper>
            </div>

            {isLoadingSocialLife ? (
              <Loader />
            ) : (
              <div className="spor">
                {hasSocialLifeData
                  ? socialLifeData?.map((item: SocialLifeDescriptionType) => (
                      <div
                        className="descriptions-spor"
                        key={item?._id}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description) }}
                      />
                    ))
                  : ""}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialLife;
