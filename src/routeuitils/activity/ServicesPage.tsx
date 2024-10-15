import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { ServicesContentType } from "./ServicesActivity";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import Loader from "../../Loader";
import { useTranslate } from "../../context/TranslateContext";

export const IsClickedServiceState = atom<any>({
  key: "isClickedServiceStateKey",
  default: null,
});

const ServicesPage: React.FC = () => {
  const { translations } = useTranslate();

  const [_, setSelectedServiceID] = useRecoilState(IsClickedServiceState);

  //Fetch services
  const selectedLang = useRecoilValue(SelectedLanguageState);

  const { data: servicesPageData, isLoading } = useQuery<ServicesContentType[]>({
    queryKey: ["servicesPageDataKey", selectedLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/servicespagefront`, {
        headers: {
          "Accept-Language": selectedLang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  const hasServicesPageData = servicesPageData && servicesPageData?.length > 0;

  const navigate = useNavigate();

  return (
    <section className="servicespage-section">
      <div className="servicespage">
        <Breadcrumb prevpage={translations["nav_anasehife"]} uri={translations["nav_haqqimizda_xidmetler"]} />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="container-servicespage">
            <h2>{translations["xidmetler_title"]}</h2>
            <div className="container-services-grid">
              {hasServicesPageData &&
                servicesPageData?.map((item: ServicesContentType, i: number) => (
                  <div
                    onClick={() => {
                      navigate(`/fealiyyet/xidmetler/${i + 1}`);
                      setSelectedServiceID(i + 1);
                    }}
                    className="item-service"
                    key={i}>
                    <div className="texts">
                      <article className="top-text">
                        <h2>{item.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: item.description.slice(0, 200) }} />
                      </article>
                      <Link to={`/fealiyyet/xidmetler/${i + 1}`} className="btn-more">
                        <span>{translations["etrafli_bax_button"]}</span>
                        <img src="/righte.svg" alt="right" />
                      </Link>
                    </div>

                    <div className="image">
                      <img src={`https://ekol-server-1.onrender.com${item?.image}`} alt={`${i}_image`} loading="lazy" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesPage;
