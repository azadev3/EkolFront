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
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ToolsInnerInterface {
  _id?: string;
  title: string;
  description: string;
}

interface ToolsImages {
  _id: string;
  images: [string];
  selected_tools: string;
}

const Tools: React.FC = () => {
  const { translations } = useTranslate();
  const selectedlang = useRecoilValue(SelectedLanguageState);
  const { data: ToolsInnerData } = useQuery<ToolsInnerInterface[]>({
    queryKey: ["toolsInnerDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/toolsinnerfront`, {
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
    if (ToolsInnerData && ToolsInnerData.length > 0) {
      const initialValue = ToolsInnerData[0]?.title;
      setSelectItem(initialValue);
    }
  }, [ToolsInnerData]);

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
  }, [ToolsInnerData, selectItem]);

  const { data: toolsInnerImagesData } = useQuery<ToolsImages[]>({
    queryKey: ["toolsinnerimageskey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/toolsinnerimagesfront`);
      return response.data;
    },
  });

  //open fancybox images
  const [open, setOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number | null>(null);
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setOpen(true); // Lightbox opened
  };

  const selectedItemID = ToolsInnerData?.find((item: ToolsInnerInterface) => item?.title === selectItem)?._id;
  
  const findedImage =
    toolsInnerImagesData &&
    toolsInnerImagesData.find((item: ToolsImages) => {
      return item?.selected_tools === selectedItemID;
    });
  
  return (
    <section className="ourworks-section">
      <div className="works">
        <Breadcrumb prevpage={translations["nav_anasehife"]} uri={translations["nav_haqqimizda_avadanliqlar"]} />

        <div className="container-works">
          <h2>{translations["nav_haqqimizda_avadanliqlar"]}</h2>

          <div className="grid-works">
            <div className="navigation-content">
              {ToolsInnerData && ToolsInnerData.length > 0
                ? ToolsInnerData.map((item: ToolsInnerInterface) => (
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
              {ToolsInnerData && ToolsInnerData.length > 0
                ? ToolsInnerData.map((item: ToolsInnerInterface) => {
                    if (selectItem === item?.title) {
                      return (
                        <div className="description-content" key={item?._id}>
                          <div
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description) }}
                            onClick={(e) => {
                              const img = e.target as HTMLImageElement;
                              if (img.tagName === "IMG") {
                                openImagePopup(img.src); // Pass the image src to the popup
                              }
                            }}
                          />
                        </div>
                      );
                    }
                  })
                : ""}

              <div className="images-for-description" style={{ display: findedImage ? "grid" : "none" }}>
                {findedImage && findedImage?.images
                  ? findedImage?.images?.map((imgs, i: number) => (
                      <div onClick={() => handleImageClick(i)} className="image-wrapper" key={i + 3}>
                        <img src={`https://ekol-server-1.onrender.com${imgs}`} alt="" />
                      </div>
                    ))
                  : ""}
              </div>

              {/* Lightbox */}
              {currentImageIndex !== null && (
                <Lightbox
                  open={open}
                  close={() => setOpen(false)}
                  slides={
                    findedImage && findedImage?.images
                      ? findedImage?.images?.map((imgs) => ({ src: `https://ekol-server-1.onrender.com${imgs}` }))
                      : []
                  }
                  index={currentImageIndex}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pop-Up Modal for Image Display */}
      {isOpen && (
        <div className="popup-overlay" onClick={closeImagePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Selected" className="popup-image" />
            <button className="close-popup" onClick={closeImagePopup}>
              X
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Tools;
