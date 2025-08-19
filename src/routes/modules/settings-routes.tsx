import { Routes, Route } from "react-router";
import {
  DepartmentsPage,
  PerformanceSettings,
  ProfilePage,
  RolesAndPermissionsPage,
  RolesPage,
  SecurityPage,
  SettingsPage,
  UsersPage,
  ReportsPage,
} from "@/pages/settings";

const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<SettingsPage />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="team-members" element={<RolesAndPermissionsPage />}>
          <Route path="users" element={<UsersPage />} />
          <Route path="roles" element={<RolesPage />} />
        </Route>
        <Route path="security" element={<SecurityPage />} />
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="performance-settings" element={<PerformanceSettings />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
};

export default SettingsRoutes;
