import { useMemo, useRef } from "react";
import { Outlet } from "react-router";

export default function AuthLayout() {
    const footerRef = useRef<HTMLDivElement>(null)
    const footerDimensions = useMemo(() => { 
        return footerRef?.current?.getBoundingClientRect()
     }, [])
    return (
        <main className='w-full h-screen overflow-hidden bg-[#ebf7eb] relative'>
            {/* Colorful streak background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div 
                    style={{
                        position: 'absolute',
                        top: '-10%',
                        left: '20%',  // Shifted starting point to the right
                        width: '100%', // Reduced width to focus on right
                        height: '200px',
                        transform: 'rotate(-15deg)',
                        filter: 'blur(40px)',
                        opacity: 0.3,
                    }}
                />
                <div 
                    style={{
                        position: 'absolute',
                        bottom: '-15%',
                        left: '30%',  // Shifted starting point further right
                        width: '90%', // Reduced width to focus on right
                        height: '150px',
                        transform: 'rotate(20deg)',
                        filter: 'blur(40px)',
                        opacity: 0.2,
                    }}
                />
            </div>
            
            <section className="grid grid-cols-1 md:grid-cols-2 md:gap-12 xl:gap-24 py-11 px-7 h-full relative z-10 overflow-hidden">
                <div className="bg-green-primary-10 rounded-[2rem] overflow-hidden relative hidden md:block min-h-[600px]">
                    <img src="/appraisium-logo.png" alt="Ministry of Petroleum Resources Logo" className="absolute top-7 left-7 h-20" />
                    <div className="bg-[url('/new_auth_bg.webp')] bg-white-10/[0.015] bg-blend-overlay bg-cover bg-left h-full w-full" />
                    <div className="absolute bottom-12 bg-[#0A0D14]/[0.5] p-4 inset-x-9 rounded-2xl flex flex-col gap-6">
                        <h1 className="font-semibold text-white-10 text-6xl">HR Performance <br></br> Management <br></br> Software</h1>
                        <p className="text-lg text-white-10">Enabling organizations to monitor and record employee performance metrics and progress over time with ease.</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between h-full overflow-y-scroll gap-10">
                    <div className="bg-transparent" style={{ height: `${footerDimensions?.height}px` }}/>
                    <Outlet />
                    <footer ref={footerRef} className="flex items-center justify-center flex-col space-y-1">
                        <div className="text-sm text-center text-gray-500">© Appraisium</div>
                        <div className="text-xs text-center text-gray-500">
                            {import.meta.env.VITE_DEMO === "true" ? "Demo Account" : "Registered to Federal Ministry of Petroleum Resources"}
                        </div>
                        <div className="text-xs text-center text-gray-500">v 1.1</div>
                    </footer>
                </div>
            </section>
        </main>
    );
};