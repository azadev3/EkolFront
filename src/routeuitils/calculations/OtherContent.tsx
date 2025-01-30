import React from "react";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { useQuery } from "@tanstack/react-query";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../Loader";

export interface DynamicCalcCategoryContent {
    _id: string;
    title: string;
    pdf: string;
    selected_category: string;
}

const OtherContent: React.FC = () => {

    const { dynamic } = useParams<{ dynamic: string }>();

    const activeLang = useRecoilValue(SelectedLanguageState);

    //contents
    const { data: DynamicCategoryContentData, isLoading } = useQuery<DynamicCalcCategoryContent[]>({
        queryKey: ['DynamicCalcCategoryContentKey', activeLang],
        queryFn: async () => {
            const res = await axios.get(`${Baseurl}/dynamic-category-content-front`, {
                headers: {
                    "Accept-Language": activeLang,
                }
            });
            console.log(res.data, 'dynamic categocontent')
            return res.data;
        }
    });

    const findedDatas = DynamicCategoryContentData && DynamicCategoryContentData?.length > 0 ? DynamicCategoryContentData?.filter((data: DynamicCalcCategoryContent) => {
        return dynamic === data?.selected_category;
    }) : [];

    console.log(findedDatas)

    const downloadPDF = (_id: string) => {
        const findUrl: any = findedDatas
            ? findedDatas?.find((item: DynamicCalcCategoryContent) => {
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


    return (
        <div className="quarterly-calculations">
            {isLoading ? (
                <Loader />
            ) : findedDatas &&
            findedDatas?.map((item: DynamicCalcCategoryContent) => (
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

export default OtherContent;
