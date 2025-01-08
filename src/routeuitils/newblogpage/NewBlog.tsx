import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { useTranslate } from "../../context/TranslateContext";
import Loader from "../../Loader";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { BlogType } from "../home/BlogSection";
import { Link, useNavigate } from "react-router-dom";
import PaginateButton from "../../components/PaginateButton";
import { DefaultMeta, MetaDataType } from "../../routes/Home";
import { HelmetTag } from "../../main";

const NewBlog: React.FC = () => {
  const { translations } = useTranslate();

  //pagination
  const [paginate, setPaginate] = React.useState<number>(9);

  const handlePaginate = () => {
    setPaginate((prevPag) => prevPag + 6);
  };

  const selectedlang = useRecoilValue(SelectedLanguageState);

  const {
    data: newBlogData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["newBlogData", selectedlang],
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
    staleTime: 1000000,
  });

  //formatted created at
  // const DateDisplay = ({ created_at }: any) => {
  //   const formattedDate = moment(created_at).locale("tr").format("DD MMM YYYY");
  //   return formattedDate;
  // };

  const sortedBlogData = newBlogData
    ? [...newBlogData].sort((a: BlogType, b: BlogType) => {
      const parseDate = (dateString: string) => {
        const [day, month, year] = dateString.split('.').map(Number);
        return new Date(year, month - 1, day).getTime();
      };

      return parseDate(b.created_at) - parseDate(a.created_at);
    })
    : [];

  const navigate = useNavigate();

  const { data: MetaData } = useQuery<MetaDataType>({
    queryKey: ['meta_bloqlar_key', selectedlang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-bloqlar-front`, {
        headers: {
          "Accept-Language": selectedlang,
        }
      });
      return res.data[0];
    }
  });
  const hasMeta: MetaDataType = MetaData && Object.values(MetaData)?.length > 0 ? MetaData : DefaultMeta;


  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return "";
  }

  return (
    <section className="newblogpage-section">
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{hasMeta?.meta_title}</title>
        <meta name="title" content={hasMeta?.meta_title} />
        <meta name="description" content={hasMeta?.meta_description} />
        <meta name="generator" content={hasMeta?.meta_generator} />
        <meta name="author" content={hasMeta?.meta_author} />
      </HelmetTag>
      <div className="blogs-newblogpage">
        <Breadcrumb prevpage={translations["nav_anasehife"]} uri={translations["newblog_title"]} />

        <div className="container-newblogpage">
          <h2>{translations["newblog_title"]}</h2>

          <section className="newblogpage-grid-blogpage">
            {sortedBlogData && sortedBlogData?.length > 0
              ? sortedBlogData?.slice(0, paginate)?.map((item: BlogType, index: number) => (
                <article
                  onClick={() => {
                    navigate(`/bloq/${item._id}`);
                  }}
                  className={`newblogpage-item-blogpage ${item?.image === "" ? "noimg" : ""}`}
                  key={index}>
                  {item?.image === "" ? (
                    ""
                  ) : (
                    <div className="image-newblogpage">
                      <img src={`https://ekol-server-1.onrender.com${item?.image}`} alt={`${index}-blogimg`} title={item?.title} />
                    </div>
                  )}


                  <div className="descriptions-newblogpage">
                    <span>{item.created_at ? item?.created_at : ""}</span>
                    <h4>{item?.title}</h4>
                    <p>{item?.slogan}</p>
                    <div className="show-more-btn">
                      <Link to={`/bloq/${item._id}`}>Ətraflı oxu</Link>
                    </div>
                  </div>
                </article>
              ))
              : ""}
          </section>

          {paginate <= newBlogData?.length && <PaginateButton handlePaginate={handlePaginate} />}
        </div>
      </div>
    </section>
  );
};

export default NewBlog;
