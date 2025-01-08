import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { useTranslate } from "../../context/TranslateContext";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import { DefaultMeta, MetaDataType } from "../../routes/Home";
import { HelmetTag } from "../../main";

type PurchaseRulesDataType = {
  _id: string;
  title: string;
  pdf: string;
};

const PurchaseRules: React.FC = () => {
  const { translations } = useTranslate();

  const selectedLang = useRecoilValue(SelectedLanguageState);

  const { data: purchRuleData } = useQuery<PurchaseRulesDataType[]>({
    queryKey: ["purchRuleData", selectedLang],
    queryFn: async () => {
      try {
        const response = await axios.get(`${Baseurl}/purchaserulesfront`, {
          headers: {
            "Accept-Language": selectedLang,
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    staleTime: 3000000,
  });

  //download pdf for purchases
  const handleDownloadPdf = async (_id: string) => {
    const findUrl: any =
      purchRuleData && purchRuleData?.length > 0
        ? purchRuleData?.find((item: PurchaseRulesDataType) => {
          return _id === item?._id ? item?.pdf : "";
        })
        : "";
    const url: any = findUrl ? `https://ekol-server-1.onrender.com${findUrl?.pdf}` : "";
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    link.click();
  };

  const { data: MetaData } = useQuery<MetaDataType>({
    queryKey: ['meta_satinalmaqaydalari_key', selectedLang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-satinalmaqaydalari-front`, {
        headers: {
          "Accept-Language": selectedLang,
        }
      });
      return res.data[0];
    }
  });
  const hasMeta: MetaDataType = MetaData && Object.values(MetaData)?.length > 0 ? MetaData : DefaultMeta;


  return (
    <main className="purch-rules-wrapper">
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{hasMeta?.meta_title}</title>
        <meta name="title" content={hasMeta?.meta_title} />
        <meta name="description" content={hasMeta?.meta_description} />
        <meta name="generator" content={hasMeta?.meta_generator} />
        <meta name="author" content={hasMeta?.meta_author} />
      </HelmetTag>
      <section className="purch-rules-section">
        <div className="purch-rules">
          <Breadcrumb
            prevpage={translations["nav_anasehife"]}
            uri={translations["nav_haqqimizda_satinalma_qaydalari"]}
          />

          <div className="container-purch-rules">
            <h2>{translations["nav_haqqimizda_satinalma_qaydalari"]}</h2>

            {purchRuleData && purchRuleData?.length > 0
              ? purchRuleData?.map((data: PurchaseRulesDataType) => (
                <div key={data?._id} className="centered-section">
                  <h3>{data?.title}</h3>
                  <button className="download-pdf-btn" onClick={() => handleDownloadPdf(data?._id)}>
                    {translations["pdf_yukle_title"]}
                  </button>
                </div>
              ))
              : ""}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PurchaseRules;
