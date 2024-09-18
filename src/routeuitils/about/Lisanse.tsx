import React from "react";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import Loader from "../../Loader";
import DOMPurify from "dompurify";

// Modal for inner lisanse images
const ModalLisanseImages = ({ imageSrc, onClose }: any) => {
  return (
    <div className="modal-overlay-inner-img" onClick={onClose}>
      <div className="modal-content-inner-img" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt="Modal content" />
      </div>
    </div>
  );
};

interface LisanseItemType {
  _id: string;
  title: string;
  description: string;
}

const Lisanse: React.FC = () => {
  //fetch lisanse data
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

  const [selectedImageLisanse, setSelectedImageLisanse] = React.useState<string | null>(null);

  const handleImageLisanse = (src: string) => {
    setSelectedImageLisanse(src);
  };

  const closeModal = () => {
    setSelectedImageLisanse(null);
  };

  const handleDescriptionLisanse = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.tagName === "IMG") {
      handleImageLisanse((target as HTMLImageElement)?.src);
    }
  };

  return (
    <section className="lisanse-section">
      <div className="lisanse">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="container-lisanse">
            {hasLisanseData
              ? lisanseData?.map((item: LisanseItemType) => (
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
      {selectedImageLisanse && <ModalLisanseImages imageSrc={selectedImageLisanse} onClose={closeModal} />}
    </section>
  );
};

export default Lisanse;
