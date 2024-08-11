import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import Loader from "../../Loader";

type WhoWeAreType = {
  _id: string;
  title: string;
  description: string;
  image: string;
};

const WhoWeAre: React.FC = () => {
  const selectedlang = useRecoilValue(SelectedLanguageState);

  const { data: WhoWeAreData, isLoading: WhoWeAreLoading } = useQuery({
    queryKey: ["whoAreWeData", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/whoarewefront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  if (WhoWeAreLoading) {
    return <Loader />;
  }

  return (
    <section className="who-we-are-section">
      <div className="whoweare">
        <Breadcrumb prevpage="Ana səhifə" uri="Biz kimik?" />

        {WhoWeAreData && WhoWeAreData.length > 0
          ? WhoWeAreData.map((item: WhoWeAreType, index: number) => (
              <div className="container-whoweare" key={index}>
                <h2>{item?.title}</h2>

                <div className="image-container">
                  <img src={`http://localhost:3000${item?.image}`} alt={`${item?._id}-img`} title={item?.title} />
                </div>

                <div className="description-container">
                  <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                </div>
              </div>
            ))
          : ""}
      </div>
    </section>
  );
};

export default WhoWeAre;
