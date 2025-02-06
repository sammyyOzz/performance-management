import { ReactNode } from "react";
import { Home } from "@/pages";
import AuthLayout from "@/layouts/auth-layout";
import { AnimatePresence } from "motion/react";
import { isAuthenticated } from "@/utils/authUtil";
import { Routes, Route, Navigate } from "react-router";
import DashboardLayout from "@/layouts/dashboard-layout";
import { AuthRoutes, DashboardRoutes, KRAsRoutes } from "./modules";


function LocationProvider({ children }: { children: ReactNode }) {
    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const isLoggedIn = isAuthenticated();
    
    if (!isLoggedIn) {
        return <Navigate to="/auth/login" replace />;
    }
    
    return <>{children}</>;
};

// Public Route wrapper (redirects to dashboard if authenticated)
const PublicRoute = ({ children }: { children: ReactNode }) => {
    const isLoggedIn = isAuthenticated();
    
    if (isLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }
    
    return <>{children}</>;
};


const Router = () => {
    return (
        <Routes>
            <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
                <Route path="auth/*" element={<LocationProvider><AuthRoutes /></LocationProvider>} />
            </Route>
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route index element={<LocationProvider><Home /></LocationProvider>} />
                <Route path="dashboard/*" element={<LocationProvider><DashboardRoutes /></LocationProvider>} />
                <Route path="kra/*" element={<LocationProvider><KRAsRoutes /></LocationProvider>} />
            </Route>
        </Routes>
    );
}
export default Router;