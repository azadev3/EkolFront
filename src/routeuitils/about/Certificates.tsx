import React, { useState } from "react";
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

// Modal for inner cert images
const Modal = ({ imageSrc, onClose }: any) => {
  return (
    <div className="modal-overlay-inner-img" onClick={onClose}>
      <div className="modal-content-inner-img" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt="Modal content" />
      </div>
    </div>
  );
};

interface Certificates {
  _id: string;
  title: string;
  description: string;
}

const Certificates: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 
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

  const hasCertificatesData = certificatesData && certificatesData?.length > 0;

  const { translations } = useTranslate();

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleDescriptionClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      handleImageClick((target as HTMLImageElement)?.src);
    }
  };

  return (
    <section className="certificates-section">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="certificates">
          <Breadcrumb prevpage={translations["nav_anasehife"]} uri={translations["nav_haqqimizda_sertifikatlar"]} />

          {hasCertificatesData
            ? certificatesData?.map((item: Certificates) => (
                <div className="container-certificates" key={item?._id}>
                  <h2>{item?.title}</h2>

                  <div
                    className="description-certificates"
                    onClick={handleDescriptionClick}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item?.description),
                    }}
                  />
                </div>
              ))
            : ""}
        </div>
      )}
      {selectedImage && <Modal imageSrc={selectedImage} onClose={closeModal} />}
      <Lisanse />
    </section>
  );
};

export default Certificates;
