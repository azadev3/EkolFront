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
      if(response.data) {
        return response.data;
      }
    },
    staleTime: 1000000,
  });

  const displayInnerItems = ImagesAndCategoriesData?.find((item: CategoriesAndImages) => item?.categoryName.trim() === imagename?.trim());

  const isTrueImages = displayInnerItems?.images && displayInnerItems?.images.length > 0;

  return (
    <section className="innerimage-section">
      <div className="innerimages">
        <Breadcrumb prevpage="Ana səhifə" uri="Qalereya" />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="container-innerimages">
          <h2>{displayInnerItems?.categoryName}</h2>
          <div className="grid-innerimages">
            {isTrueImages ? displayInnerItems?.images?.map((innerimages: Images) => (
              <div key={innerimages?._id} className="innerimage-item">
                <img
                  src={innerimages.image ? `https://ekol-server.onrender.com${innerimages?.image}` : ""}
                  alt={`${innerimages?._id}-image`}
                  loading="lazy"
                />
              </div>
            )) : "Hələ ki kateqoriya içərisində şəkil əlavə olunmayıb."}
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default InnerImages;