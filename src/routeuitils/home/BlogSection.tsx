import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import "moment/locale/tr";
import { useTranslate } from "../../context/TranslateContext";
import { useQuery } from "@tanstack/react-query";

export type BlogDataType = {
  id: string;
  title: string;
  description: string;
  created_by: string;
  blogimage: string;
  time?: string;
};

export type BlogType = {
  _id?: string;
  title: string;
  description: string;
  created_at: string;
  updated: string;
  image: string;
};

const BlogSection: React.FC = () => {
  const selectedlang = useRecoilValue(SelectedLanguageState);

  //blogs
  const { data: blogData } = useQuery<BlogType[]>({
    queryKey: ["blogDataBlogKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/blogfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      console.log(response.data, "salam xeberler");
      return response.data;
    },
    staleTime: 9000000,
  });

  // //formatted created at
  // const DateDisplay = ({ created_at }: any) => {
  //   const formattedDate = moment(created_at).locale("tr").format("DD MMM YYYY");
  //   return formattedDate;
  // };

  const navigate = useNavigate();

  const { translations } = useTranslate();

  return (
    <section className="blog-section">
      <div className="blogs">
        <div className="head-titles">
          <h3>{translations["blog_title"]}</h3>

          <Link to="/xeberler" className="all-blogs">
            {translations["all_blogs"]}
          </Link>
        </div>

        <section className="blog-grid-section">
          {blogData && blogData.length > 0
            ? blogData.slice(0, 3).map((item: BlogType, index: number) => (
                <article
                  onClick={() => {
                    navigate(`/xeberler/${index.toString()}`);
                  }}
                  className="blog-item"
                  key={index}>
                  {item?.image === "" ? (
                    ""
                  ) : (
                    <div className="image-blog">
                      <img
                        src={`https://ekol-server-1.onrender.com${item?.image}`}
                        alt={`${index}-blogimg`}
                        title={item?.title}
                      />
                    </div>
                  )}
                  <div className="descriptions-blog">
                    <span>{item?.created_at ? item?.created_at : "zzz"}</span>
                    <h4>{item?.title}</h4>
                    <div className="description">
                      <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                    </div>
                    <div className="show-more-btn">
                      <Link to={`/xeberler/${index.toString()}`}>Ətraflı oxu</Link>
                    </div>
                  </div>
                </article>
              ))
            : ""}
        </section>
      </div>
    </section>
  );
};

export default BlogSection;
