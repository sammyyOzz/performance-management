import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { Fragment, useEffect } from "react"
import riArrowRightSLine from "@iconify-icons/ri/arrow-right-s-line"
import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router"
import { Folder, Layer, Profile2User, SecurityUser, UserSquare } from "iconsax-react"

const accountRoutes = [
    { name: "Profile", path: "/settings/departments", icon: UserSquare },
    { name: "Security and Privacy", path: "/settings/divisions", icon: SecurityUser },
    { name: "Tasks and KRAs", path: "/settings/branches", icon: Folder },
]

const orgRoutes = [
    { name: "Roles and Permission", path: "/settings/roles-and-permissions", icon: Layer },
    { name: "Employee Information", path: "/settings/roles-and-permissions/employee", icon: Profile2User },
]

export const SettingsPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (location.pathname === "/settings") {
            navigate("/settings/departments")
        }
    },[location, location.pathname, navigate])
    return (
        <div className="flex page-height">
            <div className="flex flex-col h-full gap-4 py-4 px-3.5 w-56 border-r border-r-[#DFE2E7]">
                <div className="flex flex-col gap-2">
                    <span className="font-semibold text-xs text-[#727A86] px-1">ACCOUNT SETTINGS</span>
                    <div className="grid gap-2">
                        {
                            accountRoutes.map((route) => {
                                const IconComponent = route.icon
                                return (
                                <NavLink key={route.path} to={route.path} className="flex items-center justify-between relative text-xs py-2.5 px-3">
                                    {({ isActive }) => (
                                        <Fragment>
                                            {
                                                isActive ? (
                                                    <motion.div layoutId="activeBackground" id="activeBackground" className="inset-0 bg-[#F5F6F7] absolute rounded" />
                                                ) : null
                                            }
                                            <div className="flex items-center gap-2 isolate">
                                                <IconComponent size="16" color={isActive ? "#003a2b" : "#727A86"} />
                                                <span className={cn(isActive ? "text-green-primary-40" : "text-[#727A86]", "duration-500")}>{route.name}</span>
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
                <div className="flex flex-col gap-2">
                    <span className="font-semibold text-xs text-[#727A86] px-1">ORGANISATION</span>
                    <div className="grid gap-2">
                        {
                            orgRoutes.map((route) => {
                                const IconComponent = route.icon
                                return (
                                <NavLink key={route.path} to={route.path} className="flex items-center justify-between relative text-xs py-2.5 px-3">
                                    {({ isActive }) => (
                                        <Fragment>
                                            {
                                                isActive ? (
                                                    <motion.div layoutId="activeBackground" id="activeBackground" className="inset-0 bg-[#F5F6F7] absolute rounded" />
                                                ) : null
                                            }
                                            <div className="flex items-center gap-2 isolate">
                                                <IconComponent size="16" color={isActive ? "#003a2b" : "#727A86"} />
                                                <span className={cn(isActive ? "text-green-primary-40" : "text-[#727A86]", "duration-500")}>{route.name}</span>
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