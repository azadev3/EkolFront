import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { useTranslate } from "../../context/TranslateContext";
import moment from "moment";
import Loader from "../../Loader";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { BlogType } from "../home/BlogSection";
import { Link } from "react-router-dom";
import PaginateButton from "../../components/PaginateButton";

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
  const DateDisplay = ({ createdAt }: any) => {
    const formattedDate = moment(createdAt).locale("tr").format("DD MMM YYYY");
    return formattedDate;
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return "Bir hata oluştu.";
  }

  return (
    <section className="newblogpage-section">
      <div className="blogs-newblogpage">
        <Breadcrumb prevpage={translations["nav_anasehife"]} uri={translations["newblog_title"]} />

        <div className="container-newblogpage">
          <h2>{translations["newblog_title"]}</h2>

          <section className="newblogpage-grid-blogpage">
            {newBlogData && newBlogData.length > 0
              ? newBlogData.slice(0, paginate).map((item: BlogType, index: number) => (
                  <article className="newblogpage-item-blogpage" key={index}>
                    <div className="image-newblogpage">
                      <img
                        src={`https://ekol-server-1.onrender.com${item?.image}`}
                        alt={`${index}-blogimg`}
                        title={item?.title}
                      />
                    </div>

                    <div className="descriptions-newblogpage">
                      <span>{DateDisplay(item?.createdAt)}</span>
                      <h4>{item?.title}</h4>
                      <div className="description">
                        <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                      </div>{" "}
                      <div className="show-more-btn">
                        <Link to={`/bloq/${index?.toString()}`}>Ətraflı oxu</Link>
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
