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
import { PurchaseInterface, PurchaseModalState } from "./routeuitils/purchase/PurchaseSection";
import axios from "axios";
import { Baseurl } from "./Baseurl";
import { SelectedLanguageState } from "./recoil/Atoms";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { LeadershipModalState, Management } from "./routeuitils/about/Leadership";
import DOMPurify from "dompurify";
import { searchModalState } from "./components/header/headeruitil/Search";
import SearchModal from "./components/header/headeruitil/SearchModal";

export const isHomePageState = atom<boolean>({
  key: "isHomePageStateKey",
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

  //purchase modal
  const [purchaseModal, setPurchaseModal] = useRecoilState(PurchaseModalState);

  const selectedLang = useRecoilValue(SelectedLanguageState);

  //fetch purchases
  const { data: Purchases } = useQuery<PurchaseInterface[]>({
    queryKey: ["purchasesKey", selectedLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/purchasefront`, {
        headers: {
          "Accept-Language": selectedLang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  //download pdf for purchases
  const handleDownloadPdf = async (_id: string) => {
    const findUrl: any =
      Purchases && Purchases?.length > 0
        ? Purchases?.find((item: PurchaseInterface) => {
            return _id === item?._id ? item?.pdf : "";
          })
        : "";
    const url: any = findUrl ? `http://localhost:3000${findUrl?.pdf}` : "";
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    link.click();
  };

  //outside click purchases and leadership modal
  const purchaseModalRef = React.useRef<HTMLDivElement | null>(null);
  const leadershipModalRef = React.useRef<HTMLDivElement | null>(null);

  const isPurchaseData: any =
    Purchases && Purchases?.length > 0
      ? Purchases?.find((item: PurchaseInterface) => {
          return purchaseModal === item?._id;
        })
      : [];

  //leadership modal
  const [leadershipModal, setLeadershipModal] = useRecoilState(LeadershipModalState);
  const { data: managementData } = useQuery({
    queryKey: ["managementDataKey", selectedLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/managementfront`, {
        headers: {
          "Accept-Language": selectedLang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  const isLeadershipData: any =
    managementData && managementData?.length > 0
      ? managementData?.find((item: Management) => {
          return leadershipModal === item?._id;
        })
      : [];

  //search modal
  const [searchModal, _] = useRecoilState(searchModalState);

  React.useEffect(() => {
    const outsideClicked = (e: MouseEvent) => {
      if (purchaseModalRef?.current && !purchaseModalRef?.current?.contains(e.target as Node)) {
        setPurchaseModal("");
      }
    };

    const outsideClickedLeaderShip = (e: MouseEvent) => {
      if (leadershipModalRef?.current && !leadershipModalRef?.current?.contains(e.target as Node)) {
        setLeadershipModal("");
      }
    };

    document.addEventListener("mousedown", outsideClicked);
    document.addEventListener("mousedown", outsideClickedLeaderShip);
    return () => {
      document.removeEventListener("mousedown", outsideClicked);
      document.removeEventListener("mousedown", outsideClickedLeaderShip);
    };
  }, []);

  return (
    <div className="app">
      {/* purchase modal */}
      <div className={`overlay-purchase-modal ${purchaseModal ? "active" : ""}`}>
        <div className={`purchase-modal ${purchaseModal ? "active" : ""}`} ref={purchaseModalRef}>
          <section className="header-modal">
            <h1>{isPurchaseData ? isPurchaseData.title : ""}</h1>
            <img
              src="/close.svg"
              title="Bağla"
              alt="close"
              className="close-icon"
              onClick={() => setPurchaseModal("")}
            />
          </section>

          <article className="content-area">
            <div className="date">
              <span>{isPurchaseData ? moment(isPurchaseData?.createdAt).format("LL") : ""}</span>
            </div>

            <p>{isPurchaseData ? isPurchaseData?.description : ""}</p>
          </article>

          <button
            className="download-pdf-btn"
            onClick={() => {
              if (isPurchaseData && isPurchaseData._id) {
                handleDownloadPdf(isPurchaseData?._id);
              }
            }}>
            Pdf yüklə
          </button>
        </div>
      </div>

      {/* leadership modal */}
      <div className={`overlay-leadership-modal ${leadershipModal ? "active" : ""}`}>
        <div className="leadership-modal" ref={leadershipModalRef}>
          <div className="top-profile-and-user-info">
            <div className="profile">
              <img src={isLeadershipData ? `http://localhost:3000${isLeadershipData?.profile}` : ""} alt="" />
            </div>
            <div className="right-description">
              <div className="top">
                <h3>{isLeadershipData ? isLeadershipData?.nameSurname : ""}</h3>
                <p>{isLeadershipData ? isLeadershipData?.job : ""}</p>
              </div>
              <div className="job-and-education">
                <div className="item-education">
                  <div className="icon">
                    <img src="/education.svg" alt="education" />
                  </div>
                  <article className="texts">
                    <span>Təhsil</span>
                    <p>{isLeadershipData ? isLeadershipData?.education : ""}</p>
                  </article>
                </div>
                <div className="item-education">
                  <div className="icon">
                    <img src="/profiession.svg" alt="education" />
                  </div>
                  <article className="texts">
                    <span>İş</span>
                    <p>{isLeadershipData ? isLeadershipData?.job : ""}</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
          {isLeadershipData && isLeadershipData?.description ? (
            <div
              className="description-info"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(isLeadershipData?.description) }}
            />
          ) : (
            <p>Hələ ki, istifadəçi bir açıqlama bildirməyib.</p>
          )}
        </div>
      </div>

      {/* search modal */}
      <div className={`search-modal-overlay ${searchModal ? "active" : ""}`}>
        <SearchModal />
      </div>

      <ToastContainer autoClose={2000} pauseOnHover={false} transition={Bounce} />
      {!isHomePage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/*" element={<About />} />
        <Route path="/xeberler" element={<Blog />} />
        <Route path="/xeberler/:blogtitle" element={<BlogInner />} />
        <Route
          path="/xeberler/en-son-bloglar/:lastblogtitle"
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
          <Route path="rublukhesabatlar" element={<Quarterly />} />
          <Route path="illikhesabatlar" element={<Yearly />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
