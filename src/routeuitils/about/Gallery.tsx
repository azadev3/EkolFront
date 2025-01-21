import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { useTranslate } from "../../context/TranslateContext";
import { v4 as uuidv4 } from 'uuid';

type GalleryPageDataType = {
  id: number;
  title: string;
  route: string;
  image: string;
};

type GalleryDropdownPageType = {
  _id: string;
  backgroundImage: string;
  title: string;
};

const Gallery: React.FC = () => {
  const { translations } = useTranslate();

  // @ts-ignore
  const GallerySelectItem: GalleryPageDataType[] = [
    {
      id: 1,
      title: translations['images_key'],
      route: "/about/gallery/images",
      image: "/imgone.svg",
    },
    {
      id: 2,
      title: translations['nav_haqqimizda_videos'],
      route: "/about/gallery/videos",
      image: "/imgtwo.svg",
    },
  ];
  const selectedlang = useRecoilValue(SelectedLanguageState);

  const { data: GalleryDropdownPageData } = useQuery({
    queryKey: ["galleryDropdownPageDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/gallerydropdownfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
  });



  return (
    <section className="gallery-section">
      <div className="gallery">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['gallery_page_title']} />

        <div className="container-gallery">
          <h2>{translations["gallery_page_title"]}</h2>

          <div className="grid-select-page">
            {GalleryDropdownPageData &&
              GalleryDropdownPageData.length > 0 &&
              GalleryDropdownPageData.map((item: GalleryDropdownPageType, i: number) => (
                <Link
                  to={i === 0 ? "/about/gallery/images" : i === 1 ? "/about/gallery/videos" : ""}
                  className="item-gallery-select"
                  key={uuidv4()}
                >
                  <img
                    src={`https://ekol-server-1.onrender.com${item?.backgroundImage}`}
                    alt={`${item?._id}-image`}
                    title={item?.title}
                  />
                  <h3 className="title-select">{i === 0 ? translations['images_key'] : i === 1 ? translations['nav_haqqimizda_videos'] : item?.title}</h3>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
