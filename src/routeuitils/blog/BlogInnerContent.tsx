import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BlogType } from "../home/BlogSection";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader";
import { v4 as uuidv4 } from "uuid";
import { useTranslate } from "../../context/TranslateContext";
import { SocialsType } from "../home/Hero";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { HelmetTag } from "../../main";
// import moment from "moment";

export type SwiperDataForImages = {
  _id: string;
  selected_blog: string;
  images: [string];
};

export type SwiperDataForImagesNewBlog = {
  _id: string;
  selected_new_blog: string;
  images: [string];
};

type LastBlogType = {
  _id: any;
  title: string;
  description: string;
  image: string;
  created_at: string;
  view: string;
};

const BlogInnerContent: React.FC = () => {
  const { translations } = useTranslate();

  const { blogtitle } = useParams<{ blogtitle: string }>();
  const selectedlang = useRecoilValue(SelectedLanguageState);
  const navigate = useNavigate();
  // Fetch blog data
  const {
    data: blogDatas,
    isLoading: blogLoading,
    error: blogError,
    refetch: BlogRefetch,
  } = useQuery({
    queryKey: ["blogDatasInner", selectedlang],
    queryFn: async () => {
      try {
        const response = await axios.get(`${Baseurl}/blogfront`, {
          headers: {
            "Accept-Language": selectedlang,
          },
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    staleTime: 900000,
  });

  // Fetch last blogs
  const {
    data: lastBlogs,
    isLoading: lastBlogsLoading,
    error: lastBlogsError,
  } = useQuery<[]>({
    queryKey: ["lastBlogs", selectedlang],
    queryFn: async () => {
      try {
        const response = await axios.get(`${Baseurl}/lastblogs`, {
          headers: {
            "Accept-Language": selectedlang,
          },
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    staleTime: 900000,
  });

  //socials
  const { data: SocialsData } = useQuery<SocialsType[]>({
    queryKey: ["socialData"],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/socialsfront`);
      return response.data;
    },
    staleTime: 9000000,
  });

  const innerBlogItem: BlogType =
    blogDatas && blogDatas?.find((item: BlogType) => item._id === blogtitle);

  //open fancybox images
  const [open, setOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number | null>(null);
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setOpen(true); // Lightbox opened
  };

  const { data } = useQuery<SwiperDataForImages[]>({
    queryKey: ["blogInnerImgKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/blogimagefront`);
      return response.data;
    },
  });

  const findedImage =
    data &&
    data?.find((item: SwiperDataForImages) => {
      return item?.selected_blog === innerBlogItem?._id;
    });

  const location = useLocation();
  React.useEffect(() => {
    if (innerBlogItem?._id) {
      BlogRefetch();
    }
  }, [innerBlogItem?._id, blogDatas, location?.pathname]);


  const getBlogView = async (id: string) => {
    try {
      const res = await axios.get(`${Baseurl}/blog-viewer/${id}`);
      if (res.data) {
      } else {
        console.log(res.status)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const sortedLastBlogs = lastBlogs && lastBlogs?.sort((a: LastBlogType, b: LastBlogType) => {
    return Number(a.created_at) - Number(b.created_at)
  });


  if (blogLoading || lastBlogsLoading) {
    return <Loader />;
  }

  if (blogError || lastBlogsError) {
    return "Bir problem oldu";
  }

  return (
    <section className="blog-inner-content-section">
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{innerBlogItem?.title || ''}</title>
        <meta name="title" content={innerBlogItem?.title} />
        <meta name="description" content={innerBlogItem?.description} />
        <meta name="generator" content={innerBlogItem?.slogan} />
      </HelmetTag>
      <div className="blogs-inner">
        <Breadcrumb blogTitle={innerBlogItem?.title} prevpage={translations["nav_anasehife"]} uri={translations["nav_haqqimizda_xeberler"]} />

        <div className="container-blogs-inner">
          <h2>{translations["blog_title"]}</h2>

          <div className="col-blogs-inner">
            <h3>{innerBlogItem?.title}</h3>

            <div className="contents">
              <div className="left">
                <div
                  className="content-inner-blog-image-wrapper"
                  style={{ display: innerBlogItem?.image === "" ? "none" : "flex" }}>
                  <img
                    loading="lazy"
                    src={`https://ekol-server-1.onrender.com${innerBlogItem?.image}`}
                    title={innerBlogItem?.title}
                  />
                </div>

                <div className="description-content">
                  <span className="time-span">
                    {innerBlogItem && innerBlogItem.created_at ? innerBlogItem?.created_at : ""}
                  </span>
                  {innerBlogItem && innerBlogItem.description && (
                    <div
                      className="description-area"
                      dangerouslySetInnerHTML={{ __html: innerBlogItem?.description }}
                    />
                  )}
                </div>
                <div className="description-content-images" style={{ display: findedImage ? "flex" : "none" }}>
                  {findedImage && findedImage?.images
                    ? findedImage?.images?.map((imgs, i: number) => (
                      <div className="content-img">
                        <img
                          src={`https://ekol-server-1.onrender.com${imgs}`}
                          alt={`image-${i + 3}`}
                          onClick={() => handleImageClick(i)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    ))
                    : ""}

                  {/* Lightbox */}
                  {currentImageIndex !== null && (
                    <Lightbox
                      plugins={[Zoom]}
                      zoom={{
                        maxZoomPixelRatio: 6,
                        scrollToZoom: true
                      }}
                      open={open}
                      close={() => setOpen(false)}
                      slides={
                        findedImage && findedImage?.images
                          ? findedImage?.images?.map((imgs) => ({ src: `https://ekol-server-1.onrender.com${imgs}` }))
                          : []
                      }
                      index={currentImageIndex}
                    />
                  )}
                </div>
              </div>

              <div className="right">
                <h5>{translations['en_son_xeberler']}</h5>
                <div className="grid-last-blog">
                  {sortedLastBlogs && sortedLastBlogs?.length > 0
                    ? sortedLastBlogs?.map((item: LastBlogType) => (
                      <Link
                        to={`/xeberler/${item._id}`}
                        onClick={() => getBlogView(item?._id || '')}
                        key={uuidv4()}
                        className="item-last-blog">
                        <div className="title">{item.title}</div>
                        <div className="time-and-icon">
                          <span className="time">{item?.created_at}</span>
                          <img src="/arrow.svg" alt="arrow-icon" />
                        </div>
                      </Link>
                    ))
                    : ""}
                  <div className="button-content">
                    <button className="all-blogs" onClick={() => navigate("/xeberler")}>
                      {translations['butun_xeberler']}
                    </button>
                  </div>
                </div>
                <div className="share-post">
                  <span>{translations['xeberi_paylas']}</span>
                  <div className="bottom">
                    <div className="socials">
                      {SocialsData && SocialsData.length > 0
                        ? SocialsData.map((item: SocialsType) => (
                          <Link
                            style={{
                              background: "#30b258",
                              padding: "7px",
                              borderRadius: "100px",
                              minWidth: "30px",
                              width: "30px",
                              height: "30px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                            }}
                            key={item?._id}
                            to={item?.link}
                            className="icon">
                            <img
                              src={`https://ekol-server-1.onrender.com${item?.icon}`}
                              alt={`${item?._id}-icon`}
                              title={item?.link}
                            />
                          </Link>
                        ))
                        : ""}
                    </div>
                    <div className="view">
                      <div className="eye-wrap">
                        <img src="/ey.svg" alt="eye" title="Baxışlar" />
                      </div>
                      <p style={{ paddingLeft: '12px' }}>{innerBlogItem?.view || ''}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogInnerContent;
