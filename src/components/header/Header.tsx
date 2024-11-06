import React from "react";
import { Link, NavLink } from "react-router-dom";
import Search from "./headeruitil/Search";
import Language from "./headeruitil/Language";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { useTranslate } from "../../context/TranslateContext";
import { FaAngleDown } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { isMobileState } from "../../recoil/Atoms";
import MobileHeader from "./MobileHeader";
import ShareButton from "./headeruitil/ShareButton";
import DarkMode from "./headeruitil/DarkMode";

export interface Logo {
  _id: string;
  logo: string;
}

export type submenuType = {
  id: number;
  title: string;
  to?: string;
};

export type HeaderElementType = {
  id: number;
  title: string;
  to: string;
  icon?: React.JSX.Element | JSX.Element;
  submenu?: submenuType[];
};

const Header: React.FC = () => {
  const { translations } = useTranslate();

  const [showRehberlik, setShowRehberlik] = React.useState<boolean>(false);
  const handleCheck = async () => {
    try {
      const res = await axios.get(`${Baseurl}/hidden-rehberlik-front`);
      if (res.data) {
        setShowRehberlik(res.data?.showed);
        console.log(res.data, "slam");
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    handleCheck();
  }, [showRehberlik]);

  const HeaderItems: HeaderElementType[] = [
    // { id: 1, title: `${translations["nav_anasehife"]}`, to: "/" },
    {
      id: 2,
      title: `${translations["nav_haqqimizda"]}`,
      to: "",
      icon: <FaAngleDown className="down-icon" />,
      submenu: [
        { id: 1, title: `${translations["nav_haqqimizda_bizkimik"]}`, to: "/about" },
        { id: 23456789, title: `${translations["nav_haqqimizda_rehberlik"]}`, to: "/about/leadership" },
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
        // {
        //   id: 3,
        //   title: `${translations["nav_haqqimizda_sosialheyat"]}`,
        //   to: "/fealiyyet/sosialheyat",
        // },
        {
          id: 4,
          title: `${translations["newblog_title"]}`,
          to: "/bloq",
        },
      ],
    },
    {
      id: 6,
      title: `${translations["nav_haqqimizda_elaqe"]}`,
      to: "/",
      icon: <FaAngleDown className="down-icon" />,
      submenu: [
        { id: 8, title: `${translations["nav_haqqimizda_cariers"]}`, to: "/karyera" },
        { id: 4343, title: `${translations["nav_haqqimizda_elaqe"]}`, to: "/elaqe" },
      ],
    },
  ];

  // FETCH LOGO
  const { data: LogoIcon } = useQuery({
    queryKey: ["logoIconKey"],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/logo`);
      return response.data;
    },
    staleTime: 9000000,
  });

  const [dropdownHeader, setDropdownHeader] = React.useState<number | null>(null);

  const handleDropdownMenuHeader = (id: number | null) => {
    setDropdownHeader(id);
  };

  const [isMobile, setIsMobile] = useRecoilState(isMobileState);

  React.useEffect(() => {
    const controlSize = () => {
      if (window.innerWidth <= 968) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    controlSize();

    window.addEventListener("resize", controlSize);
    return () => window.removeEventListener("resize", controlSize);
  }, []);

  return (
    <header className="header-wrapper">
      {isMobile ? (
        <MobileHeader />
      ) : (
        <div className="header">
          <Link to="/" className="logo-header">
            {LogoIcon && LogoIcon.length > 0
              ? LogoIcon.map((logo: Logo) => (
                  <img
                    key={logo._id}
                    src={`https://ekol-server-1.onrender.com${logo.logo}`}
                    alt={`${logo._id}-logo`}
                    title={logo._id}
                  />
                ))
              : ""}
          </Link>

          <nav className="left-navigation">
            {HeaderItems?.map((item: HeaderElementType) => (
              <ul
                key={item?.id}
                onMouseEnter={() => handleDropdownMenuHeader(item?.id)}
                onMouseLeave={() => setDropdownHeader(null)}>
                <li className="links">
                  {item.submenu ? (
                    <span className="title-dropdown">{item.title}</span>
                  ) : (
                    <NavLink to={item?.to}>{item.title}</NavLink>
                  )}
                  <span style={{ transform: dropdownHeader === item.id ? "rotate(180deg)" : "" }}>{item.icon}</span>
                </li>
                {dropdownHeader === item.id && item.submenu && (
                  <div className="dropdown-menu">
                    {item?.submenu?.map((submenuItem: submenuType) => {
                      if (submenuItem.id === 23456789 && !showRehberlik) {
                        return (
                          <NavLink
                            style={{ display: "none" }}
                            onClick={() => setDropdownHeader(null)}
                            to={submenuItem.to ? submenuItem.to : ""}
                            key={submenuItem?.id}>
                            {submenuItem.title}
                          </NavLink>
                        );
                      } else {
                        return (
                          <NavLink
                            onClick={() => setDropdownHeader(null)}
                            to={submenuItem.to ? submenuItem.to : ""}
                            key={submenuItem?.id}>
                            {submenuItem.title}
                          </NavLink>
                        );
                      }
                    })}
                  </div>
                )}
              </ul>
            ))}
          </nav>

          <section className="right-header-area">
            <div className="language-and-search-button">
              <Search />
              <Language />
              <ShareButton />
              <DarkMode />
            </div>
          </section>
        </div>
      )}
    </header>
  );
};

export default Header;
