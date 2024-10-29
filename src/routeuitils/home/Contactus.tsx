import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { Link } from "react-router-dom";
import { useTranslate } from "../../context/TranslateContext";

export type SubInnerItemType = {
  id: number;
  title: string;
};

export type ContactDataType = {
  id: number;
  title: string;
  icon: string;
  innerItem?: SubInnerItemType[];
  map?: string;
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

  const [map, setMap] = React.useState<string>("");

  const { data: ContactDatas } = useQuery({
    queryKey: ["contactDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/contactfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      setMap(response.data[0]?.map || "");
      return response.data;
    },
    staleTime: 9000000,
  });

  return (
    <section className="contact-us-section">
      <div className="contact-us">
        <h3>{translations['contact_us_title']}</h3>

        <div className="map-contact">
          <div className="iframe-div" dangerouslySetInnerHTML={{ __html: ContactData ? map?.replace(/\\"/g, '"') || "" : ""  }} />

          <div className="contact-information-box">
            {ContactDatas &&
              ContactDatas.length > 0 &&
              ContactDatas.map((item: ContactDataTypes, index: number) => (
                <div key={index} className="contact-datas">
                  {item?.telephones?.map((item: Telephones, indextwo: number) => (
                    <div key={indextwo} className="information-box">
                      <div className="left-icon">
                        <img src={`https://ekol-server-1.onrender.com${item?.logo}`} alt={`${indextwo}-logo`} title={item?.title} />
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
                        src={`https://ekol-server-1.onrender.com${item?.faks.logo}`}
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
                        src={`https://ekol-server-1.onrender.com${item?.location.logo}`}
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
                        src={`https://ekol-server-1.onrender.com${item?.email.logo}`}
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
