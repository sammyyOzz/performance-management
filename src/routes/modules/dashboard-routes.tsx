import { Routes, Route } from "react-router";
import { CreateDashboardKraPage, DashboardPage, KraOverviewPage, KraPage, KraResponsibilityPage, ViewDashboardKraPage } from "@/pages/dashboard";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="kra" element={<KraPage />} />
      <Route path="kra/create" element={<CreateDashboardKraPage />} />
      <Route path="kra/:id" element={<ViewDashboardKraPage />}>
        <Route path="overview" element={<KraOverviewPage />} />
        <Route path="responsibility" element={<KraResponsibilityPage />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;