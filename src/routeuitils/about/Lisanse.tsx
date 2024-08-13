import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import Loader from "../../Loader";
import DOMPurify from "dompurify";
import { useTranslate } from "../../context/TranslateContext";

interface LisanseItemType {
  _id: string;
  title: string;
  description: string;
}

const Lisanse: React.FC = () => {
  //fetch lisanse data
  const selectedlang = useRecoilValue(SelectedLanguageState);
  const { data: lisanseData, isLoading } = useQuery<LisanseItemType[]>({
    queryKey: ["lisanseDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/lisansepagefront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  const hasLisanseData = lisanseData && lisanseData?.length > 0;

  const { translations } = useTranslate();


  return (
    <section className="lisanse-section">
      <div className="lisanse">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['nav_haqqimizda_lisenziyalar']} />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="container-lisanse">
            {hasLisanseData
              ? lisanseData?.map((item: LisanseItemType) => (
                  <React.Fragment key={item?._id}>
                    <h2>{item?.title}</h2>
                    <div
                      className="description-area-lisanse"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description) }}
                    />
                  </React.Fragment>
                ))
              : ""}
          </div>
        )}
      </div>
    </section>
  );
};

export default Lisanse;
