import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type TopCardData = {
  title: string;
  description: string;
  image: string;
};

type TopCardRightData = {
  id: number;
  title: string;
  to: string;
};

type BottomCardItemType = {
  id: number;
  title: string;
  count: string;
};

export const TopCardRightDataItem: TopCardRightData[] = [
  {
    id: 1,
    title: "Gördüyümüz işlər",
    to: "/about/workwedo",
  },
  {
    id: 2,
    title: "Sertifikatlar",
    to: "/about/certificates",
  },
  {
    id: 3,
    title: "Lisenziya",
    to: "/about/lisanses",
  },
  {
    id: 4,
    title: "Struktur",
    to: "/about/structure",
  },
  {
    id: 5,
    title: "Rəhbərlik",
    to: "/about/leadership",
  },
];

const CardAbout: React.FC = () => {
  const selectedlang = useRecoilValue(SelectedLanguageState);

  //ourworks
  const { data: ourWorksData } = useQuery<TopCardData[]>({
    queryKey: ["ourWorksDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/ourworksfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 9000000,
  });

  //statistics
  const { data: statisticsData } = useQuery<BottomCardItemType[]>({
    queryKey: ["statisticsDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/statisticsfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 9000000,
  });

  const [showRehberlik, setShowRehberlik] = React.useState<boolean>(false);
  const handleCheck = async () => {
    try {
      const res = await axios.get(`${Baseurl}/hidden-rehberlik-front`);
      if (res.data) {
        setShowRehberlik(res.data?.showed);
        console.log(res.data, "slam");
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    handleCheck();
  }, [showRehberlik]);

  return (
    <section className="card-about-section">
      <div className="card-about">
        <div className="top-card-area">
          <article className="left-descriptions">
            {ourWorksData && ourWorksData.length > 0
              ? ourWorksData.slice(0, 1).map((item: TopCardData, index: number) => (
                  <React.Fragment key={index}>
                    <h2>{item?.title}</h2>
                    <p>{item?.description}</p>
                  </React.Fragment>
                ))
              : ""}
          </article>

          {ourWorksData &&
            ourWorksData?.length > 0 &&
            ourWorksData.slice(0, 1).map((item: TopCardData, index: number) => {
              if (item.image) {
                return (
                  <article
                    key={index}
                    className="right-descriptions"
                    style={{ backgroundImage: `url(https://ekol-server-1.onrender.com${item?.image})` }}>
                    <div className="links">
                      {TopCardRightDataItem.map((item: TopCardRightData, i: number) => (
                        <Link style={{
                          display: i === 4 && !showRehberlik ? "none" : ""
                        }} to={item?.to} key={item?.id} className="right-nav-link">
                          <span>{item?.title}</span>
                          <img src="../iconin.png" alt="icon-right-arrow" />
                        </Link>
                      ))}
                    </div>
                  </article>
                );
              } else {
                <article key={index} className="right-descriptions">
                  <div className="links">
                    {TopCardRightDataItem.map((item: TopCardRightData) => (
                      <Link to={item?.to} key={item?.id} className="right-nav-link">
                        <span>{item?.title}</span>
                        <img src="../iconin.png" alt="icon-right-arrow" />
                      </Link>
                    ))}
                  </div>
                </article>;
              }
            })}
        </div>

        <div className="bottom-card-area">
          {statisticsData && statisticsData.length > 0
            ? statisticsData.map((item: BottomCardItemType, index: number) => (
                <div className="item-card" key={index}>
                  <h3>{item?.count}</h3>
                  <p>{item?.title}</p>
                </div>
              ))
            : ""}
        </div>
      </div>
    </section>
  );
};

export default CardAbout;
