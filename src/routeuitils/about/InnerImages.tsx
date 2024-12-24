import React from "react";
import { useParams } from "react-router-dom";
import { CategoriesAndImages, Images } from "./Images";
import Breadcrumb from "../../Breadcrumb";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import Loader from "../../Loader";
import { useTranslate } from "../../context/TranslateContext";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const InnerImages: React.FC = () => {
  const { imagename } = useParams<{ imagename: string }>();

  // FETCH IMAGES AND CATEGORIES
  const selectedLang = useRecoilValue(SelectedLanguageState);
  const { data: ImagesAndCategoriesData, isLoading } = useQuery({
    queryKey: ["imagesAndCategoriesDataKey", selectedLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/imagespagefront`, {
        headers: {
          "Accept-Language": selectedLang,
        },
      });
      if (response.data) {
        return response.data;
      }
    },
    staleTime: 1000000,
  });

  const displayInnerItems = ImagesAndCategoriesData?.find(
    (item: CategoriesAndImages) => item?.categoryName.trim() === imagename?.trim()
  );

  const isTrueImages = displayInnerItems?.images && displayInnerItems?.images.length > 0;
  const { translations } = useTranslate();

  // State to manage the lightbox
  const [isLightboxOpen, setIsLightboxOpen] = React.useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <section className="innerimage-section">
      <div className="innerimages">
        <Breadcrumb prevpage={translations["nav_anasehife"]} uri={translations["gallery_page_title"]} />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="container-innerimages">
            <h2>{displayInnerItems?.categoryName}</h2>
            <div className="grid-innerimages">
              {isTrueImages
                ? displayInnerItems?.images?.map((innerimages: Images, index: number) => (
                    <div
                      onClick={() => openLightbox(index)} // Open lightbox on image click
                      key={innerimages?._id}
                      className="innerimage-item">
                      <img
                        src={innerimages.image ? `https://ekol-server-1.onrender.com${innerimages?.image}` : ""}
                        alt={`${innerimages?._id}-image`}
                        loading="lazy"
                      />
                    </div>
                  ))
                : "Hələ ki kateqoriya içərisində şəkil əlavə olunmayıb."}
            </div>
          </div>
        )}

        {/* Lightbox */}
        {isTrueImages && (
          <Lightbox
          plugins={[Zoom]}
          zoom={{
            maxZoomPixelRatio: 6,
            scrollToZoom: true
          }}
            open={isLightboxOpen}
            close={closeLightbox}
            slides={
              displayInnerItems?.images?.map((innerimages: Images) => ({
                src: `https://ekol-server-1.onrender.com${innerimages?.image}`,
              })) || []
            }
            index={currentImageIndex} // Start the slideshow from the clicked image
          />
        )}
      </div>
    </section>
  );
};

export default InnerImages;
