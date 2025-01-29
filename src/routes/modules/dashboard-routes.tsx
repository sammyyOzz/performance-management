import { Routes, Route } from "react-router";
import { DashboardPage, KraPage } from "@/pages/dashboard";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="kra" element={<KraPage />} />
    </Routes>
  );
};

export default DashboardRoutes;