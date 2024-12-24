import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import DOMPurify from "dompurify";
import Loader from "../../Loader";
import { useTranslate } from "../../context/TranslateContext";
import Lisanse from "./Lisanse";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

interface Certificates {
  _id: string;
  title: string;
  description: string;
}

const Certificates: React.FC = () => {
  const selectedlang = useRecoilValue(SelectedLanguageState);
  const { data: certificatesData, isLoading } = useQuery<Certificates[]>({
    queryKey: ["certificatesDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/certificatesfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  const hasCertificatesData = certificatesData && certificatesData.length > 0;
  const { translations } = useTranslate();

  // Lightbox state management
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<{ src: string }[]>([]);

  // Handle image click to trigger Lightbox
  const handleImageClick = (_: string, index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleDescriptionClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      const imgSrc = (target as HTMLImageElement).src;
      const imgIndex = lightboxImages.findIndex((img) => img.src === imgSrc);
      handleImageClick(imgSrc, imgIndex !== -1 ? imgIndex : 0);
    }
  };

  // Preparing the images for Lightbox
  useEffect(() => {
    if (hasCertificatesData) {
      const allImages = certificatesData.flatMap((item) => {
        const div = document.createElement("div");
        div.innerHTML = item?.description || "";
        const imgs = Array.from(div.getElementsByTagName("img")).map((img) => ({
          src: img.src,
        }));
        return imgs;
      });
      setLightboxImages(allImages);
    }
  }, [certificatesData]);

  return (
    <section className="certificates-section">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="certificates">
          <Breadcrumb prevpage={translations["nav_anasehife"]} uri={translations["nav_haqqimizda_sertifikatlar"]} />
          {hasCertificatesData
            ? certificatesData.map((item: Certificates, _: number) => (
              <div className="container-certificates" key={item?._id}>
                <h2>{item?.title}</h2>
                <div
                  className="description-certificates"
                  onClick={handleDescriptionClick}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.description.replace(/<img/g, `<img data-lightbox="gallery"`)),
                  }}
                />
              </div>
            ))
            : ""}
        </div>
      )}

      <Lisanse />

      {/* Lightbox Component */}
      {isLightboxOpen && (
        <Lightbox
          plugins={[Zoom]}
          zoom={{
            maxZoomPixelRatio: 6,
            scrollToZoom: true
          }}
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={lightboxImages}
          index={currentImageIndex}
        />
      )}
    </section>
  );
};

export default Certificates;
