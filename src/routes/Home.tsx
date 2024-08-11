import React from "react";
import Hero from "../routeuitils/home/Hero";
import CardAbout from "../routeuitils/home/CardAbout";
import '../styles/home.scss';
import Services from "../routeuitils/home/Services";
import BlogSection from "../routeuitils/home/BlogSection";
import CardSubscribe from "../routeuitils/home/CardSubscribe";
import Contactus from "../routeuitils/home/Contactus";

const Home: React.FC = () => {
  return (
    <main className="home-page">
      <Hero />
      <CardAbout />
      <Services />
      <BlogSection />
      <CardSubscribe />
      <Contactus />
    </main>
  );
};

export default Home;
