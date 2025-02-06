import { Outlet } from "react-router";
import { Header } from "@/components/shared/Header";

export default function DashboardLayout() {
    return (
        <main className='w-full h-screen overflow-hidden'>
            <Header />
            <Outlet />
        </main>
    );
};