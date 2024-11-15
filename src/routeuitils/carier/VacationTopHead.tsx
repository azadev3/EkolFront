import React from "react";
import { Vacations } from "./Vacations";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { useQuery } from "@tanstack/react-query";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";
import { useTranslate } from "../../context/TranslateContext";

const VacationTopHead: React.FC = () => {
  const { vacid } = useParams<{ vacid: string }>();

  // FETCH VACATIONS
  const selectedlang = useRecoilValue(SelectedLanguageState);

  const { data: vacationData } = useQuery<Vacations[]>({
    queryKey: ["vacationsDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/vacationsfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  const innerVacancy = vacationData?.find((item: Vacations) => {
    return vacid?.toLowerCase() === item?.title.toLowerCase();
  });

  const { translations } = useTranslate();

  return (
    <article className="vacation-top-description">
      <div className="texts">
        <h3>{innerVacancy?.title}</h3>
        <div className="titles">
          <span className="title">{innerVacancy?.title || "Vacancy name not available"}</span>
          <span className="dot"></span>
          <span className="title">{innerVacancy?.location || "Bakı, Azərbaycan"}</span>
          <span className="dot"></span>
          <span className="title">{innerVacancy?.workRegime || "Work regime not available"}</span>
          <div className="time-and-view">
            <article>
              <img src="/dates.png" alt="date" title={`${innerVacancy?.startDate} - ${innerVacancy?.endDate}`} />
              <p>
                {innerVacancy?.startDate} - {innerVacancy?.endDate}
              </p>
            </article>
            {/* <article>
              <img src="/eyy.png" alt="views" title="Baxış sayı" />
              <p>112 baxış</p>
            </article> */}
          </div>
        </div>
      </div>
      <Link
        to={`/karyera/${innerVacancy?.title?.toLowerCase()}/${innerVacancy?.title?.toLowerCase()}`}
        className="request-btn">
        {translations['muraciet_et_title']}
      </Link>
    </article>
  );
};

export default VacationTopHead;
