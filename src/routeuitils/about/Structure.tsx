import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useTranslate } from "../../context/TranslateContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import Loader from "../../Loader";

type DataStr = {
  image: string;
};

const Structure: React.FC = () => {
  const { translations } = useTranslate();

  const {
    data: dataStr,
    isLoading,
    isError,
  } = useQuery<DataStr[]>({
    queryKey: ["strDataKey"],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/structure_img_front`);
      return res.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const imageStructure = dataStr && dataStr?.length > 0 && dataStr[0] && dataStr[0]?.image ? dataStr[0]?.image : "";

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Have a problem.</p>;
  }

  return (
    <section className="structure-section">
      <div className="structure">
        <Breadcrumb prevpage={translations["nav_anasehife"]} uri={translations["nav_haqqimizda_struktur"]} />

        <div className="content-structure">
          <h2>{translations["struktur_title"]}</h2>

          <div className="wrapper-structure">
            <img src={`https://ekol-server-1.onrender.com${imageStructure}`} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Structure;
