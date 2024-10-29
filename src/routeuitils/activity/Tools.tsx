import React, { useState } from "react";
import Breadcrumb from "../../Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../Loader";
import DOMPurify from "dompurify";
import { useTranslate } from "../../context/TranslateContext";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface EquipmentsDataType {
  description: string;
  title: string;
}
interface InnerEqData {
  _id: string;
  description: string;
  images: [string];
}

const Tools: React.FC = () => {
  const selectedLang = useRecoilValue(SelectedLanguageState);

  const [currentImageIndex, setCurrentImageIndex] = useState(-1);

  const openLightbox = (index: any) => {
    if (index !== -1) {
      setCurrentImageIndex(index);
    }
  };
  const { data: EquipmentsData, isLoading } = useQuery<EquipmentsDataType[]>({
    queryKey: ["eqDataKey", selectedLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/equipmentsfront`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": selectedLang,
        },
      });
      return response.data;
    },
  });

  const { data: EquipmentsInnerData } = useQuery<InnerEqData[]>({
    queryKey: ["eqInnerDataKey", selectedLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/equipmentsdescriptionfront`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": selectedLang,
        },
      });
      console.log(response.data, "slalama dataaa");
      return response.data;
    },
  });

  React.useEffect(() => {
    const contentDivs = document.querySelectorAll(".container-descriptions p");

    contentDivs.forEach((pTag) => {
      if (pTag.querySelector("img")) {
        pTag.classList.add("img-grid");
      }
    });
  }, [EquipmentsData]);

  const { translations } = useTranslate();

  const allImages =
    EquipmentsInnerData &&
    EquipmentsInnerData?.length > 0 &&
    EquipmentsInnerData.flatMap((data) =>
      data.images.map((image) => ({
        src: `https://ekol-server-1.onrender.com${image || ""}`,
      }))
    );

  return (
    <section className="tools-section">
      <div className="tools">
        <Breadcrumb prevpage={translations["nav_anasehife"]} uri={translations["nav_haqqimizda_avadanliqlar"]} />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="container-tools">
            {EquipmentsData && EquipmentsData?.length > 0
              ? EquipmentsData.map((item: EquipmentsDataType) => (
                  <React.Fragment key={uuidv4()}>
                    <h2>{item?.title}</h2>
                    <div className="container-descriptions">
                      {item && item.description ? (
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description) }} />
                      ) : (
                        ""
                      )}
                    </div>
                  </React.Fragment>
                ))
              : ""}
          </div>
        )}

        {EquipmentsInnerData &&
          EquipmentsInnerData?.length > 0 &&
          EquipmentsInnerData?.map((data: InnerEqData) => (
            <div key={data?._id} className="feature-images-tools">
              <div className="images-area">
                {data?.images &&
                  data?.images?.length > 0 &&
                  data?.images?.map((images: string, i: number) => (
                    <div key={i} className="img-wrap">
                      <img
                        onClick={() => {
                          const index =
                            allImages &&
                            allImages?.length > 0 &&
                            allImages.findIndex((img) => img.src === `https://ekol-server-1.onrender.com${img || ""}`);
                          openLightbox(index !== -1 ? index : 0);
                        }}
                        src={`https://ekol-server-1.onrender.com${images || ""}`}
                        alt=""
                      />
                    </div>
                  ))}
              </div>
              <p>{data?.description}</p>
            </div>
          ))}

        {/* Lightbox */}
        {currentImageIndex >= 0 && (
          <Lightbox
            open={currentImageIndex >= 0}
            close={() => setCurrentImageIndex(-1)}
            slides={allImages && allImages?.length > 0 ? allImages : []}
            index={currentImageIndex}
          />
        )}
      </div>
    </section>
  );
};

export default Tools;
