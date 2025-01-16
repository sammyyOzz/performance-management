import { Routes, Route } from "react-router";
import { LoginPage } from "@/pages/auth"

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
};

export default AuthRoutes;