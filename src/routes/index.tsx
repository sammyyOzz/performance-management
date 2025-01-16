import { ReactNode } from "react";
import { AuthRoutes } from "./modules";
import AuthLayout from "@/layouts/auth-layout";
import { AnimatePresence } from "motion/react";
import { Routes, Route } from "react-router";


function LocationProvider({ children }: { children: ReactNode }) {
    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

const Router = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="auth/*" element={<LocationProvider><AuthRoutes /></LocationProvider>} />
            </Route>
        </Routes>
    );
}
export default Router;