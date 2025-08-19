import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { Fragment, useEffect, useMemo } from "react"
import riArrowRightSLine from "@iconify-icons/ri/arrow-right-s-line"
import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router"
import { useGetCurrentUser, useGetDepartment } from "@/services/hooks/queries"
import { RenderIf } from "@/components/core"
import { Loader } from "@/components/core/Button/Loader"

export const KeyResultAreasPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { data: user, isLoading } = useGetCurrentUser()
    const { data: department } = useGetDepartment(id as string)
    
    const kraRoutes = useMemo(() => {
        const routes = [
            { name: "Departmental KRA", path: "/kra/departments" }
        ]

        // Only show divisions, branches, and sections when a department is selected
        if (id && department) {
            routes.push(
                { name: "Divisions KRA", path: `/kra/departments/${id}/divisions` },
                { name: "Branches KRA", path: `/kra/departments/${id}/branches` },
                { name: "Sections KRA", path: `/kra/departments/${id}/sections` }
            )
        }

        return routes
    }, [id, department])
    
    useEffect(() => {
        if (location.pathname === "/kra") {
            if (user?.is_superuser) {
                navigate("/kra/departments")
            } else {
                navigate("/kra/departments")
            }
        }
    },[location, location.pathname, navigate, user?.is_superuser])

    return (
        <div className="flex h-full">
            <RenderIf condition={!isLoading}>
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
            </RenderIf>
            <RenderIf condition={isLoading}>
                <div className="flex flex-col h-3/4 gap-10 max-w-screen-2xl mx-auto items-center justify-center">
                    <Loader className="spinner size-6 text-green-primary-40" />
                </div>
            </RenderIf>
        </div>
    )
}