import { Routes, Route } from "react-router";
import { DashboardPage, KraOverviewPage, KraPage, KraResponsibilityPage, ViewDashboardKraPage } from "@/pages/dashboard";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="kra" element={<KraPage />} />
      <Route path="kra/:id" element={<ViewDashboardKraPage />}>
        <Route index element={<KraOverviewPage />} />
        <Route path="responsibility" element={<KraResponsibilityPage />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;