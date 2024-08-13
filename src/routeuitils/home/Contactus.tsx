import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { Link } from "react-router-dom";
import { useTranslate } from "../../context/TranslateContext";
import Loader from "../../Loader";

export type SubInnerItemType = {
  id: number;
  title: string;
};

export type ContactDataType = {
  id: number;
  title: string;
  icon: string;
  innerItem?: SubInnerItemType[];
};

type Telephones = {
  logo: string;
  title: string;
  value: string;
};

type ContactDataTypes = {
  email: {
    logo: string;
    title: string;
    value: string;
  };
  faks: {
    logo: string;
    title: string;
    value: string;
  };
  location: {
    logo: string;
    title: string;
    value: string;
  };
  telephones: Telephones[];
};

export const ContactData: ContactDataType[] = [
  {
    id: 1,
    title: "Telefonlar",
    icon: "/phone.svg",
    innerItem: [
      { id: 1, title: "000 000 00 00" },
      { id: 2, title: "000 000 00 00" },
      { id: 3, title: "000 000 00 00" },
      { id: 4, title: "000 000 00 00" },
    ],
  },
  {
    id: 2,
    title: "Faks",
    icon: "/print.svg",
    innerItem: [{ id: 1, title: "000 000 00 00" }],
  },
  {
    id: 3,
    title: "Ünvan",
    icon: "/locationwhite.svg",
    innerItem: [{ id: 1, title: "Baku, Yasamal, A.M.Şərifzadə" }],
  },
  {
    id: 4,
    title: "Email",
    icon: "/email.svg",
    innerItem: [{ id: 1, title: "Nümunə@gmail.com" }],
  },
];

const Contactus: React.FC = () => {

  const { translations } = useTranslate();

  const selectedlang = useRecoilValue(SelectedLanguageState);

  const { data: ContactDatas } = useQuery({
    queryKey: ["contactDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/contactfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 9000000,
  });

  const [loadingIframe, setLoadingIframe] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoadingIframe(true);
  }, []);

  return (
    <section className="contact-us-section">
      <div className="contact-us">
        <h3>{translations['contact_us_title']}</h3>

        <div className="map-contact">
          {loadingIframe ? <Loader /> : ""}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3006.4228552601785!2d29.0255963!3d41.1034552!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2saz!4v1721485213637!5m2!1str!2saz"
            width="600"
            onLoad={() => setLoadingIframe(false)}
            height="450"
            style={{ border: "0", display: loadingIframe ? "none" : "" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>

          <div className="contact-information-box">
            {ContactDatas &&
              ContactDatas.length > 0 &&
              ContactDatas.map((item: ContactDataTypes, index: number) => (
                <div key={index} className="contact-datas">
                  {item?.telephones?.map((item: Telephones, indextwo: number) => (
                    <div key={indextwo} className="information-box">
                      <div className="left-icon">
                        <img src={`https://ekol-server.onrender.com${item?.logo}`} alt={`${indextwo}-logo`} title={item?.title} />
                      </div>
                      <div className="right-items">
                        <strong>{item?.title}</strong>
                        <div className="links">
                          <Link to={`tel:${item?.value}`}>{item?.value}</Link>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div key={Math.random()} className="information-box">
                    <div className="left-icon">
                      <img
                        src={`https://ekol-server.onrender.com${item?.faks.logo}`}
                        alt={`${index}-logo`}
                        title={item?.faks.title}
                      />
                    </div>
                    <div className="right-items">
                      <strong>{item?.faks.title}</strong>
                      <div className="links">
                        <Link to={`tel:${item?.faks.value}`}>{item?.faks.value}</Link>
                      </div>
                    </div>
                  </div>

                  <div key={Math.random()} className="information-box">
                    <div className="left-icon">
                      <img
                        src={`https://ekol-server.onrender.com${item?.location.logo}`}
                        alt={`${index}-logo`}
                        title={item?.location.title}
                      />
                    </div>
                    <div className="right-items">
                      <strong>{item?.location.title}</strong>
                      <div className="links">
                        <Link to="">{item?.location.value}</Link>
                      </div>
                    </div>
                  </div>

                  <div key={Math.random()} className="information-box">
                    <div className="left-icon">
                      <img
                        src={`https://ekol-server.onrender.com${item?.email.logo}`}
                        alt={`${index}-logo`}
                        title={item?.email.title}
                      />
                    </div>
                    <div className="right-items">
                      <strong>{item?.email.title}</strong>
                      <div className="links">
                        <Link to={`mailto:${item.email.value}`}>{item?.email.value}</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactus;
