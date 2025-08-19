import { Fragment, useEffect } from "react"
import { motion } from "motion/react"
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router"
import { useGetDepartment } from "@/services/hooks/queries"
import { RenderIf } from "@/components/core"
import { Loader } from "@/components/core/Button/Loader"

export const DepartmentalKRAPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { data: department, isLoading: loadingDepartment } = useGetDepartment(id as string)

    const kraRoutes = [
        { name: "Overview", path: `/kra/departments/${id}/overview` },
        { name: "KRA & Sub-Initiative", path: `/kra/departments/${id}/sub-initiative` },
    ]
    
    useEffect(() => {
        if (location.pathname === `/kra/departments/${id}` && !location.pathname.includes('/sub-initiative')) {
            navigate(`/kra/departments/${id}/overview`, { replace: true })
        }
    }, [location.pathname, navigate, id])

    return (
        <section className="flex flex-1 py-6 px-5 md:px-8 lg:px-10 page-height overflow-y-scroll bg-[#FFFFFF]">
            <RenderIf condition={!loadingDepartment}>
                <div className="flex flex-col flex-1 gap-6 max-w-screen-2xl mx-auto">
                    <div className="flex flex-col gap-3">
                        <div className="grid gap-1 py-2 border-b border-b-[#DFE2E7]">
                            <h1 className="font-semibold text-2xl text-black uppercase">{department?.name}</h1>
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
            </RenderIf>
            <RenderIf condition={loadingDepartment}>
                <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto items-center justify-center"><Loader className="spinner size-6 text-green-primary-40" /></div>
            </RenderIf>
        </section>
    )
}