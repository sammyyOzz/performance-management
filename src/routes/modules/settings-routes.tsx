import { Routes, Route } from "react-router";
import { RolesAndPermissionsPage, RolesPage, SecurityPage, SettingsPage, UsersPage } from "@/pages/settings";

const SettingsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<SettingsPage />}>
                <Route path="roles-and-permissions" element={<RolesAndPermissionsPage />}>
                    <Route path="users" element={<UsersPage />} />
                    <Route path="roles" element={<RolesPage />} />
                </Route>
                <Route path="security" element={<SecurityPage />} />
                <Route path="branches" element={<div>branches</div>} />
                <Route path="departments" element={<div>sections</div>} />
                <Route path="officers" element={<div>officers</div>} />
            </Route>
        </Routes>
    );
};

export default SettingsRoutes;