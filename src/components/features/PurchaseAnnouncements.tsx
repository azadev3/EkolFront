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
        console.log(response.data, "purch ann data");
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

  React.useEffect(() => {
    console.log(selectedFilter);
  }, []);

  // Search and filter logic
  const filteredData =
    hasPurchData &&
    purchAnnData
      ?.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((item) => {
        if (selectedFilter === "all") {
          return true; // Return all items when "all" is selected
        } else {
          return item.status === selectedFilter;
        }
      });

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

  return (
    <main className="purch-announcement-wrapper">
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
                    placeholder={translations['search_placeholder_title']}
                    onChange={handleSearchVacations}
                    value={inputValue}
                  />
                  <button onClick={handleButtonClick}>{translations['search_button_title']}</button>
                </div>

                <div className="right-filter">
                  {MainFilterItem.map((filters) => (
                    <span
                      onClick={() => handleClickFilter(filters.value)}
                      className={`link-filter ${selectedFilter === filters.value ? "active" : ""}`}
                      key={filters.id}>
                      {filters.title}
                    </span>
                  ))}
                </div>
              </section>

              <section className="table-area-purchase">
                <table>
                  <thead>
                    <tr>
                      <th className="order"></th>
                      <th>{translations['satinalan_teskilatin_adi']}</th>
                      <th>{translations['satinalma_predmeti']}</th>
                      <th>{translations['derc_edilme_tarixi']}</th>
                      <th>{translations['bitme_tarixi']}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hasPurchData && currentItems ? (
                      currentItems?.map((item: PurchAnnInterface, index: number) => (
                        <tr key={item?._id} onClick={() => openPurchModal(item?._id)}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>{item?.title}</td>
                          <td>{item?.predmet}</td>
                          <td>{moment(item?.createdAt).locale("").format("DD.MM.YYYY HH:mm")}</td>
                          <td>{moment(item?.end_date).locale("").format("DD.MM.YYYY HH:mm")}</td>
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
