import { Routes, Route } from "react-router";
import { InvitePage, LoginPage } from "@/pages/auth"

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="invite" element={<InvitePage />} />
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
};

export default AuthRoutes;