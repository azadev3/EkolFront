import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "./recoil/Atoms";
import axios from "axios";
import { Baseurl } from "./Baseurl";

export interface DynamicPageDataType {
  _id: string;
  description: string;
  image: string;
  path: string;
  title: string;
  dropdown_name: string;
}

export const useDynamicPageData = () => {
  const selectedLang = useRecoilValue(SelectedLanguageState);

  const { data: DynamicPageData } = useQuery<DynamicPageDataType[]>({
    queryKey: ["dynamicPageKey", selectedLang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/pagefront`, {
        headers: {
          "Accept-Language": selectedLang,
        },
      });
      console.log(res.data, "resdata");
      return res.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  return { DynamicPageData };
};
