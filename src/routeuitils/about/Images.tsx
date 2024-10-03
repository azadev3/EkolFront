import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import Breadcrumb from "../../Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { useTranslate } from "../../context/TranslateContext";
import Loader from "../../Loader";

export type Images = {
  image: string,
  _id: string,
}
export interface CategoriesAndImages {
  _id: string,
  categoryImg: string,
  categoryName: string,
  images: Images[],
}

export type InnerImageType = {
  id: string;
  image: string;
};

export type ImagesType = {
  id: string;
  image: string;
  title: string;
  innerImages?: InnerImageType[];
};
export const ImagesGalleryItem: ImagesType[] = [
  {
    id: uuidv4(),
    image: "/galleryimg.svg",
    title: "İstehsalat",
    innerImages: [
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
    ],
  },
  {
    id: uuidv4(),
    image: "/galleryimg.svg",
    title: "İstehsalat2",
    innerImages: [
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
    ],
  },
  {
    id: uuidv4(),
    image: "/galleryimg.svg",
    title: "İstehsalat3",
    innerImages: [
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
    ],
  },
  {
    id: uuidv4(),
    image: "/galleryimg.svg",
    title: "İstehsalat4",
    innerImages: [
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
    ],
  },
  {
    id: uuidv4(),
    image: "/galleryimg.svg",
    title: "İstehsalat5",
    innerImages: [
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
    ],
  },
  {
    id: uuidv4(),
    image: "/galleryimg.svg",
    title: "İstehsalat6",
    innerImages: [
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
    ],
  },
  {
    id: uuidv4(),
    image: "/galleryimg.svg",
    title: "İstehsalat7",
    innerImages: [
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
    ],
  },
  {
    id: uuidv4(),
    image: "/galleryimg.svg",
    title: "İstehsalat8",
    innerImages: [
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
    ],
  },
  {
    id: uuidv4(),
    image: "/galleryimg.svg",
    title: "İstehsalat9",
    innerImages: [
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
      {
        id: uuidv4(),
        image: "/galleryimg.svg",
      },
    ],
  },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat10" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
  { id: uuidv4(), image: "/galleryimg.svg", title: "İstehsalat" },
];

const Images: React.FC = () => {

  // FETCH IMAGES AND CATEGORIES
  const selectedLang = useRecoilValue(SelectedLanguageState);
  const { data: ImagesAndCategoriesData, isLoading } = useQuery({
    queryKey: ['imagesAndCategoriesDataKey', selectedLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/imagespagefront`, {
        headers: {
          "Accept-Language": selectedLang,
        },
      });
      if(response.data){
      return response.data;
      }
    },
    staleTime: 1000000,
  });

  // Pagination state
  const [paginate, setPaginate] = React.useState<number>(24);

  // Function to increment pagination
  const incrementPagination = () => {
    setPaginate((prevPaginate) => prevPaginate + 12);
  };

  // Slicing the displayedImagesItem list based on the paginate state
  const displayedImagesItem = ImagesAndCategoriesData && ImagesAndCategoriesData.length > 0 ? ImagesAndCategoriesData.slice(0, paginate) : [];


  const { translations } = useTranslate();

  return (
    <section className="images-section-gallery-page">
      <div className="images">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['nav_haqqimizda_sekiller']} />

        <div className="container-images">
          <h2>{translations['nav_haqqimizda_sekiller']}</h2>
          <div className="content-images">
            {displayedImagesItem && displayedImagesItem.map((item: CategoriesAndImages, i: number) => (
              <Link to={`/about/gallery/images/${item?.categoryName}`} key={i} className="images-item">
                <img src={item.categoryImg ? `https://kaiyi-21d4.onrender.com${item.categoryImg}` : "/galleryimg.svg"} alt="gallery-image" title={item?.categoryName} />
                <span>{item?.categoryName}</span>
              </Link>
            ))}

            {isLoading && (
              <Loader />
            )}
          </div>

          {ImagesAndCategoriesData && ImagesAndCategoriesData.length > 0 && paginate < ImagesAndCategoriesData.length && (
            <div className="pagination-button">
              <span onClick={incrementPagination}>Daha çox</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Images;
