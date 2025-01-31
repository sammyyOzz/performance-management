import { Routes, Route } from "react-router";
import { ForgotPasswordPage, InvitePage, LoginPage } from "@/pages/auth"

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="invite" element={<InvitePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  );
};

export default AuthRoutes;