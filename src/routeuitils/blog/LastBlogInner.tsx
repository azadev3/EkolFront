import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";
import moment from "moment";
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

const LastBlogInner: React.FC = () => {
  const { lastblogtitle } = useParams<{ lastblogtitle: string }>();

  const selectedlang = useRecoilValue(SelectedLanguageState);

  //formatted created at
  const DateDisplay = ({ createdAt }: any) => {
    const formattedDate = moment(createdAt).locale("tr").format("DD MMM YYYY");
    return formattedDate;
  };

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
        console.log(response.data, "last blogs datas");
        setLastBlogs(response.data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const lastBlogItem = lastBlogs?.find(
    (item: LastBlogType) => item?.title.toLowerCase() === lastblogtitle?.toLowerCase()
  );

  React.useEffect(() => {
    fetchLastBlogs();
  }, [selectedlang]);

  const navigate = useNavigate();
  const { translations } = useTranslate();



  return (
    <section className="last-blog-inner-content-section">
      <div className="blogs-inner">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['nav_haqqimizda_xeberler']} />

        <div className="container-blogs-inner">
          <h2>{translations['blog_title']}</h2>

          <div className="col-blogs-inner">
            <h3>{lastBlogItem?.title}</h3>

            <div className="contents">
              <div className="left">
                <div className="content-inner-blog-image-wrapper">
                  <img loading="lazy" src={`https://ekol-server-1.onrender.com${lastBlogItem?.image}`} title={lastBlogItem?.title} />
                </div>

                <div className="description-content">
                  <span className="time-span">
                    {lastBlogItem && lastBlogItem.createdAt ? DateDisplay(lastBlogItem?.createdAt) : ""}
                  </span>
                  {lastBlogItem && lastBlogItem.description && (
                    <div className="description-area" dangerouslySetInnerHTML={{ __html: lastBlogItem?.description }} />
                  )}
                </div>
              </div>

              <div className="right">
                <h5>Ən son bloqlar</h5>
                <div className="grid-last-blog">
                  {lastBlogs && lastBlogs.length > 0
                    ? lastBlogs?.map((item: LastBlogType) => (
                        <Link
                          to={`/xeberler/en-son-bloglar/${item?.title.toLowerCase()}`}
                          key={item?._id}
                          className="item-last-blog">
                          <div className="title">{item?.title}</div>

                          <div className="time-and-icon">
                            <span className="time">{item.createdAt ? DateDisplay(item?.createdAt) : ""}</span>
                            <img src="/arrow.svg" alt="arrow-icon" />
                          </div>
                        </Link>
                      ))
                    : ""}
                  <div className="button-content">
                    <button className="all-blogs" onClick={() => navigate("/xeberler")}>
                      Bütün bloqlar
                    </button>
                  </div>
                </div>
                <div className="share-post">
                  <span>Xəbəri paylaş:</span>
                  <div className="bottom">
                    <div className="socials">
                      {SocialsForBlogItem.map((item: SocialsForBlogs) => (
                        <Link to={item?.to} key={item?.id} className="icon-wrap">
                          <img src={item?.icon} alt={`${item?.id}-icon`} title={item?.to} />
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

export default LastBlogInner;
