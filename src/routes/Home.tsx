import React from "react";
import Hero from "../routeuitils/home/Hero";
import CardAbout from "../routeuitils/home/CardAbout";
import '../styles/home.scss';
import Services from "../routeuitils/home/Services";
import BlogSection from "../routeuitils/home/BlogSection";
// import CardSubscribe from "../routeuitils/home/CardSubscribe";
import Contactus from "../routeuitils/home/Contactus";
import axios from "axios";
import { Baseurl } from "../Baseurl";
import { HelmetTag } from "../main";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../recoil/Atoms";

export interface MetaDataType {
  meta_author: string;
  meta_description: string;
  meta_generator: string;
  meta_title: string;
}
export const DefaultMeta: MetaDataType = {
  meta_author: '',
  meta_description: '',
  meta_generator: '',
  meta_title: '',
}

const Home: React.FC = () => {

  const lang = useRecoilValue(SelectedLanguageState);

  const [showRehberlik, setShowRehberlik] = React.useState<boolean>(false);
  const handleCheck = async () => {
    try {
      const res = await axios.get(`${Baseurl}/hidden-hero-front`);
      if (res.data) {
        setShowRehberlik(res.data?.showed);
        console.log(res.data, 'slam');
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showOurworkshome, setShowourworkshome] = React.useState<boolean>(false);
  const handleCheckOurworksHome = async () => {
    try {
      const res = await axios.get(`${Baseurl}/hidden-ourworkshome-front`);
      if (res.data) {
        setShowourworkshome(res.data?.showed);
        console.log(res.data, 'slam');
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleCheck();
    handleCheckOurworksHome();
  }, [showRehberlik, showOurworkshome]);

  const { data: MetaHomePage } = useQuery<MetaDataType>({
    queryKey: ['meta_home_page_key', lang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-home-front`, {
        headers: {
          "Accept-Language": lang,
        }
      });
      return res.data[0];
    }
  });
  const hasMeta: MetaDataType = MetaHomePage && Object.values(MetaHomePage)?.length > 0 ? MetaHomePage : DefaultMeta;

  return (
    <main className="home-page">
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{hasMeta?.meta_title}</title>
        <meta name="title" content={hasMeta?.meta_title} />
        <meta name="description" content={hasMeta?.meta_description} />
        <meta name="generator" content={hasMeta?.meta_generator} />
        <meta name="author" content={hasMeta?.meta_author} />
      </HelmetTag>
      {showRehberlik && <Hero />}
      {showOurworkshome && <CardAbout />}
      <Services />
      <BlogSection />
      {/* <CardSubscribe /> */}
      <Contactus />
    </main>
  );
};

export default Home;
