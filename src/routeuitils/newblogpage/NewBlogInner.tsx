import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BlogType } from "../home/BlogSection";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";
// import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader";
import { v4 as uuidv4 } from "uuid";
import { useTranslate } from "../../context/TranslateContext";
import { SocialsType } from "../home/Hero";
import { SwiperDataForImagesNewBlog } from "../blog/BlogInnerContent";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { DefaultMeta, MetaDataType } from "../../routes/Home";
import { HelmetTag } from "../../main";

type LastBlogType = {
  _id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
};

const NewBlogInner: React.FC = () => {
  const { translations } = useTranslate();

  const { newblogtitle } = useParams<{ newblogtitle: string }>();
  const selectedlang = useRecoilValue(SelectedLanguageState);
  const navigate = useNavigate();

  // Fetch blog data
  const {
    data: newBlogDatasInner,
    isLoading: blogLoading,
    error: blogError,
  } = useQuery({
    queryKey: ["newBlogDatasInner", selectedlang],
    queryFn: async () => {
      try {
        const response = await axios.get(`${Baseurl}/newblogfront`, {
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
  } = useQuery({
    queryKey: ["lastBlogsForNew", selectedlang],
    queryFn: async () => {
      try {
        const response = await axios.get(`${Baseurl}/lastnewblog`, {
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

  const sortedLastBlog = lastBlogs
    ? [...lastBlogs].sort((a: LastBlogType, b: LastBlogType) => {
      const parseDate = (dateString: string) => {
        const [day, month, year] = dateString.split('.').map(Number);
        return new Date(year, month - 1, day).getTime();
      };

      return parseDate(b.created_at) - parseDate(a.created_at);
    })
    : [];

  //socials
  const { data: SocialsData } = useQuery<SocialsType[]>({
    queryKey: ["socialData"],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/socialsfront`);
      return response.data;
    },
    staleTime: 9000000,
  });

  // Formatted createdAt date
  // const DateDisplay = ({ createdAt }: { createdAt: string }) => {
  //   const formattedDate = moment(createdAt).locale("tr").format("DD MMM YYYY");
  //   return <span>{formattedDate}</span>;
  // };

  const innerBlogItem = newBlogDatasInner?.find((item: BlogType) => item._id === newblogtitle?.toString());
  //open fancybox images
  const [open, setOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number | null>(null);
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setOpen(true); // Lightbox opened
  };


  const { data } = useQuery<SwiperDataForImagesNewBlog[]>({
    queryKey: ["newblogInnerImgKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/newblogimagefront`);
      return response.data;
    },
  });

  const findedImage =
    data &&
    data?.find((item: SwiperDataForImagesNewBlog) => {
      return item?.selected_new_blog === innerBlogItem?._id;
    });


  const { data: MetaData } = useQuery<MetaDataType>({
    queryKey: ['meta_bloqlardaxili_key', selectedlang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-bloqlardaxili-front`, {
        headers: {
          "Accept-Language": selectedlang,
        }
      });
      return res.data[0];
    }
  });
  const hasMeta: MetaDataType = MetaData && Object.values(MetaData)?.length > 0 ? MetaData : DefaultMeta;


  if (blogLoading || lastBlogsLoading) {
    return <Loader />;
  }

  if (blogError || lastBlogsError) {
    return "";
  }

  return (
    <section className="blog-inner-content-section">
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{hasMeta?.meta_title}</title>
        <meta name="title" content={hasMeta?.meta_title} />
        <meta name="description" content={hasMeta?.meta_description} />
        <meta name="generator" content={hasMeta?.meta_generator} />
        <meta name="author" content={hasMeta?.meta_author} />
      </HelmetTag>
      <div className="blogs-inner">
        <Breadcrumb blogTitle={innerBlogItem?.title} prevpage={translations["nav_anasehife"]} uri={translations["newblog_title"]} />

        <div className="container-blogs-inner">
          <h2>{translations["newblog_title"]}</h2>

          <div className="col-blogs-inner">
            <h3>{innerBlogItem?.title}</h3>

            <div className="contents">
              <div className="left">
                <div className="content-inner-blog-image-wrapper" style={{ display: innerBlogItem?.image === "" ? "none" : "flex" }}>
                  <img
                    loading="lazy"
                    src={`https://ekol-server-1.onrender.com${innerBlogItem?.image}`}
                    title={innerBlogItem?.title}
                  />
                </div>

                <div className="description-content">
                  <span className="time-span">
                    {innerBlogItem && innerBlogItem?.created_at}
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
                  {sortedLastBlog && sortedLastBlog?.length > 0
                    ? sortedLastBlog?.map((item: LastBlogType) => (
                      <Link
                        to={`/bloq/en-son-bloqlar/${item._id}`}
                        key={uuidv4()}
                        className="item-last-blog">
                        <div className="title">{item.title}</div>

                        <div className="time-and-icon">
                          <span className="time">
                            {item?.created_at}
                          </span>
                          <img src="/arrow.svg" alt="arrow-icon" />
                        </div>
                      </Link>
                    ))
                    : ""}
                  <div className="button-content">
                    <button className="all-blogs" onClick={() => navigate("/bloq")}>
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
                    {/* <div className="view">
                      <div className="eye-wrap">
                        <img src="/ey.svg" alt="eye" title="Baxışlar" />
                      </div>
                      <p className="view-count">112 baxış</p>
                    </div> */}
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

export default NewBlogInner;
