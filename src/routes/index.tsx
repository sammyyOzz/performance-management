import { ReactNode } from "react";
import { AuthRoutes, KraRoutes } from "./modules";
import AuthLayout from "@/layouts/auth-layout";
import { AnimatePresence } from "motion/react";
import { Routes, Route } from "react-router";
import DashboardLayout from "@/layouts/dashboard-layout";
import { DashboardPage } from "@/pages";


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
                <Route index element={<LocationProvider><DashboardPage /></LocationProvider>} />
                <Route path="kra" element={<LocationProvider><KraRoutes /></LocationProvider>} />
            </Route>
        </Routes>
    );
}
export default Router;