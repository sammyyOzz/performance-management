import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <main className='w-full h-screen overflow-hidden'>
            <section className="grid grid-cols-1 xl:grid-cols-2 gap-24 py-11 px-7 h-full">
                <div className="bg-green-primary-10 rounded-[2rem] overflow-hidden relative hidden xl:block">
                    <img src="/mpr_logo.svg" alt="Ministry of Petroleum Resources Logo" className="absolute top-7 left-7" />
                    <div className="bg-[url('/auth_bg.webp')] bg-green-primary-40/[0.12] bg-blend-overlay bg-cover bg-center h-full w-full" />
                </div>
                <Outlet />
            </section>
        </main>
    );
};