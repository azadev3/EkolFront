import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { BlogType } from "../home/BlogSection";
import { Link } from "react-router-dom";
import PaginateButton from "../../components/PaginateButton";
import { Baseurl } from "../../Baseurl";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";
import axios from "axios";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader";
import { useTranslate } from "../../context/TranslateContext";

const Blogs: React.FC = () => {
  //pagination
  const [paginate, setPaginate] = React.useState<number>(9);

  const handlePaginate = () => {
    setPaginate((prevPag) => prevPag + 6);
  };

  const selectedlang = useRecoilValue(SelectedLanguageState);

  const {
    data: blogData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogData", selectedlang],
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
    staleTime: 1000000,
  });

  
  //formatted created at
  const DateDisplay = ({ createdAt }: any) => {
    const formattedDate = moment(createdAt).locale("tr").format("DD MMM YYYY");
    return formattedDate;
  };

  const { translations } = useTranslate();


  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return "Bir hata oluştu.";
  }

  return (
    <section className="blogs-section">
      <div className="blogs">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['nav_haqqimizda_xeberler']} />

        <div className="container-blogs">
          <h2>{translations['blog_title']}</h2>

          <section className="blog-grid-blogpage">
            {blogData && blogData.length > 0
              ? blogData.slice(0, paginate).map((item: BlogType, index: string) => (
                  <article className="blog-item-blogpage" key={index}>
                    <div className="image-blog">
                      <img src={`https://ekol-server-1.onrender.com${item?.image}`} alt={`${index}-blogimg`} title={item?.title} />
                    </div>

                    <div className="descriptions-blog">
                      <span>{DateDisplay(item?.createdAt)}</span>
                      <h4>{item?.title}</h4>
                      <div className="description">
                        <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                      </div>
                      <div className="show-more-btn">
                        <Link to={`/xeberler/${index?.toString()}`}>Ətraflı oxu</Link>
                      </div>
                    </div>
                  </article>
                ))
              : ""}
          </section>

          {paginate <= blogData?.length && <PaginateButton handlePaginate={handlePaginate} />}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
