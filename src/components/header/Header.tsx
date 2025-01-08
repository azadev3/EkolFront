import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Search from './headeruitil/Search';
import Language from './headeruitil/Language';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Baseurl } from '../../Baseurl';
import { useTranslate } from '../../context/TranslateContext';
import { FaAngleDown } from 'react-icons/fa6';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isMobileState, SelectedLanguageState } from '../../recoil/Atoms';
import MobileHeader from './MobileHeader';
import ShareButton from './headeruitil/ShareButton';
import DarkMode from './headeruitil/DarkMode';
import { useDynamicPageData } from '../../UseDynamicPage';

export interface Logo {
  _id: string;
  logo: string;
}

export type submenuType = {
  id: any;
  title: string;
  to?: string;
};

export type HeaderElementType = {
  id: any;
  title: string;
  to: string;
  icon?: React.JSX.Element | JSX.Element;
  submenu?: submenuType[];
};

const Header: React.FC = () => {
  const { translations } = useTranslate();
  const lang = useRecoilValue(SelectedLanguageState);

  const [showRehberlik, setShowRehberlik] = React.useState<boolean>(false);
  const [showPurchase, setShowPurchase] = React.useState<boolean>(false);
  const [showCarier, setShowCarier] = React.useState<boolean>(false);

  const handleCheck = async () => {
    try {
      const res = await axios.get(`${Baseurl}/hidden-rehberlik-front`);
      if (res.data) {
        setShowRehberlik(res.data?.showed);
        console.log(res.data, 'slam');
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        console.log(res.data, 'slam');
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
  }, [showRehberlik, showPurchase, showCarier, showSocialLife, showAbout, showActivity, showMedia, showContact]);

  const { DynamicPageData } = useDynamicPageData();
  const hasRoute = DynamicPageData && DynamicPageData?.length > 0 ? DynamicPageData : [];

  const dynamicRoutes = hasRoute.map((route) => ({
    id: route._id,
    title: route.title,
    to: route.path.startsWith('/') ? route.path : `/${route.path}`,
    dropdown_name: route.dropdown_name,
  }));

  const { data: ProcedurePdf } = useQuery<string>({
    queryKey: ['procedure_pdf_key', lang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/procedurefront`, {
        headers: {
          "Accept-Language": lang,
        }
      });
      return res.data[0]?.pdf;
    }
  });


  const HeaderItems: HeaderElementType[] = [
    // { id: 1, title: `${translations["nav_anasehife"]}`, to: "/" },
    {
      id: 222,
      title: `${translations['nav_haqqimizda']}`,
      to: '',
      icon: <FaAngleDown className="down-icon" />,
      submenu: [
        { id: 1, title: `${translations['nav_haqqimizda_bizkimik']}`, to: '/about' },
        { id: 23456789, title: `${translations['nav_haqqimizda_rehberlik']}`, to: '/about/leadership' },
        { id: 3, title: `${translations['nav_haqqimizda_struktur']}`, to: '/about/structure' },
        { id: 5, title: `${translations['nav_haqqimizda_sertifikatlar']}`, to: '/about/certificates' },
        { id: 6, title: `${translations['nav_haqqimizda_partnyorlar']}`, to: '/about/partners' },
        { id: 777, title: `${translations['nav_haqqimizda_ourworks']}`, to: '/about/workwedo' },
        { id: 9, title: `${translations['nav_haqqimizda_hesabatlar']}`, to: '/hesabatlar/illikhesabatlar' },
      ],
    },
    {
      id: 333,
      title: `${translations['nav_haqqimizda_fealiyyet']}`,
      to: '/',
      icon: <FaAngleDown className="down-icon" />,
      submenu: [
        {
          id: 32,
          title: `${translations['nav_haqqimizda_avadanliqlar']}`,
          to: '/fealiyyet/avadanliqlar',
        },
        {
          id: 33,
          title: `${translations['nav_haqqimizda_xidmetler']}`,
          to: '/fealiyyet/xidmetler',
        },
      ],
    },
    {
      id: 4,
      title: `${translations['nav_haqqimizda_satinalma']}`,
      to: '',
      icon: <FaAngleDown className="down-icon" />,
      submenu: [
        { id: 1, title: `${translations['nav_haqqimizda_satinalma_elanlari']}`, to: '/satinalmaelanlari' },
        { id: 2, title: `${translations['nav_haqqimizda_satinalma_qaydalari']}`, to: '/satinalmaqaydalari' },
        { id: 3, title: `${translations['nav_haqqimizda_satinalma_elaqe']}`, to: '/satinalma_elaqe' },
      ],
    },
    {
      id: 555,
      title: 'Media',
      to: '/',
      icon: <FaAngleDown className="down-icon" />,
      submenu: [
        { id: 1, title: `${translations['nav_haqqimizda_xeberler']}`, to: '/xeberler' },
        {
          id: 2,
          title: `${translations['nav_haqqimizda_qalereya']}`,
          to: '/about/gallery',
        },
        {
          id: 1000,
          title: `${translations['nav_haqqimizda_sosialheyat']}`,
          to: '/fealiyyet/sosialheyat',
        },
        {
          id: 4,
          title: `${translations['newblog_title']}`,
          to: '/bloq',
        },
        {
          id: 5,
          title: `${translations['carbon_calculate']}`,
          to: '/carbon_calculate',
        },
      ],
    },
    {
      id: 666,
      title: `${translations['nav_haqqimizda_elaqe']}`,
      to: '/',
      icon: <FaAngleDown className="down-icon" />,
      submenu: [
        { id: 888, title: `${translations['nav_haqqimizda_cariers']}`, to: '/karyera' },
        { id: 4343, title: `${translations['nav_haqqimizda_elaqe']}`, to: '/elaqe' },
        {
          id: 2322,
          title: `${translations['sikayetler_proseduru']}`,
          to: `https://ekol-server-1.onrender.com${ProcedurePdf ? ProcedurePdf : ''}`,
        },
      ],
    },
  ];

  dynamicRoutes.forEach((dynamicRoute) => {
    const matchedHeader = HeaderItems.find((item) => item.title === dynamicRoute.dropdown_name);

    if (matchedHeader && matchedHeader.submenu) {
      matchedHeader.submenu.push({
        id: dynamicRoute.id,
        title: dynamicRoute.title,
        to: dynamicRoute.to,
      });
    }
  });

  // FETCH LOGO
  const { data: LogoIcon } = useQuery({
    queryKey: ['logoIconKey'],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/logofront`, {
        headers: {
          Authorization: 'Bearer ',
        },
      });
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

    window.addEventListener('resize', controlSize);
    return () => window.removeEventListener('resize', controlSize);
  }, [setIsMobile]);

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
              : ''}
          </Link>

          <nav className="left-navigation">
            {HeaderItems?.map((item: HeaderElementType) => (
              <ul
                key={item?.id}
                onMouseEnter={() => handleDropdownMenuHeader(item?.id)}
                onMouseLeave={() => setDropdownHeader(null)}>
                <li
                  style={{
                    display: item.id === 4 && !showPurchase ? 'none' : item.id === 222 && !showAbout ? 'none' : item.id === 333 && !showActivity ? 'none' : item.id === 555 && !showMedia ? 'none' : item.id === 666 && !showContact ? 'none' : 'flex',
                  }}
                  className="links">
                  {item.submenu ? (
                    <span className="title-dropdown">{item.title}</span>
                  ) : (
                    <NavLink to={item?.to}>{item.title}</NavLink>
                  )}
                  <span style={{ transform: dropdownHeader === item.id ? 'rotate(180deg)' : '' }}>{item.icon}</span>
                </li>
                {dropdownHeader === item.id && item.submenu && (
                  <div className="dropdown-menu">
                    {item?.submenu?.map((submenuItem: submenuType) => {
                      if (submenuItem.id === 23456789 && !showRehberlik) {
                        return (
                          <NavLink
                            style={{ display: 'none' }}
                            onClick={() => setDropdownHeader(null)}
                            to={submenuItem.to ? submenuItem.to : ''}
                            key={submenuItem?.id}>
                            {submenuItem.title}
                          </NavLink>
                        );
                      } else if (submenuItem.id === 2322) {
                        return (
                          <NavLink
                            onClick={() => {
                              window.open(submenuItem?.to, '_blank');
                              setDropdownHeader(null);
                            }}
                            to={''}
                            key={submenuItem?.id}>
                            {submenuItem.title}
                          </NavLink>
                        );
                      } else if (submenuItem.id === 888 && !showCarier) {
                        return <></>;
                      } else if (submenuItem.id === 1000 && !showSocialLife) {
                        return <></>;
                      } else if (submenuItem.id === 777 && !showOurworkshome) {
                        return <></>
                      } else {
                        return (
                          <NavLink
                            onClick={() => setDropdownHeader(null)}
                            to={submenuItem.to ? submenuItem.to : ''}
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
