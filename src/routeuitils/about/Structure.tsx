import React from "react";
import { v4 as uuid } from "uuid";
import Breadcrumb from "../../Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import Loader from "../../Loader";
import { useTranslate } from "../../context/TranslateContext";

const Structure: React.FC = () => {

  const { translations } = useTranslate();

  const selectedlang = useRecoilValue(SelectedLanguageState);

  const { data: StructureData, isLoading: StructureLoading } = useQuery({
    queryKey: ["structureDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/departmentsfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  if (StructureLoading) {
    return <Loader />;
  }

  const groupedData = StructureData ? StructureData?.reduce((acc: any, item: any) => {
    const { category, title } = item.departments;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ id: uuid(), title });
    return acc;
  }, {}) : [];

  return (
    <section className="structure-section">
      <div className="structure">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['nav_haqqimizda_struktur']} />

        <div className="content-structure">
          <h2>{translations["struktur_title"]}</h2>
          <div className="director-general">
            <div className="general">
              <span>{translations["baş_direktorun_adı"]}</span>
            </div>
          </div>
          <div className="other-refactors">
            {Object.keys(groupedData).map((category) => (
              <div className="item-department" key={category}>
                {groupedData[category].map((item: { id: string; title: string }) => (
                  <div className="container-item" key={item.id}>
                    <div className="item">
                      <span>{item.title}</span>
                    </div>
                    {groupedData[category].length > 1 && (
                      <React.Fragment>
                        <div className="technic-line"></div>
                        <div className="technic-line2"></div>
                      </React.Fragment>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Structure;
