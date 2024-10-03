import React from "react";
import moment from "moment";
import { PurchaseInterface, PurchaseModalState } from "../routeuitils/purchase/PurchaseSection";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../Baseurl";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../recoil/Atoms";
import { useTranslate } from "../context/TranslateContext";

const PurchaseModal: React.FC = () => {
  //purchase modal
  const [purchaseModal, setPurchaseModal] = useRecoilState(PurchaseModalState);

  const { translations } = useTranslate();

  //fetch purchases
  const selectedLang = useRecoilValue(SelectedLanguageState);
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
    const url: any = findUrl ? `https://ekol-server-1.onrender.com${findUrl?.pdf}` : "";
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    link.click();
  };

  const purchaseModalRef = React.useRef<HTMLDivElement | null>(null);

  const isPurchaseData: any =
    Purchases && Purchases?.length > 0
      ? Purchases?.find((item: PurchaseInterface) => {
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
        <h1>{isPurchaseData ? isPurchaseData.title : ""}</h1>
        <img src="/close.svg" title="Bağla" alt="close" className="close-icon" onClick={() => setPurchaseModal("")} />
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
        {translations["pdf_yukle_title"]}
      </button>
    </div>
  );
};

export default PurchaseModal;
