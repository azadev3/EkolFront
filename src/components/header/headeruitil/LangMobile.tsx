import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { SelectedLanguageState } from "../../../recoil/Atoms";

type LanguagesType = {
  id: number;
  title?: string;
  langValue: string;
};

export const LanguagesData: LanguagesType[] = [
  {
    id: 1,
    langValue: "az",
  },
  {
    id: 2,
    langValue: "az",
  },
  {
    id: 3,
    langValue: "az",
  },
];

const LangMobile: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useRecoilState(SelectedLanguageState);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("languageSelected");
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, [setSelectedLanguage]);

  const handleSelectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    localStorage.setItem("languageSelected", lang);
    setSelectedLanguage(lang);
  };

  return (
    <select className="select-language" onChange={handleSelectLanguage} value={selectedLanguage}>
     <option value="az">AZ</option>
     <option value="en">EN</option>
     <option value="ru">RU</option>
    </select>
  );
};

export default LangMobile;