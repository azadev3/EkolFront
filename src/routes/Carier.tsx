import React from "react";
import CarierSection from "../routeuitils/carier/CarierSection";
import { Route, Routes } from "react-router-dom";
import VacationInner from "../routeuitils/carier/VacationInner";
import RequestVacation from "../routeuitils/carier/RequestVacation";

const Carier: React.FC = () => {
  return (
    <main className="carier-page">
      <Routes>
        <Route path="/" element={<CarierSection />} />
        <Route path="/:vacid" element={<VacationInner />} />
        <Route path="/:vacid/:reqid" element={<RequestVacation />} />
      </Routes>
    </main>
  );
};

export default Carier;
