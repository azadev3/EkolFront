import React, { ChangeEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import PaginateButton from "../../components/PaginateButton";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import Loader from "../../Loader";
import { useTranslate } from "../../context/TranslateContext";
import { DefaultMeta, MetaDataType } from "../../routes/Home";
import { HelmetTag } from "../../main";
import moment from "moment";
export type VacationsType = {
  id: string;
  vacationName: string;
  vacationDescription: string;
  startDate: string;
  endDate: string;
  workRegime: string;
};

export interface Vacations {
  title: string;
  description: string;
  workRegime: string;
  location: string;
  endDate: string;
  startDate: string;
}

export const VacationsData: VacationsType[] = [
  {
    id: uuidv4(),
    vacationName: "Software Engineer",
    vacationDescription: "ssssss",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Full stack developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Web developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },

  {
    id: uuidv4(),
    vacationName: "Mern stack developer (ReactJS - NodeJS)",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Full stack developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Web developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },

  {
    id: uuidv4(),
    vacationName: "Mern stack developer (ReactJS - NodeJS)",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Full stack developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Web developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },

  {
    id: uuidv4(),
    vacationName: "Mern stack developer (ReactJS - NodeJS)",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Full stack developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Web developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },

  {
    id: uuidv4(),
    vacationName: "Mern stack developer (ReactJS - NodeJS)",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Full stack developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Web developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },

  {
    id: uuidv4(),
    vacationName: "Mern stack developer (ReactJS - NodeJS)",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Full stack developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Web developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },

  {
    id: uuidv4(),
    vacationName: "Mern stack developer (ReactJS - NodeJS)",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Full stack developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Web developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },

  {
    id: uuidv4(),
    vacationName: "Mern stack developer (ReactJS - NodeJS)",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Full stack developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Web developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },

  {
    id: uuidv4(),
    vacationName: "Mern stack developer (ReactJS - NodeJS)",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Full stack developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Web developer",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },

  {
    id: uuidv4(),
    vacationName: "Mern stack developer (ReactJS - NodeJS)",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
  {
    id: uuidv4(),
    vacationName: "Vakansiyanın adı/şöbə və ya departament",
    vacationDescription: "",
    startDate: "12 iyul 2024",
    endDate: "12 avqust 2024",
    workRegime: "Tam ştat",
  },
];

const Vacations: React.FC = () => {
  // FETCH VACATIONS
  const selectedlang = useRecoilValue(SelectedLanguageState);

  const { data: vacationData, isLoading } = useQuery<Vacations[]>({
    queryKey: ["vacationsDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/vacationsfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      if (response.data) {
        const newVacs = [...response.data];

        const lastVac = newVacs.pop();
        if (lastVac) {
          newVacs.unshift(lastVac);
        }

        return newVacs;
      }
      return response.data;
    },
    staleTime: 1000000,
  });

  //pagination
  const [paginate, setPaginate] = React.useState<number>(12);

  const handlePaginate = () => {
    setPaginate((prevPag) => prevPag + 6);
  };

  //search vacation
  const [inputValue, setInputValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchVacations = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    setSearchTerm(inputValue);
  };

  //if clicked enter start search
  React.useEffect(() => {
    const ifClickEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setSearchTerm(inputValue);
      }
    };
    document.addEventListener("keydown", ifClickEnter);
    return () => document.removeEventListener("keydown", ifClickEnter);
  }, [inputValue]);

  // Filtered search
  const filteredSearchItems =
    vacationData && vacationData?.length > 0
      ? vacationData.filter((item: Vacations) => {
        return item?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      })
      : [];

  const sortedFilteredSearchItems = filteredSearchItems?.sort((a: Vacations, b: Vacations) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const navigate = useNavigate();

  const { translations } = useTranslate();

  const { data: MetaData } = useQuery<MetaDataType>({
    queryKey: ['meta_karyeravakansiyalar_key', selectedlang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-karyeraimkanlarivakansiyalar-front`, {
        headers: {
          "Accept-Language": selectedlang,
        }
      });
      return res.data[0];
    }
  });
  const hasMeta: MetaDataType = MetaData && Object.values(MetaData)?.length > 0 ? MetaData : DefaultMeta;


  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="vacations">
          <HelmetTag>
            <meta charSet="utf-8" />
            <title>{hasMeta?.meta_title}</title>
            <meta name="title" content={hasMeta?.meta_title} />
            <meta name="description" content={hasMeta?.meta_description} />
            <meta name="generator" content={hasMeta?.meta_generator} />
            <meta name="author" content={hasMeta?.meta_author} />
          </HelmetTag>
          <div className="search-area">
            <div className="search-input">
              <IoIosSearch className="search-icon" />
              <input type="search" placeholder={translations['vakansiyanin_adi_title']} onChange={handleSearchVacations} value={inputValue} />
            </div>
            <button className="search-btn" onClick={handleButtonClick}>
              {translations['search_button_title']}
            </button>
          </div>

          <div className="vacations-grid">
            {sortedFilteredSearchItems && sortedFilteredSearchItems?.length > 0 ? (
              sortedFilteredSearchItems?.slice(0, paginate).map((item: Vacations, i: number) => (
                <article
                  onClick={() => navigate(`/karyera/${item?.title?.toLowerCase()}`)}
                  key={i}
                  className="vacation-item">
                  <h3>{item?.title}</h3>
                  <div className="time-and-icon">
                    <span>{translations['paylasilma']}: <strong>{moment(item?.startDate).format('DD.MM.YYYY')}</strong></span>
                    <span>{translations['bitme']}: <strong>{moment(item?.endDate).format('DD.MM.YYYY')}</strong></span>
                    <div className="icon-right">
                      <img src="/rightt.png" alt="go-to-vacation" />
                    </div>
                  </div>
                </article>
              ))
            ) : filteredSearchItems && filteredSearchItems?.length === 0 ? (
              <React.Fragment>
                <p>Axtardığınız vakansiya tapılmadı</p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {vacationData && vacationData?.length > 0
                  ? vacationData.slice(0, paginate).map((item: Vacations) => (
                    <article key={uuidv4()} className="vacation-item">
                      <h3>{item?.title}</h3>
                      <div className="time-and-icon">
                        <span>{item?.startDate}</span>
                        <div className="icon-right">
                          <img src="/rightt.png" alt="go-to-vacation" />
                        </div>
                      </div>
                    </article>
                  ))
                  : ""}
              </React.Fragment>
            )}
          </div>

          {vacationData && vacationData?.length > 0
            ? paginate <= vacationData?.length && !searchTerm && <PaginateButton handlePaginate={handlePaginate} />
            : ""}
        </section>
      )}
    </React.Fragment>
  );
};

export default Vacations;
