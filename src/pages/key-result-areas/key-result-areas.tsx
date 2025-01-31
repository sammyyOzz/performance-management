import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { Fragment, useEffect } from "react"
import riArrowRightSLine from "@iconify-icons/ri/arrow-right-s-line"
import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router"

const kraRoutes = [
    { name: "Departmental KRA", path: "/kra/departments" },
    { name: "Divisions KRA", path: "/kra/divisions" },
    { name: "Branches KRA", path: "/kra/branches" },
    { name: "Sections KRA", path: "/kra/sections" },
    { name: "Officers KRA", path: "/kra/officers" },
]

export const KeyResultAreasPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (location.pathname === "/kra") {
            navigate("/kra/departments")
        }
    },[location, location.pathname, navigate])
    return (
        <div className="flex h-full">
            <div className="flex flex-col h-full gap-4 py-4 px-3.5 w-52 border-r border-r-[#DFE2E7]">
                <span className="font-medium text-xs text-[#98A2B3] px-1">KEY RESULT AREA</span>
                <div className="grid gap-2">
                    {
                        kraRoutes.map((route) =>
                            <NavLink key={route.path} to={route.path} className="flex items-center justify-between relative text-xs py-2 px-3">
                                {({ isActive }) => (
                                    <Fragment>
                                        {
                                            isActive ? (
                                                <motion.div layoutId="activeBackground" id="activeBackground" className="inset-0 bg-green-primary-40 absolute rounded" />
                                            ) : null
                                        }
                                        <span className={cn(isActive ? "text-white-10" : "text-[#98A2B3]", "isolate duration-500")}>{route.name}</span>
                                        <Icon icon={riArrowRightSLine} width={20} height={20} className={cn("isolate text-white-10", isActive ? "visible" : "invisible")} />
                                    </Fragment>
                                )}
                            </NavLink>
                        )
                    }
                </div>
            </div>
            <Outlet />
        </div>
    )
}