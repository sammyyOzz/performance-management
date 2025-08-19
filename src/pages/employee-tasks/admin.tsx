import { Fragment } from "react"
import { motion } from "motion/react"
import { NavLink, Outlet } from "react-router"
import { cn } from "@/lib/utils"
import { useGetCurrentUser } from "@/services/hooks/queries"

const adminRoutes = [
    { name: "Subordinates Tasks", path: "/tasks/subordinates" },
    { name: "Your Tasks", path: "/tasks/own" },
]

export const AdminTasksPage = () => {
    const { data: user } = useGetCurrentUser({ enabled: false })
    
    return (
        <section className="flex py-9 px-5 md:px-8 lg:px-10 xl:px-12 page-height overflow-y-scroll bg-[#FFFFFF]">
            <div className="flex flex-col flex-1 gap-3 max-w-screen-2xl mx-auto">
                <div className="grid gap-1 py-2 border-b border-b-[#DFE2E7]">
                    <h1 className="font-semibold text-2xl text-black capitalize">{user?.first_name} {user?.last_name}</h1>
                    <p className="font-normal text-sm text-[#727A86]">{user?.position}</p>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex items-center w-full border-b border-b-[#DFE2E7]">
                        {
                            adminRoutes.map((route) =>
                                <NavLink key={route.path} to={route.path} className="relative text-center p-4">
                                    {({ isActive }) => (
                                        <Fragment>
                                            <span className={cn(isActive ? "text-green-primary-40" : "text-[#727A86]", "font-medium text-sm")}>{route.name}</span>
                                                {
                                                    isActive ? (
                                                        <motion.div layoutId="team-members-underline" id="team-members-underline" className="inset-x-0 bg-green-primary-40 h-px absolute -bottom-px" />
                                                    ) : null
                                                }
                                        </Fragment>
                                    )}
                                </NavLink>
                            )
                        }
                    </div>
                    <Outlet />
                </div>
            </div>
        </section>
    )
}