import Breadcrumb from "../../Breadcrumb";
import { useTranslate } from "../../context/TranslateContext";
import DOMPurify from "dompurify";

const Page = ({ findedPageData }: { findedPageData: any }) => {
  const { translations } = useTranslate();

  return (
    <section className="page-section-dynamic">
      <div className="page-route">
        <Breadcrumb prevpage={translations["nav_anasehife"]} uri={findedPageData?.path || ""} />
        <div className="container-page">
          <h2>{findedPageData?.title || ""}</h2>
          <div className="image-area" style={{ display: findedPageData?.image && findedPageData?.image.startsWith("/") && findedPageData?.image !== "" ? "flex" : "none" }}>
            <img src={`https://ekol-server-1.onrender.com${findedPageData?.image || ""}`} alt="" />
          </div>

          <div className="description-area" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(findedPageData?.description || "") }} />
        </div>
      </div>
    </section>
  );
};

export default Page;
