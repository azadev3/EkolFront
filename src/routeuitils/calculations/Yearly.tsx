import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import Loader from "../../Loader";

export type CalculationsDataType = {
  title: string;
  createdAt: string;
  pdf: string;
  _id: string;
};

const Yearly: React.FC = () => {
  const activeLang = useRecoilValue(SelectedLanguageState);

  const { data, isLoading } = useQuery({
    queryKey: ["yearlyKey", activeLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/yearly_calculationsfront`, {
        headers: {
          "Accept-Language": activeLang,
        },
      });
      return response.data;
    },
    staleTime: 2000000,
  });

  const hasData = data && data?.length > 0;

  const downloadPDF = (_id: string) => {
    const findUrl: any = hasData
      ? data?.find((item: CalculationsDataType) => {
          return _id === item?._id ? item?.pdf : "";
        })
      : "";
    const url: any = findUrl ? `https://ekol-server-1.onrender.com${findUrl?.pdf}` : "";
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = url.split("/").pop();
    link.click();
  };

  if (isLoading) return <Loader />;

  return (
    <div className="yearly-calculations">
      {hasData &&
        data?.map((item: CalculationsDataType) => (
          <div key={item?._id} className="yearly-data-item">
            <p className="titledata">{item?.title}</p>

            <button className="download-file-button" onClick={() => downloadPDF(item._id)}>
              PDF yüklə
            </button>
          </div>
        ))}
    </div>
  );
};

export default Yearly;
