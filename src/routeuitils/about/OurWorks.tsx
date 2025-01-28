import React from 'react';
import Breadcrumb from '../../Breadcrumb';
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
import { DefaultMeta, MetaDataType } from '../../routes/Home';
import { HelmetTag } from '../../main';

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

  const { data: MetaData } = useQuery<MetaDataType>({
    queryKey: ['meta_gorduyumuzisler_key', selectedlang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-gorduyumuzisler-front`, {
        headers: {
          "Accept-Language": selectedlang,
        }
      });
      return res.data[0];
    }
  });

  const hasMeta: MetaDataType = MetaData && Object.values(MetaData)?.length > 0 ? MetaData : DefaultMeta;

  const findedDynamicTitle = OurWorksInnerData && OurWorksInnerData?.length > 0 ? OurWorksInnerData?.find((data: OurWorksInnerInterface) => selectItem === data?._id)?.title : [];

  const cleanHTML = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Fazladan <p> etiketlerini kontrol et ve kaldır
    const paragraphs = doc.querySelectorAll('p');
    paragraphs.forEach((p) => {
      if (!p.textContent?.trim()) {
        p.remove(); // İçeriği boş olan <p> etiketlerini kaldır
      }
    });

    return doc.body.innerHTML;
  };

  return (
    <section className="ourworks-section">
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{findedDynamicTitle ? findedDynamicTitle : hasMeta?.meta_title}</title>
        <meta name="title" content={hasMeta?.meta_title} />
        <meta name="description" content={hasMeta?.meta_description} />
        <meta name="generator" content={hasMeta?.meta_generator} />
        <meta name="author" content={hasMeta?.meta_author} />
      </HelmetTag>
      <div className="works">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['gorduyumuz_isler_title']} />

        <div className="container-works">
          <h2>{translations['gorduyumuz_isler_title']}</h2>

          <div className="grid-works">
            <div className="navigation-content">
              {OurWorksInnerData && OurWorksInnerData.length > 0
                ? OurWorksInnerData.map((item: OurWorksInnerInterface) => (
                  <div
                    key={item?._id}
                    className="item-navigation"
                    onClick={() => {
                      handleSelectItem(item?._id || '');
                      window.scrollTo(0, 0);
                      if (isMobile) {
                        const el = document.getElementById('navigation_content');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}>
                    <div title={item?.title || ''} className="left-order-num-and-title">
                      <p title={item?.title || ''}>{item?.title}</p>
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
                        key={item?._id}
                        style={{ width: "100%" }}
                        className='description-content'
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(cleanHTML(item?.description || '')),
                        }}
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
                    <div onClick={() => handleImageClick(i)} className="image-wrapper" key={i}>
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
