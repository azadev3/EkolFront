import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../Loader";
import DOMPurify from "dompurify";
import { useTranslate } from "../../context/TranslateContext";

interface EquipmentsDataType {
  description: string;
  title: string;
}

const Tools: React.FC = () => {
  const selectedLang = useRecoilValue(SelectedLanguageState);

  const { data: EquipmentsData, isLoading } = useQuery<EquipmentsDataType[]>({
    queryKey: ["eqDataKey", selectedLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/equipmentsfront`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": selectedLang,
        },
      });
      return response.data;
    },
  });

  React.useEffect(() => {
    const contentDivs = document.querySelectorAll(".container-descriptions p");

    contentDivs.forEach((pTag) => {
      if (pTag.querySelector("img")) {
        pTag.classList.add("img-grid");
      }
    });
  }, [EquipmentsData]);

  const { translations } = useTranslate();


  return (
    <section className="tools-section">
      <div className="tools">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['nav_haqqimizda_avadanliqlar']} />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="container-tools">
            {EquipmentsData && EquipmentsData?.length > 0
              ? EquipmentsData.map((item: EquipmentsDataType) => (
                  <React.Fragment key={uuidv4()}>
                    <h2>{item?.title}</h2>
                    <div className="container-descriptions">
                      {item && item.description ? (
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description) }} />
                      ) : (
                        ""
                      )}
                    </div>
                  </React.Fragment>
                ))
              : ""}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tools;
