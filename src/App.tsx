import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/global.scss";
import "./styles/home.scss";
import "./styles/pages/pages.scss";
import Home from "./routes/Home";
import Footer from "./components/footer/Footer";
import About from "./routes/About";
import Header from "./components/header/Header";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import Blog from "./routes/Blog";
import BlogInner from "./routes/BlogInner";
import Contact from "./routes/Contact";
import Activity from "./routes/Activity";
import Purchase from "./routes/Purchase";
import Carier from "./routes/Carier";
import Calculations from "./routes/Calculations";
import Quarterly from "./routeuitils/calculations/Quarterly";
import Yearly from "./routeuitils/calculations/Yearly";
import LastBlogInner from "./routeuitils/blog/LastBlogInner";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LeadershipModalState } from "./routeuitils/about/Leadership";
import { searchModalState } from "./components/header/headeruitil/Search";
import SearchModal from "./components/header/headeruitil/SearchModal";
import "./styles/responsive.scss";
import PurchaseModal from "./modals/PurchaseModal";
import { PurchaseAnnouncementModalState, PurchaseModalState } from "./routeuitils/purchase/PurchaseSection";
import LeadershipModal from "./modals/LeadershipModal";
import useScroll from "./context/useScroll";
import ScrollHeader from "./ScrollHeader";
import { DarkModeState } from "./components/header/headeruitil/DarkMode";
import NewBlogPage from "./routes/NewBlogPage";
import NewBlogInnerC from "./routes/NewBlogInnerC";
import LastNewBlogInner from "./routeuitils/newblogpage/LastNewBlogInner";
import PurchaseAnnouncements from "./components/features/PurchaseAnnouncements";
import PurchaseRules from "./components/features/PurchaseRules";
import PurchaseAnnouncementModal from "./modals/PurchaseAnnouncementModal";
import PurchaseContact from "./components/features/PurchaseContact";
import CarcbonCalculate from "./routes/CarcbonCalculate";
import { DynamicPageDataType, useDynamicPageData } from "./UseDynamicPage";
import DynamicPage from "./routes/DynamicPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "./Baseurl";
import { HelmetTag } from "./main";
export const isHomePageState = atom<boolean>({
  key: "isHomePageState",
  default: false,
});

const App: React.FC = () => {
  //if location / or homepage route, hidden main header component
  const location = useLocation();

  const [isHomePage, setIsHomePage] = useRecoilState(isHomePageState);
  React.useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/home") {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
  }, [location]);

  //leadership modal
  const leadershipModal = useRecoilValue(LeadershipModalState);

  //search modal
  const [searchModal, _] = useRecoilState(searchModalState);

  const purchaseModal = useRecoilValue(PurchaseModalState);

  const purchaseAnnouncementModal = useRecoilValue(PurchaseAnnouncementModalState);

  const isScrolled = useScroll();

  const [mode, setMode] = useRecoilState(DarkModeState);

  React.useEffect(() => {
    const darkmode = localStorage.getItem("modekol");
    if (darkmode === "true") {
      setMode(true);
    } else {
      setMode(false);
    }
  }, [setMode]);

  React.useEffect(() => {
    localStorage.setItem("modekol", JSON.stringify(mode));
  }, [mode]);

  // DYNAMIC PAGES
  const { DynamicPageData } = useDynamicPageData();

  const { data: faviconFile } = useQuery({
    queryKey: ['favicon_key'],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/get-favicon`);
      return res.data?.favicon;
    }
  });

  const hasFavicon = faviconFile ? faviconFile : '';

  return (
    <div className={`app ${mode ? "dark" : ""}`}>
      <HelmetTag>
        {hasFavicon ? (
          <link rel="icon" type="image/x-icon" href={`https://ekol-server-1.onrender.com${hasFavicon}`} />
        ) : (
          <link rel="icon" type="image/svg+xml" href="/ekol.svg" />
        )}
      </HelmetTag>
      {/* purchase announcement modal (new feature) */}
      <div className={`overlay-purchase-modal ${purchaseAnnouncementModal ? "active" : ""}`}>
        <PurchaseAnnouncementModal />
      </div>

      {/* purchase modal */}
      <div className={`overlay-purchase-modal ${purchaseModal ? "active" : ""}`}>
        <PurchaseModal />
      </div>

      {/* leadership modal */}
      <div className={`overlay-leadership-modal ${leadershipModal ? "active" : ""}`}>
        <LeadershipModal />
      </div>

      {/* search modal */}
      <div className={`search-modal-overlay ${searchModal ? "active" : ""}`}>
        <SearchModal />
      </div>

      <ToastContainer autoClose={2000} pauseOnHover={false} transition={Bounce} />
      {!isHomePage && <Header />}
      {isScrolled ? <ScrollHeader /> : ""}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/*" element={<About />} />
        <Route path="/bloq" element={<NewBlogPage />} />
        <Route path="/bloq/:newblogtitle" element={<NewBlogInnerC />} />
        <Route
          path="/bloq/en-son-bloqlar/:lastnewblogtitle"
          element={
            <div className="last-blog-inner-page">
              <LastNewBlogInner />
            </div>
          }
        />
        <Route path="/xeberler" element={<Blog />} />
        <Route path="/xeberler/:blogtitle" element={<BlogInner />} />
        <Route path="/carbon_calculate" element={<CarcbonCalculate />} />
        <Route
          path="/xeberler/en-son-xeberler/:lastblogtitle"
          element={
            <div className="last-blog-inner-page">
              <LastBlogInner />
            </div>
          }
        />
        <Route path="/elaqe" element={<Contact />} />
        <Route path="/fealiyyet/*" element={<Activity />} />
        <Route path="/satinalma" element={<Purchase />} />
        <Route path="/karyera/*" element={<Carier />} />
        <Route path="/hesabatlar" element={<Calculations />}>
          <Route path="illikhesabatlar" element={<Yearly />} />
          <Route path="rublukhesabatlar" element={<Quarterly />} />
        </Route>

        {/* satinalma elanlari - qaydalari */}
        <Route path="/satinalmaelanlari" element={<PurchaseAnnouncements />} />
        <Route path="/satinalmaqaydalari" element={<PurchaseRules />} />
        <Route path="/satinalma_elaqe" element={<PurchaseContact />} />
        {DynamicPageData && DynamicPageData?.length > 0
          ? DynamicPageData?.map((data: DynamicPageDataType) => (
            <Route key={data?._id} path={"/:pathdynamic"} element={<DynamicPage />} />
          ))
          : null}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
