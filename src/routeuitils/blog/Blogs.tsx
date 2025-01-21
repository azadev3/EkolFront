import React from 'react';
import Breadcrumb from '../../Breadcrumb';
import { BlogType } from '../home/BlogSection';
import { Link, useNavigate } from 'react-router-dom';
import PaginateButton from '../../components/PaginateButton';
import { Baseurl } from '../../Baseurl';
import { SelectedLanguageState } from '../../recoil/Atoms';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
// import moment from "moment";
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Loader';
import { useTranslate } from '../../context/TranslateContext';
import { DefaultMeta, MetaDataType } from '../../routes/Home';
import { HelmetTag } from '../../main';

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
    queryKey: ['blogData', selectedlang],
    queryFn: async () => {
      try {
        const response = await axios.get(`${Baseurl}/blogfront`, {
          headers: {
            'Accept-Language': selectedlang,
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
  // const DateDisplay = ({ createdAt }: any) => {
  //   const formattedDate = moment(createdAt).locale("tr").format("DD MMM YYYY");
  //   return formattedDate;
  // };

  const { translations } = useTranslate();

  const navigate = useNavigate();

  const sortedBlogData = blogData
    ? [...blogData].sort((a: BlogType, b: BlogType) => {
      const parseDate = (dateString: string) => {
        const [day, month, year] = dateString.split('.').map(Number);
        return new Date(year, month - 1, day).getTime();
      };

      return parseDate(b.created_at) - parseDate(a.created_at);
    })
    : [];

  const getBlogView = async (id: string) => {
    try {
      const res = await axios.get(`${Baseurl}/blog-viewer/${id}`);
      if (res.data) {
        console.log(res.data)
      } else {
        console.log(res.status)
      }
    } catch (error) {
      console.log(error);
    }
  }


  const { data: MetaData } = useQuery<MetaDataType>({
    queryKey: ['meta_xeberler_key', selectedlang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-xeberler-front`, {
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
    return 'Bir xeta oldu.';
  }

  return (
    <section className="blogs-section">
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{hasMeta?.meta_title}</title>
        <meta name="title" content={hasMeta?.meta_title} />
        <meta name="description" content={hasMeta?.meta_description} />
        <meta name="generator" content={hasMeta?.meta_generator} />
        <meta name="author" content={hasMeta?.meta_author} />
      </HelmetTag>
      <div className="blogs">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['nav_haqqimizda_xeberler']} />

        <div className="container-blogs">
          <h2>{translations['blog_title']}</h2>

          <section className="blog-grid-blogpage">
            {sortedBlogData && sortedBlogData.length > 0
              ? sortedBlogData.slice(0, paginate).map((item: BlogType, index: number) => (
                <article
                  onClick={() => {
                    navigate(`/xeberler/${item._id}`);
                    getBlogView(item?._id || '')
                  }}
                  className={`blog-item-blogpage ${item?.image === '' ? 'noimgblog' : ''}`}
                  key={index}>
                  {item?.image === '' ? (
                    ''
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
                    <span>{item?.created_at || ''}</span>
                    <h4>{item?.title}</h4>
                    <div className="description">
                      <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                    </div>
                    <div className="show-more-btn">
                      <Link to={`/xeberler/${item?._id}`}
                        onClick={() => getBlogView(item?._id || '')}
                      >{translations['etrafli_oxu']}</Link>
                    </div>
                  </div>
                </article>
              ))
              : ''}
          </section>

          {paginate <= sortedBlogData?.length && <PaginateButton handlePaginate={handlePaginate} />}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
