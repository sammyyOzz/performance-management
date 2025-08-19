import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { Icon } from "@iconify-icon/react"
import { Fragment, useEffect } from "react"
import riArrowRightSLine from "@iconify-icons/ri/arrow-right-s-line"
import { CalendarEdit, Ranking } from "iconsax-react"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router"


const performanceRoutes = [
    { name: "Monthly Review", path: "/employee-appraisal/monthly-performance", icon: CalendarEdit },
    { name: "Quaterly Appraisal", path: "/employee-appraisal/performance-appraisal", icon: Ranking },
]

export const EmployeeAppraisalPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (location.pathname === "/employee-appraisal") {
            navigate("/employee-appraisal/monthly-performance")
        }
    },[location, location.pathname, navigate])
    return (
        <div className="flex page-height bg-[#FFFFFF]">
            <div className="flex flex-col h-full gap-4 py-4 px-3.5 w-56 border-r border-r-[#DFE2E7] bg-[#F0FFF0]">
                <div className="flex flex-col gap-2">
                    <span className="font-semibold text-xs text-[#727A86] px-1">PERFORMANCE</span>
                    <div className="grid gap-2">
                        {
                            performanceRoutes.map((route) => {
                                const IconComponent = route.icon
                                return (
                                <NavLink key={route.path} to={route.path} className="flex items-center justify-between relative text-xs py-2.5 px-3">
                                    {({ isActive }) => (
                                        <Fragment>
                                            {
                                                isActive ? (
                                                    <motion.div layoutId="activeAppraisalBackground" id="activeAppraisalBackground" className="inset-0 bg-[#F5F6F7] absolute rounded" />
                                                ) : null
                                            }
                                            <div className="flex items-center gap-2 isolate">
                                                <IconComponent size="16" color={isActive ? "#003a2b" : "#727A86"} />
                                                <span className={cn(isActive ? "text-green-primary-40" : "text-[#727A86]", "duration-500 whitespace-nowrap")}>{route.name}</span>
                                            </div>
                                            <Icon icon={riArrowRightSLine} width={20} height={20} className={cn("isolate text-green-primary-40", isActive ? "visible" : "invisible")} />
                                        </Fragment>
                                    )}
                                </NavLink>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}