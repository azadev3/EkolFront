import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { SelectedLanguageState } from "../../../recoil/Atoms";

const Language: React.FC = () => {
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
      <option value="az">az</option>
      <option value="en">en</option>
      <option value="ru">ru</option>
    </select>
  );
};

export default Language;
