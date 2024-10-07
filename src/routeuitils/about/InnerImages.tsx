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

  const [modalimg, setModalImg] = React.useState<string | null>(null);
  const handleModalImage = (id: string) => {
    setModalImg(id);
  };

    // Function to close modal
    const closeModal = () => {
      setModalImg(null);
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
                ? displayInnerItems?.images?.map((innerimages: Images) => (
                    <div
                      onClick={() => handleModalImage(innerimages?._id)}
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

       {/* Modal Popup */}
       {modalimg && (
          <div className="popup-inner-images" onClick={closeModal}>
            <div className="inner-image-modal" onClick={(e) => e.stopPropagation()}>
              <img
                src={`https://ekol-server-1.onrender.com${
                  displayInnerItems?.images?.find((img: Images) => img?._id === modalimg)?.image
                }`}
                alt="Modal Image"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InnerImages;
