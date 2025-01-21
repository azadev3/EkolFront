import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SelectedLanguageState } from '../../recoil/Atoms';
import { useRecoilValue } from 'recoil';
import { Baseurl } from '../../Baseurl';
import axios from 'axios';
import 'moment/locale/tr';
import { useTranslate } from '../../context/TranslateContext';
import { useQuery } from '@tanstack/react-query';

export type BlogDataType = {
 id: string;
 title: string;
 description: string;
 created_by: string;
 blogimage: string;
 time?: string;
 view: string;
};

export type BlogType = {
 _id?: string;
 title: string;
 description: string;
 created_at: string;
 updated: string;
 image: string;
 view: string;
 slogan: string;
};

const BlogSection: React.FC = () => {
 const selectedlang = useRecoilValue(SelectedLanguageState);

 // blogs
 const { data: blogData } = useQuery<BlogType[]>({
  queryKey: ['blogDataBlogKey', selectedlang],
  queryFn: async () => {
   const response = await axios.get(`${Baseurl}/blogfront`, {
    headers: {
     'Accept-Language': selectedlang,
    },
   });
   return response.data;
  },
  staleTime: 9000000,
 });

 const navigate = useNavigate();

 const { translations } = useTranslate();

 // Format date using moment.js
 // const formatDate = (date: string) => {
 //   return moment(date).locale("tr").format("DD MMM YYYY");
 // };

 const sortedBlogData = blogData
  ? [...blogData].sort((a: BlogType, b: BlogType) => {
     const parsedDate = (date: string) => {
      const [day, month, year] = date.split('.').map(Number);
      return new Date(year, month - 1, day).getTime();
     };
     return parsedDate(b.created_at) - parsedDate(a.created_at);
    })
  : [];

 return (
  <section className="blog-section">
   <div className="blogs">
    <div className="head-titles">
     <h3>{translations['blog_title']}</h3>

     <Link to="/xeberler" className="all-blogs">
      {translations['all_blogs']}
     </Link>
    </div>

    <section className="blog-grid-section">
     {sortedBlogData && sortedBlogData.length > 0
      ? sortedBlogData
         .slice(0, 3)
         .map((item: BlogType, index: number) => (
          <article
           onClick={() => {
            navigate(`/xeberler/${item._id}`);
           }}
           className="blog-item"
           key={index}>
           {item?.image === '' ? (
            ''
           ) : (
            <div className="image-blog">
             <img src={`https://ekol-server-1.onrender.com${item?.image}`} alt={`${index}-blogimg`} title={item?.title} />
            </div>
           )}
           <div className="descriptions-blog">
            <span>{item?.created_at ? item?.created_at : ''}</span>
            <h4>{item?.title}</h4>
            <div className="description">
             <div dangerouslySetInnerHTML={{ __html: item?.description }} />
            </div>
            <div className="show-more-btn">
             <Link to={`/xeberler/${index.toString()}`}>{translations['etrafli_oxu']}</Link>
            </div>
           </div>
          </article>
         ))
      : ''}
    </section>
   </div>
  </section>
 );
};

export default BlogSection;
