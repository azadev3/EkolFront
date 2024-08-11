import React from "react";
import { Link, useParams } from "react-router-dom";
// import { VacationsData, VacationsType } from "./Vacations";
import Breadcrumb from "../../Breadcrumb";
import VacationTopHead from "./VacationTopHead";
import { Vacations } from "./Vacations";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import DOMPurify from "dompurify";

const VacationInner: React.FC = () => {
  const { vacid } = useParams<{ lang: string, vacid: string }>();

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

  // Secury control and initial value
  const description = innerVacancy?.description || "";


  return (
    <section className="vacations-inner-section">
      <div className="vacationsinner">
        <Breadcrumb prevpage="Ana səhifə" uri="Karyera imkanları" />
        <div className="container-inner-vac">
          <VacationTopHead />
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
            className="vacation-inner-content"
          />
        </div>

        <div className="other-vacations">
          <div className="head-title">
            <h2>Oxşar vakansiyalar</h2>
            <Link to="/karyera" className="all-vacations">
              Bütün vakansiyalar
            </Link>
          </div>

          <div className="grid-other-vacation"></div>
        </div>
      </div>
    </section>
  );
};

export default VacationInner;
