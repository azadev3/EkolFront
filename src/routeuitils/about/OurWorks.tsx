import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { v4 as uuidv4 } from "uuid";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import DOMPurify from 'dompurify';
import { useTranslate } from "../../context/TranslateContext";

interface OurWorksInnerInterface {
  title: string,
  description: string,
}

const OurWorks: React.FC = () => {

  // FETCH OUR WORKS DATA 
  const selectedlang = useRecoilValue(SelectedLanguageState);

  const { data: OurWorksInnerData } = useQuery({
    queryKey: ["ourWorksInnerDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/ourworksinnerfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  //rendered items according to selecting navigation content
  const [selectItem, setSelectItem] = React.useState<string>("");

  // Set the initial value when OurWorksInnerData changes
  React.useEffect(() => {
    if (OurWorksInnerData && OurWorksInnerData.length > 0) {
      const initialValue = OurWorksInnerData[0]?.title;
      setSelectItem(initialValue);
    }
  }, [OurWorksInnerData]);

  const handleSelectItem = (i: string) => {
    setSelectItem(i);
  };

  const { translations } = useTranslate();

  return (
    <section className="ourworks-section">
      <div className="works">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['gorduyumuz_isler_title']} />

        <div className="container-works">
          <h2>{translations['gorduyumuz_isler_title']}</h2>

          <div className="grid-works">
            <div className="navigation-content">
              {OurWorksInnerData && OurWorksInnerData.length > 0 ? OurWorksInnerData.map((item: OurWorksInnerInterface) => (
                <div key={uuidv4()} className="item-navigation" onClick={() => handleSelectItem(item?.title)}>
                  <div className="left-order-num-and-title">
                    <p>{item?.title}</p>
                  </div>
                  <img src="/arrow.svg" className="arrowimg" alt="" />
                </div>
              )) : ""}
            </div>

            <div className="navigation-description-content">
              {OurWorksInnerData && OurWorksInnerData.length > 0 ? OurWorksInnerData.map((item: OurWorksInnerInterface) => {
                if (selectItem === item?.title) {
                  return (
                    <div className="description-content" key={uuidv4()}>
                      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description)  }}/>
                    </div>
                  );
                }
              }) : ""}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWorks;
