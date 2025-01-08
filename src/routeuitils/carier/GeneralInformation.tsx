import React from "react";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { v4 as uuidv4 } from "uuid";
import { useTranslate } from "../../context/TranslateContext";
import { DefaultMeta, MetaDataType } from "../../routes/Home";
import { HelmetTag } from "../../main";

interface GeneralInformationData {
  backgroundImage: string;
  title: string;
}

interface WhyEkolDataType {
  title: string;
  description: string;
  icon: string;
}

interface RecruitmentProcessType {
  order: string;
  title: string;
  description: string;
}

const GeneralInformation: React.FC = () => {
  const { translations } = useTranslate();

  // FETCH CAREER BACKGROUND TİTLE SECTİON DATA (general information image data)
  const selectedlang = useRecoilValue(SelectedLanguageState);

  const { data: careerOpportunitiesBackgroundData } = useQuery<GeneralInformationData>({
    queryKey: ["careerOpportunitiesBackgroundDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/careerOpportunitiesBackgroundForFront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  // FETCH CAREER WHY ECOL DATA
  const { data: whyEcolData } = useQuery<WhyEkolDataType[]>({
    queryKey: ["whyEcolDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/whyecolfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  // FETCH CAREER RECRUİTMENT PROCESS
  const { data: recruitmentData } = useQuery<RecruitmentProcessType[]>({
    queryKey: ["recruitmentDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/recruitmentprocessfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  const { data: MetaData } = useQuery<MetaDataType>({
    queryKey: ['meta_karyeramelumat_key', selectedlang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-karyeraimkanlariumumimelumat-front`, {
        headers: {
          "Accept-Language": selectedlang,
        }
      });
      return res.data[0];
    }
  });
  const hasMeta: MetaDataType = MetaData && Object.values(MetaData)?.length > 0 ? MetaData : DefaultMeta;


  return (
    <section className="general-information">
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{hasMeta?.meta_title}</title>
        <meta name="title" content={hasMeta?.meta_title} />
        <meta name="description" content={hasMeta?.meta_description} />
        <meta name="generator" content={hasMeta?.meta_generator} />
        <meta name="author" content={hasMeta?.meta_author} />
      </HelmetTag>
      {careerOpportunitiesBackgroundData && Object.values(careerOpportunitiesBackgroundData).length > 0
        ? Object.values(careerOpportunitiesBackgroundData).map((item: GeneralInformationData) => (
          <div key={uuidv4()} className="wrapper-image-general">
            <img src={`https://ekol-server-1.onrender.com${item?.backgroundImage}`} alt={`${uuidv4()}-image`} />
            <h4>{item?.title}</h4>
          </div>
        ))
        : ""}

      <div className="why-ekol-section">
        <h2>{translations["niye_ekol"]}</h2>

        <div className="grid-ekol-item">
          {whyEcolData && whyEcolData.length > 0
            ? whyEcolData.map((item: WhyEkolDataType) => (
              <div className="item" key={uuidv4()}>
                <div className="icon-mini">
                  <img src={`https://ekol-server-1.onrender.com${item?.icon}`} alt={`${uuidv4()}-icon`} title={item?.title} />
                </div>
                <strong>{item?.title}</strong>
                <p>{item?.description}</p>
              </div>
            ))
            : ""}
        </div>
      </div>

      <div className="recruitment-process">
        <h4>{translations["ise_qebul_prosesi"]}</h4>

        <div className="process">
          {recruitmentData && recruitmentData.length > 0
            ? recruitmentData.map((item: RecruitmentProcessType) => (
              <div key={uuidv4()} className="process-item">
                <div className="order-number">
                  <span>{item?.order}</span>
                </div>
                <h5>{item?.title}</h5>
                <p>{item?.description}</p>
              </div>
            ))
            : ""}
        </div>
      </div>
    </section>
  );
};

export default GeneralInformation;
