import React from "react";
import "../../styles/footer.scss";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import { SocialsType } from "../../routeuitils/home/Hero";
import { useTranslate } from "../../context/TranslateContext";
import { Logo } from "../header/MobileHeader";

type FooterNavLinkType = {
  id: string;
  title: string;
  to?: string;
};

interface FooterElementsType {
  id: string;
  title: string;
  footerNavItems?: FooterNavLinkType[];
}

const Footer: React.FC = () => {
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

  const FooterElements: FooterElementsType[] = [
    {
      id: uuidv4(),
      title: `${translations["nav_haqqimizda"]}`,
      footerNavItems: [
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_bizkimik"]}`,
          to: "/about",
        },
        {
          id: "23456789",
          title: `${translations["nav_haqqimizda_rehberlik"]}`,
          to: "/about/leadership",
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_struktur"]}`,
          to: "/about/structure",
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_sertifikatlar"]}`,
          to: "/about/certificates",
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_partnyorlar"]}`,
          to: "/about/partners",
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_ourworks"]}`,
          to: "/about/workwedo",
        },
        { id: uuidv4(), title: `${translations["nav_haqqimizda_hesabatlar"]}`, to: "/hesabatlar/illikhesabatlar" },
      ],
    },
    {
      id: uuidv4(),
      title: `${translations["nav_haqqimizda_fealiyyet"]}`,
      footerNavItems: [
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_avadanliqlar"]}`,
          to: "/fealiyyet/avadanliqlar",
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_xidmetler"]}`,
          to: "/fealiyyet/xidmetler",
        },
      ],
    },
    {
      id: uuidv4(),
      title: `${translations["nav_haqqimizda_satinalma"]}`,
      footerNavItems: [
        { id: uuidv4(), title: `${translations["nav_haqqimizda_satinalma_elanlari"]}`, to: "/satinalmaelanlari" },
        { id: uuidv4(), title: `${translations["nav_haqqimizda_satinalma_qaydalari"]}`, to: "/satinalmaqaydalari" },
        { id: uuidv4(), title: `${translations["nav_haqqimizda_satinalma_elaqe"]}`, to: "/satinalma_elaqe" },
      ],
    },
    {
      id: uuidv4(),
      title: `${translations["nav_media"]}`,
      footerNavItems: [
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_xeberler"]}`,
          to: "/xeberler",
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_qalereya"]}`,
          to: "/about/gallery",
        },
        // {
        //   id: uuidv4(),
        //   title: `${translations["nav_haqqimizda_sosialheyat"]}`,
        //   to: "/fealiyyet/sosialheyat",
        // },
        {
          id: uuidv4(),
          title: `${translations["newblog_title"]}`,
          to: "/bloq",
        },
      ],
    },
    {
      id: uuidv4(),
      title: `${translations["nav_haqqimizda_elaqe"]}`,
      footerNavItems: [
        { id: uuidv4(), title: `${translations["nav_haqqimizda_cariers"]}`, to: "/karyera" },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_elaqe"]}`,
          to: "/elaqe",
        },
        {
          id: "procedur_id",
          title: `${translations["sikayetler_proseduru"]}`,
          to: "/s_procedure.pdf",
        },
      ],
    },
    {
      id: uuidv4(),
      title: `${translations["nav_bizi_izle"]}`,
      footerNavItems: [
        {
          id: uuidv4(),
          title: "/instawhite.svg",
        },
        {
          id: uuidv4(),
          title: "/facewhite.svg",
        },
        {
          id: uuidv4(),
          title: "/linkedinwhite.svg",
        },
        {
          id: uuidv4(),
          title: "/wpwhite.svg",
        },
      ],
    },
  ];
  //socials
  const { data: SocialsData } = useQuery({
    queryKey: ["socialData"],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/socialsfront`);
      return response.data;
    },
    staleTime: 900000,
  });

  // FETCH LOGO
  const { data: LogoIcon } = useQuery({
    queryKey: ["logoIconKey"],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/logo`);
      return response.data;
    },
    staleTime: 9000000,
  });

  return (
    <footer className="footer-wrapper">
      <div className="footer">
        <div className="top-footer">
          <article className="left-logo-and-description">
            <Link to="/" className="logo-footer">
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
            <p className="footer-description">{translations["footer_paragraph_text"]}</p>
          </article>

          <nav className="footer-navigations">
            {FooterElements.map((item: FooterElementsType, index: number) => {
              if (index !== 5) {
                return (
                  <div key={item.id} className="footer-nav-link-content">
                    <h4 className="title-nav">{item.title}</h4>
                    <div className="links-nav">
                      {item?.footerNavItems?.map((links: FooterNavLinkType) => {
                        if (links?.id === "23456789" && !showRehberlik) {
                          return (
                            <Link
                              style={{ display: "none" }}
                              key={links.id}
                              to={links.to ? links.to : ""}
                              className="link">
                              {links.title}
                            </Link>
                          );
                        } else if (links?.id === "procedur_id") {
                          return (
                            <div
                              key={links.id}
                              onClick={() => {
                                window.open(links?.to, "_blank");
                              }}
                              className="link">
                              {links.title}
                            </div>
                          );
                        } else {
                          return (
                            <Link key={links.id} to={links.to ? links.to : ""} className="link">
                              {links.title}
                            </Link>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              } else if (index === 5 && SocialsData && SocialsData.length > 0) {
                return (
                  <div key={item.id} className="footer-nav-link-content">
                    <div className="links-nav-social">
                      {SocialsData.map((links: SocialsType) => (
                        <Link target="_blank" key={links?._id} to={links?.link} className="link-social">
                          <img
                            src={`https://ekol-server-1.onrender.com${links?.icon}`}
                            alt={`${links._id}-icon`}
                            title={links.link}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </nav>
        </div>

        <div className="bottom-footer">
          <p className="footer-title">{translations["footer_bottom_title"]}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
