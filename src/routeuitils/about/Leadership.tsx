import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader";
import { Baseurl } from "../../Baseurl";
import axios from "axios";

export const LeadershipModalState = atom<string>({
  key: "leadershipModalStateKey",
  default: "",
});

export interface Management {
  _id: string;
  profile: string;
  nameSurname: string;
  job: string;
  description: string,
  education: string,
}

const Leadership: React.FC = () => {
  const selectedlang = useRecoilValue(SelectedLanguageState);

  const { data: managementData, isLoading: managementLoading } = useQuery({
    queryKey: ["managementDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/managementfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  //leadership modal
  const [_, setLeadershipModal] = useRecoilState(LeadershipModalState);

  const handleLeadershipModal = (_id: string) => {
    setLeadershipModal(_id);
  } 
  return (
    <section className="leadership-section">
      <div className="leadership">
        <Breadcrumb prevpage="Ana səhifə" uri="Rəhbərlik" />

        {managementLoading ? (
          <Loader />
        ) : (
          <div className="container-leadership">
            <h2>Rəhbərlik</h2>

            <div className="grid-leadership">
              {managementData && managementData.length > 0
                ? managementData.map((item: Management, index: number) => (
                    <article key={index} className="leadership-grid-item"
                    onClick={() => handleLeadershipModal(item?._id)}
                    >
                      <div className="profile">
                        <img
                          src={`http://localhost:3000${item?.profile}`}
                          alt={`${item?._id}-profile`}
                          title={item?.nameSurname}
                        />
                      </div>
                      <div className="name-and-surname-and-job">
                        <strong>{item?.nameSurname}</strong>
                        <span>{item?.job}</span>
                      </div>
                    </article>
                  ))
                : ""}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Leadership;
