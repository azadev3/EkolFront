import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import Loader from "../../Loader";
import { useTranslate } from "../../context/TranslateContext";
import { DefaultMeta, MetaDataType } from "../../routes/Home";
import { HelmetTag } from "../../main";

type WhoWeAreType = {
  _id: string;
  title: string;
  description: string;
  image: string;
};

const WhoWeAre: React.FC = () => {

  const { translations } = useTranslate();

  const selectedlang = useRecoilValue(SelectedLanguageState);

  const { data: WhoWeAreData, isLoading: WhoWeAreLoading } = useQuery({
    queryKey: ["whoAreWeData", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/whoarewefront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });


  const { data: MetaData } = useQuery<MetaDataType>({
    queryKey: ['meta_bizkimik_key', selectedlang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-bizkimik-front`, {
        headers: {
          "Accept-Language": selectedlang,
        }
      });
      return res.data[0];
    }
  });
  
  const hasMeta: MetaDataType = MetaData && Object.values(MetaData)?.length > 0 ? MetaData : DefaultMeta;

  if (WhoWeAreLoading) {
    return <Loader />;
  }

  return (
    <section className="who-we-are-section">
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{hasMeta?.meta_title}</title>
        <meta name="title" content={hasMeta?.meta_title} />
        <meta name="description" content={hasMeta?.meta_description} />
        <meta name="generator" content={hasMeta?.meta_generator} />
        <meta name="author" content={hasMeta?.meta_author} />
      </HelmetTag>
      <div className="whoweare">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['nav_haqqimizda_bizkimik']} />

        {WhoWeAreData && WhoWeAreData.length > 0
          ? WhoWeAreData.map((item: WhoWeAreType, index: number) => (
            <div className="container-whoweare" key={index}>
              <h2>{item?.title}</h2>

              <div className="image-container">
                <img src={`https://ekol-server-1.onrender.com${item?.image}`} alt={`${item?._id}-img`} title={item?.title} />
              </div>

              <div className="description-container" dangerouslySetInnerHTML={{ __html: item?.description }} />
            </div>
          ))
          : ""}
      </div>
    </section>
  );
};

export default WhoWeAre;
