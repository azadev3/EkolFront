import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { useTranslate } from "../../context/TranslateContext";

type PartnersType = {
  _id: string;
  title: string;
  logo: string;
};

const Partners: React.FC = () => {
  const selectedlang = useRecoilValue(SelectedLanguageState);

  const [partners, setPartners] = React.useState<PartnersType[]>([]);
  // Fetch data using React Query
  const FetchPartners = async () => {
    try {
      const response = await axios.get(`${Baseurl}/partnersfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      if (response.data) {
        setPartners(response.data);
      } else {
        response.status;
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    FetchPartners();
  }, [selectedlang]);

  // Pagination state
  const [paginate, setPaginate] = React.useState<number>(12);

  // Function to increment pagination
  const incrementPagination = () => {
    setPaginate((prevPaginate) => prevPaginate + 6);
  };

  // Slice the partners list based on the paginate state
  const displayedPartners = partners ? partners.slice(0, paginate) : [];

  const { translations } = useTranslate();

  return (
    <section className="partner-section">
      <div className="partners">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['nav_haqqimizda_partnyorlar']} />

        <div className="partners-container">
          <h2>{translations["partners_title"]}</h2>
          <div className="content-partners">
            {partners &&
              partners.length > 0 &&
              displayedPartners.map((item: PartnersType, i: number) => (
                <div key={i} className="partners-item">
                  <div className="logo-wrap">
                  <img src={`https://kaiyi-21d4.onrender.com${item?.logo}`} alt={`${i}-logo`} title={item?.title} />
                  </div>
                  <span>{item?.title}</span>
                </div>
              ))}
          </div>

          {partners && partners.length > 0 && paginate < partners.length && (
            <div className="pagination-button">
              <span onClick={incrementPagination}>Daha çox</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Partners;
