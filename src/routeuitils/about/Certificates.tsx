import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import DOMPurify from "dompurify";
import Loader from "../../Loader";

interface Certificates {
  _id: string;
  title: string;
  description: string;
}

const Certificates: React.FC = () => {
  //fetch certificates data
  const selectedlang = useRecoilValue(SelectedLanguageState);
  const { data: certificatesData, isLoading } = useQuery<Certificates[]>({
    queryKey: ["certificatesDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/certificatesfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  const hasCertificatesData = certificatesData && certificatesData?.length > 0;

  return (
    <section className="certificates-section">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="certificates">
          <Breadcrumb prevpage="Ana səhifə" uri="Sertifikatlar" />

          {hasCertificatesData
            ? certificatesData?.map((item: Certificates) => (
                <div className="container-certificates" key={item?._id}>
                  <h2>{item?.title}</h2>

                  <div
                    className="description-certificates"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description) }}
                  />
                </div>
              ))
            : ""}
        </div>
      )}
    </section>
  );
};

export default Certificates;
