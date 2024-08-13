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
        { id: 4, title: `${translations["nav_haqqimizda_lisenziyalar"]}`, to: "/about/lisanses" },
        { id: 5, title: `${translations["nav_haqqimizda_sertifikatlar"]}`, to: "/about/certificates" },
        { id: 6, title: `${translations["nav_haqqimizda_partnyorlar"]}`, to: "/about/partners" },
        { id: 7, title: `${translations["nav_haqqimizda_ourworks"]}`, to: "/about/workwedo" },
        { id: 8, title: `${translations["nav_haqqimizda_cariers"]}`, to: "/karyera" },
        { id: 9, title: `${translations["nav_haqqimizda_hesabatlar"]}`, to: "/hesabatlar" },
      ],
    },
    {
      id: 3,
      title: `${translations["nav_haqqimizda_fealiyyet"]}`,
      to: "/",
      icon: <FaAngleDown className="down-icon" />,
      submenu: [
        {
          id: 1,
          title: `${translations["nav_haqqimizda_sosialheyat"]}`,
          to: "/fealiyyet/sosialheyat",
        },
        {
          id: 2,
          title: `${translations["nav_haqqimizda_avadanliqlar"]}`,
          to: "/fealiyyet/avadanliqlar",
        },
        {
          id: 3,
          title: `${translations["nav_haqqimizda_xidmetler"]}`,
          to: "/fealiyyet/xidmetler",
        },
      ],
    },
    {
      id: 4,
      title: `${translations["nav_haqqimizda_satinalma"]}`,
      to: "/satinalma",
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
      ],
    },
    { id: 6, title: `${translations["nav_haqqimizda_elaqe"]}`, to: "/elaqe" },
  ];

  // FETCH LOGO
  const { data: LogoIcon } = useQuery({
    queryKey: ["logoIconKey"],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/logo`);
      console.log(response.data, "logo");
      return response.data;
    },
    staleTime: 900000,
  });

  const [dropdown, setDropdown] = React.useState<number | null>(null);

  const handleDropdownMenu = (id: number | null) => {
    setDropdown((prevDropdown) => (prevDropdown ? null : id));
  };

  const dropdownMenuRef = React.useRef<HTMLDivElement | null>(null);
  const liRef = React.useRef<any>(null);

  React.useEffect(() => {
    const outsideClicked = (e: MouseEvent) => {
      const hasLi = liRef.current && !liRef.current.contains(e.target as Node);
      if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(e.target as Node) && hasLi) {
        setDropdown(null);
      }
    };

    document.addEventListener("mousedown", outsideClicked);
    return () => document.removeEventListener("mousedown", outsideClicked);
  }, []);

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
                  src={`https://ekol-server.onrender.com${logo.logo}`}
                  alt={`${logo._id}-logo`}
                  title={logo._id}
                />
              ))
            : ""}
        </Link>

        <nav className="left-navigation" ref={liRef}>
          {HeaderItems?.map((item: HeaderElementType) => (
            <ul key={item?.id}>
              <li className="links" onClick={() => handleDropdownMenu(item?.id)}>
                {item.submenu ? (
                  <span className="title-dropdown">{item.title}</span>
                ) : (
                  <NavLink to={item?.to}>{item.title}</NavLink>
                )}
                <span style={{ transform: dropdown === item.id ? "rotate(180deg)" : "" }}>{item.icon}</span>
              </li>
              {dropdown === item.id && item.submenu && (
                <div className="dropdown-menu" ref={dropdownMenuRef}>
                  {item?.submenu?.map((item: submenuType) => (
                    <NavLink onClick={() => setDropdown(null)} to={item.to ? item.to : ""} key={item?.id}>
                      {item.title}
                    </NavLink>
                  ))}
                </div>
              )}
            </ul>
          ))}
        </nav>

        <section className="right-header-area">
          <div className="language-and-search-button">
            <Search />
            <Language />
          </div>
        </section>
      </div>
      )}
    </header>
  );
};

export default Header;
