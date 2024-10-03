import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { LeadershipModalState, Management } from "../routeuitils/about/Leadership";
import { Baseurl } from "../Baseurl";
import { SelectedLanguageState } from "../recoil/Atoms";
import axios from "axios";
import { useTranslate } from "../context/TranslateContext";
import DOMPurify from "dompurify";

const LeadershipModal: React.FC = () => {
  const { translations } = useTranslate();

  const selectedLang = useRecoilValue(SelectedLanguageState);

  //outside click leadership modal
  const leadershipModalRef = React.useRef<HTMLDivElement | null>(null);

  //leadership modal
  const [leadershipModal, setLeadershipModal] = useRecoilState(LeadershipModalState);
  const { data: managementData } = useQuery({
    queryKey: ["managementDataKey", selectedLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/managementfront`, {
        headers: {
          "Accept-Language": selectedLang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });
  React.useEffect(() => {
    const outsideClickedLeaderShip = (e: MouseEvent) => {
      if (leadershipModalRef?.current && !leadershipModalRef?.current?.contains(e.target as Node)) {
        setLeadershipModal("");
      }
    };

    document.addEventListener("mousedown", outsideClickedLeaderShip);
    return () => {
      document.removeEventListener("mousedown", outsideClickedLeaderShip);
    };
  }, []);

  const isLeadershipData: any =
    managementData && managementData?.length > 0
      ? managementData?.find((item: Management) => {
          return leadershipModal === item?._id;
        })
      : [];

  return (
    <div className="leadership-modal" ref={leadershipModalRef}>
      <div className="top-profile-and-user-info">
        <div className="profile">
          <img src={isLeadershipData ? `https://kaiyi-21d4.onrender.com${isLeadershipData?.profile}` : ""} alt="" />
        </div>
        <div className="right-description">
          <div className="top">
            <h3>{isLeadershipData ? isLeadershipData?.nameSurname : ""}</h3>
            <p>{isLeadershipData ? isLeadershipData?.job : ""}</p>
          </div>
          <div className="job-and-education">
            <div className="item-education">
              <div className="icon">
                <img src="/education.svg" alt="education" />
              </div>
              <article className="texts">
                <span>{translations["tehsil_title"]}</span>
                <p>{isLeadershipData ? isLeadershipData?.education : ""}</p>
              </article>
            </div>
            <div className="item-education">
              <div className="icon">
                <img src="/profiession.svg" alt="education" />
              </div>
              <article className="texts">
                <span>{translations["iş_title"]}</span>
                <p>{isLeadershipData ? isLeadershipData?.job : ""}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
      {isLeadershipData && isLeadershipData?.description ? (
        <div
          className="description-info"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(isLeadershipData?.description) }}
        />
      ) : (
        <p>Hələ ki, istifadəçi bir açıqlama bildirməyib.</p>
      )}
    </div>
  );
};

export default LeadershipModal;
