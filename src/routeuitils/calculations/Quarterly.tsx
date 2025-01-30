import React from "react";
import { CalculationsDataType } from "./Yearly";
import Loader from "../../Loader";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { useQuery } from "@tanstack/react-query";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { useTranslate } from "../../context/TranslateContext";

const Quarterly: React.FC = () => {
  const activeLang = useRecoilValue(SelectedLanguageState);
  const { translations } = useTranslate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["quarterlyKey", activeLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/quarterly_calculationsfront`, {
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

    if (findUrl === undefined) {
      toast.warning('Bu məlumat üçün PDF təyin edilməyib', {
        position: 'bottom-right'
      })
      return;
    }
    const url: any = findUrl ? `https://ekol-server-1.onrender.com${findUrl?.pdf}` : "";
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = url.split("/").pop();
    link.click();
  };

  if (isLoading) return <Loader />;

  if (isError) return <p style={{ margin: '3rem', padding: '1rem', color: '#303030' }}>{translations['melumat_tapilmadi']}</p>

  return (
    <div className="quarterly-calculations">
      {hasData &&
        data.map((item: CalculationsDataType) => (
          <div key={item?._id} className="quarterly-data-item">
            <p className="titledata">{item?.title}</p>

            <button className="download-file-button" onClick={() => downloadPDF(item?._id)}>
              PDF yüklə
            </button>
          </div>
        ))}
    </div>
  );
};

export default Quarterly;
