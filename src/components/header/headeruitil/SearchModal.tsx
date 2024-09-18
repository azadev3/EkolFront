import { IoClose, IoSearch } from "react-icons/io5";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchModalState } from "./Search";
import React, { ChangeEvent } from "react";
import { useTranslate } from "../../../context/TranslateContext";
import { HeaderElementType, submenuType } from "../Header";
import { FaAngleDown } from "react-icons/fa6";
import { MdLocationSearching } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { SelectedLanguageState } from "../../../recoil/Atoms";
import { Baseurl } from "../../../Baseurl";
import axios from "axios";
import { BlogType } from "../../../routeuitils/home/BlogSection";
import DOMPurify from "dompurify";

const SearchModal = () => {
  const { translations } = useTranslate();

  const HeaderItems: HeaderElementType[] = [
    { id: 1, title: `${translations["nav_anasehife"]}`, to: "/" },
    {
      id: 2,
      title: `${translations["nav_haqqimizda"]}`,
      to: "",
      icon: <FaAngleDown className="down-icon" />,
      submenu: [
        { id: 1, title: `${translations["nav_haqqimizda_bizkimik"]}`, to: "/about" },
        { id: 2, title: `${translations["nav_haqqimizda_rehberlik"]}`, to: "/about/leadership" },
        { id: 3, title: `${translations["nav_haqqimizda_struktur"]}`, to: "/about/structure" },
        { id: 5, title: `${translations["nav_haqqimizda_sertifikatlar"]}`, to: "/about/certificates" },
        { id: 6, title: `${translations["nav_haqqimizda_partnyorlar"]}`, to: "/about/partners" },
        { id: 7, title: `${translations["nav_haqqimizda_ourworks"]}`, to: "/about/workwedo" },
        { id: 9, title: `${translations["nav_haqqimizda_hesabatlar"]}`, to: "/hesabatlar/illikhesabatlar" },
      ],
    },
    {
      id: 3,
      title: `${translations["nav_haqqimizda_fealiyyet"]}`,
      to: "/",
      icon: <FaAngleDown className="down-icon" />,
      submenu: [
        {
          id: 32,
          title: `${translations["nav_haqqimizda_avadanliqlar"]}`,
          to: "/fealiyyet/avadanliqlar",
        },
        {
          id: 33,
          title: `${translations["nav_haqqimizda_xidmetler"]}`,
          to: "/fealiyyet/xidmetler",
        },
        { id: 8, title: `${translations["nav_haqqimizda_cariers"]}`, to: "/karyera" },
      ],
    },
  
    {
      id: 4,
      title: `${translations["nav_haqqimizda_satinalma"]}`,
      to: "",
      icon: <FaAngleDown className="down-icon" />,
      submenu: [
        { id: 1, title: `${translations["nav_haqqimizda_satinalma_elanlari"]}`, to: "/satinalmaelanlari" },
        { id: 2, title: `${translations["nav_haqqimizda_satinalma_qaydalari"]}`, to: "/satinalmaqaydalari" },
        { id: 3, title: `${translations["nav_haqqimizda_satinalma_elaqe"]}`, to: "/satinalma_elaqe" },
      ],
    },
    {
      id: 5,
      title: "Media",
      to: "/",
      icon: <FaAngleDown className="down-icon" />,
      submenu: [
        { id: 1, title: `${translations["nav_haqqimizda_xeberler"]}`, to: "/xeberler" },
        {
          id: 2,
          title: `${translations["nav_haqqimizda_qalereya"]}`,
          to: "/about/gallery",
        },
        {
          id: 3,
          title: `${translations["nav_haqqimizda_sosialheyat"]}`,
          to: "/fealiyyet/sosialheyat",
        },
        {
          id: 4,
          title: `${translations["newblog_title"]}`,
          to: "/bloq",
        },
      ],
    },
    { id: 6, title: `${translations["nav_haqqimizda_elaqe"]}`, to: "/elaqe" },
  ];

  const [searchModal, setSearchModal] = useRecoilState(searchModalState);

  const modalRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const outsideClicked = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setSearchModal(false);
      }
    };

    document.addEventListener("mousedown", outsideClicked);
    return () => {
      document.removeEventListener("mousedown", outsideClicked);
    };
  }, []);

  const [searchItems, setSearchItems] = React.useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchItems(inputValue);
  };

  const filterItems = HeaderItems?.filter((item: HeaderElementType) => {
    if (searchItems) {
      const lowerCaseTitle = item.title.toLowerCase();
      const lowerCaseSearch = searchItems.toLowerCase();

      const others = item.submenu?.filter((subItem: submenuType) => {
        const lowerCaseSubTitle = subItem.title.toLowerCase();
        return lowerCaseSubTitle.includes(lowerCaseSearch);
      });

      return (others && others.length > 0) || lowerCaseTitle.includes(lowerCaseSearch);
    }
    return true;
  });

  const selectedlang = useRecoilValue(SelectedLanguageState);

  const { data: blogData } = useQuery<BlogType[]>({
    queryKey: ["blogData", selectedlang],
    queryFn: async () => {
      try {
        const response = await axios.get(`${Baseurl}/blogfront`, {
          headers: {
            "Accept-Language": selectedlang,
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

  const filterItemsBlogs =
    blogData && blogData?.length > 0
      ? blogData?.filter((item: BlogType) => {
          if (searchItems) {
            const lowerCaseTitle = item.title.toLowerCase();
            const lowerCaseSearch = searchItems.toLowerCase();

            return lowerCaseTitle.includes(lowerCaseSearch);
          }
          return true;
        })
      : [];

  const navigate = useNavigate();

  const [collapseHeaderItems, setCollapseHeaderItems] = React.useState(false);
  const [collapseAnotherSection, setCollapseAnotherSection] = React.useState(false);

  return (
    <section className={`search-modal ${searchModal ? "active" : ""}`} ref={modalRef}>
      <div className="head-modal">
        <h2>{translations["saytda_axtaris_et_title"]}</h2>
        <IoClose className="closeicon" onClick={() => setSearchModal(false)} />
      </div>

      <div className="search-input">
        <div className="input-area">
          <input type="search" placeholder={translations["search_placeholder_title"]} onChange={handleSearch} />
          <IoSearch className="searchicon" />
        </div>

        <div className="results">
          {/* Header items search result */}
          <div className={`header-item-results ${collapseHeaderItems ? "collapsed" : ""}`}>
            <div
              className="head"
              title="Yığ"
              onClick={() => {
                setCollapseHeaderItems(!collapseHeaderItems);
              }}>
              <span className="name-result">{translations["search_basliqlar_title"]}</span>
              <FaCaretDown className="down" style={{ transform: `${collapseHeaderItems ? "rotate(-180deg)" : ""}` }} />
            </div>
            <div className="results-area">
              {filterItems &&
                filterItems.map((items: HeaderElementType) => (
                  <div className="result-item" key={items.id}>
                    <article
                      className="head-item-title"
                      onClick={() => {
                        navigate(items?.to);
                        setSearchModal(false);
                      }}>
                      <MdLocationSearching className="icon-result" />
                      <span>{items?.title}</span>
                    </article>
                    <div className="submenus">
                      {items.submenu?.map((sub: submenuType) => (
                        <Link
                          onClick={() => setSearchModal(false)}
                          key={sub.to}
                          title={`${sub.title}'a get`}
                          to={sub.to ? sub.to : ""}>
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Another section (future use) */}
          <div className={`another-section-results ${collapseAnotherSection ? "collapsed" : ""}`}>
            <div className="head" title="Yığ" onClick={() => setCollapseAnotherSection(!collapseAnotherSection)}>
              <span className="name-result">{translations["blog_title"]}</span>
              <FaCaretDown
                className="down"
                style={{ transform: `${collapseAnotherSection ? "rotate(-180deg)" : ""}` }}
              />
            </div>
            <div className="results-area-blog">
              {filterItemsBlogs && filterItemsBlogs?.length > 0
                ? filterItemsBlogs.map((items: BlogType, i: number) => (
                    <div
                      className="result-item-blog"
                      key={i}
                      onClick={() => {
                        navigate(`/xeberler/${items?.title.toLowerCase()}`);
                        setSearchModal(false);
                      }}>
                      <article className="head-item-title">
                        <MdLocationSearching className="icon-result" />
                        <span>{items?.title}</span>
                      </article>
                      <div
                        className="description"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(items?.description) }}
                      />
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchModal;
