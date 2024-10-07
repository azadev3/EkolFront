import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { v4 as uuidv4 } from "uuid";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import DOMPurify from "dompurify";
import { useTranslate } from "../../context/TranslateContext";

interface OurWorksInnerInterface {
  title: string;
  description: string;
}

const OurWorks: React.FC = () => {
  const { translations } = useTranslate();
  const selectedlang = useRecoilValue(SelectedLanguageState);
  const { data: OurWorksInnerData } = useQuery<OurWorksInnerInterface[]>({
    queryKey: ["ourWorksInnerDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/ourworksinnerfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  const [selectItem, setSelectItem] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedImage, setSelectedImage] = React.useState<string>("");

  React.useEffect(() => {
    if (OurWorksInnerData && OurWorksInnerData.length > 0) {
      const initialValue = OurWorksInnerData[0]?.title;
      setSelectItem(initialValue);
    }
  }, [OurWorksInnerData]);

  const handleSelectItem = (i: string) => {
    setSelectItem(i);
  };

  const openImagePopup = (src: string) => {
    setSelectedImage(src);
    setIsOpen(true);
  };

  const closeImagePopup = () => {
    setIsOpen(false);
    setSelectedImage("");
  };

  React.useEffect(() => {
    const contentDivs = document.querySelectorAll(".description-content p");
    contentDivs.forEach((pTag) => {
      if (pTag.querySelector("img")) {
        pTag.classList.add("img-grid");
      }
    });
  }, [OurWorksInnerData, selectItem]);

  return (
    <section className="ourworks-section">
      <div className="works">
        <Breadcrumb prevpage={translations["nav_anasehife"]} uri={translations["gorduyumuz_isler_title"]} />

        <div className="container-works">
          <h2>{translations["gorduyumuz_isler_title"]}</h2>

          <div className="grid-works">
            <div className="navigation-content">
              {OurWorksInnerData && OurWorksInnerData.length > 0
                ? OurWorksInnerData.map((item: OurWorksInnerInterface) => (
                    <div key={uuidv4()} className="item-navigation" onClick={() => handleSelectItem(item?.title)}>
                      <div className="left-order-num-and-title">
                        <p>{item?.title}</p>
                      </div>
                      <img src="/arrow.svg" className="arrowimg" alt="" />
                    </div>
                  ))
                : ""}
            </div>

            <div className="navigation-description-content">
              {OurWorksInnerData && OurWorksInnerData.length > 0
                ? OurWorksInnerData.map((item: OurWorksInnerInterface) => {
                    if (selectItem === item?.title) {
                      return (
                        <div className="description-content" key={uuidv4()}>
                          <div
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description) }}
                            onClick={(e) => {
                              const img = e.target as HTMLImageElement;
                              if (img.tagName === 'IMG') {
                                openImagePopup(img.src); // Pass the image src to the popup
                              }
                            }}
                          />
                        </div>
                      );
                    }
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Pop-Up Modal for Image Display */}
      {isOpen && (
        <div className="popup-overlay" onClick={closeImagePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Selected" className="popup-image" />
            <button className="close-popup" onClick={closeImagePopup}>X</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default OurWorks;
