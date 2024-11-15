import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useTranslate } from "./context/TranslateContext";
import { HiArrowNarrowRight } from "react-icons/hi";

type Props = {
  uri: string | undefined;
  prevpage: string;
  blogTitle?: string;
};

const Breadcrumb: React.FC<Props> = ({ uri, prevpage, blogTitle }) => {
  //If the referral is dynamic images inner;
  const isLocationInnerImage = useMatch("/about/gallery/images/:imagename");
  const navigate = useNavigate();

  const isLocationInnerBlog = useMatch("/xeberler/:blogslug");
  const isLocationInnerLastBlog = useMatch("/xeberler/en-son-bloglar/:lastblogtitle");
  const isLocationBlog = useMatch("/bloq/:newblogtitle");
  const isLocationLastBlog = useMatch("/bloq/en-son/:lastnewblogtitle");
  const isLocationInnerVacation = useMatch("/karyera/:vacid");
  const isServicesInPage = useMatch("/fealiyyet/xidmetler/:innerserviceid");
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
            <HiArrowNarrowRight />
            <span className="currentpage" style={{ textTransform: "capitalize" }}>
              {isLocationInnerImage.params?.imagename}
            </span>
          </React.Fragment>
        ) : isLocationInnerBlog || isLocationInnerLastBlog || isLocationBlog || isLocationLastBlog || isServicesInPage ? (
          <React.Fragment>
            <HiArrowNarrowRight />
            <span className="currentpage" style={{ textTransform: "capitalize" }}>
              {blogTitle ? blogTitle : ""}
            </span>
          </React.Fragment>
        ) : isLocationInnerVacation ? (
          <React.Fragment>
            <HiArrowNarrowRight />
            <span className="currentpage" style={{ textTransform: "capitalize" }}>
              {isLocationInnerVacation.params?.vacid}
            </span>
          </React.Fragment>
        ) : isLocationInnerVacationReq ? (
          <React.Fragment>
            <HiArrowNarrowRight />
            <span className="currentpage" style={{ textTransform: "capitalize" }}>
              {translations["muraciet_et_title"]}
            </span>
          </React.Fragment>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default Breadcrumb;
