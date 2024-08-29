import React from "react";
import { PurchaseAnnouncementModalState } from "../routeuitils/purchase/PurchaseSection";
import { PurchAnnInterface } from "../components/features/PurchaseAnnouncements";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../Baseurl";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../recoil/Atoms";
import { useTranslate } from "../context/TranslateContext";
import DOMPurify from "dompurify";

const PurchaseAnnouncementModal: React.FC = () => {
  //purchase modal
  const [purchaseModal, setPurchaseModal] = useRecoilState(PurchaseAnnouncementModalState);

  const { translations } = useTranslate();

  //fetch purchases
  const selectedLang = useRecoilValue(SelectedLanguageState);

  const { data: purchAnnData } = useQuery<PurchAnnInterface[]>({
    queryKey: ["purchAnnData", selectedLang],
    queryFn: async () => {
      try {
        const response = await axios.get(`${Baseurl}/purchaseannouncementfront`, {
          headers: {
            "Accept-Language": selectedLang,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data, "purch ann data");
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    staleTime: 1000000,
  });

  //download pdf for purchases
  const handleDownloadPdf = async (_id: string) => {
    const findUrl: any =
      purchAnnData && purchAnnData?.length > 0
        ? purchAnnData?.find((item: PurchAnnInterface) => {
            return _id === item?._id ? item?.pdf : "";
          })
        : "";
    const url: any = findUrl ? `https://ekol-server-1.onrender.com${findUrl?.pdf}` : "";
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    link.click();
  };

  const purchaseModalRef = React.useRef<HTMLDivElement | null>(null);

  const isPurchaseData: any =
    purchAnnData && purchAnnData?.length > 0
      ? purchAnnData?.find((item: PurchAnnInterface) => {
          return purchaseModal === item?._id;
        })
      : [];

  React.useEffect(() => {
    const outsideClicked = (e: MouseEvent) => {
      if (purchaseModalRef?.current && !purchaseModalRef?.current?.contains(e.target as Node)) {
        setPurchaseModal("");
      }
    };

    document.addEventListener("mousedown", outsideClicked);
    return () => {
      document.removeEventListener("mousedown", outsideClicked);
    };
  }, []);

  return (
    <div className={`purchase-modal ${purchaseModal ? "active" : ""}`} ref={purchaseModalRef}>
      <section className="header-modal">
        <h1
        style={{fontSize: "40px", lineHeight:"normal"}}
        >{isPurchaseData ? isPurchaseData.title : ""}</h1>
        <img src="/close.svg" title="Bağla" alt="close" className="close-icon" onClick={() => setPurchaseModal("")} />
      </section>

      <article className="content-area">
        <div
        className="content-area-texts-announcements"
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            lineHeight: "28px",
            fontSize: "17px",
            textAlign: "start",
          }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(isPurchaseData ? isPurchaseData?.description : "") }}
        />
      </article>

      <button
        className="download-pdf-btn"
        onClick={() => {
          if (isPurchaseData && isPurchaseData._id) {
            handleDownloadPdf(isPurchaseData?._id);
          }
        }}>
        {translations["pdf_yukle_title"]}
      </button>
    </div>
  );
};

export default PurchaseAnnouncementModal;
