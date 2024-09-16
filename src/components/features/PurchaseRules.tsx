import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { useTranslate } from "../../context/TranslateContext";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { Baseurl } from "../../Baseurl";
import axios from "axios";

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

  return (
    <main className="purch-rules-wrapper">
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