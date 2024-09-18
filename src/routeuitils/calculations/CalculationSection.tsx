import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslate } from "../../context/TranslateContext";

const CalculationSection: React.FC = () => {
  const { translations } = useTranslate();

  return (
    <section className="calculation-section">
      <div className="calculation">
        <Breadcrumb prevpage={translations["nav_anasehife"]} uri={translations["nav_haqqimizda_hesabatlar"]} />

        <div className="container-calculation">
          <h2>{translations["hesabatlar_title"]}</h2>

          <div className="navigator">
            <NavLink to="illikhesabatlar" className="yearly">
              {translations["illik_hesabatlar_title"]}
            </NavLink>
            <NavLink to="rublukhesabatlar" className="quarterly">
              {translations["rubluk_hesabatlar_title"]}
            </NavLink>
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default CalculationSection;
