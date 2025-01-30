import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslate } from "../../context/TranslateContext";
import { DefaultMeta, MetaDataType } from "../../routes/Home";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import { HelmetTag } from "../../main";

export interface DynamicCalcCategory {
  _id: string;
  title: string;
}


const CalculationSection: React.FC = () => {
  const { translations } = useTranslate();

  const lang = useRecoilValue(SelectedLanguageState);
  const { data: MetaData } = useQuery<MetaDataType>({
    queryKey: ['meta_hesabatlar_key', lang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-hesabatlar-front`, {
        headers: {
          "Accept-Language": lang,
        }
      });
      return res.data[0];
    }
  });
  const hasMeta: MetaDataType = MetaData && Object.values(MetaData)?.length > 0 ? MetaData : DefaultMeta;

  const { data: DynamicCategoryData } = useQuery<DynamicCalcCategory[]>({
    queryKey: ['DynamicCalcCategoryKey', lang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/dynamic-category-front`, {
        headers: {
          "Accept-Language": lang,
        }
      });
      return res.data;
    }
  });


  return (
    <section className="calculation-section">
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{hasMeta?.meta_title}</title>
        <meta name="title" content={hasMeta?.meta_title} />
        <meta name="description" content={hasMeta?.meta_description} />
        <meta name="generator" content={hasMeta?.meta_generator} />
        <meta name="author" content={hasMeta?.meta_author} />
      </HelmetTag>
      <div className="calculation">
        <Breadcrumb prevpage={translations["nav_anasehife"]} uri={translations["nav_haqqimizda_hesabatlar"]} />

        <div className="container-calculation">
          <h2>{translations["hesabatlar_title"]}</h2>

          <div className="navigator">
            <NavLink to="illikhesabatlar" className="yearly">
              {translations["illik_hesabatlar_title"]}
            </NavLink>
            <NavLink to="rublukhesabatlar" className="quarterly">
              {translations["rubluk_hesabatlar_title"]}
            </NavLink>
            {DynamicCategoryData && DynamicCategoryData.length > 0 ?
              DynamicCategoryData.map((data: DynamicCalcCategory) => (
                <NavLink to={data._id} key={data?._id} className="quarterly">
                  {data?.title}
                </NavLink>
              )) : null
            }
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default CalculationSection;
