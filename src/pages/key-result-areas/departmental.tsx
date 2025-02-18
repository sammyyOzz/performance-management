import { Fragment, useEffect } from "react"
import { motion } from "motion/react"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router"

export const DepartmentalKRAPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const kraRoutes = [
        { name: "Overview", path: "/kra/departments/overview" },
        { name: "KRA & Sub-Initiative", path: "/kra/departments/sub-initiative" },
    ]
        
    useEffect(() => {
        if (location.pathname === "/kra/departments") {
            navigate("/kra/departments/overview", { replace: true})
        }
    },[location.pathname, navigate])
    return (
        <section className="flex flex-1 py-6 px-5 md:px-8 lg:px-10 page-height overflow-y-scroll">
            <div className="flex flex-col flex-1 gap-6 max-w-screen-2xl mx-auto">
                <div className="flex flex-col gap-3">
                    <div className="grid gap-1 py-2 border-b border-b-[#DFE2E7]">
                        <h1 className="font-semibold text-2xl text-black">HUMAN RESOURCES MANAGEMENT</h1>
                        <p className="font-normal text-sm text-[#667185]">See the key result area of your department</p>
                    </div>
                    <div className="flex items-center w-full border-b border-b-[#DFE2E7]">
                    {
                        kraRoutes.map((route) =>
                            <NavLink key={route.path} to={route.path} className="relative text-xs py-5 px-3">
                                {({ isActive }) => (
                                    <Fragment>
                                        <span className={isActive ? "text-green-primary-40" : "text-[#98A2B3]"}>{route.name}</span>
                                            {
                                                isActive ? (
                                                    <motion.div layoutId="kra-underline" id="kra-underline" className="inset-x-0 bg-green-primary-40 h-1 absolute bottom-0" />
                                                ) : null
                                            }
                                    </Fragment>
                                )}
                            </NavLink>
                        )
                    }
                    </div>
                </div>
                <Outlet />
            </div>
        </section>
    )
}