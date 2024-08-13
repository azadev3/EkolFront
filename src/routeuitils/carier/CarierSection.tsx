import React from "react";
import Breadcrumb from "../../Breadcrumb";
import GeneralInformation from "./GeneralInformation";
import Vacations from "./Vacations";
import { useTranslate } from "../../context/TranslateContext";

type NavigationType = {
  id: number;
  title: string;
};

const CarierSection: React.FC = () => {
  const { translations } = useTranslate();

  const NavigationItems: NavigationType[] = [
    {
      id: 1,
      title: `${translations["nav_title_umumimelumat"]}`,
    },
    {
      id: 2,
      title: `${translations["nav_title_vakansiyalar"]}`,
    },
  ];
  //selected nav , rendered relation component
  const [selectedItem, setSelectedItem] = React.useState<number>(0);

  const handleSelectItem = (i: number) => {
    setSelectedItem(i);
  };

  return (
    <section className="carier-section">
      <div className="carier">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={translations['karyera_imkanlari']} />

        <div className="container-carier">
          <h2>{translations["karyera_imkanlari"]}</h2>

          <div className="carier-content-area">
            <div className="navigation">
              {NavigationItems.map((item: NavigationType, i: number) => (
                <span
                  onClick={() => handleSelectItem(i)}
                  className={`navigation-item ${selectedItem === i ? "active-nav" : ""}`}
                  key={item?.id}>
                  {item?.title}
                </span>
              ))}
            </div>

            <div className="content-carier">
              {selectedItem === 0 && <GeneralInformation />}
              {selectedItem === 1 && <Vacations />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarierSection;
