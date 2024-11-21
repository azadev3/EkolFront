import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SelectedLanguageState } from "../../../recoil/Atoms";

type LanguagesType = {
  id: number;
  title: string; 
  langValue: string;
};

export const LanguagesData: LanguagesType[] = [
  {
    id: 1,
    title: "AZ",
    langValue: "az",
  },
  {
    id: 2,
    title: "EN",
    langValue: "en",
  },
  {
    id: 3,
    title: "RU",
    langValue: "ru",
  },
];

const Language: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useRecoilState(SelectedLanguageState);
  const [dropdown, setDropdown] = useState<boolean>(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("languageSelected");
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, [setSelectedLanguage]);

  const handleSelectLanguage = (lang: string) => {
    localStorage.setItem("languageSelected", lang);
    setSelectedLanguage(lang);
    setDropdown(false);
  };

  return (
    <div className="select-language" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
      <div className="selected-lang">{selectedLanguage.toUpperCase()}</div>
        <div className={`dropdown-menu ${dropdown ? "actived" : ""}`}>
          {LanguagesData.map((langs: LanguagesType) => (
            <div key={langs.id} className="lang-item" onClick={() => handleSelectLanguage(langs.langValue)}>
             <span> {langs.title}</span>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Language;
