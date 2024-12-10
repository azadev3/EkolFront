import { IoClose, IoSearch } from 'react-icons/io5';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchModalState } from './Search';
import React, { ChangeEvent } from 'react';
import { useTranslate } from '../../../context/TranslateContext';
import { HeaderElementType, submenuType } from '../Header';
import { FaAngleDown } from 'react-icons/fa6';
import { Baseurl } from '../../../Baseurl';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { OurWorksInnerInterface } from '../../../routeuitils/about/OurWorks';
import { useQuery } from '@tanstack/react-query';
import { SelectedLanguageState } from '../../../recoil/Atoms';
import { CalculationsDataType } from '../../../routeuitils/calculations/Yearly';
import { ToolsInnerInterface } from '../../../routeuitils/activity/Tools';
import { ServicesContentType } from '../../../routeuitils/activity/ServicesActivity';
import { PurchAnnInterface } from '../../features/PurchaseAnnouncements';
import { BlogType } from '../../../routeuitils/home/BlogSection';

const SearchModal = () => {
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
 React.useEffect(() => {
  handleCheck();
 }, [showRehberlik]);

 const HeaderItems: HeaderElementType[] = [
  { id: 1, title: `${translations['nav_anasehife']}`, to: '/' },
  {
   id: 2,
   title: `${translations['nav_haqqimizda']}`,
   to: '',
   icon: <FaAngleDown className="down-icon" />,
   submenu: [
    {
     id: 1,
     title: `${translations['nav_haqqimizda_bizkimik']}`,
     to: '/about',
    },
    {
     id: 33444433,
     title: `${translations['nav_haqqimizda_rehberlik']}`,
     to: '/about/leadership',
    },
    {
     id: 3,
     title: `${translations['nav_haqqimizda_struktur']}`,
     to: '/about/structure',
    },
    {
     id: 5,
     title: `${translations['nav_haqqimizda_sertifikatlar']}`,
     to: '/about/certificates',
    },
    {
     id: 6,
     title: `${translations['nav_haqqimizda_partnyorlar']}`,
     to: '/about/partners',
    },
    {
     id: 7,
     title: `${translations['nav_haqqimizda_ourworks']}`,
     to: '/about/workwedo',
    },
    {
     id: 9,
     title: `${translations['nav_haqqimizda_hesabatlar']}`,
     to: '/hesabatlar/illikhesabatlar',
    },
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
    {
     id: 8,
     title: `${translations['nav_haqqimizda_cariers']}`,
     to: '/karyera',
    },
   ],
  },

  {
   id: 4,
   title: `${translations['nav_haqqimizda_satinalma']}`,
   to: '',
   icon: <FaAngleDown className="down-icon" />,
   submenu: [
    {
     id: 1,
     title: `${translations['nav_haqqimizda_satinalma_elanlari']}`,
     to: '/satinalmaelanlari',
    },
    {
     id: 2,
     title: `${translations['nav_haqqimizda_satinalma_qaydalari']}`,
     to: '/satinalmaqaydalari',
    },
    {
     id: 3,
     title: `${translations['nav_haqqimizda_satinalma_elaqe']}`,
     to: '/satinalma_elaqe',
    },
   ],
  },
  {
   id: 5,
   title: 'Media',
   to: '/',
   icon: <FaAngleDown className="down-icon" />,
   submenu: [
    {
     id: 1,
     title: `${translations['nav_haqqimizda_xeberler']}`,
     to: '/xeberler',
    },
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
   ],
  },
  { id: 6, title: `${translations['nav_haqqimizda_elaqe']}`, to: '/elaqe' },
 ];

 const [searchModal, setSearchModal] = useRecoilState(searchModalState);

 const modalRef = React.useRef<HTMLDivElement | null>(null);
 React.useEffect(() => {
  const outsideClicked = (e: MouseEvent) => {
   if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
    setSearchModal(false);
   }
  };

  document.addEventListener('mousedown', outsideClicked);
  return () => {
   document.removeEventListener('mousedown', outsideClicked);
  };
 }, [setSearchModal]);

 //highlighted function for search query results
 const getHighlightedText = (text: string, query: string) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
   regex.test(part) ? (
    <span key={index} style={{ backgroundColor: 'green', padding: '0 2px', fontWeight: '400', letterSpacing: '0.5px', color: 'white' }}>
     {part}
    </span>
   ) : (
    part
   )
  );
 };

 const [searchQuery, setSearchQuery] = React.useState<string>('');

 const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value);
 };

 const lang = useRecoilValue(SelectedLanguageState);
 const [headerSearchResult, setHeaderSearchResult] = React.useState<HeaderElementType[]>([]);
 const [ourWorksInnerResult, setOurWorksInnerResult] = React.useState<OurWorksInnerInterface[]>([]);
 const [yearlyCalcResult, setYearlyCalcResult] = React.useState<CalculationsDataType[]>([]);
 const [toolsInnerResult, setToolsInnerResult] = React.useState<ToolsInnerInterface[]>([]);
 const [servicesResult, setServicesResult] = React.useState<ServicesContentType[]>([]);
 const [purchaseResult, setPurchaseResult] = React.useState<PurchAnnInterface[]>([]);
 const [blogResult, setBlogResult] = React.useState<BlogType[]>([]);

 //our works
 const { data: OurWorksInnerData } = useQuery<OurWorksInnerInterface[]>({
  queryKey: ['ourWorksInnerDataKey', lang],
  queryFn: async () => {
   const response = await axios.get(`${Baseurl}/ourworksinnerfront`, {
    headers: {
     'Accept-Language': lang,
    },
   });
   return response.data;
  },
  staleTime: 1000000,
 });

 //yearly calculations
 const { data: yearlyCalculationsData } = useQuery<CalculationsDataType[]>({
  queryKey: ['yearlyKey', lang],
  queryFn: async () => {
   const response = await axios.get(`${Baseurl}/yearly_calculationsfront`, {
    headers: {
     'Accept-Language': lang,
    },
   });
   return response.data;
  },
  staleTime: 2000000,
 });

 //tools inner
 const { data: ToolsInnerData } = useQuery<ToolsInnerInterface[]>({
  queryKey: ['toolsInnerDataKey', lang],
  queryFn: async () => {
   const response = await axios.get(`${Baseurl}/toolsinnerfront`, {
    headers: {
     'Accept-Language': lang,
    },
   });
   return response.data;
  },
  staleTime: 1000000,
 });

 //services data
 const { data: servicesPageData } = useQuery<ServicesContentType[]>({
  queryKey: ['servicesPageDataKey', lang],
  queryFn: async () => {
   const response = await axios.get(`${Baseurl}/servicespagefront`, {
    headers: {
     'Accept-Language': lang,
    },
   });
   return response.data;
  },
  staleTime: 1000000,
 });

 //purchase announcements
 const { data: purchAnnData } = useQuery<PurchAnnInterface[]>({
  queryKey: ['purchAnnData', lang],
  queryFn: async () => {
   try {
    const response = await axios.get(`${Baseurl}/purchaseannouncementfront`, {
     headers: {
      'Accept-Language': lang,
      'Content-Type': 'multipart/form-data',
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

 //blogs
 const { data: blogData } = useQuery<BlogType[]>({
  queryKey: ['blogData', lang],
  queryFn: async () => {
   try {
    const response = await axios.get(`${Baseurl}/blogfront`, {
     headers: {
      'Accept-Language': lang,
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

 React.useEffect(() => {
  if (searchQuery) {
   const matchedHeaderItems = HeaderItems.filter((element) => element.submenu?.some((sub) => sub.title.toLowerCase().includes(searchQuery)));

   const matchedOurworkItems =
    OurWorksInnerData && OurWorksInnerData?.length > 0
     ? OurWorksInnerData?.filter((data: OurWorksInnerInterface) => {
        return data.title.toLowerCase().includes(searchQuery.toLowerCase());
       })
     : [];

   const matchedYearlyCalcs =
    yearlyCalculationsData && yearlyCalculationsData?.length > 0
     ? yearlyCalculationsData?.filter((data: CalculationsDataType) => {
        return data.title.toLowerCase().includes(searchQuery.toLowerCase()) || data.title.toUpperCase().includes(searchQuery.toUpperCase());
       })
     : [];

   const matchedToolsInnerData =
    ToolsInnerData && ToolsInnerData?.length > 0
     ? ToolsInnerData?.filter((data: ToolsInnerInterface) => {
        return data.title.toLowerCase().includes(searchQuery.toLowerCase()) || data.title.toUpperCase().includes(searchQuery.toUpperCase());
       })
     : [];

   const matchedServicesData =
    servicesPageData && servicesPageData?.length > 0
     ? servicesPageData?.filter((data: ServicesContentType) => {
        return data.title.toLowerCase().includes(searchQuery.toLowerCase()) || data.title.toUpperCase().includes(searchQuery.toUpperCase());
       })
     : [];

   const matchedPurchaseData =
    purchAnnData && purchAnnData?.length > 0
     ? purchAnnData?.filter((data: PurchAnnInterface) => {
        return data.title.toLowerCase().includes(searchQuery.toLowerCase()) || data.title.toUpperCase().includes(searchQuery.toUpperCase());
       })
     : [];

   const matchedBlogData =
    blogData && blogData?.length > 0
     ? blogData?.filter((data: BlogType) => {
        return data.title.toLowerCase().includes(searchQuery.toLowerCase()) || data.title.toUpperCase().includes(searchQuery.toUpperCase());
       })
     : [];

   setServicesResult(matchedServicesData);
   setHeaderSearchResult(matchedHeaderItems);
   setOurWorksInnerResult(matchedOurworkItems);
   setYearlyCalcResult(matchedYearlyCalcs);
   setToolsInnerResult(matchedToolsInnerData);
   setPurchaseResult(matchedPurchaseData);
   setBlogResult(matchedBlogData);
  } else {
   setHeaderSearchResult([]);
  }
 }, [searchQuery]);

 const checkIfHeaderResultFinded = headerSearchResult && headerSearchResult.length > 0 ? headerSearchResult : [];
 const checkIfOurworksResultFinded = ourWorksInnerResult && ourWorksInnerResult.length > 0 ? ourWorksInnerResult : [];
 const checkIfYearlyCalcResultFinded = yearlyCalcResult && yearlyCalcResult?.length > 0 ? yearlyCalcResult : [];
 const checkIfToolsInnerResultFinded = toolsInnerResult && toolsInnerResult?.length > 0 ? toolsInnerResult : [];
 const checkIfServicesFinded = servicesResult && servicesResult?.length > 0 ? servicesResult : [];
 const checkIfPurchaseFinded = purchaseResult && purchaseResult?.length > 0 ? purchaseResult : [];
 const checkIfBlogFinded = blogResult && blogResult?.length > 0 ? blogResult : [];

 return (
  <section className={`search-modal ${searchModal ? 'active' : ''}`} ref={modalRef}>
   <div className="head-modal">
    <h2>{translations['saytda_axtaris_et_title']}</h2>
    <IoClose className="closeicon" onClick={() => setSearchModal(false)} />
   </div>

   <div className="search-input">
    <div className="input-area">
     <input value={searchQuery} type="search" placeholder={translations['search_placeholder_title']} onChange={handleSearch} />
     <IoSearch className="searchicon" />
    </div>
    <div className="result-content">
     {searchQuery?.length > 0 ? (
      checkIfHeaderResultFinded?.length ||
      checkIfOurworksResultFinded?.length > 0 ||
      yearlyCalcResult?.length > 0 ||
      checkIfToolsInnerResultFinded?.length > 0 ||
      checkIfServicesFinded?.length > 0 ||
      checkIfPurchaseFinded?.length > 0 ||
      checkIfBlogFinded?.length > 0 ? (
       <div className="results-main">
        {/* header */}
        {checkIfHeaderResultFinded.map((item: HeaderElementType) =>
         item?.submenu?.map((sub: submenuType) => (
          <Link
           className="link-el"
           to={sub?.to || ''}
           onClick={() => {
            setSearchModal(false);
           }}
           key={sub?.id}>
           {getHighlightedText(sub?.title, searchQuery)}
          </Link>
         ))
        )}

        {/* gorduyumuz isler */}
        {checkIfOurworksResultFinded?.length > 0
         ? checkIfOurworksResultFinded?.map((item: OurWorksInnerInterface) => (
            <div className="link-el" key={item?._id}>
             <p>{getHighlightedText(item?.title, searchQuery)}</p>
            </div>
           ))
         : ''}

        {/* illik hesabatlar */}
        {checkIfYearlyCalcResultFinded?.length > 0
         ? checkIfYearlyCalcResultFinded?.map((item: CalculationsDataType) => (
            <div className="link-el" key={item?._id}>
             <p>{getHighlightedText(item?.title, searchQuery)}</p>
            </div>
           ))
         : ''}

        {/* avadanliqlar */}
        {checkIfToolsInnerResultFinded?.length > 0
         ? checkIfToolsInnerResultFinded?.map((item: ToolsInnerInterface) => (
            <div className="link-el" key={item?._id}>
             <p>{getHighlightedText(item?.title, searchQuery)}</p>
            </div>
           ))
         : ''}

        {/* services */}
        {checkIfServicesFinded?.length > 0
         ? checkIfServicesFinded?.map((item: ServicesContentType) => (
            <div className="link-el" key={item?._id}>
             <p>{getHighlightedText(item?.title, searchQuery)}</p>
            </div>
           ))
         : ''}

        {/* satinalma elanlari */}
        {checkIfPurchaseFinded?.length > 0
         ? checkIfPurchaseFinded?.map((item: PurchAnnInterface) => (
            <div className="link-el" key={item?._id}>
             <p>{getHighlightedText(item?.title, searchQuery)}</p>
            </div>
           ))
         : ''}

        {/* blogs */}
        {checkIfBlogFinded?.length > 0
         ? checkIfBlogFinded?.map((item: BlogType) => (
            <div className="link-el" key={item?._id}>
             <p>{getHighlightedText(item?.title, searchQuery)}</p>
            </div>
           ))
         : ''}
       </div>
      ) : (
       <div>Axtardığınız key üzrə nəticə tapılmadı: "{searchQuery}"</div>
      )
     ) : (
      <div>{translations['no_result']}</div>
     )}
    </div>
   </div>
  </section>
 );
};

export default SearchModal;
