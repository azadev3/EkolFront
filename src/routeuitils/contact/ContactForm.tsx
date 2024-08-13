import React, { useState } from "react";
import Breadcrumb from "../../Breadcrumb";
import { ContactData, ContactDataType, SubInnerItemType } from "../home/Contactus";
import { Link } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import Loader from "../../Loader";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useQuery } from "@tanstack/react-query";
import { useTranslate } from "../../context/TranslateContext";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";

interface LocationInterface {
  _id: string;
  title: string;
  mapUrl: string;
}

const ContactForm: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const selectedLanguage = useRecoilValue(SelectedLanguageState);

  const { data: locationData, isLoading } = useQuery<LocationInterface[]>({
    queryKey: ["locationKey", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/locationfront`, {
        headers: {
          "Accept-Language": selectedLanguage,
        },
      });
      return response.data;
    },
    staleTime: 2000000,
  });

  const [selectedActive, setSelectedActive] = useState<string>("");
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);

  React.useEffect(() => {
    if (locationData && locationData.length > 0) {
      const initialActive = locationData[0]._id;
      setSelectedActive(initialActive);
    }
  }, [locationData]);

  const handleActiveLocation = (_id: string) => {
    setSelectedActive(_id);
    setIframeLoading(true);
  };

  const hasLocationData = locationData && locationData?.length > 0;

  const { translations } = useTranslate();

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const response = await axios.post(`${Baseurl}/appeals`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data) {
        formRef && formRef?.current && formRef.current?.reset();
        toast.success("Təşəkkür edirik! Məlumatlarınız şirkətə müvəffəqiyyətlə göndərildi. Ən qısa zamanda sizinlə əlaqə saxlanılacaq.", {
          position: "top-center"
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Bir problem oldu...", {
        position: "top-center"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['nav_haqqimizda_elaqe']} />

        <div className="container-contact">
          <h2>{translations["bizimle_elaqe"]}</h2>

          <div className="container-locations">
            <Swiper className="mySwiper" spaceBetween={12}
            breakpoints={{
              268: {
                slidesPerView: 2,
              },
              568: {
                slidesPerView: 3,
              },
              968: {
                slidesPerView: 9,
              }
            }}
            >
              {hasLocationData &&
                locationData?.map((item: LocationInterface) => (
                  <SwiperSlide
                    key={item._id}
                    className={selectedActive === item._id ? "actived" : ""}
                    onClick={() => {
                      handleActiveLocation(item._id);
                    }}>
                    {item.title}
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          <section className="contact-us-section">
            <div className="contact-us">
              <div className="map-contact">
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {hasLocationData &&
                      locationData.map((item) => {
                        if (selectedActive === item._id) {
                          return (
                            <div key={item._id} className="map-wrapper">
                              {iframeLoading && <Loader />}
                              <iframe
                                loading="lazy"
                                src={item.mapUrl}
                                style={{ border: "0" }}
                                onLoad={() => setIframeLoading(false)}
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                          );
                        }
                      })}
                  </>
                )}

                <div className="contact-information-box">
                  {ContactData.map((item: ContactDataType) => (
                    <div key={item.id} className="information-box">
                      <div className="left-icon">
                        <img src={item.icon} alt={`${item.id}-icon`} title={item.title} />
                      </div>
                      <div className="right-items">
                        <strong>{item.title}</strong>
                        {item.innerItem?.map((innerItem: SubInnerItemType) => (
                          <div className="links" key={innerItem.id}>
                            <Link to="">{innerItem.title}</Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="form-area">
            <div className="left-texts">
              <h3>{translations['form_title']}</h3>
              <p>{translations['form_paragraph']}</p>
            </div>

            <div className="form">
              <form ref={formRef} onSubmit={handleSubmitForm}>
                <div className="field-input">
                  <img src="/pers.png" alt="pers" />
                  <input className="name_surname" name="name_surname" placeholder={translations['form_namesurname']} type="text" required />
                </div>
                <div className="field-input">
                  <img src="/email.png" alt="email" />
                  <input className="email" name="email" placeholder={translations['form_email']} type="email" required />
                </div>
                <div className="field-input">
                  <select name="prefix" required>
                    <option value="051">051</option>
                    <option value="050">050</option>
                    <option value="055">055</option>
                    <option value="070">070</option>
                    <option value="077">077</option>
                    <option value="010">010</option>
                  </select>
                  <input
                    className="telephone"
                    name="telephone"
                    placeholder="000 00 00"
                    type="number"
                    required
                    style={{ paddingLeft: "85px" }}
                  />
                </div>
                <div className="field-input">
                  <textarea className="record" name="record" placeholder={translations['form_record']} required />
                </div>
                <button
                  style={{ cursor: loading ? "auto" : "pointer", background: loading ? "transparent" : "" }}
                  disabled={loading}
                  type="submit"
                  className="send">
                  {loading ? <Loader /> : translations['send_button']}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;