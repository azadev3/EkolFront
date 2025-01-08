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
import { useTranslate } from "../../context/TranslateContext";
import { DefaultMeta, MetaDataType } from "../../routes/Home";
import { HelmetTag } from "../../main";

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
      return response.data;
    },
    staleTime: 1000000,
  });

  const hasCarouselData = SocialLifeCarouselData && SocialLifeCarouselData?.length > 0;
  const hasSocialLifeData = socialLifeData && socialLifeData?.length > 0;

  const { translations } = useTranslate();


  const { data: MetaData } = useQuery<MetaDataType>({
    queryKey: ['meta_sociallife_key', selectedLang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-sosialheyat-front`, {
        headers: {
          "Accept-Language": selectedLang,
        }
      });
      return res.data[0];
    }
  });

  const hasMeta: MetaDataType = MetaData && Object.values(MetaData)?.length > 0 ? MetaData : DefaultMeta;


  return (
    <section className="social-life-section">
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{hasMeta?.meta_title}</title>
        <meta name="title" content={hasMeta?.meta_title} />
        <meta name="description" content={hasMeta?.meta_description} />
        <meta name="generator" content={hasMeta?.meta_generator} />
        <meta name="author" content={hasMeta?.meta_author} />
      </HelmetTag>
      <div className="sociallife">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['nav_haqqimizda_sosialheyat']} />

        <div className="container-sociallife">
          <h2>{translations['nav_haqqimizda_sosialheyat']}</h2>

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
                        <img src={`https://ekol-server-1.onrender.com${item?.image}`} alt={`${i}-image`} title={item?.title} />
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
