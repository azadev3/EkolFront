import React, { ChangeEvent } from "react";
import Breadcrumb from "../../Breadcrumb";
import { useTranslate } from "../../context/TranslateContext";
import { CiSearch } from "react-icons/ci";
import { useRecoilState, useRecoilValue } from "recoil";
import { PurchaseAnnouncementModalState } from "../../routeuitils/purchase/PurchaseSection";
import { useQuery } from "@tanstack/react-query";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import moment from "moment";
import { DefaultMeta, MetaDataType } from "../../routes/Home";
import { HelmetTag } from "../../main";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export interface PurchAnnInterface {
  _id: string;
  createdAt: string;
  description: string;
  end_date: string;
  pdf: string;
  predmet: string;
  status: string;
  title: string;
}

type MainFilterItemType = {
  id: number;
  title: string;
  value: string;
};

const PurchaseAnnouncements: React.FC = () => {
  const { translations } = useTranslate();

  // FETCH DATA ANNOUNCEMENTS
  const selectedlang = useRecoilValue(SelectedLanguageState);

  const { data: purchAnnData } = useQuery<PurchAnnInterface[]>({
    queryKey: ["purchAnnData", selectedlang],
    queryFn: async () => {
      try {
        const response = await axios.get(`${Baseurl}/purchaseannouncementfront`, {
          headers: {
            "Accept-Language": selectedlang,
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    staleTime: 1000000,
  });

  const hasPurchData = purchAnnData && purchAnnData?.length > 0;

  const MainFilterItem: MainFilterItemType[] = [
    { id: 4, title: `${translations["all_filter_key"]}`, value: "all" },
    { id: 1, title: `${translations["filter_new"]}`, value: "new" },
    { id: 2, title: `${translations["filter_actual"]}`, value: "current" },
    { id: 3, title: `${translations["filter_ended"]}`, value: "ended" },
  ];

  // Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // State for search and filter
  const [inputValue, setInputValue] = React.useState<string>("");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [selectedFilter, setSelectedFilter] = React.useState<string>("all");

  React.useEffect(() => {
    if (selectedFilter === "") {
      setSelectedFilter("all");
    }
  }, []);


  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    setEndDate(date);
  };

  const filteredData =
    hasPurchData &&
    purchAnnData
      ?.filter((item) => {
        // Search filter: Check if title includes search term
        const matchesSearchTerm = item.title.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by status (only if not "all")
        const matchesStatus = selectedFilter === "all" || item.status === selectedFilter;

        // Filter by date range (only if both startDate and endDate are set)
        const matchesDateRange =
          (!startDate || !endDate) ||
          (new Date(item.createdAt) >= new Date(Number(startDate)) && new Date(item.createdAt) <= new Date(Number(endDate)));

        return matchesSearchTerm && matchesStatus && matchesDateRange;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const currentItems = hasPurchData && filteredData && filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  if (hasPurchData && filteredData) {
    for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchVacations = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    setSearchTerm(inputValue);
  };

  const handleClickFilter = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const [_, setPurchModal] = useRecoilState(PurchaseAnnouncementModalState);
  const openPurchModal = (id: string) => {
    setPurchModal(id);
  };

  const orderByItems =
    hasPurchData && currentItems
      ? [...currentItems].reverse()
      : [];

  const { data: MetaData } = useQuery<MetaDataType>({
    queryKey: ['meta_satinalmaelanlari_key', selectedlang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-satinalmaelanlari-front`, {
        headers: {
          "Accept-Language": selectedlang,
        }
      });
      return res.data[0];
    }
  });
  const hasMeta: MetaDataType = MetaData && Object.values(MetaData)?.length > 0 ? MetaData : DefaultMeta;

  return (
    <main className="purch-announcement-wrapper">
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{hasMeta?.meta_title}</title>
        <meta name="title" content={hasMeta?.meta_title} />
        <meta name="description" content={hasMeta?.meta_description} />
        <meta name="generator" content={hasMeta?.meta_generator} />
        <meta name="author" content={hasMeta?.meta_author} />
      </HelmetTag>
      <section className="purch-announcement-section">
        <div className="purch-announcement">
          <Breadcrumb
            prevpage={translations["nav_anasehife"]}
            uri={translations["nav_haqqimizda_satinalma_elanlari"]}
          />

          <div className="container-purch-announcement">
            <h2>{translations["nav_haqqimizda_satinalma_elanlari"]}</h2>

            <div className="search-and-items">
              <section className="search-area">
                <div className="input-search">
                  <CiSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder={translations["search_placeholder_title"]}
                    onChange={handleSearchVacations}
                    value={inputValue}
                  />
                  <button onClick={handleButtonClick}>{translations["search_button_title"]}</button>
                </div>

                <div className="right-filter">
                  <div className="date-range-area">
                    <h6>{translations['siralama_key']}</h6>
                    <div className="bottom">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          format="DD.MM.YYYY"
                          label={translations['bu_tarixden']}
                          value={startDate}
                          onChange={handleStartDateChange}
                        />
                        <DatePicker
                          format="DD.MM.YYYY"
                          label={translations['bu_tarixe']}
                          value={endDate}
                          onChange={handleEndDateChange}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>

                  <div className="linkeds">
                    {MainFilterItem.map((filters) => (
                      <span
                        onClick={() => handleClickFilter(filters.value)}
                        className={`link-filter ${selectedFilter === filters.value ? "active" : ""}`}
                        key={filters.id}>
                        {filters.title}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              <section className="table-area-purchase">
                <table>
                  <thead>
                    <tr>
                      <th className="order"></th>
                      <th>{translations["satinalan_teskilatin_adi"]}</th>
                      <th>{translations["satinalma_predmeti"]}</th>
                      <th>{translations["derc_edilme_tarixi"]}</th>
                      <th>{translations["bitme_tarixi"]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hasPurchData && currentItems ? (
                      orderByItems?.map((item: PurchAnnInterface, index: number) => (
                        <tr key={item?._id} onClick={() => openPurchModal(item?._id)}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>{item?.title}</td>
                          <td>{item?.predmet}</td>
                          <td>{moment(item?.createdAt).format("DD.MM.YYYY HH:mm")}</td>
                          <td>{item?.end_date}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5}>No items found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </section>

              {hasPurchData && filteredData && filteredData?.length > itemsPerPage && (
                <section className="pagination">
                  <ul className="pagination-list">
                    <button className="left" onClick={handlePrevClick} disabled={currentPage === 1}>
                      <img src="/lef.svg" alt="prev" />
                    </button>
                    {pageNumbers.map((number) => (
                      <li
                        onClick={() => handleClick(number)}
                        key={number}
                        className={`pagination-item ${number === currentPage ? "active" : ""}`}>
                        <span>{number}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="right" onClick={handleNextClick} disabled={currentPage === pageNumbers.length}>
                    <img src="/righ.svg" alt="next" />
                  </button>
                </section>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PurchaseAnnouncements;
