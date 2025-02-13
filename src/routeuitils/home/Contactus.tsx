import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { Link } from "react-router-dom";
import { useTranslate } from "../../context/TranslateContext";
import Loader from "../../Loader";

export type IconType = {
  _id: string;
  color: string;
  icon: string;
  title: string;
  url: string;
  value: string;
  mainTitle: string;
}

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

// type Telephones = {
//   logo: string;
//   title: string;
//   value: string;
// };

// type ContactDataTypes = {
//   email: {
//     logo: string;
//     title: string;
//     value: string;
//   };
//   faks: {
//     logo: string;
//     title: string;
//     value: string;
//   };
//   location: {
//     logo: string;
//     title: string;
//     value: string;
//   };
//   telephones: Telephones[];
// };

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

  const { data: _ } = useQuery({
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

  const { data: MapIcons, isLoading } = useQuery<IconType[]>({
    queryKey: ['mapicons_key'],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/get-icon-map`);
      console.log(res.data, 'mapiconlar');
      return res.data;
    }
  });

  const redirectByIndex = (index: number, data: IconType[]) => {
    if (data && data?.length > 0) {
      switch (index) {
        case 0:
          return `tel:${data[0]?.value}`;
        case 1:
          return `tel:${data[1]?.value}`;
        case 2:
          return;
        case 3:
          return `mailto:${data[3]?.value}`;
      }
    }
  }

  return (
    <section className="contact-us-section">
      <div className="contact-us">
        <h3>{translations["con   tact_us_title"]}</h3>

        <div className="map-contact">
          <div
            className="iframe-div"
            dangerouslySetInnerHTML={{ __html: ContactData ? map?.replace(/\\"/g, '"') || "" : "" }}
          />

          {isLoading ? (
            <Loader />
          ) : (
            <div className="contact-information-box">
              <h3>Əlaqə məlumatları</h3>
              <div className="datas">
                {MapIcons && MapIcons?.length > 0 ? MapIcons?.map((icons: IconType, i: number) => (
                  <div className="data-map" key={icons?._id}>
                    <div className="left-icon-area" style={{ backgroundColor: icons?.color }}>
                      <img src={`https://ekol-server-1.onrender.com/public/${icons?.icon}`} alt={icons?.title} />
                    </div>
                    <div className="right-area">
                      <h4 className="title-main">{icons?.mainTitle}</h4>
                      <div className="others">
                        <Link to={redirectByIndex(i, MapIcons as IconType[]) || ''} className="value">{icons?.value}</Link>
                      </div>
                    </div>
                  </div>
                )) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contactus;
