import { Routes, Route } from "react-router";
import { KraPage } from "@/pages/dashboard";
import { DashboardPage } from "@/pages";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="kra" element={<KraPage />} />
    </Routes>
  );
};

export default DashboardRoutes;