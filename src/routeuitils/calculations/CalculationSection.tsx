import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { NavLink, Outlet } from "react-router-dom";

const CalculationSection: React.FC = () => {
  return (
    <section className="calculation-section">
      <div className="calculation">
        <Breadcrumb prevpage="Ana səhifə" uri="Hesabatlar" />

        <div className="container-calculation">
          <h2>Hesabatlar</h2>

          <div className="navigator">
            <NavLink to="rublukhesabatlar" className="quarterly">
              Rüblük hesabatlar
            </NavLink>
            <NavLink to="illikhesabatlar" className="yearly">
              İllik hesabatlar
            </NavLink>
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default CalculationSection;
