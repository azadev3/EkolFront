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
  const isLocationInnerLastBlog = useMatch("/xeberler/en-son-xeberler/:lastblogtitle");
  const isLocationBlog = useMatch("/bloq/:newblogtitle");
  const isLocationLastBlog = useMatch("/bloq/en-son-bloqlar/:lastnewblogtitle");
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
          onClick={() => {
            navigate(isLocationInnerImage ? "/about/gallery/images" : isLocationInnerBlog ? "/xeberler" : "");
            if (uri === translations["nav_haqqimizda_xidmetler"]) {
              navigate("/fealiyyet/xidmetler");
            } else if (uri === translations["nav_haqqimizda_xeberler"]) {
              navigate("/xeberler");
            } else if (uri === translations["newblog_title"]) {
              navigate("/bloq");
            } else if (uri === translations['karyera_imkanlari']) {
              navigate("/karyera");
            }
          }}
          className="currentpage"
          style={{
            cursor:
              uri === translations["nav_haqqimizda_xidmetler"] || uri === translations["nav_haqqimizda_xeberler"] ||  uri === translations["newblog_title"] || uri === translations["karyera_imkanlari"]
                ? "pointer"
                : "",
            color: isLocationInnerImage ? "rgba(0, 0, 0, 0.5019607843)" : "",
          }}>
          {uri === translations["nav_haqqimizda_xidmetler"] ? uri : uri}
        </span>
        {isLocationInnerImage ? (
          <React.Fragment>
            <HiArrowNarrowRight />
            <span className="currentpage" style={{ textTransform: "capitalize" }}>
              {isLocationInnerImage.params?.imagename}
            </span>
          </React.Fragment>
        ) : isLocationInnerBlog ||
          isLocationInnerLastBlog ||
          isLocationBlog ||
          isLocationLastBlog ||
          isServicesInPage ? (
          <React.Fragment>
            <HiArrowNarrowRight />
            <span className="currentpage" style={{ textTransform: "capitalize", cursor: "pointer" }}>
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
