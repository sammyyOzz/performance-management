import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <main className='w-full h-screen overflow-hidden'>
            <section className="grid grid-cols-1 xl:grid-cols-2 gap-24 py-11 px-7 h-full">
                <div className="bg-green-primary-10 rounded-[2rem] overflow-hidden relative hidden xl:block">
                    <img src="/mpr_logo_white.svg" alt="Ministry of Petroleum Resources Logo" className="absolute top-7 left-7" />
                    <div className="bg-[url('/auth_bg.webp')] bg-[#0A0D14]/[0.5] bg-blend-overlay bg-cover bg-center h-full w-full" />
                    <div className="absolute bottom-12 bg-white-10/15 p-4 inset-x-9 rounded-2xl flex flex-col gap-6">
                        <h1 className="font-semibold text-white-10 text-6xl">Petroleum <br></br> Management <br></br> System</h1>
                        <p className="text-lg text-white-10">Our all-in-one work management system provides a wide range of tools to monitor important performance areas.</p>
                    </div>
                </div>
                <Outlet />
            </section>
        </main>
    );
};