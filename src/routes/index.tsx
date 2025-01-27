import { ReactNode } from "react";
import { Routes, Route } from "react-router";
import AuthLayout from "@/layouts/auth-layout";
import { AnimatePresence } from "motion/react";
import { AuthRoutes, DashboardRoutes } from "./modules";
import DashboardLayout from "@/layouts/dashboard-layout";


function LocationProvider({ children }: { children: ReactNode }) {
    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

const Router = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="auth/*" element={<LocationProvider><AuthRoutes /></LocationProvider>} />
            </Route>
            <Route element={<DashboardLayout />}>
                <Route path="dashboard/*" element={<LocationProvider><DashboardRoutes /></LocationProvider>} />
            </Route>
        </Routes>
    );
}
export default Router;