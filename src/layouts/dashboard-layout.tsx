import { Header } from "@/components/shared/Header";
import { Outlet } from "react-router";

export default function DashboardLayout() {
    return (
        <main className='w-full h-screen overflow-hidden'>
            <Header />
            <Outlet />
        </main>
    );
};