import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import Loader from "../../Loader";
import DOMPurify from "dompurify";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface LisanseItemType {
  _id: string;
  title: string;
  description: string;
}

const Lisanse: React.FC = () => {
  // Fetch lisanse data
  const selectedlang = useRecoilValue(SelectedLanguageState);
  const { data: lisanseData, isLoading } = useQuery<LisanseItemType[]>({
    queryKey: ["lisanseDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/lisansepagefront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  const hasLisanseData = lisanseData && lisanseData?.length > 0;

  // Lightbox state management
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<{ src: string }[]>([]);

  // Handle image click to trigger Lightbox
  const handleImageLisanse = (_: string, index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeModal = () => {
    setIsLightboxOpen(false);
  };

  const handleDescriptionLisanse = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.tagName === "IMG") {
      const imgSrc = (target as HTMLImageElement)?.src;
      const imgIndex = lightboxImages.findIndex((img) => img.src === imgSrc);
      handleImageLisanse(imgSrc, imgIndex !== -1 ? imgIndex : 0);
    }
  };

  // Preparing the images for Lightbox
  useEffect(() => {
    if (hasLisanseData) {
      const allImages = lisanseData.flatMap((item) => {
        const div = document.createElement("div");
        div.innerHTML = item?.description || "";
        const imgs = Array.from(div.getElementsByTagName("img")).map((img) => ({
          src: img.src,
        }));
        return imgs;
      });
      setLightboxImages(allImages);
    }
  }, [lisanseData]);

  return (
    <section className="lisanse-section">
      <div className="lisanse">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="container-lisanse">
            {hasLisanseData
              ? lisanseData?.map((item: LisanseItemType, _: number) => (
                  <React.Fragment key={item?._id}>
                    <h2>{item?.title}</h2>
                    <div
                      onClick={handleDescriptionLisanse}
                      className="description-area-lisanse"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description) }}
                    />
                  </React.Fragment>
                ))
              : ""}
          </div>
        )}
      </div>

      {/* Lightbox Component */}
      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={closeModal}
          slides={lightboxImages}
          index={currentImageIndex}
        />
      )}
    </section>
  );
};

export default Lisanse;
