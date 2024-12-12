import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LuListMinus } from 'react-icons/lu';
import { RiCloseLine } from 'react-icons/ri';
import { useQuery } from '@tanstack/react-query';
import { Baseurl } from '../../Baseurl';
import axios from 'axios';
import { FaAngleDown } from 'react-icons/fa6';
import { useTranslate } from '../../context/TranslateContext';
import Search from './headeruitil/Search';
import { isHomePageState } from '../../App';
import { useRecoilValue } from 'recoil';
import DarkMode from './headeruitil/DarkMode';
import LangMobile from './headeruitil/LangMobile';
import { useDynamicPageData } from '../../UseDynamicPage';

export interface Logo {
 _id: string;
 logo: string;
}

type submenuType = {
 id: any;
 title: string;
 to?: string;
};

type HeaderElementType = {
 id: any;
 title: string;
 to: string;
 icon?: React.JSX.Element | JSX.Element;
 submenu?: submenuType[];
};
const MobileHeader: React.FC = () => {
 const [toggleMenu, setToggleMenu] = React.useState<boolean>(false);

 const handleToggleMenu = () => {
  setToggleMenu((prevMenu) => !prevMenu);
 };

 const { translations } = useTranslate();

 const [showRehberlik, setShowRehberlik] = React.useState<boolean>(false);
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

 React.useEffect(() => {
  handleCheck();
  handleCheckPurchase();
  handleCheckCarier();
 }, [showRehberlik, showPurchase, showCarier]);

 const { DynamicPageData } = useDynamicPageData();
 const hasRoutes = DynamicPageData && DynamicPageData?.length > 0 ? DynamicPageData : [];

 const dynamicRoutes = hasRoutes?.map((route) => ({
  id: route._id,
  title: route.title,
  to: route.path.startsWith('/') ? route.path : `/${route.path}`,
  dropdown_name: route.dropdown_name,
 }));

 const HeaderItems: HeaderElementType[] = [
  // { id: 1, title: `${translations["nav_anasehife"]}`, to: "/" },
  {
   id: 2,
   title: `${translations['nav_haqqimizda']}`,
   to: '',
   icon: <FaAngleDown className="down-icon" />,
   submenu: [
    { id: 1, title: `${translations['nav_haqqimizda_bizkimik']}`, to: '/about' },
    { id: 23456789, title: `${translations['nav_haqqimizda_rehberlik']}`, to: '/about/leadership' },
    { id: 3, title: `${translations['nav_haqqimizda_struktur']}`, to: '/about/structure' },
    { id: 5, title: `${translations['nav_haqqimizda_sertifikatlar']}`, to: '/about/certificates' },
    { id: 6, title: `${translations['nav_haqqimizda_partnyorlar']}`, to: '/about/partners' },
    { id: 7, title: `${translations['nav_haqqimizda_ourworks']}`, to: '/about/workwedo' },
    { id: 9, title: `${translations['nav_haqqimizda_hesabatlar']}`, to: '/hesabatlar/illikhesabatlar' },
   ],
  },
  {
   id: 3,
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
   id: 5,
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
    // {
    //   id: 3,
    //   title: `${translations["nav_haqqimizda_sosialheyat"]}`,
    //   to: "/fealiyyet/sosialheyat",
    // },
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
   id: 6,
   title: `${translations['nav_haqqimizda_elaqe']}`,
   to: '/',
   icon: <FaAngleDown className="down-icon" />,
   submenu: [
    { id: 888, title: `${translations['nav_haqqimizda_cariers']}`, to: '/karyera' },
    { id: 4343, title: `${translations['nav_haqqimizda_elaqe']}`, to: '/elaqe' },
    {
     id: 2322,
     title: `${translations['sikayetler_proseduru']}`,
     to: '/s_procedure.pdf',
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
   const response = await axios.get(`${Baseurl}/logofront`);
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

  document.addEventListener('mousedown', outsideClicked);
  return () => document.removeEventListener('mousedown', outsideClicked);
 }, []);

 const isHomePage = useRecoilValue(isHomePageState);

 //if open toggle menu on the mobile, remove vertical scrolling
 React.useEffect(() => {
  const body = document.querySelector('body');

  if (body) {
   if (toggleMenu) {
    body.style.overflowY = 'hidden';
   } else {
    body.style.overflowY = 'auto';
   }
  }

  return () => {
   if (body) {
    body.style.overflowY = 'auto';
   }
  };
 }, [toggleMenu]);

 return (
  <div className="mobile-header">
   <div className={`toggle-menu ${toggleMenu ? 'active' : ''}`}>
    <Link to="" className="logo-mobile">
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

    <nav className="left-navigation-mobile" ref={liRef}>
     {HeaderItems?.map((item: HeaderElementType) => (
      <ul
       key={item?.id}
       style={{
        display: item.id === 4 && !showPurchase ? 'none' : 'flex',
       }}>
       <li
        className="links"
        onClick={() => {
         handleDropdownMenu(item?.id);
        }}>
        {item.submenu ? (
         <span className="title-dropdown">{item.title}</span>
        ) : (
         <NavLink to={item?.to}>{item.title}</NavLink>
        )}
        <span style={{ transform: dropdown === item.id ? 'rotate(180deg)' : '' }}>{item.icon}</span>
       </li>
       {dropdown === item.id && item.submenu && (
        <div className="dropdown-menu" ref={dropdownMenuRef}>
         {item?.submenu?.map((item: submenuType) => {
          if (item.id === 23456789 && !showRehberlik) {
           return (
            <NavLink
             style={{ display: 'none' }}
             onClick={() => {
              setDropdown(null), setToggleMenu(false);
             }}
             to={item.to ? item.to : ''}
             key={item?.id}>
             {item.title}
            </NavLink>
           );
          } else if (item.id === 2322) {
           return (
            <NavLink
             onClick={() => {
              setDropdown(null), setToggleMenu(false);
              window.open(item?.to, '_blank');
             }}
             to={''}
             key={item?.id}>
             {item.title}
            </NavLink>
           );
          } else if(item.id === 888 && !showCarier) {
            return (
              <></>
            )
          } else {
           return (
            <NavLink
             onClick={() => {
              setDropdown(null), setToggleMenu(false);
             }}
             to={item.to ? item.to : ''}
             key={item?.id}>
             {item.title}
            </NavLink>
           );
          }
         })}
        </div>
       )}
      </ul>
     ))}
    </nav>

    <div className="lang-and-search-mobile">
     <Search />
     <LangMobile />
     <DarkMode />
    </div>
   </div>
   <Link to="" className="logo-mobile">
    {LogoIcon && LogoIcon.length > 0
     ? LogoIcon.map((logo: Logo) => (
        <img
         key={logo._id}
         src={`https://ekol-server-1.onrender.com${logo.logo}`}
         alt={`${logo._id}-logo`}
         title={logo._id}
        />
       ))
     : ''}{' '}
   </Link>
   {toggleMenu ? (
    <RiCloseLine className="list-icon" onClick={handleToggleMenu} color={isHomePage ? 'white' : 'black'} />
   ) : (
    <LuListMinus className="list-icon" onClick={handleToggleMenu} color={isHomePage ? 'white' : 'black'} />
   )}
  </div>
 );
};

export default MobileHeader;
