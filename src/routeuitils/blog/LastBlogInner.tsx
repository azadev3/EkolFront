import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";
// import moment from "moment";
import { useTranslate } from "../../context/TranslateContext";
import { useQuery } from "@tanstack/react-query";
import { SocialsType } from "../home/Hero";
import { SwiperDataForImages } from "./BlogInnerContent";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type LastBlogType = {
  _id?: string;
  title: string;
  description: string;
  image: string;
  created_at: string;
};

const LastBlogInner: React.FC = () => {
  const { lastblogtitle } = useParams<{ lastblogtitle: string }>();
  const selectedlang = useRecoilValue(SelectedLanguageState);

  //formatted created at
  // const DateDisplay = ({ created_at }: any) => {
  //   const formattedDate = moment(created_at).locale("tr").format("DD MMM YYYY");
  //   return formattedDate;
  // };

  //socials
  const { data: SocialsData } = useQuery<SocialsType[]>({
    queryKey: ["socialData"],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/socialsfront`);
      console.log(response.data, "sociaaals");
      return response.data;
    },
    staleTime: 9000000,
  });

  //last blogs
  const [lastBlogs, setLastBlogs] = React.useState<LastBlogType[]>([]);

  const fetchLastBlogs = async () => {
    try {
      const response = await axios.get(`${Baseurl}/lastblogs`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      if (response.data) {
        setLastBlogs(response.data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const lastBlogItem =
  lastBlogs &&
  lastBlogs.find((item: LastBlogType) => {
    return item._id === lastblogtitle;
  });

  React.useEffect(() => {
    fetchLastBlogs();
  }, [selectedlang]);

  const navigate = useNavigate();
  const { translations } = useTranslate();

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
      return item?.selected_blog === lastBlogItem?._id;
    });


  return (
    <section className="last-blog-inner-content-section">
      <div className="blogs-inner">
        <Breadcrumb
          blogTitle={lastBlogItem?.title}
          prevpage={translations["nav_anasehife"]}
          uri={translations["nav_haqqimizda_xeberler"]}
        />

        <div className="container-blogs-inner">
          <h2>{translations["blog_title"]}</h2>

          <div className="col-blogs-inner">
            <h3>{lastBlogItem?.title}</h3>

            <div className="contents">
              <div className="left">
                <div
                  className="content-inner-blog-image-wrapper"
                  style={{ display: lastBlogItem?.image === "" ? "none" : "flex" }}>
                  <img src={`https://ekol-server-1.onrender.com${lastBlogItem?.image}`} title={lastBlogItem?.title} />
                </div>

                <div className="description-content">
                  <span className="time-span">{lastBlogItem ? lastBlogItem.created_at : ""}</span>
                  {lastBlogItem && lastBlogItem.description && (
                    <div className="description-area" dangerouslySetInnerHTML={{ __html: lastBlogItem?.description }} />
                  )}
                </div>

                <div className="description-content-images" style={{ display: findedImage ? "flex" : "flex" }}>
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
                <h5>Ən son xəbərlər</h5>
                <div className="grid-last-blog">
                  {lastBlogs && lastBlogs.length > 0
                    ? lastBlogs?.map((item: LastBlogType) => (
                        <Link
                          to={`/xeberler/en-son-xeberler/${item?._id}`}
                          key={item?._id}
                          className="item-last-blog">
                          <div className="title">{item?.title}</div>

                          <div className="time-and-icon">
                            <span className="time">{item?.created_at ? item?.created_at : ""}</span>
                            <img src="/arrow.svg" alt="arrow-icon" />
                          </div>
                        </Link>
                      ))
                    : ""}
                  <div className="button-content">
                    <button className="all-blogs" onClick={() => navigate("/xeberler")}>
                      Bütün xəbərlər
                    </button>
                  </div>
                </div>
                <div className="share-post">
                  <span>Xəbəri paylaş:</span>
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

export default LastBlogInner;
