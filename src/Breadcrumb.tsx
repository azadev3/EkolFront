import React from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { useTranslate } from './context/TranslateContext';
import { HiArrowNarrowRight } from 'react-icons/hi';

type Props = {
 uri: string | undefined;
 prevpage: string;
 blogTitle?: string;
};

const Breadcrumb: React.FC<Props> = ({ uri, prevpage, blogTitle }) => {
 //If the referral is dynamic images inner;
 const isLocationInnerImage = useMatch('/about/gallery/images/:imagename');
 const navigate = useNavigate();

 const isLocationInnerBlog = useMatch('/xeberler/:blogslug');
 const isLocationInnerLastBlog = useMatch('/xeberler/en-son-xeberler/:lastblogtitle');
 const isLocationBlog = useMatch('/bloq/:newblogtitle');
 const isLocationLastBlog = useMatch('/bloq/en-son-bloqlar/:lastnewblogtitle');
 const isLocationInnerVacation = useMatch('/karyera/:vacid');
 const isServicesInPage = useMatch('/fealiyyet/xidmetler/:innerserviceid');
 const isLocationInnerVacationReq = useMatch('/karyera/:vacid/:reqid');
 const isLocationInnerImagesGallery = useMatch('/about/gallery/images');
 const isLocationInnerImagesGalleryTitle = useMatch('/about/gallery/images/:imagename');
 const isLocationInnerImagesVideos = useMatch('/about/gallery/videos');

 const { translations } = useTranslate();

//  const styleGlobal: React.CSSProperties = {
//   display: '-webkit-box',
//   WebkitLineClamp: 1,
//   WebkitBoxOrient: "vertical",
//   lineClamp: 1,
//   overflow: 'hidden',
//  };

 return (
  <React.Fragment>
   <div className="page-navigator">
    <span className="prevpage" onClick={() => navigate('/')}>
     {prevpage}
    </span>
    <HiArrowNarrowRight />
    {isLocationInnerImagesGallery || isLocationInnerImagesVideos ? (
     <React.Fragment>
      <span
       className="currentpage"
       style={{ textTransform: 'capitalize', cursor: 'pointer', }}
       onClick={() => {
        navigate('/about/gallery');
       }}>
       {translations['nav_haqqimizda_qalereya']}
      </span>
      <HiArrowNarrowRight />
     </React.Fragment>
    ) : null}

    <span
     onClick={() => {
      navigate(isLocationInnerImage ? '/about/gallery/images' : isLocationInnerBlog ? '/xeberler' : '');
      if (uri === translations['nav_haqqimizda_xidmetler']) {
       navigate('/fealiyyet/xidmetler');
      } else if (uri === translations['nav_haqqimizda_xeberler']) {
       navigate('/xeberler');
      } else if (uri === translations['newblog_title']) {
       navigate('/bloq');
      } else if (uri === translations['karyera_imkanlari']) {
       navigate('/karyera');
      }
     }}
     className="currentpage"
     style={{
      cursor:
       uri === translations['nav_haqqimizda_xidmetler'] ||
       uri === translations['nav_haqqimizda_xeberler'] ||
       uri === translations['newblog_title'] ||
       uri === translations['karyera_imkanlari']
        ? 'pointer'
        : 'pointer',
      color: isLocationInnerImage ? 'rgba(0, 0, 0, 0.5019607843)' : '',
     }}>
     {uri === translations['nav_haqqimizda_xidmetler'] ? uri : uri}
    </span>

    {isLocationInnerImagesGalleryTitle ? (
     <React.Fragment>
      <HiArrowNarrowRight />
      <span
       className="currentpage"
       style={{ textTransform: 'capitalize', cursor: 'pointer' }}
       onClick={() => {
        navigate('/about/gallery/images');
       }}>
       {translations['nav_haqqimizda_sekiller']}
      </span>
     </React.Fragment>
    ) : null}

    {isLocationInnerImage ? (
     <React.Fragment>
      <HiArrowNarrowRight />
      <span className="currentpage" style={{ textTransform: 'capitalize', cursor: 'pointer' }}>
       {isLocationInnerImage.params?.imagename}
      </span>
     </React.Fragment>
    ) : isLocationInnerBlog || isLocationInnerLastBlog || isLocationBlog || isLocationLastBlog || isServicesInPage ? (
     <React.Fragment>
      <HiArrowNarrowRight />
      <span className="currentpage" style={{ textTransform: 'capitalize', cursor: 'pointer' }}>
       {blogTitle ? blogTitle : ''}
      </span>
     </React.Fragment>
    ) : isLocationInnerVacation ? (
     <React.Fragment>
      <HiArrowNarrowRight />
      <span className="currentpage" style={{ textTransform: 'capitalize', cursor: 'pointer' }}>
       {isLocationInnerVacation.params?.vacid}
      </span>
     </React.Fragment>
    ) : isLocationInnerVacationReq ? (
     <React.Fragment>
      <HiArrowNarrowRight />
      <span className="currentpage" style={{ textTransform: 'capitalize', cursor: 'pointer' }}>
       {translations['muraciet_et_title']}
      </span>
     </React.Fragment>
    ) : null}
   </div>
  </React.Fragment>
 );
};

export default Breadcrumb;
