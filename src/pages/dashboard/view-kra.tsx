import { Fragment } from "react"
import { motion } from "motion/react"
import { Icon } from "@iconify-icon/react"
import riPencilLine from "@iconify-icons/ri/pencil-line"
import { NavLink, Outlet } from "react-router"
import riDeleteBin6Line from "@iconify-icons/ri/delete-bin-6-line"
import { BaseButton, Breadcrumb } from "@/components/core"

export const ViewDashboardKraPage = () => {

    const kraRoutes = [
        { name: "Overview", path: "/dashboard/kra/1" },
        { name: "Responsibility", path: "/dashboard/kra/1/responsibility" },
    ]
    
    const breadcrumbs = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "View KRAs", href: "/dashboard/kra" },
        { label: "KRA Detail", href: "/dashboard/kra/1" },
    ]
    return (
        <section className="flex py-9 px-5 md:px-8 lg:px-10 xl:px-12 2xl:px-0 page-height overflow-y-scroll">
            <div className="flex flex-col flex-1 gap-5 max-w-screen-2xl mx-auto">
                <div className="flex flex-col gap-5">
                    <Breadcrumb items={breadcrumbs} />
                    <div className="flex flex-col items-start gap-4 md:gap-10 md:flex-row md:justify-between py-2">
                        <div className="grid gap-0.5">
                            <h1 className="font-semibold text-black text-2xl">Optimization of Crude Oil and Gas reserves to 40 million barrels and 220tcf respectively</h1>
                            <p className="font-normal text-gray-500 text-sm">See the key result area of the organisation</p>
                        </div>
                        <div className="flex items-center justify-end gap-4">
                            <BaseButton size="tiny" theme="primary" variant="outlined">
                                <Icon icon={riPencilLine} width={16} height={16} />
                                Edit
                            </BaseButton>
                            <BaseButton size="tiny" theme="danger" variant="filled">
                                <Icon icon={riDeleteBin6Line} width={16} height={16} />
                                Delete
                            </BaseButton>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
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
                    <Outlet />
                </div>
            </div>
        </section>
    )
}