import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BlogType } from "../home/BlogSection";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader";
import { v4 as uuidv4 } from 'uuid';
import { useTranslate } from "../../context/TranslateContext";

type LastBlogType = {
  _id: number;
  title: string;
  description: string;
  image: string;
  createdAt: string;
};

type SocialsForBlogs = {
  id: number;
  icon: string;
  to: string;
};

export const SocialsForBlogItem: SocialsForBlogs[] = [
  {
    id: 1,
    icon: "/facee.svg",
    to: "",
  },
  {
    id: 2,
    icon: "/wppp.svg",
    to: "",
  },
  {
    id: 3,
    icon: "/tgg.svg",
    to: "",
  },
  {
    id: 4,
    icon: "/t.svg",
    to: "",
  },
];

const BlogInnerContent: React.FC = () => {
  const { blogtitle } = useParams<{ blogtitle: string }>();
  const selectedlang = useRecoilValue(SelectedLanguageState);
  const navigate = useNavigate();

  // Fetch blog data
  const { data: blogDatas, isLoading: blogLoading, error: blogError } = useQuery({
    queryKey: ['blogDatasInner', selectedlang],
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
  const { data: lastBlogs, isLoading: lastBlogsLoading, error: lastBlogsError } = useQuery({
    queryKey: ['lastBlogs', selectedlang],
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

  if (blogLoading || lastBlogsLoading) {
    return <Loader />;
  }

  if (blogError || lastBlogsError) {
    return "Bir hata oluştu.";
  }

  // Formatted createdAt date
  const DateDisplay = ({ createdAt }: { createdAt: string }) => {
    const formattedDate = moment(createdAt).locale("tr").format("DD MMM YYYY");
    return <span>{formattedDate}</span>;
  };

  const innerBlogItem = blogDatas?.find((item: BlogType) => item?.title.toLowerCase() === blogtitle?.toLowerCase());
  const { translations } = useTranslate();

  return (
    <section className="blog-inner-content-section">
      <div className="blogs-inner">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['nav_haqqimizda_xeberler']} />

        <div className="container-blogs-inner">
          <h2>{translations['blog_title']}</h2>

          <div className="col-blogs-inner">
            <h3>{innerBlogItem?.title}</h3>

            <div className="contents">
              <div className="left">
                <div className="content-inner-blog-image-wrapper">
                  <img
                    loading="lazy"
                    src={`https://ekol-server-1.onrender.com${innerBlogItem?.image}`}
                    title={innerBlogItem?.title}
                  />
                </div>

                <div className="description-content">
                  <span className="time-span">
                    {innerBlogItem && innerBlogItem.createdAt ? <DateDisplay createdAt={innerBlogItem.createdAt} /> : ""}
                  </span>
                  {innerBlogItem && innerBlogItem.description && (
                    <div
                      className="description-area"
                      dangerouslySetInnerHTML={{ __html: innerBlogItem?.description }}
                    />
                  )}
                </div>
              </div>

              <div className="right">
                <h5>Ən son xəbərlər</h5>
                <div className="grid-last-blog">
                  {lastBlogs && lastBlogs.length > 0
                    ? lastBlogs.map((item: LastBlogType) => (
                        <Link
                          to={`/xeberler/en-son-bloglar/${item?.title.toLowerCase()}`}
                          key={uuidv4()}
                          className="item-last-blog">
                          <div className="title">{item.title}</div>

                          <div className="time-and-icon">
                            <span className="time">{item.createdAt ? <DateDisplay createdAt={item.createdAt} /> : ""}</span>
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
                      {SocialsForBlogItem.map((item: SocialsForBlogs) => (
                        <Link to={item.to} key={uuidv4()} className="icon-wrap">
                          <img src={item.icon} alt={`${item.id}-icon`} title={item.to} />
                        </Link>
                      ))}
                    </div>
                    <div className="view">
                      <div className="eye-wrap">
                        <img src="/ey.svg" alt="eye" title="Baxışlar" />
                      </div>
                      <p className="view-count">112 baxış</p>
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
