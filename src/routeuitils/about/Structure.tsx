import React, { useState } from "react";
import Breadcrumb from "../../Breadcrumb";
import { useTranslate } from "../../context/TranslateContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import Loader from "../../Loader";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

type DataStr = {
  image: string;
};

const Structure: React.FC = () => {
  const { translations } = useTranslate();

  const {
    data: dataStr,
    isLoading,
    isError,
  } = useQuery<DataStr[]>({
    queryKey: ["strDataKey"],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/structure_img_front`);
      return res.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const imageStructure =
    dataStr && dataStr?.length > 0 && dataStr[0] && dataStr[0]?.image
      ? dataStr[0]?.image
      : "";

  const [isLightboxOpen, setLightboxOpen] = useState(false); // Lightbox state

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Have a problem.</p>;
  }

  return (
    <section className="structure-section">
      <div className="structure">
        <Breadcrumb
          prevpage={translations["nav_anasehife"]}
          uri={translations["nav_haqqimizda_struktur"]}
        />

        <div className="content-structure">
          <h2>{translations["struktur_title"]}</h2>

          <div className="wrapper-structure">
            <img
              src={`https://ekol-server-1.onrender.com${imageStructure}`}
              alt="Structure Image"
              onClick={() => setLightboxOpen(true)}
              style={{ cursor: "pointer" }}
            />

            {/* Lightbox */}
            {isLightboxOpen && (
              <Lightbox
                open={isLightboxOpen}
                close={() => setLightboxOpen(false)} 
                plugins={[Zoom]} 
                zoom={{ maxZoomPixelRatio: 3 }} 
                slides={[
                  {
                    src: `https://ekol-server-1.onrender.com${imageStructure}`,
                  },
                ]}
                carousel={{ finite: true }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Structure;
