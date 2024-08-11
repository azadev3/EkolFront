import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { Link } from "react-router-dom";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { ServicesContentType } from "./ServicesActivity";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import Loader from "../../Loader";

const ServicesPage: React.FC = () => {
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

  return (
    <section className="servicespage-section">
      <div className="servicespage">
        <Breadcrumb prevpage="Ana səhifə" uri="Xidmətlər" />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="container-servicespage">
            <h2>Xidmətlər</h2>
            <div className="container-services-grid">
              {hasServicesPageData &&
                servicesPageData?.map((item: ServicesContentType, i: number) => (
                  <div className="item-service" key={i}>
                    <div className="texts">
                      <article className="top-text">
                        <h2>{item.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: item.description.slice(0, 200) }} />
                      </article>
                      <Link to={`/fealiyyet/xidmetler/${item?.title}`} className="btn-more">
                        <span>Ətraflı bax</span>
                        <img src="/righte.svg" alt="right" />
                      </Link>
                    </div>

                    <div className="image">
                      <img src={`http://localhost:3000${item?.image}`} alt={`${i}_image`} loading="lazy" />
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
