import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useTranslate } from "./context/TranslateContext";
import { HiArrowNarrowRight } from "react-icons/hi";

type Props = {
  uri: string | undefined;
  prevpage: string;
};

const Breadcrumb: React.FC<Props> = ({ uri, prevpage }) => {
  //If the referral is dynamic images inner;
  const isLocationInnerImage = useMatch("/about/gallery/images/:imagename");
  const navigate = useNavigate();

  const isLocationInnerBlog = useMatch("/xeberler/:blogslug");
  const isLocationInnerVacation = useMatch("/karyera/:vacid");
  const isLocationInnerVacationReq = useMatch("/karyera/:vacid/:reqid");

  const { translations } = useTranslate();

  return (
    <React.Fragment>
      <div className="page-navigator">
        <span className="prevpage" onClick={() => navigate("/")}>
          {prevpage}
        </span>
        <HiArrowNarrowRight />
        <span
          onClick={() =>
            navigate(isLocationInnerImage ? "/about/gallery/images" : isLocationInnerBlog ? "/xeberler" : "")
          }
          className="currentpage"
          style={{ color: isLocationInnerImage ? "rgba(0, 0, 0, 0.5019607843)" : "" }}>
          {uri}
        </span>
        {isLocationInnerImage ? (
          <React.Fragment>
            <span className="dot"></span>
            <span className="currentpage" style={{ textTransform: "capitalize" }}>
              {isLocationInnerImage.params?.imagename}
            </span>
          </React.Fragment>
        ) : isLocationInnerBlog ? (
          <React.Fragment>
            <span className="dot"></span>
            <span className="currentpage" style={{ textTransform: "capitalize" }}>
              {isLocationInnerBlog.params?.blogslug}
            </span>
          </React.Fragment>
        ) : isLocationInnerVacation ? (
          <React.Fragment>
            <span className="dot"></span>
            <span className="currentpage" style={{ textTransform: "capitalize" }}>
              {isLocationInnerVacation.params?.vacid}
            </span>
          </React.Fragment>
        ) : isLocationInnerVacationReq ? (
          <React.Fragment>
            <span className="dot"></span>
            <span className="currentpage" style={{ textTransform: "capitalize" }}>
              {translations['muraciet_et_title']}
            </span>
          </React.Fragment>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default Breadcrumb;
