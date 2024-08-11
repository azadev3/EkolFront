import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import Loader from "../../Loader";

type VideosType = {
  _id: string;
  video: string;
};

const Videos: React.FC = () => {

  const [loadingIframe, setLoadingIframe] = React.useState<boolean>(false);

  //fetch videos
  const { data: videoData, isLoading, isError, error } = useQuery<VideosType[]>({
    queryKey: ["videoDataKey"],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/videosfront`);
      return response.data;
    },
    staleTime: 3000000,
  });

  const hasVideoData = videoData && videoData?.length > 0;

  React.useEffect(() => {
    setLoadingIframe(true);
    if(isError) {
      setLoadingIframe(false);
    }
  }, [videoData]);

  return (
    <section className="videos-section">
      <div className="videos">
        <Breadcrumb prevpage="Ana səhifə" uri="Videolar" />

        <div className="container-videos">
          <h2>Videolar</h2>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <p className="error-msg">Bir problem baş verdi. Zəhmət olmasa yenidən yoxlayın. <strong>Error: {error && error.message ? error.message : ""}</strong></p>
          ) : (
            <div className="videos-content-grid">
              {hasVideoData
                ? videoData?.map((item: VideosType) => (
                    <div className="item-video">
                      {loadingIframe ? <Loader /> : ""}
                      <iframe 
                      style={{display: loadingIframe ? "none" : ""}}
                      onLoad={() => setLoadingIframe(false)}
                      src={item.video ? item.video : ""}></iframe>
                    </div>
                  ))
                : ""}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Videos;
