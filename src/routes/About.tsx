import React from "react";
import WhoWeAre from "../routeuitils/about/WhoWeAre";
import { Route, Routes } from "react-router-dom";
import Leadership from "../routeuitils/about/Leadership";
import Structure from "../routeuitils/about/Structure";
import Lisanse from "../routeuitils/about/Lisanse";
import Certificates from "../routeuitils/about/Certificates";
import Partners from "../routeuitils/about/Partners";
import GalleryPage from "../routeuitils/about/GalleryPage";
import OurWorks from "../routeuitils/about/OurWorks";

const About: React.FC = () => {
  return (
    <main className="about-page">
      <Routes>
        <Route path="/" element={<WhoWeAre />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/structure" element={<Structure />} />
        <Route path="/lisanses" element={<Lisanse />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/gallery/*" element={<GalleryPage />} />
        <Route path="/workwedo" element={<OurWorks />} />
      </Routes>
    </main>
  );
};

export default About;
