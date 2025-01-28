import React from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { atom, useRecoilState } from "recoil";
import { SocialsType } from "../../../routeuitils/home/Hero";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../../Baseurl";
import axios from "axios";
import { Link } from "react-router-dom";

export const ShareModal = atom<boolean>({
  key: "ShareModal",
  default: false,
});

const ShareButton: React.FC = () => {
  const [shareModal, setShareModal] = useRecoilState(ShareModal);

  //socials
  const { data: SocialsData } = useQuery<SocialsType[]>({
    queryKey: ["socialData"],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/socialsfront`);
      return response.data;
    },
    staleTime: 9000000,
  });

  return (
    <section
      className={`share-media ${shareModal ? "actived" : ""}`}
      onMouseEnter={() => setShareModal(true)}
      onMouseLeave={() => setShareModal(false)}
      >
      {/* <span>Sosial media</span> */}
      <IoShareSocialOutline className="share-icon" />

      <div className={`modal-share ${shareModal ? "active-modal" : ""}`}>
          {SocialsData && SocialsData.length > 0
            ? SocialsData.map((item: SocialsType) => (
                <Link target="_blank" key={item?._id} to={item?.link} className="icon">
                  <img
                    src={`https://ekol-server-1.onrender.com${item?.icon}`}
                    alt={`${item?._id}-icon`}
                    title={item?.link}
                  />
                </Link>
              ))
            : ""}
        </div>
    </section>
  );
};

export default ShareButton;
