import { ReactNode, useEffect } from "react";
import { Home } from "@/pages";
import AuthLayout from "@/layouts/auth-layout";
import { AnimatePresence } from "motion/react";
import { isAuthenticated } from "@/utils/authUtil";
import { Routes, Route, Navigate, useLocation } from "react-router";
import DashboardLayout from "@/layouts/dashboard-layout";
import { AuthRoutes, DashboardRoutes, KRAsRoutes, SettingsRoutes } from "./modules";
import { useRefreshToken } from "@/services/hooks/mutations";
import { getItem } from "@/utils/localStorage";


function LocationProvider({ children }: { children: ReactNode }) {
    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

const getTokenExpiration = (): number => {
    const token = localStorage.getItem("token");
    if (!token) return 0;
    
    const decryptedToken = JSON.parse(atob(token.split(".")[1]));
    return decryptedToken?.exp * 1000;
};

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const location = useLocation()
    const isLoggedIn = isAuthenticated();
    const { mutate } = useRefreshToken();

    useEffect(() => {
        const token = getItem<string>("token");
        if (!token) return;

        const setupRefreshTimer = () => {
            const expiration = getTokenExpiration();
            const timeUntilRefresh = expiration - Date.now() - 60000;
            
            if (timeUntilRefresh <= 0) {
                mutate(token);
                return;
            }
            
            const timer = setTimeout(() => {
                mutate(token);
            }, timeUntilRefresh);
            
            return () => clearTimeout(timer);
        };
        
        const timer = setupRefreshTimer();
        return () => timer?.();
    }, [localStorage.getItem("token")]); // Re-run when token changes
    
    if (!isLoggedIn) {
        return <Navigate to={`/auth/login?prevRoute=${location.pathname}`} replace />;
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
                <Route path="settings/*" element={<LocationProvider><SettingsRoutes /></LocationProvider>} />
            </Route>
        </Routes>
    );
}
export default Router;