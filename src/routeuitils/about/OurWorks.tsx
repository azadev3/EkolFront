import React from 'react';
import Breadcrumb from '../../Breadcrumb';
import { v4 as uuidv4 } from 'uuid';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { SelectedLanguageState } from '../../recoil/Atoms';
import { useQuery } from '@tanstack/react-query';
import { Baseurl } from '../../Baseurl';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { useTranslate } from '../../context/TranslateContext';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

export interface OurWorksInnerInterface {
  _id?: string;
  title: string;
  description: string;
}

interface OurworksImages {
  _id: string;
  images: [string];
  selected_ourworks: string;
}

export const SelectItemOurWorkState = atom<string>({
  key: 's_item_ourwork_key',
  default: '',
});

const OurWorks: React.FC = () => {
  const { translations } = useTranslate();
  const selectedlang = useRecoilValue(SelectedLanguageState);
  const { data: OurWorksInnerData } = useQuery<OurWorksInnerInterface[]>({
    queryKey: ['ourWorksInnerDataKey', selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/ourworksinnerfront`, {
        headers: {
          'Accept-Language': selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  const [selectItem, setSelectItem] = useRecoilState(SelectItemOurWorkState);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedImage, setSelectedImage] = React.useState<string>('');

  React.useEffect(() => {
    if (OurWorksInnerData && OurWorksInnerData.length > 0) {
      const initialValue = OurWorksInnerData[0]?._id;
      setSelectItem(initialValue || '');
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
    setSelectedImage('');
  };

  React.useEffect(() => {
    const contentDivs = document.querySelectorAll('.description-content p');
    contentDivs.forEach((pTag) => {
      if (pTag.querySelector('img')) {
        pTag.classList.add('img-grid');
      }
    });
  }, [OurWorksInnerData, selectItem]);

  const { data: ourWorksImgData } = useQuery<OurworksImages[]>({
    queryKey: ['ourworksimagesKey', selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/ourworksimagesfront`);
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

  const selectedItemID = OurWorksInnerData?.find((item: OurWorksInnerInterface) => item?._id === selectItem)?._id;

  const findedImage =
    ourWorksImgData &&
    ourWorksImgData.find((item: OurworksImages) => {
      return item?.selected_ourworks === selectedItemID;
    });

  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const controlWindow = () => {
      if (window.innerWidth <= 568) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    controlWindow();

    window.addEventListener('resize', controlWindow);
    return () => window.removeEventListener('resize', controlWindow);
  }, []);

  return (
    <section className="ourworks-section">
      <div className="works">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['gorduyumuz_isler_title']} />

        <div className="container-works">
          <h2>{translations['gorduyumuz_isler_title']}</h2>

          <div className="grid-works">
            <div className="navigation-content">
              {OurWorksInnerData && OurWorksInnerData.length > 0
                ? OurWorksInnerData.map((item: OurWorksInnerInterface) => (
                  <div
                    key={uuidv4()}
                    className="item-navigation"
                    onClick={() => {
                      handleSelectItem(item?._id || '');
                      window.scrollTo(0, 0);
                      if (isMobile) {
                        const el = document.getElementById('navigation_content');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}>
                    <div className="left-order-num-and-title">
                      <p>{item?.title}</p>
                    </div>
                    <img src="/arrow.svg" className="arrowimg" alt="" />
                  </div>
                ))
                : ''}
            </div>

            <div className="navigation-description-content" id="navigation_content">
              {OurWorksInnerData && OurWorksInnerData.length > 0
                ? OurWorksInnerData.map((item: OurWorksInnerInterface) => {
                  if (selectItem === item?._id) {
                    return (
                      <div
                        style={{ width: "100%" }}
                        className='description-content'
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description) }}
                        onClick={(e) => {
                          const img = e.target as HTMLImageElement;
                          if (img.tagName === 'IMG') {
                            openImagePopup(img.src); // Pass the image src to the popup
                          }
                        }}
                      />
                    );
                  }
                })
                : ''}

              <div className="images-for-description" style={{ display: findedImage ? 'grid' : 'none' }}>
                {findedImage && findedImage?.images
                  ? findedImage?.images?.map((imgs, i: number) => (
                    <div onClick={() => handleImageClick(i)} className="image-wrapper" key={i + 3}>
                      <img src={`https://ekol-server-1.onrender.com${imgs}`} alt="" />
                    </div>
                  ))
                  : ''}
              </div>

              {/* Lightbox */}
              {currentImageIndex !== null && (
                <Lightbox
                  plugins={[Zoom]}
                  zoom={{
                    maxZoomPixelRatio: 6,
                    scrollToZoom: true,
                  }}
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

export default OurWorks;
