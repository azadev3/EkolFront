import React from 'react';
import '../../styles/footer.scss';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Baseurl } from '../../Baseurl';
import axios from 'axios';
import { useTranslate } from '../../context/TranslateContext';
import { Logo } from '../header/MobileHeader';
import { IconType } from '../../routeuitils/home/Contactus';

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
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showPurchase, setShowPurchase] = React.useState<boolean>(false);

  const handleCheckPurchase = async () => {
    try {
      const res = await axios.get(`${Baseurl}/hidden-purchase-front`);
      if (res.data) {
        setShowPurchase(res.data?.showed);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [showCarier, setShowCarier] = React.useState<boolean>(false);

  const handleCheckCarier = async () => {
    try {
      const res = await axios.get(`${Baseurl}/hidden-carier-front`);
      if (res.data) {
        setShowCarier(res.data?.showed);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showSocialLife, setShowSocialLife] = React.useState<boolean>(false);
  const handleCheckSocialLife = async () => {
    try {
      const res = await axios.get(`${Baseurl}/hidden-social-front`);
      if (res.data) {
        setShowSocialLife(res.data?.showed);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showOurworkshome, setShowourworkshome] = React.useState<boolean>(false);
  const handleCheckOurworksHome = async () => {
    try {
      const res = await axios.get(`${Baseurl}/hidden-ourworkshome-front`);
      if (res.data) {
        setShowourworkshome(res.data?.showed);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showAbout, setShowAbout] = React.useState<boolean>(false);
  const handleCheckAbout = async () => {
    try {
      const res = await axios.get(`${Baseurl}/hidden-about-front`);
      if (res.data) {
        setShowAbout(res.data?.showed);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showActivity, setShowActivity] = React.useState<boolean>(false);
  const handleCheckActivity = async () => {
    try {
      const res = await axios.get(`${Baseurl}/hidden-activity-front`);
      if (res.data) {
        setShowActivity(res.data?.showed);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showMedia, setShowMedia] = React.useState<boolean>(false);
  const handleCheckMedia = async () => {
    try {
      const res = await axios.get(`${Baseurl}/hidden-media-front`);
      if (res.data) {
        setShowMedia(res.data?.showed);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showContact, setShowContact] = React.useState<boolean>(false);
  const handleCheckContact = async () => {
    try {
      const res = await axios.get(`${Baseurl}/hidden-contact-front`);
      if (res.data) {
        setShowContact(res.data?.showed);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleCheck();
    handleCheckPurchase();
    handleCheckCarier();
    handleCheckSocialLife();
    handleCheckOurworksHome();
    handleCheckAbout();
    handleCheckActivity();
    handleCheckMedia();
    handleCheckContact();
  }, [showRehberlik, showPurchase, showCarier, showSocialLife, showOurworkshome, showAbout, showActivity, showMedia, showContact]);

  const FooterElements: FooterElementsType[] = [
    {
      id: '222',
      title: `${translations['nav_haqqimizda']}`,
      footerNavItems: [
        {
          id: '101',
          title: `${translations['nav_haqqimizda_bizkimik']}`,
          to: '/about',
        },
        {
          id: '23456789',
          title: `${translations['nav_haqqimizda_rehberlik']}`,
          to: '/about/leadership',
        },
        {
          id: '102',
          title: `${translations['nav_haqqimizda_struktur']}`,
          to: '/about/structure',
        },
        {
          id: '103',
          title: `${translations['nav_haqqimizda_sertifikatlar']}`,
          to: '/about/certificates',
        },
        {
          id: '104',
          title: `${translations['nav_haqqimizda_partnyorlar']}`,
          to: '/about/partners',
        },
        {
          id: '777',
          title: `${translations['nav_haqqimizda_ourworks']}`,
          to: '/about/workwedo',
        },
        { id: '105', title: `${translations['nav_haqqimizda_hesabatlar']}`, to: '/hesabatlar/illikhesabatlar' },
      ],
    },
    {
      id: '333',
      title: `${translations['nav_haqqimizda_fealiyyet']}`,
      footerNavItems: [
        {
          id: '106',
          title: `${translations['nav_haqqimizda_avadanliqlar']}`,
          to: '/fealiyyet/avadanliqlar',
        },
        {
          id: '107',
          title: `${translations['nav_haqqimizda_xidmetler']}`,
          to: '/fealiyyet/xidmetler',
        },
      ],
    },
    {
      id: 's1s1s1',
      title: `${translations['nav_haqqimizda_satinalma']}`,
      footerNavItems: [
        { id: '108', title: `${translations['nav_haqqimizda_satinalma_elanlari']}`, to: '/satinalmaelanlari' },
        { id: '109', title: `${translations['nav_haqqimizda_satinalma_qaydalari']}`, to: '/satinalmaqaydalari' },
        { id: '110', title: `${translations['nav_haqqimizda_satinalma_elaqe']}`, to: '/satinalma_elaqe' },
      ],
    },
    {
      id: '999',
      title: `${translations['nav_media']}`,
      footerNavItems: [
        {
          id: '111',
          title: `${translations['nav_haqqimizda_xeberler']}`,
          to: '/xeberler',
        },
        {
          id: '112',
          title: `${translations['nav_haqqimizda_qalereya']}`,
          to: '/about/gallery',
        },
        {
          id: 'socialid',
          title: `${translations['nav_haqqimizda_sosialheyat']}`,
          to: '/fealiyyet/sosialheyat',
        },
        {
          id: '113',
          title: `${translations['newblog_title']}`,
          to: '/bloq',
        },
        {
          id: '114',
          title: `${translations['carbon_calculate']}`,
          to: '/carbon_calculate',
        },
      ],
    },
    {
      id: '299',
      title: `${translations['nav_haqqimizda_elaqe']}`,
      footerNavItems: [
        { id: '888', title: `${translations['nav_haqqimizda_cariers']}`, to: '/karyera' },
        {
          id: '115',
          title: `${translations['nav_haqqimizda_elaqe']}`,
          to: '/elaqe',
        },
        {
          id: 'procedur_id',
          title: `${translations['sikayetler_proseduru']}`,
          to: '/s_procedure.pdf',
        },
      ],
    },
    {
      id: '116',
      title: `${translations['nav_bizi_izle']}`,
      footerNavItems: [
        {
          id: '117',
          title: '/instawhite.svg',
        },
        {
          id: '118',
          title: '/facewhite.svg',
        },
        {
          id: '119',
          title: '/linkedinwhite.svg',
        },
        {
          id: '120',
          title: '/wpwhite.svg',
        },
      ],
    },
  ];
  //socials
  const { data: SocialsData } = useQuery<IconType[]>({
    queryKey: ['socialDataFooter'],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/get-icon-footer`);
      return response.data;
    },
    staleTime: 900000,
  });

  // FETCH LOGO
  const { data: LogoIcon } = useQuery({
    queryKey: ['logoIconKey'],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/logofront`);
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
                ? LogoIcon.map((logo: Logo, i: number) => (
                  <img
                    key={i}
                    src={`https://ekol-server-1.onrender.com${logo.logo}`}
                    alt={`${logo._id}-logo`}
                    title={logo._id}
                  />
                ))
                : ''}
            </Link>
            <p className="footer-description">{translations['footer_paragraph_text']}</p>
          </article>

          <nav className="footer-navigations">
            {FooterElements.map((item: FooterElementsType, index: number) => {
              if (index !== 5) {
                return (
                  <div
                    style={{
                      display: item.id === 's1s1s1' && !showPurchase ? 'none' : item.id === '222' && !showAbout ? 'none' : item.id === '333' && !showActivity ? 'none' : item.id === '999' && !showMedia ? 'none' : item.id === '299' && !showContact ? 'none' : 'flex',
                    }}
                    key={index}
                    className="footer-nav-link-content">
                    <h4 className="title-nav">{item.title}</h4>
                    <div className="links-nav">
                      {item?.footerNavItems?.map((links: FooterNavLinkType) => {
                        if (links?.id === '23456789' && !showRehberlik) {
                          return (
                            <Link style={{ display: 'none' }} key={links?.id} to={links.to ? links.to : ''} className="link">
                              {links.title}
                            </Link>
                          );
                        } else if (links?.id === 'procedur_id') {
                          return (
                            <div
                              key={links?.id}
                              onClick={() => {
                                window.open(links?.to, '_blank');
                              }}
                              className="link">
                              {links.title}
                            </div>
                          );
                        } else if (links?.id === '888' && !showCarier) {
                          return;
                        } else if (links?.id === 'socialid' && !showSocialLife) {
                          return;
                        } else if (links?.id === '777' && !showOurworkshome) {
                          return;
                        } else {
                          return (
                            <Link key={links?.id} to={links.to ? links.to : ''} className="link">
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
                  <div
                    style={{
                      display: item.id === 's1s1s1' && !showPurchase ? 'none' : 'flex',
                    }}
                    key={item?.id}
                    className="footer-nav-link-content">
                    <div className="links-nav-social">
                      {SocialsData.map((links: IconType, i: number) => (
                        <Link style={{ backgroundColor: links?.color || '' }} target="_blank" key={i} to={links?.url} className="link-social">
                          <img
                            src={`https://ekol-server-1.onrender.com/public/${links?.icon}`}
                            alt={`${links._id}-icon`}
                            title={links.url}
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
          <p className="footer-title">{translations['footer_bottom_title']}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
