import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { useTranslate } from "../../context/TranslateContext";

const CarbonCalculateContent: React.FC = () => {
  const { translations } = useTranslate();

  return (
    <section className="carbon-section">
      <div className="carbons">
        <Breadcrumb prevpage={translations["nav_anasehife"]} uri={translations["carbon_calculate"]} />

        <div className="container-carbons">
          <h2>{translations["carbon_calculate"]}</h2>

          <section className="carbon_content">
            <div className="area-calculator">
              <iframe
                width="710"
                height="1300"
                src="https://calculator.carbonfootprint.com/calculator.aspx?c=&amp;lang=en-GB"></iframe>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default CarbonCalculateContent;
