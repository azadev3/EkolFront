import React from "react";
import { Route, Routes } from "react-router-dom";
import SocialLife from "../routeuitils/activity/SocialLife";
import Tools from "../routeuitils/activity/Tools";
import ServicesActivity from "../routeuitils/activity/ServicesActivity";
import ServicesPage from "../routeuitils/activity/ServicesPage";

const Activity: React.FC = () => {
  return (
    <main className="activity-page">
      <Routes>
        <Route path="/sosialheyat" element={<SocialLife />} />
        <Route path="/avadanliqlar" element={<Tools />} />
        <Route path="/xidmetler" element={<ServicesPage />} />
        <Route path="/xidmetler/:innerserviceid" element={<ServicesActivity />} />
      </Routes>
    </main>
  );
};

export default Activity;
