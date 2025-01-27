import { Routes, Route } from "react-router";
import { KraPage } from "@/pages/kra";

const KraRoutes = () => {
  return (
    <Routes>
      <Route index element={<KraPage />} />
    </Routes>
  );
};

export default KraRoutes;