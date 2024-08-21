import React, { createContext, useContext } from "react";
import axios from "axios";
import { Baseurl } from "../Baseurl";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../recoil/Atoms";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";

// Translate Types
type TranslateType = {
  key: string;
  text: string;
};

type TranslateContextType = {
  translations: Record<string, string>;
};

// Create Context
const TranslateContext = createContext<TranslateContextType | undefined>(undefined);

export const TranslateContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const selectedlang = useRecoilValue(SelectedLanguageState);

  const {
    data: translateData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["translateDataKey", selectedlang],
    queryFn: async () => {
      try {
        const response = await axios.get<TranslateType[]>(`${Baseurl}/translatesfront`, {
          headers: {
            "Accept-Language": selectedlang,
          },
        });
        const data = response.data;
        const translatedTexts: Record<string, string> = {};

        data.forEach((item) => {
          translatedTexts[item.key] = item.text;
        });

        return translatedTexts;
      } catch (error) {
        console.error("Error fetching translations:", error);
        throw new Error("Failed to load translations. Please try again later.");
      }
    },
    staleTime: 3000000,
    retry: 2, 
  });

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div style={{ color: "red", padding: "20px", textAlign: "center" }}>
        Something went wrong while fetching translations. Please try again later.
      </div>
    );
  }

  return (
    <TranslateContext.Provider value={{ translations: translateData || {} }}>
      {children}
    </TranslateContext.Provider>
  );
};

// Hook to use the TranslateContext
export const useTranslate = () => {
  const context = useContext(TranslateContext);
  if (!context) {
    throw new Error("useTranslate must be used within a TranslateContextProvider");
  }
  return context;
};
