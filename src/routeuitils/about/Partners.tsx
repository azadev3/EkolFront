import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { useTranslate } from "../../context/TranslateContext";
import { DefaultMeta, MetaDataType } from "../../routes/Home";
import { useQuery } from "@tanstack/react-query";
import { HelmetTag } from "../../main";

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

  const { data: MetaData } = useQuery<MetaDataType>({
    queryKey: ['meta_partnyorlar_key', selectedlang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-partnyorlar-front`, {
        headers: {
          "Accept-Language": selectedlang,
        }
      });
      return res.data[0];
    }
  });
  
  const hasMeta: MetaDataType = MetaData && Object.values(MetaData)?.length > 0 ? MetaData : DefaultMeta;



  return (
    <section className="partner-section">
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{hasMeta?.meta_title}</title>
        <meta name="title" content={hasMeta?.meta_title} />
        <meta name="description" content={hasMeta?.meta_description} />
        <meta name="generator" content={hasMeta?.meta_generator} />
        <meta name="author" content={hasMeta?.meta_author} />
      </HelmetTag>
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
                    <img src={`https://ekol-server-1.onrender.com${item?.logo}`} alt={`${i}-logo`} title={item?.title} />
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
