import React from "react";
import "../../styles/footer.scss";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import { SocialsType } from "../../routeuitils/home/Hero";
import { useTranslate } from "../../context/TranslateContext";

type FooterNavLinkType = {
  id: string;
  title: string;
  to?: string;
};

interface FooterElementsType {
  id: string;
  title: string;
  footerNavItems: FooterNavLinkType[];
}

const Footer: React.FC = () => {
  const { translations } = useTranslate();

  const FooterElements: FooterElementsType[] = [
    {
      id: uuidv4(),
      title: `${translations["nav_haqqimizda"]}`,
      footerNavItems: [
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_struktur"]}`,
          to: "/about/structure"
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_rehberlik"]}`,
          to: "/about/leadership"
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_lisenziyalar"]}`,
          to: "/about/lisanses"
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_sertifikatlar"]}`,
          to: "/about/certificates",
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_partnyorlar"]}`,
          to: "/about/partners"
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_qalereya"]}`,
          to: "/about/gallery"
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_ourworks"]}`,
          to: "/about/workwedo"
        },
      ],
    },
    {
      id: uuidv4(),
      title: `${translations["nav_haqqimizda_fealiyyet"]}`,
      footerNavItems: [
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_xidmetler"]}`,
          to: "/fealiyyet/xidmetler",
        },
        {
          id: uuidv4(),
          title: `${translations["nav_saheler"]}`,
          to: "/fealiyyet/sosialheyat"
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_avadanliqlar"]}`,
          to: "/fealiyyet/avadanliqlar"
        },
      ],
    },
    {
      id: uuidv4(),
      title: "Xəbərlər",
      footerNavItems: [
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_satinalma"]}`,
          to: "/satinalma"
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_sosialheyat"]}`,
          to: "/fealiyyet/sosialheyat"
        },
        {
          id: uuidv4(),
          title: `${translations["blog_title"]}`,
          to: "/xeberler"
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_cariers"]}`,
          to: "/karyera"
        },
      ],
    },
    {
      id: uuidv4(),
      title: `${translations["nav_diger_kecidler"]}`,
      footerNavItems: [
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_satinalma"]}`,
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_hesabatlar"]}`,
        },
        {
          id: uuidv4(),
          title: `${translations["nav_haqqimizda_elaqe"]}`,
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

  return (
    <footer className="footer-wrapper">
      <div className="footer">
        <div className="top-footer">
          <article className="left-logo-and-description">
            <Link to="/" className="logo-footer">
              <img src="../footerlogo.svg" alt="Footerlogo" title="Ekol" />
            </Link>
            <p className="footer-description">{translations["footer_paragraph_text"]}</p>
          </article>

          <nav className="footer-navigations">
            {FooterElements.map((item: FooterElementsType, index: number) => {
              if (index !== 4) {
                return (
                  <div key={item.id} className="footer-nav-link-content">
                    <h4 className="title-nav">{item.title}</h4>
                    <div className="links-nav">
                      {item.footerNavItems.map((links: FooterNavLinkType) => (
                        <Link key={links.id} to={links.to ? links.to : ""} className="link">
                          {links.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              } else if (index === 4 && SocialsData && SocialsData.length > 0) {
                return (
                  <div key={item.id} className="footer-nav-link-content">
                    <h4 className="title-nav">{item.title}</h4>
                    <div className="links-nav-social">
                      {SocialsData.map((links: SocialsType) => (
                        <Link target="_blank" key={links._id} to={links.link} className="link-social">
                          <img
                            src={`https://ekol-server-1.onrender.com${links.icon}`}
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
