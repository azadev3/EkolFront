import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import { useTranslate } from "../../context/TranslateContext";
import { DefaultMeta, MetaDataType } from "../../routes/Home";
import { HelmetTag } from "../../main";

export const LeadershipModalState = atom<string>({
  key: "leadershipModalState",
  default: "",
});

export interface Management {
  _id: string;
  profile: string;
  nameSurname: string;
  job: string;
  description: string,
  education: string,
}

const Leadership: React.FC = () => {
  const selectedlang = useRecoilValue(SelectedLanguageState);

  const { data: managementData, isLoading: managementLoading } = useQuery({
    queryKey: ["managementDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/managementfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  //leadership modal
  const [_, setLeadershipModal] = useRecoilState(LeadershipModalState);

  const handleLeadershipModal = (_id: string) => {
    setLeadershipModal(_id);
  }

  const { translations } = useTranslate();

  const { data: MetaData } = useQuery<MetaDataType>({
    queryKey: ['meta_rehberlik_key', selectedlang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-rehberlik-front`, {
        headers: {
          "Accept-Language": selectedlang,
        }
      });
      return res.data[0];
    }
  });
  const hasMeta: MetaDataType = MetaData && Object.values(MetaData)?.length > 0 ? MetaData : DefaultMeta;


  return (
    <section className="leadership-section">
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{hasMeta?.meta_title}</title>
        <meta name="title" content={hasMeta?.meta_title} />
        <meta name="description" content={hasMeta?.meta_description} />
        <meta name="generator" content={hasMeta?.meta_generator} />
        <meta name="author" content={hasMeta?.meta_author} />
      </HelmetTag>
      <div className="leadership">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['nav_haqqimizda_rehberlik']} />

        {managementLoading ? (
          <Loader />
        ) : (
          <div className="container-leadership">
            <h2>{translations['nav_haqqimizda_rehberlik']}</h2>

            <div className="grid-leadership">
              {managementData && managementData.length > 0
                ? managementData.map((item: Management, index: number) => (
                  <article key={index} className="leadership-grid-item"
                    onClick={() => handleLeadershipModal(item?._id)}
                  >
                    <div className="profile">
                      <img
                        src={`https://ekol-server-1.onrender.com${item?.profile}`}
                        alt={`${item?._id}-profile`}
                        title={item?.nameSurname}
                      />
                    </div>
                    <div className="name-and-surname-and-job">
                      <strong>{item?.nameSurname}</strong>
                      <span>{item?.job}</span>
                    </div>
                  </article>
                ))
                : ""}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Leadership;
